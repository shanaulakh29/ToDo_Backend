
/**
 * Entry point for the backend server
 * Sets up Express, parses JSON requests, and adds login and todo routes
 * Server listens on PORT 3000
 */

const express = require("express")

const app = express()
app.use(express.json())

const PORT = 3004

const loginRoute = require("./routes/login")
const todoRoutes = require("./routes/todos")

app.use("/login", loginRoute)
app.use("/todos",todoRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

