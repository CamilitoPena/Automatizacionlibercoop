import { remote } from 'webdriverio';

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

(async () => {
  const client = await remote(opts);

  const rutField = await client.$('id=com.libercoop.appliber:id/editTextRUT');
  await rutField.waitForDisplayed({ timeout: 5000 });
  await rutField.setValue('20004397-9');
  
  const passwordField = await client.$('id=com.libercoop.appliber:id/editTextContrasena');
  await passwordField.waitForDisplayed({ timeout: 5000 });

  await passwordField.setValue('1234567');
  let value = await passwordField.getAttribute('text');
  console.log('Valor ingresado (más de 6 dígitos):', value);
  if (value.length > 6) {
    console.error('Error: El campo permite más de 6 dígitos');
  }

  await passwordField.clearValue();
  await passwordField.setValue('abc123');
  value = await passwordField.getAttribute('text');
  console.log('Valor ingresado (letras + números):', value);
  if (!/^\d{0,6}$/.test(value)) {
    console.error('Error: El campo acepta caracteres no numéricos');
  }
 
  await passwordField.clearValue();
  await passwordField.setValue('123456');
  value = await passwordField.getAttribute('text');
  console.log('Valor ingresado (6 dígitos válidos):', value);
  
  const toggleIcon = await client.$('id=com.libercoop.appliber:id/text_input_end_icon');
  await toggleIcon.click();
  console.log('Ícono de ofuscación clickeado para mostrar contraseña');
  await client.pause(1000); 

  await toggleIcon.click();
  console.log('Ícono de ofuscación clickeado para ocultar contraseña');
  await client.pause(1000);

  await client.deleteSession();
})();
123