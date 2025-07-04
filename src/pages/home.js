import React, { memo } from 'react';
import { products } from '../dataSample/products';
import ProductCart from '../components/productCart';

const Home = memo(() => {
  return (
    <div>
      <h1 className='text-3xl my-5'>PRODUCT LIST</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {products.map((product) => (
          <ProductCart key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
});

export default Home;