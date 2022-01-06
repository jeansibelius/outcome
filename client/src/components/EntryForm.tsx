import { FormikProps, Field } from "formik";
import { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { Category, IncomeExpenseType } from "../types";
import { RadioGroup, InputField, CategorySelect } from "./FormFields";

import { FormValues } from "./NewEntryForm";
import { FormValues as UpdateFormValues } from "./UpdateEntryForm";

interface OtherProps {
  categories?: Category[];
}

export const EntryForm = (props: OtherProps & FormikProps<FormValues | UpdateFormValues>) => {
  const {
    values,
    handleSubmit,
    isValid,
    isSubmitting,
    getFieldMeta,
    setFieldValue,
    setFieldTouched,
  } = props;

  const [entryType, setEntryType] = useState<string | undefined>(undefined);

  useEffect(() => {
    setEntryType(values.type);
  }, [values.type]);

  return (
    <Form className="w-full form ui" onSubmit={handleSubmit}>
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
