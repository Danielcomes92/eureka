import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Linking, Image} from 'react-native';
import useNavCustom from '../../../utils/hooks/useNavCustom';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  PhotoFile,
} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useImagesStore} from '../../../store/images';
import useLocation from '../../../utils/hooks/useLocation';
import {useLocationStore} from '../../../store/location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TakePictureScreen = () => {
  const {handleBack} = useNavCustom();
  const {hasPermission, requestPermission} = useCameraPermission();
  const {hasPermission: hasLocationPermission} = useLocation();
  const [photo, setPhoto] = useState<PhotoFile>();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const setImagesFromLibrary = useImagesStore(
    state => state.setImagesFromLibrary,
  );
  const location = useLocationStore(state => state.location);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const storeData = async (key: string) => {
    try {
      await AsyncStorage.setItem(key, location);
    } catch (e) {
      console.log('error storing data', e);
    }
  };

  const handlePermissionDenied = () => {
    Linking.openSettings();
  };

  const takePictureHandler = async () => {
    try {
      const takenPhoto = await camera?.current?.takePhoto({flash: 'auto'});
      setPhoto(takenPhoto);
    } catch (error) {
      console.log('show some fancy alert', error); // ToDo
    }
  };

  const saveImageHandler = async () => {
    try {
      const imageId = await CameraRoll.save(`file://${photo?.path}`, {
        type: 'photo',
        album: 'piktapp',
      });
      storeData(imageId.substring(5));

      fetchPhotos();
    } catch (error) {
      console.log('error saving photo...', error); //ToDo
    }
  };

  const fetchPhotos = useCallback(async () => {
    try {
      const imagesAux: {
        id: string;
        uri: string;
        location: string | Promise<void>;
      }[] = [];
      const response = await CameraRoll.getPhotos({
        assetType: 'Photos',
        first: 10,
      });
      response.edges.forEach(edge => {
        if (edge.node.group_name[0] === 'piktapp') {
          imagesAux.push({
            id: edge.node.id,
            uri: edge.node.image.uri,
            location,
          });
        }
      });
      setImagesFromLibrary(imagesAux);
      handleBack();
    } catch (error) {
      console.log('Error loading images:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const phrases = [
    'What a great shot!',
    'Looking good!',
    'Capture the moment!',
    'Snap, snap, snap!',
    'Say cheese!',
    'Picture perfect!',
    'Smile for the camera!',
    "You're a natural!",
    'Strike a pose!',
    'Ready, set, shoot!',
  ];

  const randomPhraseIndex = Math.floor(Math.random() * phrases.length);
  const randomPhrase = phrases[randomPhraseIndex];

  const renderCameraButtons = () => {
    return (
      <View style={styles.iconsContainer}>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.75 : 1}]}
          onPress={() => handleBack()}>
          <Icon name="close" size={40} color="black" />
        </Pressable>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.75 : 1}]}
          onPress={() => setPhoto(undefined)}>
          <Icon name="flip-camera-android" size={40} color="black" />
        </Pressable>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.75 : 1}]}
          onPress={saveImageHandler}>
          <Icon name="save-alt" size={40} color="black" />
        </Pressable>
      </View>
    );
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Camera device not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!hasPermission || !hasLocationPermission ? (
        <View style={styles.buttonContainer}>
          <Text style={styles.warnText}>
            We need your permissions to use the camera and your location for a
            proper experience, please go to settings and allow us to use them
          </Text>
          <Pressable
            style={({pressed}) => [
              {opacity: pressed ? 0.75 : 1},
              styles.button,
            ]}
            onPress={handlePermissionDenied}>
            <Text style={styles.buttonText}>Open settings</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {photo ? (
            <>
              <Text style={styles.photoTitle}>{randomPhrase}</Text>
              <Image
                source={{uri: photo?.path}}
                resizeMode="contain"
                resizeMethod="auto"
                style={styles.image}
              />
              {renderCameraButtons()}
            </>
          ) : (
            <>
              <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true && !photo}
                ref={camera}
                photo
              />
              <Pressable
                style={({pressed}) => [
                  {opacity: pressed ? 0.5 : 1},
                  styles.cameraButtonContainer,
                ]}
                onPress={takePictureHandler}>
                <View style={styles.cameraButton} />
              </Pressable>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 8,
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    width: 280,
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    padding: 16,
    backgroundColor: 'black',
    borderRadius: 4,
    width: 150,
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
  cameraContainer: {
    flex: 1,
  },
  cameraButtonContainer: {
    position: 'absolute',
    bottom: 50,
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'relative',
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 100,
  },
  image: {
    width: '100%',
    height: 500,
  },
});

export default TakePictureScreen;
