import React from "react";
import { withFormik } from "formik";
import { IncomeExpenseType } from "../types";
import { getYearMonthDay } from "../utils";
import EntryForm, { EntryFormValues, EntryValidationSchema } from "./EntryForm";

interface NewEntryFormProps {
  onSubmit: (values: EntryFormValues) => void;
}

const NewEntryForm = withFormik<NewEntryFormProps, EntryFormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      type: IncomeExpenseType.Expense,
      date: getYearMonthDay(),
      name: "Test",
      amount: Number(699),
      description: "Another test",
    };
  },

  validationSchema: EntryValidationSchema,
  handleSubmit: async (values, { props, resetForm }) => {
    // do submitting things
    try {
      props.onSubmit(values);
      resetForm();
    } catch (error) {
      console.log("handleSubmit error", error);
    }
  },
  displayName: "NewEntryForm",
})(EntryForm);

export default NewEntryForm;
