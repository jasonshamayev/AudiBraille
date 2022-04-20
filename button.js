import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default function FlatButton({ text, onPress }) {
    return(
      <TouchableOpacity onPress= {onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}> { text } </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 40,
        paddingHorizontal: 100,
        backgroundColor: '#f01d71',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 28,
        textAlign: 'center',
      }
    })