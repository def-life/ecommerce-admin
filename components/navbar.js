import React from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import CloseIcon from '@mui/icons-material/Close';
import Logout from './Logout';
// import HomeIcon from '@mui/icons-material/Home';

const navItems = [
    {itemName: "Dashboard", icon: <DashboardOutlinedIcon />, alt: "dashboard_svg", pathname: "/dashboard"},
    {itemName: "Products", icon: <ShoppingBagOutlinedIcon />, alt: "products_svg", pathname: "/products" },
    {itemName: "Categories", icon: <CategoryOutlinedIcon />, alt: "categories_svg", pathname: "/categories" },
    {itemName: "Orders", icon: <ViewListOutlinedIcon />, alt: "orders_svg", pathname: "/orders" },
    {itemName: "Settings", icon: <SettingsOutlinedIcon />, alt: "settings_svg", pathname: "/settings" },
]


function NavBar({show, toggleMenu}) {

    const router = useRouter();

    const navItemsJsx = navItems.map((item) => {
        const {itemName, icon, alt, pathname} = item;
        return <Link style={
            {
                background: router.pathname.includes(pathname) ? "#eae8fb" : "transparent"
            }
        } key={itemName} href={pathname} alt={alt} className={`block  mb-1 p-1 rounded-sm transition-colors`}>
            <div className='flex justify-start items-center gap-2'>
                <span>{icon}</span>
                <span>{itemName}</span>
            </div>
        </Link>
    })
  return (
    <div className={`${show ? "left-0" : "-left-full"} transition-all  absolute bg-gray-50 h-screen lg:bg-transparent w-full lg:width-auto lg:sticky lg:h-auto top-0`}>
    <aside className='text-gray-600 h-full p-4 px-3'>
        <nav>
            <p className='text-lg mb-4 flex justify-between'><span>Ecommerce Admin</span> <span className='lg:hidden'><CloseIcon onClick={toggleMenu} /></span></p>
            {navItemsJsx}
            <div className='block  mb-1 p-1 rounded-sm transition-color'>
                <Logout />
            </div>
            
        </nav>
    </aside>
    </div>
  )
}

export default NavBar