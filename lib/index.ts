import { Plugin } from 'vite';
import { injectMobileSimulatorScript, MobileSimulatorConfig } from './stick_script';

export default function mobileSimulatorPlugin(config: MobileSimulatorConfig): Plugin {
  return {
    name: 'vite-plugin-mobile-simulator',
    // 作用于开发和生产模式
    apply: 'build',
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
    // 针对生产模式：处理生成的 HTML 文件
    generateBundle(_, bundle) {
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === 'asset' && fileName.endsWith('.html')) {
          const html = chunk.source as string;
          const configStr = JSON.stringify(config);
          const script = `
            <script>
              const initMobileSimulator = ${injectMobileSimulatorScript.toString()}
              initMobileSimulator(${configStr});
            </script>
          `;
          // 修改 HTML 内容
          chunk.source = html.replace('</body>', `${script}</body>`);
        }
      }
    },
  };
}
