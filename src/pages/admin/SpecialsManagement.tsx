import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Special = {
  id: string;
  title: string;
  title_arabic?: string;
  description?: string;
  description_arabic?: string;
  image_url?: string;
  start_date?: string;
  end_date?: string;
  day_of_week?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export default function SpecialsManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSpecial, setEditingSpecial] = useState<Special | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    title_arabic: '',
    description: '',
    description_arabic: '',
    image_url: '',
    start_date: '',
    end_date: '',
    day_of_week: '',
    is_active: true,
  });

  const { data: specials, isLoading } = useQuery({
    queryKey: ['specials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('specials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Special[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('specials')
        .insert([data]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specials'] });
      toast({ title: 'Success', description: 'Special created successfully' });
      resetForm();
    },
    onError: (error) => {
      toast({ title: 'Error', description: 'Failed to create special', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from('specials')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specials'] });
      toast({ title: 'Success', description: 'Special updated successfully' });
      resetForm();
    },
    onError: (error) => {
      toast({ title: 'Error', description: 'Failed to update special', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('specials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specials'] });
      toast({ title: 'Success', description: 'Special deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: 'Failed to delete special', variant: 'destructive' });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('specials')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specials'] });
      toast({ title: 'Success', description: 'Special status updated' });
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      title_arabic: '',
      description: '',
      description_arabic: '',
      image_url: '',
      start_date: '',
      end_date: '',
      day_of_week: '',
      is_active: true,
    });
    setEditingSpecial(null);
    setDialogOpen(false);
  };

  const handleEdit = (special: Special) => {
    setEditingSpecial(special);
    setFormData({
      title: special.title,
      title_arabic: special.title_arabic || '',
      description: special.description || '',
      description_arabic: special.description_arabic || '',
      image_url: special.image_url || '',
      start_date: special.start_date || '',
      end_date: special.end_date || '',
      day_of_week: special.day_of_week || '',
      is_active: special.is_active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSpecial) {
      updateMutation.mutate({ id: editingSpecial.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const dayOptions = [
    { value: '', label: 'No specific day' },
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
  ];

  if (isLoading) {
    return <div className="p-6">Loading specials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-elegant text-accent">Specials Management</h1>
          <p className="text-muted-foreground">Manage daily and seasonal specials</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Special
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSpecial ? 'Edit Special' : 'Create New Special'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title (English)</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title_arabic">Title (Arabic)</Label>
                  <Input
                    id="title_arabic"
                    value={formData.title_arabic}
                    onChange={(e) => setFormData({ ...formData, title_arabic: e.target.value })}
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description (English)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description_arabic">Description (Arabic)</Label>
                  <Textarea
                    id="description_arabic"
                    value={formData.description_arabic}
                    onChange={(e) => setFormData({ ...formData, description_arabic: e.target.value })}
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="day_of_week">Day of Week</Label>
                  <select
                    id="day_of_week"
                    value={formData.day_of_week}
                    onChange={(e) => setFormData({ ...formData, day_of_week: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {dayOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  {editingSpecial ? 'Update Special' : 'Create Special'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {specials?.map((special) => (
          <Card key={special.id} className="shadow-soft border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{special.title}</h3>
                    {special.title_arabic && (
                      <span className="text-lg text-muted-foreground" dir="rtl">
                        {special.title_arabic}
                      </span>
                    )}
                    <Switch
                      checked={special.is_active}
                      onCheckedChange={(checked) =>
                        toggleActiveMutation.mutate({ id: special.id, is_active: checked })
                      }
                    />
                  </div>
                  
                  {special.description && (
                    <p className="text-muted-foreground mb-2">{special.description}</p>
                  )}
                  
                  {special.description_arabic && (
                    <p className="text-muted-foreground mb-2" dir="rtl">{special.description_arabic}</p>
                  )}
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    {special.day_of_week && (
                      <p>Day: {special.day_of_week.charAt(0).toUpperCase() + special.day_of_week.slice(1)}</p>
                    )}
                    {special.start_date && special.end_date && (
                      <p>Period: {special.start_date} to {special.end_date}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(special)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(special.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!specials?.length && (
        <Card className="shadow-soft border-border/50">
          <CardContent className="p-12 text-center">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No specials yet</h3>
            <p className="text-sm text-muted-foreground">Create your first special offer.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}