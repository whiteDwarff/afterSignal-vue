<template>
  <q-card flat>
    <UserMarkupTable :list />
    <q-card-section>
      <BasePagination v-model:page="page" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useServiceUserStore } from 'src/stores/serviceUserStore';

const userStore = useServiceUserStore();
const { serviceUser } = storeToRefs(userStore);

const props = defineProps({
  viewMode: {
    type: String,
  },
});

// 페이지네이션
const page = ref({
  current: 1,
});
// 적립금 목록
const list = ref([]);

// 적립금 목록 조회
const selectDepositList = async () => {
  isLoadingState.value = true;
  try {
    const { data } = await api.post('/user/depositList', {
      view: props.viewMode,
      ...page.value,
      ...serviceUser.value,
    });
    if (data.status == 200) {
      page.value = data.result.page;
      list.value = data.result.list;
    } else {
      baseNotify('목록 조회에 실패하였습니다.');
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
selectDepositList();
</script>
