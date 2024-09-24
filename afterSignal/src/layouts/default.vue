<template>
  <q-layout view="lHh Lpr lff" class="bg-white">
    <DefaultHeader :serviceUser :isAuthState :logout="userService.logout" />
    <q-page-container :style="pageContainerStyles">
      <q-page>
        <!-- router-view -->
        <router-view />
      </q-page>
    </q-page-container>

    <q-footer unelevated class="bg-black">
      <q-toolbar class="q-py-lg semantic-wrap">
        <q-toolbar-title>
          <div>FOOTER</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <LoadingSpinner v-model="isLoadingState" />
  </q-layout>
</template>

<script setup>
import { useCookies } from '@vueuse/integrations/useCookies';

const systemStore = useSystemStore();
const { isLoadingState } = storeToRefs(systemStore);

const userService = useServiceUserStore();
const { serviceUser, isAuthState } = storeToRefs(userService);

const route = useRoute();

const cookie = useCookies();
const userStoredCookie = cookie.get('serviceUser');

// 쿠키에 저장된 사용자 정보가 있다면 로그인 상태로 변경
if (userStoredCookie) {
  userService.setUser(userStoredCookie);
}

const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || '1310px',
  margin: '0 auto',
}));
</script>

<style src="src/css/common.css"></style>
<style src="src/css/default.css"></style>
