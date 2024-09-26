<script setup>
import { ref } from 'vue'

const form = ref({
    username: '',
    password: '',
})
const handleSubmit = () => {
    console.log(form.value)
}
</script>

<template>
    <a-row class="row-demo"></a-row>
    <a-row class="row-demo">
        <a-col :span="24">
            <a-space direction="vertical" id="register">
                <h1>注册</h1>
                <a-form :model="form" style="width: 300px" direction="vertical">
                    <a-form-item label="用户名">
                        <a-input v-model="form.username" />
                    </a-form-item>
                    <a-form-item label="密码">
                        <a-input v-model="form.password" />
                    </a-form-item>
                    <a-button type="primary" status="success" @click="handleSubmit">注册</a-button>
                </a-form>
            </a-space>
        </a-col>
    </a-row>
</template>

<style scoped>
.row-demo {
    text-align: center;
    height: 100px;
    line-height: 100px;
}

#register {
    border: 2px solid black;
    padding-top: 1px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 40px;
    display: inline-block;
}
</style>