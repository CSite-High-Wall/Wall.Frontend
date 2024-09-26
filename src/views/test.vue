<template>
    <div class="grid-demo-background">
      <a-space direction="vertical" :size="16" style="display: block;">
        <a-row class="grid-demo">
          <a-col :span="24">
            <div>12 - 50%</div>
          </a-col>
        </a-row>
      </a-space>
    </div>
  </template>
  
  <style scoped>
  .grid-demo {
    height: 48px;
    line-height: 48px;
    text-align: center;
  }
  </style>
  