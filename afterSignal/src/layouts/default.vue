<template>
  <q-layout view="lHh Lpr lff" class="bg-white">
    <q-header unelevated class="bg-white text-black">
      <q-toolbar :style="pageContainerStyles" class="border-bottom">
        <q-toolbar-title>
          <!--  <q-avatar>LOGO</q-avatar> -->
          HEADER
        </q-toolbar-title>

        <q-btn
          unelevated
          label="Basic Menu"
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
      </q-toolbar>
    </q-header>

    <q-page-container :style="pageContainerStyles">
      <q-page>
        <!-- router-view -->
        <router-view />
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>FOOTER</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <!-- <LoadingSpinner v-model="loadingState" /> -->
  </q-layout>
</template>

<script setup>
const route = useRouter();

const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || '1310px',
  margin: '0 auto',
}));
</script>

<style>
.nav-item {
  transition: 0.4s ease 0s;
}
.nav-item:hover {
  color: #6d3f37;
}

/* common */
/* :hover > background 제거 */
.q-focus-helper {
  display: none;
}
:deep(.q-focus-helper) {
  display: none;
}

.border {
  border: 1px solid #868686;
}
.border-bottom {
  border-bottom: 1px solid #868686;
}
</style>

<style scoped>
.q-toolbar__title {
  flex: none !important;
  margin-right: 50px;
}
</style>
