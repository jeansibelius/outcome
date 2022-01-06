import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form, Field } from "formik";
import { IconSelect, InputField, RadioGroup } from "./FormFields";
import { Category, IncomeExpenseType } from "../types";

// Shape of form values
interface FormValues {
  name: string;
  type: IncomeExpenseType;
  monthlyBudget?: number;
  description?: string;
  icon?: string;
}

interface OtherProps {}

const NewCategorySchema = Yup.object().shape({
  type: Yup.string().required(),
  name: Yup.string().min(1, "Too short").max(255, "Too long").required(),
  monthlyBudget: Yup.number().positive("All numbers must be defined without minus"),
  description: Yup.string().max(255, "Too long"),
  category: Yup.string(),
  icon: Yup.string(),
});

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { isValid, isSubmitting, getFieldMeta, setFieldValue, setFieldTouched } = props;

  return (
    <Form className="w-full form ui">
      <Field
        name="type"
        label="Type"
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        elements={Object.values(IncomeExpenseType)}
        component={RadioGroup}
        meta={getFieldMeta("type")}
      />
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

interface NewEntryFormProps {
  onSubmit: (values: FormValues) => void;
  categories?: Category[];
}

const NewCategoryForm = withFormik<NewEntryFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      type: IncomeExpenseType.Expense,
      name: "New Test Category",
      monthlyBudget: 12000,
      description: "Another test category",
      icon: "home",
    };
  },

  validationSchema: NewCategorySchema,
  handleSubmit: async (values, { props }) => {
    // do submitting things
    try {
      props.onSubmit(values);
    } catch (error) {
      console.log("NewCategoryForm handleSubmit error", error);
    }
  },
})(InnerForm);

export default NewCategoryForm;
