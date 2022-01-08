import { withFormik } from "formik";
import { Category } from "../types";
import CategoryForm, { CategoryFormValues, CategoryValidationSchema } from "./CategoryForm";

interface UpdateCategoryFormProps {
  onSubmit: (values: CategoryFormValues) => void;
  updateCategoryValues: Category;
}

const UpdateCategoryForm = withFormik<UpdateCategoryFormProps, CategoryFormValues>({
  // Transform outer props into form values
  mapPropsToValues: ({ updateCategoryValues }) => {
    return {
      type: updateCategoryValues.type,
      name: updateCategoryValues.name,
      monthlyBudget: updateCategoryValues?.monthlyBudget,
      description: updateCategoryValues?.description,
      icon: updateCategoryValues?.icon,
    };
  },

  validationSchema: CategoryValidationSchema,
  handleSubmit: async (values, { props }) => {
    // do submitting things
    try {
      props.onSubmit(values);
    } catch (error) {
      console.log("UpdateCategoryForm handleSubmit error", error);
    }
  },
})(CategoryForm);

export default UpdateCategoryForm;
