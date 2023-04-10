import AuthContext from "./authContext";
import React, {useReducer, useEffect} from "react";
import authReducer from "./authReducer";
import axios from "axios";
import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from "../types"


const initialState = {
    user: null,
    isAuthenticated : false,
    loading: true,
    error: false,
    lastAction: null
}

 const AuthStateProvider = props => {
    const [state, dispatch] = useReducer(authReducer, initialState)
     useEffect(()=>{
         localStorage.setItem("jwt", JSON.stringify(state.token));
         localStorage.setItem("user", JSON.stringify(state.user));
     },[state.token, state.user])

    /**********************actions*********************************************/

    //register user
        const registerUser = async (newUser)=>{
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
                const res = await axios.post('api/v1/users/signup', newUser, config)
                debugger
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                });
                return res.data
            }catch (err){
                dispatch({
                    type: REGISTER_FAIL,
                    payload: err.response.data
                });
                return err.response.data
            }
        }

        // login user
     const loginUser = async (user)=>{
         try {
             const config = {
                 headers: {
                     'Content-Type': 'application/json',
                 }
             }
             const res = await axios.post('api/v1/users/login', user, config)
             dispatch({
                 type: LOGIN_SUCCESS,
                 payload: res.data
             });
             return res.data
         }catch (err){
             dispatch({
                 type: LOGIN_FAIL,
                 payload: err.response.data
             });
             return err.response.data
         }
     }

     // login user
     const logoutUser = async ()=> {
         try {
             const config = {
                 headers: {
                     'Content-Type': 'application/json',
                 }
             }
             const res = await axios.get('api/v1/users/logout')
             dispatch({
                 type: LOGOUT,
                 payload: res.data
             });
             return res.data
         } catch (err) {
             console.log(err)
         }
     }

    const store = {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        lastAction: state.lastAction,
        registerUser,
        loginUser,
        logoutUser
    }
    return (
        <AuthContext.Provider value={store}>
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthStateProvider