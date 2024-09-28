<template>
  <a-layout>
    <a-layout-sider collapsible breakpoint="xl">
      <a-menu
        :style="{ height: '100%' }"
        :default-open-keys="['1']"
        :default-selected-keys="['1']"
        breakpoint="xl"
      >
        <a-menu-item key="1">
          <template #icon><icon-safe></icon-safe></template>
          个人资料
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon><icon-fire></icon-fire></template>
          管理表白
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>Content</a-layout-content>
  </a-layout>
</template>
