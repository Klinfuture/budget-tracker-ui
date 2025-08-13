import CreateExpense from "./components/create";
import EditExpense from "./components/edit";

export default function Expenses() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1>Manage Expenses</h1>
      <CreateExpense />
      <EditExpense />
    </div>
  );
}
