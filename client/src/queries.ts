import { gql } from "@apollo/client";

// Query for checking logged in status from local cache (won't call the server)
export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_ME = gql`
  query Me {
    me @client
  }
`;

export const GET_ACTIVE_SPACE = gql`
  query ActiveSpace {
    activeSpace @client
  }
`;

export const LOGIN = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
      user {
        first_name
        last_name
        spaces {
          id
          name
        }
      }
    }
  }
`;

const ENTRY_DETAILS = gql`
  fragment EntryDetails on Entry {
    id
    type
    date
    name
    amount
    description
    user {
      first_name
      last_name
    }
    category {
      id
      name
      description
      icon
    }
  }
`;
export const ALL_ENTRIES = gql`
  query ReturnAllEntries {
    returnAllEntries {
      ...EntryDetails
    }
  }
  ${ENTRY_DETAILS}
`;

export const CREATE_ENTRY = gql`
  mutation CreateEntry($entryData: EntryInput!) {
    createEntry(data: $entryData) {
      ...EntryDetails
    }
  }
  ${ENTRY_DETAILS}
`;

export const UPDATE_ENTRY = gql`
  mutation UpdateEntry($id: String!, $data: EntryUpdateInput!) {
    updateEntry(id: $id, data: $data) {
      ...EntryDetails
    }
  }
  ${ENTRY_DETAILS}
`;

export const DELETE_ENTRY = gql`
  mutation DeleteEntry($id: String!) {
    deleteEntry(id: $id)
  }
`;

const CATEGORY_DETAILS = gql`
  fragment CategoryDetails on Category {
    id
    type
    name
    monthlyBudget
    description
    icon
  }
`;

export const ALL_CATEGORIES = gql`
  query ReturnAllCategories {
    returnAllCategories {
      ...CategoryDetails
    }
  }
  ${CATEGORY_DETAILS}
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($categoryData: CategoryInput!) {
    createCategory(data: $categoryData) {
      ...CategoryDetails
    }
  }
  ${CATEGORY_DETAILS}
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: String!, $data: CategoryUpdateInput!) {
    updateCategory(id: $id, data: $data) {
      ...CategoryDetails
    }
  }
  ${CATEGORY_DETAILS}
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;
