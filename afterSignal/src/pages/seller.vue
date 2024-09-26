<template>
  <!--
		** vite-plugin-vue-layouts은  /pages 폴더의 root 레벨에만 적용 **

		** 하위 경로에서 사용할 경우 /pages 하위에 동일한 페이지명이 존재해야한다.
					ㄴ /pages
						ㄴ seller.vue
						ㄴ /seller
								ㄴ index.vue
								ㄴ shop.vue
	-->
  <router-view />
</template>
