import { defineStore } from 'pinia';
import { useLocalStorage, StorageSerializers } from '@vueuse/core'; // vueuse
import { useRouter } from 'vue-router';
import { baseNotify } from 'src/utils/base-notify';

export const useServiceUserStore = defineStore('serviceUser', () => {
  // 로그인 상태를 담는 객체 login: true, logout : false
  const isAuthState = computed(() => !!serviceUser.value.seq);
  // 사용자의 seq를 반환
  const getUserSeq = computed(() => serviceUser.value.seq);

  const router = useRouter();

  /**
   * @vueuse
   * @doc :https://vueuse.org/
   * @install : npm i @vueuse/core
   * ---------------------------------
   * @summary
   * - useLocalStorage( key, defaultValue, options )
   * - serializer: StorageSerializers.object : Object -> String Type으로 형변환 ( 반응형 ref 객체 )
   */
  const serviceUser = useLocalStorage(
    // LocalStorage에 저장될 key
    'service/user',
    // Default Value
    {
      seq: null,
      grade: 'COM0000001',
    },
    {
      serializer: StorageSerializers.object,
    },
  );

  // 서비스 사용자 정보 셋팅
  const setUser = (data = null) => {
    if (data) {
      serviceUser.value = { ...data };
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

    setUser();
    baseNotify('로그아웃 되었습니다.');
    router.push('/');
  };
  return {
    isAuthState,
    getUserSeq,
    serviceUser,
    setUser,
    logout,
  };
});
