import * as Yup from "yup";
import { withFormik, FormikProps, Form, Field } from "formik";
import { Category, IncomeExpenseType } from "../types";
import { getYearMonthDay, toNewEntry } from "../utils";

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
  headerTitle: string;
  createEntry: Function;
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
  const { values, touched, errors, isSubmitting, headerTitle, categories } = props;
  return (
    <Form>
      <h3>{headerTitle}</h3>
      <div id="type-radio-group">Type</div>
      <div role="group" aria-labelledby="type-radio-group">
        {Object.values(IncomeExpenseType).map((type) => (
          <div key={type}>
            <Field type="radio" name="type" id={type} value={type} />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
        {touched.type && errors.type && <div>{errors.type}</div>}
      </div>
      <label htmlFor="name">Name</label>
      <Field type="text" id="name" name="name" />
      {touched.name && errors.name && <div>{errors.name}</div>}

      <label htmlFor="amount">Amount</label>
      <Field type="number" id="amount" name="amount" />
      {touched.amount && errors.amount && <div>{errors.amount}</div>}

      <label htmlFor="description">Description</label>
      <Field type="text" id="description" name="description" />
      {touched.description && errors.description && <div>{errors.description}</div>}

      <label htmlFor="date">Date</label>
      <Field type="date" id="date" name="date" />
      {touched.date && errors.date && <div>{errors.date}</div>}

      {categories ? (
        <>
          <label htmlFor="category">Category</label>
          <Field as="select" id="category" name="category">
            {categories
              .filter((category) => category.type === values.type)
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Field>
        </>
      ) : null}
      {touched.category && errors.category && <div>{errors.category}</div>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

interface NewEntryFormProps {
  headerTitle: string;
  createEntry: Function;
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
  handleSubmit: (values, { props, resetForm, setStatus }) => {
    // do submitting things
    console.log("submit", values);
    const newEntry = toNewEntry(values);
    console.log("newEntry", newEntry);
    try {
      props
        .createEntry({
          variables: { entryData: newEntry },
        })
        .then(
          (response: unknown) =>
            response instanceof Object ? console.log("success", response) : null,
          (error: unknown) => (error instanceof Error ? console.log("error", error) : null)
        );
      setStatus("success");
      resetForm();
    } catch (error: unknown) {
      if (error && error instanceof Error) {
        setStatus("error");
      }
    }
  },
})(InnerForm);

export default NewEntryForm;
