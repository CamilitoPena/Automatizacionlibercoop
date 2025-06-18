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

  await client.$('id=com.libercoop.appliber:id/editTextRUT').setValue('20004397-9');
  await client.$('id=com.libercoop.appliber:id/editTextContrasena').setValue('123456');
  await client.$('id=com.libercoop.appliber:id/btn_login').click();
  await client.pause(4000);

  const iconoPerfil = await client.$('id=com.libercoop.appliber:id/imageInfoPersonal');
  await iconoPerfil.waitForDisplayed({ timeout: 10000 });
  await iconoPerfil.click();
  await client.pause(2000);

  const nombre = await client.$('id=com.libercoop.appliber:id/textView_nombreSocio');
  const rut = await client.$('id=com.libercoop.appliber:id/textView_rutSocio');
  const movil = await client.$('id=com.libercoop.appliber:id/textView_celularSocio');
  const email = await client.$('id=com.libercoop.appliber:id/textView_emailSocio');
  const direccion = await client.$('id=com.libercoop.appliber:id/textView_direccionSocio');
await client.pause(2000);
  console.log('✅ Nombre visible:', await nombre.getText());
  console.log('✅ RUT visible:', await rut.getText());
  console.log('✅ Móvil visible:', await movil.getText());
  console.log('✅ Email visible:', await email.getText());
  console.log('✅ Dirección visible:', await direccion.getText());

  await client.back();
  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
})();
