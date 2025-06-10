import { remote } from 'webdriverio';

const opts = {
  path: '/wd/hub',
  port: 4723,
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

  const rutField = await client.$('id=com.libercoop.appliber:id/editTextRUT');
  await rutField.setValue('156237787');

  const passwordField = await client.$('id=com.libercoop.appliber:id/editTextContrasena');
  await passwordField.setValue('123456');

  const loginButton = await client.$('id=com.libercoop.appliber:id/btn_login');
  await loginButton.click();

  await client.pause(4000);

  const homeElement = await client.$('id=com.libercoop.appliber:id/txtCrditos');
  const isHomeVisible = await homeElement.isDisplayed().catch(() => false);
  console.log('Resultado login correcto:', isHomeVisible ? '✅ Acceso exitoso' : '❌ Falló acceso');

  if (isHomeVisible) {
    const salirButton = await client.$('id=com.libercoop.appliber:id/txtSalir');
    await salirButton.click();

    const confirmarSalir = await client.$('id=com.libercoop.appliber:id/confirm_button');
    await confirmarSalir.click();

    await client.pause(3000);

    const cambiarUsuario= await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario');
    await cambiarUsuario.click();
  }

  await rutField.setValue('156237787');
  await passwordField.setValue('000000'); 
  await loginButton.click();

  await client.pause(2000);
  const errorMsg = await client.$('id=com.libercoop.appliber:id/content_text');
  const errorText = await errorMsg.getText();

  console.log('Resultado login incorrecto (mensaje mostrado):', errorText);

  await client.deleteSession();
})();


