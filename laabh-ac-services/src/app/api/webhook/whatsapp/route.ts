import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET handler: Webhook verification for Meta WhatsApp Cloud API
 * Meta sends a GET request to verify the webhook endpoint.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken =
    process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN ||
    process.env.WHATSAPP_VERIFY_TOKEN ||
    'laabh_ac_services_whatsapp_verify_token_2026';

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('✅ [WHATSAPP WEBHOOK] Verified successfully by Meta Cloud API.');
    // Meta requires the raw hub.challenge returned as plain text with 200 OK
    return new Response(challenge || '', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  console.warn('❌ [WHATSAPP WEBHOOK] Verification failed. Invalid or mismatched verify token:', token);
  return new Response('Forbidden: Verification token mismatch', { status: 403 });
}

/**
 * POST handler: Handles incoming WhatsApp notifications & delivery statuses from Meta
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if this is a WhatsApp Business Account notification
    if (body.object === 'whatsapp_business_account') {
      const entries = body.entry || [];

      for (const entry of entries) {
        const changes = entry.changes || [];
        for (const change of changes) {
          const value = change.value;

          // 1. Process Message Delivery Status Updates (sent, delivered, read, failed)
          if (value?.statuses && Array.isArray(value.statuses)) {
            for (const statusObj of value.statuses) {
              const wamid = statusObj.id;
              const deliveryStatus = (statusObj.status || '').toUpperCase(); // 'DELIVERED', 'READ', 'SENT', 'FAILED'

              console.log(`📬 [WHATSAPP STATUS UPDATE] ID: ${wamid} -> Status: ${deliveryStatus}`);

              if (wamid) {
                // Update our notification record in database if found
                await prisma.notification.updateMany({
                  where: { whatsappMessageId: wamid },
                  data: {
                    status: deliveryStatus,
                    errorMessage: statusObj.errors ? JSON.stringify(statusObj.errors) : undefined,
                  },
                });
              }
            }
          }

          // 2. Process Incoming Customer Messages (replies)
          if (value?.messages && Array.isArray(value.messages)) {
            for (const msg of value.messages) {
              const senderPhone = msg.from;
              const textBody = msg.text?.body || '[Media/Interactive]';
              console.log(`💬 [WHATSAPP INCOMING MESSAGE] From: ${senderPhone}: "${textBody}"`);
            }
          }
        }
      }

      // Meta expects an immediate 200 OK
      return NextResponse.json({ status: 'ok' }, { status: 200 });
    }

    return NextResponse.json({ status: 'ignored' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error handling WhatsApp webhook event:', error);
    // Still return 200 to prevent Meta from retrying indefinitely
    return NextResponse.json({ status: 'error_logged' }, { status: 200 });
  }
}
