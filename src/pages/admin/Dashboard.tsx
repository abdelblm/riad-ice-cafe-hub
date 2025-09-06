import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Menu, Star, Users } from 'lucide-react';

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [menuItems, reservations, specials, galleryImages] = await Promise.all([
        supabase.from('menu_items').select('id').eq('is_active', true),
        supabase.from('reservations').select('id').eq('status', 'pending'),
        supabase.from('specials').select('id').eq('is_active', true),
        supabase.from('gallery_images').select('id').eq('is_active', true),
      ]);

      return {
        activeMenuItems: menuItems.data?.length || 0,
        pendingReservations: reservations.data?.length || 0,
        activeSpecials: specials.data?.length || 0,
        galleryImages: galleryImages.data?.length || 0,
      };
    },
  });

  const { data: recentReservations } = useQuery({
    queryKey: ['recent-reservations'],
    queryFn: async () => {
      const { data } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-elegant text-foreground">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Active Menu Items',
      value: stats?.activeMenuItems || 0,
      icon: Menu,
      color: 'text-blue-600',
    },
    {
      title: 'Pending Reservations',
      value: stats?.pendingReservations || 0,
      icon: Calendar,
      color: 'text-orange-600',
    },
    {
      title: 'Active Specials',
      value: stats?.activeSpecials || 0,
      icon: Star,
      color: 'text-yellow-600',
    },
    {
      title: 'Gallery Images',
      value: stats?.galleryImages || 0,
      icon: Users,
      color: 'text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-elegant text-moroccan-gold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your restaurant management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="shadow-elegant border-moroccan-gold/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-elegant border-moroccan-gold/20">
          <CardHeader>
            <CardTitle className="text-moroccan-gold">Recent Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            {recentReservations && recentReservations.length > 0 ? (
              <div className="space-y-4">
                {recentReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium text-foreground">{reservation.customer_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.reservation_date} at {reservation.reservation_time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{reservation.number_of_guests} guests</p>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          reservation.status === 'pending'
                            ? 'bg-orange-100 text-orange-800'
                            : reservation.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {reservation.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent reservations</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-elegant border-moroccan-gold/20">
          <CardHeader>
            <CardTitle className="text-moroccan-gold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/admin/menu"
              className="block p-3 rounded-lg bg-moroccan-gold/10 hover:bg-moroccan-gold/20 transition-colors"
            >
              <div className="font-medium text-foreground">Add Menu Item</div>
              <div className="text-sm text-muted-foreground">Add new dishes to your menu</div>
            </a>
            <a
              href="/admin/reservations"
              className="block p-3 rounded-lg bg-moroccan-gold/10 hover:bg-moroccan-gold/20 transition-colors"
            >
              <div className="font-medium text-foreground">View Reservations</div>
              <div className="text-sm text-muted-foreground">Manage customer bookings</div>
            </a>
            <a
              href="/admin/specials"
              className="block p-3 rounded-lg bg-moroccan-gold/10 hover:bg-moroccan-gold/20 transition-colors"
            >
              <div className="font-medium text-foreground">Create Special</div>
              <div className="text-sm text-muted-foreground">Add daily or weekly specials</div>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}