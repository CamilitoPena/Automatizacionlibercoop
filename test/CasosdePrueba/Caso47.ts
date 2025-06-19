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

  await client.$('id=com.libercoop.appliber:id/editTextRUT').setValue('20004397-9');
  await client.$('id=com.libercoop.appliber:id/editTextContrasena').setValue('123456');
  await client.$('id=com.libercoop.appliber:id/btn_login').click();
  await client.pause(4000);

  const btnDAP = await client.$('id=com.libercoop.appliber:id/linearDAP');
  await btnDAP.waitForDisplayed({ timeout: 10000 });
  await btnDAP.click();
  await client.pause(2000);

  const dapPendiente = await client.$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.libercoop.appliber:id/recyclerview"]/android.view.ViewGroup[5]');
  await dapPendiente.waitForDisplayed({ timeout: 10000 });
  await dapPendiente.click();
  await client.pause(2000);

  const botonTransferencia = await client.$('android=new UiSelector().resourceId("com.libercoop.appliber:id/btn_pago_transferencia_bancaria")');
  await botonTransferencia.waitForDisplayed({ timeout: 10000 });
  await botonTransferencia.click();
  await client.pause(2000);

  const tituloDestinatario = await client.$('id=com.libercoop.appliber:id/textview_nombre_destinatario');
  const datosBancarios = await client.$('id=com.libercoop.appliber:id/textview_datos_bancarios');

  const tituloVisible = await tituloDestinatario.isDisplayed();
  const datosVisible = await datosBancarios.isDisplayed();

console.log('✅ Interfaz de transferencia de datos:', await tituloDestinatario.getText());
console.log('✅ Datos bancarios:', await datosBancarios.getText());

  if (tituloVisible && datosVisible) {
    console.log('✅ Se visualizaron correctamente los datos de transferencia de Libercoop.');
  } else {
    console.log('❌ No se visualizaron correctamente los datos de transferencia.');
  }

  const btnHome = await client.$('id=com.libercoop.appliber:id/btnIrHome');
  await btnHome.waitForDisplayed({ timeout: 10000 });
  await btnHome.click();

  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
})();
