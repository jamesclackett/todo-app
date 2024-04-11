/* eslint-disable react/prop-types */
import { FaRegStar } from "react-icons/fa";

// A simple priority/starred button consisting of a star symbol
// if todo is completed, opacity is lowered
// if todo is priority, color is orange, otherwise gray
function PriorityButton({priority, completed}) {
    return(
        <div>
            {priority
            ? <FaRegStar color="orange" size={20} opacity={completed ? 0.3 : 1}/>
            : <FaRegStar size={20} opacity={0.2}/>
            }
            
        </div>
    )
}

export default PriorityButton;