<template>
  <q-card flat class="border no-border-radius">
    <q-form @submit.prevent="submit" class="full-width row">
      <q-card-section class="col-12 col-md-8">
        <q-card-section class="q-py-none">
          <small class="block q-mb-sm">E-mail</small>
          <q-input
            v-model="form.email"
            class="bg-grey-3"
            dense
            outlined
            maxlength="50"
            readonly
          />
        </q-card-section>
        <!-- 이름 -->
        <q-card-section class="q-pb-none">
          <small class="block q-mb-sm">Name</small>
          <q-input
            v-model="form.name"
            class="bg-grey-3"
            dense
            outlined
            maxlength="5"
            readonly
          />
        </q-card-section>
        <!-- 닉네임 -->
        <q-card-section class="q-pb-none">
          <small class="block q-mb-sm">Nickname</small>
          <div class="row q-col-gutter-x-sm input-focus items-center">
            <q-input
              v-model="form.nickname"
              :readonly="form.isNicknameCheck"
              :bg-color="form.isNicknameCheck ? 'grey-3' : 'white'"
              class="col-8"
              dense
              outlined
              maxlength="10"
              lazy-rules
              hide-bottom-space
            />
            <div class="col-1 flex justify-center">
              <q-btn
                @click="reset"
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
                @click="duplicateInfoCheck"
                class="full-width bg-deep-purple-3 text-white border"
                flat
                label="check"
                style="height: 40px"
              />
            </div>
          </div>
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
        <!-- 휴대폰 번호 -->
        <q-card-section class="q-pb-none">
          <small class="block q-mb-sm">* Mobile phone</small>
          <div class="row q-col-gutter-sm">
            <q-select
              v-model="form.firstTel"
              dense
              outlined
              color="red-3"
              class="col-6"
              options-dense
              :options="firstTelOptions"
            />
            <q-input
              v-model="form.otherTel"
              dense
              outlined
              class="col-6"
              mask="####-####"
              minlength="8"
              maxlength="9"
              :rules="[(val) => validateTel(form)]"
              lazy-rules
              hide-bottom-space
            />
          </div>
        </q-card-section>
        <!-- 도시, 지역구 -->
        <q-card-section class="q-pb-none">
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <small class="block q-mb-sm">CITY</small>
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
              <small class="block q-mb-sm">DISTRICT</small>
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
      </q-card-section>
      <!-- 프로필 이미지 -->
      <q-card-section id="profile-col" class="col-12 col-md-4">
        <!-- <div class="full-height flex justify-center items-center"> -->
        <div
          id="profile-box"
          class="full-height flex justify-center items-center"
        >
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
                  <q-icon
                    name="sym_o_add_circle"
                    class="q-mr-sm"
                    color="teal"
                  />
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
                  <q-icon name="delete" class="q-mr-sm" color="red" />
                  DELETE
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            class="full-width bg-blue-grey-2 text-white q-mt-auto border"
            id="submit-btn"
            type="submit"
            label="SUBMIT"
          />
        </div>

        <!-- hidden input -->
        <input
          type="file"
          ref="fileInput"
          id="fileInput"
          class="hidden"
          @change="setUserThumbnail"
          accept=".jpg,.jpeg,.png"
        />
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { firstTelOptions } from 'src/options/common';
import { inputEmptyCheck, validateTel } from '/src/utils/validate-rules';
import { getCookies, setCookies } from 'src/utils/common';

// store ---------------------------
const systemStore = useSystemStore();
const { isLoadingState } = storeToRefs(systemStore);

const serviceUserStore = useServiceUserStore();
const { serviceUser } = storeToRefs(serviceUserStore);

const telArr = serviceUser.value.tel.split('-');

// props ---------------------------
const props = defineProps({
  viewMode: {
    type: String,
  },
});
const options = ref({});

