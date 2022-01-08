import { withFormik } from "formik";
import { IncomeExpenseType } from "../types";
import CategoryForm, { CategoryFormValues, CategoryValidationSchema } from "./CategoryForm";

interface NewCategoryFormProps {
  onSubmit: (values: CategoryFormValues) => void;
}

const NewCategoryForm = withFormik<NewCategoryFormProps, CategoryFormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      type: IncomeExpenseType.Expense,
      name: "",
      monthlyBudget: undefined,
      description: "",
      icon: "",
    };
  },

  validationSchema: CategoryValidationSchema,
  handleSubmit: async (values, { props }) => {
    // do submitting things
    try {
      props.onSubmit(values);
    } catch (error) {
      console.log("NewCategoryForm handleSubmit error", error);
    }
  },
})(CategoryForm);

export default NewCategoryForm;
