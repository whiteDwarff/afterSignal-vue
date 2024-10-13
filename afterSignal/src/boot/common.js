import { boot } from 'quasar/wrappers';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import { useSystemStore } from 'src/stores/systemStore';
import { useServiceUserStore } from 'src/stores/serviceUserStore';
import { storeToRefs } from 'pinia';
import {
  getCookies,
  setCookies,
  removeCookies,
  isCookieValid,
} from 'src/utils/common';


import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// loading 상태 전역 등록
const systemStore = useSystemStore();
const { isLoadingState } = storeToRefs(systemStore);

const serviceUserStore = useServiceUserStore();
const { isAuthState, serviceUser } = storeToRefs(serviceUserStore);

export default boot(({ app, router }) => {
  // axios
  app.config.globalProperties.$api = api;
  axios.defaults.withCredentials = true;

  // 쿠키에 저장된 accessToken이 있다면 request 요청 시 토큰을 보낸다.
  api.interceptors.request.use((req) => {
    const cookieName = 'accessToken';
    const accessToken = getCookies(cookieName);
    const validJwtToken = isCookieValid(cookieName);

    if (accessToken) req.headers.Authorization = accessToken;

    return req;
  });

  // jwt 토큰의 유효시간이 지났다면 재발급한 jwt 토큰을 쿠키에 저장한다.
  api.interceptors.response.use(
    (res) => {
      const newAccessToken = res.headers['access-token'];

      if (newAccessToken) setCookies('accessToken', newAccessToken);

      return res;
    },
    (err) => {
      if (err.status === 401) {
        baseNotify(err.response.data.message, { type: 'warning' });
        // 로그인 뷰 이동
        router.push('/user/signIn');
        // 저장된 쿠키 삭제
        removeCookies('accessToken');
        removeCookies('serviceUser');
        // 사용자 정보 초기화
        serviceUserStore.setUser();
      }
    },
  );

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

export { 
  axios, 
  api, 
  isLoadingState,
};
