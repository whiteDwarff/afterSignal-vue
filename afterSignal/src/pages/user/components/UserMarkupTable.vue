<template>
  <table class="full-width">
    <colgroup>
      <col style="width: 27%" />
      <col style="width: 15%" />
      <col style="width: 15%" />
      <col style="width: 15%" />
      <col style="width: 14%" />
      <col style="width: 14%" />
    </colgroup>
    <thead>
      <tr class="bg-red-2 text-white shadow-2">
        <th class="text-weight-bold border-left">변경내역</th>
        <th class="text-weight-bold border-y">변경 전</th>
        <th class="text-weight-bold border-y">변경 금액</th>
        <th class="text-weight-bold border-y">잔액</th>
        <th class="text-weight-bold border-y">상태</th>
        <th class="text-weight-bold border-right">변경일자</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="list.length">
        <tr
          v-for="item of list"
          :key="item"
          class="text-center bg-white text-black"
        >
          <td class="border-left">{{ item.changeReason }}</td>
          <td class="border-y">{{ localeToMoney(item.beforeDeposit) }}</td>
          <td class="border-y">
            <div class="flex items-center justify-center">
              <q-icon
                :name="
                  item.beforeDeposit > item.afterDeposit
                    ? 'sym_o_arrow_drop_down'
                    : 'sym_o_arrow_drop_up'
                "
                :color="item.beforeDeposit > item.afterDeposit ? 'red' : 'teal'"
                size="xs"
              />
              {{ localeToMoney(item.afterDeposit - item.beforeDeposit) }}
            </div>
          </td>
          <td class="border-y text-weight-medium">
            {{ localeToMoney(item.afterDeposit) }}
          </td>
          <td class="border-y">
            <q-chip color="cyan-3" text-color="white" :ripple="false">
              {{ item.status }}
            </q-chip>
          </td>
          <td class="border-right">{{ item.usageDate }}</td>
        </tr>
      </template>
      <template v-else>
        <tr class="text-center bg-white text-black">
          <td class="border" colspan="6">Empty of List.</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import { localeToMoney } from 'src/utils/common';

const route = useRoute();

const props = defineProps({
  list: {
    type: Array,
  },
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
tr td:nth-child(n + 6),
tr th:nth-child(n + 6) {
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
