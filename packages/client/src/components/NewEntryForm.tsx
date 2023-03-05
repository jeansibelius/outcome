import { withFormik } from "formik";
import { IncomeExpenseType } from "../types";
import { getYearMonthDay } from "../utils/dates";
import EntryForm, { EntryFormValues, EntryValidationSchema } from "./EntryForm";

interface NewEntryFormProps {
  onSubmit: (values: EntryFormValues) => Promise<void>;
}

const NewEntryForm = withFormik<NewEntryFormProps, EntryFormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      type: IncomeExpenseType.Expense,
      date: getYearMonthDay(),
      name: "",
      amount: Number(),
      description: "",
    };
  },

  validationSchema: EntryValidationSchema,
  handleSubmit: async (values, { props }) => {
    try {
      await props.onSubmit(values);
    } catch (error) {
      console.log("handleSubmit error", error);
    }
  },
  displayName: "NewEntryForm",
})(EntryForm);

export default NewEntryForm;
