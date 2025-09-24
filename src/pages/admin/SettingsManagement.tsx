import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Settings,
  Clock,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Globe,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUserRole } from '@/hooks/useUserRole';

type SettingValue = {
  id: string;
  key: string;
  value: any;
  updated_at: string;
};

export default function SettingsManagement() {
  const { toast } = useToast();
  const { isAdmin } = useUserRole();
  const queryClient = useQueryClient();

  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
    address: '',
    whatsapp: '',
  });

  const [openingHours, setOpeningHours] = useState({
    monday: { open: '09:00', close: '22:00', closed: false },
    tuesday: { open: '09:00', close: '22:00', closed: false },
    wednesday: { open: '09:00', close: '22:00', closed: false },
    thursday: { open: '09:00', close: '22:00', closed: false },
    friday: { open: '09:00', close: '22:00', closed: false },
    saturday: { open: '09:00', close: '22:00', closed: false },
    sunday: { open: '09:00', close: '22:00', closed: false },
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    website: '',
  });

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('settings').select('*');

      if (error) throw error;

      // Process settings into our state
      const settingsMap = data.reduce((acc: any, setting: SettingValue) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {});

      if (settingsMap.contact_info) {
        setContactInfo(settingsMap.contact_info);
      }
      if (settingsMap.opening_hours) {
        setOpeningHours(settingsMap.opening_hours);
      }
      if (settingsMap.social_links) {
        setSocialLinks(settingsMap.social_links);
      }

      return data as SettingValue[];
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { data: currentUser } = await supabase.auth.getUser();

      const { error } = await supabase.from('settings').upsert({
        key,
        value,
        updated_by: currentUser.user?.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast({ title: 'Success', description: 'Settings updated successfully' });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      });
    },
  });

  const handleContactInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettingMutation.mutate({ key: 'contact_info', value: contactInfo });
  };

  const handleOpeningHoursSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettingMutation.mutate({ key: 'opening_hours', value: openingHours });
  };

  const handleSocialLinksSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettingMutation.mutate({ key: 'social_links', value: socialLinks });
  };

  const updateOpeningHours = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  if (!isAdmin) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
        <p className="text-muted-foreground">
          Only administrators can access settings.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-6">Loading settings...</div>;
  }

  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-elegant text-accent">
          Settings Management
        </h1>
        <p className="text-muted-foreground">
          Manage restaurant information and configuration
        </p>
      </div>

      <div className="grid gap-6">
        {/* Contact Information */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-accent" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactInfoSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, phone: e.target.value })
                    }
                    placeholder=" +212 6932 54604"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={contactInfo.whatsapp}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        whatsapp: e.target.value,
                      })
                    }
                    placeholder=" +212 6932 54604"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  placeholder="contact@riadice.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={contactInfo.address}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, address: e.target.value })
                  }
                  placeholder="Restaurant address..."
                />
              </div>

              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Update Contact Info
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Opening Hours */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Opening Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOpeningHoursSubmit} className="space-y-4">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24">
                    <Label className="capitalize">{day}</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={
                        openingHours[day as keyof typeof openingHours].closed
                      }
                      onChange={(e) =>
                        updateOpeningHours(day, 'closed', e.target.checked)
                      }
                      className="rounded"
                    />
                    <Label className="text-sm">Closed</Label>
                  </div>

                  {!openingHours[day as keyof typeof openingHours].closed && (
                    <>
                      <Input
                        type="time"
                        value={
                          openingHours[day as keyof typeof openingHours].open
                        }
                        onChange={(e) =>
                          updateOpeningHours(day, 'open', e.target.value)
                        }
                        className="w-32"
                      />
                      <span className="text-muted-foreground">to</span>
                      <Input
                        type="time"
                        value={
                          openingHours[day as keyof typeof openingHours].close
                        }
                        onChange={(e) =>
                          updateOpeningHours(day, 'close', e.target.value)
                        }
                        className="w-32"
                      />
                    </>
                  )}
                </div>
              ))}

              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Update Opening Hours
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-accent" />
              Social Media & Website
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSocialLinksSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook Page
                </Label>
                <Input
                  id="facebook"
                  value={socialLinks.facebook}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, facebook: e.target.value })
                  }
                  placeholder="https://facebook.com/riadice"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram Profile
                </Label>
                <Input
                  id="instagram"
                  value={socialLinks.instagram}
                  onChange={(e) =>
                    setSocialLinks({
                      ...socialLinks,
                      instagram: e.target.value,
                    })
                  }
                  placeholder="https://instagram.com/riadice"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input
                  id="website"
                  value={socialLinks.website}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, website: e.target.value })
                  }
                  placeholder="https://riadice.com"
                />
              </div>

              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Update Social Links
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
