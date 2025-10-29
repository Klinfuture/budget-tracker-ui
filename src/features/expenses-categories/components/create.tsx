import FormContainer from "@/components/form/container";
import ExpenseCategoryForm from "./form";

export default function CreateExpenseCategory() {
  return (
    <div className="w-full max-w-xl">
      <FormContainer
        title="Create New Category"
        description="Fill out the form below to create a new expense category."
      >
        <ExpenseCategoryForm />
      </FormContainer>
    </div>
  );
}
