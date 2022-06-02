import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
//Navegación
//import {RootNavigator } from './Navigation/rootNavigator';

//App
import OnboardingScreen from './Screens/OnboardingScreen';
import LoginScreen from './Screens/LoginScreen';
import ListaAMScreen from './Screens/ListaAMScreen';
import UbicacionScreen from './Screens/UbicacionScreen';
import FormaTestsScreen from './Screens/FormaTests';
import TestScreen from './Screens/Test';
import infoAMScreen from './Screens/infoAM';
import { DrawerContent } from './Navigation/DrawerContent';
import ObservacionesScreen from './Screens/Observaciones'
//Test Barthel
import TestBarthelScreen from './Screens/TestBarthel';
import PreguntasTestBarthelScreen from './Screens/PreguntasTestBarthel';
import RegistroAMScreen from './Screens/RegistroAM';

//Test Yesavage
import IndiTestYesavageScreen from './Screens/IndiTestYesavage';
import TestYesavageScreen from './Screens/TestYesavage';
import PreguntasTestYesavageScreen from './Screens/PreguntasTestYesavage';

//Test Mini Examen Mental
import TestMiniExamenMentalScreen from './Screens/TestMiniExamenMental';
import PreguntasTestMiniExamenMentalScreen from './Screens/PreguntasTestMiniExamenMental';

//Test Lawton y Brody
import IndiTestLawtonBrodyScreen from './Screens/IndiTestLawtonBrody';
import PreguntasTestLawtonBrodyScreen from './Screens/PreguntasTestLawtonBrody';
console.disableYellowBox = true;
const AppStack = createStackNavigator();

const Drawer = createDrawerNavigator();

function Root() {
    return (

        <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
            <AppStack.Screen name="Login" component={LoginScreen} />
        </AppStack.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="screen"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#005DA6',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <AppStack.Screen name="Onboarding" component={Root}
                    options={{ headerShown: false }} />
                <AppStack.Screen name="Login" component={Root}
                    options={{ headerShown: false }} />
                <AppStack.Screen name="ListaAM" component={DrawerNavigator}
                    options={{ title: 'Adultos Mayores', headerShown: false }} />
                <AppStack.Screen name="Ubicacion" component={UbicacionScreen}
                    options={{ title: 'Ubicación' }} />
                <AppStack.Screen name="FormaTest" component={FormaTestsScreen}
                    options={{ title: 'Forma Test' }} />
                <AppStack.Screen name="Test" component={TestScreen}
                    options={{ title: 'Menú Test' }} />
                <AppStack.Screen name="Observaciones" component={ObservacionesScreen}
                    options={{ title: 'Observaciones' }} />

                <AppStack.Screen name="TestBarthel" component={TestBarthelScreen}
                    options={{ title: 'Test de Barthel' }} />
                <AppStack.Screen name="PreguntasBarthel" component={PreguntasTestBarthelScreen}
                    options={{ title: 'Preguntas Test de Barthel' }} />

                <AppStack.Screen name="IndiTestYesavage" component={IndiTestYesavageScreen}
                    options={{ title: 'Indice de Yesavage' }} />
                <AppStack.Screen name="TestYesavage" component={TestYesavageScreen}
                    options={{ title: 'Escala de Yesavage' }} />
                <AppStack.Screen name="PreguntasYesavage" component={PreguntasTestYesavageScreen}
                    options={{ title: 'Preguntas Test Indice de Yesavage' }} />

                <AppStack.Screen name="RegistroAM" component={RegistroAMScreen} 
                options={{title: 'Registro Adulto Mayor'}} />
                <AppStack.Screen name="infoAM" component={infoAMScreen} 
                options={{ title: 'Información Personal'}} />

                <AppStack.Screen name="TestMiniExamenMental" component={TestMiniExamenMentalScreen}
                    options={{ title: 'Mini Examen Mental' }} />
                <AppStack.Screen name="PreguntasMiniExamenMental" component={PreguntasTestMiniExamenMentalScreen}
                    options={{ title: 'Preguntas Test Mini Examen Mental' }} />

                <AppStack.Screen name="IndiTestLawtonBrody" component={IndiTestLawtonBrodyScreen}
                    options={{ title: 'Indice de Lawton y Brody' }} />
                <AppStack.Screen name="PreguntasTestLawtonBrody" component={PreguntasTestLawtonBrodyScreen}
                    options={{ title: 'Preguntas Test Lawton y Brody' }} />


            </AppStack.Navigator>
        </NavigationContainer>
    );
}


