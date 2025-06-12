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

  await client.$('id=com.libercoop.appliber:id/editTextRUT').setValue('15623778-7');
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
    await client.$(`id=${sucursal.boton}`).click();
    const detalle = await client.$('id=com.libercoop.appliber:id/textViewNombreSuc');
    await detalle.waitForDisplayed({ timeout: 20000 });
    const nombreDetalle = await detalle.getText();
    console.log(`✅ Navegación exitosa a: ${nombreDetalle}`);
    await client.$('id=com.libercoop.appliber:id/imageArrowleft').click();
  }

  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
  await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario').click();

  await client.deleteSession();
}

main();
