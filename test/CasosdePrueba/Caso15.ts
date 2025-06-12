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
    {
      nombre: 'com.libercoop.appliber:id/txtNombreCasaMatriz',
      direccion: 'com.libercoop.appliber:id/txtDireccionCasaMatriz',
      telefono: 'com.libercoop.appliber:id/txtTelefonoCasaMatriz'
    },
    {
      nombre: 'com.libercoop.appliber:id/txtNombreTalagante',
      direccion: 'com.libercoop.appliber:id/txtDireccionTalagante',
      telefono: 'com.libercoop.appliber:id/txtTelefonoTalagante'
    },
    {
      nombre: 'com.libercoop.appliber:id/txtNombreCastro',
      direccion: 'com.libercoop.appliber:id/txtDireccionCastro',
      telefono: 'com.libercoop.appliber:id/txtTelefonoCastro'
    },
    {
      nombre: 'com.libercoop.appliber:id/txtNombreConcepcion',
      direccion: 'com.libercoop.appliber:id/txtDireccionConcepcion',
      telefono: 'com.libercoop.appliber:id/txtTelefonoConcepcion'
    }
  ];

  for (const [i, sucursal] of sucursales.entries()) {
    const nombre = await client.$(`id=${sucursal.nombre}`).getText();
    const direccion = await client.$(`id=${sucursal.direccion}`).getText();
    const telefono = await client.$(`id=${sucursal.telefono}`).getText();

    console.log(`\nSucursal ${i + 1}`);
    console.log(`Nombre   : ${nombre}`);
    console.log(`Dirección: ${direccion}`);
    console.log(`Teléfono : ${telefono}`);
  }

  await client.$('id=com.libercoop.appliber:id/txtSalir').click();
  await client.$('id=com.libercoop.appliber:id/confirm_button').click();
const volver = await client.$('id=com.libercoop.appliber:id/textviewCambioUsuario');
  await volver.click();
  await client.deleteSession();
}

main();
