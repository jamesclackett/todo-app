import PropTypes from 'prop-types';
import DoneButton from '../buttons/DoneButton'
import PriorityButton from '../buttons/PriorityButton'
import { useDialog } from '../../context/DialogContext';
import '../../styles/app/Todo.css'
import TodoForm from '../forms/TodoForm';

TodoListItem.propTypes = {
    task: PropTypes.object.isRequired,
    persistToDB: PropTypes.func
}


// Manages the visualisation of Todo Items
// input:
//      task (the todo item)
//      persistToDB (function to trigger api call in Todo) **prop drilled** change later
function TodoListItem({task, persistToDB}) {
    const { toggleDialog, setContent } = useDialog();

    // updates dialog context to show a dialog for editing the Todo.
    // provides the Dialog with content and persistToDB
    const showTodoDialog = () => {
        toggleDialog();
        setContent(<TodoForm values={task} onSubmit={persistToDB}/>)
    }

    return(
        <div>
            <li className='list-item' onClick={showTodoDialog}>
                {
                    task.completed
                    ? <p className='list-item-info-text completed'>{task.task}</p>
                    : <p className='list-item-info-text'>{task.task}</p>
                }
                <div className='list-item-controls'>
                    <PriorityButton priority={task.priority} completed={task.completed} />
                    <DoneButton completed={task.completed}/>
                </div>
            </li>
        </div>
    )
}

export default TodoListItem;