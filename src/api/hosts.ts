export const IS_PRODUCTION = true;

const HOSTS = IS_PRODUCTION
  ? {
      MAIN: 'https://dummyjson.com/products?limit=100',
    }
  : {
      MAIN: 'https://416t8mbm-6060.inc1.devtunnels.ms',
    };

export default HOSTS;
