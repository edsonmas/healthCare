import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../api/api';
import GlobalStateContext from '../contextGlobal/GlobalStateContext';
// Lista simulada de consultas do usuário



const MyAppointmentsScreen = ({ navigation }) => {

  const {
    userData
  } = useContext(GlobalStateContext);


  const [userAppointments, setUserAppointments] = useState([

  ]);

  useEffect(() => {
    api.get(`/consultas/usuario/${userData.id}`)
      .then((res) => {
        console.log(res.data)
        setUserAppointments(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const cancelAppointment = (id) => {
    // Filter out the appointment with the specified id
    setUserAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Consultas</Text>
      <FlatList
        data={userAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const dataHoraString = item.dataHora;
          const dataHora = new Date(dataHoraString);

          const data = dataHora.toISOString().split('T')[0];

          const hora = dataHora.toISOString().split('T')[1].split('.')[0];


          return (
            <View style={styles.appointmentItem}>
              <Text style={styles.doctorName}>{item.medico.nome}</Text>
              <Text style={styles.appointmentDetails}>
                {data}, {hora}
              </Text>
              <Text style={styles.appointmentDetails}>{item.medico.especialidade}</Text>
              <TouchableOpacity onPress={() => cancelAppointment(item.id)} style={styles.buttonCancel}>
                <Text style={{ color: "white" }}>Cancelar consulta</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('SearchDoctors')} style={styles.button}>
        <Text style={{ color: "white" }}>Lista de medicos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Appointment')} style={styles.button}>
        <Text style={{ color: "white" }}>Cadastrar consulta</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  appointmentItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appointmentDetails: {
    fontSize: 16,
    color: 'gray',
  },
  button: {
    height: 40,
    padding: 10,
    backgroundColor: '#19c37d',
    marginBottom: "20%"
  },
  buttonCancel: {
    height: 40,
    padding: 10,
    backgroundColor: 'red',
    marginTop: 10,
  },
});

export default MyAppointmentsScreen;
