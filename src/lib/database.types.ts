export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          role: 'member' | 'project_lead' | 'expert' | 'admin'
          location: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: 'member' | 'project_lead' | 'expert' | 'admin'
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: 'member' | 'project_lead' | 'expert' | 'admin'
          location?: string | null
          created_at?: string
        }
      }
      restoration_projects: {
        Row: {
          id: string
          title: string
          description: string
          location: unknown | null
          latitude: number | null
          longitude: number | null
          area_hectares: number
          status: 'planning' | 'active' | 'completed' | 'on_hold'
          project_type: 'reforestation' | 'soil_restoration' | 'biodiversity' | 'desertification_control' | 'wetland_restoration' | 'mixed'
          start_date: string | null
          end_date: string | null
          creator_id: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location?: unknown | null
          latitude?: number | null
          longitude?: number | null
          area_hectares?: number
          status?: 'planning' | 'active' | 'completed' | 'on_hold'
          project_type?: 'reforestation' | 'soil_restoration' | 'biodiversity' | 'desertification_control' | 'wetland_restoration' | 'mixed'
          start_date?: string | null
          end_date?: string | null
          creator_id?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: unknown | null
          latitude?: number | null
          longitude?: number | null
          area_hectares?: number
          status?: 'planning' | 'active' | 'completed' | 'on_hold'
          project_type?: 'reforestation' | 'soil_restoration' | 'biodiversity' | 'desertification_control' | 'wetland_restoration' | 'mixed'
          start_date?: string | null
          end_date?: string | null
          creator_id?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      project_updates: {
        Row: {
          id: string
          project_id: string
          title: string
          description: string
          progress_percentage: number
          images: string[]
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          description: string
          progress_percentage?: number
          images?: string[]
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          description?: string
          progress_percentage?: number
          images?: string[]
          created_by?: string | null
          created_at?: string
        }
      }
      educational_resources: {
        Row: {
          id: string
          title: string
          description: string
          content: string
          category: 'soil_health' | 'reforestation' | 'biodiversity' | 'sustainable_agriculture' | 'climate_action' | 'water_conservation' | 'general'
          resource_type: 'article' | 'video' | 'guide' | 'case_study' | 'research' | 'tool'
          image_url: string | null
          external_url: string | null
          views: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          content: string
          category?: 'soil_health' | 'reforestation' | 'biodiversity' | 'sustainable_agriculture' | 'climate_action' | 'water_conservation' | 'general'
          resource_type?: 'article' | 'video' | 'guide' | 'case_study' | 'research' | 'tool'
          image_url?: string | null
          external_url?: string | null
          views?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content?: string
          category?: 'soil_health' | 'reforestation' | 'biodiversity' | 'sustainable_agriculture' | 'climate_action' | 'water_conservation' | 'general'
          resource_type?: 'article' | 'video' | 'guide' | 'case_study' | 'research' | 'tool'
          image_url?: string | null
          external_url?: string | null
          views?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      community_posts: {
        Row: {
          id: string
          title: string
          content: string
          category: 'discussion' | 'question' | 'success_story' | 'announcement' | 'help_needed'
          author_id: string | null
          likes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category?: 'discussion' | 'question' | 'success_story' | 'announcement' | 'help_needed'
          author_id?: string | null
          likes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: 'discussion' | 'question' | 'success_story' | 'announcement' | 'help_needed'
          author_id?: string | null
          likes?: number
          created_at?: string
          updated_at?: string
        }
      }
      post_comments: {
        Row: {
          id: string
          post_id: string
          content: string
          author_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          content: string
          author_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          content?: string
          author_id?: string | null
          created_at?: string
        }
      }
      project_members: {
        Row: {
          id: string
          project_id: string
          user_id: string
          role: 'volunteer' | 'coordinator' | 'technical_advisor'
          joined_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          role?: 'volunteer' | 'coordinator' | 'technical_advisor'
          joined_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          role?: 'volunteer' | 'coordinator' | 'technical_advisor'
          joined_at?: string
        }
      }
      impact_metrics: {
        Row: {
          id: string
          project_id: string
          metric_type: 'trees_planted' | 'area_restored' | 'carbon_sequestered' | 'species_reintroduced' | 'water_saved' | 'soil_improved' | 'community_members' | 'custom'
          value: number
          unit: string
          recorded_date: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          metric_type: 'trees_planted' | 'area_restored' | 'carbon_sequestered' | 'species_reintroduced' | 'water_saved' | 'soil_improved' | 'community_members' | 'custom'
          value: number
          unit: string
          recorded_date?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          metric_type?: 'trees_planted' | 'area_restored' | 'carbon_sequestered' | 'species_reintroduced' | 'water_saved' | 'soil_improved' | 'community_members' | 'custom'
          value?: number
          unit?: string
          recorded_date?: string
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
