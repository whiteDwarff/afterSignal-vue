<template>
  <q-card flat class="user-form-wrap q-py-xl">
    <div class="text-center q-mb-lg">
      <span class="text-h4">Forgot E-mail</span>
    </div>
    <q-form @submit.prevent="findUserEmail">
      <!-- 이름 -->
      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">* Name</small>
        <q-input
          v-model="form.name"
          dense
          outlined
          color="red-3"
          maxlength="5"
          :rules="[(val) => inputEmptyCheck(val, '이름을')]"
          lazy-rules
          hide-bottom-space
        />
      </q-card-section>
      <!-- 휴대폰 번호 -->
      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">* Mobile phone</small>
        <div class="row q-col-gutter-sm">
          <q-select
            v-model="form.firstTel"
            class="col-6"
            color="red-3"
            :options
            dense
            options-dense
            outlined
            map-options
            emit-value
          ></q-select>
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

      <q-card-section class="q-mt-xl text-center">
        <q-btn
          id="user-form-submit-btn"
          label="SUBMIT"
          type="submit"
          class="border bg-red-2 text-white"
          size="md"
        />
      </q-card-section>
    </q-form>
    <!-- Dialog -->
    <BaseDialog v-model="isDialog" label="Forgot E-mail">
      <div class="text-center">
        <div class="q-mt-md">
          <table class="full-width" style="border-collapse: collapse">
            <tbody>
              <tr>
                <td class="border q-py-sm">
                  {{ form.name }}님의 이메일 입니다.
                </td>
              </tr>
              <tr>
                <td class="border q-py-md">
                  <template v-if="!form.isMasked">
                    <span class="text-subtitle2 underline-hover">
                      {{ form.maskedEmail }}
                    </span>
                    <q-btn
                      @click="form.isMasked = true"
                      class="q-ml-md bg-teal-2 text-white border"
                      dense
                      unelevated
                      label="마스크 제거"
                    />
                  </template>
                  <template v-else>
                    <span class="text-subtitle2 underline-hover">
                      {{ form.email }}
                    </span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <q-btn
          @click="$router.push('/user/signIn')"
          class="full-width q-mt-lg border bg-deep-purple-3 text-white"
          label="LOGIN"
        />
      </div>
    </BaseDialog>
  </q-card>
</template>

<script setup>
import { inputEmptyCheck, validateTel } from '/src/utils/validate-rules';
import { firstTelOptions as options } from 'src/options/common';

const isDialog = ref(false);

const form = ref({
  name: '',
  firstTel: '010',
  otherTel: '',
  tel: '',
  isMasked: false,
});

const findUserEmail = async () => {
  form.value.tel = `${form.value.firstTel}-${form.value.otherTel}`;
  isLoadingState.value = true;
  try {
    const { data } = await api.post('/user/findUserEmail', form.value);

    if (data.status == 200) {
      isDialog.value = true;
      form.value = { ...form.value, ...data.result.info };
    } else {
      baseNotify(data.message);
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
</script>

<style scoped></style>
