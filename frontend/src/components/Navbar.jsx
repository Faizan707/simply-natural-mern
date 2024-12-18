import React, { useState } from 'react';
import { Routes } from '../routes/route';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingBag } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { RiMenuFill } from "react-icons/ri";

function Navbar() {
  const navItems = [
    { name: "Home", link: Routes.Home },
    { name: "Store", link: "/store", hasDropdown: true },

    { name: "My Account", link: Routes.Login },
  ];

  const [showDropdown, setShowDropdown] = useState(false);

  const [mobileNavbar,setMobileNavbar] = useState(false)

  const [mobileDropdown,setMobileDropdown] = useState(false)

  

  const handleMobileNavbar = () =>{
    setMobileNavbar((prev)=>!prev)
  }
 
const navigate = useNavigate()
  return (
    <>
    <nav className="container mx-auto max-w-7xl flex p-4 justify-between relative">
      <div className="flex items-center gap-4">
        <img
          src="https://websitedemos.net/plant-store-02/wp-content/uploads/sites/410/2020/06/plants-store-logo-green.svg"
          width={50}
          height={50}
          alt="Logo"
          className='hover:cursor-pointer'
          onClick={()=> navigate(Routes.Home)}
        />
        <p className="text-[20px]">Simple Natural</p>
      </div>
      <div className="hidden md:flex items-center gap-10">
        {navItems.map((item) => (
          <div
            key={item.name}
            className="relative"
            onMouseEnter={() => item.hasDropdown && setShowDropdown(true)}
            onMouseLeave={() => item.hasDropdown && setShowDropdown(false)}
          >
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `hover:cursor-pointer hover:text-red-500 text-[15px] ${
                  isActive ? "text-red-500 font-bold" : ""
                }`
              }
            >
              {item.name}
              {item.hasDropdown && <MdArrowDropDown className="h-4 w-4 inline-block" />}
            </NavLink>
            {item.hasDropdown && showDropdown && (
              <div className="absolute w-[250px] top-full bg-white shadow-lg p-4 border-t-2 border-red-500 left-[10px]">
                <p className="hover:text-red-600 cursor-pointer">Plant</p>
                <p className="hover:text-red-600 cursor-pointer">Cactus</p>
              </div>
            )}
          </div>
        ))}

        <div className="relative">
          <FaShoppingBag className="text-red-500 text-[20px]" />
          <div className="absolute top-[-9px] right-[-14px] w-[20px] h-[20px] bg-red-500 border rounded-full font-bold text-[14px] text-center">
            0
          </div>
        </div>
      </div>

      <div className=" flex items-center relative lg:hidden md:hidden ">
          <FaShoppingBag className="text-red-500 text-[20px]" />
          <div className="absolute top-[2px] right-[-12px] w-[20px] h-[20px] bg-red-500 border rounded-full font-bold text-[14px] text-center">
            0
          </div>
        </div>

      <div className='lg:hidden md:hidden flex items-center justify-center'>
  <button className='w-[40px] h-[40px] text-red-600 border-2 border-red-600 p-2 flex items-center justify-center' onClick={handleMobileNavbar}>
    <RiMenuFill />
  </button>
</div>


    

    </nav>
    {mobileNavbar && (
  <nav>
    <div className='flex flex-col gap-4 p-4'>
      {navItems.map((item) => (
        <div 
          key={item.name}
          className="relative"
        >
          <div className="flex items-center gap-2">
            <NavLink 
              to={item.link}
              className={({ isActive }) =>
                `hover:cursor-pointer hover:text-red-500 text-[20px] ${
                  isActive ? "text-red-500 font-bold" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
            {item.hasDropdown && (
              <div className='flex items-center'>
              <MdArrowDropDown 
                className="h-8 w-8 " 
                onClick={() => setMobileDropdown(!mobileDropdown)}
              />
            </div>
            )}
          </div>
          {item.hasDropdown && mobileDropdown && (
               <div className=" w-full  bg-white shadow-lg p-4 border-t-2 border-red-500 flex flex-col gap-5 ">
               <p className="hover:text-red-600 cursor-pointer">Plant</p>
               <p className="hover:text-red-600 cursor-pointer">Cactus</p>
             </div>
          )}
        </div>
      ))}
    </div>
  </nav>
)}

    </>
    
  );
}

export default Navbar;
