const express = require("express")
const router = express.Router()
const authenticateToken = require("../middleware/authenticateToken")
const {todosArray}=require("../data/data")

//This is a global counter that increments on each todoItem creation. The variable nextToDoId is used inside post("/")
let nextTodoId = todosArray.length+1

/**
* This route returns all todos for all users
* Supports optional filtering by description and by category
* The route requires a valid JWT token to access
* returns JSON array of todos matching the filters and status code 200(OK)
*/
router.get("/", authenticateToken,(req, res) => {
    const {description, category}=req.query
    let filtered=[...todosArray]
    if(description){
        filtered = filtered.filter(todo=>{
            return todo.description.toLowerCase().includes(description.toLowerCase())
        })
    }

    if(category){
        filtered = filtered.filter(todo=>{
            return todo.category.toLowerCase()=== category.toLowerCase()
        })
    }
    res.status(200).json(filtered)
})

/**
 * This route creates a new todo item for authenticated user
 * Requirements:
 *  1) description and category fields must be non empty
 *  2) isCompleted field is optional (default: false)
 * 
 * Response:
 *  1) 201 Created with the new todo object
 *  2) 400 Bad Request if description or category is missing or empty
 */
router.post("/",authenticateToken,(req,res)=>{
    const { description, category, isCompleted } = req.body
    if(!description || description.trim() === "" || !category || category.trim() === ""){
        return res.status(400).json({message:"Description and Category fields are required and must be non empty"})
    }
   
    const newTodo={
        id:nextTodoId++,// auto increment id
        userId:req.user.id,
        description,
        category,
        isCompleted: isCompleted!=undefined?isCompleted:false
    }
    todosArray.push(newTodo)
    res.status(201).json(newTodo)
})

/**
 * Updates a todo item by ID
 * Only the creater can update their todo
 * Returns 400 if ID is invalid, 404 if not found, 403 if not authorized
 * Returns the updated todo on success and status code 200(OK)
 */

router.put("/:id",authenticateToken,(req,res)=>{
    const todoId = parseInt(req.params.id)
    if(isNaN(todoId)){
        return res.status(400).json({message:"Invalid todo ID"})
    }
    const todo = todosArray.find(todo=>{
        if(todo.id===todoId){
            return todo
        }
    })
    if(!todo){
        return res.status(404).json({message:"Todo item not found"})
    }
    if(todo.userId!=req.user.id){
        return res.status(403).json({message:"Not authorized"})
    }
    const {description,category, isCompleted}=req.body
    if(description){
        if(description.trim()===""){
            return res.status(400).json({message:"Description cannot be empty or whitespaces"})
        }
        todo.description=description
    }
    if(category){
         if(category.trim()===""){
            return res.status(400).json({message:"Category cannot be empty or whitespaces"})
        }
        todo.category=category
    }
    if(isCompleted!=undefined){
        todo.isCompleted=isCompleted
    }
    res.status(200).json(todo)
})


/**
 * Deletes a todo item by ID
 * Only the creater of the todo can delete it
 * Returns 400 if ID is invalid, 404 if not found, 403 if not authorized
 * Returns 204 on successful deletion
 */

router.delete("/:id",authenticateToken,(req,res)=>{
    const todoId = parseInt(req.params.id)
    if(isNaN(todoId)){
        return res.status(400).json({message:"Invalid todo ID"})
    }
    const todoIndex = todosArray.findIndex(todo=>{
    if(todo.id===todoId){
        return true
    }
    })
    if(todoIndex===-1){
        return res.status(404).json({message:"Todo not found"})
    }

    if(todosArray[todoIndex].userId!=req.user.id){
        return res.status(403).json({message:"Not authorized"})
    }
    todosArray.splice(todoIndex,1)
    res.status(204).send()
})

module.exports=router