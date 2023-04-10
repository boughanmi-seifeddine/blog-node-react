import "./alert.css"
import React, {useContext} from "react";
import AlertContext from "../../context/alert/alertContext";
const Alert = () => {
    const {alerts} = useContext(AlertContext);
    const alertDisplay = alerts.map((alert)=><div key={alert.id} className={`alert alert-${alert.type}`}>{alert.message}</div>)
   return(<>{alertDisplay}</>)

}
export default Alert