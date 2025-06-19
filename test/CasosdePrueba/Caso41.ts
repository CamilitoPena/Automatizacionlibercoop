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
      'appium:newCommandTimeout': 240
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

  const btnLibreta = await client.$('id=com.libercoop.appliber:id/linearLibretaAhorro');
  await btnLibreta.waitForDisplayed({ timeout: 10000 });
  await btnLibreta.click();
  await client.pause(2000);

  const libreta = await client.$('id=com.libercoop.appliber:id/linearColumncreditoconsumo');
  await libreta.waitForDisplayed({ timeout: 10000 });
  await libreta.click();
  await client.pause(3000);

  const fecha = await client.$('(//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textviewNombreProducto"])[1]');
  const tipo = await client.$('(//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textviewTipoMov"])[1]');
  const monto = await client.$('(//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textviewMontoMov"])[1]');
  const saldo = await client.$('(//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textviewSaldoProducto"])[1]');

  console.log('📌 Verificaciones de campos visibles:');
  console.log(`✅ Fecha visible: ${await fecha.isDisplayed()}`);
  console.log(`✅ Tipo de movimiento visible: ${await tipo.isDisplayed()}`);
  console.log(`✅ Monto del movimiento visible: ${await monto.isDisplayed()}`);
  console.log(`✅ Saldo visible: ${await saldo.isDisplayed()}`);

  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
})();
