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
import {
  validatePassword,
  validatePasswordConfirm,
  inputEmptyCheck,
} from '/src/utils/validate-rules';

const form = ref({
  password: '',
  newPassword: '',
  confirmPassword: '',
});

const passwordType = ref(false);

const updatePassword = () => {
  if (form.value.password == form.value.newPassword) {
    return baseNotify('1111', { type: 'warning' });
  }
};
</script>

<style lang="scss" scoped></style>
