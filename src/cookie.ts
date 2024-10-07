function setCookie(name1: string, value1: any, outTime: number) {
  let d = new Date();
  d.setTime(d.getTime() + outTime * 1000); // outTime 以秒为单位
  let expires = "expires=" + d.toUTCString(); // 使用 UTC 时间格式
  document.cookie = name1 + "=" + value1 + ";" + expires + ";path=/";
}

function getCookie(cname: string) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

function deleteCookie(name1: string) {
  // 设置过期时间为过去的日期
  document.cookie = name1 + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export default { setCookie, getCookie, deleteCookie };
