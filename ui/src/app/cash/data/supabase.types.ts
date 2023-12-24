export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  pettycash: {
    Tables: {
      cash_transaction: {
        Row: {
          amount: number
          clerk: string
          comment: string | null
          created_at: string
          created_by: string | null
          debit: boolean
          transaction_date: string
          transaction_id: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          amount: number
          clerk: string
          comment?: string | null
          created_at?: string
          created_by?: string | null
          debit: boolean
          transaction_date: string
          transaction_id?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          amount?: number
          clerk?: string
          comment?: string | null
          created_at?: string
          created_by?: string | null
          debit?: boolean
          transaction_date?: string
          transaction_id?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cash_tran_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_tran_updated_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
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
  PettycashTableNameOrOptions extends
    | keyof (Database["pettycash"]["Tables"] & Database["pettycash"]["Views"])
    | { schema: keyof Database },
  TableName extends PettycashTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PettycashTableNameOrOptions["schema"]]["Tables"] &
        Database[PettycashTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PettycashTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PettycashTableNameOrOptions["schema"]]["Tables"] &
      Database[PettycashTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PettycashTableNameOrOptions extends keyof (Database["pettycash"]["Tables"] &
      Database["pettycash"]["Views"])
  ? (Database["pettycash"]["Tables"] &
      Database["pettycash"]["Views"])[PettycashTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PettycashTableNameOrOptions extends
    | keyof Database["pettycash"]["Tables"]
    | { schema: keyof Database },
  TableName extends PettycashTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PettycashTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PettycashTableNameOrOptions extends { schema: keyof Database }
  ? Database[PettycashTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PettycashTableNameOrOptions extends keyof Database["pettycash"]["Tables"]
  ? Database["pettycash"]["Tables"][PettycashTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PettycashTableNameOrOptions extends
    | keyof Database["pettycash"]["Tables"]
    | { schema: keyof Database },
  TableName extends PettycashTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PettycashTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PettycashTableNameOrOptions extends { schema: keyof Database }
  ? Database[PettycashTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PettycashTableNameOrOptions extends keyof Database["pettycash"]["Tables"]
  ? Database["pettycash"]["Tables"][PettycashTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PettycashEnumNameOrOptions extends
    | keyof Database["pettycash"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PettycashEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PettycashEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PettycashEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PettycashEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PettycashEnumNameOrOptions extends keyof Database["pettycash"]["Enums"]
  ? Database["pettycash"]["Enums"][PettycashEnumNameOrOptions]
  : never
