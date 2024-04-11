import TodoList from '../components/todo/TodoList'
import AddButton from '../components/buttons/AddButton' 
import Dialog from '../components/dialogs/Dialog';
import {useDialog } from '../context/DialogContext';
import TodoForm from '../components/forms/TodoForm';
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext';
import { getTodos, filterPriorityTodos, filterTodayTodos, createTodo, updateTodo} from '../services/todoService';
import { useState, useEffect } from 'react';

// Component responsible for generating Todo Lists
// Uses the user context and todo service to retrieve and update its data.
function Todo() {

    const [todos, setTodos] = useState([]);
    const { toggleDialog, setContent } = useDialog();
    const { user } = useUser();

    // fetch todos from the api using todoService.getTodos()
    const fetchData = async () => {
        if (user) {
            const response = await getTodos(user.uuid);
            setTodos(await response.json());
        }
    };

    // ensures that todos are fetched from the api when the user object is set
    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);


    // only show this page if the user is logged in
    // cannot recieve todos from api without a valid user uuid
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Uses the dialog context api to show Todo Dialog
    // provides content and the persistToDatabase function
    const showTodoDialog = () => {
        setContent(<TodoForm onSubmit={persistToDatabase}/>);
        toggleDialog();
    };


    // Function that saves new/modified todo items in the database
    // makes use of todo service to generate request
    const persistToDatabase = async (todo) => {
        if (todo && !todo.authUUID && !todo.uuid) {
            todo.authUUID = user.uuid;
            await createTodo(todo);
        } else  {
            await updateTodo(todo);
        }
        fetchData();
    }


    return (
        <>  
            <Dialog /> 

            <div className='content'>
                <TodoList data={todos} title={"All"} persistToDB={persistToDatabase}/>
                <TodoList data={filterTodayTodos(todos)} title={"Today"} size={"large"} persistToDB={persistToDatabase}/>
                <TodoList data={filterPriorityTodos(todos)} title={"Priority"} persistToDB={persistToDatabase}/>
            </div>
            <div onClick={showTodoDialog} className='add-button-container'>
                <AddButton size={60}/>
            </div>
        </>
    )
}

export default Todo;
