import FormContainer from "../../../components/form/container";
import ExpenseForm from "./form";

interface Props {
  params: Promise<{
    id: string | number;
  }>;
}

export default async function EditExpense(props: Props) {
  const expenseId = (await props.params).id;
  return (
    <div className="w-full max-w-xl">
      <FormContainer
        title="Edit Existing Expense"
        description="Update the details of your expense below."
      >
        <ExpenseForm expenseId={expenseId} />
      </FormContainer>
    </div>
  );
}
