// import { storeToRefs } from 'pinia';
import { boot } from 'quasar/wrappers';
import { baseNotify } from 'src/utils/base-notify';
import { getCookies } from 'src/utils/common';

/**
 *
 * @param {string} to - 대상 Route 객체로 이동
 * @param {*} from - 현재 Route로 오기전 Route
 * @returns
 */
function requiresAuth(to, from) {
  // 서비스 사용자
  const serviceUserStore = useServiceUserStore();
  const { isAuthState } = storeToRefs(serviceUserStore);
  /*
    to.matched : 접근할 URL과 router에 매칭된 모든 값을 배열로 가지고 있는 속성
  */
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 서비스 사용자
    if (
      to.meta.guard == 'service' &&
      !isAuthState.value &&
      !getCookies('serviceUser')
    ) {
      baseNotify('로그인 후 이용해주세요');
      return '/user/signIn';
    }
  }
  // 로그인 상태에서 signIn, signUp 경로로 이동한다면 이전 페이지로 설정
  if (
    isAuthState.value &&
    (to.name == '/user/signIn' || to.name == '/user/signUp')
  ) {
    baseNotify('로그인 상태에서 접근할 수 없습니다.');
    return from.fullPath;
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
        guard: 유저별 설정
    </route>
*
*  로그인 상태가 아니거나 route.meta.requiresAuth가 true라면 navigation guard 설정
 */
