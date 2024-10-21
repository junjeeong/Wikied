// global.d.ts
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}
