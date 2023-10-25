import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const DoctorsScreen = () => {
  // Exemplo de lista de médicos
  const doctors = [
    {
      id: 1,
      name: 'Dr. João Silva',
      specialty: 'Cardiologia',
      profile: 'Médico especializado em cardiologia com vasta experiência.',
    },
    {
      id: 2,
      name: 'Dra. Maria Santos',
      specialty: 'Dermatologia',
      profile: 'Dermatologista com foco em tratamento de problemas de pele.',
    },
    {
      id: 3,
      name: 'Dr. Pedro Almeida',
      specialty: 'Ortopedia',
      profile: 'Ortopedista com experiência no tratamento de lesões e fraturas.',
    },
    {
      id: 4,
      name: 'Dra. Ana Pereira',
      specialty: 'Ginecologia',
      profile: 'Ginecologista com atendimento focado na saúde da mulher.',
    },
    {
      id: 5,
      name: 'Dr. Carlos Lima',
      specialty: 'Pediatria',
      profile: 'Pediatra com vasta experiência em cuidados de saúde infantil.',
    },
  ];


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Médicos</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.doctorCard}>
            <Text style={styles.doctorName}>{item.name}</Text>
            <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
            <Text style={styles.doctorProfile}>{item.profile}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  doctorCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 16,
  },
  doctorProfile: {
    fontSize: 14,
  },
});

export default DoctorsScreen;
