# Introduction

It's a mobile app to help creating and balancing recipes.

# Development

## Installing developper tools

### Quick start

Install Node.js

$ npm i

$ ionic serve

Get an API key for Food Data Central (https://fdc.nal.usda.gov/), and put it in ./src/assets/config/api-access-food-data-central.json (replace "<your-key-here>" by your key).

### More info on https://ionicframework.com/docs

### Generate splash and icon

$ ionic cordova resources

## Making a production build

### Execute the BuildAndSign script to automagically build and sign your app! 

#### Prerequisites

Requires to know the keystore passphrase and the key password (see "Generate keystore and app key" section).

Requires the app to compile (using "ionic cordova build android --release"). 

Requires the keystore in ../PlayStoreRessources/meal-tuner-release-key.keystore

Requires Android buildtools/ path in your environment variable PATH. 

Requires the Java SDK bin/ path in your environment variable PATH. 

Produces the signed app apk in ../ProdBuilds/MealTuner-1.0.0.apk

#### Execute the script

$ buildAndSign.sh

Note: Version and app name are hardcoded in the script. You can upgrade the script or edit what is hardcoded.

### Generate keystore and app key (only once)

$ keytool -genkey -v -keystore meal-tuner-release-key.keystore -alias MealTuner-1.0.0 -keyalg RSA -keysize 2048 -validity 36500
Then,    choose a passphrase for your keystore. 
Finally, choose a password   for your key. 
