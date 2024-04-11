import { FiPlusSquare } from "react-icons/fi";
import PropTypes from 'prop-types';

// A simple add button consisting of a plus symbol
function AddButton({size}) {
    return(
        <FiPlusSquare stroke="white" strokeWidth={0.5}  size={size}/>
    )
}

AddButton.propTypes = {
    size: PropTypes.number.isRequired
}

export default AddButton;