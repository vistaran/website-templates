/**
 * Application-wide dynamic configuration
 * All phone numbers, support contacts, and messaging links are derived dynamically from environment variables.
 */

export const VENDOR_PHONE =
  process.env.NEXT_PUBLIC_VENDOR_PHONE ||
  process.env.VENDOR_WHATSAPP_NUMBER ||
  '918141434327';

/**
 * Strips all non-digit characters from the phone number
 */
export function getCleanVendorPhone(phone?: string): string {
  const digits = (phone || VENDOR_PHONE).replace(/\D/g, '');
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

/**
 * Returns phone formatted for display, e.g. "+91 87588 66744"
 */
export function getFormattedVendorPhone(phone?: string): string {
  const p = getCleanVendorPhone(phone);
  if (p.length === 12 && p.startsWith('91')) {
    return `+91 ${p.slice(2, 7)} ${p.slice(7)}`;
  }
  if (p.length === 10) {
    return `+91 ${p.slice(0, 5)} ${p.slice(5)}`;
  }
  return `+${p}`;
}

/**
 * Returns clickable WhatsApp link for the vendor
 */
export function getWhatsAppVendorUrl(
  message: string = 'Hi Labh AC Services, I would like to inquire about AC service.',
  phone?: string
): string {
  const cleanPhone = getCleanVendorPhone(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns clickable tel link
 */
export function getTelVendorUrl(phone?: string): string {
  const cleanPhone = getCleanVendorPhone(phone);
  return `tel:+${cleanPhone}`;
}
