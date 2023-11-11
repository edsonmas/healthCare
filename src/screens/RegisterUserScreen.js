import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../api/api';
import { Picker } from '@react-native-picker/picker';

const RegisterUserScreen = ({ navigation }) => {

  const [userData, setUserData] = useState({
    email: '',
    senha: '',
    nome: '',
    dataNascimento: '',
    contatos: '',
    genero: 'Masculino',
    endereco: '',
    historicoMedico: '',
  });

  const handleRegister = () => {
    api.post("/usuarios/registrar", userData)
      .then((res) => {
        console.log(res)
        navigation.navigate('Login');
        Alert.alert("cadastrado com sucesso")
        setTimeout(() => {
          navigation.navigate('Login')
        }, 2000);
      })
      .catch((err) => {
        console.log(err)
        Alert.alert("Deu erro ao cadastrar")
      })
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={userData.nome}
        onChangeText={(itemValue) => setUserData({...userData, nome: itemValue})}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email}
        onChangeText={(itemValue) => setUserData({...userData, email: itemValue})}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={userData.senha}
        onChangeText={(itemValue) => setUserData({...userData, senha: itemValue})}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Data de nascimento"
        value={userData.dataNascimento}
        onChangeText={(itemValue) => setUserData({...userData, dataNascimento: itemValue})}
      />
      <View  style={styles.input}>
      <Picker
        selectedValue={userData.genero}
        style={styles.picker}
        onValueChange={(itemValue) => setUserData({ ...userData, genero: itemValue })}
      >
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Feminino" value="Feminino" />
        <Picker.Item label="Outro" value="Outro" />
      </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Contato"
        value={userData.contatos}
        onChangeText={(itemValue) => setUserData({...userData, contatos: itemValue})}
      />
      <TextInput
        style={styles.input}
        placeholder="Histórico Médico"
        value={userData.historicoMedico}
        onChangeText={(itemValue) => setUserData({...userData, historicoMedico: itemValue})}
        multiline
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegisterUserScreen;
