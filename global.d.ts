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

interface Window {
  Kakao: any; // Kakao SDK의 타입을 정의합니다. 필요하면 정확한 타입으로 수정하세요.
}
