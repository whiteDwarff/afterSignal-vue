<template>
  <q-card flat class="user-form-wrap q-py-xl">
    <q-form @submit.prevent="">
      <PageSubTitle title="Apply to Store" />

      <!-- tabs -->
      <q-tabs 
        v-model="tab"      
        active-color="deep-purple-3"
        indicator-color="deep-purple-3"
        class="q-pt-lg"
      >
        <q-tab name="store" label="Store Info" :ripple="false" class="cursor-pointer" />
        <q-tab name="owner" label="Owner Info" :ripple="false" class="cursor-pointer" />
      </q-tabs>

      <!-- tab panels -->
      <q-tab-panels 
        v-model="tab"
        animated
        :keep-alive="true"
      >
        <!-- <keep-alive> -->
        <q-tab-panel name="store">
          <ApplyStoreInfo 
            v-model="form"
            v-model:isSubmit="isSubmit"
            :options
            :changeDistrictByOptions
          />
        </q-tab-panel>
        <q-tab-panel name="owner">
          <ApplyOwnerInfo v-model="form" />
        </q-tab-panel>
        <!-- </keep-alive> -->
      </q-tab-panels>

      <q-card-section class="q-mt-md text-center">
        <q-btn
          @click="isSubmit = true"
          label="SUBMIT"
          type="submit"
          id="user-form-submit-btn"
          class="bg-red-2 text-white border"
        />
      </q-card-section>

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
              color="deep-purple-3"
              class="q-mr-sm"
            /> 
            <span class="underline-hover text-grey-8">PREV</span>
          </q-btn>
          <q-space/>
            <q-btn 
              v-if="tab == 'store'"
              @click="tab = 'owner'"
              :ripple="false"
              flat
            >
              <span class="underline-hover text-grey-8">NEXT</span>
              <q-icon 
                name="sym_o_line_end_arrow_notch"
                color="deep-purple-3"
                class="q-ml-sm" 
              />
          </q-btn>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
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
  ownerName: '',       
  businessNumber: '',   // 사업자등록번호
  businessFile: null,   // 사업자등록증
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

onMounted(() => {
  addBeforeunload();
  onBeforeUnmount(() => {
    removeBeforeunload();
  });
});
</script>