import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Header = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
});

export default Header;
