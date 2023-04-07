import {Navigate} from 'react-router-dom'
export default function ProtectedRote({children, user}) {
if (!user) return <Navigate to='/login'/>
    return children
}
