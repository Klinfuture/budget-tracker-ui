import React from "react";
import ExpenseForm from "./form";
import FormContainer from "./form/container";

export default function CreateExpense() {
  return (
    <div className="max-w-xl mx-auto">
      <FormContainer
        title="Create New Expense"
        description="Fill out the form below to create a new expense."
      >
        <ExpenseForm />
      </FormContainer>
    </div>
  );
}
