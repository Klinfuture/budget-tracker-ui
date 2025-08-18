import FormContainer from "../../../components/form/container";
import ExpenseForm from "./form";

export default function EditExpense() {
  return (
    <div className="w-full max-w-xl">
      <FormContainer
        title="Edit Existing Expense"
        description="Update the details of your expense below."
      >
        <ExpenseForm expenseId={1} />
      </FormContainer>
    </div>
  );
}
