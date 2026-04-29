export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      fc_artists: {
        Row: {
          apple_music_link: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          personality: string | null
          spotify_link: string | null
          status: string
          updated_at: string
          visual_style_prompt: string | null
          youtube_link: string | null
        }
        Insert: {
          apple_music_link?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          personality?: string | null
          spotify_link?: string | null
          status?: string
          updated_at?: string
          visual_style_prompt?: string | null
          youtube_link?: string | null
        }
        Update: {
          apple_music_link?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          personality?: string | null
          spotify_link?: string | null
          status?: string
          updated_at?: string
          visual_style_prompt?: string | null
          youtube_link?: string | null
        }
        Relationships: []
      }
      fc_songs: {
        Row: {
          apple_music_link: string | null
          artist_id: string
          audio_url: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          display_order: number
          hyperfollow_url: string | null
          id: string
          lyrics: string | null
          mood: string | null
          release_date: string | null
          spotify_link: string | null
          status: string
          title: string
          updated_at: string
          youtube_link: string | null
        }
        Insert: {
          apple_music_link?: string | null
          artist_id: string
          audio_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          hyperfollow_url?: string | null
          id?: string
          lyrics?: string | null
          mood?: string | null
          release_date?: string | null
          spotify_link?: string | null
          status?: string
          title: string
          updated_at?: string
          youtube_link?: string | null
        }
        Update: {
          apple_music_link?: string | null
          artist_id?: string
          audio_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          hyperfollow_url?: string | null
          id?: string
          lyrics?: string | null
          mood?: string | null
          release_date?: string | null
          spotify_link?: string | null
          status?: string
          title?: string
          updated_at?: string
          youtube_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fc_songs_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "fc_artists"
            referencedColumns: ["id"]
          },
        ]
      }
      fc_videos: {
        Row: {
          created_at: string
          embed_url: string | null
          id: string
          song_id: string
          status: string
          style: string | null
          updated_at: string
          video_prompt: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          embed_url?: string | null
          id?: string
          song_id: string
          status?: string
          style?: string | null
          updated_at?: string
          video_prompt?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          embed_url?: string | null
          id?: string
          song_id?: string
          status?: string
          style?: string | null
          updated_at?: string
          video_prompt?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fc_videos_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "fc_songs"
            referencedColumns: ["id"]
          },
        ]
      }
      futurecandy_enquiries: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          source_page: string | null
          status: string
          subject: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          source_page?: string | null
          status?: string
          subject?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          source_page?: string | null
          status?: string
          subject?: string
        }
        Relationships: []
      }
      neoncandy_partner_enquiries: {
        Row: {
          company: string | null
          created_at: string
          email: string
          enquiry_type: string
          full_name: string
          id: string
          message: string
          phone: string | null
          source_page: string | null
          status: string
          updated_at: string
          website: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          enquiry_type?: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
          source_page?: string | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          enquiry_type?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          source_page?: string | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
