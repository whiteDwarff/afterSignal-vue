<template>
  <q-card flat class="user-form-wrap q-py-xl">
    <q-form @submit.prevent>
      <PageSubTitle title="Apply to Store" />

      <!-- tabs -->
      <q-tabs
        v-model="tab"
        active-color="deep-purple-3"
        indicator-color="deep-purple-3"
        class="q-pt-lg"
      >
        <q-tab
          name="store"
          label="Store Info"
          :ripple="false"
          class="cursor-pointer"
        />
        <q-tab
          name="owner"
          label="Owner Info"
          :ripple="false"
          class="cursor-pointer"
        />
      </q-tabs>

      <!-- tab panels -->
      <q-tab-panels v-model="tab" animated :keep-alive="true">
        <q-tab-panel name="store">
          <ApplyStoreInfo
            v-model="form"
            v-model:tab="tab"
            :options
            :changeDistrictByOptions
            @upload-error="error"
            @upload-success="success($event)"
            ref="refChild"
          />
        </q-tab-panel>
        <q-tab-panel name="owner">
          <ApplyOwnerInfo v-model="form" />
        </q-tab-panel>
      </q-tab-panels>

      <q-card-section class="q-mt-md text-center">
        <q-btn
          @click="submit"
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
            <span class="underline-hover text-grey-7">PREV</span>
          </q-btn>
          <q-space />
          <q-btn
            v-if="tab == 'store'"
            @click="tab = 'owner'"
            :ripple="false"
            flat
          >
            <span class="underline-hover text-grey-7">NEXT</span>
            <q-icon
              name="sym_o_line_end_arrow_notch"
              color="deep-purple-3"
              class="q-ml-sm"
            />
          </q-btn>
        </div>
      </q-card-section>
      <q-btn label="aaaa" @click="callTestFunction" />
    </q-form>
  </q-card>
</template>

<script setup>
import { provide } from 'vue';

const route = useRoute();
const router = useRouter();

const tab = ref('store');

// input form
const form = ref({
  storeName: '', // 매장명
  storeFirstTel: '02', // 매장번호 앞자리
  storeOtherTel: '', // 매장번호 뒷자리
  url: '', // 자사 홈페이지, 네이버플레이스 url
  instagram: '', // 인스타그램
  city: '', // 지역
  district: '', // 구
  postCode: '', // 우편번호
  addr: '', // 주소
  detailAddr: '', // 상세주소
  extraAddr: '', // 참고항목
  ownerName: '',
  email: '', // 이메일
  checkedEmail: '',
  isEmailCheck: false,
  password: '', // 비밀번호
  passwordConfirm: '', // 비밀번호 확인
  firstTel: '010',
  otherTel: '',
  businessNumber: '', // 사업자등록번호
  businessRegistration: null, // 사업자등록증
});
// select options
const options = ref({});

// Drop event trigger
const isSubmitState = ref(false);
// DropZone.vue > provide
provide('isSubmitState', isSubmitState);

// 공통코드 조회
const getCommCode = async () => {
  try {
    isLoadingState.value = true;
    const { data } = await api.post('/user/signUp');
    options.value = { ...data.result };
    form.value.city = data.result.city[0].value;
    changeDistrictByOptions(form.value.city);
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

const submit = () => {
  if (
    // store valid
    form.value.storeName == '' ||
    form.value.storeOtherTel == '' ||
    form.value.url == '' ||
    form.value.postCode == ''
  ) {
    tab.value = 'store';
    return;
  } else if (
    // owner valid
    form.value.ownerName == '' ||
    form.value.businessNumber == '' ||
    form.email == '' ||
    form.value.password == '' ||
    form.value.passwordConfirm == '' ||
    form.isEmailCheck == false ||
    form.value.businessRegistration == null
  ) {
    tab.value = 'owner';
    // 이메일 중복검사 미실시
    if (!form.value.isEmailCheck)
      return baseNotify('이메일 중복검사를 해주세요.', {
        type: 'warning',
      });
    // 사업자 등록증 미첨부
    if (!form.value.businessRegistration)
      return baseNotify('사업자등록증을 첨부해주세요.', {
        type: 'warning',
      });
  }
  isSubmitState.value = true;
};

// 성공 시 실행할 로직
const success = (storeSeq) => {
  router.push(`/store/applySuccess/${storeSeq}`);
  baseNotify('Success Appply!!');
};
// 실패 시 처리할 로직
const error = () => {
  baseNotify('Faild Appply!!', { type: 'warning' });
  isSubmitState.value = false;
};

const refChild = ref(null);

const callTestFunction = () => {
  if (refChild.value) {
    refChild.value.test(); // 자식 컴포넌트의 test 함수 호출
  }
};

console.log(route.query?.seq);

if (route.query?.seq) {
}

const getPlaceInfo = async (storeSeq) => {
  const { data } = await api.post('', storeSeq);
  console.log(data);
};

// 새로고침, 뒤로가기, 페이지 나가기 방지
onMounted(() => {
  addBeforeunload();
  onBeforeUnmount(() => {
    removeBeforeunload();
  });
});
</script>
