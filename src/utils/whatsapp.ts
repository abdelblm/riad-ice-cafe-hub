// WhatsApp utility functions for Riad Ice reservations (Moroccan Darija)

export const WHATSAPP_PHONE = '212693254604'; //  +212 6932 54604 without + and spaces

export interface ReservationDetails {
  guests?: number;
  time?: string; // e.g. "7 PM" or "19:00"
  date?: string; // e.g. "lyom", "ghdda", or "2025-09-08"
  name?: string;
  note?: string; // optional special request
}

export const generateWhatsAppMessage = (details?: ReservationDetails) => {
  // const {
  //   guests = 2,
  //   time = "7 PM",
  //   date = "lyom",
  //   name,
  //   note
  // } = details || {};

  // const greeting = name ? `Salam Alikom, smiti ${name}. ` : "Salam Alikom, ";
  // const noteText = note ? ` nrizirvi: ${note}.` : "";
  const message = 'السلام عليكم';

  return encodeURIComponent(message);
};

export const getWhatsAppURL = (details?: ReservationDetails) => {
  const message = generateWhatsAppMessage(details);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
};

export const openWhatsApp = (
  details?: ReservationDetails,
  opener: (url: string) => void = (url) =>
    window.open(url, '_blank', 'noopener,noreferrer')
) => {
  const url = getWhatsAppURL(details);
  opener(url);
};
