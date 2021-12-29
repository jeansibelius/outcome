import { gql } from "@apollo/client";

const ENTRY_DETAILS = gql`
  fragment EntryDetails on Entry {
    id
    type
    date
    name
    amount
    description
    category {
      name
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
