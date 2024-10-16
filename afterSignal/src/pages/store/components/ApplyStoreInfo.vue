<template>
	<!-- <q-form> -->
		<!-- 이메일 -->
		<q-card-section class="q-pb-none">
			<small class="block q-mb-sm">* Store Name</small>
				<q-input
					v-model="form.storeName"
					dense
					outlined
					color="red-3"
					maxlength="50"
					class="col-8"
					:rules="[(val) => inputEmptyCheck(val, '매장명을')]"
					lazy-rules
					hide-bottom-space
				/>
		</q-card-section>
		<!-- 매장 번호 -->
		<q-card-section class="q-pb-none">
			<small class="block q-mb-sm">* Store Number</small>
			<div class="row q-col-gutter-sm">
				<q-select
					v-model="form.storeFirstTel"
					:options="firstNumberOptions"
					dense
					outlined
					class="col-6"
					color="red-3"
					options-dense
				/>
				<q-input
					v-model="form.storeOtherTel"
					dense
					outlined
					class="col-6"
					color="red-3"
					mask="###-####"
					minlength="8"
					maxlength="9"
					:rules="[(val) => inputEmptyCheck(val, '전화번호를')]"
					lazy-rules
					hide-bottom-space
				/>
			</div>
		</q-card-section>
		<!-- URL -->
		<q-card-section class="q-pb-none">
			<small class="block q-mb-sm">* URL (자사 혹은 네이버 플레이스 URL을 입력해주세요)</small>
			<q-input
				v-model="form.url"
				dense
				outlined
				color="red-3"
				maxlength="100"
				:rules="[(val) => inputEmptyCheck(val, 'URL을')]"
				lazy-rules
				hide-bottom-space
			/>
		</q-card-section>
			<!-- 인스타그램 -->
			<q-card-section class="q-pb-none">
			<small class="block q-mb-sm">Instagram</small>
			<q-input
				v-model="form.instagram"
				dense
				outlined
				color="red-3"
				maxlength="5"
				lazy-rules
				hide-bottom-space
			/>
		</q-card-section>
		<!-- 도시, 지역구 -->
		<q-card-section class="q-pb-none">
				<div class="row q-col-gutter-sm">
					<div class="col-6">
						<small class="block q-mb-sm">City</small>
						<q-select
							v-model="form.city"
							:options="options.city"
							@update:model-value="changeDistrictByOptions"
							color="red-3"
							dense
							outlined
							options-dense
							emit-value
							map-options
						/>
					</div>
					<div class="col-6">
						<small class="block q-mb-sm">District</small>
						<q-select
							v-model="form.district"
							:options="options.district"
							color="red-3"
							dense
							outlined
							options-dense
							emit-value
							map-options
						/>
					</div>
				</div>
			</q-card-section>
			<!-- 카카오 주소 검색 -->
			<KakaoAdress v-model="form">
				<small class="block q-mb-sm">* Adress</small>
			</KakaoAdress>
			<q-card-section class="q-pb-none under-line">
				<small class="block q-mb-sm">* Store Image</small>
				<!-- dropzone -->
				<DropZone 
					v-model:form="form"
					url="/api/common/dropzoneSaveFiles"
					errorMessage="매장 이미지를 등록해주세요."
					:thumbnail="{ enable: true }" 
					:fileRequired="true"
					@upload-error="$emit('upload-error')"
					@upload-success="$emit('upload-success');"
				/>  
		</q-card-section>
  <!-- </q-form> -->
</template>

<script setup>
import { inputEmptyCheck } from '/src/utils/validate-rules';
import { firstNumberOptions } from 'src/options/common';

const emits = defineEmits([
  'upload-success', // 업로드 성공
  'upload-error'    // 업로드 실패
]);

const props = defineProps({
	changeDistrictByOptions: {
		type: Function
	},
	// select options  
	options : {
		type: Object
	}
});
// apply info
const form = defineModel();
</script>
