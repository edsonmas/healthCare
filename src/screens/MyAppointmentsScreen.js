import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Lista simulada de consultas do usuário
const userAppointments = [
  {
    id: 1,
    doctor: 'Dr. João',
    date: '2023-10-15',
    time: '08:00',
    specialty: 'Cardiologia',
  },
  {
    id: 2,
    doctor: 'Dra. Maria',
    date: '2023-10-16',
    time: '09:30',
    specialty: 'Ortopedia',
  },
  // Adicione mais consultas conforme necessário
];

const MyAppointmentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Consultas</Text>
      <FlatList
        data={userAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <Text style={styles.doctorName}>{item.doctor}</Text>
            <Text style={styles.appointmentDetails}>
              {item.date}, {item.time}
            </Text>
            <Text style={styles.appointmentDetails}>{item.specialty}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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
});

export default MyAppointmentsScreen;
