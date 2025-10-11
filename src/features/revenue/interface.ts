import { CommonFields } from "@/interface/entity";

export interface RevenueSource extends CommonFields {
    amount: number;
    source: string;
    description?: string;
}