const form = ref({
  firstTel: telArr[0],
  otherTel: `${telArr[1]}-${telArr[2]}`,
  ...serviceUser.value,
  gender: serviceUser.value?.gender || 'M', // gender 값이 없을 경우 기본 값
  orgNickname: serviceUser.value.nickname, // 기존에 사용중인 닉네임
  isNicknameCheck: false, // 닉네임 변경 체크할 상태변수
});

const changedProfileImage = ref(null);

// 공통코드 조회
const getCommCode = async () => {
  isLoadingState.value = true;

  try {
    const { data } = await api.post('/user/signUp');
    const result = data.result;
    const key = form.value.city;
    // object[key] > result의 시(도) 코드를 통해 지역구 할당
    options.value = { ...result, district: [...result[key]] };
    if (!form.value.district)
      form.value.district = options.value.district[0].value;
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
getCommCode();

// 도시 셀렉트 태그 변경 시 지역구 데이터 변경
const changeDistrictByOptions = (val) => {
  form.value.district = options.value[val][0].value;
  options.value.district = options.value[val];
};
// 닉네임 중복체크
const duplicateInfoCheck = async () => {
  // 현재 사용자의 닉네임과 동일하다면 진행x
  if (serviceUser.value.nickname == form.value.nickname) return;
  if (!form.value.nickname)
    return baseNotify('닉네임을 입력해주세요.', { type: 'warning' });

  isLoadingState.value = true;

  try {
    const { data } = await api.post('/user/duplicatedInfoCheck', {
      ...form.value,
      flg: 'nickname',
    });
    if (data.result.count > 0) return baseNotify('중복된 닉네임이 존재합니다');
    else if (confirm('해당 닉네임을 사용하시겠습니까?')) {
      form.value.isNicknameCheck = true;
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoadingState.value = false;
  }
};
// 닉네임 리셋
const reset = () => {
  form.value.nickname = form.value.orgNickname;
  form.value.isNicknameCheck = false;
};
// 회원정보 수정
const submit = async () => {
  if (
    form.value.nickname != form.value.orgNickname &&
    !form.value.isNicknameCheck
  )
    return baseNotify('닉네임 중복체크를 해주세요.', { type: 'warning' });

  if (!confirm('회원정보를 저장하시겠습니까?')) return;

  // 전화번호
  form.value.tel = `${form.value.firstTel}-${form.value.otherTel}`;

  // FormData에 form key, value 추가
  const formData = new FormData();
  for (let key of Object.keys(form.value)) {
    formData.append(key, form.value[key]);
  }

  formData.append('dir', 'profile');
  formData.append('image', changedProfileImage.value);

  isLoadingState.value = true;

  try {
    const { data } = await api.post('/user/updateInfo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(data);
    if (data.status == 200) {
      // store에 저장된 사용자 정보 갱신
      baseNotify('프로필이 변경되었습니다.');
      serviceUserStore.setUser(data.result.user);
      // 쿠키에 저장된 정보가 잇다면 갱신
      if (getCookies('serviceUser'))
        setCookies('serviceUser', data.result.user);

      form.value.isNicknameCheck = false;
    } else {
      baseNotify('프로필이 변경에 실패하였습니다.', { type: 'warning' });
    }
  } catch (err) {
    console.log(err);
    baseNotify('프로필 변경 error', { type: 'warning' });
  } finally {
    isLoadingState.value = false;
  }
};

// file input 참초 객체
const fileInput = ref(null);
// 프로필 이미지 선택 시 썸네일 노출
const setUserThumbnail = (event) => {
  const files = event.target?.files;
  if (files.length > 0) {
    const file = files[0];
    changedProfileImage.value = file;

    const extArr = process.env.PROFILE_EXT.split(',');
    if (fileExtCheck(file, extArr)) {
      return baseNotify(`${extArr.join(', ')} 확장자만 등록 가능합니다.`, {
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

<style scoped>
@media screen and (max-width: 1024px) {
  #profile-box {
    display: block;
    text-align: center;
  }
  #submit-btn {
    display: block;
    margin: 30px auto 0 auto !important;
    width: 50% !important;
  }
}
</style>
