const helper = {
 // 根据name获取地址栏的参数值
 getQueryString (name) {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  let hash = window.location.hash
  let search = hash.split('?')
  let r = search[1] && search[1].match(reg)
  if (r != null) return r[2]; return ''
 },
 // 拼接参数至url
 queryString (url, query) {
  let str = []
  for (let key in query) {
   str.push(key + '=' + query[key])
  }
  let paramStr = str.join('&')
  return paramStr ? `${url}?${paramStr}` : url
 },
  
// 自定义判断元素类型JS
 toType(obj) {
     return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    },
// 参数过滤函数
 filterNull(o) {
     for (var key in o) {
      if (o[key] === null) {
       delete o[key]
      }
      if (toType(o[key]) === 'string') {
       o[key] = o[key].trim()
      } else if (toType(o[key]) === 'object') {
       o[key] = filterNull(o[key])
      } else if (toType(o[key]) === 'array') {
       o[key] = filterNull(o[key])
      } else if (toType(o[key]) === 'number') {
       o[key] = filterNull(o[key])
      }
     }
     return o
    }
 
}
export default helper