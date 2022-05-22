import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView, Keyboard} from 'react-native';
//import { Component } from 'react/cjs/react.production.min';
//import quickstart from "./quickstart"
//import submitToGoogle from "./vision"
import * as Speech from 'expo-speech';
import config from './node_modules/expo/expo-module.config.json';
import FlatButton from './button';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SelectDropdown, {SelectDropdownProps} from 'react-native-select-dropdown';
var myLang = require('./languages.js');
var lang = myLang.languages;
var API_KEY = ''; //enter API KEY here
let pickedLang = '';
var base64data
var url
var ip

export default class App extends React.Component {
  
    state = {
      loading: false,
    };
    
    
    render() {
      let languages = Array.from(lang.keys());  //gets all languages and puts them in an array
      //console.log(keys);
      //const countries = ["Egypt", "Canada", "US"];
      console.log('Starting app')
      console.log('config', config);

      return (
        <ImageBackground source={require('./assets/Audibraille-logos_background.jpeg')} style={styles.background} >
          <SelectDropdown 
            data={languages}
            defaultButtonText= "Choose a language"
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              pickedLang = lang.get(selectedItem);
              console.log(pickedLang);
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />   
          <FlatButton text='Take Picture' onPress={() => this.submitToGoogle()} />
          <View>
          <Text style={styles.text}>Enter IP Address of pi:</Text>
            <TextInput 
            style={styles.input} 
            placeholder='e.g. 127.0.0.1'
            //keyboardType='numeric'
            onChangeText={(val) => ip=val} />
          </View>
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

    stopVoice = async () => {
      Speech.stop();
    }
      
    }
    //method that will do the text translation based on language the user picks
    googleTranslate = async (text,lang) => {
      const transResponse = await fetch('https://translation.googleapis.com/language/translate/v2?target=' + lang + '&key=' + API_KEY + '&q=' + text,
      {
        q: text, target: lang, key: API_KEY,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
      }
    );
    const tresponse = await transResponse.json();
    var translation = tresponse.data.translations[0].translatedText;
    console.log(translation);
    const speakTranslation = () => {
      const translationMsg = translation;
      const options = {
        language: pickedLang
      } 
      Speech.speak(translationMsg, options);
    }
    speakTranslation(); 
    //return translation;
    }
    
    // this method calls the pi to take picture and then converts it to base64encoded string and sends it to the image text detection api from google. The text is then converted to speech.
    submitToGoogle = async () => {
      //console.log('ip',this.getIPFromAmazon());
      //let base64 = this.restCall();
      //console.log('button press works');
      //console.log(ip);
      url = 'http://' + ip + ':8080';
      //console.log(url);
      Speech.stop();
      const imgTransfer = await fetch(url, {headers: { Accept: 'image/jpeg', 'Content-Type': 'image/jpeg'}}) //url is the webserver http call
      const imageBlob = await imgTransfer.blob()
      var reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = async () => {
        base64data = reader.result;
        //console.log(base64data);
      
      //console.log('reader result',reader.result);
      //console.log('line 67',base64data);
      //let base64IOSencode = base64data.split('data:image/jpeg;base64,')[1]; //splits the first part of the base64encoded string that we don't need
      //let base64Androidencode = base64data.split('data:application/octet-stream;base64,')[1];
      let base64encode = base64data.split(',')[1]; // will get the base64encoded string after the comma since the HTTP request can be different for each device.
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
          API_KEY, //fill in with your API KEY
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
        // if lang of text (get from the js) then just read it
        // else do translation and send the translated text into speak call
        
        var locale = responseJson.responses[0].textAnnotations[0].locale;
        console.log(text);
        console.log(locale);
        
        const speak = () => {
          const thingToSay = text;
          const options = {
            language: locale
          }
          Speech.speak(thingToSay, options);
        }
        
        //console.log('locale', locale);
        if(locale == pickedLang || pickedLang == ''){
          speak();
          return; 
        }
        else{
          this.googleTranslate(text, pickedLang);
          /*var translation = this.googleTranslate(text, pickedLang);
          console.log(translation);
          const speakTranslation = () => {
            const translationMsg = translation;
            const options = {
              language: pickedLang
            } 
            Speech.speak(translationMsg, options);
          }
          //speakTranslation();  */
        } 
         
        
        this.setState({
          googleResponse: responseJson,
          uploading: false
        }); 
      } catch (error) {
        console.log(error);
        const speakError = () => {
          const errorMessage = "Error with image, please try again";
          Speech.speak(errorMessage);
        }
        speakError();
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
  },
  input: {
    borderWidth: 2,
    borderColor: '#777',
    height: 40,
    margin: 0,
    width: 200,
  },
  circle: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    height: 150,
    marginBottom: 10,
    alignItems: 'center'
},
  text: {
    fontSize: 14,
    margin: 0,
    color: '#ffffff',
    textAlign: 'center'
  }
})

