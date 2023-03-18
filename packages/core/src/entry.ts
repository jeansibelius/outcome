import { ulid } from "ulid";
import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "./dynamo";

export * as Entry from "./entry";

export enum EntryType {
  Income = "Income",
  Expense = "Expense"
}

export const EntryEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Entry",
      service: "outcome",
    },
    attributes: {
      entryID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      type: {
        type: [...Object.values(EntryType)] as const,
        required: true,
      },
      date: {
        type: "number",
        default: () => Date.now(),
        required: true,
      },
      name: {
        type: "string",
        required: true,
      },
      amount: {
        type: "number",
        required: true,
      },
      description: {
        type: "string"
      },
      category: {
        type: "string",
      },
      user: {
        type: "string",
        required: true,
      },
      space: {
        type: "string",
        required: true,
      }
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["entryID"],
        },
      },
      bySpace: {
        index: "gs1pk-gs1sk-index",
        pk: {
          field: "gsi1pk",
          composite: ["space"]
        },
        sk: {
          field: "gsi1sk",
          composite: ["category"]
        }
      },
    },
  },
  Dynamo.Configuration
);

export type EntryEntityType = EntityItem<typeof EntryEntity>;

interface createInput {
  name: string;
  type: EntryType;
  amount: number; 
  description?: string;
  category?: string;
  user: string;
  space: string;
}

export async function create(createInput: createInput) {
  const result = await EntryEntity.create({
    entryID: ulid(),
    ...createInput
  }).go();

  return result.data;
}

export async function get(entryID: string) {
  const result = await EntryEntity.get({ entryID }).go();
  return result.data;
}

export async function list(space: string) {
  const result = await EntryEntity.query.bySpace({ space }).go();
  return result.data;
}
