import { remote } from 'webdriverio';

const opts = {
  path: '/wd/hub',
  port: 4723,
  logLevel: 'error' as const,
  capabilities: {
    platformName: "Android",
    "appium:deviceName": "Medium Phone API 36.0",
    "appium:automationName": "UiAutomator2",
    "appium:app": "C:\\Users\\USUARIO\\Downloads\\app-release_Libercoop 29052025_jlg (1).apk",
    "appium:appWaitActivity": "*",
    "appium:noReset": true,
    "appium:newCommandTimeout": 240
  }
};

async function main() {
  const client = await remote(opts);

  await client.$('id=com.libercoop.appliber:id/editTextRUT').setValue('20004397-9');
  await client.$('id=com.libercoop.appliber:id/editTextContrasena').setValue('123456');
  await client.$('id=com.libercoop.appliber:id/btn_login').click();
await client.pause(3000);
  
  await client.$('id=com.libercoop.appliber:id/nav_sucursales').click();
  await client.$('id=com.libercoop.appliber:id/txtNombreCasaMatriz').waitForDisplayed({ timeout: 10000 });

  const sucursales = [
    { nombre: "Casa Matriz", boton: 'com.libercoop.appliber:id/linearRowCasaMatriz' },
    { nombre: "Talagante", boton: 'com.libercoop.appliber:id/linearRowTalagante' },
    { nombre: "Castro", boton: 'com.libercoop.appliber:id/linearRowCastro' },
    { nombre: "Concepción", boton: 'com.libercoop.appliber:id/linearRowlocation' }
  ];

  for (const sucursal of sucursales) {
    console.log(`➡️ Probando: ${sucursal.nombre}`);

    await client.$(`id=${sucursal.boton}`).click();
    await client.$('id=com.libercoop.appliber:id/textViewNombreSuc').waitForDisplayed({ timeout: 10000 });

    const marcador = await client.$('//android.view.View[@content-desc="Map Marker"]');
    await marcador.click();

    const abrirMaps = await client.$('//android.widget.ImageView[@content-desc="Open in Google Maps"]');
    await abrirMaps.waitForDisplayed({ timeout: 10000 });
    await abrirMaps.click();

    await client.pause(6000);

    await client.back();
    await client.pause(3000);
    await client.back();
    await client.pause(3000);

    const btnAtrasSucursal = await client.$('id=com.libercoop.appliber:id/imageArrowleft');
    await btnAtrasSucursal.click();
    await client.pause(3000);
  }

  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
}

main();
