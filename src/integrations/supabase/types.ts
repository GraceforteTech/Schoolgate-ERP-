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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      academic_results: {
        Row: {
          academic_session: string
          ca_score: number | null
          class_id: string
          created_at: string | null
          exam_score: number | null
          grade: string | null
          id: string
          status: Database["public"]["Enums"]["result_status"] | null
          student_id: string
          subject_id: string
          teacher_comment: string | null
          teacher_id: string | null
          tenant_id: string
          term: string
          total_score: number | null
          updated_at: string | null
        }
        Insert: {
          academic_session: string
          ca_score?: number | null
          class_id: string
          created_at?: string | null
          exam_score?: number | null
          grade?: string | null
          id?: string
          status?: Database["public"]["Enums"]["result_status"] | null
          student_id: string
          subject_id: string
          teacher_comment?: string | null
          teacher_id?: string | null
          tenant_id: string
          term: string
          total_score?: number | null
          updated_at?: string | null
        }
        Update: {
          academic_session?: string
          ca_score?: number | null
          class_id?: string
          created_at?: string | null
          exam_score?: number | null
          grade?: string | null
          id?: string
          status?: Database["public"]["Enums"]["result_status"] | null
          student_id?: string
          subject_id?: string
          teacher_comment?: string | null
          teacher_id?: string | null
          tenant_id?: string
          term?: string
          total_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "academic_results_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "academic_results_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "academic_results_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      academic_results_audit: {
        Row: {
          changed_by: string
          comment: string | null
          created_at: string | null
          id: string
          new_scores: Json | null
          new_status: Database["public"]["Enums"]["result_status"] | null
          old_scores: Json | null
          old_status: Database["public"]["Enums"]["result_status"] | null
          result_id: string
        }
        Insert: {
          changed_by: string
          comment?: string | null
          created_at?: string | null
          id?: string
          new_scores?: Json | null
          new_status?: Database["public"]["Enums"]["result_status"] | null
          old_scores?: Json | null
          old_status?: Database["public"]["Enums"]["result_status"] | null
          result_id: string
        }
        Update: {
          changed_by?: string
          comment?: string | null
          created_at?: string | null
          id?: string
          new_scores?: Json | null
          new_status?: Database["public"]["Enums"]["result_status"] | null
          old_scores?: Json | null
          old_status?: Database["public"]["Enums"]["result_status"] | null
          result_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "academic_results_audit_result_id_fkey"
            columns: ["result_id"]
            isOneToOne: false
            referencedRelation: "academic_results"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          entity_id: string
          entity_type: string
          id: string
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          tenant_id: string
          user_id: string | null
          user_name: string | null
          user_role: Database["public"]["Enums"]["app_role"] | null
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          entity_id: string
          entity_type: string
          id?: string
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          tenant_id: string
          user_id?: string | null
          user_name?: string | null
          user_role?: Database["public"]["Enums"]["app_role"] | null
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          tenant_id?: string
          user_id?: string | null
          user_name?: string | null
          user_role?: Database["public"]["Enums"]["app_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      campuses: {
        Row: {
          address: string | null
          code: string | null
          created_at: string
          id: string
          is_primary: boolean
          name: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          code?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          name: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          code?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          name?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campuses_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          attachment_url: string | null
          category: string
          created_at: string | null
          created_by: string | null
          date: string | null
          description: string | null
          id: string
          method: Database["public"]["Enums"]["payment_method"] | null
          reference: string | null
          rejected_at: string | null
          rejected_by: string | null
          status: Database["public"]["Enums"]["expense_status"] | null
          tenant_id: string
          updated_at: string | null
          vendor_payee: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          attachment_url?: string | null
          category: string
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          description?: string | null
          id?: string
          method?: Database["public"]["Enums"]["payment_method"] | null
          reference?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          status?: Database["public"]["Enums"]["expense_status"] | null
          tenant_id: string
          updated_at?: string | null
          vendor_payee?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          attachment_url?: string | null
          category?: string
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          description?: string | null
          id?: string
          method?: Database["public"]["Enums"]["payment_method"] | null
          reference?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          status?: Database["public"]["Enums"]["expense_status"] | null
          tenant_id?: string
          updated_at?: string | null
          vendor_payee?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_types: {
        Row: {
          academic_session: string | null
          amount: number | null
          applicable_classes: string[] | null
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_mandatory: boolean | null
          is_recurring: boolean | null
          name: string
          tenant_id: string
          term: string | null
          updated_at: string | null
        }
        Insert: {
          academic_session?: string | null
          amount?: number | null
          applicable_classes?: string[] | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_mandatory?: boolean | null
          is_recurring?: boolean | null
          name: string
          tenant_id: string
          term?: string | null
          updated_at?: string | null
        }
        Update: {
          academic_session?: string | null
          amount?: number | null
          applicable_classes?: string[] | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_mandatory?: boolean | null
          is_recurring?: boolean | null
          name?: string
          tenant_id?: string
          term?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fee_types_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      grading_rules: {
        Row: {
          created_at: string | null
          grade: string
          grade_point: number | null
          id: string
          is_pass: boolean | null
          max_score: number
          min_score: number
          remark: string | null
          scheme_id: string
        }
        Insert: {
          created_at?: string | null
          grade: string
          grade_point?: number | null
          id?: string
          is_pass?: boolean | null
          max_score: number
          min_score: number
          remark?: string | null
          scheme_id: string
        }
        Update: {
          created_at?: string | null
          grade?: string
          grade_point?: number | null
          id?: string
          is_pass?: boolean | null
          max_score?: number
          min_score?: number
          remark?: string | null
          scheme_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "grading_rules_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "grading_schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      grading_schemes: {
        Row: {
          created_at: string | null
          id: string
          is_default: boolean | null
          name: string
          tenant_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          tenant_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "grading_schemes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          campus_id: string | null
          created_at: string
          id: string
          is_active: boolean
          is_default: boolean
          tenant_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          campus_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_default?: boolean
          tenant_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          campus_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_default?: boolean
          tenant_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_campus_id_fkey"
            columns: ["campus_id"]
            isOneToOne: false
            referencedRelation: "campuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      student_fees: {
        Row: {
          academic_session: string
          adjusted_by: string | null
          adjustment_amount: number | null
          adjustment_reason: string | null
          amount_due: number
          amount_paid: number | null
          class_id: string
          created_at: string | null
          fee_type_id: string | null
          id: string
          status: string | null
          student_id: string
          tenant_id: string
          term: string
          updated_at: string | null
          waived_amount: number | null
        }
        Insert: {
          academic_session: string
          adjusted_by?: string | null
          adjustment_amount?: number | null
          adjustment_reason?: string | null
          amount_due: number
          amount_paid?: number | null
          class_id: string
          created_at?: string | null
          fee_type_id?: string | null
          id?: string
          status?: string | null
          student_id: string
          tenant_id: string
          term: string
          updated_at?: string | null
          waived_amount?: number | null
        }
        Update: {
          academic_session?: string
          adjusted_by?: string | null
          adjustment_amount?: number | null
          adjustment_reason?: string | null
          amount_due?: number
          amount_paid?: number | null
          class_id?: string
          created_at?: string | null
          fee_type_id?: string | null
          id?: string
          status?: string | null
          student_id?: string
          tenant_id?: string
          term?: string
          updated_at?: string | null
          waived_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_fees_fee_type_id_fkey"
            columns: ["fee_type_id"]
            isOneToOne: false
            referencedRelation: "fee_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_fees_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      student_wallets: {
        Row: {
          balance: number | null
          created_at: string | null
          id: string
          parent_id: string | null
          pending_balance: number | null
          student_id: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          id?: string
          parent_id?: string | null
          pending_balance?: number | null
          student_id: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          id?: string
          parent_id?: string | null
          pending_balance?: number | null
          student_id?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_wallets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          admission_number: string
          campus_id: string | null
          class_id: string | null
          created_at: string | null
          full_name: string
          id: string
          parent_id: string | null
          status: string | null
          tenant_id: string
          updated_at: string | null
          virtual_account_bank: string | null
          virtual_account_number: string | null
        }
        Insert: {
          admission_number: string
          campus_id?: string | null
          class_id?: string | null
          created_at?: string | null
          full_name: string
          id?: string
          parent_id?: string | null
          status?: string | null
          tenant_id: string
          updated_at?: string | null
          virtual_account_bank?: string | null
          virtual_account_number?: string | null
        }
        Update: {
          admission_number?: string
          campus_id?: string | null
          class_id?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          parent_id?: string | null
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
          virtual_account_bank?: string | null
          virtual_account_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_campus_id_fkey"
            columns: ["campus_id"]
            isOneToOne: false
            referencedRelation: "campuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          category: string | null
          code: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          code?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          code?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subjects_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          plan: string
          primary_color: string
          slug: string
          status: Database["public"]["Enums"]["tenant_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          plan?: string
          primary_color?: string
          slug: string
          status?: Database["public"]["Enums"]["tenant_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          plan?: string
          primary_color?: string
          slug?: string
          status?: Database["public"]["Enums"]["tenant_status"]
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          academic_session: string | null
          amount: number
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          fee_type_id: string | null
          id: string
          metadata: Json | null
          method: Database["public"]["Enums"]["payment_method"]
          reference: string | null
          rejected_at: string | null
          rejected_by: string | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          student_id: string
          tenant_id: string
          term: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string | null
          wallet_id: string | null
        }
        Insert: {
          academic_session?: string | null
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          fee_type_id?: string | null
          id?: string
          metadata?: Json | null
          method: Database["public"]["Enums"]["payment_method"]
          reference?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          student_id: string
          tenant_id: string
          term?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string | null
          wallet_id?: string | null
        }
        Update: {
          academic_session?: string | null
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          fee_type_id?: string | null
          id?: string
          metadata?: Json | null
          method?: Database["public"]["Enums"]["payment_method"]
          reference?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          student_id?: string
          tenant_id?: string
          term?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string | null
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_fee_type_id_fkey"
            columns: ["fee_type_id"]
            isOneToOne: false
            referencedRelation: "fee_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "student_wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_expense: {
        Args: { _admin_id: string; _expense_id: string }
        Returns: undefined
      }
      can_admin_tenant: {
        Args: { _tenant_id: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _tenant_id: string
          _user_id: string
        }
        Returns: boolean
      }
      is_member: {
        Args: { _tenant_id: string; _user_id: string }
        Returns: boolean
      }
      is_platform_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "platform_admin"
        | "school_owner"
        | "school_admin"
        | "bursar"
        | "principal"
        | "teacher"
        | "staff"
        | "parent"
        | "student"
      expense_status: "pending" | "approved" | "rejected"
      payment_method: "card" | "bank_transfer" | "cash" | "cheque" | "wallet"
      result_status:
        | "draft"
        | "submitted"
        | "reviewed"
        | "approved"
        | "returned"
      tenant_status: "trial" | "active" | "suspended" | "cancelled"
      transaction_status:
        | "pending"
        | "approved"
        | "rejected"
        | "failed"
        | "refunded"
      transaction_type:
        | "credit"
        | "debit"
        | "fee_payment"
        | "adjustment"
        | "refund"
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
    Enums: {
      app_role: [
        "platform_admin",
        "school_owner",
        "school_admin",
        "bursar",
        "principal",
        "teacher",
        "staff",
        "parent",
        "student",
      ],
      expense_status: ["pending", "approved", "rejected"],
      payment_method: ["card", "bank_transfer", "cash", "cheque", "wallet"],
      result_status: ["draft", "submitted", "reviewed", "approved", "returned"],
      tenant_status: ["trial", "active", "suspended", "cancelled"],
      transaction_status: [
        "pending",
        "approved",
        "rejected",
        "failed",
        "refunded",
      ],
      transaction_type: [
        "credit",
        "debit",
        "fee_payment",
        "adjustment",
        "refund",
      ],
    },
  },
} as const
