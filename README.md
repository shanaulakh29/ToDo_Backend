## Project Structure

```
ToDo_Backend/
│
├── controllers/
│   ├── authController.js
│   └── todoController.js
│
├── data/
│   └── data.js
│
├── middleware/
│   └── authenticateToken.js
│
├── routes/
│   ├── login.js
│   └── todos.js
│
├── utils/
│   └── validateTodo.js
│
└── server.js
```

## Installation & Setup

```bash
git clone https://github.com/shanaulakh29/ToDo_Backend
cd ToDo_Backend
npm install
npm run dev
```
## Authenticaton
- Login using username + password
- Receive a JWT token
- Send token in header for every /todos request:
```bash
Authorization: Bearer <token>
```

## Available Users inside inmemory usersArray database
| ID | Username | Password |
|----|---------|---------|
| 1  | ali     | ali123  |
| 2  | reza    | reza123 |
| 3  | bob     | bob123  |

## API Endpoints
### 1. Login - Generate Token
 - URL: POST /login
   
```json
{
  "username": "ali",
  "password": "ali123"
}
```

- Successful Response (200):

  ```json
  {
  "accessToken": "<JWT_TOKEN>"
  }
  ```
Error Responses:

- 400 — Missing username/password
- 401 — Invalid credentials

### 2. Get All Todos (Protected)
- URL: Get /todos
- Can also filter results based on description or category or both.  
```bash
Authorization: Bearer <token>
```
Successful Response (200):

```json
[
  {
    "id": 1,
    "userId": 1,
    "description": "Buy shoes",
    "category": "Shopping",
    "isCompleted": false
  }
]
```
Error Responses:

- 401 — Token missing/expired
- 403 — Invalid token

### 3. Create Todo (Protected)
- URL: POST /todos

Headers:
```bash
Authorization: Bearer <token>
```

Request Body:

```json
{
  "description": "Buy groceries",
  "category": "Home",
  "isCompleted": false
}
```
- description and category are required. isCompleted is optional.
  
Successful Response (201):

```json
{
  "id": 4,
  "userId": 1,
  "description": "Buy groceries",
  "category": "Home",
  "isCompleted": false
}
```
Error Responses:

- 400 — Missing/empty description/category
- 400 — isCompleted is not boolean

### 4. Update Todo (Protected)
- URL: PUT /todos/:id

Headers:
```bash
Authorization: Bearer <token>
```

Request Body:

```json
{
  "description": "Buy new shoes",
  "category": "Shopping",
  "isCompleted": true
}
```
- description, category and isCompleted are all optional but if provided in the body then their values cannot be empty string or just containing white spaces.
  
Successful Response (200):

```json
{
  "id": 1,
  "userId": 1,
  "description": "Buy new shoes",
  "category": "Shopping",
  "isCompleted": true
}
```

Error Responses:

- 400 — Invalid ID or invalid description or category or isCompleted
- 404 — Todo not found
- 403 — Not authorized (user not owner)

### 5. Delete Todo (Protected)
- URL: DELETE /todos/:id

Headers:
```bash
Authorization: Bearer <token>
```
Success Response (204):
- No content returned

Error Responses:

- 400 — Invalid ID
- 404 — Todo not found
- 403 — Not authorized

### Important Note
- Data is in-memory — restarting the server resets everything.
- JWT signing secret:
  ```bash
  My_SECRET_KEY_123
  ```
  
