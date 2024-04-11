import PropTypes from 'prop-types';
import { useDialog } from '../../context/DialogContext';
import '../../styles/forms/Form.css'
import { useState } from 'react';

TodoForm.propTypes = {
    values: PropTypes.object,
    http_method: PropTypes.string,
    onSubmit: PropTypes.func
}

// Component for displaying a 'Todo' form
// Manages the creation of new todos and updating existing
// Used in combination with a HTML dialog
// input: 
//      values (the todo item values)
//      onSubmit (a function to specify submit behavior in parent)
// returns: A custom Form jsx element
function TodoForm({values = {}, onSubmit}) {
    const {task = '',
     dueDate = 0, priority = false, 
     completed = false} = values;
    // parse epoch time for form <input>
    const epochMilis = dueDate ? new Date(dueDate * 1000) : new Date();
    const dateStr = epochMilis.toISOString().split('T')[0];
    const timeStr = epochMilis.toTimeString().split(' ')[0];

    // stateful formInput for mnanging input fields
    const [formInput, setFormInput] = useState({
        task: task,
        dueDate: dateStr,
        dueTime: timeStr,
        priority: priority,
        completed: completed
    }) 

    // useContext function. Toggles Dialog in Todo.jsx (page)
    const { toggleDialog } = useDialog();

    // Parse Form input for the Database and submit to parent
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // convert time back into epoch seconds
        const { task, dueDate, dueTime, priority, completed } = e.target.elements;
        const dateAndTimeStr =  `${dueDate.value}T${dueTime.value}`;
        const dateTime = new Date(dateAndTimeStr);
        const epochMilliseconds = dateTime.getTime();
        const epochSeconds = Math.floor(epochMilliseconds / 1000);

        // this should be changed later, mutating 'values' leads to positive but unexpected behaviour
        values.task = task.value
        values.dueDate = epochSeconds,
        values.priority = priority.checked,
        values.completed = completed.checked

        onSubmit(values);
        toggleDialog();
    }

    // on form cancel button pressed
    const handleCancel = (e) => {
        e.preventDefault();
        toggleDialog();
    }

    // update input state when user changes values
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;

        if (type === 'checkbox') {
            setFormInput({ ...formInput, [name]: checked });
        } else {
            setFormInput({...formInput, [name] : value})
        } 
    }

    return(
        <div className="todo-form-container">
            <h2>Your todo:</h2>
            <form onSubmit={handleSubmit} className="todo-form-content" action="">
                <div className="todo-form-input">
                    <label htmlFor='desc' >Description:</label>
                    <input id='desc' name="task" type="text" placeholder="What do you need to do?" required value={formInput.task} onChange={handleChange}/>
                </div>
                <div className="todo-form-input">
                    <label htmlFor='due-date'>Due Date:</label>
                    <input id='due-date' name="dueDate" type="date" placeholder="" required value={formInput.dueDate}
                    onChange={handleChange}/>
                </div>
                <div className="todo-form-input">
                    <label htmlFor='due-time'>Time:</label>
                    <input id='due-time' name="dueTime" type="time" placeholder="" required value={formInput.dueTime}
                    onChange={handleChange}/>
                </div>
                <div className="todo-form-input-checkbox">
                    <label htmlFor='priority' >Priority?</label>
                    <input id='priority' name="priority" className='checkbox-button' type="checkbox" checked={formInput.priority} onChange={handleChange}/>
                </div>
                {
                    // Hides the 'completed' box when creating a new todo
                    values.uuid 
                    ? <div className="todo-form-input-checkbox">
                        <label htmlFor='completed' >Complete?</label>
                        <input id='completed' name="completed" className='checkbox-button' type="checkbox" checked={formInput.completed} onChange={handleChange}/>
                    </div>
                    : <div></div>
                }
                
                <div className='todo-form-controls'>
                    <button onClick={handleCancel}>Cancel</button>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm;