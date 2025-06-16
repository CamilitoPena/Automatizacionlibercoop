import { remote } from 'webdriverio';
import axios from 'axios';
import * as cheerio from 'cheerio';

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

async function obtenerValoresActuales() {
  const urlUF = 'https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx';
  const urlUTM = 'https://si3.bcentral.cl/indicadoressiete/secure/Serie.aspx?gcode=PRE_UTM&param=cgBnAE8AOQBlAGcAIwBiAFUALQBsAEcAYgBOAEkASQBCAEcAegBFAFkAeABkADgASAA2AG8AdgB2AFMAUgBYADIAQwBzAEEARQBEAG8AdgBpAFoATABGAE4AagB1AFQAeQAyAEIAcAAzAHgAVABKAFEAagAxAHoAQQBfAEsAJAAzAFQARQBOAHgAQwB3AFgAZwA5AHgAdgAwACQATwBZADcAMwAuAGIARwBFAFIASwAuAHQA';
  const urlDolar = 'https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx';

  try {
    const [resUF, resUTM, resDolar] = await Promise.all([
      axios.get(urlUF),
      axios.get(urlUTM),
      axios.get(urlDolar)
    ]);

    const $uf = cheerio.load(resUF.data);
    const $utm = cheerio.load(resUTM.data);
    const $dolar = cheerio.load(resDolar.data);

    const ufValor = $uf('#lblValor1_1').text().trim();
    const utmValor = $utm('#gr_ctl37_Mayo').text().trim();
    const dolarValor = $dolar('#lblValor1_3').text().trim();

    return { ufValor, utmValor, dolarValor };
  } catch (error) {
    console.error('Error al obtener valores del Banco Central:', error);
    return null;
  }
}

(async () => {
  const client = await remote(opts);

  const inputRUT = await client.$('id=com.libercoop.appliber:id/editTextRUT');
  await inputRUT.setValue('15623778-7');

  const inputPassword = await client.$('id=com.libercoop.appliber:id/editTextContrasena');
  await inputPassword.setValue('123456');

  const btnLogin = await client.$('id=com.libercoop.appliber:id/btn_login');
  await btnLogin.click();

  await client.pause(4000);

  const btnIndicadores = await client.$('id=com.libercoop.appliber:id/nav_indicadores');
  await btnIndicadores.click();

  await client.pause(3000);

  const confirmIndicadores = await client.$('id=com.libercoop.appliber:id/txtIndicadoresEco');
  const indicadoresVisible = await confirmIndicadores.isDisplayed();

  if (!indicadoresVisible) {
    console.error('No se pudo acceder a la pantalla de indicadores');
    await client.deleteSession();
    return;
  }

  const valorUFApp = (await (await client.$('id=com.libercoop.appliber:id/textviewValorUFMonto')).getText()).trim();
  const valorDolarApp = (await (await client.$('id=com.libercoop.appliber:id/textviewValorDolarMonto')).getText()).trim();
  const valorUTMApp = (await (await client.$('id=com.libercoop.appliber:id/textviewValorUTMMonto')).getText()).trim();

  console.log('Valores en la app:');
  console.log('UF:', valorUFApp);
  console.log('Dólar Observado:', valorDolarApp);
  console.log('UTM:', valorUTMApp);

  const valoresActuales = await obtenerValoresActuales();
  if (!valoresActuales) {
    console.error('No se pudieron obtener los valores actuales del Banco Central');
    await client.deleteSession();
    return;
  }

  console.log('Valores actuales Banco Central:');
  console.log('UF:', valoresActuales.ufValor);
  console.log('Dólar Observado:', valoresActuales.dolarValor);
  console.log('UTM:', valoresActuales.utmValor);

  const normalizar = (val: any) =>
  (val ?? '')
    .toString()
    .replace(/[$\s]/g, '');

  const comparar = (appVal: any, bancoVal: any) => {
  const a = normalizar(appVal);
  const b = normalizar(bancoVal);
  return a === b ? '✅ Coincide' : '❌ No coincide';
};

  console.log('\nComparación de valores:');
  console.log('UF:', comparar(valorUFApp, valoresActuales.ufValor));
  console.log('Dólar Observado:', comparar(valorDolarApp, valoresActuales.dolarValor));
  console.log('UTM:', comparar(valorUTMApp, valoresActuales.utmValor));

  
const btnSalir = await client.$('id=com.libercoop.appliber:id/txtSalir');
  await btnSalir.click();

  const btnConfirmarSalir = await client.$('id=com.libercoop.appliber:id/confirm_button');
  await btnConfirmarSalir.click();


const confirmUsuario = await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario');
  await confirmUsuario.click();
  await client.deleteSession();
})();
 