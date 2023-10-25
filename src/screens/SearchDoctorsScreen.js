import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const SearchDoctorsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSearch = () => {
    // Realizar a busca com base no searchTerm
    const results = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Busca de Médicos</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8, marginBottom: 16 }}
        placeholder="Digite o nome ou especialidade do médico"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <Button title="Buscar" onPress={handleSearch} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ fontSize: 16, color: 'gray' }}>{item.specialty}</Text>
            <Text>{item.profile}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchDoctorsScreen;
