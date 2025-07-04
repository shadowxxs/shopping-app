import React, { useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import iconShopping from '../assets/images/iconShopping.png';
import iconHistory from '../assets/images/iconHistory.png';
import { CartContext } from '../context/cartContext';
import iconHome from '../assets/images/iconHome.png';

const Header = memo(({ onCartClick, historyCount }) => {
  const { totalItems } = useContext(CartContext);
  return (
    <header className='flex justify-end items-center p-4 z-50'>
      <div className='flex items-center gap-4'>
        <Link to="/" className="p-2">
          <img src={iconHome} alt='Home' className='w-10 h-10 sm:w-12 sm:h-12' />
        </Link>
        <div className='relative'>
          <Link to="history" className="p-2">
            <img src={iconHistory} alt='History' className='w-9z h-9 sm:w-12 sm:h-12' />
            <span className='absolute top-1/2 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>{historyCount}</span>
          </Link>
        </div>
        <div className='relative'>
          <button onClick={onCartClick} className="p-2">
            <img src={iconShopping} alt='Shopping Cart' className='w-7 h-7 sm:w-8 sm:h-8' />
            <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>{totalItems}</span>
          </button>
        </div>
      </div>
    </header>
  );
});

export default Header;