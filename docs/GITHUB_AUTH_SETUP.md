# GitHub Authentication Setup

## Setting up GitHub OAuth for CodeFlow Marketplace

### Step 1: Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the application details:
   
   **Application name**: `CodeFlow Marketplace`
   
   **Homepage URL**: `http://localhost:3000` (for development)
   - For production: `https://yourdomain.com`
   
   **Application description**: `A modern marketplace for buying and selling original code`
   
   **Authorization callback URL**: `https://yvgpqgwguwairgzdlhdi.supabase.co/auth/v1/callback`

4. Click **Register application**

### Step 2: Get GitHub Credentials

After creating the OAuth app:

1. Copy the **Client ID**
2. Click **Generate a new client secret**
3. Copy the **Client Secret** (save it securely - you won't see it again!)

### Step 3: Configure in Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `yvgpqgwguwairgzdlhdi`
3. Navigate to **Authentication** → **Providers**
4. Find **GitHub** in the list of providers
5. Enable GitHub authentication by toggling it ON
6. Enter your credentials:
   - **Client ID**: [Your GitHub Client ID]
   - **Client Secret**: [Your GitHub Client Secret]
7. Click **Save**

### Step 4: Test GitHub Authentication

1. Visit your login page: `http://localhost:3000/auth/login`
2. Click the **GitHub** button
3. You should be redirected to GitHub
4. Authorize the CodeFlow Marketplace app
5. You'll be redirected back and signed in

### Step 5: Production Setup

When deploying to production:

1. Create a new GitHub OAuth App (or update the existing one)
2. Update the **Homepage URL** to your production domain
3. Update the **Authorization callback URL** to:
   `https://yvgpqgwguwairgzdlhdi.supabase.co/auth/v1/callback`
4. Update the Client ID/Secret in Supabase if they changed

### GitHub User Data Available

When users sign in with GitHub, you'll have access to:
- **Username**: GitHub username
- **Full Name**: Display name from GitHub profile
- **Email**: Primary email (if public)
- **Avatar**: GitHub profile picture
- **GitHub URL**: Link to their GitHub profile

This data will be automatically stored in your `profiles` table.

### Troubleshooting

**"Application not found" error:**
- Check that the Client ID is correct in Supabase
- Verify the OAuth app exists in GitHub

**"Redirect URI mismatch" error:**
- Ensure the callback URL in GitHub matches exactly:
  `https://yvgpqgwguwairgzdlhdi.supabase.co/auth/v1/callback`
- No trailing slashes or extra parameters

**"Access denied" error:**
- Check that the Client Secret is correct in Supabase
- Try regenerating the client secret in GitHub

**Email not available:**
- Some GitHub users keep their email private
- The app will still work, but email will be null
- Consider asking users to add an email in your app

### Security Considerations

1. **Keep Client Secret secure**: Never expose it in frontend code
2. **Use HTTPS in production**: GitHub requires HTTPS for OAuth
3. **Validate user data**: Don't assume GitHub data is always present
4. **Handle missing emails**: Some users may not have public emails

### Additional GitHub Scopes (Optional)

By default, Supabase requests basic user info. If you need additional permissions:

1. In Supabase GitHub provider settings, you can add scopes like:
   - `user:email` - Access to user's email (even if private)
   - `read:user` - Read all user profile data
   - `repo` - Access to repositories (if needed for your marketplace)

2. Add scopes in the **Scopes** field, separated by spaces:
   ```
   user:email read:user
   ```

### GitHub API Integration (Advanced)

If you want to integrate with GitHub API for code analysis:

1. The OAuth token can be used to make GitHub API calls
2. Access token is available in the user session
3. Use it to fetch user repositories, commits, etc.
4. This could be useful for plagiarism detection

Example API call:
```javascript
// Get user's repositories
const response = await fetch('https://api.github.com/user/repos', {
  headers: {
    'Authorization': `token ${github_access_token}`,
  },
});
```

This setup will enable seamless GitHub authentication for your CodeFlow Marketplace!
