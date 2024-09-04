<template>
  <q-card flat class="q-py-lg row border no-border-radius">
    <q-card-section class="col-12 col-md-8 q-pr-none">
      <q-form>
        <q-card-section class="q-py-xs">
          <small class="block q-mb-sm">E-mail</small>
          <q-input
            v-model="form.email"
            dense
            outlined
            color="yellow-4"
            maxlength="50"
            readonly
          />
        </q-card-section>
        <!-- 이름 -->
        <q-card-section class="q-py-xs">
          <small class="block q-mb-sm">Name</small>
          <q-input v-model="form.name" dense outlined maxlength="5" readonly />
        </q-card-section>
        <q-card-section class="q-pb-none">
          <small class="block q-mb-sm">* Gender</small>
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-btn
                @click="form.gender = 'M'"
                class="border full-width"
                :class="{ 'bg-red-2 text-white': form.gender == 'M' }"
                label="Male"
                unelevated
              />
            </div>
            <div class="col-6">
              <q-btn
                @click="form.gender = 'F'"
                class="border full-width"
                :class="{ 'bg-red-2 text-white': form.gender == 'F' }"
                label="Female"
                unelevated
              />
            </div>
          </div>
        </q-card-section>
        <!-- 닉네임 -->
        <q-card-section class="q-py-xs">
          <small class="block q-mb-sm">Nickname</small>
          <div class="row q-col-gutter-x-sm input-focus">
            <q-input
              v-model="form.nickname"
              class="col-9"
              dense
              outlined
              maxlength="10"
              lazy-rules
              hide-bottom-space
            />
            <div class="col-3">
              <q-btn
                class="full-width bg-deep-purple-3 text-white border"
                flat
                label="check"
                style="height: 40px"
              />
            </div>
          </div>
        </q-card-section>
        <!-- 휴대폰 번호 -->
        <q-card-section class="q-py-xs">
          <small class="block q-mb-sm">Mobile phone</small>
          <div class="row q-col-gutter-sm">
            <q-select
              dense
              outlined
              class="col-6"
              options-dense
              emit-value
              map-options
            />
            <q-input
              dense
              outlined
              class="col-6"
              mask="####-####"
              minlength="8"
              maxlength="9"
              lazy-rules
              hide-bottom-space
            />
          </div>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <small class="block q-mb-sm">CITY</small>
              <q-select dense outlined></q-select>
            </div>
            <div class="col-6">
              <small class="block q-mb-sm">DISTRICT</small>
              <q-select dense outlined></q-select>
            </div>
          </div>
        </q-card-section>
      </q-form>
    </q-card-section>

    <q-card-section class="col-12 col-md-4 q-pl-none">
      <div class="full-height flex justify-center items-center">
        <q-btn :ripple="false" flat>
          <q-avatar size="200px" class="cursor-pointer shadow-5">
            <img :src="form.profileImage" alt="user profile" />
          </q-avatar>
          <q-menu :offset="[-150, -30]">
            <q-list>
              <q-item
                @click="fileInput.click()"
                clickable
                v-close-popup
                dense
                class="items-center"
              >
                <q-icon name="sym_o_add_circle" class="q-mr-sm" />
                ADD
              </q-item>
              <q-separator></q-separator>
              <q-item
                :disable="!form.profile"
                clickable
                v-close-popup
                dense
                class="items-center"
              >
                <q-icon name="delete" class="q-mr-sm" />
                DELETE
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <input
        type="file"
        ref="fileInput"
        class="hidden"
        @change="setUserThumbnail"
        accept=".jpg,.jpeg,.png"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
const form = ref({
  email: '',
  name: '',
  gender: 'M',
  nickname: '',
  tel: '',
  city: '',
  district: '',
  profileImage: '' || '/src/assets/common/profile_default.png',
});

// file input 참초 객체
const fileInput = ref(null);
// 프로필 이미지 선택 시 썸네일 노출
const setUserThumbnail = (event) => {
  const files = event.target?.files;
  if (files.length > 0) {
    const file = files[0];

    const extArr = process.env.PROFILE_EXT.split(',');
    if (fileExtCheck(file, extArr)) {
      return baseNotify(`${extArr.join(', ')}확장자만 등록 가능합니다.`, {
        type: 'warning',
      });
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      form.value.profileImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }
};
</script>

<style scoped></style>
