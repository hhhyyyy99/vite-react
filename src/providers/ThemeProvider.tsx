"use client"

import {ConfigProvider} from 'antd';
import {ReactNode} from 'react';
// import {getTheme} from '@/theme';
// import {useThemeStore} from '@/store/theme';
import {lightTheme} from "@/theme/pureTheme";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({children}: ThemeProviderProps) => {
  // const {theme} = useThemeStore();
  // const themeConfig = getTheme(theme);
  return <ConfigProvider theme={lightTheme}>
      {children}
    </ConfigProvider>

};

export default ThemeProvider;
