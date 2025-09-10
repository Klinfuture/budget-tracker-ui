import { CommonFields } from "@/interface/entity";

export interface Expense extends CommonFields {
    name: string;
    amount: number;
    description?: string;
    category?: number;
}       