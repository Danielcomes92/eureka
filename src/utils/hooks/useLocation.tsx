import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useLocationStore} from '../../store/location';

const useLocation = () => {
  const setUserLocation = useLocationStore(state => state.setUserLocation);
  const [hasPermission, setHasPermission] = useState(false);
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            startLocationUpdates();
          }
        } catch (err) {
          console.warn(err);
        }
      } else if (Platform.OS === 'ios') {
        setHasPermission(true); // On iOS, assume permission is granted
        startLocationUpdates();
      }
    };

    const startLocationUpdates = () => {
      const id = Geolocation.watchPosition(
        (position: {coords: {latitude: any; longitude: any}}) => {
          fetchPlaceInfo(position.coords);
        },
        (error: any) => {
          console.warn(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
      setWatchId(id);
    };

    const clearLocationWatch = () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };

    requestLocationPermission();

    return clearLocationWatch;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPlaceInfo = async (coords: {latitude: any; longitude: any}) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=18&addressdetails=1`,
      );
      const data = await response.json();
      const {address} = data;
      const formattedAddress = `${address.city}, ${address.country}`;

      setUserLocation(formattedAddress);
    } catch (error) {
      console.error('Error fetching place info:', error);
    }
  };

  return {hasPermission};
};

export default useLocation;
