import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();

    // Log the incoming request body
    console.log("Received request body:", body);
    console.log(process.env.AIRWALLEX_BEARER_TOKEN);

    // Check if necessary fields are provided
    if (!body.amount || !body.currency || !body.merchant_order_id) {
        return new Response('Error: Missing required fields', {
            status: 400,
        });
    }

    try {
        // Make a POST request to Airwallex API using fetch
        const response = await fetch('https://api-demo.airwallex.com/api/v1/pa/payment_intents/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AIRWALLEX_BEARER_TOKEN}`, // Airwallex API token
            },
            body: JSON.stringify({
                request_id: `${Date.now()}`,  // Unique ID for the request
                amount: body.amount,          // Payment amount
                currency: body.currency,      // Payment currency (e.g., USD)
                merchant_order_id: body.merchant_order_id, // Merchant order ID
                return_url: body.return_url,  // URL to redirect after success or cancel
                //order: body.order             // Order details (items, etc.)
            }),
        });

        console.log("after airwallex api call");

        // Check for errors in the response
        // if (!response.ok) {
        //     throw new Error('Failed to create PaymentIntent');
        // }

        // Check for errors in the response
        if (!response.ok) {
            // Try to log the error response body
            const errorData = await response.json();  // Assuming the response is JSON
            console.error('Error from Airwallex:', errorData);
            return new Response('Failed to create PaymentIntent: ' + JSON.stringify(errorData), {
                status: response.status,
            });
        }

        // Parse the response data
        const data = await response.json();

        console.log(data)

        // Return the session data to the client
        return NextResponse.json(data);

    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        return new Response('Error creating PaymentIntent', {
            status: 500,
        });
    }
}
