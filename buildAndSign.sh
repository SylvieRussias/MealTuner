#!/bin/bash
# Remove previous unsigned APK. 
rm -f platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
# Remove previous signed APK. 
rm -f ../ProdBuilds/MealTuner-1.0.0.apk
# Build APK. 
ionic cordova build android --release
# Sign APK. 
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../PlayStoreRessources/meal-tuner-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk MealTuner-1.0.0
# Compress APK. 
zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ../ProdBuilds/MealTuner-1.0.0.apk
# Remove currently built unsigned APK. 
rm -f platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
