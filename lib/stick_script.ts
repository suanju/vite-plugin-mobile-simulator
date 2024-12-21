export interface MobileSimulatorConfig {
  mobileThreshold?: number;
  frameWidth?: number;
  frameHeight?: number;
  borderColor?: string;
  backgroundColor?: string;
  statusBarbackgroundColor?: string;
  bodyBarbackgroundColor?: string;
};


export function injectMobileSimulatorScript({
  mobileThreshold = 768,
  frameWidth = 375,
  frameHeight = 767,
  borderColor = '#b0b0b0',
  backgroundColor = '#d6d6d6',
  statusBarbackgroundColor = "#ffffff",
  bodyBarbackgroundColor = '#ffffff',
}: MobileSimulatorConfig = {}) {

  function setupMobileView() {
    // 检查是否已经在 iframe 中
    if (window.self !== window.top) return;

    // 检查是否已经生成模拟器
    if (document.querySelector('#mobile-wrapper')) return;

    // 创建 iframe
    const iframe = document.createElement('iframe');
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
      `;

    // 将当前页面内容克隆到 iframe 中
    const originalHtml = document.documentElement.outerHTML;
    iframe.onload = function () {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow!.document;
      iframeDoc.open();
      iframeDoc.write(originalHtml);
      iframeDoc.close();
    };

    const phoneFrameId = 'mobile-wrapper'
    // 创建手机外部边框容器
    const phoneFrame = document.createElement('div');
    phoneFrame.id = phoneFrameId;
    phoneFrame.style.cssText = `
          width: ${frameWidth}px;
          height: ${frameHeight}px;
          padding: 10px;
          box-sizing: border-box;
          border: 12px solid ${borderColor};
          border-radius: 40px;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: ${backgroundColor};
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      `;

    // 顶部听筒和状态栏容器
    const topBar = document.createElement('div');
    topBar.style.cssText = `
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
      `;

    // 听筒
    const earpiece = document.createElement('div');
    earpiece.style.cssText = `
          width: 60px;
          height: 6px;
          background: #333;
          border-radius: 3px;
          margin-bottom: 8px;
      `;

    // 状态栏
    const statusBar = document.createElement('div');
    statusBar.style.cssText = `
          width: 100%;
          height: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          box-sizing: border-box;
          font-size: 12px;
          color: #bfbfbf;
          border-radius: 20px 20px 0px 0px;
          background: ${statusBarbackgroundColor};
      `;

    const time = document.createElement('span');
    time.innerText = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    const rightIcons = document.createElement('div');
    rightIcons.style.cssText = `
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
      `;
    const signal = document.createElement('span');
    signal.innerHTML = `
    <svg t="1734702251465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6819" width="12" height="12"><path d="M60.8 1024c-33.6 0-60.8-27.2-60.8-60.8v-243.2c0-33.6 27.2-60.8 60.8-60.8s60.8 27.2 60.8 60.8v243.2c0 33.6-27.2 60.8-60.8 60.8zM361.6 1024c-33.6 0-60.8-27.2-60.8-60.8v-473.6c0-33.6 27.2-60.8 60.8-60.8s60.8 27.2 60.8 60.8v473.6c0 33.6-27.2 60.8-60.8 60.8zM662.4 1024c-33.6 0-60.8-27.2-60.8-60.8v-678.4c0-33.6 27.2-60.8 60.8-60.8s60.8 27.2 60.8 60.8v678.4c0 33.6-27.2 60.8-60.8 60.8zM963.2 1024c-33.6 0-60.8-27.2-60.8-60.8V60.8c0-33.6 27.2-60.8 60.8-60.8s60.8 27.2 60.8 60.8v902.4c0 33.6-27.2 60.8-60.8 60.8z" fill="#bfbfbf" p-id="6820"></path></svg>
    `;
    const wifi = document.createElement('span');
    wifi.innerHTML = `
     <svg t="1734702457803" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9289" width="16" height="16"><path d="M723 620.5C666.8 571.6 593.4 542 513 542s-153.8 29.6-210.1 78.6c-3.2 2.8-3.6 7.8-0.8 11.2l36 42.9c2.9 3.4 8 3.8 11.4 0.9C393.1 637.2 450.3 614 513 614s119.9 23.2 163.5 61.5c3.4 2.9 8.5 2.5 11.4-0.9l36-42.9c2.8-3.3 2.4-8.3-0.9-11.2zM840.4 480.4C751.7 406.5 637.6 362 513 362s-238.7 44.5-327.5 118.4c-3.4 2.8-3.8 7.9-1 11.3l36 42.9c2.8 3.4 7.9 3.8 11.2 1C308 472.2 406.1 434 513 434s205 38.2 281.2 101.6c3.4 2.8 8.4 2.4 11.2-1l36-42.9c2.8-3.4 2.4-8.5-1-11.3z" p-id="9290" fill="#bfbfbf"></path><path d="M957.1 341.4C835.7 241.8 680.3 182 511 182c-168.2 0-322.6 59-443.7 157.4-3.5 2.8-4 7.9-1.1 11.4l36 42.9c2.8 3.3 7.8 3.8 11.1 1.1C222 306.7 360.3 254 511 254c151.8 0 291 53.5 400 142.7 3.4 2.8 8.4 2.3 11.2-1.1l36-42.9c2.9-3.4 2.4-8.5-1.1-11.3z" p-id="9291" fill="#bfbfbf"></path><path d="M512 778m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="9292" fill="#bfbfbf"></path></svg>
      `;
    const battery = document.createElement('span');
    battery.innerHTML = `
    <svg t="1734702375713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8128" width="16" height="16"><path d="M938.667 426.667v-85.334c0-46.933-38.4-85.333-85.334-85.333H128c-46.933 0-85.333 38.4-85.333 85.333v341.334C42.667 729.6 81.067 768 128 768h725.333c46.934 0 85.334-38.4 85.334-85.333v-85.334c23.466 0 42.666-19.2 42.666-42.666v-85.334c0-23.466-19.2-42.666-42.666-42.666zM896 469.333v213.334c0 23.466-19.2 42.666-42.667 42.666H128c-23.467 0-42.667-19.2-42.667-42.666V341.333c0-23.466 19.2-42.666 42.667-42.666h725.333c23.467 0 42.667 19.2 42.667 42.666v128zM128 682.667h554.667V341.333H128v341.334z" fill="#bfbfbf" p-id="8129"></path></svg>
    `;

    rightIcons.appendChild(signal);
    rightIcons.appendChild(wifi);
    rightIcons.appendChild(battery);
    statusBar.appendChild(time);
    statusBar.appendChild(rightIcons);
    topBar.appendChild(earpiece);
    topBar.appendChild(statusBar);

    // 中间屏幕区域
    const screen = document.createElement('div');
    screen.style.cssText = `
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 0px 0px 20px 20px;
          flex: 1;
          overflow: hidden;
      `;
    screen.appendChild(iframe);


    // 底部导航栏
    const navBar = document.createElement('div');
    navBar.style.cssText = `
          width: 30%;
          height: 6px;
          background: #b0b0b0;
          border-radius: 3px;
          margin-top: 6px;
      `;

    // 外部物理按键

    const sideButtonVolumeUp = document.createElement('div');
    sideButtonVolumeUp.style.cssText = `
          position: absolute;
          width: 6px;
          height: 44px;
          background: #777;
          border-radius: 3px;
          top: 20%;
          left: -16px;
      `;

    const sideButtonVolumeDown = document.createElement('div');
    sideButtonVolumeDown.style.cssText = `
          position: absolute;
          width: 6px;
          height: 44px;
          background: #777;
          border-radius: 3px;
          top: 30%;
          left: -16px;
      `;

    const sideButtonRight = document.createElement('div');
    sideButtonRight.style.cssText = `
          position: absolute;
          width: 6px;
          height: 50px;
          background: #555;
          border-radius: 3px;
          top: 28%;
          right: -16px;
          transform: translateY(-50%);
      `;

    phoneFrame.appendChild(sideButtonVolumeUp);
    phoneFrame.appendChild(sideButtonVolumeDown);
    phoneFrame.appendChild(sideButtonRight);
    phoneFrame.appendChild(topBar);
    phoneFrame.appendChild(screen);
    phoneFrame.appendChild(navBar);


    // 清空页面内容并插入手机模拟器
    document.body.innerHTML = '';
    document.body.style.backgroundColor = bodyBarbackgroundColor
    document.body.appendChild(phoneFrame);
  }

  function teardownMobileView() {
    // 恢复原始页面内容
    if (document.querySelector('#mobile-wrapper')) {
      location.reload();
    }
  }

  function handleResize() {
    const isPC = window.innerWidth > mobileThreshold;
    if (isPC) {
      setupMobileView();
    } else {
      teardownMobileView();
    }
  }

  // 初始化：仅在顶层执行
  if (window.self === window.top) {
    handleResize();

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
  }
}

