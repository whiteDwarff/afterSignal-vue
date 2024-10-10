<template>
  <div>
    INDEX
    <button @click="isSubmit = true">submit !</button>
    <DropZone 
      v-model="isSubmit"
      url="/api/common/dropzoneSaveFiles"
      :thumbnail="{ enable: true }" 
      @upload-error="console.log('fail');"
      @upload-success="console.log('ok');"
    />  
  </div>
</template>

<script setup>

const isSubmit = ref(false);
</script>

<style scoped></style>