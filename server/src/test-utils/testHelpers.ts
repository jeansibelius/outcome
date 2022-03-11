export const exampleUser = {
  first_name: "Test",
  last_name: "User",
  password: "test",
  email: "test@user.com",
};

export const exampleSpaces = [
  {
    data: {
      name: "Space 1",
    },
  },
  {
    data: {
      name: "Space 2",
    },
  },
  {
    data: {
      name: "Space 3",
    },
  },
];

export const exampleCategories = [
  {
    categoryData: {
      type: "Expense",
      name: "Expense 1",
      monthlyBudget: 9999,
      description: "Expense test 1",
      icon: "home",
    },
  },
  {
    categoryData: {
      type: "Expense",
      name: "Expense 2",
      monthlyBudget: 0,
      description: "Expense test 2",
      icon: "home",
    },
  },
  {
    categoryData: {
      type: "Expense",
      name: "Expense 3",
      description: "Expense test 3 no budget or icon",
    },
  },
  {
    categoryData: {
      type: "Income",
      name: "Income 1",
      monthlyBudget: 9999,
      description: "Income test 1",
      icon: "home",
    },
  },
  {
    categoryData: {
      type: "Income",
      name: "Income 2",
      monthlyBudget: 0,
      description: "Income test 2",
      icon: "home",
    },
  },
  {
    categoryData: {
      type: "Income",
      name: "Income 3",
      description: "Income test 3 no budget or icon",
    },
  },
];

export const exampleEntries = [
  {
    entryData: {
      type: "Expense",
      date: "2021-12-29T00:00:00.000Z",
      name: "Expense 1",
      amount: 112.1,
      description: "Another test",
    },
  },
  {
    entryData: {
      type: "Expense",
      date: "2021-12-19T00:00:00.000Z",
      name: "Expense 2",
      amount: 1,
    },
  },
  {
    entryData: {
      type: "Expense",
      date: "2021-12-09T00:00:00.000Z",
      name: "Expense 3",
      amount: 99999999999,
      description: "Another test",
    },
  },
  {
    entryData: {
      type: "Income",
      date: "2021-12-29T00:00:00.000Z",
      name: "Income 1",
      amount: 112.1,
      description: "Another test",
    },
  },
  {
    entryData: {
      type: "Income",
      date: "2021-12-19T00:00:00.000Z",
      name: "Income 2",
      amount: 1,
    },
  },
  {
    entryData: {
      type: "Income",
      date: "2021-12-09T00:00:00.000Z",
      name: "Income 3",
      amount: 999999999999,
      description: "Another test",
    },
  },
];
