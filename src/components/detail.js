
import React, { useContext, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import close from '../assets/images/close.png';
import iconShopping from '../assets/images/iconShopping.png';
import { CartContext } from '../context/cartContext';

const Detail = memo(({ show, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleMinusQuantity = useCallback(() => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  }, []);

  const handlePlusQuantity = useCallback(() => {
    setQuantity(prevQuantity => prevQuantity + 1);
  }, []);

  const handleAddToCart = useCallback(() => {
    addToCart({ ...product, quantity });
  }, [addToCart, product, quantity]);

  if (!show) {
    return null;
  }

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
            className="bg-white p-6 rounded-lg max-w-4xl w-11/12 md:w-full max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row gap-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-3 right-3 z-10" onClick={onClose}>
              <img src={close} alt="close" className="w-6 h-6" />
            </button>

            <div className="md:w-1/2 w-full flex justify-center items-start">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            <div className="md:w-1/2 w-full flex flex-col">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{product?.name}</h2>
              <p className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
                Rp.{product?.price?.toLocaleString()}
              </p>
              <div className="text-sm text-gray-700 whitespace-pre-line mb-6 overflow-y-auto max-h-48">
                {product?.description}
              </div>
              <div className='flex flex-col sm:flex-row gap-4 mt-auto'>
                <div className='flex items-center justify-center gap-2'>
                  <button className='bg-gray-200 h-10 w-10 font-bold text-xl rounded-full flex justify-center items-center transition-colors hover:bg-gray-300' onClick={handleMinusQuantity}>-</button>
                  <span className='bg-gray-100 h-10 w-12 font-bold text-xl rounded-md flex justify-center items-center'>{quantity}</span>
                  <button className='bg-gray-200 h-10 w-10 font-bold text-xl rounded-full flex justify-center items-center transition-colors hover:bg-gray-300' onClick={handlePlusQuantity}>+</button>
                </div>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-md font-semibold hover:bg-blue-600 flex items-center justify-center w-full gap-2 transition-colors" onClick={handleAddToCart}>
                  <img src={iconShopping} alt="Keranjang" className="w-6 h-6" />
                  <span>Keranjang</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Detail;
