import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import React from "react";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Category } from "../types";

interface InputFieldProps extends FieldProps {
  label: string;
  placeholder?: string;
  type?: string;
}

export const InputField = ({ field, label, placeholder, type }: InputFieldProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} type={type} />
      <div>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );
};

interface RadioGroupFields extends FieldProps {
  label: string;
  elements: string[];
  initial?: string;
  setFieldValue: FormikProps<{ type: string }>["setFieldValue"];
  setFieldTouched: FormikProps<{ type: string }>["setFieldTouched"];
}
export const RadioGroup = ({
  label,
  elements,
  setFieldValue,
  setFieldTouched,
  meta,
  field,
}: RadioGroupFields) => {
  const onChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    setFieldTouched(field.name, true);
    setFieldValue(field.name, data.value);
  };

  return (
    <Form.Group inline aria-labelledby={field.name + "-group"}>
      <label>{label}</label>
      {elements.map((element) => (
        <label key={element}>
          <Field
            type="radio"
            name={field.name}
            value={element}
            label={element}
            component={Form.Radio}
            checked={meta.value === element}
            onChange={onChange}
          />
        </label>
      ))}
      <ErrorMessage name={field.name} />
    </Form.Group>
  );
};

interface CategorySelectProps {
  categories: Category[];
  entryType: string;
  setFieldValue: FormikProps<{ categorySelect: string }>["setFieldValue"];
  setFieldTouched: FormikProps<{ categorySelect: string }>["setFieldTouched"];
}

export const CategorySelect = ({
  categories,
  entryType,
  setFieldValue,
  setFieldTouched,
}: CategorySelectProps) => {
  const field = "categorySelect";
  const onChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = categories
    .filter((category) => category.type === entryType)
    .map((category) => ({ key: category.id, text: category.name, value: category.id }));

  return (
    <Form.Field>
      <label>Category</label>
      <Dropdown
        fluid
        search
        selection
        options={stateOptions}
        placeholder={stateOptions[0].text}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
