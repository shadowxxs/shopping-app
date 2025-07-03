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
  
  const handleDeleteOrder = (id) => {

    const updated = removeOrder(id);
    setOrders(updated);
    if (updateHistoryCount) updateHistoryCount(updated.length);
    alert(`Order ${id} berhasil dihapus`)
  };

  const handleUpdateOrder = () => {
    refreshOrders()
  };

  return (
    <div>
      <h1 className='text-3xl my-5'>Order History</h1>
      {orders.length === 0 ? (
        <p>Belum memiliki pesanan</p>) : (
          orders.map(order => (
            <History 
            key={order.id}
            order={order}
            onEdit={handleUpdateOrder}
            onDelete={handleDeleteOrder} />
          )))}
    </div>
  )
}


export default HistoryPages

