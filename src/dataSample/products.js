import productsData from './products.json';
import rog from '../assets/images/rog.jpg';
import chair from '../assets/images/chair.jpg';
import pc from '../assets/images/pc.jpg';

const imageMap = {
  'rog.jpg': rog,
  'chair.jpg': chair,
  'pc.jpg': pc,
};

export const products = productsData.map(product => ({
  ...product,
  image: imageMap[product.image],
}));

export default products;