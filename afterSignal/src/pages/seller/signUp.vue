<template>
  <q-card flat class="user-form-wrap q-py-xl">
    
    <PageSubTitle title="Apply to Store" />

    <!-- tabs -->
    <q-tabs v-model="tab">
      <q-tab name="store" label="Store Info" class="cursor-pointer" />
      <q-tab name="owner" label="Owner Info" class="cursor-pointer" />
    </q-tabs>

    <!-- tab panels -->
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="store">
        <ApplyStoreInfo 
          v-model="form"
          v-model:options="options"
          v-model:isSubmit="isSubmit"
          :changeDistrictByOptions
        />
      </q-tab-panel>
      <q-tab-panel name="owner">
      </q-tab-panel>
    </q-tab-panels>

    <q-separator class="q-my-lg" color="grey-10" inset />

    <q-card-section class="q-py-none">
      <div class="flex justify-between">
        <q-btn
          v-if="tab == 'owner'"
          @click="tab = 'store'"
          :ripple="false"
          flat
        >
          <q-icon
            name="sym_o_line_start_arrow_notch"
            color="teal"
            class="q-mr-sm"
          /> 
          <span class="underline-hover">PREV</span>
        </q-btn>
        <q-space/>
          <q-btn 
            v-if="tab == 'store'"
            @click="tab = 'owner'"
            :ripple="false"
            flat
          >
          <span class="underline-hover">NEXT</span>
          <q-icon 
            name="sym_o_line_end_arrow_notch"
            color="teal"
            class="q-ml-sm" 
          />
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useSystemStore } from 'src/stores/systemStore';
import { storeToRefs } from 'pinia';

const systemStore = useSystemStore();
const { isLoadingState } = storeToRefs(systemStore);

const tab = ref('store')

// input form
const form = ref({
  storeName: '',        // 매장명
  storeFirstTel: '02',  // 매장번호 앞자리
  storeOtherTel: '',    // 매장번호 뒷자리
  url: '',              // 자사 홈페이지, 네이버플레이스 url
  instagram: '',        // 인스타그램
  city: '',             // 지역
  district: '',         // 구
  postCode: '',         // 우편번호
  addr: '',             // 주소
  detailAddr: '',       // 상세주소
  extraAddr: '',        // 참고항목
});
// select options
const options = ref({});

const isSubmit = ref(false);

// 공통코드 조회
const getCommCode = async () => {
  isLoadingState.value = true;

  try {
    const { data } = await api.post('/user/signUp');
    options.value = { ...data.result };
    form.value.city = data.result.city[0].value;
    changeDistrictByOptions(form.value.city)
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
getCommCode();

const changeDistrictByOptions = (val) => {
  form.value.district = options.value[val][0].value;
  options.value.district = options.value[val];
};

</script>