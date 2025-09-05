export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          username: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          website: string | null
          github_username: string | null
          twitter_username: string | null
          role: 'buyer' | 'seller' | 'admin'
          is_verified: boolean
          reputation_score: number
          total_sales: number
          total_purchases: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          github_username?: string | null
          twitter_username?: string | null
          role?: 'buyer' | 'seller' | 'admin'
          is_verified?: boolean
          reputation_score?: number
          total_sales?: number
          total_purchases?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          github_username?: string | null
          twitter_username?: string | null
          role?: 'buyer' | 'seller' | 'admin'
          is_verified?: boolean
          reputation_score?: number
          total_sales?: number
          total_purchases?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          parent_id: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      listings: {
        Row: {
          id: string
          seller_id: string
          title: string
          slug: string
          description: string
          short_description: string | null
          category_id: string
          programming_languages: string[]
          tags: string[]
          price: number
          pricing_model: 'one_time' | 'subscription' | 'royalty'
          royalty_percentage: number | null
          demo_url: string | null
          repository_url: string | null
          documentation_url: string | null
          preview_images: string[]
          code_files: Json
          dependencies: Json | null
          license_type: string
          is_open_source: boolean
          difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          estimated_implementation_time: number | null
          is_featured: boolean
          is_active: boolean
          view_count: number
          download_count: number
          like_count: number
          rating_average: number
          rating_count: number
          plagiarism_score: number | null
          plagiarism_status: 'pending' | 'clean' | 'flagged' | 'blocked'
          last_plagiarism_check: string | null
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          seller_id: string
          title: string
          slug: string
          description: string
          short_description?: string | null
          category_id: string
          programming_languages: string[]
          tags?: string[]
          price: number
          pricing_model?: 'one_time' | 'subscription' | 'royalty'
          royalty_percentage?: number | null
          demo_url?: string | null
          repository_url?: string | null
          documentation_url?: string | null
          preview_images?: string[]
          code_files: Json
          dependencies?: Json | null
          license_type: string
          is_open_source?: boolean
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          estimated_implementation_time?: number | null
          is_featured?: boolean
          is_active?: boolean
          view_count?: number
          download_count?: number
          like_count?: number
          rating_average?: number
          rating_count?: number
          plagiarism_score?: number | null
          plagiarism_status?: 'pending' | 'clean' | 'flagged' | 'blocked'
          last_plagiarism_check?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          seller_id?: string
          title?: string
          slug?: string
          description?: string
          short_description?: string | null
          category_id?: string
          programming_languages?: string[]
          tags?: string[]
          price?: number
          pricing_model?: 'one_time' | 'subscription' | 'royalty'
          royalty_percentage?: number | null
          demo_url?: string | null
          repository_url?: string | null
          documentation_url?: string | null
          preview_images?: string[]
          code_files?: Json
          dependencies?: Json | null
          license_type?: string
          is_open_source?: boolean
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          estimated_implementation_time?: number | null
          is_featured?: boolean
          is_active?: boolean
          view_count?: number
          download_count?: number
          like_count?: number
          rating_average?: number
          rating_count?: number
          plagiarism_score?: number | null
          plagiarism_status?: 'pending' | 'clean' | 'flagged' | 'blocked'
          last_plagiarism_check?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      transactions: {
        Row: {
          id: string
          buyer_id: string
          seller_id: string
          listing_id: string
          stripe_payment_intent_id: string | null
          amount: number
          currency: string
          commission_amount: number
          seller_amount: number
          status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded'
          payment_method: string | null
          escrow_status: 'held' | 'released' | 'disputed'
          milestone_data: Json | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          buyer_id: string
          seller_id: string
          listing_id: string
          stripe_payment_intent_id?: string | null
          amount: number
          currency?: string
          commission_amount: number
          seller_amount: number
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded'
          payment_method?: string | null
          escrow_status?: 'held' | 'released' | 'disputed'
          milestone_data?: Json | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          buyer_id?: string
          seller_id?: string
          listing_id?: string
          stripe_payment_intent_id?: string | null
          amount?: number
          currency?: string
          commission_amount?: number
          seller_amount?: number
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded'
          payment_method?: string | null
          escrow_status?: 'held' | 'released' | 'disputed'
          milestone_data?: Json | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          id: string
          transaction_id: string
          reviewer_id: string
          reviewee_id: string
          listing_id: string
          rating: number
          title: string | null
          comment: string | null
          is_public: boolean
          helpful_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          transaction_id: string
          reviewer_id: string
          reviewee_id: string
          listing_id: string
          rating: number
          title?: string | null
          comment?: string | null
          is_public?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          transaction_id?: string
          reviewer_id?: string
          reviewee_id?: string
          listing_id?: string
          rating?: number
          title?: string | null
          comment?: string | null
          is_public?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          }
        ]
      }
      plagiarism_reports: {
        Row: {
          id: string
          listing_id: string
          similarity_score: number
          detected_sources: Json
          analysis_data: Json
          ai_confidence: number
          status: 'pending' | 'reviewed' | 'confirmed' | 'false_positive'
          reviewer_id: string | null
          reviewer_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          similarity_score: number
          detected_sources: Json
          analysis_data: Json
          ai_confidence: number
          status?: 'pending' | 'reviewed' | 'confirmed' | 'false_positive'
          reviewer_id?: string | null
          reviewer_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          similarity_score?: number
          detected_sources?: Json
          analysis_data?: Json
          ai_confidence?: number
          status?: 'pending' | 'reviewed' | 'confirmed' | 'false_positive'
          reviewer_id?: string | null
          reviewer_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "plagiarism_reports_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plagiarism_reports_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          listing_id: string
          quantity: number
          added_at: string
        }
        Insert: {
          id?: string
          user_id: string
          listing_id: string
          quantity?: number
          added_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          listing_id?: string
          quantity?: number
          added_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          }
        ]
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          listing_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          listing_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          listing_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
