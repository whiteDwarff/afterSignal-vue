<template>
  <q-card flat class="user-form-wrap q-py-xl">
    <q-card-section class="q-pa-none">
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
            <td colspan="3"></td>
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
            <th>url</th>
            <td>{{ store.info?.url }}</td>
            <th>인스타그램</th>
            <td>{{ store.info?.instagram }}</td>
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
        <template v-for="item of store.fileList" :key="item.fileSeq">
          <img
            v-if="item.type == 'image'"
            :src="`localhost:8080${item.filePath}${item.saveFileName}.jpeg`"
          />
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const route = useRoute();

const store = ref({});

const getStoreInfo = async () => {
  isLoadingState.value = true;
  try {
    const { data } = await api.post('/store/getStoreInfo', {
      storeSeq: route.params.seq,
    });
    console.log(data);
    store.value = data.result;
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
getStoreInfo();
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
