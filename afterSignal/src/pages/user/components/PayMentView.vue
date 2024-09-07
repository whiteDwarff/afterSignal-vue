<template>
  <q-card flat>
    <table class="full-width">
      <colgroup>
        <col style="width: 36%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
        <col style="width: 14%" />
        <col style="width: 14%" />
      </colgroup>
      <thead>
        <tr class="bg-red-2 text-white shadow-2">
          <th class="text-weight-bold border-left">변경내역</th>
          <th class="text-weight-bold border-y">변경 전</th>
          <th class="text-weight-bold border-y">변경 후</th>
          <th class="text-weight-bold border-y">상태</th>
          <th class="text-weight-bold border-right">변경일자</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="i in 8" :key="i">
          <tr class="text-center text-center bg-white text-black">
            <td class="border-left">회원가입</td>
            <td class="border-y">0</td>
            <td class="border-y">1,000</td>
            <td class="border-y">지급완료</td>
            <td class="border-right">2024.09.06</td>
          </tr>
        </template>
      </tbody>
    </table>
    <q-card-section>
      <BasePagination v-model:page="page" />
    </q-card-section>
  </q-card>
</template>

<script setup>
const page = ref({
  current: 1,
});
</script>

<style scoped>
table {
  border-spacing: 0 15px;
  margin-top: -15px;
}
th,
td {
  padding: 18px 7px;
}
tr td:nth-child(n + 5),
tr th:nth-child(n + 5) {
  border-radius: 0 0.625rem 0.625rem 0;
}
tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: 0.625rem 0 0 0.625rem;
}
table tr {
  border-radius: 20px;
}
.border-y {
  border-top: 1px solid #868686;
  border-bottom: 1px solid #868686;
}
.border-left {
  border-top: 1px solid #868686;
  border-bottom: 1px solid #868686;
  border-left: 1px solid #868686;
}
.border-right {
  border-top: 1px solid #868686;
  border-bottom: 1px solid #868686;
  border-right: 1px solid #868686;
}
</style>
