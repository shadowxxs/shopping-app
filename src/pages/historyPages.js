import React, { useCallback, useEffect, useState } from 'react'
import { getOrder, removeOrder } from '../storage/storage';
import History from '../components/history';
import { useOutletContext } from 'react-router-dom';

const HistoryPages = () => {
  const [orders, setOrders] = useState([]);
  const { updateHistoryCount } = useOutletContext();

  const refreshOrders = useCallback(() => {
    const updatedOrders = getOrder();
    setOrders(updatedOrders);
    if (updateHistoryCount) updateHistoryCount(updatedOrders.length);
  }, [updateHistoryCount]);

  useEffect(() => {
   refreshOrders();
  },[refreshOrders]);
  
  const handleDeleteOrder = useCallback((id) => {
    const updated = removeOrder(id);
    setOrders(updated);
    if (updateHistoryCount) updateHistoryCount(updated.length);
    alert(`Order ${id} berhasil dihapus`);
  }, [updateHistoryCount]);

  const handleUpdateOrder = useCallback(() => {
    refreshOrders();
  }, [refreshOrders]);

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-2xl sm:text-3xl font-bold my-5'>Order History</h1>
      {orders.length === 0 ? (
        <p className="text-center text-black">Belum memiliki pesanan</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <History
              key={order.id}
              order={order}
              onEdit={handleUpdateOrder}
              onDelete={handleDeleteOrder}
            />
          ))}
        </div>
      )}
    </div>
  )
}


export default HistoryPages


