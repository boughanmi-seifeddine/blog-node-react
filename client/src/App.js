import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import ProtectedRoute from "./components/protectedRoute/protectedRoute"
import { Routes, Route} from 'react-router-dom';
import React, {useContext} from "react";
import AuthContext from "./context/auth/authContext";
import PostLayout from "./components/layouts/postLayout";
import Logout from "./pages/logout/logout";
function App() {
    let { user, isAuthenticated} = useContext(AuthContext);
    return (
        <>
            <Routes>
                <Route path="/" element={<Topbar user={ user} />}>
                    <Route index element={<Homepage/>}/>
                    <Route path="posts" element={<ProtectedRoute user={user}><PostLayout /></ProtectedRoute>}>
                        <Route index element={<Homepage/>}/>
                        <Route path=":id" element={<ProtectedRoute user={user}><Single/></ProtectedRoute>}/>
                        <Route path="write" element={<ProtectedRoute user={user}><Write /></ProtectedRoute>}/>
                        <Route path=":id/write" element={<ProtectedRoute user={user}><Write /></ProtectedRoute>}/>
                    </Route>
                    <Route path='settings' element={<ProtectedRoute user={user}><Settings/></ProtectedRoute>} />
                    <Route path='register' element={<Register/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="logout" element={<Logout/>}/>
                </Route>
            </Routes>
        </>
    );
}
export default App;
