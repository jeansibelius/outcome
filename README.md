# Outcome

### A simple app to track household income and expenses against a set budget

License: All rights reserved (C) Rafael Linnankoski

## Roadmap
- Create initial server setup (TypeScript, ApolloServer, GraphQL/type-graphql and MongoDB/typegoose)
  ✅
- Create initial client setup (TypeScript, ApolloClient, React) ✅
- Can add new entries (expenses and income) with all variables (type, amount, date, name,
  description, category) ✅
- Use a UI framework to make development faster (Tailwindcss/Semantic UI?/other) with "container"
  styles applied ✅
- Can add new categories with all variables (type, name, description, monthly budget, icon) ✅
- Improve new category form icon selection ✅
- Can edit and delete existing entries & categories
- Performing actions (adding, editing, deleting) on entries or categories is reflected in the UI
  immediately (queries & cache are kept up to date)
- Basic views/components exist: expenses, income, adding new entries, adding new categories, summary
- Can create users
- Restrict views only to authorized users
- Login/register view exists
- Add PWA manifest
- Add offline capabilities with service workers
- Refactor error message from modals to its own dismissable component
- Refactor modal to a reusable component (instead of having two implementations in NewEntryModal and
  NewCategoryModal)
- Add search feature to NewEntryForm name field (to allow quick selection of previously used names)
- Improve submission form appearance (fancier invalid/error states etc.)
- Check if any TODOs remain
