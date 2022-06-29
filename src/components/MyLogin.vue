<template>
  <template v-if="!loginState">
    <template v-if="step === 0">
      <input v-model="mail" type="email" />
      <button @click="send">send code</button>
    </template>
    <template v-else-if="step === 1">
      <input v-model="code" />
      <button @click="check">login</button>
    </template>
  </template>
  <template v-else>
    {{ loginState.user.customUserId }}
    <button @click="auth.signOut">logout</button>
  </template>
</template>
<script setup>
import { reactive, ref, watch } from "vue-demi";
import { sendCodeByMail, checkCode } from "../service";
import { auth, useLoginState } from "../tcb/auth";

const loginState = useLoginState();

watch(
  loginState,
  (state) => {
    console.log("state change", state);
  },
  { immediate: true }
);
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
