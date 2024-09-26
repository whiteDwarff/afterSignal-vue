<template>
  <q-btn @click="onPaymentByKakao" id="kakao-payment-btn">
    <img
      id="kakao-icon"
      src="/img/payment/kakao-payment-icon.png"
      alt="kakao icon"
    />
    &nbsp;
    <span id="kakao-btn-content"> pay </span>
  </q-btn>
</template>

<script setup>
const modelValue = defineModel();

// 카카오 결제 API
const onPaymentByKakao = () => {
  IMP.request_pay(
    {
      pg: process.env.PAYMENT_KAKAO_KEY,
      ...modelValue.value,
    },
    (res) => {
      if (res.success) {
        // axios로 DB 저장

        baseNotify('결제에 성공하였습니다.');
        // 페이지 라우팅
        // router.push('/')
      } else {
        baseNotify(res.error_msg, { type: 'warning' });
      }
    },
  );
};
</script>

<style scoped>
#kakao-payment-btn {
  background-color: #fae100;
}
#kakao-icon {
  width: 15px;
}
#kakao-btn-content {
  font-family: 'Kakao', sans-serif;
  color: #371d1e;
  text-transform: lowercase;
  font-weight: 900;
}
</style>
