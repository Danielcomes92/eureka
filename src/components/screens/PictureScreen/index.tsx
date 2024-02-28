import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import useNavCustom from '../../../utils/hooks/useNavCustom';
import NAVIGATION_SCREENS from '../../../constants/routes';

const PictureScreen = () => {
  const {handleBack} = useNavCustom();

  return (
    <View style={styles.container}>
      <Text>Picture Screen</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.75 : 1,
              ...styles.button,
            },
          ]}
          onPress={() => handleBack(NAVIGATION_SCREENS.MAIN)}>
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    padding: 16,
    backgroundColor: 'black',
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
});

export default PictureScreen;
