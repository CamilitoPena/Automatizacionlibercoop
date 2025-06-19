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

  const btnDAP = await client.$('id=com.libercoop.appliber:id/linearDAP');
  await btnDAP.waitForDisplayed({ timeout: 10000 });
  await btnDAP.click();
  await client.pause(2000);

  const primerDAP = await client.$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.libercoop.appliber:id/recyclerview"]/android.view.ViewGroup');
  await primerDAP.waitForDisplayed({ timeout: 10000 });
  await primerDAP.click();
  await client.pause(3000);

  const campos = [
    { nombre: 'Número de DAP', id: 'com.libercoop.appliber:id/textviewNumeroDeposito' },
    { nombre: 'Tipo', id: 'com.libercoop.appliber:id/textviewTipoRenovDepo' },
    { nombre: 'Estado', id: 'com.libercoop.appliber:id/textviewEstadoDepo' },
    { nombre: 'Días Plazo', id: 'com.libercoop.appliber:id/textviewDiasPlazoDepo' },
    { nombre: 'Sucursal', id: 'com.libercoop.appliber:id/textviewSucursalDepo' },
    { nombre: 'Monto Inicial', id: 'com.libercoop.appliber:id/textviewValorDepo' },
    { nombre: 'Fecha de solicitud', id: 'com.libercoop.appliber:id/textviewFechaSoli' },
    { nombre: 'Fecha de inversión', id: 'com.libercoop.appliber:id/textviewFechaAperDepo' },
    { nombre: 'Tasa de interés', id: 'com.libercoop.appliber:id/textviewTasaIntDepo' },
    { nombre: 'Monto interés', id: 'com.libercoop.appliber:id/textviewMontoIntDepo' },
    { nombre: 'Monto final', id: 'com.libercoop.appliber:id/textviewMontoFinalDepo' },
    { nombre: 'Fecha vencimiento', id: 'com.libercoop.appliber:id/textviewFechaVencDepo' },
    { nombre: 'Fecha renov. auto.', id: 'com.libercoop.appliber:id/textviewFechaRenovAutoDepo' },
    { nombre: 'Moneda', id: 'com.libercoop.appliber:id/textviewMoneda' },
  ];

  let visibles = 0;
  for (const campo of campos) {
    try {
      const el = await client.$(`id=${campo.id}`);
      const visible = await el.isDisplayed();
      const texto = await el.getText();
      console.log(`✅ ${campo.nombre}: ${texto}`);
      if (visible) visibles++;
    } catch (e) {
      console.log(`❌ ${campo.nombre} no visible o no encontrado.`);
    }
  }

  console.log(`\n📋 Campos visibles: ${visibles}/${campos.length}`);
  if (visibles === campos.length) {
    console.log('✅ Todos los campos de información del DAP están visibles correctamente.');
  } else {
    console.log('⚠️ Algunos campos no se encontraron o no están visibles.');
  }

  // Cierre de sesión
  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
})();
