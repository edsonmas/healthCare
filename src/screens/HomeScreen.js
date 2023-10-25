import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

const HomeScreen = () => {
  return (
    <View>
      <Header title="Home" />
      <View>
        <Text>Welcome to the Home Screen!</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
