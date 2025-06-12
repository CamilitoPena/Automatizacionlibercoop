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

  const txtDescripcion = await client.$('id=com.libercoop.appliber:id/txtDescription');
  await txtDescripcion.waitForDisplayed({ timeout: 10000 });

  const campoRut = await client.$('id=com.libercoop.appliber:id/editTextRutClave');
  await campoRut.setValue('20004397-9');

  const btnContinuar = await client.$('id=com.libercoop.appliber:id/btn_continuar_rec_cla');
  await btnContinuar.click();

  const claveTemporalTexto = await client.$('id=com.libercoop.appliber:id/txtQunecesitop');
  await claveTemporalTexto.waitForDisplayed({ timeout: 10000 });

  await client.pause(2000);
await client.back();
    await client.pause(2000);
await client.back();
    await client.pause(2000);
  console.log('✅ Se accedió correctamente a la pantalla de clave temporal.');

  await client.deleteSession();
}

main();
