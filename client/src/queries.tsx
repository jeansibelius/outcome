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

export const ADD_ENTRY = gql`
  mutation CreateEntry($createEntryData2: EntryInput!) {
    createEntry(data: $createEntryData2) {
      ...EntryDetails
    }
  }
  ${ENTRY_DETAILS}
`;
