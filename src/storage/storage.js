export const getCart = () => {
  try {
    const data = sessionStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to parse cart data from sessionStorage:", error);
    return [];
  }
};

export const saveCart = (cartItems) => {
  try {
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to save cart data to sessionStorage:", error);
  }
};

export const clearCart = () => {
  sessionStorage.removeItem('cart');
};

export const getOrder = () => {
  try {
    const data = sessionStorage.getItem('order');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to parse order data from sessionStorage:", error);
    return [];
  }
};

export const saveOrder = (orderItems) => {
  try {
    sessionStorage.setItem('order', JSON.stringify(orderItems));
  } catch (error) {
    console.error("Failed to save order data to sessionStorage:", error);
  }
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