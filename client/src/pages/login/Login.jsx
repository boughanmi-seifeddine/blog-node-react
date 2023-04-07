import "./login.css";
import axios from "axios";
import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching} = useContext(Context);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/api/v1/users/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data.user });
            res.data && navigate('/')
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };
  return (
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
  );
}
