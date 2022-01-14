import {AppStackNavigationProp} from '../page/stack/AppStack';
import {Button} from 'react-native';
import {useCallback} from 'react';
import {StageGameStackNavigationProp} from '../page/stack/StageGameStack';

export const BackButton = ({
  navigation,
}: AppStackNavigationProp | StageGameStackNavigationProp) => {
  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return <Button title={'뒤로'} onPress={goBack}></Button>;
};
