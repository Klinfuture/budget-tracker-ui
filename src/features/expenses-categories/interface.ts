export interface ExpenseCategory {
    id: number;
    name: string;
    description: string;
    CreatedAt?: string; // ISO date string
    UpdatedAt?: string;
    DeletedAt?: string | null;
}
