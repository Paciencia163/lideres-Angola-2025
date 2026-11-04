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
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity: string
          entity_id: string | null
          id: string
          new_value: string | null
          old_value: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity: string
          entity_id?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity?: string
          entity_id?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      nomination_events: {
        Row: {
          actor_id: string | null
          created_at: string
          event_type: string
          field: string | null
          file_id: string | null
          file_name: string | null
          id: string
          new_value: string | null
          nomination_id: string
          old_value: string | null
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          event_type: string
          field?: string | null
          file_id?: string | null
          file_name?: string | null
          id?: string
          new_value?: string | null
          nomination_id: string
          old_value?: string | null
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          event_type?: string
          field?: string | null
          file_id?: string | null
          file_name?: string | null
          id?: string
          new_value?: string | null
          nomination_id?: string
          old_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nomination_events_nomination_id_fkey"
            columns: ["nomination_id"]
            isOneToOne: false
            referencedRelation: "nominations"
            referencedColumns: ["id"]
          },
        ]
      }
      nomination_files: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          file_type: string
          id: string
          nomination_id: string
          status: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          file_type: string
          id?: string
          nomination_id: string
          status?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          file_type?: string
          id?: string
          nomination_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "nomination_files_nomination_id_fkey"
            columns: ["nomination_id"]
            isOneToOne: false
            referencedRelation: "nominations"
            referencedColumns: ["id"]
          },
        ]
      }
      nominations: {
        Row: {
          achievements: string | null
          admin_notes: string | null
          biography: string | null
          category: string | null
          city: string | null
          company: string | null
          contribution_angola: string | null
          contribution_international: string | null
          country: string | null
          created_at: string
          email: string | null
          gender: string | null
          id: string
          indicator_id: string
          instagram: string | null
          justification: string
          linkedin: string | null
          nationality: string | null
          nomination_code: string
          nominee_name: string
          nominee_type: Database["public"]["Enums"]["nomination_type"]
          phone: string | null
          position: string | null
          previous_awards: string | null
          profession: string | null
          professional_name: string | null
          projects: string | null
          province: string | null
          sector: string | null
          social_impact: string | null
          status: Database["public"]["Enums"]["nomination_status"]
          updated_at: string
          website: string | null
        }
        Insert: {
          achievements?: string | null
          admin_notes?: string | null
          biography?: string | null
          category?: string | null
          city?: string | null
          company?: string | null
          contribution_angola?: string | null
          contribution_international?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          indicator_id: string
          instagram?: string | null
          justification: string
          linkedin?: string | null
          nationality?: string | null
          nomination_code: string
          nominee_name: string
          nominee_type: Database["public"]["Enums"]["nomination_type"]
          phone?: string | null
          position?: string | null
          previous_awards?: string | null
          profession?: string | null
          professional_name?: string | null
          projects?: string | null
          province?: string | null
          sector?: string | null
          social_impact?: string | null
          status?: Database["public"]["Enums"]["nomination_status"]
          updated_at?: string
          website?: string | null
        }
        Update: {
          achievements?: string | null
          admin_notes?: string | null
          biography?: string | null
          category?: string | null
          city?: string | null
          company?: string | null
          contribution_angola?: string | null
          contribution_international?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          indicator_id?: string
          instagram?: string | null
          justification?: string
          linkedin?: string | null
          nationality?: string | null
          nomination_code?: string
          nominee_name?: string
          nominee_type?: Database["public"]["Enums"]["nomination_type"]
          phone?: string | null
          position?: string | null
          previous_awards?: string | null
          profession?: string | null
          professional_name?: string | null
          projects?: string | null
          province?: string | null
          sector?: string | null
          social_impact?: string | null
          status?: Database["public"]["Enums"]["nomination_status"]
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      nominees: {
        Row: {
          category_id: string
          company: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
        }
        Insert: {
          category_id: string
          company?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
        }
        Update: {
          category_id?: string
          company?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "nominees_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          biography: string | null
          city: string | null
          company: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          nationality: string | null
          phone: string | null
          photo_url: string | null
          position: string | null
          profession: string | null
          province: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          biography?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id: string
          nationality?: string | null
          phone?: string | null
          photo_url?: string | null
          position?: string | null
          profession?: string | null
          province?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          biography?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          nationality?: string | null
          phone?: string | null
          photo_url?: string | null
          position?: string | null
          profession?: string | null
          province?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          category_slug: string
          created_at: string
          id: string
          nominee_slug: string
          voter_email: string
          voter_name: string
          voter_phone: string | null
        }
        Insert: {
          category_slug: string
          created_at?: string
          id?: string
          nominee_slug: string
          voter_email: string
          voter_name: string
          voter_phone?: string | null
        }
        Update: {
          category_slug?: string
          created_at?: string
          id?: string
          nominee_slug?: string
          voter_email?: string
          voter_name?: string
          voter_phone?: string | null
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
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "indicador" | "nomeado" | "jurado" | "admin" | "superadmin"
      nomination_status:
        | "submetida"
        | "recebida"
        | "em_verificacao"
        | "em_analise"
        | "encaminhada_juri"
        | "info_adicional"
        | "pre_selecionada"
        | "selecionada"
        | "nao_selecionada"
        | "arquivada"
      nomination_type:
        | "figura"
        | "empresa"
        | "instituicao"
        | "organizacao"
        | "projeto"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["indicador", "nomeado", "jurado", "admin", "superadmin"],
      nomination_status: [
        "submetida",
        "recebida",
        "em_verificacao",
        "em_analise",
        "encaminhada_juri",
        "info_adicional",
        "pre_selecionada",
        "selecionada",
        "nao_selecionada",
        "arquivada",
      ],
      nomination_type: [
        "figura",
        "empresa",
        "instituicao",
        "organizacao",
        "projeto",
      ],
    },
  },
} as const
