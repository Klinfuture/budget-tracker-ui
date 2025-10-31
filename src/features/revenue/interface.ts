import { Confidence } from './../dashboard/components/utils';
import { CommonFields } from "@/interface/entity";

export interface RevenueSource extends CommonFields {
    amount: number;
    source: string;
    description: string;
    confidence:Confidence
}
