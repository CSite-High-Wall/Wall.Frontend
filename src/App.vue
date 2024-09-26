<script setup>
import { RouterView } from 'vue-router'
</script>
<template>
    <div class="commom-layout">
        <el-container>
            <el-header>
                <div style="font-size: large;">CSite-High-Wall</div>
                <el-menu mode="horizontal" :router="true">
                    <el-menu-item index="/home">
                        主页
                    </el-menu-item>
                    <el-menu-item index="/myPreview">
                        我的表白
                    </el-menu-item>
                    <el-menu-item index="/userInfo">
                        个人信息
                    </el-menu-item>
                    <el-menu-item index="/login">
                        登录
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <RouterView></RouterView>
            </el-main>
        </el-container>
    </div>
</template>
<style scoped></style>