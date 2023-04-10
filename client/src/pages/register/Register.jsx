import "./register.css"
import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Alert from "../../components/alert/alert";

export default function Register() {
    const { registerUser } = useContext(AuthContext);
    const {setAlert} = useContext(AlertContext);
    const [currentUser, setCurrentUser] = useState({});
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const handleUser = (e)=>{
     e.preventDefault()
        setCurrentUser({...currentUser, [e.target.name]:e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        const res = await registerUser(currentUser)
        //res ? navigate('/login') : setError(true);
        if(res?.data){
            navigate('/login')
        }else{
            setError(true);
            setAlert(res?.message || 'something went wrong !!!', 'danger', 5000)
        }
    };
    return (
        <>
            {<Alert ></Alert>}
            <div className="register">
                <span className="registerTitle">Register</span>
                <form className="registerForm" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        name="name"
                        type="text"
                        className="registerInput"
                        placeholder="Enter your username..."
                        onChange={handleUser}
                    />
                    <label>Email</label>
                    <input
                        name="email"
                        type="text"
                        className="registerInput"
                        placeholder="Enter your email..."
                        onChange={handleUser}
                    />
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        className="registerInput"
                        placeholder="Enter your password..."
                        onChange={handleUser}
                    />
                    <label>Confirm Password</label>
                    <input
                        name="passwordConfirm"
                        type="password"
                        className="registerInput"
                        placeholder="Confirm your password..."
                        onChange={handleUser}
                    />
                    <button className="registerButton" type="submit">
                        Register
                    </button>
                </form>
                <button className="registerLoginButton">
                    <Link className="link" to="/login">
                        Login
                    </Link>
                </button>
                {error && <span style={{color: "red", marginTop: "10px"}}>Something went wrong!</span>}
            </div>
        </>

    );
}
