<template>
  <q-header unelevated class="bg-white text-black">
    <q-toolbar class="border-bottom q-py-md semantic-wrap">
      <q-toolbar-title>
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

      <!-- 로그인 상태가 아닌 경우 -->
      <div v-if="!isAuthState">
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
      <!-- 로그인 상태 -->
      <div v-else>
        <q-btn flat :ripple="false" dense>
          <q-avatar class="shadow-3">
            <img :src="serviceUser.profileImage" alt="profile image" />
          </q-avatar>
          <q-menu :offset="[-10, -10]" class="border">
            <q-list>
              <q-item
                @click="$router.push('/user/mypage')"
                clickable
                dense
                class="items-center"
              >
                <q-icon name="sym_o_person" class="q-mr-sm" color="teal" />
                MY PAGE
              </q-item>
              <q-separator color="grey-14"></q-separator>
              <q-item @click="logout" clickable dense class="items-center">
                <q-icon name="sym_o_logout" class="q-mr-sm" color="red" />
                LOGOUT
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
const props = defineProps({
  serviceUser: {
    type: Object,
    required: true,
  },
  isAuthState: {
    type: Boolean,
    default: () => false,
  },
  logout: {
    type: Function,
  },
});
</script>

<style scoped></style>
