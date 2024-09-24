<template>
  <div>
    <KakaoPaymentBtn v-model="pgData" />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';

const serviceUserStore = useServiceUserStore();
const { serviceUser } = storeToRefs(serviceUserStore);

const currentTime = dayjs().format('YYYYMMDDHHmmss');

const { IMP } = window;
IMP.init(process.env.IAMPORT_PAYMENT_KEY);

// pg사 결제에 추가될 데이터
const pgData = ref({
  pay_method: 'card',
  merchant_uid: `ORDER_${currentTime}_USER_${serviceUser.value.seq}`,
  name: '결제 상품명',
  amount: 1004, // theme
  buyer_email: serviceUser.value.email,
  buyer_name: serviceUser.value.name,
  buyer_tel: serviceUser.value.tel,
});
</script>

<style lang="scss" scoped></style>
