Pokémon Index
=============

A Vue 3 application that displays a comprehensive list of Pokémon with search and pagination functionality. This project leverages Pinia for state management and axios for API requests.

Features
--------

-   Display a list of Pokémon with images and details.
-   Search for Pokémon by name.
-   Paginate through the list of Pokémon.
-   View detailed information for a selected Pokémon.

Technologies Used
-----------------

-   Vue 3
-   TailwindCSS
-   Pinia
-   axios
-   [PokeAPI](https://pokeapi.co/)

Getting Started
---------------

### Installation

1.  Clone the repository:

    ```
    git clone https://github.com/zelisturkyilmaz/pokedex-case.git
    cd pokemon-index
    ```

2.  Install dependencies:

    ```
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  Start the development server:

    ```
    npm run dev
    # or
    yarn dev
    ```


Project Structure
-----------------
```
|pokemon-index/
├── public/                # Public assets
├── src/
│   ├── assets/            # Project assets
│   ├── components/        # Vue components
│   │   ├── Header.vue     # Navigation component
│   │   ├── Loading.vue    # Loading spinner component
│   │   ├── Pagination.vue # Pagination controls component
│   │   ├── PokemonCard.vue # Individual Pokémon card component
│   │   ├── PokemonSearch.vue # Pokémon search bar component
│   ├── stores/            # Pinia stores
│   │   └── pokemon.js     # Pokémon store
│   ├── views/             # Vue views/pages
│   │   └── Pokemon.vue    # Pokemon page component
│   │   └── Home.vue       # Home page component
│   ├── App.vue            # Main App component
│   ├── main.js            # Application entry point
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation`
```

Components
----------

### `Pagination.vue`

Controls for navigating through pages of Pokémon.

### `Home.vue`

Main view displaying the list of Pokémon and the search bar.

### `PokemonSearch.vue`

Search bar for filtering Pokémon by name.

### `PokemonCard.vue`

Displays individual Pokémon details.

### `Loading.vue`

Loading spinner to indicate data fetching.

API Integration
---------------

The application uses the [PokeAPI](https://pokeapi.co/) to fetch Pokémon data. Axios is used to make HTTP requests to the API.
