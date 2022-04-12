import { useQuery } from "@apollo/client";
import { ErrorMessage, Field, FieldProps, useField } from "formik";
import React, { useEffect, useState } from "react";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { ALL_CATEGORIES } from "../queries";
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
export const InputField = ({
  field,
  label,
  placeholder,
  type,
}: InputFieldProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field type={type} placeholder={placeholder} {...field} />
      <ErrorMessage name={field.name} />
    </Form.Field>
  );
};

interface RadioGroupFields {
  name: string;
  label: string;
  elements: string[];
}
export const RadioGroup = ({ name, label, elements }: RadioGroupFields) => {
  const fieldName = { name };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(fieldName);
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    helpers.setTouched(true);
    helpers.setValue(data.value);
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
            error={meta.error ? true : false}
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
  entryType: string;
}

interface GetCategoryDataQuery {
  returnAllCategories: Category[];
}

interface StateOptions {
  key: string;
  text: string;
  value: string;
  description?: string | null;
  icon?: string;
}

export const CategorySelect = ({ entryType }: CategorySelectProps) => {
  const fieldName = "category";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_field, meta, helpers] = useField(fieldName);

  const getCategories = useQuery<GetCategoryDataQuery>(ALL_CATEGORIES);
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined
  );

  const [stateOptions, setStateOptions] = useState<
    StateOptions[] | undefined
  >();

  useEffect(() => {
    if (getCategories.data) {
      setCategories(getCategories.data.returnAllCategories);
    }
  }, [getCategories]);

  useEffect(() => {
    if (categories) {
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
    }
  }, [categories, entryType]);

  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    helpers.setTouched(true);
    helpers.setValue(data.value);
  };

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
        error={meta.error ? true : false}
        options={stateOptions || []}
        value={meta.value ? meta.value : undefined}
        onChange={onChange}
        loading={getCategories.loading ? true : false}
      />
      <ErrorMessage name={fieldName} />
    </Form.Field>
  );
};

export const IconSelect = () => {
  const fieldName = "icon";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_field, _meta, helpers] = useField(fieldName);
  const [stateOptions, setStateOptions] = useState<
    StateOptions[] | undefined
  >();

  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    helpers.setTouched(true);
    helpers.setValue(data.value);
  };

  useEffect(() => {
    setStateOptions(
      ICONS_AND_ALIASES.map((icon) => ({
        key: icon,
        text: icon,
        value: icon,
        icon: icon,
      }))
    );
  }, []);

  if (!stateOptions) {
    return <div>Loading...</div>;
  }

  return (
    <Form.Field>
      <label>Icon</label>
      <Dropdown
        fluid
        search
        selection
        clearable
        options={stateOptions}
        onChange={onChange}
        loading={!stateOptions ? true : false}
      />
      <ErrorMessage name={fieldName} />
    </Form.Field>
  );
};
