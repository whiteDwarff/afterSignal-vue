/**
 * 파일 확장자 검사
 * @param { string } fileName 파일명
 * @param { arr } extArr 포함여부 확인할 확장자 배열
 *  */
export function fileExtCheck({ name: fileName }, extArr) {
  const lastDot = fileName.lastIndexOf('.');
  const ext = fileName.substring(lastDot, fileName.length).toLowerCase();

  return !extArr.includes(ext) ? true : false;
}
