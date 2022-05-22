# Audibraille

Code made by Jason Shamayev

## BEFORE YOU START:

Make sure you have node.js installed when running this code https://nodejs.org/en/download/ you can install it here.

Attached are CAD files for the frames and a case for the pi and battery pack. For the project a raspberry pi zero and pisugar battery were used and that is what the design specs for. The camera used is called zerocam for raspberry pi. Ideally the user will wear the headset and just have to press a button in the app to call the web server on the pi and start taking a picture.

It is important that the pi and phone being used are connected to the SAME network as the image transfer is done via Wi-Fi so the web server on the pi will not work if they are not on the same network!

## GETTING STARTED WITH THE PI:

You will need a raspberry pi with a camera module connected for this to work. In the webServer folder you will need to put camera.py and server.py in the same directory and have it run server.py on startup of the pi using systemd. I recommend running the pi in console mode only to save resources. Make sure to grab the ip address on the pi and save it somewhere as you will need it for later since the app is still in development! You will need to go to raspi-config settings and make sure the camera setting is ON for the camera to work. The code is in python so when running it make sure to use your version of python and ./server.py so for example if you have python3 (which is recommended) do python3 ./server.py to run the server.

Link for making a program run on startup: https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/
systemd and chrontab are recommended

## USING EXPO:

On your phone make sure you have downloaded the Expo Go app and are connected to the same Wi-Fi as the raspberry pi is connected to.

Once you pull from github make sure you run:

npm install

this will install all the node modules you will need.

Also make sure you have installed Expo by using:

npm install --global expo-cli

if running on mac make sure to use sudo!

running should be as simple as using:
expo start

In the main code you will have to add an API key

That should be all you need to get it to run in expo!

To generate APK:

https://medium.com/geekculture/react-native-generate-apk-debug-and-release-apk-4e9981a2ea51

To install APK:
make sure an android device is plugged in and run:

adb install full-path\AudiBraille\android\app\build\outputs\apk\debug\app-debug.apk

the path should be where the generated APK was saved which should be in the release directory

Encode.py (in webServer) is a quick python code for getting an encoding base64 string that is needed for calling google API. if you want to test an image feel free to use that to get the base64 string or there is a function in App.js for it as well, feel free to mess around!

That should be all you need and if you have any questions please reach out to me!
