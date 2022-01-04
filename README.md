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
- Can delete existing entries ✅
- Can delete existing categories ✅
- Can edit existing entries & categories
- Performing actions (adding, editing, deleting) on entries or categories is reflected in the UI
  immediately (queries & cache are kept up to date)
- Basic views/components exist: expenses, income, adding new entries, adding new categories, summary
- Can create users in the backend
- Login/register view exists
- Restrict views only to authorized users
- First deployment somewhere (heroku/netlify/self-hosted?)
- Add analytics views to home view (monthly spending vs. budget per category)
- Add safer UI to deletion of entries and categories (for the latter: show how many associated
  entries and perhaps do something with them)
- Add PWA manifest
- Add offline capabilities with service workers
- Consider what kind of pattern to use with queries/mutations: action creators or what?
- Refactor error message from modals to its own dismissable component
- Refactor modal to a reusable component (instead of having two implementations in NewEntryModal and
  NewCategoryModal)
- Add search feature to NewEntryForm name field (to allow quick selection of previously used names)
- Add pagination to entries view (load more or similar)
- Improve submission form appearance (fancier invalid/error states etc.)
- General UI facelift: more app-like and smooth (mobile optimised)
- Add currency to user? which can then be used for all forms and views
- Update Fomantic UI css to check, if it fixes icon not visible in dropdown issue
  https://github.com/fomantic/Fomantic-UI/issues/2172
- Check if any TODOs remain
