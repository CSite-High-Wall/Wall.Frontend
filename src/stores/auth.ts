import { defineStore } from "pinia";
import { ref } from "vue";
import instance from "../api";
import cookie from "../cookie";

export const AuthState = ref(false);

export const UserName = ref("");
export const AvatarUrl = ref("");
export const UserId = ref("");
export const CreatedAt = ref("");
export const LastLoginTime = ref("");

export const useAuthStore = defineStore("auth", {
  state: () => {
    return { AuthState: false };
  },
  actions: {
    setAuthState(state: boolean) {
      this.$state.AuthState = state;
      AuthState.value = state;
    },
  },
});

export function ClearUserInfo() {
  UserId.value = ""
  UserName.value = "null"
  AvatarUrl.value = ""
  CreatedAt.value = ""
  LastLoginTime.value = ""
}

export async function RefreshUserInfo() {
  try {
    var response = await instance.get("/api/profile/user-info", {
      headers: { Authorization: "Bearer " + cookie.getCookie("token") },
    });

    UserId.value =response.data.data.user_id
    UserName.value = response.data.data.user_name
    AvatarUrl.value = response.data.data.avatar_url
    CreatedAt.value = response.data.data.created_at
    LastLoginTime.value =  new Date(response.data.data.last_login_time).toLocaleString()

    return {
      success: true,
      message: "获取用户个人信息成功",
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        "获取用户个人信息失败，" + (err.code == "ECONNABORTED"
          ? "连接出现错误"
          : err.response.data.message),
    };
  }
}