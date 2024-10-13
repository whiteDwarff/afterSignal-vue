<template>
	<!-- <q-form> -->
		<q-card-section class="q-pb-none">
			<small class="block q-mb-sm">* OWNER NAME</small>
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
		<!-- 사업자등록번호 -->
		<q-card-section class="q-pb-none">
			<small class="block q-mb-sm">* BUSINESS NUMBER</small>
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
import { inputEmptyCheck } from '/src/utils/validate-rules';

const form = defineModel();
const refFileInput = ref(null);

const deleteBusinessFile = () => {
	form.value.businessRegistration = null;
	refFileInput.value.value = null;
};

</script>
