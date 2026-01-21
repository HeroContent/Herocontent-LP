import { NextRequest, NextResponse } from 'next/server'

/**
 * Contact Form API Route
 * 
 * Handles contact form submissions and sends data to n8n webhook.
 * 
 * Required environment variables:
 * - N8N_WEBHOOK_URL: n8n webhook URL for processing form submissions
 * 
 * In development, if webhook URL is not configured,
 * the form will log data to console and return success.
 */

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
const isProduction = process.env.NODE_ENV === 'production'

// Debug logging - remove after fixing
console.log('[DEBUG] NEXT_PUBLIC_N8N_WEBHOOK_URL:', N8N_WEBHOOK_URL ? 'SET' : 'NOT SET')
console.log('[DEBUG] NODE_ENV:', process.env.NODE_ENV)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      businessName,
      phone,
      email,
      // Tracking data from client
      cookies,
      referer,
      utm_source,
      utm_medium,
      utm_content
    } = body

    // Validate required fields
    if (!businessName || !phone || !email) {
      return NextResponse.json(
        { error: 'Business name, phone, and email are required' },
        { status: 400 }
      )
    }

    // Build payload matching Tilda format for n8n compatibility
    const webhookPayload = {
      // Use businessName for both name and company as per requirements
      name: businessName,
      company: businessName,
      phone,
      email,
      // Tracking data
      COOKIES: cookies || '',
      referer: referer || '',
      utm_source: utm_source || '',
      utm_medium: utm_medium || '',
      utm_content: utm_content || '',
      // Metadata
      source: 'herocontent-lp-2026',
      timestamp: new Date().toISOString(),
    }

    // Check if webhook is configured
    if (!N8N_WEBHOOK_URL) {
      if (isProduction) {
        // In production, this is an error - webhook must be configured
        console.error('CRITICAL: NEXT_PUBLIC_N8N_WEBHOOK_URL not configured in production')
        return NextResponse.json(
          { error: 'Form submission service unavailable. Please try again later.' },
          { status: 503 }
        )
      } else {
        // In development, log the form data and return success
        console.log('📧 [DEV MODE] Form submission received (n8n webhook not configured):')
        console.log('  Payload:', JSON.stringify(webhookPayload, null, 2))
        return NextResponse.json(
          { success: true, message: 'Form submitted successfully (dev mode - no webhook sent)' },
          { status: 200 }
        )
      }
    }

    // Send to n8n webhook
    const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    })

    // Check webhook response
    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text().catch(() => 'Unknown error')
      console.error('n8n webhook error:', errorText)
      return NextResponse.json(
        { error: 'Failed to process form submission' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
