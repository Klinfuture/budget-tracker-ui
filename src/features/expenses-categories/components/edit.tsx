import FormContainer from "@/components/form/container";
import ExpenseCategoryForm from "./form";

export default function EditExpenseCategory() {
  return (
    <div className="w-full max-w-xl">
      <FormContainer
        title="Edit Category"
        description="Update the details of your expense category below."
      >
        <ExpenseCategoryForm expenseId={1} />
      </FormContainer>
    </div>
  );
}
