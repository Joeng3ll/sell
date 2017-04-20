/**
 * Created by joeng on 2017/4/20.
 */
export function formateDate(date, fmt) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}
