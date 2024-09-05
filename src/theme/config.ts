import type { ThemeConfig } from 'antd';
import {lightTheme,darkTheme} from './pureTheme'

export const defaultTheme = "light"
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
export function getTheme(theme: string): ThemeConfig {
  // @ts-ignore
  return themes[theme] || themes[defaultTheme];
}