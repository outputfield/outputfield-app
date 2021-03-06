export interface ITextProps {
  color?: string;
  size: "H1" | "H2" | "T1" | "T2" | "T3";
  textAlign?: "left" | "center" | "right";
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  parseHtml?: boolean;
  children?: string | React.ReactNode | React.ReactNodeArray;
}

export interface IStyles {
  color?: string;
  textAlign?: "left" | "center" | "right";
  marginLeft?: number | string;
  marginRight?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
}
