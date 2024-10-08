<template>
  <q-card flat class="user-form-wrap q-py-xl">
    <div class="text-center q-mb-lg">
      <span class="text-h4">Sign In</span>
    </div>
    <q-form @submit.prevent="signIn">
      <!-- 이메일 -->
      <q-card-section class="q-pb-none">
        <small class="block q-mb-sm">* E-mail</small>
        <q-input
          v-model="form.email"
          dense
          outlined
          color="red-3"
          maxlength="50"
          :rules="[validateEmail]"
          lazy-rules
          hide-bottom-space
        />
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

        <q-checkbox
          dense
          v-model="form.isLoginInfoSaved"
          label="Remember Me"
          color="deep-purple-3"
          class="q-mt-md"
        />
      </q-card-section>

      <q-card-section class="q-mt-md text-center">
        <q-btn
          label="SUBMIT"
          type="submit"
          id="user-form-submit-btn"
          class="bg-red-2 text-white border"
          size="md"
        />
      </q-card-section>

      <q-separator class="q-my-md bg-grey-86" />

      <q-card-section class="q-mt-md">
        <div class="row q-col-gutter-y-md">
          <div class="col-12 col-sm-6 text-center decoration-none">
            <router-link
              to="/user/findEmail"
              class="text-grey-9 underline-hover"
            >
              FORGOT E-MAIL
            </router-link>
            &nbsp;/&nbsp;
            <router-link to="/user/findPW" class="text-grey-9 underline-hover"
              >PW</router-link
            >
          </div>
          <div class="col-12 col-sm-6 text-center decoration-none">
            <router-link to="/user/signUp" class="text-grey-9"
              >SIGN UP</router-link
            >
          </div>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { validateEmail, validatePassword } from '/src/utils/validate-rules';

import { useSystemStore } from 'src/stores/systemStore';
import { useServiceUserStore } from 'src/stores/serviceUserStore';
import { storeToRefs } from 'pinia';
import { setCookies } from 'src/utils/common';

const systemStore = useSystemStore();
const serviceUserStore = useServiceUserStore();
const { isLoadingState } = storeToRefs(systemStore);

const router = useRouter();
const route = useRoute();

const passwordType = ref(false);

const form = ref({
  email: '',
  password: '',
  isLoginInfoSaved: false,
});

// 로그인
const signIn = async () => {
  isLoadingState.value = true;
  try {
    const { data } = await api.post('/user/signInUser', form.value);
    if (data.status == 200) {
      // 쿠키에 로그인 정보 저장
      if (form.value.isLoginInfoSaved)
        setCookies('serviceUser', data.result.user, '/');

      serviceUserStore.setUser(data.result.user);
      baseNotify(`${data.result.user.name}님 환영합니다 😃`);
      // 라우터네비게이션가드를 통해 로그인 페이지로 왔다면 직전 페이지로 이동
      const redirectionPath = route.redirectedFrom?.fullPath || '/';
      router.push(redirectionPath);
    } else {
      baseNotify(data.result.msg, { type: 'warning' });
    }
  } catch (err) {
    console.log(err);
    alert(err);
  } finally {
    isLoadingState.value = false;
  }
};
</script>

<style scoped></style>
