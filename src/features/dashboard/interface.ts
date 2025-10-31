import { ExpenseCategory } from '../expenses-categories/interface';
import { RevenueSource } from '../revenue/interface';
import { Expense } from './../expenses/interface';


export interface DashBoordResponseData {
	expenses:Expense[],
	revenues:RevenueSource[],
    categories :ExpenseCategory[]
}