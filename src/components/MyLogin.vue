<template>
  <template v-if="step === 0">
    <input v-model="mail" type="email" />
    <button @click="send">send code</button>
  </template>
  <template v-else-if="step === 1">
    <input v-model="code" />
    <button @click="check">login</button>
  </template>
</template>
<script setup>
import { reactive, ref } from "vue-demi";
import { sendCodeByMail, checkCode } from "../service";
import tcb from "@cloudbase/js-sdk";

const app = tcb.init({
  env: "env1-119983",
});

const auth = app.auth();
console.log({ auth });
const step = ref(0);
const mail = ref("");
const code = ref("");
const checkParams = reactive({});

const emit = defineEmits(["success"]);
const send = async () => {
  const { id } = await sendCodeByMail({ mail: mail.value });
  if (id) {
    checkParams.id = id;
  }
  step.value = 1;
};

const check = async () => {
  const { ticket } = await checkCode({
    ...checkParams,
    code: code.value,
  });
  console.log({ ticket });
  await auth.customAuthProvider().signIn(ticket);
  emit("success");
};
</script>
