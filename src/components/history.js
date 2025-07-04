import React, { useState, memo } from 'react';
import iconShopping from '../assets/images/iconShopping.png';
import OrderDetailModal from './orderDetailModal';

const History = memo(({ order, onEdit, onDelete }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className='p-4 rounded-lg bg-white shadow-md mb-4 border border-gray-200'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
        <div className='flex items-center gap-3 mb-2 sm:mb-0'>
          <img src={iconShopping} alt='Shopping' className='w-8 h-8' />
          <div>
            <p className='text-sm text-gray-600'>Order ID: {order.id}</p>
            <p className='text-xs text-gray-500'>Tanggal: {order.tanggal}</p>
          </div>
        </div>
        <p className='font-semibold text-lg'>Total: Rp.{order.total.toLocaleString()}</p>
      </div>
      <ul className='space-y-3'>
        {order.items.map((item, index) => (
          <li key={index} className='flex items-center gap-4 p-2 bg-gray-50 rounded-lg'>
            <img src={item.image} alt={item.name} className='w-16 h-16 rounded-md' />
            <div className='flex-1'>
              <p className='font-semibold'>{item.name}</p>
              <p className='text-sm text-gray-600'>{item.quantity} barang x Rp. {item.price.toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className='mt-4 flex justify-end gap-4'>
        <button onClick={() => setShowDetail(true)} className='text-blue-500 hover:underline'>Detail</button>
        <button onClick={() => onDelete(order.id)} className='text-red-500 hover:underline'>Hapus</button>
      </div>
      {showDetail && (
        <OrderDetailModal
          order={order}
          onClose={() => setShowDetail(false)}
          onOrderUpdate={(updatedOrder) => {
            onEdit(updatedOrder);
            setShowDetail(false);
          }}
        />
      )}
    </div>
  );
});

export default History;