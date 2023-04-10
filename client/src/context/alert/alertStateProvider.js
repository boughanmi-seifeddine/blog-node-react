import AlertContext from "./alertContext"
import React, {useReducer, useEffect} from "react";
import alertReducer from "./alertReducer";
import { v4 as uuid } from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from "../types"



const initialState = []

 const AlertStateProvider = props => {
    const [state, dispatch] = useReducer(alertReducer, initialState)


    /**********************actions*********************************************/

    //set alert
        const setAlert =  (message, type, time)=>{
            const id = uuid()
            dispatch({
                type: SET_ALERT,
                payload: {id, message, type}
            });
            setTimeout(()=>{
                dispatch({
                    type: REMOVE_ALERT,
                    payload: id
                });
            },time)
        }

        // remove alert


     const store = {
         alerts: state,
         setAlert
     }
    return (
        <AlertContext.Provider value={store}>
            {props.children}
        </AlertContext.Provider>
    );
}
export default AlertStateProvider