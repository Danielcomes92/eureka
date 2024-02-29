import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PictureScreen = () => {
  const params = useRoute();
  const [imageLocation, setImageLocation] = useState<string | null>(null);

  useEffect(() => {
    const getData = async (key: string) => {
      try {
        const value = await AsyncStorage.getItem(key);
        setImageLocation(value);
      } catch (error) {
        console.log('Error reading stored data:', error);
      }
    };

    getData(params?.params.id);
  }, [params]);

  return (
    <View style={styles.container}>
      <View style={styles.topContentContainer}>
        <Image
          source={{uri: params?.params?.uri}}
          resizeMode="contain"
          resizeMethod="auto"
          style={styles.image}
        />
        {imageLocation && (
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationText}>Location:</Text>
            <Text style={styles.locationTextB}>{imageLocation}</Text>
          </View>
        )}
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
  topContentContainer: {
    width: '100%',
    height: 600,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  locationText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationTextB: {
    fontSize: 18,
  },
  locationTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 4,
  },
});

export default PictureScreen;
