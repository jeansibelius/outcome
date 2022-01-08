import React from "react";
import * as Yup from "yup";
import { FormikProps, Field } from "formik";
import { Form } from "semantic-ui-react";
import { IncomeExpenseType } from "../types";
import { RadioGroup, InputField, IconSelect } from "./FormFields";

// Shape of form values
export interface CategoryFormValues {
  name: string;
  type: IncomeExpenseType;
  monthlyBudget?: number | null;
  description?: string;
  icon?: string;
}

export const CategoryValidationSchema = Yup.object().shape({
  type: Yup.string().required(),
  name: Yup.string().min(1, "Too short").max(255, "Too long").required(),
  monthlyBudget: Yup.number().min(0),
  description: Yup.string().max(255, "Too long"),
  category: Yup.string(),
  icon: Yup.string(),
});

const CategoryForm = (props: FormikProps<CategoryFormValues>) => {
  const { isValid, isSubmitting, handleSubmit } = props;

  return (
    <Form className="w-full form ui" onSubmit={handleSubmit}>
      <RadioGroup name="type" label="Type" elements={Object.values(IncomeExpenseType)} />
      <Field name="name" label="Name" type="text" component={InputField} />
      <Field name="monthlyBudget" label="Monthly Budget" type="number" component={InputField} />
      <Field name="description" label="Description" type="text" component={InputField} />
      <IconSelect />
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

export default CategoryForm;
