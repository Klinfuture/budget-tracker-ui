import FormContainer from "@/components/form/container";
import ExpenseCategoryForm from "./form";

  interface Props {
  params: Promise<{
    id: string | number;
  }>;
}

export default async function EditExpenseCategory(props: Props) {
  const id = (await props.params).id;
  console.log("Editing category with ID:", id); // Debugging line
  return (
    <div className="w-full max-w-xl">
      <FormContainer
        title="Edit Category"
        description="Update the details of your expense category below."
      >
        <ExpenseCategoryForm id={id} />
      </FormContainer>
    </div>
  );
}
