
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import close from '../assets/images/close.png';
import iconShopping from '../assets/images/iconShopping.png';
import { CartContext } from '../context/cartContext';

const Detail = ({ show, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  


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
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row gap-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-2" onClick={onClose}>
              <img src={close} alt="close" className="w-6" />
            </button>

            <div className="md:w-1/2 w-full flex justify-center items-start sticky top-0">
              <img
                src={product?.image}
                alt={product?.name}
                className="max-h-[400px] object-contain"
              />
            </div>

            <div className="md:w-1/2 w-full flex flex-col justify-between">
              <h2 className="text-xl font-bold mb-2">{product?.name}</h2>
              <p className="text-lg font-semibold mb-2">
                Rp.{product?.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-line mb-4">
                {product?.description}
              </p>
             <div className='flex gap-7'>
          <div className=' flex gap-2 justify-center items-center'>
         <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handleMinusQuantity}>-</button>
              <span className='bg-gray-50 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center'>{quantity}</span>
              <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handlePlusQuantity}>+</button>      
              </div>
              <button className="bg-gray-300 p-3 rounded-md text-md hover:bg-gray-400 flex items-center justify-center w-full gap-2" onClick={() => addToCart({ ...product, quantity })}>
                <img src={iconShopping} alt="Keranjang" className="w-6" />
                Keranjang
              </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Detail;
