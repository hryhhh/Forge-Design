declare module "vite-plugin-sass" {
  import { Plugin } from "vite";
  const sassPlugin: () => Plugin;
  export default sassPlugin;
}
