import PropTypes from 'prop-types';
import { useDialog } from '../../context/DialogContext';

Dialog.propTypes = {
    content: PropTypes.node
}

// A Dialog component responsible for displaying content passed as context
// the open state is also passed as a context
// This Dialog is provided to the entire Todo page with the Context API
function Dialog() {
    const { isOpen, content } = useDialog();

    return(
        isOpen && (
            <div className='dialog-container'>
            <dialog open={true}>
                {content}
            </dialog>
        </div>
        )
    )
}

export default Dialog;