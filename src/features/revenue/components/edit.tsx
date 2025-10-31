import FormContainer from "@/components/form/container";
import RevenueSourceForm from "./form";
import { ID } from "@/interface/entity";

interface Props {
  params: Promise<{
    id: ID;
  }>;
}

export default async function 
EditRevenueSource(props: Props) {
  const id = (await props.params).id;
  return (
    <div className="w-full max-w-xl">
      <FormContainer
        title="Edit Revenue Source"
        description="Update the details of your revenue source below."
      >
        <RevenueSourceForm id={id} />
      </FormContainer>
    </div>
  );
}
