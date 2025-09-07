import React, { useState } from 'react';
import { Calendar, Clock, Users, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { openWhatsApp, ReservationDetails } from '@/utils/whatsapp';

interface WhatsAppReservationProps {
  className?: string;
  compact?: boolean;
}

const WhatsAppReservation: React.FC<WhatsAppReservationProps> = ({ 
  className = "", 
  compact = false 
}) => {
  const [reservationData, setReservationData] = useState<ReservationDetails>({
    guests: 2,
    time: '19:00',
    date: new Date().toISOString().split('T')[0],
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the data for WhatsApp message
    const formattedDate = reservationData.date 
      ? new Date(reservationData.date).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : 'tonight';
    
    const formattedTime = reservationData.time 
      ? new Date(`2000-01-01T${reservationData.time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      : '7:00 PM';

    openWhatsApp({
      ...reservationData,
      date: formattedDate,
      time: formattedTime
    });
  };

  if (compact) {
    return (
      <div className={`card-moroccan ${className}`}>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <MessageCircle className="mr-2 h-5 w-5 text-accent" />
          Réservation Rapide / Quick Booking
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="guests-compact" className="text-sm">Guests / Invités</Label>
              <Select 
                value={reservationData.guests?.toString()} 
                onValueChange={(value) => setReservationData(prev => ({ ...prev, guests: parseInt(value) }))}
              >
                <SelectTrigger id="guests-compact">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} person{num > 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="time-compact" className="text-sm">Time / Heure</Label>
              <Select 
                value={reservationData.time} 
                onValueChange={(value) => setReservationData(prev => ({ ...prev, time: value }))}
              >
                <SelectTrigger id="time-compact">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(time => (
                    <SelectItem key={time} value={time}>
                      {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" className="btn-moroccan w-full">
            <MessageCircle className="mr-2 h-4 w-4" />
            Réserver via WhatsApp
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className={`card-moroccan max-w-md ${className}`}>
      <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <MessageCircle className="mr-3 h-6 w-6 text-accent" />
        Réserver une Table / Book a Table
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">
            Your Name / Votre Nom
          </Label>
          <Input
            id="name"
            type="text"
            value={reservationData.name}
            onChange={(e) => setReservationData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your name / Entrez votre nom"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="date" className="text-sm font-medium flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Date / Date
          </Label>
          <Input
            id="date"
            type="date"
            value={reservationData.date}
            onChange={(e) => setReservationData(prev => ({ ...prev, date: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="time" className="text-sm font-medium flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Time / Heure
          </Label>
          <Select 
            value={reservationData.time} 
            onValueChange={(value) => setReservationData(prev => ({ ...prev, time: value }))}
          >
            <SelectTrigger id="time" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(time => (
                <SelectItem key={time} value={time}>
                  {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="guests" className="text-sm font-medium flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Number of Guests / Nombre d'Invités
          </Label>
          <Select 
            value={reservationData.guests?.toString()} 
            onValueChange={(value) => setReservationData(prev => ({ ...prev, guests: parseInt(value) }))}
          >
            <SelectTrigger id="guests" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1,2,3,4,5,6,7,8,10,12].map(num => (
                <SelectItem key={num} value={num.toString()}>
                  {num} person{num > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="btn-moroccan w-full group">
          <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          Send WhatsApp Message / Envoyer via WhatsApp
        </Button>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          This will open WhatsApp with your reservation details pre-filled
          <br />
          <em>Cela ouvrira WhatsApp avec vos détails de réservation pré-remplis</em>
        </p>
      </form>
    </div>
  );
};

export default WhatsAppReservation;