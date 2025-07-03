export const getCart = () => {
  const data = sessionStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
};
export const saveCart = (cartItems) => {
  sessionStorage.setItem('cart', JSON.stringify(cartItems));
};

export const clearCart = () => { 
  sessionStorage.removeItem('cart');
};

export const getOrder = () => {
  const data = sessionStorage.getItem('order');
  return data ? JSON.parse(data) : [];
};

export const saveOrder = (orderItems) => {
  sessionStorage.setItem('order', JSON.stringify(orderItems));
};

export const clearOrder = () => {
  sessionStorage.removeItem('order');
};

export const removeOrder = (id) => {
  const orders = getOrder();
  const updatedOrders = orders.filter(order => order.id !== id);
  saveOrder(updatedOrders);
  return updatedOrders;
};