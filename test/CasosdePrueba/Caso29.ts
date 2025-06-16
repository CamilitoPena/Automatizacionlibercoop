import { remote } from 'webdriverio';

const opts = {
  path: '/wd/hub',
  port: 4723,
  logLevel: 'error' as const,
  capabilities: {
    platformName: 'Android',
    'appium:deviceName': 'Medium Phone API 36.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'C:\\Users\\USUARIO\\Downloads\\app-release_Libercoop 29052025_jlg (1).apk',
    'appium:appWaitActivity': '*',
    'appium:noReset': true,
    'appium:newCommandTimeout': 240,
  },
};

async function main() {
  const client = await remote(opts);

  await client.$('id=com.libercoop.appliber:id/textviewVerificarIdentidad').click();

  const onboarding = await client.$('id=com.libercoop.appliber:id/textViewTituloError');
  await onboarding.waitForDisplayed({ timeout: 10000 });
  console.log('✅ Interfaz de Onboarding visible:', await onboarding.getText());


  await client.$('id=com.libercoop.appliber:id/imageArrowleft').click();
 await client.pause(1000);
  await client.$('id=com.libercoop.appliber:id/btn_login').click();
  await client.deleteSession();
}

main();
