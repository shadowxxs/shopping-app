import React, { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import close from '../assets/images/close.png';
import products from '../dataSample/products.js';

const ProductMiniModal = memo(({ onAdd, onClose }) => {
  const [quantities, setQuantities] = useState({});

  const handleMinusQuantity = useCallback((id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));
  }, []);

  const handlePlusQuantity = useCallback((id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  }, []);

  const handleAddAll = useCallback(() => {
    const itemsToAdd = products
      .filter(product => (quantities[product.id] || 0) > 0)
      .map(product => ({
        ...product,
        quantity: quantities[product.id],
      }));

    if (itemsToAdd.length === 0) {
      alert("Pilih produknya terlebih dahulu");
      return;
    }

    onAdd(itemsToAdd);
    setQuantities({});
    onClose();
  }, [quantities, onAdd, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className='bg-white rounded-xl p-5 w-full max-w-lg shadow-lg relative'>
        <button onClick={onClose} className="absolute top-2 right-2">
          <img src={close} alt="close" className="w-6" />
        </button>
        <h2 className="text-xl font-bold mb-3">Tambah Produk</h2>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded p-2 flex justify-between items-center hover:bg-gray-100"
            >
              <div className='flex items-center gap-1'>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16"
                />
                <div className='flex flex-col'>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm">Rp. {product.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="bg-gray-300 px-2 rounded-lg hover:bg-gray-400"
                  onClick={() => handleMinusQuantity(product.id)}
                >-</button>
                <span>{quantities[product.id] || 0}</span>
                <button
                  className="bg-gray-300 px-2 rounded-lg hover:bg-gray-400"
                  onClick={() => handlePlusQuantity(product.id)}
                >+</button>
              </div>
            </div>
          ))}
        </div>
        <button
          className='bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-green-400 mt-3'
          onClick={handleAddAll}
        >
          Tambah Produk
        </button>
      </div>
    </motion.div>
  );
});

export default ProductMiniModal;