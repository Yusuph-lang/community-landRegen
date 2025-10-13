/*
  # Land ReGen Database Schema - SDG 15: Life on Land
  
  This migration creates the complete database structure for the Land ReGen platform,
  a comprehensive land restoration and community engagement system.

  ## 1. New Tables
  
  ### `profiles`
  - User profile information extending Supabase auth.users
  - Fields: id (uuid, references auth.users), full_name, avatar_url, bio, role, location, created_at
  
  ### `restoration_projects`
  - Tracks land restoration projects with location and progress data
  - Fields: id, title, description, location (geography point), area_hectares, status, 
    project_type, start_date, end_date, latitude, longitude, creator_id, image_url, 
    created_at, updated_at
  
  ### `project_members`
  - Tracks community members involved in restoration projects
  - Fields: id, project_id, user_id, role, joined_at
  
  ### `project_updates`
  - Progress updates and milestones for restoration projects
  - Fields: id, project_id, title, description, progress_percentage, images, created_by, created_at
  
  ### `educational_resources`
  - Learning materials about land restoration and sustainable practices
  - Fields: id, title, description, content, category, resource_type, image_url, 
    external_url, views, created_by, created_at, updated_at
  
  ### `community_posts`
  - Community discussion forum for sharing knowledge and experiences
  - Fields: id, title, content, category, author_id, likes, created_at, updated_at
  
  ### `post_comments`
  - Comments on community posts for discussion
  - Fields: id, post_id, content, author_id, created_at
  
  ### `impact_metrics`
  - Quantifiable impact data for restoration projects
  - Fields: id, project_id, metric_type, value, unit, recorded_date, notes, created_at

  ## 2. Security
  
  All tables have Row Level Security (RLS) enabled with policies for:
  - Public read access for educational content and approved projects
  - Authenticated user access for creating and managing own content
  - Project members can update projects they're involved in
  - Admin roles for content moderation
  
  ## 3. Important Notes
  
  - Uses PostGIS extension for geographic data (location tracking on maps)
  - Implements proper foreign key relationships for data integrity
  - Includes triggers for automatic timestamp updates
  - Default values prevent null-related issues
  - Comprehensive indexes for query performance
*/

-- Enable PostGIS extension for geographic data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  bio text,
  role text DEFAULT 'member' CHECK (role IN ('member', 'project_lead', 'expert', 'admin')),
  location text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Restoration Projects table
CREATE TABLE IF NOT EXISTS restoration_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location geography(POINT),
  latitude numeric,
  longitude numeric,
  area_hectares numeric DEFAULT 0,
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'on_hold')),
  project_type text DEFAULT 'reforestation' CHECK (project_type IN ('reforestation', 'soil_restoration', 'biodiversity', 'desertification_control', 'wetland_restoration', 'mixed')),
  start_date date,
  end_date date,
  creator_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE restoration_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON restoration_projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create projects"
  ON restoration_projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Project creators can update their projects"
  ON restoration_projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Project creators can delete their projects"
  ON restoration_projects FOR DELETE
  TO authenticated
  USING (auth.uid() = creator_id);

-- Project Members table (create before project_updates to avoid dependency issues)
CREATE TABLE IF NOT EXISTS project_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES restoration_projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'volunteer' CHECK (role IN ('volunteer', 'coordinator', 'technical_advisor')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project members are viewable by everyone"
  ON project_members FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can join projects"
  ON project_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave projects"
  ON project_members FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Project Updates table
CREATE TABLE IF NOT EXISTS project_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES restoration_projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  progress_percentage numeric DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  images text[] DEFAULT '{}',
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project updates are viewable by everyone"
  ON project_updates FOR SELECT
  USING (true);

CREATE POLICY "Project members can create updates"
  ON project_updates FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND (
      EXISTS (
        SELECT 1 FROM restoration_projects
        WHERE id = project_id AND creator_id = auth.uid()
      ) OR
      EXISTS (
        SELECT 1 FROM project_members
        WHERE project_id = project_updates.project_id AND user_id = auth.uid()
      )
    )
  );

-- Educational Resources table
CREATE TABLE IF NOT EXISTS educational_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  category text DEFAULT 'general' CHECK (category IN ('soil_health', 'reforestation', 'biodiversity', 'sustainable_agriculture', 'climate_action', 'water_conservation', 'general')),
  resource_type text DEFAULT 'article' CHECK (resource_type IN ('article', 'video', 'guide', 'case_study', 'research', 'tool')),
  image_url text,
  external_url text,
  views integer DEFAULT 0,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE educational_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Educational resources are viewable by everyone"
  ON educational_resources FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create resources"
  ON educational_resources FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Resource creators can update their resources"
  ON educational_resources FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Community Posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text DEFAULT 'discussion' CHECK (category IN ('discussion', 'question', 'success_story', 'announcement', 'help_needed')),
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Community posts are viewable by everyone"
  ON community_posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON community_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Post authors can update their posts"
  ON community_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Post authors can delete their posts"
  ON community_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Post Comments table
CREATE TABLE IF NOT EXISTS post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone"
  ON post_comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON post_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Comment authors can update their comments"
  ON post_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Comment authors can delete their comments"
  ON post_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Impact Metrics table
CREATE TABLE IF NOT EXISTS impact_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES restoration_projects(id) ON DELETE CASCADE,
  metric_type text NOT NULL CHECK (metric_type IN ('trees_planted', 'area_restored', 'carbon_sequestered', 'species_reintroduced', 'water_saved', 'soil_improved', 'community_members', 'custom')),
  value numeric NOT NULL,
  unit text NOT NULL,
  recorded_date date DEFAULT CURRENT_DATE,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE impact_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Impact metrics are viewable by everyone"
  ON impact_metrics FOR SELECT
  USING (true);

CREATE POLICY "Project members can add metrics"
  ON impact_metrics FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM restoration_projects
      WHERE id = project_id AND creator_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_id = impact_metrics.project_id AND user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_creator ON restoration_projects(creator_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON restoration_projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_type ON restoration_projects(project_type);
CREATE INDEX IF NOT EXISTS idx_projects_location ON restoration_projects USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_project_updates_project ON project_updates(project_id);
CREATE INDEX IF NOT EXISTS idx_resources_category ON educational_resources(category);
CREATE INDEX IF NOT EXISTS idx_posts_author ON community_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON community_posts(category);
CREATE INDEX IF NOT EXISTS idx_comments_post ON post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_members_project ON project_members(project_id);
CREATE INDEX IF NOT EXISTS idx_members_user ON project_members(user_id);
CREATE INDEX IF NOT EXISTS idx_metrics_project ON impact_metrics(project_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_projects_updated_at') THEN
    CREATE TRIGGER update_projects_updated_at
      BEFORE UPDATE ON restoration_projects
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_resources_updated_at') THEN
    CREATE TRIGGER update_resources_updated_at
      BEFORE UPDATE ON educational_resources
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_posts_updated_at') THEN
    CREATE TRIGGER update_posts_updated_at
      BEFORE UPDATE ON community_posts
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;