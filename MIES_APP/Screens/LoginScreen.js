import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity, AsyncStorage, Alert
} from 'react-native';
import bgImage from '../assets/img_sistema/fondo_login.jpg';
import lgLogin from '../assets/img_sistema/login_img.png';
import Icon from 'react-native-vector-icons/Ionicons';
const { width: WIDTH } = Dimensions.get('window')

export class LoginScreen extends Component {

  registro = () => {
    this.props.navigation.navigate('RegistroAM')
  }

  constructor() {
    super()
    this.state = {
      showPass: true,
      press: false,
      usuario: "",
      clave: ""
    };
  }

  Login = () => {
    const { usuario } = this.state;
    const { clave } = this.state;

    fetch('http://192.168.100.18/pruebas_react/login.php', {
      method: 'POST',
      headers: {
        'Accept': 'Application/json',
        'Content-type': 'Application/json'
      },
      body: JSON.stringify({
        usuario: usuario,
        clave: clave
      })
    })
      .then((respuesta) => respuesta.json())
      .then((respuestaJson) => {
        if (respuestaJson == "Ok") {
          //alert("Bienvenido");
          Alert.alert('MIES APP', 'Bienvenido a MIES APP', [{ text: 'Continuar', onPress: () => console.log('alert closed'), style: 'destructive' }]);
          //Guardo de forma local el token
          AsyncStorage.setItem('token', '86');
          this.props.navigation.navigate('ListaAM')
        } else if (respuestaJson == "No") {
          alert("Usuario o clave incorrectos");
        } else {
          alert("Los campos son obligatorios");
        }
      }).catch((error) => {
        console.log(error);
      })

  }

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    } else {
      this.setState({ showPass: true, press: false })
    }
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={lgLogin} style={styles.logoLogin} />
          <Text style={styles.TituloLogin}>Iniciar Sesión</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon name={'ios-person'} size={30} color={'rgba(0,0,0,1)'}
            style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Usuario'}
            placeholderTextColor={'rgba(0,0,0,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText={usuario => this.setState({ usuario })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name={'ios-lock'} size={30} color={'rgba(0,0,0,1)'}
            style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Contraseña'}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={'rgba(0,0,0,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText={clave => this.setState({ clave })}
          />
          <TouchableOpacity style={styles.btnEye}
            onPress={this.showPass.bind(this)} >
            <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'}
              size={26} color={'rgba(0,0,0,1)'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLogin} onPress={this.Login}>
          <Text style={styles.text}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logoLogin: {

    height: 150
  },
  TituloLogin: {
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 10,
    opacity: 0.5
  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 18,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,1)',
    marginHorizontal: 25,

  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37,
  },
  forgot: {
    color: 'rgba(0,0,0,1)',
    fontSize: 18,
    paddingTop: 20,
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#005DA6',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnRegistro: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,

    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: '#ffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
