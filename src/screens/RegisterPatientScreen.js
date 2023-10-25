import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importe Picker desta forma
import axios from 'axios';

const RegisterPatientScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    nomeUsuario: '',
    email: '',
    senha: '',
    nome: '',
    dataNascimento: '',
    contato: '',
    genero: 'Masculino',
    endereco: '',
    historicoMedico: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleRegister = () => {
    // Realize validações de entrada aqui
    const errors = {};

    if (userData.nomeUsuario.length < 3 || userData.nomeUsuario.length > 100) {
      errors.nomeUsuario = 'Nome de usuário deve conter de 3 a 100 caracteres';
    }

    // Adicione outras validações aqui (data de nascimento, email, etc.)

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      // Faça o registro do paciente (simulado)
      console.log('Paciente registrado:', userData);

      // Redirecione para a tela de login ou outra tela apropriada
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Paciente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        onChangeText={(text) => setUserData({ ...userData, nomeUsuario: text })}
      />
      {validationErrors.nomeUsuario && (
        <Text style={styles.errorText}>{validationErrors.nomeUsuario}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setUserData({ ...userData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(text) => setUserData({ ...userData, senha: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => setUserData({ ...userData, nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        onChangeText={(text) => setUserData({ ...userData, dataNascimento: text })}
      />
      <Picker
        selectedValue={userData.genero}
        style={styles.picker}
        onValueChange={(itemValue) => setUserData({ ...userData, genero: itemValue })}
      >
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Feminino" value="Feminino" />
        <Picker.Item label="Outro" value="Outro" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        onChangeText={(text) => setUserData({ ...userData, endereco: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Contato"
        onChangeText={(text) => setUserData({ ...userData, contato: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Histórico Médico"
        onChangeText={(text) => setUserData({ ...userData, historicoMedico: text })}
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
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default RegisterPatientScreen;
