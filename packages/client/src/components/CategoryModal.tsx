import React from "react";
import { Button, Icon, Modal, Segment } from "semantic-ui-react";
import NewCategoryForm from "./NewCategoryForm";
import { Category, CategoryInput, NewCategory } from "../types";
import { FetchResult, useMutation } from "@apollo/client";
import {
  ALL_CATEGORIES,
  ALL_ENTRIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../queries";
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
  >(UPDATE_CATEGORY, { refetchQueries: [{ query: ALL_CATEGORIES }, { query: ALL_ENTRIES }] });
  const [deleteCategory] = useMutation<{ DeleteCategory: boolean }, { id: string }>(
    DELETE_CATEGORY,
    {
      refetchQueries: [{ query: ALL_CATEGORIES }, { query: ALL_ENTRIES }],
    }
  );

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

  const onDelete = async (id: string): Promise<FetchResult | undefined> => {
    try {
      const response = await deleteCategory({ variables: { id: id } });
      onClose();
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        //TODO add some toast or error handling
      }
      console.log(error);
      return;
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
        {isUpdatingCategory && updateCategoryValues ? (
          <>
            Edit category
            <Icon
              floated="right"
              as={Button}
              icon="trash"
              size="mini"
              content="Delete"
              color="red"
              style={{ margin: "0 2em" }}
              onClick={() => onDelete(updateCategoryValues.id)}
            />
          </>
        ) : (
          <>Add a new category</>
        )}
      </Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {isUpdatingCategory && updateCategoryValues ? (
          <>
            <UpdateCategoryForm
              onSubmit={submitUpdateCategory}
              updateCategoryValues={updateCategoryValues}
            />
          </>
        ) : (
          <NewCategoryForm onSubmit={submitNewCategory} />
        )}
      </Modal.Content>
    </Modal>
  );
};

export default CategoryModal;
