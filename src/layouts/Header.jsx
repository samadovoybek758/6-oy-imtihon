import React from 'react';
import logo from '../assets/open-book.png'

function Header({children}) {
  return (
    <>
        <header className='bg-gray-300'>
            <div className="continer max-w-[1200px] mx-auto my-2 mb-24 py-3" >
                <img className='' src={logo} alt="" />
                
            </div>
        </header>
        {children}
    </>
  )
}

export default Header