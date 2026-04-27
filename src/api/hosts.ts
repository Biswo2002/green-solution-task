import { ENV } from '~/configs/env';

export const IS_PRODUCTION = true;
export type PaymentGatewayProvider = 'paytm';

const HOSTS = IS_PRODUCTION
  ? {
    MAIN: 'https://api.sportup.ai',
  }
  : {
    MAIN: 'https://416t8mbm-6060.inc1.devtunnels.ms',
  };

export default HOSTS;
export const DEEP_LINK_DOMAIN = IS_PRODUCTION ? 'www.sportup.ai' : 'www.sportup.ai';
export const DEEP_LINK_SCHEME = 'sportup';

/**
 * Paytm environment switch.
 * true  => staging
 * false => production
 */
export const PAYTM_IS_STAGING = true;

export const ACTIVE_PAYMENT_GATEWAY: PaymentGatewayProvider = 'paytm';

// export const OLA_API_KEY = ENV.OLA_API_KEY;
export const ONESIGNAL_KEY_API = ENV.ONESIGNAL_KEY;
export const LOCATION_IQ_API_KEY = ENV.LOCATION_IQ_API_KEY;