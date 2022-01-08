import React from "react";
import { withFormik } from "formik";
import { Entry } from "../types";
import EntryForm, { EntryFormValues, EntryValidationSchema } from "./EntryForm";

interface UpdateEntryFormProps {
  onSubmit: (values: EntryFormValues) => Promise<void>;
  updateEntryValues: Entry;
}

const UpdateEntryForm = withFormik<UpdateEntryFormProps, EntryFormValues>({
  // Transform outer props into form values
  mapPropsToValues: ({ updateEntryValues }) => {
    return {
      type: updateEntryValues.type,
      date: updateEntryValues.date.toString().slice(0, 10),
      name: updateEntryValues.name,
      amount: updateEntryValues.amount,
      description: updateEntryValues.description,
    };
  },

  validationSchema: EntryValidationSchema,
  handleSubmit: async (values, { props }) => {
    // do submitting things
    try {
      await props.onSubmit(values);
    } catch (error) {
      console.log("handleSubmit error", error);
    }
  },
  displayName: "NewEntryForm",
})(EntryForm);

export default UpdateEntryForm;
