import React, { useContext, useState, useCallback, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import iconShopping from '../assets/images/iconShopping.png';
import Detail from './detail';
import { CartContext } from '../context/cartContext';

const ProductCart = memo((props) => {
  const { addToCart } = useContext(CartContext);
  const { id, name, price, image, description } = props.data;
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

   const product = useMemo(() => ({ id, name, price, image, description }), [id, name, price, image, description]) ;


  const handleMinusQuantity = useCallback(() => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  }, []);

  const handlePlusQuantity = useCallback(() => {
    setQuantity(prevQuantity => prevQuantity + 1);
  }, []);

  const handleAddToCart = useCallback(() => {
    addToCart({ ...product, quantity });
  }, [addToCart, product, quantity]);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden flex flex-col'>
      <div className="relative">
        <Link to={id} onClick={openModal}>
          <img src={image} alt={name} className='w-full h-64 object-cover' />
        </Link>
      </div>
      <div className='p-4 flex flex-col flex-grow'>
        <h3 className='text-lg sm:text-xl font-semibold text-center mb-2 flex-grow'>{name}</h3>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-lg sm:text-2xl font-bold text-gray-800'>Rp.{price.toLocaleString()}</span>
          <button className='text-sm text-blue-500 hover:underline' onClick={openModal}>Detail</button>
        </div>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex items-center justify-center gap-2'>
            <button className='bg-gray-200 h-8 w-8 font-bold text-lg rounded-full flex justify-center items-center transition-colors hover:bg-gray-300' onClick={handleMinusQuantity}>-</button>
            <span className='bg-gray-100 h-8 w-10 font-bold text-lg rounded-md flex justify-center items-center'>{quantity}</span>
            <button className='bg-gray-200 h-8 w-8 font-bold text-lg rounded-full flex justify-center items-center transition-colors hover:bg-gray-300' onClick={handlePlusQuantity}>+</button>
          </div>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors w-full' onClick={handleAddToCart}>
            <img src={iconShopping} alt='' className='w-5 h-5' />
            <span>Keranjang</span>
          </button>
        </div>
      </div>

      <Detail
        show={showModal}
        onClose={closeModal}
        product={{ id, name, price, image, description }}
      />
    </div>
  );
});

export default ProductCart;
