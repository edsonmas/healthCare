import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, TouchableOpacity, StyleSheet } from 'react-native';

// Lista expandida de médicos com datas e horários de disponibilidade simulados
const doctorsData = [
  {
    nome: 'Dr. João',
    especialidade: 'Médico especializado em cardiologia com vasta experiência.',
    perfil: 'Cardiologia',
    disponibilidade: [
      { data: '2023-10-15', horario: '08:00' },
      { data: '2023-10-15', horario: '14:00' },
      { data: '2023-10-20', horario: '10:30' },
      { data: '2023-10-25', horario: '15:00' },
    ],
  },
  {
    nome: 'Dra. Maria',
    especialidade: 'Ortopedista com foco em tratamento de lesões esportivas.',
    perfil: 'Ortopedia',
    disponibilidade: [
      { data: '2023-10-16', horario: '09:30' },
      { data: '2023-10-20', horario: '14:30' },
      { data: '2023-10-25', horario: '11:00' },
      { data: '2023-10-30', horario: '13:30' },
    ],
  },
];

const currentDate = '2023-10-15'; // Data atual para simulação

const AppointmentScreen = () => {
  const [doctors, setDoctors] = useState(doctorsData);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const scheduleAppointment = () => {
    console.log('Agendamento:', selectedDoctor, selectedDate, selectedTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamento Simples</Text>
      <Button title="Selecionar Médico" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Escolha um médico</Text>
          <FlatList
            data={doctors}
            keyExtractor={(item) => item.nome}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedDoctor(item)} style={styles.doctorItem}>
                <Text style={styles.doctorName}>{item.nome}</Text>
                <Text style={styles.doctorSpecialty}>{item.especialidade}</Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Confirmar Médico" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {selectedDoctor && (
        <View style={styles.selectedDoctorContainer}>
          <Text style={styles.selectedDoctorText}>Médico Selecionado:</Text>
          <Text style={styles.selectedDoctorName}>{selectedDoctor.nome}</Text>
          <Text style={styles.selectedDoctorText}>Escolha uma data:</Text>
          <FlatList
            data={selectedDoctor.disponibilidade}
            keyExtractor={(item) => item.data + item.horario}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={
                  currentDate > item.data
                    ? [styles.dateItem, styles.disabledDate]
                    : selectedDate === item.data
                    ? [styles.dateItem, styles.selectedDate]
                    : styles.dateItem
                }
                onPress={() => setSelectedDate(item.data)}
                disabled={currentDate > item.data}
              >
                <Text style={styles.dateText}>{item.data}</Text>
                <Text style={styles.dateText}>{item.horario}</Text>
              </TouchableOpacity>
            )}
          />
          {selectedDate && (
            <View>
              <Text style={styles.selectedDoctorText}>Escolha um horário:</Text>
              <FlatList
                data={selectedDoctor.disponibilidade.filter((item) => item.data === selectedDate)}
                keyExtractor={(item) => item.horario}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={selectedTime === item.horario ? styles.selectedTime : styles.timeItem}
                    onPress={() => setSelectedTime(item.horario)}
                  >
                    <Text style={styles.timeText}>{item.horario}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button title="Agendar Consulta" onPress={scheduleAppointment} />
            </View>
          )}
        </View>
      )}
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
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 16,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  doctorItem: {
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: 'gray',
  },
  selectedDoctorContainer: {
    alignItems: 'center',
    margin: 20,
  },
  selectedDoctorText: {
    fontSize: 16,
    marginBottom: 4,
  },
  selectedDoctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  disabledDate: {
    backgroundColor: '#f0f0f0',
  },
  selectedDate: {
    backgroundColor: '#e0e0e0',
  },
  dateText: {
    fontSize: 16,
  },
  timeItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  selectedTime: {
    backgroundColor: '#e0e0e0',
  },
  timeText: {
    fontSize: 16,
  },
});

export default AppointmentScreen;