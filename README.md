# Land ReGen - SDG 15: Life on Land

A comprehensive platform for land restoration projects, connecting communities, resources, and technology to restore terrestrial ecosystems and promote sustainable land use.

## Overview

Land ReGen addresses UN Sustainable Development Goal 15 (Life on Land) by providing tools and community support for:

- **Land Restoration Projects**: Track and manage reforestation, soil restoration, and biodiversity initiatives
- **Educational Resources**: Access guides, articles, and case studies on sustainable practices
- **Community Engagement**: Connect with restoration advocates and share experiences
- **AI Assistance**: Get personalized guidance on restoration techniques
- **Interactive Mapping**: Visualize project locations and progress worldwide

## Features

### 1. Project Management
- Create and track restoration projects
- Map project locations with Google Maps integration
- Monitor progress with updates and metrics
- Track impact: trees planted, area restored, carbon sequestered
- Support multiple project types: reforestation, soil restoration, biodiversity, wetland restoration

### 2. Educational Hub
- Comprehensive library of restoration resources
- Categories: soil health, reforestation, biodiversity, sustainable agriculture
- Multiple formats: articles, videos, guides, case studies
- Search and filter functionality
- View tracking and resource rating

### 3. Community Platform
- Discussion forums for knowledge sharing
- Success story sharing
- Help requests and Q&A
- Community-driven content
- Expert insights and advice

### 4. AI Assistant
- Personalized restoration guidance
- Best practices recommendations
- Climate-adapted species suggestions
- Problem-solving support
- 24/7 availability

### 5. User Profiles
- Personal restoration journey tracking
- Role-based participation (member, project lead, expert)
- Project and contribution history
- Community networking

## Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful iconography
- **Vite** - Fast build tool

### Backend & Database
- **Supabase** - PostgreSQL database with real-time capabilities
- **PostGIS** - Geographic data support
- **Row Level Security** - Secure data access
- **Authentication** - Email/password auth

### Key Features
- Responsive design for all devices
- Real-time data updates
- Secure authentication
- Geographic mapping
- Role-based access control

## Database Schema

### Core Tables

**profiles**
- User information extending Supabase auth
- Roles: member, project_lead, expert, admin

**restoration_projects**
- Project details, location, status, type
- Area tracking and dates
- Creator relationships

**project_updates**
- Progress tracking
- Milestone documentation
- Image galleries

**educational_resources**
- Learning materials
- Categorized content
- View tracking

**community_posts**
- Discussion threads
- Categories and likes
- Author attribution

**project_members**
- Team participation
- Role assignments

**impact_metrics**
- Quantifiable outcomes
- Multiple metric types
- Date tracking

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (provided)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd land-regen
```

2. Install dependencies
```bash
npm install
```

3. Environment variables are pre-configured in `.env`

4. Start development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

### Google Maps Setup

To enable map features, replace `YOUR_GOOGLE_MAPS_API_KEY` in `src/components/ProjectMap.tsx` with your Google Maps API key:

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Maps JavaScript API
4. Create credentials (API Key)
5. Restrict key to your domain
6. Update the key in ProjectMap.tsx

## Usage Guide

### For Community Members

1. **Sign Up**: Create an account to participate
2. **Explore Projects**: Browse restoration initiatives worldwide
3. **Learn**: Access educational resources
4. **Engage**: Join discussions and share experiences
5. **Get Help**: Use AI assistant for guidance

### For Project Leads

1. **Create Projects**: Submit new restoration initiatives
2. **Track Progress**: Add updates and metrics
3. **Build Teams**: Invite volunteers
4. **Share Knowledge**: Contribute resources
5. **Inspire Others**: Share success stories

### For Experts

1. **Share Expertise**: Create educational content
2. **Advise Projects**: Provide technical guidance
3. **Answer Questions**: Support community learning
4. **Mentor**: Guide project leads
5. **Research**: Document case studies

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Layout.tsx     # Main layout with navigation
│   ├── Auth.tsx       # Authentication modal
│   ├── ProjectForm.tsx
│   ├── ProjectMap.tsx # Google Maps integration
│   ├── ResourceForm.tsx
│   └── PostForm.tsx
├── views/             # Main application views
│   ├── Home.tsx       # Dashboard with statistics
│   ├── Projects.tsx   # Project listings
│   ├── Resources.tsx  # Educational hub
│   ├── Community.tsx  # Discussion platform
│   ├── AIAssistant.tsx # AI guidance
│   └── Profile.tsx    # User profile
├── contexts/          # React contexts
│   └── AuthContext.tsx
├── lib/               # Utilities and config
│   ├── supabase.ts    # Supabase client
│   └── database.types.ts
└── App.tsx            # Main app component
```

## Key Concepts

### SDG 15: Life on Land

This project directly contributes to:

- **Target 15.1**: Conservation of terrestrial ecosystems
- **Target 15.2**: Sustainable forest management
- **Target 15.3**: Combat desertification and restore degraded land
- **Target 15.5**: Reduce degradation of natural habitats
- **Target 15.9**: Integrate ecosystem values into planning

### Land Restoration Benefits

- Carbon sequestration for climate change mitigation
- Biodiversity conservation
- Soil health improvement
- Water cycle regulation
- Food security enhancement
- Community livelihood support

## Security

- Row Level Security (RLS) enabled on all tables
- Authenticated access for data modification
- Public read access for educational content
- Secure password authentication
- Protected API endpoints

## Best Practices

### For Restoration Projects

1. **Start Small**: Pilot areas before scaling
2. **Use Native Species**: Adapted to local conditions
3. **Engage Community**: Local buy-in is essential
4. **Monitor Progress**: Track metrics regularly
5. **Document Learning**: Share successes and challenges
6. **Be Patient**: Restoration takes time

### For Platform Use

1. **Share Knowledge**: Contribute what you learn
2. **Be Respectful**: Constructive community engagement
3. **Verify Information**: Cross-check recommendations
4. **Stay Active**: Regular updates help others
5. **Connect Locally**: Find nearby projects

## Contributing

We welcome contributions from:

- Restoration practitioners
- Environmental scientists
- Software developers
- Educators
- Community organizers

## Support

For questions or support:
- Use the AI Assistant within the platform
- Post in Community discussions
- Check Educational Resources
- Contact platform administrators

## License

This project is built for educational and environmental purposes, promoting UN SDG 15.

## Acknowledgments

- UN Sustainable Development Goals framework
- Supabase for database infrastructure
- Global restoration community
- Indigenous land stewardship practices
- Open source contributors

---

**Built with dedication to restoring life on land, one hectare at a time.**
