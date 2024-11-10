import { useCookies } from '@vueuse/integrations/useCookies';
import { onMounted, onBeforeUnmount } from 'vue';

/**
 * 쿠키 저장
 * @param {string} cookieName - 브라우저에 저장될 쿠키명
 * @param {object} data - 쿠키에 저장될 정보
 * @param {string} path - 패스 경로 (default : /)
 */
export const setCookies = (cookieName, data, path = '/') => {
  // 브라우저에 쿠키 저장
  useCookies().set(cookieName, data, {
    path,
    maxAge: 14 * 24 * 60 * 60, // 14일 유지
  });
};

/**
 * 쿠키에 저장된 정보 삭제
 * @param {string} cookieName - 쿠키명
 */
export const removeCookies = (cookieName) => {
  useCookies().remove(cookieName);
};

/**
 * 쿠키에 저장된 정보 조회
 * @param {string} cookieName - 쿠키명
 * @return {T || boolean}
 */
export const getCookies = (cookieName) => {
  return useCookies().get(cookieName) || false;
};

/**
 * 쿠키에 저장된 jwt토큰 유무 확인과 만료시간 5분전 검사
 * @param {string} cookieName
 * @return {boolean}
 */
export const isCookieValid = (cookieName) => {
  const token = useCookies().get(cookieName);
  // 쿠키가 없음
  if (!token) return false;
  try {
    // JWT 토큰의 Payload 추출
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Base64 디코딩 후 JSON 파싱
    const payload = JSON.parse(atob(base64));

    const currentTime = Math.floor(new Date().getTime() / 1000);
    // 5분을 초로 변환
    const timeBeforeExpiry = 5 * 60;

    // 만료 시간이 5분 이하로 남았는지 확인
    if (payload.exp - currentTime <= timeBeforeExpiry) return false; // 5분 이하 남았으면 유효하지 않음

    return true;
  } catch (error) {
    console.error('쿠키 파싱 중 오류 발생:', error);
    return false;
  }
};

/**
 * 문자열을 원화단위로 변환 후 반환
 * @param {string || number} value - 금액
 * @returns {string} 원화단위로 변경된 금액(세자리 콤마)
 */
export const localeToMoney = (value) => {
  value = Math.abs(value);
  if (value != null && value != undefined) return value.toLocaleString('ko-KR');
  else return;
};

// -----------------------------------------------------------
// form에 입렫된 값이 있다면 브라우저 닫기, 새로고침, 뒤로가기 이벤트 제어
const unLoadEvent = (e) => {
  e.preventDefault();
  e.returnValue = '';
};

export const addBeforeunload = () => {
  window.addEventListener('beforeunload', unLoadEvent);
};
export const removeBeforeunload = () => {
  window.removeEventListener('beforeunload', unLoadEvent);
};
