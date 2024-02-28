import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import useNavCustom from '../../../utils/hooks/useNavCustom';
import NAVIGATION_SCREENS from '../../../constants/routes';
import {useRoute} from '@react-navigation/native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useImagesStore} from '../../../store/images';

const PictureScreen = () => {
  const {handleBack} = useNavCustom();
  const params = useRoute();
  const setImagesFromLibrary = useImagesStore(
    state => state.setImagesFromLibrary,
  );

  const saveImageHandler = async () => {
    try {
      await CameraRoll.save(`file://${params?.params?.path}`, {
        type: 'photo',
        album: 'piktapp',
      });
      fetchPhotos();
    } catch (error) {
      console.log('error saving photo...'); //ToDo
    }
  };

  const fetchPhotos = useCallback(async () => {
    try {
      const imagesAux = [];
      const response = await CameraRoll.getPhotos({
        assetType: 'Photos',
        first: 10,
      });
      response.edges.forEach(edge => {
        if (edge.node.group_name[0] === 'piktapp') {
          imagesAux.push({id: edge.node.id, uri: edge.node.image.uri});
        }
      });
      setImagesFromLibrary(imagesAux);
      handleBack(NAVIGATION_SCREENS.MAIN);
    } catch (error) {
      console.log('Error loading images:', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: params?.params?.path}}
        style={StyleSheet.absoluteFill}
      />

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
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.75 : 1,
              ...styles.button,
            },
          ]}
          onPress={saveImageHandler}>
          <Text style={styles.buttonText}>Save photo</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.75 : 1,
              ...styles.button,
            },
          ]}
          onPress={() => handleBack()}>
          <Text style={styles.buttonText}>Re take photo</Text>
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
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: 'black',
    borderRadius: 4,
    marginVertical: 12,
  },
  buttonText: {
    color: 'white',
  },
});

export default PictureScreen;
