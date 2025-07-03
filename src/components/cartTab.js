import React, { useContext, } from 'react'
import {  getOrder, saveOrder } from '../storage/storage';
import { CartContext } from '../context/cartContext';
import { useNavigate } from 'react-router-dom';
import { getDate } from '../utils/date';




const CartTab = ({isOpen, onClose, onOrderComplete}) => {
  const {cartItems, clearCart, totalPrice, updateQuantity} = useContext(CartContext);
  const navigate = useNavigate();
  const today = getDate();

  const handleBackToShopping = () => {
    onClose();
    navigate('/');
  }
  


  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Keranjang kosong!');
      return;
    }
    const orders = getOrder();
    const newOrder = {
      id:Date.now(),
      tanggal: today,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      
    };
  saveOrder([...orders, newOrder]);
  clearCart();
  if (onOrderComplete) onOrderComplete();
  alert('Pesanan berhasil dibuat!');

  };
  const handleMinusQuantity = (id, currentQty) => {
    if (currentQty - 1 <= 0) {
      updateQuantity(id, 0);
      alert('Barang telah dihapus dari keranjang');
    } else {
      updateQuantity(id, currentQty - 1);
    }
    
};
  
  const handlePlusQuantity = (id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  };



  return (


    <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className='flex items-center justify-between text-white p-2'>
      <h2 className='p-5 text-white text-2xl'> Keranjang</h2>
      <p>{today}</p>
      </div>
      <div className='p-5 space-y-2 overflow-y-auto'>
    {      cartItems.length === 0 ? (
        <p className='text-white text-center' >Keranjang kosong</p>
          
        ) : (
        cartItems.map((item) => (
          <div key={item.id} className='flex justify-between items-center text-white bg-gray-600 p-2 rounded'>
            <img src={item.image} alt={item.name} className='w-10 h-10'/>
            <div className='flex-1 p-4'>
              <p>{item.name}</p>
              <p>Rp.{(item.price * item.quantity).toLocaleString()}</p>
              </div>
              <div className='flex  justify-between gap-2 '>
                <button className='bg-gray-400 text-black h-6 w-6 rounded-full ' onClick={() => handleMinusQuantity(item.id, item.quantity)}>-</button>
                <span>{item.quantity}</span>
                <button className='bg-gray-400 text-black h-6 w-6 rounded-full'onClick={() => handlePlusQuantity(item.id, item.quantity)}>+</button>
                </div>
                </div>
        ))
      )}
      { cartItems.length > 0 && (
        <p className='text-white font-bold'>Total Semua: Rp.{totalPrice.toLocaleString()}</p>
      )}
      </div>
      <button className='p-2 m-5 text-white text-right hover:underline' onClick={clearCart}>Hapus semua pesanan</button>
      <div className='grid grid-cols-2 gap-1 p-2'>
        <button className='bg-red-500 p-2 rounded-xl text-sm hover:opacity-50' onClick={handleBackToShopping}>Kembali Belanja</button>
        <button className='bg-gray-300 p-2 rounded-xl text-sm hover:opacity-50' onClick={handleCheckout}>Pesan Sekarang</button>
      </div>
    </div>
  )
}
export default CartTab