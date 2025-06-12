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

  const inputRUT = await client.$('id=com.libercoop.appliber:id/editTextRUT');
  await inputRUT.setValue('15623778-7');

  const inputPassword = await client.$('id=com.libercoop.appliber:id/editTextContrasena');
  await inputPassword.setValue('123456');

  const btnLogin = await client.$('id=com.libercoop.appliber:id/btn_login');
  await btnLogin.click();

  await client.pause(4000); 

  const btnSalir = await client.$('id=com.libercoop.appliber:id/txtSalir');
  await btnSalir.click();

  const btnConfirmarSalir = await client.$('id=com.libercoop.appliber:id/confirm_button');
  await btnConfirmarSalir.click();

  await client.pause(2000);

  const nombreUsuario = await client.$('id=com.libercoop.appliber:id/textviewNombre');
  const visibleNombre = await nombreUsuario.isDisplayed();
  console.log('Nombre de usuario guardado visible:', visibleNombre ? '✅ Sí' : '❌ No');

  const btnRecuperarClave = await client.$('id=com.libercoop.appliber:id/textviewRecuperarPasswordLoginBase');
  await btnRecuperarClave.click();

  await client.pause(2000);
  const recuperarClavePantalla = await client.$('id=com.libercoop.appliber:id/txtQunecesitop');
  const visibleRecuperar = await recuperarClavePantalla.isDisplayed();
  console.log('Pantalla Recuperar Clave visible:', visibleRecuperar ? '✅ Sí' : '❌ No');

  await client.back();
  await client.pause(2000);

  const btnCambiarUsuario = await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario');
  await btnCambiarUsuario.click();

  await client.pause(2000);
  const pantallaLogin = await client.$('id=com.libercoop.appliber:id/imgView_libercoop_ini');
  const visibleLogin = await pantallaLogin.isDisplayed();
  console.log('Pantalla de login para nuevo usuario visible:', visibleLogin ? '✅ Sí' : '❌ No');

  await client.deleteSession();
})();
