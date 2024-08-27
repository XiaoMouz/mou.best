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
      active_codes: {
        Row: {
          bind_roles: string[]
          create_by: string
          disabled: boolean
          end_time: string | null
          id: string
          one_time: boolean
          token: string
        }
        Insert: {
          bind_roles: string[]
          create_by: string
          disabled?: boolean
          end_time?: string | null
          id: string
          one_time?: boolean
          token: string
        }
        Update: {
          bind_roles?: string[]
          create_by?: string
          disabled?: boolean
          end_time?: string | null
          id?: string
          one_time?: boolean
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "invite_codes_create_by_fkey"
            columns: ["create_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      datasources: {
        Row: {
          content: Json
          create_by: string
          create_date: string
          id: number
          read_only: boolean
          tips: string | null
          type: string
          update_data: string
        }
        Insert: {
          content: Json
          create_by: string
          create_date?: string
          id?: number
          read_only?: boolean
          tips?: string | null
          type: string
          update_data?: string
        }
        Update: {
          content?: Json
          create_by?: string
          create_date?: string
          id?: number
          read_only?: boolean
          tips?: string | null
          type?: string
          update_data?: string
        }
        Relationships: [
          {
            foreignKeyName: "datasources_create_by_fkey"
            columns: ["create_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      nowplaying: {
        Row: {
          icon: string | null
          id: number
          info: Json | null
          link: string | null
          name: string
          type: string
        }
        Insert: {
          icon?: string | null
          id?: number
          info?: Json | null
          link?: string | null
          name: string
          type: string
        }
        Update: {
          icon?: string | null
          id?: number
          info?: Json | null
          link?: string | null
          name?: string
          type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_link: string | null
          display_name: string | null
          id: string
          invite_from: string | null
          roles: string[] | null
          site_owner: boolean
          username: string
        }
        Insert: {
          avatar_link?: string | null
          display_name?: string | null
          id: string
          invite_from?: string | null
          roles?: string[] | null
          site_owner?: boolean
          username: string
        }
        Update: {
          avatar_link?: string | null
          display_name?: string | null
          id?: string
          invite_from?: string | null
          roles?: string[] | null
          site_owner?: boolean
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          create_by: string
          id: string
          role_name: string
        }
        Insert: {
          create_by: string
          id: string
          role_name: string
        }
        Update: {
          create_by?: string
          id?: string
          role_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
