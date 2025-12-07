/**
 * Updates the todo with values from req.body after validation
 * description and category fields are trimmed, cannot be empty if present
 * isCompleted field must be boolean if present
 * return { todo } on success and { error } on validation failure.
 */

function validateAndUpdateTodo(todo, updates){
    const {description, category, isCompleted}=updates

    if (updates.hasOwnProperty('description')) {
        const trimmedDescription=description.trim()
        if (trimmedDescription==="") {
            return {error:"Decription cannot be empty or whitespaces"}
        }
        todo.description = trimmedDescription
    }

   if (updates.hasOwnProperty('category')) {
        const trimmedCategory=category.trim()
        if (trimmedCategory==="") {
            return {error:"Category cannot be empty or whitespaces"}
        }
        todo.category = trimmedCategory
    }

    if (updates.hasOwnProperty('isCompleted')) {
        if (typeof isCompleted !== "boolean") {
            return {error:"isCompleted must be a boolean value"}
        }
        todo.isCompleted = isCompleted
    }
    return {todo}
}

module.exports=validateAndUpdateTodo