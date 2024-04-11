import { RiTodoLine } from "react-icons/ri";
import '../../styles/sections/Header.css'


// Header component
// Displays the app logo and name
// On click takes user to the home page (Todo)
function Header() {
    return(
        <header className="header">
            <a href="/">
                <div className="header-content">
                    <RiTodoLine size={50}/>
                    <h2>ToDo</h2>
                </div>
            </a>
        </header>
    )
}

export default Header;