<template>
  <q-card-section class="q-pb-none">
    <small class="block q-mb-sm">* {{ label }}</small>
    <div class="row q-col-gutter-x-sm">
      <q-input
        v-model="form.email"
        dense
        outlined
        color="red-3"
        maxlength="50"
        :class="duplicated ? 'col-8' : 'col-12'"
        :bg-color="form.isEmailCheck ? 'grey-3' : 'white'"
        :rules="[validateEmail]"
        :readonly="form?.isEmailCheck || readonly"
        lazy-rules
        hide-bottom-space
      />
      <template v-if="duplicated">
        <div
          class="col-1 text-center flex items-center justify-center"
          style="height: 38px"
        >
          <q-btn
            @click="$emit('reset')"
            :disable="!form.isEmailCheck"
            flat
            dense
            rounded
          >
            <q-icon name="sym_o_restart_alt" color="grey-14"></q-icon>
            <q-tooltip class="text-caption">reset</q-tooltip>
          </q-btn>
        </div>
        <div class="col-3">
          <q-btn
            @click="$emit('duplicateCheck')"
            class="full-width bg-deep-purple-3 text-white border"
            flat
            label="check"
            style="height: 40px"
            :disable="form.isEmailCheck"
          />
        </div>
      </template>
    </div>
  </q-card-section>
</template>

<script setup>
import { validateEmail } from '/src/utils/validate-rules';

const props = defineProps({
  readonly: {
    type: Boolean,
    default: () => false,
  },
  duplicated: {
    type: Boolean,
    default: () => false,
  },
  label: {
    type: String,
    default: () => 'E-mail',
  },
});

const emit = defineEmits([
  // 이메일 중복검사
  'duplicateCheck',
  // 이메일 조기화
  'reset',
]);

const form = defineModel();
</script>

<style lang="scss" scoped></style>
