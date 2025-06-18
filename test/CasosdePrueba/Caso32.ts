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

  const inputRUT = await client.$('id=com.libercoop.appliber:id/editTextRUT');
  await inputRUT.setValue('15623778-7');

  const inputPassword = await client.$('id=com.libercoop.appliber:id/editTextContrasena');
  await inputPassword.setValue('123456');

  const btnLogin = await client.$('id=com.libercoop.appliber:id/btn_login');
  await btnLogin.click();

  await client.pause(4000);

  const VisualIndi = await client.$('id=com.libercoop.appliber:id/nav_indicadores');
  await VisualIndi.waitForDisplayed({ timeout: 10000 });
  console.log('✅ Interfaz de indicadores visible');

  const VisualCont = await client.$('id=com.libercoop.appliber:id/nav_contacto');
  await VisualCont.waitForDisplayed({ timeout: 10000 });
  console.log('✅ Interfaz de Contacto visible');

  const VisualSu = await client.$('id=com.libercoop.appliber:id/nav_sucursales');
  await VisualSu.waitForDisplayed({ timeout: 10000 });
  console.log('✅ Interfaz de Sucursales visible');

  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
})();
