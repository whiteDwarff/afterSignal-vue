import { defineStore } from 'pinia';
import { useStorage, StorageSerializers } from '@vueuse/core';

import { useRouter } from 'vue-router';

import { baseNotify } from 'src/utils/base-notify';
import { removeCookies } from 'src/utils/common';

export const useServiceUserStore = defineStore('serviceUser', () => {
  // 로그인 상태를 담는 객체 login: true, logout : false
  const isAuthState = computed(() => !!serviceUser.value.seq);
  // 사용자의 seq를 반환
  const getUserSeq = computed(() => serviceUser.value.seq);

  /**
   * @doc   https://vueuse.org/core/useStorage/
   * @param {string} name - 스토리지에 저장될 이름
   * @param {T} name - 저장할 값
   * @param {string} storage - 저장소 (default : localStorage)
   * @param {object} serializer - 직렬화 (JSON.stringify() <> JSON.parse()를 실시간으로 ref 객체로 변환)
   */
  const serviceUser = useStorage(
    'service/user',
    {
      seq: null,
      grade: 'COM0000001',
    },
    sessionStorage,
    {
      serializer: StorageSerializers.object,
    },
  );

  // 서비스 사용자 정보 셋팅
  const setUser = (data = null) => {
    if (data) {
      serviceUser.value = { ...data };
      if (!data.profileImage) {
        serviceUser.value.profileImage =
          '/src/assets/common/profile_default.png';
      } else {
        serviceUser.value.profileImage =
          process.env.SERVER_PORT + data.profileImage;
      }
    } else {
      serviceUser.value = {
        seq: null,
        grade: 'COM0000001',
      };
    }
  };
  // 서비스 사용자 로그아웃
  const logout = () => {
    if (!confirm('로그아웃 하시겠습니까?')) return;
    // 사용자 정보 초기화
    setUser();
    // 저장된 쿠키가 있다면 삭제
    removeCookies('serviceUser');
    baseNotify('로그아웃 되었습니다.');
    useRouter().push('/');
  };
  return {
    isAuthState,
    getUserSeq,
    serviceUser,
    setUser,
    logout,
  };
});
