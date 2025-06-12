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
  await campoRut.setValue('55555555-5');

  const btnContinuar = await client.$('id=com.libercoop.appliber:id/btn_continuar_rec_cla');
  await btnContinuar.click();

  const avisoError = await client.$('id=com.libercoop.appliber:id/txtTeinformamos');
  await avisoError.waitForDisplayed({ timeout: 10000 });
  console.log('✅ Aviso de RUT inválido es visible.');

  const btnConfirmar = await client.$('id=com.libercoop.appliber:id/linearBtnContinuar');
  await btnConfirmar.click();

  await client.pause(1000);
  await client.back();

  console.log('✅ Caso completado: sistema bloquea recuperación con RUT inválido.');

  await client.deleteSession();
}

main();
