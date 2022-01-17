import React from "react";
import * as Yup from "yup";
import { FormikProps, Field } from "formik";
import { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { Category, IncomeExpenseType } from "../types";
import { RadioGroup, InputField, CategorySelect } from "./FormFields";

// Shape of form values
export interface EntryFormValues {
  name: string;
  type: IncomeExpenseType;
  date: string;
  amount: number;
  description?: string;
  category?: string;
}

export const EntryValidationSchema = Yup.object().shape({
  type: Yup.string().required(),
  name: Yup.string().min(1, "Too short").max(255, "Too long").required(),
  date: Yup.date().required(),
  amount: Yup.number()
    .positive("All numbers must be defined without minus")
    .required("Please enter only numbers in the format of 123 or 123.45"),
  description: Yup.string().max(255, "Too long"),
  category: Yup.string(),
});

interface OtherProps {
  categories?: Category[];
}

export const EntryForm = (props: OtherProps & FormikProps<EntryFormValues>) => {
  const { values, handleSubmit, isValid, isSubmitting } = props;

  const [entryType, setEntryType] = useState<string | undefined>(undefined);

  useEffect(() => {
    setEntryType(values.type);
  }, [values.type]);

  return (
    <Form className="w-full form ui" onSubmit={handleSubmit}>
      <RadioGroup name="type" label="Type" elements={Object.values(IncomeExpenseType)} />
      <Field name="name" label="Name" type="text" component={InputField} />
      <Field name="amount" label="Amount" type="number" component={InputField} />
      <Field name="description" label="Description" type="text" component={InputField} />
      <Field name="date" label="Date" type="date" component={InputField} />
      {entryType ? <CategorySelect entryType={entryType} /> : null}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full p-4 px-8 text-lg font-bold text-green-900 bg-green-300 rounded-lg drop-shadow-md hover:drop-shadow-lg hover:bg-green-400 disabled:opacity-75 disabled:hover:bg-slate-300 disabled:bg-slate-300 disabled:text-white disabled:drop-shadow-none"
      >
        Submit
      </button>
    </Form>
  );
};

export default EntryForm;
