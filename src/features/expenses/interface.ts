import { CommonFields, ID } from "@/interface/entity";
import { ExpenseCategory } from "../expenses-categories/interface";
import { Priority } from "../dashboard/components/utils";

export interface Expense extends CommonFields {
    name: string;
    amount: number;
    category_id: ID;
    description?: string;
    category?: ExpenseCategory;
    priority: Priority,
}       