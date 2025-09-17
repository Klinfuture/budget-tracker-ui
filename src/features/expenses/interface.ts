import { CommonFields } from "@/interface/entity";
import { ExpenseCategory } from "../expenses-categories/interface";

export interface Expense extends CommonFields {
    name: string;
    amount: number;
    category_id: number;
    description?: string;
    category?: ExpenseCategory;
}       