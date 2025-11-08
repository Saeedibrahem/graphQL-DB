# GraphQL Blog API

A secure GraphQL API built with Node.js, Apollo Server, and MongoDB for managing users, posts, and comments with JWT authentication.

## Features

- 🔐 **JWT Authentication** - Secure user authentication with JSON Web Tokens
- 👤 **User Management** - Create, update, and delete users
- 📝 **Post Management** - Create, update, and delete posts (authenticated users only)
- 💬 **Comment System** - Add comments to posts (authenticated users only)
- 🛡️ **Authorization** - Users can only modify their own posts and comments
- 🔒 **Protected Routes** - All mutations require authentication

## Tech Stack

- **Node.js** - Runtime environment
- **Apollo Server** - GraphQL server
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **GraphQL** - Query language

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Graph
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
BASE_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-secret-key-here
```

4. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
node index.js
```

The server will start on `http://localhost:4000`

## Project Structure

```
Graph/
├── config/
│   └── db.js              # MongoDB connection
├── graphql/
│   ├── user/
│   │   ├── User.js        # User model
│   │   ├── typeDefs.js    # User GraphQL schema
│   │   └── resolvers.js   # User resolvers
│   ├── post/
│   │   ├── Post.js        # Post model
│   │   ├── typeDefs.js    # Post GraphQL schema
│   │   └── resolvers.js   # Post resolvers
│   ├── comment/
│   │   ├── Comment.js     # Comment model
│   │   ├── typeDefs.js    # Comment GraphQL schema
│   │   └── resolvers.js   # Comment resolvers
│   ├── typeDefs.js        # Combined type definitions
│   └── resolvers.js       # Combined resolvers
├── utils/
│   └── auth.js            # Authentication utility
├── index.js               # Server entry point
└── package.json
```

## API Documentation

### Authentication

All protected mutations require a JWT token in the request headers:

```
Authorization: Bearer <your-token>
```

### Queries

#### Get All Users
```graphql
query {
  users {
    id
    name
    email
    posts {
      id
      title
    }
  }
}
```

#### Get User by ID
```graphql
query {
  user(id: "user-id") {
    id
    name
    email
    posts {
      id
      title
      content
    }
    comments {
      id
      text
    }
  }
}
```

#### Get All Posts
```graphql
query {
  posts {
    id
    title
    content
    author {
      id
      name
      email
    }
    comments {
      id
      text
      author {
        name
      }
    }
  }
}
```

#### Get Post by ID
```graphql
query {
  post(id: "post-id") {
    id
    title
    content
    author {
      id
      name
    }
    comments {
      id
      text
      author {
        name
      }
    }
  }
}
```

#### Get All Comments
```graphql
query {
  comments {
    id
    text
    author {
      id
      name
    }
    post {
      id
      title
    }
  }
}
```

### Mutations

#### Create User
```graphql
mutation {
  createUser(
    name: "John Doe"
    email: "john@example.com"
    password: "password123"
  ) {
    user {
      id
      name
      email
    }
    token
  }
}
```

#### Login
```graphql
mutation {
  login(
    email: "john@example.com"
    password: "password123"
  ) {
    user {
      id
      name
      email
    }
    token
  }
}
```

#### Update User
```graphql
mutation {
  updateUser(
    id: "user-id"
    name: "Jane Doe"
    email: "jane@example.com"
  ) {
    id
    name
    email
  }
}
```

#### Delete User
```graphql
mutation {
  deleteUser(id: "user-id") {
    id
    name
  }
}
```

#### Create Post (Requires Authentication)
```graphql
mutation {
  createPost(
    title: "My First Post"
    content: "This is the content of my post"
  ) {
    id
    title
    content
    author {
      id
      name
    }
  }
}
```

**Headers:**
```
Authorization: Bearer <your-token>
```

#### Update Post (Requires Authentication + Ownership)
```graphql
mutation {
  updatePost(
    id: "post-id"
    title: "Updated Title"
    content: "Updated content"
  ) {
    id
    title
    content
  }
}
```

#### Delete Post (Requires Authentication + Ownership)
```graphql
mutation {
  deletePost(id: "post-id") {
    id
    title
  }
}
```

#### Create Comment (Requires Authentication)
```graphql
mutation {
  createComment(
    text: "Great post!"
    post: "post-id"
  ) {
    id
    text
    author {
      id
      name
    }
    post {
      id
      title
    }
  }
}
```

#### Update Comment (Requires Authentication + Ownership)
```graphql
mutation {
  updateComment(
    id: "comment-id"
    text: "Updated comment text"
  ) {
    id
    text
  }
}
```

#### Delete Comment (Requires Authentication + Ownership)
```graphql
mutation {
  deleteComment(id: "comment-id") {
    id
    text
  }
}
```

## Authentication Flow

1. **Register/Login**: User creates an account or logs in to receive a JWT token
2. **Store Token**: Save the token (usually in localStorage or sessionStorage for frontend apps)
3. **Send Token**: Include the token in the `Authorization` header for protected operations
4. **Server Validation**: Server validates the token and extracts user information
5. **Authorization**: Server checks if the user has permission to perform the action

## Error Handling

The API returns appropriate error messages for:
- Invalid or missing authentication tokens
- Unauthorized access attempts
- Attempts to modify resources owned by other users
- Invalid input data
- Resource not found errors

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Protected mutations (require authentication)
- ✅ Ownership verification (users can only modify their own content)
- ✅ Token expiration (1 hour)

## Development

### Available Scripts

- `npm run dev` - Start server in development mode with nodemon
- `node index.js` - Start server in production mode

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BASE_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT token signing | Yes |

## License

ISC

## Author

Your Name

---

For more information about GraphQL, visit [graphql.org](https://graphql.org/)

