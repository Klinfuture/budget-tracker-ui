import FormContainer from "../../../components/form/container";
import ExpenseForm from "./form";

export default function CreateExpense() {
  return (
    <div className="w-full max-w-xl">
      <FormContainer
        title="Create New Expense"
        description="Fill out the form below to create a new expense."
      >
        <ExpenseForm />
      </FormContainer>
    </div>
  );
}
