import type { ThemeConfig } from 'antd';
import {theme} from 'antd';

export const lightTheme: ThemeConfig = {
  token: {
    // 定义浅色主题的 token
    colorPrimary: "#F7AA00",
    colorTextLightSolid:"#111111",
    colorBgSpotlight:"#fff"
  },
  algorithm:theme.defaultAlgorithm
};