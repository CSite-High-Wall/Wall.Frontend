<script setup>
import { Edit,Check } from '@element-plus/icons-vue'
import { ref } from 'vue'

const input = ref('')
const review = ref([
    {
        id: 1,
        name: 'John Doe',
        content: "My name is John Doe.",
        isEditing: false
    },
    {
        id: 2,
        name: 'Jane Smith',
        content: "My name is Jane Smith.",
        isEditing: false
    },
    {
        id: 3,
        name: 'Bob Johnson',
        content: "My name is Bob Johnson.",
        isEditing: false
    }
])
</script>
<template>
    <div v-for="item in review" class="review">
        <h1>{{ item.name }}</h1>
        <p>{{ item.content }}</p>
        <el-button type="success" v-if="!item.isEditing" :icon="Edit" circle @click="item.isEditing = true"/>
        <div>
            <el-input v-model="input" placeholder="请输入评论内容" style="width: 300px" v-if="item.isEditing" clearable/>
            <el-button type="success" v-if="item.isEditing" :icon="Check" circle @click="item.content = input; item.isEditing = false; input = '';"/>
        </div>
    </div>
</template>
<style scoped>
.review {
    border: 1px solid black;
    width: 500px;
}
</style>