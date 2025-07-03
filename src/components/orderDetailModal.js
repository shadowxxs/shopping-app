import React, { useState } from 'react'
import { getOrder, removeOrder, saveOrder } from '../storage/storage';
import { motion } from 'framer-motion';
import close from '../assets/images/close.png';
import ProductMiniModal from './productMiniModal';


const OrderDetailModal = ({ order, onClose, onOrderUpdate}) => {

  const [currentOrder, setCurrentOrder] = useState(order);
  const [originalOrder] = useState(order);
  const [showProductModal, setShowProductModal] = useState(false);

  const recalculateTotal = (items) => items.reduce((sum, item) => sum + item.price * item.quantity,0);


  const saveAndUpdate = (updatedOrder) => {
    const orders = getOrder();
    const updatedOrders = orders.map(order => order.id === updatedOrder.id ? updatedOrder : order);
    saveOrder(updatedOrders);
    setCurrentOrder(updatedOrder);
    if (onOrderUpdate) onOrderUpdate(updatedOrder);
  };

  const updateQuantity = (id, newQuantity) => {
const items =  currentOrder.items.map(item => item.id === id ? { ...item, quantity: newQuantity} : item).filter(item => item.quantity > 0);

const updatedOrder = { ...currentOrder, items, total: recalculateTotal(items)};
setCurrentOrder(updatedOrder);;

if (items.length === 0){
  handleDeleteOrder();
}
  };

const handleMinusQuantity = (id, currentQty) => {
  updateQuantity(id, Math.max(0, currentQty - 1));
};

const handlePlusQuantity = (id, currentQty) => {
  updateQuantity(id, currentQty + 1);
};

  const handleRemoveItem = (id) => {
    const items = currentOrder.items.filter(item => item.id !== id);
    const updatedOrder = {
      ...currentOrder,
      items, total: recalculateTotal(items)
    };
    setCurrentOrder(updatedOrder)
    if (items.length === 0) {
      handleDeleteOrder();
    }
  };

  const handleDeleteOrder = () => {
    removeOrder(currentOrder.id)
    alert(`Order ${currentOrder.id} berhasil dihapus`);
    onClose();
  };



  const handleAddProduct = (newItems) => {
    let items = [...currentOrder.items];
    newItems.forEach((newItem) =>{
    const exist = items.find((item) => item.id === newItem.id);
    if (exist) {
      exist.quantity += newItem.quantity;
    } else {
      items.push(newItem);
    }
  }
);
    const updatedOrder = {
      ...currentOrder,
      items, total: recalculateTotal(items)
    };
     setCurrentOrder(updatedOrder)
  }

  const handleCancel = () => {
    setCurrentOrder(originalOrder);
    onClose();
  };

  const handleSave = () => {
    saveAndUpdate(currentOrder);
    alert("Perubahan berhasil disimpan");
    onClose();
  }


  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{duration: 0.3}}
    className ="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className='bg-white rounded-xl p-5 w-full max-w-lg shadow-lg relative'>
        <button onClick={handleCancel}>
          <img src={close} alt="close" className="w-6" />
        </button>

        <h2 className='text-2xl font-bold mb-2'>Detail Order</h2>
        <p>Order ID: {currentOrder.id}</p>
        <div className='flex justify-between items-center'>
        <p>Tanggal: {currentOrder.tanggal}</p>
        <button 
            className="text-sm hover:text-red-500 "
            onClick={handleDeleteOrder}
          >
            Hapus Semua Order
          </button>
          </div>

        <div className='mt-4 space-y-3 max-h-64 overflow-y-auto'>
          {currentOrder.items.map((item) => (
            <div key={item.id} className='border rounded p-2 flex justify-between items-center'>
              <div>
                <img src={item.image} alt={item.name} className='w-16 h-16 object-cover' />
                <p className='font-semibold'>{item.name}</p>
                <p>Harga: Rp. {item.price.toLocaleString()}</p>
                <p>Jumlah: {item.quantity}</p>
                <p className='text-sm'>Rp.{(item.price * item.quantity).toLocaleString()}</p>
            </div>
             <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-2'>
                  <button
                    className='bg-gray-300 px-2 rounded hover:bg-gray-400'
                    onClick={() => handleMinusQuantity(item.id, item.quantity)}
                  >-</button>
                  <span>{item.quantity}</span>
                  <button
                    className='bg-gray-300 px-2 rounded hover:bg-gray-400'
                    onClick={() => handlePlusQuantity(item.id, item.quantity)}
                  >+</button>
                </div>
            <button className='text-sm   py-1  hover:text-red-500' onClick={() => handleRemoveItem(item.id)}>
              Hapus Item
            </button>
            </div>
            </div>
          ))}
          </div>
          <div className='flex items-center justify-between p-2'>
          <p className="font-bold mt-4">Total: Rp. {currentOrder.total.toLocaleString()}</p>
          <button
            className='bg-gray-400 p-2 rounded-lg text-white hover:bg-green-400 text-sm mt-5' onClick={() => setShowProductModal(true)}>
              Beli Lagi
            </button>
          </div>
          <div className='mt-4 flex gap-2'>
            
            
      <button 
       className="bg-red-500 p-2 rounded hover:bg-red-600 text-sm text-white"
       onClick={handleCancel}
       > Batal </button>
      <button 
      className="bg-green-500 p-2 rounded hover:bg-green-600 text-sm text-white"
      onClick={handleSave}>Simpan Perubahan</button>
          </div>

          {showProductModal && (
            <ProductMiniModal
            onAdd={(items) => {
              handleAddProduct(items);
              setShowProductModal(false);
            }}
            onClose={() => setShowProductModal(false)}
            />
          )}
        </div>
        </motion.div>
        );

      }


export default OrderDetailModal