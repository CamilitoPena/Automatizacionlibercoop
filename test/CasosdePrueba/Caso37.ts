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

  await client.$('id=com.libercoop.appliber:id/editTextRUT').setValue('15623778-7');
  await client.$('id=com.libercoop.appliber:id/editTextContrasena').setValue('123456');
  await client.$('id=com.libercoop.appliber:id/btn_login').click();
  await client.pause(4000);

  const BtnCreditos = await client.$('id=com.libercoop.appliber:id/linearCreditos');
  await BtnCreditos.waitForDisplayed({ timeout: 10000 });
  await BtnCreditos.click();
  await client.pause(2000);

  const BtnCredito1 = await client.$('id=com.libercoop.appliber:id/linearColumncreditoconsumo');
  await BtnCredito1.waitForDisplayed({ timeout: 10000 });
  await BtnCredito1.click();
  await client.pause(1000);
const cuotas = Array.from(await client.$$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.libercoop.appliber:id/recyclerviewCreditoDetalle"]/android.view.ViewGroup'));

  console.log(`\n🔍 Total de cuotas encontradas: ${cuotas.length}\n`);
  for (let i = 0; i < cuotas.length; i++) {
    const cuota = cuotas[i];
    console.log(`📌 Cuota ${i + 1}:`);

    const getText = async (selector: string) => {
      try {
        const element = await cuota.$(selector);
        return await element.getText();
      } catch (err) {
        return 'No disponible';
      }
    };

    const numero = await getText('.//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textviewNumeroCuotaCre"]');
    const valor = await getText('.//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textviewValorCuotaCre"]');
    const vencimiento = await getText('.//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textViewFechaVencCre"]');
    const cancelacion = await getText('.//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textViewFechaCancCre"]');
    const diasAtraso = await getText('.//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textViewDiasAtrasoCre"]');
    const pagado = await getText('.//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textViewPagadoCre"]');
    const saldo = await getText('.//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textViewSaldoCre"]');
    console.log(`   Número de cuota: ${numero}`);
    console.log(`   Valor cuota: ${valor}`);
    console.log(`   Vencimiento: ${vencimiento}`);
    console.log(`   Cancelación: ${cancelacion}`);
    console.log(`   Días de atraso: ${diasAtraso}`);
    console.log(`   Pagado: ${pagado}`);
    console.log(`   Saldo: ${saldo}`);
    console.log('--------------------------------------');
  }
  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();
  await client.deleteSession();
})();
