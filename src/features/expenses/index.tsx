import CreateExpense from "./components/create";
import EditExpense from "./components/edit";
import ExpensesDataTable from "./components/table";

export default function Expenses() {
  return (
    <div className="space-y-4">
      <div className="w-full flex flex-row justify-items-start gap-4 flex-wrap">
        <CreateExpense />
        <EditExpense />
      </div>
      <ExpensesDataTable />
    </div>
  );
}
