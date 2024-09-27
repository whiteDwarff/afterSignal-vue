import { boot } from 'quasar/wrappers';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import { useSystemStore } from 'src/stores/systemStore';
import { storeToRefs } from 'pinia';
import { getCookies } from 'src/utils/common';

import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// 쿠키에 저장된 accessToken이 있다면 request 요청 시 토큰을 보낸다.
api.interceptors.request.use((req) => {
  const jwt = getCookies('accessToken');
  if (jwt) req.headers.Authorization = jwt;
  return req;
});

// loading 상태 전역 등록
const systemStore = useSystemStore();
const { isLoadingState } = storeToRefs(systemStore);

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

export { axios, api, isLoadingState };
