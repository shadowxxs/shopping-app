import React, { useState } from 'react'
import iconShopping from '../assets/images/iconShopping.png';
import OrderDetailModal from './orderDetailModal';

const History = ({ order, onEdit, onDelete, onDeleteAll}) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
     <div className='p-4 rounded-lg bg-gray-400 shadow mb-3'>
              <div className='flex justify-between items-center'>
              <div className='flex items-center justify-center gap-1'>
                <img src={iconShopping} alt='' className='w-10 h-10 ' /> Belanja 
              <p className='text-xl font-semibold'> order id: {order.id}</p>
              </div>
              <p> Tanggal: {order.tanggal}</p>
              </div>
              <ul className='p-2'>
                {order.items.length > 0 && (
                  <>
                  <li className='text-xl text-semibold flex items-center gap-2'>
                 <img src={order.items[0].image} alt={order.items[0].name} className='w-24' /> {order.items[0].name} {order.items[0].quantity} barang x Rp. {order.items[0].price.toLocaleString()}
                  </li>
                  {order.items.length > 1 && (
                    <li className='text-sm text-gray-600'>
                      + {order.items.length - 1} produk lainnya
                    </li>
                    )}
                  </>
                )}
              </ul>
              <div className='flex justify-between items-center'>
              <p>Total Belanja: Rp.{order.total.toLocaleString() }</p>
              <div className='mt-2 flex gap-6'> 
                <button onClick={() => setShowDetail(true)} className='hover:underline' >Detail</button>
                <button onClick={() => onDelete(order.id)} className='hover:und'>Hapus</button>
                </div>
                </div>
                {showDetail && (
                  <OrderDetailModal
                    order={order}
                    onClose={() => setShowDetail(false)}
                    onUpdate={(updatedOrder) => {
                      onEdit(updatedOrder);
                      setShowDetail(false);
                    
                    }}
                    onDelete={() => {
                      onDelete(order.id);
                    setShowDetail(false);
                    }}
                    />
                  )}
            </div>
  );
};
export default History

// {item.name} {item.quantity} barang x Rp. {item.price.toLocaleString()}