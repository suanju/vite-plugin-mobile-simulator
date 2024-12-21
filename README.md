
# vite-plugin-mobile-simulator

## 用途

- 如果您的项目为移动段项目没有做响应式布局，且PC端打开不太大程度影响使用体验，则可以使用本插件。将在浏览器上使用iframe的方式，实现PC端模拟移动端宽高比。

## 安装 (yarn or npm)

```bash
yarn add vite-plugin-mobile-simulator -D
# or
npm i vite-plugin-mobile-simulator -D
# or
pnpm install vite-plugin-mobile-simulator -D
```

## 使用方法

- vite.config.ts 中的配置插件 (基础使用)

```ts
import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import mobileSimulatorPlugin from 'vite-plugin-mobile-simulator';

export default defineConfig({
  plugins: [vue(), mobileSimulatorPlugin()],
})

```

- vite.config.ts 中的配置插件 (配置文件)

```ts
import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import mobileSimulatorPlugin from 'vite-plugin-mobile-simulator';

export default defineConfig({
  plugins: [vue(), mobileSimulatorPlugin({
    mobileThreshold: 768, // 手机阈值，当屏幕宽度小于该值时，显示手机模拟器
    frameWidth: 375, // 框架宽度
    frameHeight: 767, // 框架高度
    borderColor: '#b0b0b0', // 边框颜色
    backgroundColor: '#d6d6d6', // 背景颜色
    statusBarbackgroundColor: "#ffffff", // 状态栏背景颜色
    bodyBarbackgroundColor: '#ffffff', // 内容区域背景颜色
  })],
})

```