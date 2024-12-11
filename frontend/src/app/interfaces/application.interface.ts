export interface IApplication {
  name?: string;
  description?: string;
  theme?: ITheme[];
  components?: IComponents;
}

interface ITheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    success: string;
    warning: string;
    danger: string;
    dark: string;
    medium: string;
    light: string;
  };
  favicon: string;
  logo: string;
}

interface IComponents {
  header?: any;
  footer?: any;
  sidebar?: any;
}
