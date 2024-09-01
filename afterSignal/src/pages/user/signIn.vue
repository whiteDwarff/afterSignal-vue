<template>
  <q-card flat class="user-form-wrap q-py-xl">
    <div class="text-center q-mb-lg">
      <span class="text-h4">Sign In</span>
    </div>
    <q-form @submit.prevent>
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
          label="Remember login info"
          color="deep-purple-3"
          class="q-mt-md"
        />
      </q-card-section>

      <q-card-section class="q-mt-md text-center">
        <q-btn
          label="SUBMIT"
          type="submit"
          id="user-form-submit-btn"
          class="bg-red-3 text-white border"
          unelevated
          size="lg"
        />
      </q-card-section>

      <q-separator class="q-my-md bg-grey-86" />

      <q-card-section class="q-mt-md">
        <div class="row q-col-gutter-y-md">
          <div class="col-12 col-md-6 text-center decoration-none">
            <router-link to="/user/findEmail" class="text-grey-9">
              FORGOT ID
            </router-link>
            <router-link to="/user/findPW" class="text-grey-9"
              >&nbsp;/&nbsp;PW</router-link
            >
          </div>
          <div class="col-12 col-md-6 text-center decoration-none">
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

const passwordType = ref(false);

const form = ref({
  email: '',
  password: '',
  isLoginInfoSaved: false,
});
</script>

<style scoped></style>
