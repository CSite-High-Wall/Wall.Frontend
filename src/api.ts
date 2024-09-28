import axios from "axios";
import Cookie from "../src/cookie";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 1000,
});

export async function Register(username: string, password: string) {
  try {
    var response = await instance.post("/api/register", {
      user_name: username,
      password: password,
    });

    Cookie.setCookie(
      "userid",
      response.data.data.user_id,
      response.data.data.expire_time
    );
    Cookie.setCookie(
      "token",
      response.data.data.access_token,
      response.data.data.expire_time
    );

    return {
      success: true,
      message: "注册成功",
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        "注册失败，" + err.code == "ECONNABORTED"
          ? "连接出现错误"
          : err.response.data.message,
    };
  }
}

export async function Authenticate(username: string, password: string) {
  try {
    var response = await instance.post("/api/authserver/authenticate", {
      user_name: username,
      password: password,
    });

    Cookie.setCookie(
      "userid",
      response.data.data.user_id,
      response.data.data.expire_time
    );
    Cookie.setCookie(
      "token",
      response.data.data.access_token,
      response.data.data.expire_time
    );

    return {
      success: true,
      message: "登录成功，欢迎回来 " + username,
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        "登录失败，" + err.code == "ECONNABORTED"
          ? "连接出现错误"
          : err.response.data.message,
    };
  }
}

export async function Validate() {
  if (Cookie.getCookie("token") == "") return false;

  try {
    await instance.post("/api/authserver/validate", {
      user_id: Cookie.getCookie("userid"),
      access_token: Cookie.getCookie("token"),
    });

    return true;
  } catch {
    return false;
  }
}

export default instance;
