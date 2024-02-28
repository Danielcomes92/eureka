import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import NAVIGATION_SCREENS from '../../../constants/routes';
import useNavCustom from '../../../utils/hooks/useNavCustom';

const MainScreen = () => {
  const {handleNavigation} = useNavCustom();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main Screen</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.75 : 1,
              ...styles.button,
            },
          ]}
          onPress={() => handleNavigation(NAVIGATION_SCREENS.TAKE_PICTURE)}>
          <Text style={styles.buttonText}>Take picture</Text>
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
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
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

export default MainScreen;
