<template>
  <q-card flat class="user-form-wrap q-py-xl">
    <q-card-section class="">
      <PageSubTitle title="Apply Successed !" />
      <br />
      <p class="text-center">
        <span>제출하신 내용은 아래와 같습니다.</span>
        <br />
        <span
          >수정이 필요한 정보가 있다면
          <span
            @click="updateStoreInfo"
            class="text-bold text-red-3 underline cursor-pointer"
            >수정</span
          >
          버튼을 클릭해주세요.</span
        >
      </p>
    </q-card-section>
    <q-card-section class="q-pb-none border">
      <div class="flex items-center justify-between q-pb-md">
        <p class="text-h5 q-px-sm q-mb-none">🙋🏻&nbsp; 대표자 정보</p>
        <q-btn
          @click="visible.owner = !visible.owner"
          :icon="visible.owner ? 'sym_o_stat_1' : 'sym_o_stat_minus_1'"
          size="md"
          round
          flat
        />
      </div>
      <q-slide-transition v-show="visible.owner" :duration="100">
        <table class="full-width">
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 30%" />
            <col style="width: 20%" />
            <col style="width: 30%" />
          </colgroup>
          <tbody>
            <tr>
              <th>대표자명</th>
              <td>{{ store.info?.ownerName }}</td>
              <th>이메일</th>
              <td>{{ store.info?.email }}</td>
            </tr>
            <tr>
              <th>휴대폰번호</th>
              <td>{{ store.info?.tel }}</td>
              <th>사업자번호</th>
              <td>{{ store.info?.businessNumber }}</td>
            </tr>
            <tr>
              <th>사업자등록증</th>
              <td colspan="3">
                <template v-for="item of store.fileList" :key="item.fileSeq">
                  <div
                    @click="storeFileDown(item.fileSeq)"
                    v-if="item.fileSeq == 1"
                    class="cursor-pointer text-grey-14 flex items-center"
                  >
                    <q-icon
                      name="sym_o_download"
                      size="19px"
                      color="grey-14"
                      class="q-mr-xs"
                    />
                    {{ item.orgFileName }}
                  </div>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </q-slide-transition>
    </q-card-section>

    <q-card-section class="q-my-xl q-pb-none border">
      <div class="flex items-center justify-between q-pb-md">
        <p class="text-h5 q-px-sm q-mb-none">🏠&nbsp; 플레이스 정보</p>
        <q-btn
          @click="visible.place = !visible.place"
          :icon="visible.place ? 'sym_o_stat_1' : 'sym_o_stat_minus_1'"
          size="md"
          round
          flat
        />
      </div>
      <q-slide-transition v-show="visible.place" :duration="100">
        <table class="full-width">
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 30%" />
            <col style="width: 20%" />
            <col style="width: 30%" />
          </colgroup>
          <tbody>
            <tr>
              <th>매장명</th>
              <td>{{ store.info?.storeName }}</td>
              <th>전화번호</th>
              <td>{{ store.info?.storeNumber }}</td>
            </tr>
            <tr>
              <th>URL</th>
              <td>
                <a
                  :href="store.info?.url"
                  target="_blank"
                  class="underline text-light-blue-14"
                  >{{ store.info?.url }}</a
                >
              </td>
              <th>인스타그램</th>
              <td>
                <a
                  :href="` https://www.instagram.com/${store.info?.instagram}`"
                  target="_blank"
                  class="underline text-light-blue-14"
                  >{{ store.info?.instagram }}</a
                >
              </td>
            </tr>
            <tr>
              <th>지역</th>
              <td>{{ store.info?.cityNm }}</td>
              <th>구</th>
              <td>{{ store.info?.districtNm }}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td colspan="3">{{ store.info?.addr }}</td>
            </tr>
          </tbody>
        </table>
      </q-slide-transition>
    </q-card-section>

    <q-card-section class="q-pb-none border">
      <div class="flex items-center justify-between q-pb-md">
        <p class="text-h5 q-px-sm q-mb-none">📷&nbsp; 플레이스 이미지</p>
        <q-btn
          @click="visible.image = !visible.image"
          :icon="visible.image ? 'sym_o_stat_1' : 'sym_o_stat_minus_1'"
          size="md"
          round
          flat
        />
      </div>
      <q-slide-transition v-show="visible.image" :duration="100">
        <!-- image -->
        <div
          class="q-pa-md q-mb-lg"
          style="border: 1px solid #ccc; border-radius: 10px"
        >
          <ul class="row q-col-gutter-x-md q-pa-none">
            <template v-for="item of store.fileList" :key="item.fileSeq">
              <li
                @click="storeFileDown(item.fileSeq)"
                v-if="item.type == 'image'"
                class="col-12 col-sm-6 col-md-3 cursor-pointer"
              >
                <img
                  :src="`${BASE_URL}${item.filePath}/${item.saveFileName}`"
                  class="full-width"
                  style="border-radius: 8px"
                />
              </li>
            </template>
          </ul>
        </div>
      </q-slide-transition>
    </q-card-section>

    <q-card-section class="q-mt-md">
      <div class="flex justify-center">
        <q-btn
          @click="updateStoreInfo"
          class="q-mr-sm"
          label="수정"
          color="red-3"
        />
        <q-btn
          @click="$router.push('/store')"
          label="HOME"
          color="deep-purple-3"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { baseNotify } from 'src/utils/base-notify';

const route = useRoute();
const router = useRouter();

const store = ref({});
const BASE_URL = process.env.SERVER_PORT;

const visible = ref({
  owner: true,
  place: true,
  image: true,
});

const getStoreInfo = async () => {
  /**
   * apply에서 router의 meta에 속성 추가 후 없으면 store home으로
   */
  isLoadingState.value = true;
  try {
    const { data } = await api.post('/store/getStoreInfo', {
      storeSeq: route.params.seq,
    });
    if (!data.result.info) {
      baseNotify('등록된 정보가 없습니다.', { type: 'warning' });
      router.push('/store');
    }
    store.value = data.result;
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
getStoreInfo();

// 사업자 등록증 다운로드
const storeFileDown = async (seq) => {
  isLoadingState.value = true;
  try {
    const res = await api.post(
      '/store/fileDown',
      {
        storeSeq: route.params.seq,
        fileSeq: seq,
      },
      {
        responseType: 'blob',
      },
    );
    if (res) {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', store.value.fileList[seq - 1].orgFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else baseNotify('파일 다운로드 실패하였습니다.', { type: 'warning' });
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
const updateStoreInfo = () => {
  const seq = route.params.seq;
  router.push(`/store/apply?seq=${seq}`);
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th {
  text-align: center;
  font-weight: 500;
}
th,
td {
  padding: 10px 5px;
}
table tr {
  border-bottom: 1px solid #ccc;
}
table tr:first-child {
  border-top: 1px solid #ccc;
}
table tr:last-child {
  border-bottom: none;
}
</style>
