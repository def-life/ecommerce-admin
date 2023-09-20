import { signOut } from 'next-auth/react'
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react'

function Logout() {
    async function logOut() {
        signOut({ callbackUrl: '/front/display-products' })
   }
    return (
        <div>
            <button onClick={logOut}><LogoutIcon /> LogOut</button>
        </div>
    )
}

export default Logout