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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      auditions: {
        Row: {
          created_at: string
          details: string | null
          id: string
          location: string | null
          name: string
          status: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          location?: string | null
          name: string
          status?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          location?: string | null
          name?: string
          status?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string
          event_type: string | null
          id: string
          location: string | null
          message: string | null
          name: string
          organization: string | null
          phone: string
          preferred_date: string | null
        }
        Insert: {
          created_at?: string
          event_type?: string | null
          id?: string
          location?: string | null
          message?: string | null
          name: string
          organization?: string | null
          phone: string
          preferred_date?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string | null
          id?: string
          location?: string | null
          message?: string | null
          name?: string
          organization?: string | null
          phone?: string
          preferred_date?: string | null
        }
        Relationships: []
      }
      characters: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          emoji: string | null
          id: string
          image_url: string | null
          name: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          emoji?: string | null
          id?: string
          image_url?: string | null
          name: string
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          emoji?: string | null
          id?: string
          image_url?: string | null
          name?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string
          description: string | null
          display_order: number | null
          id: string
          location: string
          name: string
          photos: string[] | null
          status: string
          updated_at: string
          video_link: string | null
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          display_order?: number | null
          id?: string
          location: string
          name: string
          photos?: string[] | null
          status?: string
          updated_at?: string
          video_link?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          display_order?: number | null
          id?: string
          location?: string
          name?: string
          photos?: string[] | null
          status?: string
          updated_at?: string
          video_link?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          alt_text: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string | null
          label: string
          updated_at: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          label: string
          updated_at?: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string
          created_at: string
          designation: string | null
          id: string
          is_visible: boolean | null
          name: string
          rating: number | null
        }
        Insert: {
          content: string
          created_at?: string
          designation?: string | null
          id?: string
          is_visible?: boolean | null
          name: string
          rating?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          designation?: string | null
          id?: string
          is_visible?: boolean | null
          name?: string
          rating?: number | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
