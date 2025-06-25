import { remote } from 'webdriverio';

const opts = {
  path: '/wd/hub',
  port: 4723,
  logLevel: 'error' as const,
  capabilities: {
    alwaysMatch: {
      platformName: 'Android',
      'appium:deviceName': 'Medium Phone API 36.0',
      'appium:automationName': 'UiAutomator2',
      'appium:app': 'C:\\Users\\USUARIO\\Downloads\\app-release_Libercoop 29052025_jlg (1).apk',
      'appium:appWaitActivity': '*',
      'appium:noReset': true,
      'appium:newCommandTimeout': 380
    },
    firstMatch: [{}]
  }
};

(async () => {
  const client = await remote(opts);

  await client.$('id=com.libercoop.appliber:id/editTextRUT').setValue('156237787');
  await client.$('id=com.libercoop.appliber:id/editTextContrasena').setValue('123456');
  await client.$('id=com.libercoop.appliber:id/btn_login').click();
  await client.pause(4000);

  const btnSimular = await client.$('id=com.libercoop.appliber:id/btn_simulador_dap');
  await btnSimular.waitForDisplayed({ timeout: 10000 });
  await btnSimular.click();
  await client.pause(2000);

  const tituloTipoDAP = await client.$('id=com.libercoop.appliber:id/textViewTituloTipoDap');
  const visible = await tituloTipoDAP.isDisplayed();

  if (visible) {
    console.log('✅ Pantalla de tipos de DAP visible correctamente tras presionar Simular Aquí.');
  } else {
    console.log('❌ No se redirigió correctamente a la pantalla de tipos de DAP.');
  }

await client.back();

  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
})();
