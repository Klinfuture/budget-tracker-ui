import FormContainer from "@/components/form/container";
import ExpenseCategoryForm from "./form";

interface Props {
  params: Promise<{
    id: string | number;
  }>;
}

export default async function EditRevenueSource(props: Props) {
  const id = (await props.params).id;
  return (
    <div className="w-full max-w-xl">
      <FormContainer
        title="Edit Revenue Source"
        description="Update the details of your revenue source below."
      >
        <ExpenseCategoryForm id={Number(id)} />
      </FormContainer>
    </div>
  );
}
