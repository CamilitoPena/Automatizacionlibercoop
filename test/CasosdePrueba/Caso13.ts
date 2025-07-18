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

  const btnContacto = await client.$('id=com.libercoop.appliber:id/nav_contacto');
  await btnContacto.click();
  await client.pause(3000);

 
  const txtSuperior = await client.$('id=com.libercoop.appliber:id/txtMensajeSuperior');
  const textoSuperior = await txtSuperior.getText();
  console.log('Texto superior:', textoSuperior);


  const txtInferior = await client.$('android=new UiSelector().text("Presiona este icono para iniciar una conversación por WhatsApp con uno de nuestres ejecutivos.")');
  const visibleInferior = await txtInferior.isDisplayed();

  console.log('\nVerificación:');
  console.log('✅ Texto superior visible:', textoSuperior.trim().length > 0);
  console.log('✅ Texto inferior visible:', visibleInferior);

  const btnSalir = await client.$('id=com.libercoop.appliber:id/txtSalir');
  await btnSalir.click();
  const confirmar = await client.$('id=com.libercoop.appliber:id/confirm_button');
  await confirmar.click();

  const volver = await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario');
  await volver.click();

  await client.deleteSession();
})();
