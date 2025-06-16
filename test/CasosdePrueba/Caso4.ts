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
  
  const uneteBtn = await client.$('id=com.libercoop.appliber:id/textviewVerificarIdentidad');
  await uneteBtn.click();

  await client.pause(2000);

  const uneteConfirm = await client.$('id=com.libercoop.appliber:id/textViewTituloError');
  const uneteVisible = await uneteConfirm.isDisplayed().catch(() => false);
  console.log('✅ Redirección "Únete a Libercoop":', uneteVisible ? 'Correcta' : 'Incorrecta');

  const retrocedeBtn = await client.$('id=com.libercoop.appliber:id/imageArrowleft');
  await retrocedeBtn.click();

   const btniniciarnuevo = await client.$('id=com.libercoop.appliber:id/btn_login');
  await btniniciarnuevo.click();

  const recuperarBtn = await client.$('id=com.libercoop.appliber:id/textviewRecuperarPassword');
  await recuperarBtn.click();

  await client.pause(2000);

  const recuperarConfirm = await client.$('id=com.libercoop.appliber:id/txtQunecesitop');
  const recuperarVisible = await recuperarConfirm.isDisplayed().catch(() => false);
  console.log('✅ Redirección "Recuperar Clave":', recuperarVisible ? 'Correcta' : 'Incorrecta');

  await client.deleteSession();
})();
