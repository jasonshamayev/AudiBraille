import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView, ImageBackground} from 'react-native';
//import { Component } from 'react/cjs/react.production.min';
//import quickstart from "./quickstart"
//import submitToGoogle from "./vision"
import * as Speech from 'expo-speech';
import config from './node_modules/expo/expo-module.config.json';
import FlatButton from './button';
var base64data
var url


export default class App extends React.Component {
  
    state = {
      loading: false,
    };
    
    render() {
      console.log('Starting app')
      console.log('config', config);

      return (
        <ImageBackground source={require('./assets/Audibraille-logos_background.jpeg')} style={styles.background} >
          <FlatButton text='Take Picture' onPress={() => this.submitToGoogle()} />
        </ImageBackground>
       
          
        
        /*<View style={styles.container}>
          <TouchableOpacity
          onPress={() => this.submitToGoogle()}
          style={styles.button}>
            <Text>Click</Text>
          </TouchableOpacity>
        </View> */
      );
    }

    getIPFromAmazon = async () => {
      fetch("https://checkip.amazonaws.com/").then(res => res.text()).then(data => console.log(data))
    }

    getIpClient = async () => {
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "https://api.ipify.org", true);
      xhttp.send();
      var ip = xhttp.responseText;
      console.log(ip);
    }
    
  

    async talk(text) {
      const speak = () => {
        const thingToSay = text;
        Speech.speak(thingToSay);
      }
    }
    
    restCall = async () => {
      const response = await fetch(url, {headers: { Accept: 'image/jpeg', 'Content-Type': 'image/jpeg'}})
      //console.log(response)
      const imageBlob = await response.blob()
      //let base64String = "";
	    var reader = new FileReader();
	    //console.log("next");
      reader.readAsDataURL(imageBlob);
      reader.onloadend = () => {
        var base64data = reader.result;
        //console.log(base64data);
      return base64data;
      }

      
    }
    
    submitToGoogle = async () => {
      //console.log('ip',this.getIPFromAmazon());
      //let base64 = this.restCall();
      //console.log('button press works');
      Speech.stop();
      const imgTransfer = await fetch('', {headers: { Accept: 'image/jpeg', 'Content-Type': 'image/jpeg'}}) //url is the webserver http call
      const imageBlob = await imgTransfer.blob()
      var reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = async () => {
        base64data = reader.result;
        //console.log(base64data);
      
      //console.log('reader result',reader.result);
      //await base64data;
      //console.log('line 67',base64data);
      //let base64IOSencode = base64data.split('data:image/jpeg;base64,')[1]; //splits the first part of the base64encoded string that we don't need
      //let base64Androidencode = base64data.split('data:application/octet-stream;base64,')[1];
      let base64encode = base64data.split(',')[1]; // will get the base64encoded string after the comma since the HTTP request can be different for each device.
      //console.log('base64encode', base64encode);
      //console.log('base64encode', base64encode);
      //console.log(base64data)
      //console.log('android', base64Androidencode);
      //var base64 = this.restCall();
      //await base64;
      console.log("waiting")
      
    
      try {
        this.setState({ uploading: true });
        let { image } = this.state;
        let body = JSON.stringify({
          requests: [
            {
              features: [
                //{ type: 'LABEL_DETECTION', maxResults: 10 },
                //{ type: 'LANDMARK_DETECTION', maxResults: 5 },
                //{ type: 'FACE_DETECTION', maxResults: 5 },
                //{ type: 'LOGO_DETECTION', maxResults: 5 },
                { type: 'TEXT_DETECTION', maxResults: 5 },
                //{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
                //{ type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
                //{ type: 'IMAGE_PROPERTIES', maxResults: 5 },
                //{ type: 'CROP_HINTS', maxResults: 5 },
                //{ type: 'WEB_DETECTION', maxResults: 5 }
              ],
              image: {
                /*source: {
                  imageUri: "gs://audibraille-vision/Kushal.jpg" // will use 'image.jpg' when running on pi
                } */
                content: base64encode //will need a base64encoded string here 
              }
            }
          ]
        });
        const response = await fetch(
          'https://vision.googleapis.com/v1/images:annotate?key=' +
          '', //fill in with your API KEY
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: body
          }
        );
        let responseJson = await response.json();
        //console.log(responseJson);
        const {responses} = responseJson;
        //console.log(responseJson);
        var text = responseJson.responses[0].fullTextAnnotation.text;
        console.log(text);
        const speak = () => {
          const thingToSay = text;
          Speech.speak(thingToSay);
        }
        speak();
        
        this.setState({
          googleResponse: responseJson,
          uploading: false
        }); 
      } catch (error) {
        console.log(error);
      }
    }
    }; 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f01d71',
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#f01d71',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

