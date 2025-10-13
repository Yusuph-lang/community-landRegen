# Deployment Guide

## Quick Deploy to Netlify

This Land ReGen platform is ready to deploy to Netlify with your existing Supabase database.

### Prerequisites

- Supabase project (already configured)
- Netlify account
- Google Maps API key (optional, for map features)

### Deployment Steps

#### Option 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### Option 2: Netlify Web Interface

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Connect your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
7. Click "Deploy site"

### Environment Variables

The following environment variables are pre-configured in `.env` file:

```
VITE_SUPABASE_URL=https://mupzrnoupgauaowhovjs.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

These will work automatically when deploying, but you can also set them in Netlify's environment variables section for additional security.

### Post-Deployment Setup

#### 1. Google Maps Integration (Optional)

To enable the interactive map feature:

1. Get a Google Maps API key:
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Enable "Maps JavaScript API"
   - Create an API key
   - Restrict it to your Netlify domain

2. Update `src/components/ProjectMap.tsx`:
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key

3. Rebuild and redeploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

#### 2. Domain Configuration

1. In Netlify dashboard, go to "Domain settings"
2. Add your custom domain (optional)
3. Configure DNS settings
4. Enable HTTPS (automatic with Netlify)

#### 3. Supabase Configuration

Your Supabase database is already set up with:
- All required tables
- Row Level Security policies
- Sample educational resources
- Authentication configured

No additional Supabase configuration needed!

### Testing the Deployment

After deployment:

1. **Visit your site** at the Netlify-provided URL
2. **Test authentication**:
   - Click "Sign In"
   - Create a new account
   - Verify email/password login works

3. **Test features**:
   - View Home dashboard with statistics
   - Browse educational resources
   - Create a test project (sign in required)
   - Post in community
   - Try the AI Assistant

### Troubleshooting

#### Build Fails
- Check Node.js version (18+ required)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Verify `.env` file exists with correct variables

#### Authentication Issues
- Verify Supabase URL and key in environment variables
- Check Supabase project status
- Ensure email confirmations are disabled in Supabase Auth settings

#### Database Connection Issues
- Confirm Supabase project is active
- Verify RLS policies are enabled
- Check browser console for specific errors

### Performance Optimization

For production:

1. **Enable Netlify Analytics** (optional)
2. **Configure caching headers** in `netlify.toml`
3. **Enable compression** (automatic with Netlify)
4. **Add Netlify Functions** for server-side operations if needed

### Monitoring

Track your platform's impact:

- User registrations
- Projects created
- Community engagement
- Resource views
- Overall platform growth

### Support

For deployment issues:
- Check Netlify build logs
- Review browser console errors
- Verify environment variables
- Test locally first: `npm run dev`

---

**Your Land ReGen platform is now ready to make a global impact on land restoration! 🌱**
