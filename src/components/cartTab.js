import React, { useContext, useCallback, useMemo, memo } from 'react';
import { getOrder, saveOrder } from '../storage/storage';
import { CartContext } from '../context/cartContext';
import { useNavigate } from 'react-router-dom';
import { getDate } from '../utils/date';

const CartTab = memo(({ isOpen, onClose, onOrderComplete }) => {
  const { cartItems, clearCart, totalPrice, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const today = useMemo(() => getDate(), []);

  const handleBackToShopping = useCallback(() => {
    onClose();
    navigate('/');
  }, [onClose, navigate]);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      alert('Keranjang kosong!');
      return;
    }
    const orders = getOrder();
    const newOrder = {
      id: Date.now(),
      tanggal: today,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
    saveOrder([...orders, newOrder]);
    clearCart();
    if (onOrderComplete) onOrderComplete();
    alert('Pesanan berhasil dibuat!');
  }, [cartItems, today, clearCart, onOrderComplete]);

  const handleMinusQuantity = useCallback((id, currentQty) => {
    if (currentQty - 1 <= 0) {
      updateQuantity(id, 0);
      alert('Barang telah dihapus dari keranjang');
    } else {
      updateQuantity(id, currentQty - 1);
    }
  }, [updateQuantity]);

  const handlePlusQuantity = useCallback((id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  }, [updateQuantity]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-full sm:w-96 h-full grid grid-rows-[auto_1fr_auto] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}
      >
        <div className='flex items-center justify-between text-white p-2 border-b border-gray-600'>
          <h2 className='p-5 text-white text-2xl font-semibold'>Keranjang</h2>
          <p className='text-sm'>{today}</p>
        </div>
        <div className='p-5 space-y-4 overflow-y-auto'>
          {cartItems.length === 0 ? (
            <p className='text-white text-center py-10'>Keranjang kosong</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className='flex items-center text-white bg-gray-600 p-3 rounded-lg'>
                <img src={item.image} alt={item.name} className='w-16 h-16 rounded-md mr-4' />
                <div className='flex-1'>
                  <p className='font-semibold'>{item.name}</p>
                  <p className='text-sm'>Rp.{(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <div className='flex items-center gap-3'>
                  <button className='bg-gray-500 text-white h-8 w-8 rounded-full flex items-center justify-center text-lg' onClick={() => handleMinusQuantity(item.id, item.quantity)}>-</button>
                  <span className='font-bold text-lg'>{item.quantity}</span>
                  <button className='bg-gray-500 text-white h-8 w-8 rounded-full flex items-center justify-center text-lg' onClick={() => handlePlusQuantity(item.id, item.quantity)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className='p-5 border-t border-gray-600 space-y-4'>
          {cartItems.length > 0 && (
            <div className='flex justify-between items-center text-white font-bold text-lg'>
              <span>Total Semua:</span>
              <span>Rp.{totalPrice.toLocaleString()}</span>
            </div>
          )}
          <button className='w-full py-2 text-white text-center hover:underline' onClick={clearCart}>Hapus semua pesanan</button>
          <div className='grid grid-cols-2 gap-4'>
            <button className='bg-red-500 py-3 rounded-xl text-white font-semibold hover:bg-red-600 transition-colors' onClick={handleBackToShopping}>Kembali Belanja</button>
            <button className='bg-green-500 py-3 rounded-xl text-white font-semibold hover:bg-green-600 transition-colors' onClick={handleCheckout}>Pesan Sekarang</button>
          </div>
        </div>
      </div>
    </>
  );
});

export default CartTab;