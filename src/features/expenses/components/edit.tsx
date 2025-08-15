import React from "react";
import ExpenseForm from "./form";
import FormContainer from "./form/container";

export default function EditExpense() {
  return (
    <div className="w-full max-w-xl">
      <FormContainer
        title="Edit Existing Expense"
        description="Update the details of your expense below."
      >
        <ExpenseForm />
      </FormContainer>
    </div>
  );
}
