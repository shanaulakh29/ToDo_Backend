
/**
 * The usersArray acts as an in-memory database for predefined users
 * Each object contains id, username and password
 */

const usersArray = [{
    id:1,
    username:"ali",
    password:"ali123"
},{
    id:2,
    username:"reza",
    password:"reza123",
},{
    id:3,
    username:"bob",
    password:"bob123"
}]


/**
 * The todosArray acts as an in-memory database for todo items
 * Each object contains id, userid, description, category, isCompleted
 */

const todosArray=[
    {
    id: 1,
    userId: 1,
    description: "Buy shoes",
    category: "Shopping",
    isCompleted: false
  },
  {
    id: 2,
    userId: 1,
    description: "watch movie",
    category: "entertainment",
    isCompleted: false
  },
  {
    id: 3,
    userId: 2,
    description: "Play Soccer",
    category: "recreation",
    isCompleted: false
  }
]

module.exports = {usersArray,todosArray}