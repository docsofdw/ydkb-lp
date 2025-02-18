import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Log that we're attempting to subscribe (for debugging)
    console.log('Attempting to subscribe:', email);

    const response = await mailchimp.lists.addListMember("your-audience-id", {
      email_address: email,
      status: "subscribed",
    });

    return new Response(JSON.stringify({ 
      success: true,
      memberId: response.id 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error: any) {
    console.error('Mailchimp error:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message || 'Failed to subscribe' 
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}