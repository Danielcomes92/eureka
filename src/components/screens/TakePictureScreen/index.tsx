import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useNavCustom from '../../../utils/hooks/useNavCustom';
import NAVIGATION_SCREENS from '../../../constants/routes';

const TakePictureScreen = () => {
  const {handleNavigation} = useNavCustom();

  useEffect(() => {
    setTimeout(() => {
      handleNavigation(NAVIGATION_SCREENS.PICTURE);
    }, 5000);
  }, [handleNavigation]);

  return (
    <View style={styles.container}>
      <Text>Take Picture Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TakePictureScreen;
