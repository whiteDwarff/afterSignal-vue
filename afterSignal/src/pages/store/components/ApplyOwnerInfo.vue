<template>
	<!-- <q-form> -->
		<q-card-section class="q-pb-none">
			<small class="block q-mb-sm">* Owner Name</small>
			<q-input
				v-model="form.ownerName"
				dense
				outlined
				color="red-3"
				maxlength="5"
				class="col-8"
				:rules="[(val) => inputEmptyCheck(val, '대표자를')]"
				lazy-rules
				hide-bottom-space
			/>
		</q-card-section>

		<EmailInput 
			v-model="form" 
			:duplicated="true"
			@reset="form.isEmailCheck = false, form.email = ''"
			@duplicateCheck="form.isEmailCheck = true"
		/>

		<!-- 비밀번호 -->
		<PasswordInput v-model="form" :validate="true"/>

		<!-- 휴대폰 번호 -->
		<q-card-section class="q-pb-none">
			<small class="block q-mb-sm">* Mobile phone</small>
			<div class="row q-col-gutter-sm">
			<q-select
				v-model="form.firstTel"
				:options="firstTelOptions"
				dense
				outlined
				class="col-6"
				color="red-3"
				options-dense
			/>
        	<q-input
				v-model="form.otherTel"
				dense
				outlined
				class="col-6"
				color="red-3"
				mask="####-####"
				minlength="8"
				maxlength="9"
				:rules="[(val) => validateTel(form)]"
				lazy-rules
				hide-bottom-space
        	/>
        </div>
    </q-card-section>


		<!-- 사업자등록번호 -->
		<q-card-section class="q-pb-none">
			<small class="block q-mb-sm">* business Number</small>
			<q-input
				v-model="form.businessNumber"
				dense
				outlined
				color="red-3"
				maxlength="12"
				minlength="12"
				mask="###-##-#####"
				:rules="[(val) => inputEmptyCheck(val, '사업자등록번호를')]"
				lazy-rules
				hide-bottom-space
			/>
		</q-card-section>
		<q-card-section>
			<small class="block q-mb-sm">* Certificate for Business Registration</small>
			<div class="border q-pa-md rounded-borders flex justify-between items-center">
				<input @change="form.businessRegistration = $event.target.files[0]" ref="refFileInput" type="file" />
				<q-btn
					v-if="form.businessRegistration"
					@click="deleteBusinessFile"
					round
					dense
					size="sm"
					color="black"
					unelevated
				>
					<q-icon name="sym_o_close" color="white"/>
				</q-btn>
			</div>

		</q-card-section>
	<!-- </q-form> -->
</template>

<script setup>
import {
    validateTel,
	inputEmptyCheck,
} from '/src/utils/validate-rules';

import { firstTelOptions } from 'src/options/common';


const form = defineModel();
const refFileInput = ref(null);

const deleteBusinessFile = () => {
	form.value.businessRegistration = null;
	refFileInput.value.value = null;
};

</script>
