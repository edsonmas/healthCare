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

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Doctors" component={DoctorsScreen} /> 
      <Tab.Screen name="Appointment" component={AppointmentScreen} /> 
      <Tab.Screen name="RegisterPatient" component={RegisterPatientScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="MyAppointments" component={MyAppointmentsScreen} />
      <Tab.Screen name="SearchDoctors" component={SearchDoctorsScreen} />


  </Tab.Navigator>
  );
};

export default AppNavigator;
