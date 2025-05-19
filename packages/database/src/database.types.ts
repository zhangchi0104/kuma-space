export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      hitokoto: {
        Row: {
          content: string
          from_character: string
          from_work: string
          from_work_type: string
          id: number
        }
        Insert: {
          content: string
          from_character: string
          from_work: string
          from_work_type: string
          id?: number
        }
        Update: {
          content?: string
          from_character?: string
          from_work?: string
          from_work_type?: string
          id?: number
        }
        Relationships: []
      }
      moments: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          id?: string
          updated_at: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string | null
          created_at: string
          id: number
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          id?: number
          updated_at: string
        }
        Update: {
          author_id?: string | null
          created_at?: string
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      posts_content: {
        Row: {
          content: string
          language_code: Database["public"]["Enums"]["LanguageCodes"]
          post_id: number
          title: string
        }
        Insert: {
          content: string
          language_code: Database["public"]["Enums"]["LanguageCodes"]
          post_id?: number
          title: string
        }
        Update: {
          content?: string
          language_code?: Database["public"]["Enums"]["LanguageCodes"]
          post_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_content_post_id_posts_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts_tags: {
        Row: {
          post_id: number
          tag: string
        }
        Insert: {
          post_id?: number
          tag: string
        }
        Update: {
          post_id?: number
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_tags_post_id_posts_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_tags_tag_tags_value_fk"
            columns: ["tag"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["value"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["AppPermissions"]
          role: Database["public"]["Enums"]["AppRoles"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["AppPermissions"]
          role: Database["public"]["Enums"]["AppRoles"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["AppPermissions"]
          role?: Database["public"]["Enums"]["AppRoles"]
        }
        Relationships: []
      }
      tags: {
        Row: {
          category: string | null
          name: string | null
          value: string
        }
        Insert: {
          category?: string | null
          name?: string | null
          value: string
        }
        Update: {
          category?: string | null
          name?: string | null
          value?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["AppRoles"]
          user_id: string | null
        }
        Insert: {
          id?: number
          role?: Database["public"]["Enums"]["AppRoles"]
          user_id?: string | null
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["AppRoles"]
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["AppPermissions"]
        }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
    }
    Enums: {
      AppPermissions:
        | "posts:all:read"
        | "posts:all:write"
        | "posts:all:all"
        | "posts:self:read"
        | "posts:self:write"
        | "posts:self:all"
        | "comments:all:read"
        | "comments:all:write"
        | "comments:all:all"
        | "comments:self:read"
        | "comments:self:write"
        | "comments:self:all"
        | "hitokoto:all:read"
        | "hitokoto:all:write"
        | "hitokoto:all:all"
        | "moments:all:read"
        | "moments:all:write"
        | "moments:all:all"
        | "moments:self:write"
        | "moments:self:read"
        | "moments:self:all"
        | "all:all:all"
      AppRoles: "admin" | "viewer"
      LanguageCodes: "en" | "zh"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      AppPermissions: [
        "posts:all:read",
        "posts:all:write",
        "posts:all:all",
        "posts:self:read",
        "posts:self:write",
        "posts:self:all",
        "comments:all:read",
        "comments:all:write",
        "comments:all:all",
        "comments:self:read",
        "comments:self:write",
        "comments:self:all",
        "hitokoto:all:read",
        "hitokoto:all:write",
        "hitokoto:all:all",
        "moments:all:read",
        "moments:all:write",
        "moments:all:all",
        "moments:self:write",
        "moments:self:read",
        "moments:self:all",
        "all:all:all",
      ],
      AppRoles: ["admin", "viewer"],
      LanguageCodes: ["en", "zh"],
    },
  },
} as const

