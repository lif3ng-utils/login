<script setup>
import { useHasLogin } from "../lib/entry";
const hasLogin = useHasLogin();
console.log({ hasLogin });
</script>

<template>
  <my-login />
  <div>{{ hasLogin ? "已登录" : "未登录" }}</div>
</template>

<style></style>
