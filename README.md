# Gamor – Game Streaming Platform

Gamor is a React web application that simulates a game streaming and party organization platform. It lets users explore teams, matches, and streams, with mock authentication and dark/light theme switching.

This project was built as a technical challenge for a frontend developer role, meeting the requirements for layout, functionality, and best practices.

## Tech Stack

- React with Hooks: `useState`, `useMemo`, `useCallback`, `useEffect`, `useContext`
- React Router for page navigation
- Plain CSS: no UI libraries, as required by the challenge
- Vite as the bundler and development environment
- Context API for global state management (authentication and theme)
- Static data: no external API, simulating real content

## Installation and Running

Follow these steps to run the app locally:

Clone the repository:

```bash
git clone https://github.com/Olennys1990/gamor-app.git
cd gamor-app
npm install
npm run dev
npm run build
```

## Main Features

- **JWT-simulated authentication**: sign in with valid credentials (`admin` / `123456`). A mock token is generated containing the username and a timestamp. The session persists in `localStorage` and expires automatically after 1 hour.
- **Session verification on startup**: when the app loads, the stored token is verified. While checking, a "Loading session..." screen is shown. If the token is valid, the user stays logged in; if it has expired or is invalid, the session is cleared automatically.
- **Game search**: filter by category (Party, Matches, Streams) and search by game name.
- **Quick tags**: click any available game (COD Warzone, Fortnite, GTA V, League of Legends, Valorant) to filter instantly.
- **Dynamic central panel**: selecting a search result updates the game information, image, and participant avatars. If the selected game disappears from the filtered results, the first one is selected automatically. If there are no results, a default featured item is shown.
- **Joining parties**: if logged in, click the `+` button on any result to add yourself to the team or match. The button is locked with a 🔒 if you are not signed in.
- **Theme switch**: toggle between dark and light mode with a switch in the navbar. The preference is saved in `localStorage`.
- **Loading and error states for data**: data loading simulates an API call with an 800ms delay. While loading, a spinner is shown. If an error occurs, a friendly message with a retry button is displayed.
- **Static data**: the app uses mock data (teams, matches, streams, and categories) to demonstrate functionality without needing a real API.
- **Responsive**: adapted for mobile, tablet, and desktop with flexible CSS and media queries.

## Application Structure

```
src/
├── assets/                      # Game and avatar images
├── components/                  # Reusable components
│   ├── Navbar.jsx               # Navbar with authentication and theme toggle
│   ├── Navbar.css
│   ├── ThemeToggle.jsx          # Theme switch button
│   ├── ThemeToggle.css
│   ├── HeroSection.jsx          # Left column: branding and login/logout buttons
│   ├── FeaturedPanel.jsx        # Center column: featured game with image and participants
│   ├── SearchPanel.jsx          # Right column: filters, search, and results list
│   ├── CategoriesSection.jsx    # Bottom section: trending categories
│   ├── PlaceholderPage.jsx      # Generic page for sections under construction
│   └── PlaceholderPage.css
├── context/                     # Global contexts
│   ├── AuthContext.jsx          # Authentication context creation
│   ├── AuthProvider.jsx         # Provider with mock JWT logic
│   ├── ThemeContext.jsx         # Theme context creation
│   └── ThemeProvider.jsx        # Provider with dark/light theme logic
├── data/                        # Static mock data
│   ├── games.js                 # Teams, matches, streams, and default featured item
│   ├── gamesConfig.js           # Images and list of available games
│   ├── members.js               # Members with their avatars
│   └── categories.js            # Categories for the "Trending" section
├── hooks/                       # Custom hooks
│   ├── useAuth.jsx              # Access to the authentication context
│   ├── useTheme.jsx             # Access to the theme context
│   └── useGameBoard.js          # Board business logic (filtering, selection, joining)
├── layouts/                     # Main layout with navigation
│   ├── Layout.jsx               # Contains Navbar + Outlet + session loading screen
│   └── Layout.css
├── pages/                       # Application pages
│   ├── Home.jsx                 # Main page (orchestrates board components)
│   ├── Home.css
│   ├── Login.jsx                # Sign-in page with credential validation
│   ├── Login.css
│   ├── Register.jsx             # Registration page (placeholder)
│   ├── Party.jsx                # Party page (placeholder)
│   ├── Premium.jsx              # Premium page (placeholder)
│   └── Stream.jsx               # Streams page (placeholder)
├── styles/                      # Global styles and themes
│   ├── global.css               # Reset, fonts, and base styles
│   ├── responsive.css           # Media queries for device adaptation
│   └── themes.css               # CSS variables for dark and light themes
├── utils/                       # Utility functions
│   ├── addToPanel.js            # Logic to add a user to a party/team
│   ├── filterHelpers.js         # Filtering functions and search placeholders
│   └── getParticipants.js       # Normalizes participant information
├── App.jsx                      # Route configuration
└── main.jsx                     # Entry point with providers (ThemeProvider, AuthProvider)
```

