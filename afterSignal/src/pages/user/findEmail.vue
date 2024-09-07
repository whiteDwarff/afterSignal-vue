<template>
  <q-card flat class="user-form-wrap q-py-xl">
    <div class="text-center q-mb-lg">
      <span class="text-h4">Forgot E-mail</span>
    </div>
    <q-form @submit.prevent="findUserEmail">
      <!-- 이름 -->
      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">* Name</small>
        <q-input
          v-model="form.name"
          dense
          outlined
          color="red-3"
          maxlength="5"
          :rules="[(val) => inputEmptyCheck(val, '이름')]"
          lazy-rules
          hide-bottom-space
        />
      </q-card-section>
      <!-- 휴대폰 번호 -->
      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">* Mobile phone</small>
        <div class="row q-col-gutter-sm">
          <q-select
            v-model="form.firstTel"
            class="col-6"
            color="red-3"
            :options
            dense
            options-dense
            outlined
            map-options
            emit-value
          ></q-select>
          <q-input
            v-model="form.otherTel"
            dense
            outlined
            class="col-6"
            color="red-3"
            mask="####-####"
            minlength="8"
            maxlength="9"
            :rules="[(val) => validateTel(form.firstTel + val)]"
            lazy-rules
            hide-bottom-space
          />
        </div>
      </q-card-section>

      <q-card-section class="q-mt-xl text-center">
        <q-btn
          id="user-form-submit-btn"
          label="SUBMIT"
          type="submit"
          class="border bg-red-2 text-white"
          unelevated
          size="lg"
        />
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useSystemStore } from 'src/stores/systemStore';
import { inputEmptyCheck, validateTel } from '/src/utils/validate-rules';
import { firstTelOptions as options } from 'src/options/common';

const systemStore = useSystemStore();
const { isLoadingState } = storeToRefs(systemStore);

const form = ref({
  name: '',
  firstTel: '010',
  otherTel: '',
  tel: '',
});

const findUserEmail = async () => {
  form.value.tel = form.value.firstTel + form.value.otherTel;
  isLoadingState.value = !isLoadingState.value;
  try {
    isLoadingState.value = false;
    const res = await api.post('/user/findUserEmail', form.value);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped></style>
