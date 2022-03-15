# Roadmap

## MVP
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
- Can edit existing entries ✅
- First deployment somewhere (heroku/netlify/self-hosted?) ✅
- Can edit existing categories ✅
- Can create users in the backend ✅
- Add middleware for adding user id to context (for authorization) ✅
- Add expiry to JWT tokens ✅
- Backend: user can log in and user details from token are added to context ✅
- Login view exists ✅
- Restrict views and data only to authorized users ✅
- Add first analytics views to home/dashboard view (monthly spending vs. budget per category) ✅
- Add user to entry model ✅
- Create a "space" model to enable collaborating with other users on entries etc. ✅
- Spaces are added to user, entry and category models ✅
- Currently active space is visible to user in the header area ✅
- Spaces are used in client and added to headers for calls ✅
- User can see their name in top right and click to access their user details ✅
- Spaces are added to context in server and available for auth checking in resolvers ✅
- Restrict server requests to authorized users (e.g. logged in user gets only their own entries, categories) ✅
- Separate test, dev, demo and prod databases ✅
- Test coverage for server is 100 % ✅
- Bug: entry modal fails, if there are no categories
- Test coverage for client is sufficient (considering unfinalised UI)
- Add date filtering to reporting (default ongoing month, other options?)
- Milestone: basic views/components exist: expenses, income, adding new entries, adding new categories, summary
- Disable debugging on mongoose (and other similar data sensitive things)
- Onboard first users

## After "launch"
- Register view exists
- Remove zeroing of date in entries to allow proper sorting (same day entries)
- Caching: Performing actions (adding, editing, deleting) on entries or categories is reflected in the UI
  immediately (queries & cache are kept up to date)
- Add safer UI to deletion of entries and categories (loading status when clicked, clear response in
  the form of a toast etc. when successful; for the category deletion: show how many associated
  entries and perhaps do something with them)
- Add some toasts on successful events (such as login, adding an entry etc.)
- User can create a new space
- User can switch between spaces
- User can add another user to a space
- Add PWA manifest
- Add offline capabilities with service workers
- Consider what kind of pattern to use with queries/mutations: action creators or what?
- Refactor error message from modals to its own dismissable component (toast?)
- Refactor modal to a reusable component (instead of having two implementations in NewEntryModal and
  NewCategoryModal)
- Add search feature to NewEntryForm name field (to allow quick selection of previously used names)
- Add pagination to entries view (load more or similar)
- Improve submission form appearance (fancier invalid/error states etc.)
- General UI facelift: more app-like and smooth (mobile optimised)
- Improve icon selector in category form for performance (typing into fields is slow due to massive
  list in icon options?)
- Add currency to user? which can then be used for all forms and views
- Update Fomantic UI css to check, if it fixes icon not visible in dropdown issue and remove the
  patch (& patch package)
  https://github.com/fomantic/Fomantic-UI/issues/2172
- Consider refactoring types & resolvers according to this example:
  https://github.com/MichalLytek/type-graphql/tree/master/examples/apollo-client
- Check if any TODOs remain
