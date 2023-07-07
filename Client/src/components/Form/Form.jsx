import { useState } from "react";
import validation from "../Validation/Validation";

const Form = ({login}) => {

    const [userData, setUserData] = useState({email:"", password:""})
    const [errors, setErrors] = useState({})
    
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]:event.target.value
        })

        setErrors(validation({
            ...userData,
            [event.target.name]:event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        login(userData)
    }
     
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input placeholder="Ignrese un email" onChange={handleChange} name="email" value={userData.email} type="email" />
            {errors.email && <p>{errors.email}</p>}

            <br />
            <label htmlFor="password">Password</label>
            <input placeholder="Ignrese una password" onChange={handleChange} name="password" value={userData.password} type="password" />
            {errors.password && <p>{errors.password}</p>}
            <br />
            <button disabled={!userData.email || !userData.password || errors.email || errors.password}>Submit</button>
        </form>
    );
}

export default Form