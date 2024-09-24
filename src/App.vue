<script setup>
import { ref } from 'vue'
const state = ref({ count: 0 })
</script>
<template>
    <div>{{ state.count }}</div>
    <button @click="state.count++">+1</button>
</template>
<style></style>