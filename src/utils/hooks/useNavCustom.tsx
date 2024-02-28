import {useNavigation} from '@react-navigation/native';

const useNavCustom = () => {
  const navigation = useNavigation();

  const handleNavigation = (route: string, params?: any) => {
    // @ts-ignore
    return navigation.navigate(route, params);
  };

  const handleBack = (route?: string, params?: any) => {
    return route ? handleNavigation(route, {params}) : navigation.goBack();
  };

  return {
    handleNavigation,
    handleBack,
  };
};

export default useNavCustom;
