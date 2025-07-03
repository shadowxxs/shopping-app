import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import iconShopping from '../assets/images/iconShopping.png'
import Detail from './detail';
import { CartContext } from '../context/cartContext';
const ProductCart = (props) => {
  const {addToCart} = useContext(CartContext)
  const {id, name, price, image, description} = props.data;
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);


  const product = {id, name, price, image, description};

  const handleMinusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {  
      setQuantity(1);
    }
  }
  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };
  return (
    <div className=' bg-white rounded-xl shadow-sm p-5'>
      <Link to={id}>
      <img src={image} alt='' className='w-full h-80 ' onClick={() => setShowModal(true) }/>
      </Link>
    <h3 className='text-2xl py-3 text-center font-medium'>{name}</h3>

    <div className='flex items-center justify-between'>
      <div>
        <div className='flex justify-between items-center gap-6 p-2 '>
        <span className='text-2xl font-medium rounded-md'>Rp.{price.toLocaleString()}</span>
        <button className='text-md font-light  hover:text-lg  ' onClick={() => setShowModal(true)}>Detail</button>
        </div>
        <div className='flex gap-5'>
          <div className=' flex gap-1 justify-center items-center'>
         <button className='bg-gray-100 h-full w-8 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handleMinusQuantity}>-</button>
              <span className='bg-gray-50 h-full w-8 font-bold text-xl rounded-xl flex justify-center items-center'>{quantity}</span>
              <button className='bg-gray-100 h-full w-8 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handlePlusQuantity}>+</button>      
              </div>
        <button className='bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex ' onClick={() => addToCart({ ...product, quantity})}><img src={iconShopping} alt='' className='w-5'/>Keranjang</button>
        </div>  
    </div>
    </div>

    <Detail
    show={showModal}
    onClose={() => setShowModal(false)}
    product={{id, name, price, image, description}} />
    </div>
  )
}

export default ProductCart