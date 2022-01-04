import { ErrorMessage, Field, FieldProps, FormikProps, useField } from "formik";
import React, { useEffect, useState } from "react";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Category } from "../types";
import { ICONS_AND_ALIASES } from "../utils/icons";

interface InputFieldProps extends FieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  name?: string;
}

// TODO check if it would be possible to make this better by
// https://formik.org/docs/api/useField#fieldinputpropsvalue
export const InputField = ({ field, label, placeholder, type }: InputFieldProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field type={type} placeholder={placeholder} {...field} />
      <ErrorMessage name={field.name} />
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
}

interface StateOptions {
  key: string;
  text: string;
  value: string;
  description?: string;
  icon?: string;
}

export const CategorySelect = ({ categories, entryType }: CategorySelectProps) => {
  const fieldName = "categorySelect";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_field, meta, helpers] = useField(fieldName);
  const [stateOptions, setStateOptions] = useState<StateOptions[] | undefined>();

  const onChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    helpers.setTouched(true);
    helpers.setValue(data.value);
  };

  useEffect(() => {
    setStateOptions(
      categories
        .filter((category) => category.type === entryType)
        .map((category) => ({
          key: category.id,
          text: category.name,
          value: category.id,
          description: category.description,
          icon: category.icon,
        }))
    );
  }, [categories, entryType]);

  if (!stateOptions) {
    return <div>Loading...</div>;
  }

  return (
    <Form.Field>
      <label>Category</label>
      <Dropdown
        fluid
        search
        selection
        labeled
        clearable
        options={stateOptions}
        value={meta.value ? meta.value : stateOptions[0].value}
        placeholder={stateOptions[0].text}
        onChange={onChange}
        loading={!stateOptions ? true : false}
      />
      <ErrorMessage name={fieldName} />
    </Form.Field>
  );
};

export const IconSelect = () => {
  const fieldName = "icon";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_field, _meta, helpers] = useField(fieldName);
  const [stateOptions, setStateOptions] = useState<StateOptions[] | undefined>();

  const onChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    helpers.setTouched(true);
    helpers.setValue(data.value);
  };

  useEffect(() => {
    setStateOptions(
      ICONS_AND_ALIASES.map((icon) => ({ key: icon, text: icon, value: icon, icon: icon }))
    );
  }, []);

  if (!stateOptions) {
    return <div>Loading...</div>;
  }

  return (
    <Form.Field>
      <label>Icon</label>
      <Dropdown
        clearable
        fluid
        search
        selection
        labeled
        options={stateOptions}
        onChange={onChange}
        loading={!stateOptions ? true : false}
      />
      <ErrorMessage name={fieldName} />
    </Form.Field>
  );
};
