# Rick and Morty Character Explorer

A modern web application built with React, TypeScript and Vite that allows you to explore characters from the Rick and Morty universe using the official Rick and Morty API.

## 🚀 Features

- **Character exploration**: Browse through all Rick and Morty characters
- **Advanced search**: Search characters by name with real-time filters
- **Multiple filters**: Filter by status (alive/dead), species, gender and more
- **Favorites system**: Mark characters as favorites for quick access
- **Soft-delete**: Temporarily delete characters with restore option
- **Comments**: Add custom comments to each character
- **Responsive interface**: Modern design adaptable to different devices
- **Local persistence**: Data is saved in browser's localStorage

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Modern web browser

## 🛠️ Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone <https://github.com/jorgequinterodoria/blossom_test.git>
   cd blossom_test
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run preview` - Previews the production build
- `npm run lint` - Runs the linter to check code
- `npm run test` - Runs unit tests
- `npm run test:ui` - Runs tests with visual interface

## 🎯 How to Use the Application

### Basic Navigation
1. **Character list**: In the left panel you'll see all available characters
2. **Character details**: Click on any character to see their details in the right panel
3. **Search**: Use the search bar to find characters by name

### Advanced Filters
Click on the filter icon (⚙️) to access:
- **Character**: All, Starred, Others, Deleted
- **Species**: All, Human, Alien
- **Status**: All, Alive, Dead, Unknown
- **Gender**: All, Male, Female, Genderless, Unknown

### Favorites Management
- Click on the star icon (⭐) to mark/unmark as favorite
- Use the "Starred" filter to see only your favorites

### Character Soft-delete
- Click on the trash icon (🗑️) to temporarily delete a character
- Use the "Deleted" filter to see deleted characters
- Click again on the icon to restore a deleted character

### Comments System
1. Select a character
2. In the details panel, scroll to the comments section
3. Click on "Add a comment" or "Edit" to modify existing comments
4. Use "Save" and "Cancel" buttons to manage your comments

## 🔌 Rick and Morty API

This application uses the [official Rick and Morty API](https://rickandmortyapi.com/) through GraphQL.

### Main Endpoint
```
https://rickandmortyapi.com/graphql
```

### Implemented Queries

#### 1. Get Characters List
```graphql
query GetCharacters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      image
      species
      status
      gender
      origin { name }
      location { name }
    }
  }
}
```

**Available Parameters**:
- `page`: Page number (optional)
- `filter`: Object with available filters:
  - `name`: Search by name
  - `status`: "alive", "dead", "unknown"
  - `species`: Any species (e.g: "Human", "Alien")
  - `gender`: "male", "female", "genderless", "unknown"

#### 2. Get Specific Character
```graphql
query GetCharacter($id: ID!) {
  character(id: $id) {
    id
    name
    image
    species
    status
    gender
    origin { name }
    location { name }
    episode { id name }
  }
}
```

**Parameters**:
- `id`: Unique character ID (required)

### API Usage Examples

#### Search characters by name
```javascript
const { data } = useQuery(GET_CHARACTERS, {
  variables: {
    filter: { name: "Rick" }
  }
});
```

#### Filter alive and human characters
```javascript
const { data } = useQuery(GET_CHARACTERS, {
  variables: {
    filter: {
      status: "alive",
      species: "Human"
    }
  }
});
```

#### Get specific character
```javascript
const { data } = useQuery(GET_CHARACTER, {
  variables: { id: "1" }
});
```

## 🏗️ Technical Architecture

### Technology Stack
- **Frontend**: React 19 + TypeScript
- **Build tool**: Vite
- **Styling**: Tailwind CSS
- **GraphQL Client**: Apollo Client
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint

### Project Structure
```
src/
├── components/          # Reusable components
│   ├── CharacterCard.tsx
│   ├── CharacterDetail.tsx
│   ├── CommentBox.tsx
│   ├── FavoriteButton.tsx
│   └── DeleteButton.tsx
├── hooks/              # Custom hooks
│   ├── useCharacters.ts
│   ├── useFavorites.ts
│   ├── useComments.ts
│   ├── useDeletedCharacters.ts
│   └── useLocalStorage.ts
├── graphql/            # GraphQL configuration
│   ├── client.ts
│   └── queries.ts
├── pages/              # Main pages
│   └── Home.tsx
├── types.ts            # Type definitions
└── tests/              # Unit tests
```

### State Management
- **Global state**: Apollo Client for API data
- **Local state**: React hooks + localStorage for persistence
- **Favorites**: Stored in localStorage
- **Comments**: Stored in localStorage per character
- **Deleted characters**: Soft-delete with localStorage

## 🧪 Testing

Run tests with:
```bash
npm run test
```

For visual testing interface:
```bash
npm run test:ui
```

## 🚀 Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Files will be generated in the `dist/` folder**

3. **Preview the build**:
   ```bash
   npm run preview
   ```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is under the MIT License.

## 🙏 Acknowledgments

- [Rick and Morty API](https://rickandmortyapi.com/) for providing the data
- [Apollo GraphQL](https://www.apollographql.com/) for the excellent GraphQL client
- [Tailwind CSS](https://tailwindcss.com/) for the design system
- [Vite](https://vitejs.dev/) for the ultra-fast build tool