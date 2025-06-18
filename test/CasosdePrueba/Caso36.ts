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

  await client.$('id=com.libercoop.appliber:id/editTextRUT').setValue('15623778-7');
  await client.$('id=com.libercoop.appliber:id/editTextContrasena').setValue('123456');
  await client.$('id=com.libercoop.appliber:id/btn_login').click();
  await client.pause(4000);

  const BtnCreditos = await client.$('id=com.libercoop.appliber:id/linearCreditos');
  await BtnCreditos.waitForDisplayed({ timeout: 10000 });
  await BtnCreditos.click();
  await client.pause(2000);

  const BtnCredito1 = await client.$('id=com.libercoop.appliber:id/linearColumncreditoconsumo');
  await BtnCredito1.waitForDisplayed({ timeout: 10000 });
  await BtnCredito1.click();

const Creditooo = await client.$('id=com.libercoop.appliber:id/linearNumeroProducto');
console.log('✅ Crédito seleccionado visible con su respectiva información:', await Creditooo.isDisplayed());

  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
})();
