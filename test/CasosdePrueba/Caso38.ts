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
      'appium:newCommandTimeout': 240
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

  const BtnCreditos = await client.$('id=com.libercoop.appliber:id/linearCreditos');
  await BtnCreditos.waitForDisplayed({ timeout: 10000 });
  await BtnCreditos.click();
  await client.pause(3000);

  const deudaTotalElement = await client.$('id=com.libercoop.appliber:id/txtPrice');
  const deudaTotalTexto = await deudaTotalElement.getText(); 
  const deudaTotal = parseInt(deudaTotalTexto.replace(/[^0-9]/g, '')); 
  console.log(`💰 Deuda total mostrada: ${deudaTotalTexto} → ${deudaTotal}`);

  const saldos = Array.from(await client.$$('id=com.libercoop.appliber:id/textviewSaldoProducto'));
  let sumaSaldos = 0;

  for (let i = 0; i < saldos.length; i++) {
    const texto = await saldos[i].getText();
    const valor = parseInt(texto.replace(/[^0-9]/g, ''));
    console.log(`📌 Saldo crédito ${i + 1}: ${texto} → ${valor}`);
    sumaSaldos += valor;
  }

  console.log(`🧮 Suma total de saldos individuales: ${sumaSaldos}`);

  if (sumaSaldos === deudaTotal) {
    console.log('✅ La suma de los saldos coincide con la deuda total mostrada.');
  } else {
    console.log('❌ Error: La suma de los saldos NO coincide con la deuda total.');
  }

  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();
  await client.deleteSession();
})();
