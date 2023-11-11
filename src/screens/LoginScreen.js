import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import api from '../api/api';
import { useNavigation } from '@react-navigation/native';
import GlobalStateContext from '../contextGlobal/GlobalStateContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { 
    setUserData
  } = useContext(GlobalStateContext);


  const handleLogin = () => {
    api.post("/autenticacao/verificar-credenciais", {
      email: email,
      senha: password
    })
    .then((res) => {
      navigation.navigate("MyAppointments")
      setUserData(res.data)
    })
    .catch((err) => {
      console.log(err)
      Alert.alert("Não foi possivel realizar o login")
    })
  };

  const navigateToRegister = () => {
    navigation.navigate('RegisterUser');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity title="Login" style={styles.button} onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity title="Cadastrar" style={styles.button} onPress={navigateToRegister} >
      <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
    width: "70%"
  },
  button: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#19c37d",
    width: "70%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LoginScreen;
