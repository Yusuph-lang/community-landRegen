# Important Setup Notes

## Google Maps Integration

The project includes an interactive map feature for visualizing land restoration projects. To fully enable this feature, you need to add a Google Maps API key.

### Current Status

The map component is implemented in `src/components/ProjectMap.tsx` but has a placeholder API key that needs to be replaced.

### How to Get a Google Maps API Key

1. **Visit Google Cloud Console**
   - Go to [console.cloud.google.com](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Required API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Maps JavaScript API"
   - Click "Enable"

3. **Create Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated key

4. **Secure Your Key (Recommended)**
   - Click on the key you just created
   - Under "API restrictions", select "Restrict key"
   - Choose "Maps JavaScript API"
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain (e.g., `yourdomain.netlify.app/*`)

5. **Update the Code**
   - Open `src/components/ProjectMap.tsx`
   - Find line with: `script.src = \`https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY\``
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key

6. **Rebuild and Deploy**
   ```bash
   npm run build
   ```

### Alternative: Use Without Maps

If you don't want to set up Google Maps immediately, the platform will still work perfectly! The map component will simply not display, but all other features remain fully functional:

- Projects can still be created and viewed
- Location data (lat/long) is still stored
- Filter and search features work normally
- You can add the map feature later

### Cost Considerations

Google Maps offers:
- **$200 free credit** per month
- Approximately **28,000 free map loads** per month
- Pay-as-you-go pricing after that
- Most small to medium projects stay within free tier

### Testing the Map

After adding your API key:

1. Go to the Projects page
2. The map should display showing project locations
3. Click markers to see project details
4. Map should zoom to fit all projects

### Troubleshooting

**Map doesn't display:**
- Check browser console for errors
- Verify API key is correct
- Ensure Maps JavaScript API is enabled
- Check for any billing issues in Google Cloud

**"This page can't load Google Maps correctly":**
- API key may be restricted to wrong domain
- Billing not set up on Google Cloud account
- API not enabled properly

## Database Seeding

The platform includes pre-populated educational resources. If you want to add more sample data:

### Sample Projects

```sql
INSERT INTO restoration_projects (title, description, latitude, longitude, area_hectares, status, project_type, start_date, image_url, creator_id)
VALUES
('Amazon Rainforest Reforestation', 'Large-scale reforestation initiative in the Brazilian Amazon', -3.4653, -62.2159, 150, 'active', 'reforestation', '2024-01-15', 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg', '[your-user-id]');
```

### Sample Community Posts

```sql
INSERT INTO community_posts (title, content, category, author_id)
VALUES
('Welcome to the Land ReGen Community!', 'Excited to connect with fellow restoration practitioners. Let''s share our experiences and learn together!', 'announcement', '[your-user-id]');
```

## Environment Variables

All required environment variables are pre-configured in the `.env` file:

```
VITE_SUPABASE_URL=https://mupzrnoupgauaowhovjs.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

These connect to your Supabase database which is already set up with:
- All required tables and schemas
- Row Level Security policies
- Sample educational resources
- Authentication configuration

## First Steps After Deployment

1. **Create Your Account**
   - Sign up with email/password
   - Complete your profile

2. **Explore Features**
   - Browse educational resources
   - Check out the AI Assistant
   - Visit the community forum

3. **Create First Project**
   - Add a restoration project
   - Include location data
   - Track progress with updates

4. **Engage Community**
   - Post an introduction
   - Ask questions
   - Share your experiences

## Customization Ideas

### Branding
- Update logo in `Layout.tsx` (replace Sprout icon)
- Modify color scheme in Tailwind config
- Add your organization name

### Content
- Add region-specific resources
- Include local case studies
- Translate to local languages

### Features
- Add photo upload for projects
- Integrate more mapping features
- Build mobile app version
- Add email notifications

## Performance Tips

1. **Optimize Images**
   - Use WebP format
   - Compress images
   - Use CDN for hosting

2. **Database Queries**
   - Add indexes for common queries
   - Use pagination for large datasets
   - Cache frequently accessed data

3. **Build Optimization**
   - Already configured with Vite
   - Code splitting enabled
   - Production builds minified

## Security Checklist

- ✅ Row Level Security enabled on all tables
- ✅ Authentication required for data modification
- ✅ Environment variables secured
- ✅ API keys restricted to domains
- ⚠️ Add rate limiting for API calls (future)
- ⚠️ Implement CAPTCHA for public forms (future)

## Support Resources

- **Documentation**: See README.md
- **Deployment**: See DEPLOYMENT.md
- **Project Proposal**: See PROJECT_PROPOSAL.md
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **React Docs**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Quick Reference

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
npm run typecheck    # Check TypeScript
```

### Supabase
- Dashboard: [supabase.com/dashboard](https://supabase.com/dashboard)
- SQL Editor: Test queries directly
- Table Editor: View/edit data visually
- Auth: Manage users

### Deployment
- Netlify: Deploy with one click
- Vercel: Alternative platform
- GitHub Pages: Static hosting option

---

**You're all set! Your Land ReGen platform is ready to make an impact on SDG 15. 🌱**

If you encounter any issues or need clarification, refer to the comprehensive documentation provided.
