import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Modal, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import api from '../api/api';
import GlobalStateContext from '../contextGlobal/GlobalStateContext';

// Lista expandida de médicos com datas e horários de disponibilidade simulados

const currentDate = '2023-10-15'; // Data atual para simulação

const AppointmentScreen = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [dataSelected, setDataSelectted] = useState(false)
  const [hourSelected, setHourSelectted] = useState(false)

  const [passed, setPassed] = useState(false)
  const [passedDate, setPassedDate] = useState(false)



  const {
    userData
  } = useContext(GlobalStateContext);

  const formatarData = (input) => {
    // Lógica para adicionar a máscara de data (DD/MM/YYYY)
    if (input.length <= 2) {
      return input.replace(/[^0-9]/g, '');
    }
    if (input.length <= 4) {
      return `${input.slice(0, 2)}/${input.slice(2)}`;
    }
    return `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4, 8)}`;
  };


  const formatarHorario = (input) => {
    // Lógica para adicionar a máscara de horário (HH:mm)
    if (input.length <= 2) {
      // Garante que apenas dígitos são mantidos
      return input.replace(/[^0-9]/g, '');
    }
    if (input.length <= 4) {
      // Formata como "HH:mm"
      return `${input.slice(0, 2)}:${input.slice(2)}`;
    }
    // Pode adicionar mais lógica se necessário, dependendo do formato desejado
    return `${input.slice(0, 2)}:${input.slice(2, 4)}`;
  };

  const handleInputChange = (input) => {
    const dataFormatada = formatarData(input.replace(/[^0-9]/g, ''));
    setSelectedDate(dataFormatada);
  };

  const handleInputChangeHour = (input) => {
    const hourFormatada = formatarHorario(input.replace(/[^0-9]/g, ''));
    setSelectedTime(hourFormatada);
  
    // Extrair hora e minuto do horário formatado
    const [hora, minuto] = hourFormatada.split(':');
  
    // Verificar se o horário está indisponível
    const isHorarioIndisponivel = doctors.some((doctor) =>
      doctor.indisponibilidades.some(
        (indisponibilidade) => {
          // Extrair hora e minuto da indisponibilidade
          const [horaIndisponivel, minutoIndisponivel] =
            indisponibilidade.horario.split(':');
          
          // Comparar apenas hora e minuto
          return hora === horaIndisponivel && minuto === minutoIndisponivel;
        }
      )
    );
  
    // Lógica específica para horários indisponíveis ou disponíveis
    if (isHorarioIndisponivel) {
      console.log('Horário indisponível');
      setPassed(false)
      // Adicione a lógica que você deseja executar quando o horário estiver indisponível
    } else {
      console.log('Horário disponível');
      setPassed(true)
    }
  };


  const handleAgendar = () => {
    api.post('/consultas/agendar',{
      medicoId: selectedDoctor.id,
      usuarioId: userData.id,
      dataHora: `${selectedDate} ${selectedTime}`
    })
    .then((res) => {
      console.log(res.data)
      // navigation.navigate('MyAppointments')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    console.log(selectedDoctor)
  }, [selectedDoctor])


  useEffect(() => {
    axios.get('https://b3c7-2804-774-8101-a81b-7d12-c81c-a952-361c.ngrok.io/medicos/indisponibilidades')
      .then((res) => {
        console.log("datas indis", res.data)
        setDoctors(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <View style={styles.container}>
      {selectedDoctor ?
        null :
        <>
          <Text style={styles.title}>Agendamento Simples</Text>
          <Button title="Selecionar Médico" onPress={() => setModalVisible(true)} />
        </>
      }


      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Escolha um médico</Text>
          <FlatList
            data={doctors}
            keyExtractor={(item) => item.nome}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: selectedDoctor?.nome === item.nome ? '#c4c4c4' : null }}>
                <TouchableOpacity onPress={() => setSelectedDoctor(item)} style={styles.doctorItem}>
                  <Text style={styles.doctorName}>{item.nome}</Text>
                  <Text style={styles.doctorSpecialty}>{item.perfil}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Button title="Confirmar Médico" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {selectedDoctor && (
        <View style={styles.selectedDoctorContainer}>
          <Text style={styles.selectedDoctorText}>Médico Selecionado:</Text>
          <Text style={styles.selectedDoctorName}>{selectedDoctor.nome}</Text>
          <Text style={styles.selectedDoctorText}>Escolha uma data: {selectedDate ? selectedDate : ""}</Text>
          <TextInput
            style={styles.input}
            placeholder="Selecionar Data"
            onChangeText={handleInputChange}
            value={selectedDate}
          />
          {dataSelected === false ?

            <TouchableOpacity onPress={() => setDataSelectted(selectedDate === null ? false : true)} style={styles.button}>
              <Text style={{ color: "white" }}>Continuar</Text>
            </TouchableOpacity> :
            null

          }

          {dataSelected && (
            <View >
              <Text style={styles.selectedDoctorText}>Escolha um horário:{selectedTime ? selectedTime : ""}</Text>
              <TextInput
                style={styles.input}
                placeholder="Selecionar Horario"
                onChangeText={handleInputChangeHour}
                value={selectedTime}
              />
              <TouchableOpacity onPress={ passed ? () => handleAgendar() : null} style={{ height:40, padding: 10, marginBottom: "60%", backgroundColor: passed ? '#19c37d' : '#c4c4c4'}}>
                <Text style={{ color: "white" }}>Marcar consulta</Text>
              </TouchableOpacity>

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
    padding: "20%",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    flex: 1,
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
  button: {
    height: 40,
    padding: 10,
    backgroundColor: '#19c37d',
    marginBottom: "60%"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
  },
});

export default AppointmentScreen;
