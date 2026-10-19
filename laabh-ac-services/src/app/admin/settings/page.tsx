import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import SettingsClient from './SettingsClient';

export default async function AdminSettingsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const settings = await prisma.businessSettings.findFirst();

  const defaultSettings = {
    businessName: settings?.businessName || 'Labh Air Conditioning Services',
    vendorPhone:
      process.env.VENDOR_WHATSAPP_NUMBER ||
      process.env.NEXT_PUBLIC_VENDOR_PHONE ||
      settings?.vendorPhone ||
      '918758866744',
    vendorEmail: settings?.vendorEmail || 'contact@laabhservices.com',
    address: settings?.address || 'Shop No. 12, Commercial Complex, Bodakdev, SG Highway, Ahmedabad, Gujarat 380054',
    whatsappCloudApiToken:
      settings?.whatsappCloudApiToken ||
      process.env.FACEBOOK_ACCESS_TOKEN ||
      process.env.WHATSAPP_API_TOKEN ||
      '',
    whatsappPhoneNumberId:
      settings?.whatsappPhoneNumberId ||
      process.env.FACEBOOK_WHATSAPP_PHONE_ID ||
      process.env.WHATSAPP_PHONE_NUMBER_ID ||
      '',
    whatsappBusinessAccountId:
      settings?.whatsappBusinessAccountId ||
      process.env.FACEBOOK_APP_ID ||
      process.env.WHATSAPP_BUSINESS_ACCOUNT_ID ||
      '',
    mockModeEnabled:
      process.env.WHATSAPP_MOCK_MODE === 'false' ? false : (settings?.mockModeEnabled ?? true),
  };

  return <SettingsClient initialSettings={JSON.parse(JSON.stringify(defaultSettings))} />;
}
