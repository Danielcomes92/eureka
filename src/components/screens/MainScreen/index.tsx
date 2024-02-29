import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  FlatList,
  Image,
} from 'react-native';
import useNavCustom from '../../../utils/hooks/useNavCustom';
import NAVIGATION_SCREENS from '../../../constants/routes';
import usePermissions from '../../../utils/hooks/usePermissions';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useImagesStore} from '../../../store/images';

const MainScreen = () => {
  const {handleNavigation} = useNavCustom();
  const {hasPermission, requestPermission} = usePermissions();
  const setImagesFromLibrary = useImagesStore(
    state => state.setImagesFromLibrary,
  );
  const removeImage = useImagesStore(state => state.removeImage);
  const images = useImagesStore(state => state.images);

  const fetchPhotos = useCallback(async () => {
    try {
      const imagesAux: {id: string; uri: string}[] = [];
      const response = await CameraRoll.getPhotos({
        assetType: 'Photos',
        first: 10,
      });
      response.edges.forEach(edge => {
        if (edge.node.group_name[0] === 'piktapp') {
          imagesAux.push({
            id: edge.node.id,
            uri: edge.node.image.uri,
          });
        }
      });
      setImagesFromLibrary(imagesAux);
    } catch (error) {
      console.log('Error loading images:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeImageHandler = async (item: {uri: string; id: any}) => {
    try {
      await CameraRoll.deletePhotos([item.uri]);
      removeImage(item.id);
    } catch (error) {
      console.log('Error removing image', error);
    }
  };

  const handlePermissionDenied = () => {
    Linking.openSettings();
  };

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    if (!images.length && hasPermission) {
      fetchPhotos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  return (
    <View style={styles.container}>
      <View style={styles.topContentContainer}>
        {images?.length ? (
          <FlatList
            data={images}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={{alignItems: 'center'}}>
                <Pressable
                  style={({pressed}) => [{opacity: pressed ? 0.75 : 1}]}
                  onPress={() =>
                    handleNavigation(NAVIGATION_SCREENS.PICTURE, item)
                  }>
                  <Image source={{uri: item.uri}} style={styles.image} />
                </Pressable>
                <Pressable
                  style={({pressed}) => [
                    {opacity: pressed ? 0.75 : 1},
                    styles.button,
                  ]}
                  onPress={() => removeImageHandler(item)}>
                  <Text style={styles.buttonText}>Delete image</Text>
                </Pressable>
              </View>
            )}
            contentContainerStyle={styles.flatListContainer}
            horizontal
          />
        ) : (
          <Text style={styles.noPhotosText}>
            No photos available. Take some pictures!
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {!hasPermission ? (
          <>
            <Text style={styles.warnText}>
              You've denied the app access to your library. Please go to
              settings and allow it before continuing to use the app.
            </Text>
            <Pressable
              style={({pressed}) => [
                {opacity: pressed ? 0.75 : 1},
                styles.button,
              ]}
              onPress={handlePermissionDenied}>
              <Text style={styles.buttonText}>Open Settings</Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={({pressed}) => [
              {opacity: pressed ? 0.75 : 1},
              styles.button,
            ]}
            onPress={() =>
              handleNavigation(
                NAVIGATION_SCREENS.TAKE_PICTURE,
                images.length ? 'Take more pictures' : 'Take a picture',
              )
            }>
            <Text style={styles.buttonText}>
              {images.length ? 'Take more pictures' : 'Take a picture'}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  flatListContainer: {
    marginTop: 150,
  },
  topContentContainer: {
    flex: 3 / 4,
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    margin: 10,
  },
  noPhotosText: {
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
  },
  button: {
    padding: 16,
    backgroundColor: 'black',
    borderRadius: 4,
    width: 175,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  warnText: {
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});

export default MainScreen;
