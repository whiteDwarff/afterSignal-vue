<template>
  <q-card flat class="q-px-md border no-border-radius">
    <q-form @submit.prevent="updatePassword">
      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">* Current Password</small>
        <q-input
          v-model="form.password"
          dense
          outlined
          color="red-3"
          type="password"
          maxlength="15"
          :rules="[validatePassword]"
          lazy-rules
          hide-bottom-space
        />
      </q-card-section>
      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">* New Password</small>
        <q-input
          v-model="form.newPassword"
          dense
          outlined
          color="red-3"
          :type="passwordType ? 'text' : 'password'"
          maxlength="15"
          :rules="[validatePassword]"
          lazy-rules
          hide-bottom-space
        />
      </q-card-section>
      <q-card-section>
        <small class="block q-mb-sm">* Confirm Password</small>
        <q-input
          v-model="form.confirmPassword"
          dense
          outlined
          color="red-3"
          :type="passwordType ? 'text' : 'password'"
          maxlength="15"
          :rules="[(val) => validatePasswordConfirm(val, form.newPassword)]"
          lazy-rules
          hide-bottom-space
        >
          <template v-slot:append>
            <q-icon
              :name="passwordType ? 'lock_open' : 'lock'"
              @click="passwordType = !passwordType"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="text-center q-mt-lg">
        <q-btn
          label="SUBMIT"
          type="submit"
          id="user-form-submit-btn"
          class="bg-red-2 text-white border"
          unelevated
          size="lg"
        />
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { baseNotify } from 'src/utils/base-notify';
import {
  validatePassword,
  validatePasswordConfirm,
  inputEmptyCheck,
} from '/src/utils/validate-rules';

const userStore = useServiceUserStore();
const { serviceUser } = storeToRefs(userStore);

const form = ref({
  password: '',
  newPassword: '',
  confirmPassword: '',
});

const passwordType = ref(false);

// 비밀번호 변경
const updatePassword = async () => {
  if (form.value.password == form.value.newPassword) {
    return baseNotify('동일한 패스워드로 변경할 수 없습니다.', {
      type: 'warning',
    });
  }
  if (form.value.newPassword != form.value.confirmPassword) {
    return baseNotify('비밀번호가 일치하지 않습니다.', {
      type: 'warning',
    });
  }

  isLoadingState.value = true;

  try {
    const { data } = await api.post('/user/updatePassword', {
      ...form.value,
      seq: serviceUser.value.seq,
      email: serviceUser.value.email,
    });
    if (data.status == 200) {
      form.value.password = '';
      form.value.newPassword = '';
      form.value.confirmPassword = '';
      baseNotify('비밀번호가 변경되었습니다.');
    } else {
      baseNotify(data.result.msg, { type: 'warning' });
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
