import { boot } from 'quasar/wrappers';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export default boot(({ app }) => {
  // axios
  app.config.globalProperties.$api = api;
  axios.defaults.withCredentials = true;

  // ReCaptcha
  app.use(VueReCaptcha, {
    //	siteKey: `${process.env.RECAPTCHA_KEY}`,
  });

  // error
  app.config.errorHandler = (err, instance, info) => {
    console.log('### app.config.errorHandler ###');
    console.log('err: ', err);
  };
});

export { axios, api };
