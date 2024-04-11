import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/sections/Header'
import Login from './pages/Login';
import Register from './pages/Register';
import Todo from './pages/Todo';
import NotFound from './pages/NotFound';
import { DialogProvider} from '../src/context/DialogContext';
import { UserProvider } from '../src/context/UserContext';
import './styles/app/App.css'


function App() {
    return( 
        <>  
            <UserProvider>

                <DialogProvider>
                    <Header />
                    <BrowserRouter>
                        <Routes>
                            <Route index element={<Todo/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/register' element={<Register/>}/>
                            <Route path='/*' element={<NotFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </DialogProvider>

            </UserProvider>
        </>
    )
}

export default App;