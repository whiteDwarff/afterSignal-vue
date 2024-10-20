<template>
  <!-- 비밀번호 -->
  <q-card-section class="q-pb-none">
    <small class="block q-mb-sm">* {{ label }}</small>
    <q-input
      v-model="form.password"
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
  <!-- 비밀번호 확인 -->
  <q-card-section v-if="validate" class="q-pb-none">
    <small class="block q-mb-sm">* {{ validateLabel }}</small>
    <q-input
      v-model="form.passwordConfirm"
      dense
      outlined
      color="red-3"
      :type="passwordType ? 'text' : 'password'"
      maxlength="15"
      :rules="[(val) => validatePasswordConfirm(val, form.password)]"
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
</template>

<script setup>
import {
  validatePassword,
  validatePasswordConfirm,
} from '/src/utils/validate-rules';

const props = defineProps({
  label: {
    type: String,
    default: () => 'Password',
  },
  validateLabel: {
    type: String,
    default: () => 'Confirm Password',
  },
  validate: {
    type: Boolean,
    default: () => false,
  },
});

const form = defineModel();

const passwordType = ref(false);
</script>
