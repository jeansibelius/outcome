import React from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import { IncomeExpenseType } from "../types";
import { getYearMonthDay } from "../utils";
import EntryForm from "./EntryForm";

// Shape of form values
export interface FormValues {
  name: string;
  type: IncomeExpenseType;
  date: string;
  amount: number;
  description?: string;
  category?: string;
}

const NewEntrySchema = Yup.object().shape({
  type: Yup.string().required(),
  name: Yup.string().min(1, "Too short").max(255, "Too long").required(),
  date: Yup.date().required(),
  amount: Yup.number()
    .positive("All numbers must be defined without minus")
    .required("Please enter only numbers in the format of 123 or 123.45"),
  description: Yup.string().max(255, "Too long"),
  category: Yup.string(),
});

interface NewEntryFormProps {
  onSubmit: (values: FormValues) => void;
}

const NewEntryForm = withFormik<NewEntryFormProps, FormValues>({
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

  validationSchema: NewEntrySchema,
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
