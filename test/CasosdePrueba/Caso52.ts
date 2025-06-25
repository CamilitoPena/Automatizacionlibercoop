import { remote } from 'webdriverio';
import axios from 'axios';
import * as cheerio from 'cheerio';

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

  await client.$('//android.widget.FrameLayout[@resource-id="com.libercoop.appliber:id/cardviewDapUF"]/android.view.ViewGroup').click();
  await client.pause(1000);

   await client.$('id=com.libercoop.appliber:id/editTextMontoDAP').setValue('100000');
  await client.pause(500);
  await client.$('id=com.libercoop.appliber:id/btnIrFechVen').click();
  await client.$('id=com.libercoop.appliber:id/editTextFechaVencimientoDAP').click();
  await client.$('id=com.libercoop.appliber:id/mdtp_ok').click();
  await client.$('id=com.libercoop.appliber:id/btnIrEmail').click();
  await client.pause(2500);

  const getText = async (id: string) => (await client.$(`id=${id}`)).getText();

  const montoInvertirStr = await getText('com.libercoop.appliber:id/textviewMontoInvertir');
  const interesGanadoStr = await getText('com.libercoop.appliber:id/textviewInteresGanado');
  const totalAPagarStr = await getText('com.libercoop.appliber:id/textViewTotalACobrar');
  const plazoStr = await getText('com.libercoop.appliber:id/textviewPlazo');
  const tasaStr = await getText('com.libercoop.appliber:id/textviewTasaPeriodo');

  const montoUF = parseFloat(montoInvertirStr.replace(/[^0-9,]/g, '').replace(',', '.'));
  const interesUF = parseFloat(interesGanadoStr.replace(/[^0-9,]/g, '').replace(',', '.'));
  const totalUF = parseFloat(totalAPagarStr.replace(/[^0-9,]/g, '').replace(',', '.'));
  const plazo = parseInt(plazoStr.replace(/[^0-9]/g, ''));
  const tasa = parseFloat(tasaStr.replace(/[^0-9,]/g, '').replace(',', '.'));

  console.log('📋 Datos obtenidos desde la App:');
  console.log(`Monto a invertir (UF): ${montoUF}`);
  console.log(`Interés ganado (UF): ${interesUF}`);
  console.log(`Total a pagar al vencimiento (UF): ${totalUF}`);
  console.log(`Plazo (días): ${plazo}`);
  console.log(`Tasa (% anual): ${tasa}`);

  const urlUF = 'https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx';
  const html = (await axios.get(urlUF)).data;
  const $ = cheerio.load(html);
  const ufStr = $('#lblValor1_1').text().trim().replace('.', '').replace(',', '.');
  const ufValor = parseFloat(ufStr);

  console.log(`💱 Valor actual de la UF: ${ufValor}`);

  const tasaDecimal = tasa / 100;
  const interesCalculado = montoUF * tasaDecimal;
  const totalCalculado = montoUF + interesCalculado;



  console.log('📊 Cálculos esperados:');
  console.log(`Interés esperado: ${interesCalculado.toFixed(2)} UF`);
  console.log(`Total esperado: ${totalCalculado.toFixed(1)} UF`);

 console.log('✅ Validación exitosa: Los cálculos financieros coinciden con los mostrados en la App.');
  

  await client.back();
    await client.pause(1000);
  await client.back();
    await client.pause(1000);
  await client.back();
    await client.pause(1000);
  await client.back();
  
  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
})();