## Technical Decisions

- **Architecture and separation of concerns**: the board business logic (filtering, selection, and joining parties) is encapsulated in a custom hook (`useGameBoard`). UI components are "dumb" and only render. This separation makes the logic easier to test in isolation and keeps components focused on presentation.
- **Render optimization**: `Home` was split into four components (`HeroSection`, `FeaturedPanel`, `SearchPanel`, `CategoriesSection`) wrapped in `React.memo`. Combined with `useMemo` for derived data and `useCallback` for event handlers, this prevents the central panel and hero from re-rendering when the user is only typing in the search box. Only the results list updates.
- **No CSS frameworks**: plain CSS with CSS variables was used to meet the no-UI-library requirement. This gives full control over the design and visual consistency.
- **Dark/light themes**: implemented with `data-theme` on the body and CSS variables. The user's preference is saved in `localStorage`.
- **JWT-simulated authentication**: a mock token is implemented containing the username and a timestamp, encoded in Base64. The session persists in `localStorage` and expires automatically after 1 hour. Credentials are validated against fixed values (`admin` / `123456`), simulating a database. In production, verification would happen against a real API.
- **Session verification on startup**: while the stored token is checked, a "Loading session..." screen is shown in `Layout`. This avoids flashing unauthenticated content. The simulated latency (500ms) represents how long a real API would take to validate the token.
- **Loading and error states for data**: although the data is static, loading simulates an API call with an 800ms `setTimeout`. The `isLoading` and `isError` states were added to `useGameBoard`, and the UI shows a spinner while loading and an error message with a retry button if it fails. In production, you would only need to replace the `setTimeout` with a real `fetch`.
- **Static data**: all data (teams, matches, streams, categories) is defined in `.js` files inside `src/data/`. This provides a complete experience without depending on an external API, as required by the challenge. The structure is ready to migrate to a real API without changing the filtering and selection logic.
- **Responsive**: the design adapts with `clamp()`, `vw/vh`, and media queries to ensure a good experience on different devices.
- **Modular structure**: clear separation of concerns (components, pages, contexts, hooks, data, utilities) following React best practices.

## Future Improvements

This project was developed as a technical challenge with a defined scope. If it were to scale to production, these are the improvements I would implement:

- **TypeScript**: type props, states, and interfaces to prevent compile-time errors and improve the development experience.
- **Tests**: unit tests for `useGameBoard` (filtering, selection) and integration tests for the login and search flow with React Testing Library and Vitest.
- **Real API**: replace the static data with a `fetch` to an API. The structure is already prepared: you would only need to change the `setTimeout` in `useGameBoard` for the real call and store the data in a state.
- **Party join persistence**: send the request to the server (`POST /api/parties/:id/join`) and update only the affected item in the state. Consider optimistic updates for a smoother UX.
- **Image error handling**: if images came from an external CDN, add an `onError` with a fallback image. In this challenge, since they are local, they are assumed to always load.
- **Accessibility**: add `aria-label` to interactive buttons and descriptive `alt` text to images to improve the screen reader experience.

## Author

Olennys Carcasés Durán  
Technical challenge for a recruitment process – Frontend Development with React.

## License

This project is for evaluation and technical demonstration purposes only. Commercial use is not authorized without the author's explicit permission.