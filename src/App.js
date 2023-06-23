import './App.css';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Error from './components/Error/Error';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';


function App() {

   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const {pathname} = useLocation();
   const navigate = useNavigate();
    
   const email = "admin@admin.com";
   const password = "12345678";

   const login = (userData) => {
      if (userData.email === email && userData.password === password){
         setAccess(true)
         navigate("/home")
      }else{
         alert("Email o contraseña incorrectos");
      }
   }

   const logout = () => {
         setAccess(false)
         navigate("/")
   }

   useEffect(()=>{
      !access && navigate("/");
   }, [access])
   

   const onSearch = (id) => {
      if (id>826){
         alert("¡El ID no debe ser mayor a 826!")
      }else{
         axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
            if (data.name) {
               let repetido = characters.find((character)=>character.id === data.id)
               if(repetido){
                  alert("¡No se permiten personajes repetidos!")
               }else{
                  setCharacters((oldChars) => [...oldChars, data]);
               }
            } else {
               window.alert('¡No hay personajes con este ID!');
            }
         });
      }
   }

   const onClose = (id) => {
      const characterFiltered = characters.filter(character => character.id !== Number(id))
      setCharacters(characterFiltered)
   }

   const addRandom = () => {
      const random = Math.ceil(Math.random()*826)
      axios(`https://rickandmortyapi.com/api/character/${random}`).then(({ data }) => {
         if (data.name) {
            let repetido = characters.find((character)=>character.id === data.id)
            if(repetido){
               alert("¡No se permiten personajes repetidos!")
            }else{
               setCharacters((oldChars) => [...oldChars, data]);
            }
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   return (
      <div className='App'>
         {
            pathname === '/' ? null : <Nav logout={logout} onSearch={onSearch} addRandom={addRandom}/>
         }
         <Routes>
            <Route path='/' element={<Form login={login}/>}></Route>
            <Route path='/home' element={<Cards onClose={onClose} characters={characters}/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path={`/detail/:id`} element={<Detail/>}></Route>
            <Route path='/favorites' element={<Favorites/>}></Route>
            <Route path='*' element={<Error/>}></Route>
         </Routes>
      </div>
   );
}

export default App;
