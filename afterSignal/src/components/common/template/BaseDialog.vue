<template>
  <q-dialog
    v-model="model"
    persistent
    no-shake
    transition-hide="none"
    transition-show="none"
  >
    <q-card id="base-dialog" :style="{ width: maxWidth }">
      <q-card-section class="flex q-py-sm">
        <q-space />
        <q-btn icon="close" flat dense round :ripple="false" v-close-popup />
      </q-card-section>

      <div class="text-center q-mb-lg">
        <span class="text-h6">{{ label }}</span>
      </div>
      <q-card-section>
        <slot> </slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const props = defineProps({
  maxWidth: {
    type: String,
    default: () => '600px',
  },
  label: {
    type: String,
    default: () => '',
  },
});
const model = defineModel();
</script>

<style scoped></style>
