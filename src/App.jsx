import './App.css';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import UserList from './components/UserList/UserList';
import Notes from './components/Notes/Notes';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/userList' element={<UserList/>}/>
      <Route path='/usernotes/:email' element={<Notes />} />
      <Route path='/' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
