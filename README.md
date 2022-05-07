# Audibraille

Code made by Jason Shamayev

Make sure you have node.js installed when running this code https://nodejs.org/en/download/ you can install it here.

Attached are CAD files for the frames and a case for the pi and battery pack. For the project a raspberry pi zero and pisugar battery were used and that is what the design specs for. The camera used is called zerocam for raspberry pi. Ideally the user will wear the headset and just have to press a button in the app to start taking a picture.

You will need a raspberry pi with a camera module connected for this to work. In the webServer folder you will need to put camera.py and server.py in the same directory and have it run server.py on startup of the pi using systemd. I recommend running the pi in console mode only to save resources. Make sure to grab the ip address on the pi and save it somewhere as you will need it for later since the app is still in development!

USING EXPO
Once you pull from github make sure you run:
npm install
this will install all the node modules you will need.
Also make sure you have installed Expo by using:
npm install --global expo-cli

running should be as simple as using:
expo start

If there are any issues please reach out!

In the main code you will have to add an API key

That should be all you need to get it to run in expo!

Encode.py (in webServer) is a quick python code for getting an encoding base64 string that is needed for calling google API. if you want to test an image feel free to use that to get the base64 string or there is a function in App.js for it as well, feel free to mess around!

BEFORE RUNNING: In the app it will ask for your ip address on the pi and place the ip you grabbed earlier. Please also make sure you update API_KEY with an actual API key you have to run the Google vision API.

That should be all you need and if you have any questions please reach out to me!
