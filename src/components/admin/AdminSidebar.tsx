import { NavLink } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Menu,
  Calendar,
  Star,
  ImageIcon,
  Settings,
  Coffee,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, end: true },
  { name: 'Menu Management', href: '/admin/menu', icon: Menu },
  { name: 'Reservations', href: '/admin/reservations', icon: Calendar },
  { name: 'Specials', href: '/admin/specials', icon: Star },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Settings', href: '/admin/settings', icon: Settings, adminOnly: true },
];

export const AdminSidebar = () => {
  const { isAdmin } = useUserRole();

  const filteredNavigation = navigation.filter(
    (item) => !item.adminOnly || isAdmin
  );

  return (
    <div className="w-64 bg-moroccan-charcoal text-white flex flex-col">
      <div className="p-6 border-b border-moroccan-gold/20">
        <div className="flex items-center gap-2">
          <Coffee className="h-8 w-8 text-moroccan-gold" />
          <div>
            <h1 className="text-xl font-elegant text-moroccan-gold">Riad Ice</h1>
            <p className="text-sm text-white/70">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-moroccan-gold text-moroccan-charcoal'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-moroccan-gold/20">
        <div className="text-xs text-white/60">
          © 2024 Riad Ice Restaurant
        </div>
      </div>
    </div>
  );
};