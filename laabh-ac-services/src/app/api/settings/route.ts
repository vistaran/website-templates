import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    // Settings hold the WhatsApp Cloud API token — never expose them to anonymous callers.
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await prisma.businessSettings.findFirst();
    return NextResponse.json({ settings });
  } catch (error: unknown) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      businessName,
      vendorPhone,
      vendorEmail,
      address,
      whatsappCloudApiToken,
      whatsappPhoneNumberId,
      whatsappBusinessAccountId,
      mockModeEnabled,
    } = body;

    let settings = await prisma.businessSettings.findFirst();

    if (!settings) {
      settings = await prisma.businessSettings.create({
        data: {
          businessName: businessName || 'Labh Air Conditioning Services',
          vendorPhone:
            vendorPhone ||
            process.env.VENDOR_WHATSAPP_NUMBER ||
            process.env.NEXT_PUBLIC_VENDOR_PHONE ||
            '918141434327',
          vendorEmail: vendorEmail || 'contact@laabhservices.com',
          address,
          whatsappCloudApiToken,
          whatsappPhoneNumberId,
          whatsappBusinessAccountId,
          mockModeEnabled: mockModeEnabled !== undefined ? Boolean(mockModeEnabled) : true,
        },
      });
    } else {
      settings = await prisma.businessSettings.update({
        where: { id: settings.id },
        data: {
          businessName: businessName !== undefined ? businessName : undefined,
          vendorPhone: vendorPhone !== undefined ? vendorPhone : undefined,
          vendorEmail: vendorEmail !== undefined ? vendorEmail : undefined,
          address: address !== undefined ? address : undefined,
          whatsappCloudApiToken: whatsappCloudApiToken !== undefined ? whatsappCloudApiToken : undefined,
          whatsappPhoneNumberId: whatsappPhoneNumberId !== undefined ? whatsappPhoneNumberId : undefined,
          whatsappBusinessAccountId:
            whatsappBusinessAccountId !== undefined ? whatsappBusinessAccountId : undefined,
          mockModeEnabled: mockModeEnabled !== undefined ? Boolean(mockModeEnabled) : undefined,
        },
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error: unknown) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
