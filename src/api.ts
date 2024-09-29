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

export async function FetchAllExpression() {
  try {
    var response = await instance.get("/api/community/expressions");
    return {
      success: true,
      data: response.data.data.expression_list,
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
      data: new Expression(response.data.data),
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

class Expression {
  public expression_id: any;
  public user_id: any;
  public user_name: string;
  public title: string;
  public content: string;
  public time: string;

  public constructor(data: any) {
    this.expression_id = data.expression_id;
    this.user_id = data.user_id;
    this.user_name = data.user_name;
    this.title = data.title;
    this.content = data.content;
    this.time = data.time;
  }
}

export default instance;
export { Expression };
