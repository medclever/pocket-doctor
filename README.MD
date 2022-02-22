# Настройка проекта

```
npm i
npx react-native link
```

# Сборка JS приложения

```
// Копируем локальные настройки для приложения
// Для бесплатной версии
cp app/constants/params.local.android_free_ru.js app/constants/params.local.js
// Для платной версии
cp app/constants/params.local.android_pro.js app/constants/params.local.js

// Изменить VersionCode, VersionName в app/constants/params.js
```

# Сборка приложения под Android

```
// Войти в приложение
cd android/app

// Копируем ключи для подписки приложения
// Для бесплатной версии
cp key_pocket_doctor_free_ru.keystore keys.keystore
// Для платной версии
cp key_pocket_doctor.keystore keys.keystore

// Вставить пароли в gradle.properties
cp gradle.properties.sample gradle.properties

../gradlew assembleRelease
```

# =========================

# For all

# Необходимо положить данные для работы приложения

```
android/app/src/main/assets/www/database.db
android/app/src/main/assets/www/images
```

```
- Установить пакеты
npm i && npx react-native link

- Очистить папку с релизами
rm -rf release && mkdir -p release

- Скопировать и заполнить значения
// cp android/app/gradle.properties.sample android/app/gradle.sample
```

# Free RU version

```
cp app/constants/params.local.android_free_ru.ts app/constants/params.local.ts \
    && rm -rf android/app/src/main/res && cp -R android/resources/free_ru/res android/app/src/main/res \
    && cd android/app \
    && cp key_pocket_doctor_free.keystore keys.keystore \
    && ../gradlew assembleRelease \
    && cd ../.. \
    && cp android/app/build/outputs/apk/release/app-release.apk release/android_free_ru.apk
```

# Free EN version

```
cp app/constants/params.local.android_free_en.ts app/constants/params.local.ts \
    && rm -rf android/app/src/main/res && cp -R android/resources/free_en/res android/app/src/main/res \
    && cd android/app \
    && cp key_pocket_doctor_free.keystore keys.keystore \
    && ../gradlew assembleRelease \
    && cd ../.. \
    && cp android/app/build/outputs/apk/release/app-release.apk release/android_free_en.apk
```

# Pro version

```
cp app/constants/params.local.android_pro.ts app/constants/params.local.ts \
    && rm -rf android/app/src/main/res && cp -R android/resources/pro/res android/app/src/main/res \
    && cd android/app \
    && cp key_pocket_doctor.keystore keys.keystore \
    && ../gradlew assembleRelease \
    && cd ../.. \
    && cp android/app/build/outputs/apk/release/app-release.apk release/android_pro.apk
```

```
adb -s DUM7N19318001541 install -t release/android_free_ru.apk \
    && adb -s DUM7N19318001541 install -t release/android_free_en.apk \
    && adb -s DUM7N19318001541 install -t release/android_pro.apk
```

adb -s emulator-5554 install -t release/android_free_ru.apk \
 && adb -s emulator-5554 install -t release/android_pro.apk
