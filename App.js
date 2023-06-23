import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import StackNavigator from './src/components/StackNavigator';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      {/* <SafeAreaView> */}
      <StackNavigator />
      {/* </SafeAreaView> */}
    </Provider>
  );
};
export default App;