function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} headerMode="screen" screenOptions={{
            headerStyle: {
                backgroundColor: '#005DA6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Drawer.Screen name="ListaAM" component={ListaAMScreen} options={{
                title: 'Listado Adultos Mayor',

            }} />
            <Drawer.Screen name="RegistroAM" component={RegistroAMScreen} options={{
                title: 'Registrar Adulto Mayor',

            }} />
        </Drawer.Navigator>
    );
}


export default App;

/*import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
//Navegación

//App
//App
import OnboardingScreen from './Screens/OnboardingScreen';
import LoginScreen from './Screens/LoginScreen';
import ListaAMScreen from './Screens/ListaAMScreen';
import UbicacionScreen from './Screens/UbicacionScreen';
import FormaTestsScreen from './Screens/FormaTests';
import TestScreen from './Screens/Test';
import infoAMScreen from './Screens/infoAM';
import { DrawerContent } from './Navigation/DrawerContent';
//Test Barthel
import TestBarthelScreen from './Screens/TestBarthel';
import PreguntasTestBarthelScreen from './Screens/PreguntasTestBarthel';
import RegistroAMScreen from './Screens/RegistroAM';

//Test Yesavage
import IndiTestYesavageScreen from './Screens/IndiTestYesavage';
import TestYesavageScreen from './Screens/TestYesavage';
import PreguntasTestYesavageScreen from './Screens/PreguntasTestYesavage';

//Test Mini Examen Mental
import TestMiniExamenMentalScreen from './Screens/TestMiniExamenMental';
import PreguntasTestMiniExamenMentalScreen from './Screens/PreguntasTestMiniExamenMental';



import { AsyncStorage } from 'react-native';

const AppStack = createStackNavigator();

const Drawer = createDrawerNavigator();


function Root() {
    return (

        <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
            <AppStack.Screen name="Login" component={LoginScreen} />
        </AppStack.Navigator>
    );
}

function App () {
  const[isFirstLauch, setIsFirstLaunch] = React.useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value =>{
      if(value == null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if(isFirstLauch === null){
    return null;
  }else if(isFirstLauch === true){
    return (
      <NavigationContainer>
            <AppStack.Navigator headerMode="screen"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#005DA6',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <AppStack.Screen name="Onboarding" component={Root}
                    options={{ headerShown: false }} />
                <AppStack.Screen name="Login" component={Root}
                    options={{ headerShown: false }} />
                <AppStack.Screen name="ListaAM" component={DrawerNavigator}
                    options={{ title: 'Adultos Mayores', headerShown: false }}  />
                <AppStack.Screen name="Ubicacion" component={UbicacionScreen}
                    options={{ title: 'Ubicación' }} />
                <AppStack.Screen name="FormaTest" component={FormaTestsScreen}
                    options={{ title: 'Forma Test' }} />
                <AppStack.Screen name="Test" component={TestScreen}
                    options={{ title: 'Menú Test' }} />

                <AppStack.Screen name="TestBarthel" component={TestBarthelScreen}
                    options={{ title: 'Test de Barthel' }} />
                <AppStack.Screen name="PreguntasBarthel" component={PreguntasTestBarthelScreen}
                    options={{ title: 'Preguntas Test de Barthel' }} />

                <AppStack.Screen name="IndiTestYesavage" component={IndiTestYesavageScreen}
                    options={{ title: 'Indice de Yesavage' }} />
                <AppStack.Screen name="TestYesavage" component={TestYesavageScreen}
                    options={{ title: 'Escala de Yesavage' }} />
                <AppStack.Screen name="PreguntasYesavage" component={PreguntasTestYesavageScreen}
                    options={{ title: 'Preguntas Test Indice de Yesavage' }} />

                <AppStack.Screen name="RegistroAM" component={RegistroAMScreen} options={{
                    title: 'Registro Adulto Mayor'}} />
                <AppStack.Screen name="infoAM" component={infoAMScreen}  options={{
                    title: 'Información Personal'}} />

                <AppStack.Screen name="TestMiniExamenMental" component={TestMiniExamenMentalScreen}
                    options={{ title: 'Mini Examen Mental' }} />
                <AppStack.Screen name="PreguntasMiniExamenMental" component={PreguntasTestMiniExamenMentalScreen}
                    options={{ title: 'Preguntas Test Mini Examen Mental' }} />

            </AppStack.Navigator>
        </NavigationContainer>
    );
  }else{
    return <LoginScreen />;
  }
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} headerMode="screen" screenOptions={{
          headerStyle: {
              backgroundColor: '#005DA6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          },
      }}>
        <Drawer.Screen name="ListaAM" component={ListaAMScreen}  options={{
                    title: 'Listado Adultos Mayor',

                }}/>
        <Drawer.Screen name="RegistroAM" component={RegistroAMScreen} options={{
                    title: 'Registrar Adulto Mayor',

                }}/>

      </Drawer.Navigator>
    );
}

export default App;*/
