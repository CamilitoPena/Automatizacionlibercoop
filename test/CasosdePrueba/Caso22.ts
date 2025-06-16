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

  await client.$('id=com.libercoop.appliber:id/textviewRecuperarPassword').click();

  await client.$('id=com.libercoop.appliber:id/editTextRutClave').setValue('20004397-9');

  await client.$('id=com.libercoop.appliber:id/btn_continuar_rec_cla').click();

  const telefonoMask = await client.$('id=com.libercoop.appliber:id/textviewMovil');
  const otpField     = await client.$('id=com.libercoop.appliber:id/otpViewOtpview');

  await telefonoMask.waitForDisplayed({ timeout: 10_000 });
  await otpField.waitForDisplayed({ timeout: 10_000 });

  console.log('✅ Número enmascarado visible:', await telefonoMask.getText());
  console.log('✅ Campo OTP visible:', await otpField.isDisplayed());

  await client.back();
  await client.pause(1000);
  await client.back();

  await client.deleteSession();
}

main();
