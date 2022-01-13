import * as Yup from "yup";
import { FormikProps, Field, withFormik } from "formik";
import { Form } from "semantic-ui-react";
import { InputField } from "./FormFields";

// Shape of form values
export interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginFormValidationSchema = Yup.object().shape({
  email: Yup.string().email("Please use a valid email").required(),
  password: Yup.string().min(4, "Too short").max(255, "Too long").required(),
});

export const InnerLoginForm = (props: FormikProps<LoginFormValues>) => {
  const { handleSubmit, isValid, isSubmitting } = props;

  return (
    <Form className="w-full form ui" onSubmit={handleSubmit}>
      <Field name="email" label="Email" type="email" component={InputField} />
      <Field name="password" label="Password" type="password" component={InputField} />
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

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm = withFormik<LoginFormProps, LoginFormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      email: "testinen@test.com",
      password: "test",
    };
  },

  validationSchema: LoginFormValidationSchema,
  handleSubmit: async ({ email, password }: LoginFormValues, { props, resetForm }) => {
    // do submitting things
    try {
      props.onSubmit(email, password);
      resetForm();
    } catch (error) {
      console.log("handleSubmit error", error);
    }
  },
  displayName: "LoginForm",
})(InnerLoginForm);

export default LoginForm;
