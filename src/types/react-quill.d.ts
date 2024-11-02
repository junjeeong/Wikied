declare module "react-quill" {
  import { Component } from "react";

  export interface QuillOptions {
    theme?: string;
    modules?: object;
    formats?: string[];
    placeholder?: string;
  }

  export interface ReactQuillProps {
    value?: string;
    onChange?: (
      content: string,
      delta: any,
      source: string,
      editor: any
    ) => void;
    theme?: string;
    modules?: object;
    formats?: string[];
    placeholder?: string;
    readOnly?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    className?: string;
  }

  export class ReactQuill extends Component<ReactQuillProps> {}
  export default ReactQuill;
}
