import axios from "axios";
import Cookie from "../src/cookie";
import { Expression, CreateExpression } from "./types";

const instance = axios.create({
  baseURL: "http://115.200.82.154:8000/",
  timeout: 1000,
});

export async function Register(username: string, password: string) {
  try {
    await instance.post("/api/register", {
      user_name: username,
      password: password,
    });

    return {
      success: true,
      message: "注册成功",
    };
  } catch (err: any) {
    console.log(err);

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

export async function FetchAllExpression() {
  try {
    var response = await instance.get("/api/community/expressions");
    var list: Array<Expression> = new Array<Expression>();

    response.data.data.expression_list.forEach((element: any) => {
      list.push(CreateExpression(element));
    });

    return {
      success: true,
      data: list,
    };
  } catch {
    return {
      success: false,
      data: "获取墙贴列表失败",
    };
  }
}

export async function FetchTargetExpression(id: string) {
  try {
    var response = await instance.get(
      "/api/community/expression?expression_id=" + id
    );

    return {
      success: true,
      data: response.data.data,
    };
  } catch (err: any) {
    return {
      success: false,
      data:
        "获取指定墙贴失败, " + err.code == "ECONNABORTED"
          ? "连接出现错误"
          : err.response.data.message,
    };
  }
}

export async function FetchUserExpression() {
  try {
    var response = await instance.get("/api/profile/expressions", {
      headers: { Authorization: "Bearer " + Cookie.getCookie("token") },
    });
    var list: Array<Expression> = new Array<Expression>();

    response.data.data.expression_list.forEach((element: any) => {
      list.push(CreateExpression(element));
    });

    return {
      success: true,
      data: list,
    };
  } catch {
    return {
      success: false,
      data: "获取个人墙贴列表失败",
    };
  }
}

export async function PublishExpression(
  title: string,
  content: string,
  anonymity: boolean
) {
  try {
    await instance.post(
      "/api/express/publish",
      {
        title: title,
        content: content,
        anonymity: anonymity,
      },
      {
        headers: { Authorization: "Bearer " + Cookie.getCookie("token") },
      }
    );

    return {
      success: true,
      message: "发表成功",
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        "发表失败，" + err.code == "ECONNABORTED"
          ? "连接出现错误"
          : err.response.data.message,
    };
  }
}

export default instance;
