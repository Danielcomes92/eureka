import {useEffect, useState} from 'react';
import {Platform, Linking, Alert} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const openSettingsAlert = () => {
    Alert.alert(
      'Permission required',
      Platform.OS === 'ios'
        ? 'Please allow access to your photos and videos from settings'
        : 'Please allow access to the photo library from settings',
      [
        {
          text: 'Open Settings',
          onPress: () =>
            Platform.OS === 'ios' ? Linking.openSettings() : null,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const checkPermission = async () => {
    const permission = await check(
      Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      }),
    );
    setHasPermission(
      permission === RESULTS.GRANTED || permission === RESULTS.LIMITED,
    );
  };

  const requestPermission = async () => {
    const permission = await request(
      Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      }),
    );
    setHasPermission(
      permission === RESULTS.GRANTED || permission === RESULTS.LIMITED,
    );
    if (permission === RESULTS.BLOCKED) {
      openSettingsAlert();
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return {hasPermission, requestPermission};
};

export default useCameraPermission;
