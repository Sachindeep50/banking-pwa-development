# Mobile wrapper security

This Capacitor wrapper loads the banking web app in native iOS and Android shells.

Android screenshot and screen-recording protection is implemented by `FLAG_SECURE` in the Android activity. iOS and browser PWAs cannot universally prevent OS-level screenshots or recording, so the iOS shell should use privacy masking when backgrounded and avoid exposing sensitive content in app-switcher previews.

Set `BANKING_APP_URL` to the deployed HTTPS URL before syncing the native projects. Do not ship the local development URL in a production build.
