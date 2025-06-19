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

  try {
    const estado = await client.$('id=com.libercoop.appliber:id/textviewEstadoDepo');
    const estadoTexto = await estado.getText();
    console.log('🔍 Estado del DAP:', estadoTexto);

    if (estadoTexto.toLowerCase().includes('pendiente')) {
      const btnPagoApp = await client.$('id=com.libercoop.appliber:id/btn_pago_app_libercoop');
      const btnPagoTransferencia = await client.$('id=com.libercoop.appliber:id/btn_pago_transferencia_bancaria');

      console.log('✅ Boton de Entra a tu banco desde acá y deposita tu inversión en segundos visible.:', await btnPagoApp.isDisplayed());
      console.log('✅ Botón Te mostramos nuestros datos bancarios y tú nos transfieres visible:', await btnPagoTransferencia.isDisplayed());
    } else {
      console.log('⚠️ El DAP no se encuentra en estado PENDIENTE.');
    }
  } catch {
    console.log('❌ No se pudo verificar los botones de pago del DAP.');
  }

  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
})();
