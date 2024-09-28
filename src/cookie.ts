function setCookie(name1: string, value1: any, outTime: number) {
    let d = new Date();
    d.setTime(d.getTime() + (outTime * 1000));
    let expires = "expires=" + d.toString();
    document.cookie = name1 + "=" + value1 + ";" + expires + ";path=/";
}

function getCookie(cname: string)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

export default { setCookie, getCookie };