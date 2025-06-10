import { remote } from 'webdriverio';

const opts = {
  path: '/wd/hub',
  port: 4723,
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
  await rutField.setValue('20004397-9');

  const loginButton = await client.$('id=com.libercoop.appliber:id/btn_login');
  await loginButton.click();

  const errorMsg = await client.$('id=com.libercoop.appliber:id/content_text');
  const errorText = await errorMsg.getText();

  console.log('Mensaje mostrado:', errorText);

  await client.deleteSession();
})();
