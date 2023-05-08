import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme  {
    bgColor: string,
    darkColor: string,
    textColor: string,
    accentColor: string,
  }
}
