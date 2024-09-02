<template>
  <q-card flat>
    <div class="row">
      <q-card-section class="col-12 col-sm-3">
        <q-list class="border" style="border-bottom: none">
          <q-item
            v-for="item of view"
            :key="item.value"
            class="border-bottom cursor-pointer items-center"
          >
            <q-item-section @click="viewMode = item.value">
              {{ item.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class="col-12 col-sm-9">
        <component :is="userViewComponents[viewMode]" />
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
// defineAsyncComponent setup ---------------------------------------
const view = ref([
  { name: 'Profile', value: 'ProfileView' },
  { name: 'Password Update', value: 'PasswordUpdateView' },
  { name: 'Payment History', value: 'PayMentView' },
  { name: 'Point History', value: 'PointView' },
]);

const viewMode = ref('ProfileView');

// defineAsyncComponent 정의
const userViewComponents = {
  ProfileView: defineAsyncComponent(() =>
    import('./components/ProfileView.vue'),
  ),
  PasswordUpdateView: defineAsyncComponent(() =>
    import('./components/PasswordUpdateView.vue'),
  ),
  PayMentView: defineAsyncComponent(() =>
    import('./components/PayMentView.vue'),
  ),
  PointView: defineAsyncComponent(() => import('./components/PointView.vue')),
};
</script>

<style></style>
