<template>
  <q-card flat class="user-form-wrap q-py-xl">
    <q-card-section class="">
      <PageSubTitle title="Apply Successed !" />
      <br />
      <p class="text-center">
        <span>제출하신 내용은 아래와 같습니다.</span>
        <br />
        <span>수정이 필요한 정보가 있다면 수정 버튼을 클릭해주세요.</span>
      </p>
    </q-card-section>
    <q-card-section>
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
                <span
                  @click="storeFileDown(item.fileSeq)"
                  v-if="item.fileSeq == 1"
                  class="cursor-pointer underline"
                >
                  <q-icon name="sym_o_download" size="19px" color="grey-14" />
                  {{ item.orgFileName }}
                </span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </q-card-section>
    <q-card-section>
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
              <a :href="store.info?.url" target="_blank" class="underline">{{
                store.info?.url
              }}</a>
            </td>
            <th>인스타그램</th>
            <td>
              <a
                :href="` https://www.instagram.com/${store.info?.instagram}`"
                target="_blank"
                class="underline"
                >{{ store.info?.instagram }}</a
              >
              <!-- {{ store.info?.instagram }} -->
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
      <div>
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
              />
            </li>
          </template>
        </ul>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { baseNotify } from 'src/utils/base-notify';

const route = useRoute();

const store = ref({});
const BASE_URL = process.env.SERVER_PORT;

const getStoreInfo = async () => {
  isLoadingState.value = true;
  try {
    const { data } = await api.post('/store/getStoreInfo', {
      storeSeq: route.params.seq,
    });
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
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th {
  text-align: center;
}
th,
td {
  border-bottom: 1px solid #ccc;
  padding: 10px 5px;
}
</style>
