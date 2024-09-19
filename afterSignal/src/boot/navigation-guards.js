// import { storeToRefs } from 'pinia';
import { boot } from 'quasar/wrappers';
import { baseNotify } from 'src/utils/base-notify';

function requiresAuth(to) {
  // 서비스 사용자
  const serviceUserStore = useServiceUserStore();
  const { isAuthState: serviceUserState } = storeToRefs(serviceUserStore);
  /*
    to.matched : 접근할 URL과 router에 매칭된 모든 값을 배열로 가지고 있는 속성
    some       : 배열에서 하나라도 만족하는 값이 있다면 true 반환
  */
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.meta.guard == 'service' && !serviceUserState.value) {
      baseNotify('로그인 후 이용해주세요');
      return '/';
    }
  }
}

export default boot(async ({ app, router }) => {
  router.beforeEach(requiresAuth);
});

/**
 * navigation guard를 설정할 컴포넌트에 'route meta' 속성 정의
    <route lang="yaml">
      meta:
        requiresAuth: true
    </route>
*
*  로그인 상태가 아니거나 route.meta.requiresAuth가 true라면 navigation guard 설정
 */
