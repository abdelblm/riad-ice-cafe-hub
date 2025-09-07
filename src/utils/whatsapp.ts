// WhatsApp utility functions for Riad Ice reservations

export const WHATSAPP_PHONE = "212693254604"; // +212 123 456 789 without + and spaces

export interface ReservationDetails {
  guests?: number;
  time?: string;
  date?: string;
  name?: string;
}

export const generateWhatsAppMessage = (details?: ReservationDetails) => {
  const { guests = 2, time = "7 PM", date = "tonight", name } = details || {};
  
  const greeting = name ? `Hi, my name is ${name}. ` : "Hi, ";
  const message = `${greeting}I'd like to reserve a table for ${guests} at ${time} ${date}. Thank you!`;
  
  return encodeURIComponent(message);
};

export const getWhatsAppURL = (details?: ReservationDetails) => {
  const message = generateWhatsAppMessage(details);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
};

export const openWhatsApp = (details?: ReservationDetails) => {
  const url = getWhatsAppURL(details);
  window.open(url, '_blank', 'noopener,noreferrer');
};