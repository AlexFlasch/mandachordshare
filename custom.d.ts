// allow importing of svg
declare module "*.svg" {
  const content: any;
  export default content;
}