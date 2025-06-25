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
  await client.pause(1000);

  await client.$('//android.widget.FrameLayout[@resource-id="com.libercoop.appliber:id/cardviewDapFlex"]/android.widget.LinearLayout').click();
  await client.pause(1000);

 await client.$('id=com.libercoop.appliber:id/editTextMontoDAP').setValue('4000000');
  await client.$('id=com.libercoop.appliber:id/spinner_monto_dap_tipo_renovacion').click();
  await client.$('//android.widget.TextView[@text="Plazo fijo"]').click();
  await client.pause(1100);
  await client.$('id=com.libercoop.appliber:id/btnIrFechVen').click();
  await client.$('id=com.libercoop.appliber:id/editTextFechaVencimientoDAP').click();
  await client.$('id=com.libercoop.appliber:id/mdtp_ok').click();
  await client.$('id=com.libercoop.appliber:id/btnIrEmail').click();
  await client.pause(2500);

  // Extracción de datos para validación
  const montoTexto = await client.$('id=com.libercoop.appliber:id/textviewMontoInvertir').getText();
  const interesTexto = await client.$('id=com.libercoop.appliber:id/textviewInteresGanado').getText();
  const totalTexto = await client.$('id=com.libercoop.appliber:id/textViewTotalACobrar').getText();
  const plazoTexto = await client.$('id=com.libercoop.appliber:id/textviewPlazo').getText();
  const tasaTexto = await client.$('id=com.libercoop.appliber:id/textviewTasaPeriodo').getText();

  const monto = parseFloat(montoTexto.replace(/[^0-9]/g, ''));
  const interes = parseFloat(interesTexto.replace(/[^0-9]/g, ''));
  const total = parseFloat(totalTexto.replace(/[^0-9]/g, ''));
  const plazo = parseInt(plazoTexto.replace(/\D/g, ''));
  const tasa = parseFloat(tasaTexto.replace(/[^\d,]/g, '').replace(',', '.'));

  // Cálculos
  const interesEsperado = parseFloat((monto * (tasa / 100) ).toFixed(2));
  const totalEsperado = parseFloat((monto + interesEsperado).toFixed(2));

  // Reporte
  console.log('\n📋 Datos obtenidos desde la App ---');
  console.log(`Monto a invertir: $${monto}`);
  console.log(`Interés ganado: $${interes}`);
  console.log(`Total a pagar al vencimiento: $${total}`);
  console.log(`Plazo (días): ${plazo}`);
  console.log(`Tasa (% anual): ${tasa}`);

  console.log('\n--- Cálculos esperados ---');
  console.log(`Interés esperado: $${interesEsperado}`);
  console.log(`Total esperado: $${totalEsperado}`);

  const margenError = 2;
  if (Math.abs(interesEsperado - interes) <= margenError && Math.abs(totalEsperado - total) <= margenError) {
    console.log('\n✅ Validación exitosa: Los cálculos financieros mostrados por la App son correctos.');
  } else {
    console.log('\n❌ Validación fallida: Discrepancia en los cálculos financieros mostrados por la App.');
  }

  await client.back();
    await client.pause(1000);
  await client.back();
    await client.pause(1000);
  await client.back();
    await client.pause(1000);
  await client.back();

  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();
  await client.deleteSession();
})();
