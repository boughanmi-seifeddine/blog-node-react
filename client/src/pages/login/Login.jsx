import "./login.css";
import axios from "axios";
import React, {useContext, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import  AuthContext  from "../../context/auth/authContext";
import Alert from "../../components/alert/alert";
import AlertContext from "../../context/alert/alertContext";

export default function Login() {
    const {loginUser} = useContext(AuthContext)
    const {setAlert} = useContext(AlertContext);
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState(false)
    const {dispatch, isFetching} = useContext(Context)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await loginUser({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })
        //res ? navigate('/') : setError(true)
        if(res?.data){
            navigate('/')
        }else{
            setError(true);
            setAlert(res?.message || 'something went wrong !!!', 'danger', 5000)
        }
    };
  return (
      <>
          <Alert></Alert>
          <div className="login">
              <span className="loginTitle">Login</span>
              <form className="loginForm" onSubmit={handleSubmit}>
                  <label>Email</label>
                  <input
                      type="text"
                      className="loginInput"
                      placeholder="Enter your email..."
                      ref={emailRef}
                  />
                  <label>Password</label>
                  <input
                      type="password"
                      className="loginInput"
                      placeholder="Enter your password..."
                      ref={passwordRef}
                  />
                  <button className="loginButton" type="submit" disabled={isFetching}>
                      Login
                  </button>
              </form>
              <button className="loginRegisterButton">
                  <Link className="link" to="/register">
                      Register
                  </Link>
              </button>
          </div>
      </>

  );
}
