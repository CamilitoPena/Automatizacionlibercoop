

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

  await client.$('id=com.libercoop.appliber:id/editTextRUT').setValue('156237787');
  await client.$('id=com.libercoop.appliber:id/editTextContrasena').setValue('123456');
  await client.$('id=com.libercoop.appliber:id/btn_login').click();
  await client.pause(4000);

  await client.$('id=com.libercoop.appliber:id/btn_simulador_dap').click();
  await client.pause(2000);

  await client.$('//android.widget.FrameLayout[@resource-id="com.libercoop.appliber:id/cardviewDapUF"]/android.view.ViewGroup').click();
  await client.pause(1000);

  await client.$('id=com.libercoop.appliber:id/editTextMontoDAP').setValue('100000');
  await client.$('id=com.libercoop.appliber:id/btnIrFechVen').click();
  await client.$('id=com.libercoop.appliber:id/editTextFechaVencimientoDAP').click();
  await client.$('//android.view.View[@content-desc="18 March 2026"]').click();
  await client.$('id=com.libercoop.appliber:id/mdtp_ok').click();
  await client.$('id=com.libercoop.appliber:id/btnIrEmail').click();

  const montoInvertir = await client.$('id=com.libercoop.appliber:id/textviewMontoInvertir');
  const fechaInicio = await client.$('id=com.libercoop.appliber:id/textviewFechaInicio');
  const interesGanado = await client.$('id=com.libercoop.appliber:id/textviewInteresGanado');
  const fechaVenc = await client.$('id=com.libercoop.appliber:id/textviewFechaVencimiento');

  console.log('✅ Monto a invertir:', await montoInvertir.getText());
  console.log('✅ Fecha de inicio:', await fechaInicio.getText());
  console.log('✅ Interés ganado:', await interesGanado.getText());
  console.log('✅ Fecha de vencimiento:', await fechaVenc.getText());
  console.log('✅ Datos del DAP en UF visibles correctamente.');

  await client.$('id=com.libercoop.appliber:id/btnVerEjemplo').click();
  await client.$('id=com.libercoop.appliber:id/spinner_banco').click();
  await client.$('//android.widget.TextView[@text="1 - BANCO DE CHILE"]').click();

  await client.$('id=com.libercoop.appliber:id/spinner_tipo_cuenta').click();
  await client.$('//android.widget.TextView[@text="1 - Cuenta Corriente"]').click();

  await client.$('id=com.libercoop.appliber:id/editTextNumero').setValue('123456789');
  await client.$('id=com.libercoop.appliber:id/editTextEmailDAP').setValue('usuario@correo.com');
  await client.$('id=com.libercoop.appliber:id/btnSiguiente').click();

await client.pause(2000);

  const btnPagoApp = await client.$('id=com.libercoop.appliber:id/btn_pago_app_libercoop');
  const btnTransferencia = await client.$('id=com.libercoop.appliber:id/btn_pago_transferencia_bancaria');

console.log('✅ Boton 1 visible:', await btnPagoApp.getText());
console.log('✅ Boton 2 visible:', await btnTransferencia.getText());


  const visiblePagoApp = await btnPagoApp.isDisplayed();
  const visibleTransferencia = await btnTransferencia.isDisplayed();

  if (visiblePagoApp && visibleTransferencia) {
    console.log('✅ Flujo de simulación de DAP en UF completado exitosamente. Se visualizaron ambas opciones de pago.');
  } else {
    console.log('❌ No se visualizaron las opciones de pago al finalizar el flujo.');
  }

  await client.$('id=com.libercoop.appliber:id/btnIrHome').click();
  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
})();



