const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
const WHATSAPP_API_VERSION = 'v22.0'
const WHATSAPP_API_URL = 'https://graph.facebook.com'

const AUTH_OTP_TEMPLATE = 'auth_otp_message'

const getWhatsappApiUrl = (path: string) => `${WHATSAPP_API_URL}/${WHATSAPP_API_VERSION}/${path}`

export const sendWhatsappOtpMessage = async (phoneNumber: string, otp: string) => {
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    throw Error('Missing required WhatsApp configuration')
  }

  const url = getWhatsappApiUrl(`${WHATSAPP_PHONE_NUMBER_ID}/messages`)

  const body = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phoneNumber,
    type: 'template',
    template: {
      name: AUTH_OTP_TEMPLATE,
      language: { code: 'en_US' },
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: otp,
            },
          ],
        },
        {
          type: 'button',
          sub_type: 'url',
          index: '0',
          parameters: [
            {
              type: 'text',
              text: otp,
            },
          ],
        },
      ],
    },
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
    },
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw Error(`Failed to send WhatsApp message: ${JSON.stringify(responseData)}`)
  }

  return responseData
}
