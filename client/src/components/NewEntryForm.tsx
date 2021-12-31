import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form, Field } from "formik";
import { CategorySelect, InputField, RadioGroup } from "./FormFields";
import { Category, IncomeExpenseType } from "../types";
import { getYearMonthDay } from "../utils";

// Shape of form values
interface FormValues {
  name: string;
  type: IncomeExpenseType;
  date: string;
  amount: number;
  description?: string;
  category?: string;
}

interface OtherProps {
  categories?: Category[];
}

const NewEntrySchema = Yup.object().shape({
  type: Yup.string().required(),
  name: Yup.string().min(1, "Too short").max(255, "Too long").required(),
  date: Yup.date().required(),
  amount: Yup.number().positive("All numbers must be defined without minus").required(),
  description: Yup.string().max(255, "Too long"),
  category: Yup.string(),
});

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    dirty,
    isValid,
    isSubmitting,
    getFieldMeta,
    setFieldValue,
    setFieldTouched,
    categories,
  } = props;

  const [entryType, setEntryType] = useState<string | undefined>(undefined);

  useEffect(() => {
    setEntryType(values.type);
  }, [values.type]);

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
      <Field name="name" label="Name" placeholder="Name" type="text" component={InputField} />
      <Field name="amount" label="Amount" type="number" component={InputField} />
      <Field name="description" label="Description" type="text" component={InputField} />
      <Field name="date" label="Date" type="date" component={InputField} />
      {categories && entryType ? (
        <CategorySelect
          categories={categories}
          entryType={entryType}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />
      ) : null}
      <button
        type="submit"
        disabled={!dirty || !isValid || isSubmitting}
        className="w-full p-4 px-8 text-lg font-bold bg-green-300 rounded-lg drop-shadow-md hover:drop-shadow-lg hover:bg-green-600 hover:text-white"
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

const NewEntryForm = withFormik<NewEntryFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      type: IncomeExpenseType.Expense,
      date: getYearMonthDay(),
      name: "Test",
      amount: Number(112.1),
      description: "Another test",
      category: props.categories ? props.categories[0].id : "",
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
})(InnerForm);

export default NewEntryForm;
