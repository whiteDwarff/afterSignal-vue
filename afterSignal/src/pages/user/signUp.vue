<template>
  <q-card flat class="user-form-wrap q-py-xl">
    <div class="text-center q-mb-lg">
      <span class="text-h4">Sign up</span>
    </div>
    <q-form @submit.prevent="signUpUser">
      <!-- 이메일 -->
      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">* E-mail</small>
        <div class="row q-col-gutter-x-sm">
          <q-input
            v-model="form.email"
            dense
            outlined
            color="red-3"
            maxlength="50"
            class="col-8"
            :bg-color="form.isEmailCheck ? 'grey-3' : 'white'"
            :rules="[validateEmail]"
            lazy-rules
            hide-bottom-space
            :readonly="form.isEmailCheck"
          />
          <div
            class="col-1 text-center flex items-center justify-center"
            style="height: 38px"
          >
            <q-btn
              @click="reset('email')"
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
              @click="duplicateInfoCheck('email')"
              class="full-width bg-deep-purple-3 text-white border"
              flat
              label="check"
              style="height: 40px"
              :disable="form.isEmailCheck"
            />
          </div>
        </div>
      </q-card-section>
      <!-- 비밀번호 -->
      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">* Password</small>
        <q-input
          v-model="form.password"
          dense
          outlined
          color="red-3"
          :type="passwordType ? 'text' : 'password'"
          maxlength="15"
          :rules="[validatePassword]"
          lazy-rules
          hide-bottom-space
        />
      </q-card-section>
      <!-- 비밀번호 확인 -->
      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">* Confirm Password</small>
        <q-input
          v-model="form.passwordConfirm"
          dense
          outlined
          color="red-3"
          :type="passwordType ? 'text' : 'password'"
          maxlength="15"
          :rules="[(val) => validatePasswordConfirm(val, form.password)]"
          lazy-rules
          hide-bottom-space
        >
          <template v-slot:append>
            <q-icon
              :name="passwordType ? 'lock_open' : 'lock'"
              @click="passwordType = !passwordType"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </q-card-section>
      <!-- 닉네임 -->
      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">* Nickname</small>
        <div class="row q-col-gutter-x-sm">
          <q-input
            v-model="form.nickname"
            class="col-8"
            :bg-color="form.isNicknameCheck ? 'grey-3' : 'white'"
            dense
            outlined
            color="red-3"
            maxlength="10"
            :rules="[(val) => inputEmptyCheck(val, '닉네임을')]"
            lazy-rules
            hide-bottom-space
            :readonly="form.isNicknameCheck"
          />
          <div
            class="col-1 text-center flex items-center justify-center"
            style="height: 38px"
          >
            <q-btn
              @click="reset('nickname')"
              :disable="!form.isNicknameCheck"
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
              @click="duplicateInfoCheck('nickname')"
              class="full-width bg-blue-grey-2 text-white border"
              flat
              label="check"
              style="height: 40px"
              :disable="form.isNicknameCheck"
            />
          </div>
        </div>
      </q-card-section>
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
            :options="firstTelOptions"
            dense
            outlined
            class="col-6"
            color="red-3"
            options-dense
            emit-value
            map-options
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

      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">CITY</small>
        <q-select
          v-model="form.city"
          :options="options.city"
          options-dense
          emit-value
          map-options
          dense
          outlined
          color="red-3"
        ></q-select>
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
  </q-card>
</template>

<script setup>
import {
  validateEmail,
  validateEmailBool,
  validatePassword,
  validatePasswordConfirm,
  validateTel,
  inputEmptyCheck,
} from '/src/utils/validate-rules';

import { firstTelOptions } from 'src/options/common';
import { useSystemStore } from 'src/stores/systemStore';
import { storeToRefs } from 'pinia';

const systemStore = useSystemStore();
const { isLoadingState } = storeToRefs(systemStore);

const router = useRouter();

// password type state, false ? password : text
const passwordType = ref(false);
// input form
const form = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  name: '',
  firstTel: '010',
  otherTel: '',
  tel: '',
  isEmailCheck: false, // 이메일 중복체크 여부
  isNicknameCheck: false, // 닉네임 중복체크 여부
});
// select options
const options = ref({});

// 이메일, 닉네임 중복검사 상태 리셋
const reset = (flg) => {
  return flg == 'email'
    ? (form.value.isEmailCheck = false)
    : (form.value.isNicknameCheck = false);
};

// 공통코드 조회
const getCommCode = async () => {
  isLoadingState.value = true;

  try {
    const { data } = await api.post('/user/signUp');
    options.value = { ...data.result };
    form.value.city = data.result.city[0].value;
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
getCommCode();

// 이메일, 닉네임 중복 검사
const duplicateInfoCheck = async (flg) => {
  const str = flg == 'email' ? '이메일' : '닉네임';

  if (flg == 'email' && !validateEmailBool(form.value.email)) return;
  if (flg == 'nickname' && !form.value.nickname) return;

  isLoadingState.value = true;

  try {
    const { data } = await api.post('/user/duplicatedInfoCheck', {
      ...form.value,
      flg,
    });
    if (data.result.count > 0) return baseNotify(`중복된 ${str}이 존재합니다`);
    else if (confirm(`해당 ${str}을 사용하시겠습니까?`)) {
      if (flg == 'email') form.value.isEmailCheck = true;
      else form.value.isNicknameCheck = true;
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
// 회원가입 요청
const signUpUser = async () => {
  if (!form.value.isEmailCheck)
    return baseNotify('이메일 중복검사를 진행해주세요.');

  if (!form.value.isNicknameCheck)
    return baseNotify('닉네임 중복검사를 진행해주세요.');

  form.value.tel = `${form.value.firstTel}-${form.value.otherTel}`;
  isLoadingState.value = true;

  try {
    const res = await api.post('/user/signUpUser', form.value);
    console.log(res);
    alert('회원가입이 완료되었습니다. 로그인 후 이용해주세요.');
    router.push('/user/signIn');
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
</script>

<style scoped></style>
