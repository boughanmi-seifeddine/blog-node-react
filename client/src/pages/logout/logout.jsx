import {useContext} from "react";
import AuthContext from "../../context/auth/authContext";
import {useNavigate} from "react-router-dom";

export default function Logout() {
    const {logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogout = async ()=>{
        const data = await logoutUser()
        data ? navigate('/login') : console.log('error in logout')
    }
    handleLogout()
  return (
     <></>
  );
}
