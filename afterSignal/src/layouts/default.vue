<template>
  <q-layout view="lHh Lpr lff" class="bg-white">
    <q-header unelevated class="bg-white text-black">
      <q-toolbar class="border-bottom q-py-md semantic-wrap">
        <q-toolbar-title>
          <!--  <q-avatar>LOGO</q-avatar> -->
          <router-link to="/" class="decoration-none text-black"
            >HEADER</router-link
          >
          <q-btn
            unelevated
            label="Menu1"
            class="text-weight-regular nav-item"
            :ripple="false"
          >
            <q-menu class="border">
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup dense>
                  <q-item-section class="text-weight-light"
                    >New tab</q-item-section
                  >
                </q-item>
                <q-separator class="bg-black" />
                <q-item clickable v-close-popup dense>
                  <q-item-section class="text-weight-light"
                    >New incognito tab</q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            unelevated
            label="Menu2"
            class="text-weight-regular nav-item"
            :ripple="false"
          >
            <q-menu class="border">
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup dense>
                  <q-item-section class="text-weight-light"
                    >New tab</q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar-title>

        <div class="">
          <router-link
            to="/user/signIn"
            class="decoration-none bg-black text-white q-py-sm q-px-md"
            style="border-radius: 20px"
            >LOGIN</router-link
          >
          <router-link
            to="/user/signUp"
            class="decoration-none text-black q-py-sm q-px-md border q-ml-sm"
            style="border-radius: 20px"
            >JOIN</router-link
          >
        </div>
      </q-toolbar>
    </q-header>

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
import { useSystemStore } from 'src/stores/systemStore';

const systemStore = useSystemStore();
const { isLoadingState } = storeToRefs(systemStore);

const route = useRoute();

const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || '1310px',
  margin: '0 auto',
}));
</script>

<style>
.semantic-wrap {
  max-width: 1280px;
  margin: 0 auto;
}
a {
  text-decoration: none;
}
.nav-item {
  transition: 0.4s ease 0s;
}
.nav-item:hover {
  color: #6d3f37;
}
/* 반응형 구현 */
.user-form-wrap {
  width: 60%;
  margin: 0 auto;
}
#user-form-submit-btn {
  width: 40%;
}

/* common */
/* :hover > background 제거 */
.q-focus-helper {
  display: none;
}
:deep(.q-focus-helper) {
  display: none;
}
/* input, select, textarea > default border color 변경 */
.q-field--outlined .q-field__control:before {
  border: 1px #868686 solid !important;
}
/* input focus 시 생기는 border 제거  */
.q-field__control {
  &::after {
    border: none !important;
  }
}

.border {
  border: 1px solid #868686;
}
.border-bottom {
  border-bottom: 1px solid #868686;
}

.bg-grey-86 {
  background-color: #868686;
}

.decoration-none {
  text-decoration: none;
}

/* @media */
@media screen and (max-width: 900px) {
  .user-form-wrap {
    width: 70%;
  }
  #user-form-submit-btn {
    width: 70%;
  }
}
@media screen and (max-width: 600px) {
  .user-form-wrap {
    width: 90%;
  }
  #user-form-submit-btn {
    width: 100%;
  }
}
</style>

<style scoped></style>
