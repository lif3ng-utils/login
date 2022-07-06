<template>
  <template v-if="!loginState">
    <template v-if="step === 0">
      <input
        v-model="mail"
        type="email"
        :class="inputClass"
        placeholder="email"
        required
      />
      <button @click="send" :class="btnClass" :disabled="loading">
        <i class="i-eos-icons-loading vertical-bottom" v-if="loading" />
        send code
      </button>
    </template>
    <template v-else-if="step === 1">
      <input v-model="code" :class="inputClass" />
      <button @click="check" :class="btnClass" :disabled="loading">
        <i class="i-eos-icons-loading vertical-bottom" v-if="loading" />
        login
      </button>
    </template>
  </template>
  <template v-else>
    {{ loginState.user.customUserId }}
    <button @click="auth.signOut" :class="btnClass">logout</button>
  </template>
</template>
<script setup>
import { reactive, ref, watch } from "vue-demi";
import { sendCodeByMail, checkCode } from "../service";
import { auth, useLoginState } from "../tcb/auth";

const loginState = useLoginState();
const loading = ref(false);

const inputClass = "rounded-8 px-4 py-2 b-1 outline-none focus:bg-blue-100";
const btnClass =
  "rounded-8 outline-none hover:bg-blue-100 cursor-pointer px-4 py-2 b-1 ml-2";
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
  loading.value = true;
  try {
    const { id } = await sendCodeByMail({ mail: mail.value });
    loading.value = false;
    if (id) {
      checkParams.id = id;
    }
    step.value = 1;
  } finally {
    loading.value = false;
  }
};

const check = async () => {
  loading.value = true;
  try {
    const { ticket } = await checkCode({
      ...checkParams,
      code: code.value,
    });
    console.log({ ticket });
    await auth.customAuthProvider().signIn(ticket);
    mail.value = code.value = "";
    step.value = 0;
  } finally {
    loading.value = false;
  }
};
</script>
