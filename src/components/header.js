import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import iconShopping from '../assets/images/iconShopping.png'
import iconHistory from '../assets/images/iconHistory.png'
import { CartContext } from '../context/cartContext'
import iconHome from '../assets/images/iconHome.png'

const Header = ({ onCartClick, historyCount}) => {
  const {totalItems} = useContext(CartContext);;
  return (
    <header className='flex justify-between items-center p-4 z-50'>
      <div className='flex items-center gap-4 relative left-3/4'>
      <Link to="/" ><img src={iconHome} alt='' className='w-12' /></Link>
        <div className='relative'>
      <Link to="history"><img src={iconHistory} alt='' className='w-10'/>
      <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>{historyCount}</span></Link>
      </div>
      <div className='relative'>
        <button onClick={onCartClick}>
        <img src={iconShopping} alt='' className='w-8'/>
        </button>
        <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>{totalItems}</span>
        </div>
      </div>
    </header>
  )
}

export default Header