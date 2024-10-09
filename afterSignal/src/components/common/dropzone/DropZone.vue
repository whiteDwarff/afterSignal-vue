<template>
<div id="dropzone" class="vue-dropzone dropzone">
    <div class="dz-message" style="margin: 0">
        Drop files here or click to upload.
    </div>
</div>

</template>

<script setup>
import Dropzone from "dropzone"
import { fileExtCheck } from 'src/utils/file';


const props = defineProps({
  ext: {
    type: String,
    default: () => '.jpeg,.jpg,.png,.gif'
  },
  thumbnail: {
    type: Object,
    default: () => ({
      enable: false,
    })
  }
})

const options = ref({
	url: 'aaaaaaa',
  autoProcessQueue: false,                       // 파일 선택 한 즉시 서버에 업로드 비활성화  
  autoQueue: false,
	paramName: 'dzFile',				                   // 전송되는 파일 매개변수의 이름
	createImageThumbnails: props.thumbnail.enable, // 이미지의 썸네일을 생성할지 여부
	thumbnailWidth: props.thumbnail?.width || 200,
	thumbnailHeight:  props.thumbnail?.height || 200,
  addRemoveLinks: true,                           // 삭제버튼 활성화
  dictRemoveFile: 'delete',                       // 삭제버튼 text
  acceptedFiles: props.ext                        // 업로드 가능한 확장자 설정
})


onMounted(() => {

	new Dropzone('#dropzone', {
    // options 할당
    ...options.value,
    // Dropzone 생성
    init: function() {

      // Dropzone element에 파일 추가 시 이벤트 발생
      this.on('addedfile', uploadFile => {
        if (this.files.length) {
          const extArr = props.ext.split(',');
          // 선택 가능한 확장자가 아닐 경우
          if(fileExtCheck(uploadFile, extArr)) {
            baseNotify(`[${extArr.join(', ')}] 확장자만 등록할 수 있습니다.`, {
              type: 'warning'
            });
            this.removeFile(uploadFile);
          }

          // 저장된 파일과 추가한 파일이 동일한 경우
          for (let i = 0; i < this.files.length - 1; i++) {
              if (
                this.files[i].name === uploadFile.name &&
                this.files[i].size === uploadFile.size &&
                this.files[i].lastModifiedDate.toString() === uploadFile.lastModifiedDate.toString()
              ) 
                this.removeFile(uploadFile);
          }
        } 
      }) // addedfile end


    },
  })
})
</script>

<style src="src/css/dropzone.css"></style>

<!--
https://www.npmjs.com/package/vue3-dropzone

https://www.npmjs.com/package/dropzone-vue3?activeTab=code
-->