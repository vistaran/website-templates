import { oauth2ClientInstance } from '../_lib/google.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.query;
  if (!code) return res.status(400).send('No code provided');

  try {
    const { tokens } = await oauth2ClientInstance.getToken(code);
    
    res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h2 style="color: #15803d;">Google Calendar Connected Successfully!</h2>
        <p>Because this app is hosted on Vercel, you need to add your Refresh Token as an Environment Variable.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px auto; max-width: 600px; word-break: break-all;">
          <strong>Your GOOGLE_REFRESH_TOKEN:</strong><br><br>
          <code style="color: #d97706; font-size: 1.2rem;">${tokens.refresh_token}</code>
        </div>
        <div style="text-align: left; max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
            <p><strong>Step 1:</strong> Copy the token above.</p>
            <p><strong>Step 2:</strong> Go to Vercel -> Your Project -> Settings -> Environment Variables.</p>
            <p><strong>Step 3:</strong> Add a new variable named <code>GOOGLE_REFRESH_TOKEN</code> and paste the token as the value.</p>
            <p><strong>Step 4:</strong> Also paste it into your local <code>.env</code> file so it works locally in the future.</p>
            <p><strong>Step 5:</strong> Redeploy your Vercel project.</p>
        </div>
      </div>
    `);
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.status(500).send('Authentication failed. Check logs.');
  }
}
