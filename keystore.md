# Android Release Keystore

## Keystore Details

| Property          | Value                       |
|-------------------|-----------------------------|
| **File**          | `android/app/my-upload-key.keystore` |
| **Type**          | PKCS12                      |
| **Alias**         | `mdm_chat`                  |
| **Store Password**| `zorrro1234`                |
| **Key Password**  | `zorrro1234`                |
| **Validity**      | 25 years (2026 → 2051)      |

## Certificate Info

```
CN  = Biswopaban
OU  = development
O   = zorrro
L   = kolkata
ST  = wb
C   = 91
```

## SHA Fingerprints

| Algorithm | Fingerprint |
|-----------|-------------|
| **SHA-1** | `D0:72:82:82:7A:BA:A1:B9:9A:A9:C9:A6:0A:A2:AD:EE:EC:4A:71:06` |
| **SHA-256** | `6C:77:69:12:3A:F1:44:76:1F:D9:DF:7C:89:CC:48:1F:89:77:5D:D1:BD:38:E8:18:13:02:ED:26:D1:2F:00:DB` |

## How It Was Generated

```bash
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore my-upload-key.keystore \
  -alias mdm_chat \
  -keyalg RSA \
  -keysize 2048 \
  -validity 9125 \
  -storepass zorrro1234 \
  -keypass zorrro1234 \
  -dname "CN=Biswopaban, OU=development, O=zorrro, L=kolkata, ST=wb, C=91"
```

## Signing Configuration

Credentials are stored in `android/gradle.properties`:

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=mdm_chat
MYAPP_UPLOAD_STORE_PASSWORD=zorrro1234
MYAPP_UPLOAD_KEY_PASSWORD=zorrro1234
```

Referenced in `android/app/build.gradle` under `signingConfigs.release`.

## Build a Signed APK / AAB

```bash
# APK
cd android && ./gradlew assembleRelease

# AAB (for Play Store upload)
cd android && ./gradlew bundleRelease
```

Output locations:
- APK → `android/app/build/outputs/apk/release/app-release.apk`
- AAB → `android/app/build/outputs/bundle/release/app-release.aab`

## ⚠️ Security Notes

- The `.gitignore` already excludes `*.keystore` (except `debug.keystore`) — **never commit release keystores**.
- For CI/CD, use environment variables or a secrets manager instead of `gradle.properties`.
- **Back up `my-upload-key.keystore` securely** — if lost, you cannot push updates to the same Play Store listing.