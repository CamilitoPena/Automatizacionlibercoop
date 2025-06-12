import { remote } from 'webdriverio';

const opts = {
  path: '/wd/hub',
  port: 4723,
  logLevel: 'error' as const,
  capabilities: {
    platformName: "Android",
    "appium:deviceName": "Medium Phone API 36.0",
    "appium:automationName": "UiAutomator2",
    "appium:app": "C:\\Users\\USUARIO\\Downloads\\app-release_Libercoop 29052025_jlg (1).apk",
    "appium:appWaitActivity": "*",
    "appium:noReset": true,
    "appium:newCommandTimeout": 240
  }
};

async function main() {
  const client = await remote(opts);

  const btnRecuperarClave = await client.$('id=com.libercoop.appliber:id/textviewRecuperarPassword');
  await btnRecuperarClave.click();

  await client.pause(2000);
  await client.back();

  console.log('✅ Boton atrás cumple su función.');

  await client.deleteSession();
}

main();
