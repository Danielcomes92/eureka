import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Linking} from 'react-native';
import useNavCustom from '../../../utils/hooks/useNavCustom';
import NAVIGATION_SCREENS from '../../../constants/routes';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  PhotoFile,
} from 'react-native-vision-camera';
import {useFocusEffect} from '@react-navigation/native';

const TakePictureScreen = () => {
  const {handleNavigation} = useNavCustom();
  const {hasPermission, requestPermission} = useCameraPermission();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [photo, setPhoto] = useState<PhotoFile>();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useFocusEffect(
    useCallback(() => {
      setIsCameraActive(true);
      return () => {
        setIsCameraActive(false);
      };
    }, []),
  );

  const handlePermissionDenied = () => {
    Linking.openSettings();
  };

  const takePictureHandler = async () => {
    try {
      const takenPhoto = await camera?.current?.takePhoto({flash: 'auto'});
      setPhoto(takenPhoto);
    } catch (error) {
      console.log('show some fancy alert'); // ToDo
    }
  };

  useEffect(() => {
    if (photo) {
      handleNavigation(NAVIGATION_SCREENS.PICTURE, photo);
      setPhoto(undefined);
    }
  }, [photo, handleNavigation]);

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Camera device not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Take Picture Screen</Text>
      {!hasPermission ? (
        <View>
          <View style={styles.buttonContainer}>
            <Text style={styles.warnText}>
              You've denied the app to use the camera, please go to settings and
              allow using the camera to continue
            </Text>
            <Pressable
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.75 : 1,
                  ...styles.button,
                },
              ]}
              onPress={handlePermissionDenied}>
              <Text style={styles.buttonText}>Open settings</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isCameraActive && !photo}
            ref={camera}
            photo
          />
          {camera.current?.displayName && (
            <>
              <Pressable
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    ...styles.cameraButtonContainer,
                  },
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
});

export default TakePictureScreen;
