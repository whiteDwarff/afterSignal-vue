<template>
  <!-- <q-form> -->
  <q-card-section class="q-pb-none">
    <small class="block q-mb-sm">* 대표자명</small>
    <q-input
      v-model="form.ownerName"
      dense
      outlined
      color="red-3"
      maxlength="5"
      class="col-8"
      :rules="[(val) => inputEmptyCheck(val, '대표자를')]"
      lazy-rules
      hide-bottom-space
    />
  </q-card-section>

  <EmailInput
    v-model="form"
    label="이메일"
    :duplicated="true"
    @reset="form.isEmailCheck = false"
    @duplicateCheck="duplicatedEmailCheck"
  />

  <!-- 비밀번호 -->
  <PasswordInput
    v-model="form"
    label="비밀번호"
    validateLabel="비밀번호 확인"
    :validate="true"
  />

  <!-- 휴대폰 번호 -->
  <q-card-section class="q-pb-none">
    <small class="block q-mb-sm">* 휴대폰번호</small>
    <div class="row q-col-gutter-sm">
      <q-select
        v-model="form.firstTel"
        :options="firstTelOptions"
        dense
        outlined
        class="col-6"
        color="red-3"
        options-dense
      />
      <q-input
        v-model="form.otherTel"
        dense
        outlined
        class="col-6"
        color="red-3"
        mask="####-####"
        minlength="8"
        maxlength="9"
        :rules="[(val) => validateTel(form)]"
        lazy-rules
        hide-bottom-space
      />
    </div>
  </q-card-section>

  <!-- 사업자등록번호 -->
  <q-card-section class="q-pb-none">
    <small class="block q-mb-sm">* 사업자번호</small>
    <q-input
      v-model="form.businessNumber"
      dense
      outlined
      color="red-3"
      maxlength="12"
      minlength="12"
      mask="###-##-#####"
      :rules="[(val) => inputEmptyCheck(val, '사업자번호를')]"
      lazy-rules
      hide-bottom-space
    />
  </q-card-section>
  <q-card-section>
    <small class="block q-mb-sm">* 사업자등록증</small>
    <div
      class="border q-pa-md rounded-borders flex justify-between items-center"
    >
      <input
        @change="changeBusinessFile"
        ref="refFileInput"
        accept="image/*, .pdf"
        type="file"
      />
      <q-btn
        v-if="form.businessRegistration"
        @click="deleteBusinessFile"
        round
        dense
        size="sm"
        color="black"
        unelevated
      >
        <q-icon name="sym_o_close" color="white" />
      </q-btn>
    </div>
  </q-card-section>
  <!-- </q-form> -->
</template>

<script setup>
import { isLoadingState } from 'src/boot/common';
import { validateTel, inputEmptyCheck } from '/src/utils/validate-rules';
import { fileExtCheck } from 'src/utils/file';
import { firstTelOptions } from 'src/options/common';
import { baseNotify } from 'src/utils/base-notify';

const form = defineModel();
const refFileInput = ref(null);

// 이메일 중복검사
const duplicatedEmailCheck = async () => {
  if (!form.value.email) return baseNotify('이메일을 입력해주세요.');

  try {
    isLoadingState.value = true;
    const { data } = await api.post('/store/duplicatedEmailCheck', {
      email: form.value.email,
    });
    if (data.count > 0) return baseNotify(data.result.msg);
    else if (confirm('해당 이메일을 사용하시겠습니까?')) {
      form.value.isEmailCheck = true;
      form.value.checkedEmail = form.value.email;
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
// 사업자등록증 선택 시
const changeBusinessFile = (event) => {
  const file = event.target.files[0];
  const extArr = ['.jpg', '.jpeg', '.png', '.pdf'];

  if (file && fileExtCheck(file, extArr)) {
    deleteBusinessFile();
    return baseNotify(`[${extArr.join(', ')}] 확장자만 등록할 수 있습니다.`, {
      type: 'warning',
    });
  }

  form.value.businessRegistration = file;
};
// 사업자 등록증 삭제
const deleteBusinessFile = () => {
  form.value.businessRegistration = null;
  refFileInput.value.value = null;
};
</script>
