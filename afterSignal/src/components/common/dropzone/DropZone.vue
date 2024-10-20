<template>
  <div id="dropzone-wrap" class="">
    <div class="dropzone">
      <div class="dz-message" style="margin: 0">
        <span>
          {{ !message ? 'Drop files here or click to upload.' : message }}
        </span>
        <br /><br />
        <span>
          Uploadable extensions :
          <b style="text-decoration: underline">{{
            ext.replaceAll(',', ' ')
          }}</b>
          <br />
          Max Files : <b class="text-red-4">{{ maxFiles }}</b>
        </span>
      </div>
    </div>
    <!-- 
    <div class="flex justify-end q-py-md">
      <q-btn 
        @click="dropzone.removeAllFiles()" 
        label="All Delete"
      />
    </div> 
    -->
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { fileExtCheck } from 'src/utils/file';

import Dropzone from 'dropzone';
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
 * @fileRequired
 *    - 첨부파일 필수 등록 여부
 *    - type    : Boolean
 *    - default : false
 * @url
 *    - Submit URL
 *    - type    : String
 * @maxFiles
 *    - type    : Number
      - default : 10
 */
const props = defineProps({
  message: {
    // dz-message
    type: String,
    default: () => '',
  },
  ext: {
    // 업로드 가능한 확장자
    type: String,
    default: () => '.jpeg,.jpg,.png,.gif',
  },
  thumbnail: {
    // 썸네일 표시
    type: Object,
    default: () => ({
      enable: false,
    }),
  },
  fileRequired: {
    // 첨부파일 등록 여부 (true: 필수, false: 선택)
    type: Boolean,
    default: () => false,
  },
  url: {
    // axios 요청 url
    type: String,
    required: true,
  },
  maxFiles: {
    // 업로드 가능한 파일 개수
    type: Number,
    default: () => 10,
  },
  errorMessage: {
    type: String,
    default: () => '파일을 첨부해주세요',
  },
});

const emits = defineEmits([
  'upload-success', // 업로드 성공
  'upload-error', // 업로드 실패
  'unregistered-file', // 첨부파일 미등록
]);
/*
submit satae
  - v-model -> provide(), inject()로 변경
  - submit이 호출되는 메서드에서 provide('isSubmitState', REF_VALUE); 사용
  // const isSubmit = defineModel('submit');
*/
const isSubmitState = inject('isSubmitState', false);

// form info
const form = defineModel('form');

const options = ref({
  url: props.url, // 업로드 URL
  createImageThumbnails: props.thumbnail.enable, // 이미지의 썸네일을 생성할지 여부
  thumbnailWidth: props.thumbnail?.width || 200, // 썸네일 가로 크기
  thumbnailHeight: props.thumbnail?.height || 200, // 썸네일 세로 크기
  acceptedFiles: props.ext, // 업로드 가능한 확장자 설정
  // maxFiles: props.maxFiles,                      // 업로드 파일수
  autoProcessQueue: false, // 자동으로 보내기. true : 파일 업로드 되자마자 서버로 요청, false : 서버에는 올라가지 않은 상태. 따로 this.processQueue() 호출시 전송
  autoQueue: true, // 드래그 드랍 후 바로 서버로 전송
  paramName: 'dzFile', // 전송되는 파일 매개변수의 이름
  addRemoveLinks: true, // 삭제버튼 활성화
  dictRemoveFile: 'delete', // 삭제버튼 text
  parallelUploads: 10, // 동시파일업로드 수(이걸 지정한 수 만큼 여러파일을 한번에 넘긴다.)
  uploadMultiple: true, // 다중업로드 기능
});

let dropzone = null;

onMounted(() => {
  // Dom이 업데이트 되면 dropzone 활성화
  dropzone = new Dropzone('.dropzone', {
    // options 할당
    ...options.value,
    // Dropzone 생성
    init: function () {
      // Dropzone element에 파일 추가 시 이벤트 발생
      this.on('addedfile', (uploadFile) => {
        const extArr = props.ext.split(',');
        // 선택 가능한 확장자가 아님
        if (fileExtCheck(uploadFile, extArr)) {
          baseNotify(`[${extArr.join(', ')}] 확장자만 등록할 수 있습니다.`, {
            type: 'warning',
          });
          return this.removeFile(uploadFile);
        }

        if (this.files.length) {
          // 업로드 가능한 파일 개수를 초과
          if (this.files.length > props.maxFiles) {
            this.removeFile(uploadFile);
            return baseNotify(
              `업로드 가능한 파일은 ${props.maxFiles}개 입니다.`,
              {
                type: 'warning',
              },
            );
          }

          // 중복파일 저장 x
          for (let i = 0; i < this.files.length - 1; i++) {
            if (
              this.files[i].name === uploadFile.name &&
              this.files[i].size === uploadFile.size &&
              this.files[i].lastModifiedDate.toString() ===
                uploadFile.lastModifiedDate.toString()
            )
              return this.removeFile(uploadFile);
          }
        }
      }); // addedfile end

      // 업로드한 파일을 서버에 요청하는 동안 호출 실행
      this.on('sending', function (file, xhr, formData) {
        isLoadingState.value = true;

        for (let key of Object.keys(form.value)) {
          formData.append(key, form.value[key]);
        }
      });

      // 서버로 파일이 성공적으로 전송되면 실행
      this.on('successmultiple', function (file, responseText) {
        console.log('성공');
        isLoadingState.value = false;
        emits('upload-success');
      });

      // 업로드 에러 처리
      this.on('errormultiple', function (file, errorMessage) {
        this.removeAllFiles();
        emits('upload-error');
        isLoadingState.value = false;
        return alert(errorMessage);
      });
    },
  });
  watchEffect(async () => {
    if (isSubmitState.value) {
      // 첨부파일 등록이 필수인 경우
      if (props.fileRequired && !dropzone.files.length) {
        emits('unregistered-file');
        isSubmitState.value = false;
        return baseNotify(props.errorMessage, { type: 'warning' });
      } else {
        isLoadingState.value = true;
        dropzone.processQueue();
      }

      // 첨부파일 등록이 필수가 아닌 경우
      if (!props.fileRequired) {
        const formData = new FormData();
        for (let key of Object.keys(form.value)) {
          formData.append(key, form.value[key]);
        }

        try {
          // 로딩 활성화
          isLoadingState.value = true;
          const response = api.post(props.url.replace('/api', ''), formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          console.log(response);
        } catch (err) {
          console.log(err);
        } finally {
          isLoadingState.value = false;
        }
      }
    }
  });
});
</script>
<style src="src/css/dropzone.css"></style>
