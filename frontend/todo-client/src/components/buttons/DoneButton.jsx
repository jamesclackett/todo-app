/* eslint-disable react/prop-types */
import { FaRegCircleCheck } from "react-icons/fa6";

// A simple done button consisting of a tick symbol
// if todo is completed, the button is greyed-out
function DoneButton({completed}) {
    return(
        <div>
            <FaRegCircleCheck size={25} opacity={completed ? 0.2 : 1}/>
        </div>
    )
}

export default DoneButton;