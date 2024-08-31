import { Notify } from 'quasar';
/**
 * @param { string } message notify 메시지 ( 필수값 )
 * @param { object } [options={}] 그 외 옵션, 기본값 : {}
 */
export function baseConfirm(message, options = {}) {
  return new Promise((resolve) => {
    Notify.create({
      message,
      html: true,
      type: options?.type || '',
      timeout: 2000,
      progress: true,
      actions: [
        {
          label: '취소',
          color: 'red',
          handler: () => resolve(false),
        },
        {
          label: '확인',
          handler: () => resolve(true),
        },
      ],
      ...options,
    });
  });
}
/**
funtion a()  {
  baseConfirm(message, {options})
  .then((result) => {
    if (result) {
      // 확인 버튼이 클릭되었을 때 수행할 작업
      console.log('확인되었습니다.');
      } else {
        // 취소 버튼이 클릭되었을 때 수행할 작업
      console.log('취소되었습니다.');
      }
      });
}
 *  */
