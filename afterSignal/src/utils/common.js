import { useCookies } from '@vueuse/integrations/useCookies';

/**
 * 쿠키 저장
 * @param {string} cookieName - 브라우저에 저장될 쿠키명
 * @param {object} data - 쿠키에 저장될 정보
 * @param {string} path - 패스 경로 (default : /)
 */
export const setCookies = (cookieName, data, path = '/') => {
  // 쿠키의 저장시간을 한달로 설정
  const now = new Date();
  const expires = new Date(now.setMonth(now.getMonth() + 1));

  // 브라우저에 쿠키 저장
  useCookies().set(cookieName, data, {
    path,
    expires,
  });
};

/**
 * jwt 토큰을 쿠키에 저장
 * @param {string} token - 브라우저에 저장될 쿠키명
 * @param {string} path - 패스 경로 (default : /)
 */
export const setJwtCookies = (token, path = '/') => {
  useCookies().set('accessToken', token, {
    path,
    maxAge: 3600,
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
 * 문자열을 원화단위로 변환 후 반환
 * @param {string || number} value - 금액
 * @returns {string} 원화단위로 변경된 금액(세자리 콤마)
 */
export const localeToMoney = (value) => {
  value = Math.abs(value);
  if (value != null && value != undefined) return value.toLocaleString('ko-KR');
  else return;
};
