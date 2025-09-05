# Phone Authentication Setup

## Enabling Phone Authentication in Supabase

To use phone authentication in CodeFlow Marketplace, you need to configure SMS providers in your Supabase project.

### Step 1: Access Authentication Settings

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `yvgpqgwguwairgzdlhdi`
3. Navigate to **Authentication** → **Providers** in the left sidebar
4. Scroll down to the **Phone Auth** section

### Step 2: Configure SMS Provider

Supabase supports multiple SMS providers. Choose one of the following:

#### Option A: Twilio (Recommended)
1. Sign up at [Twilio](https://www.twilio.com/)
2. Get your Account SID, Auth Token, and Phone Number
3. In Supabase, enable **Phone Auth**
4. Select **Twilio** as your SMS provider
5. Enter your Twilio credentials:
   - Account SID
   - Auth Token  
   - Phone Number (sender)

#### Option B: MessageBird
1. Sign up at [MessageBird](https://messagebird.com/)
2. Get your API Key
3. In Supabase, select **MessageBird**
4. Enter your MessageBird API Key

#### Option C: Textlocal
1. Sign up at [Textlocal](https://www.textlocal.com/)
2. Get your API Key and sender name
3. In Supabase, select **Textlocal**
4. Enter your credentials

#### Option D: Vonage (formerly Nexmo)
1. Sign up at [Vonage](https://www.vonage.com/)
2. Get your API Key and Secret
3. In Supabase, select **Vonage**
4. Enter your Vonage credentials

### Step 3: Configure Phone Auth Settings

In the Phone Auth section, configure:

1. **Enable Phone Auth**: Toggle ON
2. **SMS Provider**: Select your chosen provider
3. **Provider Settings**: Enter your credentials
4. **OTP Expiry**: Set OTP expiration time (default: 60 seconds)
5. **OTP Length**: Set OTP length (default: 6 digits)

### Step 4: Test Phone Authentication

1. Visit your login page: `http://localhost:3000/auth/login`
2. Click on the **Phone** tab
3. Enter a valid phone number (with country code)
4. Click **Send OTP**
5. Check your phone for the OTP
6. Enter the OTP and click **Verify OTP**

### Step 5: Phone Number Format

Make sure phone numbers are in international format:
- ✅ Correct: `+1234567890`
- ✅ Correct: `+44123456789`
- ❌ Incorrect: `1234567890`
- ❌ Incorrect: `(123) 456-7890`

### Troubleshooting

**Phone Auth not working?**
- Verify your SMS provider credentials are correct
- Check that phone numbers include country code (+)
- Ensure you have credits in your SMS provider account
- Check Supabase logs in the dashboard for errors

**OTP not received?**
- Check your phone's spam/blocked messages
- Verify the phone number is correct
- Try a different phone number
- Check your SMS provider's delivery logs

**Rate limiting issues?**
- Supabase has built-in rate limiting for SMS
- Wait a few minutes between attempts
- Contact Supabase support if issues persist

### Development vs Production

**Development:**
- Test with your own phone number
- Use a test SMS provider if available
- Monitor SMS costs during development

**Production:**
- Use a reliable SMS provider with good delivery rates
- Set up proper error handling and retry logic
- Monitor SMS usage and costs
- Consider implementing fraud prevention

### Cost Considerations

Phone authentication incurs SMS costs:
- **Twilio**: ~$0.0075 per SMS
- **MessageBird**: ~$0.0045 per SMS  
- **Textlocal**: Varies by region
- **Vonage**: ~$0.0053 per SMS

Budget accordingly based on expected user volume.

### Alternative: Email-only Authentication

If you prefer not to set up phone authentication:
1. Users can still sign up with email + password
2. Email magic links are available as passwordless option
3. Social login (Google, GitHub, Discord) works without SMS setup
4. Phone authentication will show an error message until configured

The login form will gracefully handle missing phone auth configuration.
