import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import ProtectedRoute from "./components/protectedRoute/protectedRoute"
import { Routes, Route, Link, Outlet } from 'react-router-dom';

import React, {useContext} from "react";
import {Context} from "./context/Context";
import PostLayout from "./components/layouts/postLayout";
function App() {
    let { user} = useContext(Context);
    let currentUser = user
    return (
        <>
            <Routes>
                <Route path="/" element={<Topbar />}>
                    <Route index element={<Homepage/>}/>
                    <Route path="posts" element={<PostLayout />}>
                        <Route index element={<Homepage/>}/>
                        <Route path=":id" element={<ProtectedRoute user={user}><Single/></ProtectedRoute>}/>
                        <Route path="write" element={<ProtectedRoute user={user}><Write/></ProtectedRoute>}/>
                        <Route path=":id/write" element={<ProtectedRoute user={user}><Write/></ProtectedRoute>}/>
                    </Route>
                    <Route path='settings' element={<ProtectedRoute user={user}><Settings/></ProtectedRoute>} />
                    <Route path='register' element={<Register/>}/>
                    <Route path="login" element={<Login/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
