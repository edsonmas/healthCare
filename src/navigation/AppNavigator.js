import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAppointmentsScreen from '../screens/MyAppointmentsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DoctorsScreen from '../screens/DoctorsScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import RegisterPatientScreen from '../screens/RegisterPatientScreen';
import RegisterUserScreen from '../screens/RegisterUserScreen';
import LoginScreen from '../screens/LoginScreen';
import SearchDoctorsScreen from '../screens/SearchDoctorsScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login' >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Doctors" component={DoctorsScreen} /> 
      <Stack.Screen name="Appointment" component={AppointmentScreen} /> 
      <Stack.Screen name="RegisterPatient" component={RegisterPatientScreen} />
      <Stack.Screen name="MyAppointments" component={MyAppointmentsScreen} />
      <Stack.Screen name="SearchDoctors" component={SearchDoctorsScreen} />
      <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />
  </Stack.Navigator>
  );
};

export default AppNavigator;
