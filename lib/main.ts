import { Plugin } from 'vite';
import { injectMobileSimulatorScript, MobileSimulatorConfig } from './stick_script';


export default function mobileSimulatorPlugin(config: MobileSimulatorConfig): Plugin {
  return {
    name: 'vite-plugin-mobile-simulator',
    apply: 'serve',
    transformIndexHtml(html: string): string {
      // 将 TypeScript 脚本作为模块引入
      const configStr = JSON.stringify(config);
      const script = `
        <script>
          const initMobileSimulator = ${injectMobileSimulatorScript.toString()}
          initMobileSimulator(${configStr});
        </script>
      `;
      // 将脚本插入到 HTML 的末尾
      return html.replace('</body>', `${script}</body>`);
    },
  };
}