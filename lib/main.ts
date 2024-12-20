import { Plugin } from 'vite';
import { injectMobileSimulatorScript } from './stick_script';


export default function mobileSimulatorPlugin(): Plugin {
  return {
    name: 'vite-plugin-mobile-simulator',
    apply: 'serve',
    transformIndexHtml(html: string): string {
      // 将 TypeScript 脚本作为模块引入
      const script = `
        <script>
          const initMobileSimulator = ${injectMobileSimulatorScript.toString()}
          initMobileSimulator();
        </script>
      `;
      // 将脚本插入到 HTML 的末尾
      return html.replace('</body>', `${script}</body>`);
    },
  };
}