import tcb from "@cloudbase/js-sdk";

const app = tcb.init({
  env: "env1-119983",
});

export default app;
export const auth = app.auth();
