import {useNavigation} from '@react-navigation/native';

const useNavCustom = () => {
  const navigation = useNavigation();

  const handleNavigation = (route: string) => {
    // @ts-ignore
    return navigation.navigate(route);
  };

  const handleBack = (route?: string) => {
    return route ? handleNavigation(route) : navigation.goBack();
  };

  return {
    handleNavigation,
    handleBack,
  };
};

export default useNavCustom;
