import { ErrorMessage, useField } from "formik";
import React, { memo, useMemo } from "react";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { ICONS } from "../utils/icons";

const IconSelect = () => {
  const fieldName = "icon";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, _meta, helpers] = useField(fieldName);
  const icons = useMemo(
    () =>
      ICONS.map((icon) => ({
        key: icon,
        text: icon,
        value: icon,
        icon: icon,
      })),
    []
  );

  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    helpers.setTouched(true);
    helpers.setValue(data.value);
  };

  if (!icons) {
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
        value={field.value}
        options={icons}
        onChange={onChange}
        loading={!icons ? true : false}
      />
      <ErrorMessage name={fieldName} />
    </Form.Field>
  );
};

export default memo(IconSelect);
