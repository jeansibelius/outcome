import React from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import { Entry, IncomeExpenseType } from "../types";
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

interface UpdateEntryFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
  updateEntryValues: Entry;
}

const UpdateEntryForm = withFormik<UpdateEntryFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      type: props.updateEntryValues.type,
      date: props.updateEntryValues.date.toString().slice(0, 10),
      name: props.updateEntryValues.name,
      amount: props.updateEntryValues.amount,
      description: props.updateEntryValues.description,
    };
  },

  validationSchema: NewEntrySchema,
  handleSubmit: async (values, { props }) => {
    // do submitting things
    try {
      await props.onSubmit(values);
    } catch (error) {
      console.log("handleSubmit error", error);
    }
  },
  displayName: "NewEntryForm",
})(EntryForm);

export default UpdateEntryForm;
