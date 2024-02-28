import React, {useEffect, useRef} from 'react';
import {Text, StyleSheet, Animated, ActivityIndicator} from 'react-native';

const Splash = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade out animation when component unmounts
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, 2250);
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <Text style={styles.text}>PiktaApp</Text>
      <ActivityIndicator size="large" color="white" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 32,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Splash;
