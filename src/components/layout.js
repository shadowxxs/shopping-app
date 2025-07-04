import React, { useEffect, useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Detail from './detail';
import CartTab from './cartTab';
import Header from './header';
import { getOrder } from '../storage/storage';

const Layout = () => {
  const [cartTabOpen, setCartTabOpen] = useState(false);
  const [historyCount, setHistoryCount] = useState(getOrder().length);
  const location = useLocation();

  const updateHistoryCount = useCallback(() => {
    setHistoryCount(getOrder().length);
  }, []);

  const toggleCartTab = useCallback(() => {
    setCartTabOpen(prev => !prev);
  }, []);

  const closeCartTab = useCallback(() => {
    setCartTabOpen(false);
  }, []);

  useEffect(() => {
    if (location.pathname === '/history' || location.pathname === '/') {
      closeCartTab();
    }
  }, [location.pathname, closeCartTab]);

  return (
    <div className='bg-zinc-500'>
      <main className='max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5'>
        <Header
          onCartClick={toggleCartTab}
          historyCount={historyCount}
        />
        <Outlet context={{ updateHistoryCount }} />
      </main>
      <CartTab
        isOpen={cartTabOpen}
        onClose={closeCartTab}
        onOrderComplete={updateHistoryCount}
      />
      <Detail />
    </div>
  );
};

export default Layout;