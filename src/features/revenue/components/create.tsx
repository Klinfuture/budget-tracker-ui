import FormContainer from "@/components/form/container";
import RevenueSourceForm from "./form";

export default function CreateRevenueSource() {
  return (
    <div className="w-full max-w-xl">
      <FormContainer
        title="Create Revenue Source"
        description="Fill out the form below to add a new revenue source."
      >
        <RevenueSourceForm />
      </FormContainer>
    </div>
  );
}
