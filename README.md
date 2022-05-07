# Audibraille

Code made by Jason Shamayev

Make sure you have node.js installed when running this code https://nodejs.org/en/download/ you can install it here.

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

In the main code you will have to add an API key and put in the URL in the http request.
In the webserver code you will also need to hardcode your IP address at the moment and make sure the pi and your device are on the SAME network.

That should be all you need to get it to run in expo!

NOT USING EXPO
We will be using npm install to install all the node_modules needed to run the project. If you are running on a physical android device npx react-native run-android will be the command you will need to run.

If you get an error try running adb reverse tcp:8081 tcp:8081

Run the Python web server on your Pi and make sure it's in the same location as the camera.py file. This will allow the web server to run the camera.py command to take a picture and send it over HTTP when we make a GET request.

Encode.py is a quick python code for getting an encoding base64 string that is needed for calling google API. if you want to test an image feel free to use that to get the base64 string or there is a function in App.js for it as well, feel free to mess around!

BEFORE RUNNING: In the app it will ask for your ip address on the pi and place the ip you grabbed earlier. Please also make sure you update API_KEY with an actual API key you have to run the Google vision API.

That should be all you need and if you have any questions please reach out to me!
