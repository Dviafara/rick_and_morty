import SearchBar from "../SearchBar/SearchBar";
import { NavLink } from "react-router-dom";

const Nav = ({onSearch, addRandom, logout}) => {
    return(
        <nav>
            <SearchBar onSearch={onSearch} />
            <button onClick={addRandom}>Agregar Random</button>
            <button>
                <NavLink to={"/about"}>About</NavLink>
            </button>
            <button>
                <NavLink to={"/home"}>Home</NavLink>
            </button>
            <button>
                <NavLink to={"/favorites"}>Favoritos</NavLink>
            </button>
            <button onClick={logout}>Log Out</button>
        </nav>
    );
}  

export default Nav;