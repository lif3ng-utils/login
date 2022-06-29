import { auth } from "./app";
import { ref } from "vue-demi";

const loginState = ref(null);
const hasLogin = ref(false);
auth.onLoginStateChanged((state) => {
  loginState.value = state;
  hasLogin.value = !!state;
});

const useLoginState = () => loginState;
const useHasLogin = () => hasLogin;

export { auth, useLoginState, useHasLogin };
