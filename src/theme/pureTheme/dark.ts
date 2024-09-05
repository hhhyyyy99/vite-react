import type { ThemeConfig } from 'antd';
import {theme} from 'antd';

export const darkTheme: ThemeConfig = {
  token: {
    // 定义暗黑主题的 token
    colorPrimary: '#1890ff',
    colorBgBase: '#000000',
  },
  algorithm: theme.darkAlgorithm,
};