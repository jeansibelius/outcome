import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import NewCategoryForm from "./NewCategoryForm";
import { Category, CategoryInput, NewCategory } from "../types";
import { useMutation } from "@apollo/client";
import { ALL_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY } from "../queries";
import { toNewCategory } from "../utils";
import UpdateCategoryForm from "./UpdateCategoryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  isUpdatingCategory?: boolean;
  updateCategoryValues?: Category;
}

const CategoryModal = ({
  modalOpen,
  onClose,
  isUpdatingCategory = false,
  updateCategoryValues,
}: Props) => {
  const [error, setError] = React.useState<string | undefined>();
  const [createCategory] = useMutation<{ CreateCategory: Category }, { categoryData: NewCategory }>(
    CREATE_CATEGORY,
    {
      refetchQueries: [{ query: ALL_CATEGORIES }],
      onError: (error) => {
        throw new Error(error.message);
      },
    }
  );
  const [updateCategory] = useMutation<
    { UpdateCategory: Category },
    { id: string; data: CategoryInput }
  >(UPDATE_CATEGORY, { refetchQueries: [{ query: ALL_CATEGORIES }] });

  const submitNewCategory = async (values: CategoryInput) => {
    try {
      const newCategory = toNewCategory(values);
      await createCategory({
        variables: { categoryData: newCategory },
      });
      setError(undefined);
      onClose();
    } catch (error: unknown) {
      if (error && error instanceof Error) {
        //TODO handle error better
        setError(error.message);
      }
      console.log("error", error);
    }
  };

  const submitUpdateCategory = async (data: CategoryInput): Promise<void> => {
    try {
      if (!updateCategoryValues) {
        throw new Error("Values missing from the entry you're trying to update.");
      }
      const updateData = toNewCategory(data);
      await updateCategory({
        variables: { id: updateCategoryValues.id, data: updateData },
      });
      onClose();
    } catch (error: unknown) {
      if (error && error instanceof Error) {
        //TODO handle error better
        setError(error.message);
      }
      console.log(error);
    }
  };

  return (
    <Modal className="p-2" open={modalOpen} onClose={onClose} centered={true} closeIcon>
      <Modal.Header>
        {isUpdatingCategory ? <>Edit category</> : <>Add a new category</>}
      </Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {isUpdatingCategory && updateCategoryValues ? (
          <UpdateCategoryForm
            onSubmit={submitUpdateCategory}
            updateCategoryValues={updateCategoryValues}
          />
        ) : (
          <NewCategoryForm onSubmit={submitNewCategory} />
        )}
      </Modal.Content>
    </Modal>
  );
};

export default CategoryModal;
