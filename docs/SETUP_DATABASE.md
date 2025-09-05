# Database Setup Instructions

## Setting up the CodeFlow Marketplace Database

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `yvgpqgwguwairgzdlhdi`
3. Navigate to the **SQL Editor** in the left sidebar

### Step 2: Execute the Database Schema

Copy and paste the contents of `database-schema.sql` into the SQL Editor and click **Run**.

The schema will create:

- **8 main tables** for the marketplace functionality
- **Row Level Security (RLS)** policies for data protection
- **Indexes** for optimal performance
- **Triggers** for automatic timestamp updates
- **Sample categories** to get started

### Step 3: Verify Installation

After running the schema, you should see these tables in your database:

1. **profiles** - User profiles and seller information
2. **categories** - Code category organization  
3. **listings** - Code listings and marketplace items
4. **transactions** - Purchase and payment records
5. **reviews** - Rating and review system
6. **plagiarism_reports** - AI plagiarism detection results
7. **cart_items** - Shopping cart functionality
8. **favorites** - User favorites and wishlist

### Step 4: Set Up Authentication Providers (Optional)

To enable social login, configure these providers in **Authentication > Providers**:

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://yvgpqgwguwairgzdlhdi.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret to Supabase

#### GitHub OAuth  
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `https://yvgpqgwguwairgzdlhdi.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret to Supabase

#### Discord OAuth
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Add redirect URI: `https://yvgpqgwguwairgzdlhdi.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret to Supabase

### Step 5: Test the Setup

Once the database is set up:

1. Restart your development server: `npm run dev`
2. Visit http://localhost:3000 
3. The DevWarning should disappear
4. Try creating an account or signing in
5. Explore the marketplace functionality

### Troubleshooting

**If you get permission errors:**
- Make sure RLS policies are properly set up
- Check that the `handle_new_user()` function is created
- Verify the auth trigger is active

**If authentication doesn't work:**
- Check your Supabase project URL and API key
- Ensure redirect URLs are correctly configured
- Check browser console for any errors

**Need help?**
- Check the Supabase documentation: https://supabase.com/docs
- Review the application logs in your terminal
- Open an issue in the project repository
