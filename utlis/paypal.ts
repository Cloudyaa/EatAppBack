import fetch from 'node-fetch';
import { config } from '../config/config';
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = config;
const base = 'https://api-m.sandbox.paypal.com';

export const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error('MISSING_API_CREDENTIALS');
    }
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64');
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data: any = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Failed to generate Access Token:', error);
  }
};

export const createPaypalOrder = async (cart: any) => {
  const accessToken = await generateAccessToken();

  const value =
    cart.totalValue <= 50
      ? String((cart.totalValue + 5.99).toFixed(2))
      : String(cart.totalValue.toFixed(2));

  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'GBP',
          value,
        },
      },
    ],
  };

  const response = await fetch(`${base}/v2/checkout/orders`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const captureOrder = async (orderID: string) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
};

async function handleResponse(response: any) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
