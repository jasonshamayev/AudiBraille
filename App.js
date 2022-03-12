import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView} from 'react-native';
//import { Component } from 'react/cjs/react.production.min';
//import quickstart from "./quickstart"
//import submitToGoogle from "./vision"
import config from './config';

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
    submitToGoogle = async () => {
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
                source: {
                  imageUri: "gs://audibraille-vision/Kushal.jpg"
                }
              }
            }
          ]
        });
        let response = await fetch(
          'https://vision.googleapis.com/v1/images:annotate?key=' +
            '',
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
        const {responses} = responseJson
        
        console.log(responses.fullTextAnnotation);
        //console.log(responseJson);
        
        //console.log(responseJson);

        //responseJson.parse("text");
        //console.log(responseJson)
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

