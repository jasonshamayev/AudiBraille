import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView} from 'react-native';
//import { Component } from 'react/cjs/react.production.min';
//import quickstart from "./quickstart"
//import submitToGoogle from "./vision"
import * as Speech from 'expo-speech';
import config from './node_modules/expo/expo-module.config.json';
import SliderNativeComponent from 'react-native/Libraries/Components/Slider/SliderNativeComponent'
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
        <View style={styles.container}>
          <TouchableOpacity
          onPress={() => this.submitToGoogle()}
          style={styles.button}>
            <Text>Click</Text>
          </TouchableOpacity>
        </View>
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

      
    }
    
    submitToGoogle = async () => {
      //let base64 = this.restCall();
      const imgTransfer = await fetch(url, {headers: { Accept: 'image/jpeg', 'Content-Type': 'image/jpeg'}}) //url is the webserver http call
      const imageBlob = await imgTransfer.blob()
      var reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = () => {
        base64data = reader.result;
        //console.log(base64data);
      }
      await base64data;
      console.log(base64data) 
      //var base64 = this.restCall();
      //await base64;
      //console.log(base64)
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
                content: base64data //will need a base64encoded string here 
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
        const {responses} = responseJson;
        console.log(responseJson);
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
    }; 
}

// function App() {
//   const buttonClickedHandler = () => {
//     console.log('button clicked');
//     //need to have camera take picture here
//   };
  
  
//     return (
//           <View style={styles.container}>
//             <TouchableOpacity 
//               onPress={() => this.submitToGoogle('Kushal.jpg')}
//               style = {styles.button}
//               >
//                 <Text> Click </Text>
//               </TouchableOpacity>
//           </View>      
//     );
//   } 

 //export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f01d71',
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 300,
    marginTop: 200,
  },
})

