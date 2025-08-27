export interface ExpenseCategory {
    id: string;
    name: string;
    description: string;
    CreatedAt?: string; // ISO date string
    UpdatedAt?: string;
    DeletedAt?: string | null;
}
