import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<'admin' | 'staff' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    const fetchUserRole = async () => {
      try {
        console.log('Fetching role for user:', user.id);
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        console.log('Role query result:', { data, error });
        
        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
        setRole(data?.role || null);
        console.log('Set role to:', data?.role || null);
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  const isAdmin = role === 'admin';
  const isStaff = role === 'staff';
  const isAdminOrStaff = isAdmin || isStaff;

  return {
    role,
    isAdmin,
    isStaff,
    isAdminOrStaff,
    loading,
  };
};