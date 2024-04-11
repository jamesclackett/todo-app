/// Todo SERVICE:
// Simplifies API queries for other services and components

import { API, HTTP_METHOD, queryAPI } from "./queryService"

// get a list of todos for a given user UUID
// takes the necessary UUID as input
export const getTodos = async (userUUID) => {
    return await queryAPI(HTTP_METHOD.GET, API.TODO + '/' + userUUID);
}

// create a post request for a new todo
// takes the new todo as input
export const createTodo = async (todo) => {
    console.log("todo", todo)
    return await queryAPI(HTTP_METHOD.POST, API.TODO, todo);
}

// update an existing Todo with patch
// takes the modified todo as input
export const updateTodo = async (todo) => {
    return await queryAPI(HTTP_METHOD.PATCH, API.TODO, todo);
}

// Helper function for filtering the todo list by TODAY, removing others
export const filterTodayTodos = (todosList) => {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);

    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

    const startEpochSeconds = Math.floor(startOfDay.getTime() / 1000);
    const endEpochSeconds = Math.floor(endOfDay.getTime() / 1000);  

    return todosList.filter((item) => {
        return item.dueDate >= startEpochSeconds && item.dueDate <= endEpochSeconds
    })
}

// Helper function for filtering the todo list by priority, removing non-priority
export const filterPriorityTodos = (todosList) => {
    return todosList.filter((item) => {
        return item.priority === true
    })
}