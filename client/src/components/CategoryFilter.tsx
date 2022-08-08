import React from "react";
import { Dropdown, DropdownItemProps, DropdownProps } from "semantic-ui-react";
import { Category } from "../types";

const CategoryFilter = ({
  categories,
  filterView,
}: {
  categories: Category[];
  filterView: Function;
}) => {
  const [value, setValue] = React.useState<
    string | number | boolean | (string | number | boolean)[] | undefined
  >([]);
  const options: DropdownItemProps[] = categories.reduce<
    Array<DropdownItemProps>
  >(
    (arr, category) => [
      ...arr,
      {
        key: category.id,
        text: category.name,
        value: category.id,
        icon: category.icon,
      },
    ],
    []
  );

  const renderLabel = (label: DropdownItemProps) => ({
    content: label.text,
    icon: "check circle",
  });

  const handleChange = (
    _e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setValue(data.value);
    filterView(data.value);
  };

  if (categories.length > 0) {
    return (
      <Dropdown
        placeholder="Filter categories"
        fluid
        multiple
        value={value}
        selection
        options={options}
        onChange={(event, object) => handleChange(event, object)}
        renderLabel={renderLabel}
      />
    );
  }
  return <></>;
};

export default CategoryFilter;
