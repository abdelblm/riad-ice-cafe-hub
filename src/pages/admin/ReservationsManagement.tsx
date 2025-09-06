import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

type Reservation = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  reservation_date: string;
  reservation_time: string;
  number_of_guests: number;
  status: ReservationStatus;
  special_requests?: string;
  created_at: string;
};

export default function ReservationsManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reservations, isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('reservation_date', { ascending: true });
      
      if (error) throw error;
      return data as Reservation[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ReservationStatus }) => {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast({
        title: 'Success',
        description: 'Reservation status updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update reservation status',
        variant: 'destructive',
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return <div className="p-6">Loading reservations...</div>;
  }

  const upcomingReservations = reservations?.filter(
    (r) => r.status === 'confirmed' && new Date(r.reservation_date) >= new Date()
  );

  const pendingReservations = reservations?.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-elegant text-moroccan-gold">Reservations Management</h1>
        <p className="text-muted-foreground">Manage customer bookings and reservations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-elegant border-moroccan-gold/20">
          <CardHeader>
            <CardTitle className="text-yellow-600">Pending Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReservations?.length || 0}</div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant border-moroccan-gold/20">
          <CardHeader>
            <CardTitle className="text-green-600">Upcoming Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingReservations?.length || 0}</div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant border-moroccan-gold/20">
          <CardHeader>
            <CardTitle className="text-blue-600">Total Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservations?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {reservations?.map((reservation) => (
          <Card key={reservation.id} className="shadow-elegant border-moroccan-gold/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-moroccan-gold" />
                    <span className="font-semibold">{reservation.customer_name}</span>
                    <Badge className={getStatusColor(reservation.status)}>
                      {reservation.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      {reservation.customer_phone}
                    </div>
                    {reservation.customer_email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {reservation.customer_email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-moroccan-gold" />
                    <span className="font-medium">{formatDate(reservation.reservation_date)}</span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {reservation.reservation_time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      {reservation.number_of_guests} guests
                    </div>
                  </div>

                  {reservation.special_requests && (
                    <div className="text-sm">
                      <span className="font-medium">Special requests:</span>
                      <p className="text-muted-foreground">{reservation.special_requests}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {reservation.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          updateStatusMutation.mutate({
                            id: reservation.id,
                            status: 'confirmed',
                          })
                        }
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          updateStatusMutation.mutate({
                            id: reservation.id,
                            status: 'cancelled',
                          })
                        }
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {reservation.status === 'confirmed' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() =>
                          updateStatusMutation.mutate({
                            id: reservation.id,
                            status: 'completed',
                          })
                        }
                      >
                        Mark Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          updateStatusMutation.mutate({
                            id: reservation.id,
                            status: 'cancelled',
                          })
                        }
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {(reservation.status === 'cancelled' || reservation.status === 'completed') && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: reservation.id,
                          status: 'pending',
                        })
                      }
                    >
                      Reopen
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!reservations?.length && (
        <Card className="shadow-elegant border-moroccan-gold/20">
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No reservations yet</h3>
            <p className="text-sm text-muted-foreground">Reservations will appear here when customers book tables.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}