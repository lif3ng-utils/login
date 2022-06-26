import axios from "axios";

const instance = axios.create({
  baseURL: "https://tcb.lif3ng.cn/login",
});

instance.interceptors.response.use((res) => res.data);

export const sendCodeByMail = (data) => instance.post("/by-mail", data);

export const checkCode = (data) => instance.post("/check-code", data);
