import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

const ProfileScreen = () => {
  return (
    <View>
      <Header title="Profile" />
      <View>
        <Text>Welcome to the Profile Screen!</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
