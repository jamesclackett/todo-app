import TodoListItem from "./TodoListItem";
import PropTypes from 'prop-types';
import '../../styles/app/Todo.css'

TodoList.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string,
    data: PropTypes.array,
    persistToDB: PropTypes.func
}

// Creates and presents a list of Todo Items
// input: 
//      title: A header for the table
//      size:  The size type of the component
//      data: The todo item list
//      persistToDB: a reference to parents function for saving data
function TodoList({title, size, data, persistToDB}) {

    return(
        <>  
            <div className={size === "large" ? "list-container-large" : "list-container"}>
                <div className="list-title-container">
                    {size === "large" ? 
                        <h1 className="list-title">{title}</h1> : <h2 className="list-title">{title}</h2>}
                </div>
                
                <ul className="list-content">
                {!data || data.length == 0 ? <p>No items!</p> : <></>}
                    {data.map((item, idx) => (
                        <TodoListItem key={idx} task={item} persistToDB={persistToDB}/>
                    ))}
                </ul>
            </div>
            
        </>
        
    )
    
}

export default TodoList;