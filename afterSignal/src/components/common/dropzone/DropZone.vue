<template>
  <div id="dropzone-wrap" class="q-py-md">
    <div class="flex justify-end q-py-md">
      <q-btn 
        @click="dropzone.removeAllFiles()" 
        label="All Delete"
      />
    </div>

    <div class="dropzone">
      <div class="dz-message" style="margin: 0">
        <span>
          {{ !message ? 'Drop files here or click to upload.' : message }}
        </span>
        <br><br>
        <span>
          Uploadable extensions :
          <b style="text-decoration: underline;">{{ ext.replaceAll(',', ' ') }}</b>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { fileExtCheck } from 'src/utils/file';
import Dropzone from "dropzone"
/**
 * @message
 *    - dz-message (드랍존 내부 메시지)
 *    - type    : String
 *    - default : ''
 * @ext        
 *    - extensions (파일 확장자)
 *    - type    : String
 *    - default : .jpeg,.jpg,.png,.gif
 * @thumbnail 
 *    - 업로드 시 썸네일 활성화 여부
 *    - type    : Object (enable, width, height)
 *    - default : { enable: false }
 */
// props
const props = defineProps({
  message: {
    type: String,
    default: () => ''
  },
  ext: {
    type: String,
    default: () => '.jpeg,.jpg,.png,.gif'
  },
  thumbnail: {
    type: Object,
    default: () => ({
      enable: false,
    })
  },
  url: {
    type: String,
    required: true
  },
  maxFiles: {
    type: Number,
    default: () => 10
  }
});

// emit 
const emits = defineEmits([
  'upload-success',
  'upload-error'
]);

const isSubmit = defineModel();

const options = ref({
	url: props.url,                                   // 업로드 URL
	createImageThumbnails: props.thumbnail.enable,    // 이미지의 썸네일을 생성할지 여부
	thumbnailWidth: props.thumbnail?.width || 200,    // 썸네일 가로 크기
	thumbnailHeight: props.thumbnail?.height || 200,  // 썸네일 세로 크기
  acceptedFiles: props.ext,                         // 업로드 가능한 확장자 설정
  // maxFiles: props.maxFiles,                         // 업로드 파일수

  autoProcessQueue: false,                          // 자동으로 보내기. true : 파일 업로드 되자마자 서버로 요청, false : 서버에는 올라가지 않은 상태. 따로 this.processQueue() 호출시 전송
  autoQueue: true,                                 // // 드래그 드랍 후 바로 서버로 전송
	paramName: 'dzFile',				                      // 전송되는 파일 매개변수의 이름
  addRemoveLinks: true,                             // 삭제버튼 활성화
  dictRemoveFile: 'delete',                         // 삭제버튼 text
  parallelUploads: 10, // 동시파일업로드 수(이걸 지정한 수 만큼 여러파일을 한번에 넘긴다.)
  uploadMultiple: true, // 다중업로드 기능
});

let dropzone = null; 

onMounted(() => {
	dropzone = new Dropzone('.dropzone', {
    // options 할당
    ...options.value,
    // Dropzone 생성
    init: function() {

      // Dropzone element에 파일 추가 시 이벤트 발생
      this.on('addedfile', uploadFile => {

        const extArr = props.ext.split(',');
        // 선택 가능한 확장자가 아님
        if(fileExtCheck(uploadFile, extArr)) {
          baseNotify(`[${extArr.join(', ')}] 확장자만 등록할 수 있습니다.`, {
            type: 'warning'
          });
          return this.removeFile(uploadFile);
        }

        if (this.files.length) {
          // 업로드 가능한 파일 개수를 초과
          if(this.files.length > props.maxFiles) {
            this.removeFile(uploadFile);
            return baseNotify(`업로드 가능한 파일은 ${this.options.maxFiles}개 입니다.`, {
              type: 'warning'
            });
          }

          // 저장된 파일과 추가한 파일이 동일
          for (let i = 0; i < this.files.length - 1; i++) {
              if (
                this.files[i].name === uploadFile.name &&
                this.files[i].size === uploadFile.size &&
                this.files[i].lastModifiedDate.toString() === uploadFile.lastModifiedDate.toString()
              ) 
                return this.removeFile(uploadFile);
          }
        } 
      }) // addedfile end

      // 업로드한 파일을 서버에 요청하는 동안 호출 실행
      this.on('successmultiple', function (file, xhr, formData) {
        console.log('보내는중');
      });

      // 서버로 파일이 성공적으로 전송되면 실행
      this.on('successmultiple', function (file, responseText) {
        console.log('성공');
        emits('upload-success');
      });
      
      // 업로드 에러 처리
      this.on('errormultiple', function (file, errorMessage) {
        this.removeAllFiles();
        emits('upload-error');
        return alert(errorMessage);
      });
    },
  });
  watchEffect(() => {
    if(isSubmit.value) {
      dropzone.processQueue();
    }
  });
})
</script>

<style src="src/css/dropzone.css"></style>

<!--
https://www.npmjs.com/package/vue3-dropzone

https://www.npmjs.com/package/dropzone-vue3?activeTab=code
-->