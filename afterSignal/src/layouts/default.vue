<template>
  <q-layout view="lHh Lpr lff" class="bg-white">
    <DefaultHeader />

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
const systemStore = useSystemStore();
const { isLoadingState } = storeToRefs(systemStore);

const route = useRoute();

const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || '1310px',
  margin: '0 auto',
}));
</script>

<style src="src/css/common.css"></style>
<style src="src/css/default.css"></style>
