import React from "react";
import ExpenseForm from "./form";
import FormContainer from "./form/container";

export default function EditExpense() {
  return (
    <div className="p-4">
      <FormContainer
        title="Edit Existing Expense"
        description="Update the details of your expense below."
      >
        <ExpenseForm />
      </FormContainer>
    </div>
  );
}
