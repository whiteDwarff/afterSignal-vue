<template>
  <q-card flat>
    <div class="row">
      <!-- nav -->
      <q-card-section
        id="sub-nav-section"
        class="col-12 col-sm-3"
        style="height: fit-content"
      >
        <q-list class="border" ref="subNavRefs" style="border-bottom: none">
          <q-item
            v-for="item of view"
            :key="item.value"
            class="border-bottom cursor-pointer items-center"
            :class="{ 'bg-deep-purple-2 text-white': viewMode == item.value }"
          >
            <q-item-section @click="viewMode = item.value">
              {{ item.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- component -->
      <q-card-section class="col-12 col-sm-9">
        <component :is="userViewComponents[viewMode]" :viewMode />
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
import { onMounted } from 'vue';
import { useElementSize } from '@vueuse/core';

const router = useRouter();
// defineAsyncComponent setup ---------------------------------------
const view = ref([
  { name: 'Profile', value: 'profile' },
  { name: 'Password Update', value: 'password' },
  { name: 'Payment History', value: 'amount' },
  { name: 'Point History', value: 'deposit' },
]);

// 새로고침 시 현제 페이지 유지하기
const viewMode = ref(useRoute().query?.view || 'profile');
// nav 클릭 시 router에 쿼리 추가
watch(viewMode, (newValue) => {
  router.push({
    query: { view: newValue },
  });
});

// defineAsyncComponent 정의
const userViewComponents = {
  profile: defineAsyncComponent(() => import('./components/ProfileView.vue')),
  password: defineAsyncComponent(() =>
    import('./components/PasswordUpdateView.vue'),
  ),
  amount: defineAsyncComponent(() => import('./components/PayMentView.vue')),
  deposit: defineAsyncComponent(() => import('./components/PayMentView.vue')),
};
</script>

<style>
#sub-nav-section {
  position: sticky;
  top: 69.69px;
  left: 0;
}
@media screen and (max-width: 600px) {
  #sub-nav-section {
    position: unset;
  }
}
</style>

<route lang="yaml">
meta:
  width: '1100px'
  requiresAuth: true
  guard: 'service'
</route>
