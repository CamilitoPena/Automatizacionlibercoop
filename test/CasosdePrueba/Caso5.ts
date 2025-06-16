import { remote } from 'webdriverio';

const opts = {
  path: '/wd/hub',
  port: 4723,
  logLevel: 'error' as const,

  capabilities: {
    alwaysMatch: {
      platformName: "Android",
      "appium:deviceName": "Medium Phone API 36.0",
      "appium:automationName": "UiAutomator2",
      "appium:app": "C:\\Users\\USUARIO\\Downloads\\app-release_Libercoop 29052025_jlg (1).apk",
      "appium:appWaitActivity": "*",
      "appium:noReset": true,
      "appium:newCommandTimeout": 240
    },
    firstMatch: [{}]
  }
};

(async () => {
  const client = await remote(opts);

  await (await client.$('id=com.libercoop.appliber:id/editTextRUT')).setValue('15623778-7');
  await (await client.$('id=com.libercoop.appliber:id/editTextContrasena')).setValue('123456');
  await (await client.$('id=com.libercoop.appliber:id/btn_login')).click();

  await client.pause(3000);

  await (await client.$('id=com.libercoop.appliber:id/nav_indicadores')).click();
  const indicatorText = await client.$('id=com.libercoop.appliber:id/txtIndicadoresEco');
  const isVisible = await indicatorText.isDisplayed().catch(() => false);

  console.log('Resultado acceso a Indicadores:', isVisible ? '✅ Correcto' : '❌ Falló');

  await client.deleteSession();
})();
