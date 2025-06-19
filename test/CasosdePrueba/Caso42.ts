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
  const btnLibreta = await client.$('id=com.libercoop.appliber:id/linearLibretaAhorro');
  await btnLibreta.waitForDisplayed({ timeout: 10000 });
btnLibreta.click();

  const ahorroTotalElement = await client.$('id=com.libercoop.appliber:id/txtPrice');
  const ahorroTotal = await ahorroTotalElement.getText();
  console.log(`💰 Ahorro total mostrado en interfaz: ${ahorroTotal}`);

  const libreta = await client.$('id=com.libercoop.appliber:id/linearColumncreditoconsumo');
  await libreta.waitForDisplayed({ timeout: 10000 });
  await libreta.click();
  await client.pause(3000);

  const movimientosMostrados = new Set<string>();
  let movimientosPrevios = 0;
  let intentos = 0;
  let seguir = true;
  let ultimoSaldo = '';

  while (seguir && intentos < 30) {
    const movimientos = await client.$$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.libercoop.appliber:id/recyclerviewAhorroDetalle"]/android.view.ViewGroup');

    for (const movimiento of movimientos) {
      try {
        const tipo = await movimiento.$('.//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textviewTipoMov"]').getText();
        const monto = await movimiento.$('.//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textviewMontoMov"]').getText();
        const saldo = await movimiento.$('.//android.widget.TextView[@resource-id="com.libercoop.appliber:id/textviewSaldoProducto"]').getText();

        const clave = `${tipo}|${monto}|${saldo}`;
        if (!movimientosMostrados.has(clave)) {
          movimientosMostrados.add(clave);
          ultimoSaldo = saldo;
          console.log(`📌 Movimiento encontrado:`);
          console.log(`   Tipo: ${tipo}`);
          console.log(`   Monto: ${monto}`);
          console.log(`   Saldo: ${saldo}`);
          console.log('--------------------------------------');
        }
      } catch {}
    }

    await client.execute('mobile: scrollGesture', {
      left: 100,
      top: 500,
      width: 800,
      height: 1200,
      direction: 'down',
      percent: 1.0
    });

    await client.pause(1000);
    intentos++;

    if (movimientosMostrados.size === movimientosPrevios) {
      seguir = false;
    } else {
      movimientosPrevios = movimientosMostrados.size;
    }
  }

  console.log(`🔍 Último saldo encontrado en movimientos: ${ultimoSaldo}`);
  console.log(`🔍 Ahorro total: ${ahorroTotal}`);
const limpioUltimoSaldo = ultimoSaldo.replace('Saldo:', '').replace(/\s/g, '').trim();
const limpioAhorroTotal = ahorroTotal.replace(/\s/g, '').trim();

console.log(`🔍 Último saldo: ${limpioUltimoSaldo}`);
console.log(`🔍 Ahorro total: ${limpioAhorroTotal}`);
console.log(`✅ Comparación con Ahorro Total: ${limpioAhorroTotal === limpioUltimoSaldo ? 'COINCIDEN ✅' : 'NO COINCIDEN ❌'}`);

  await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
})();
