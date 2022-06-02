import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Item,
  Label,
  ScrollView, Alert, Platform, Button,
  RefreshControl
} from 'react-native';
import bgImage from '../assets/img_sistema/fondo_login.jpg';
import lgLogin from '../assets/img_sistema/login_img.png';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { RadioButton, Title } from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { Picker } from '@react-native-picker/picker'
import { Picker } from "native-base";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AvUser from '../assets/img_sistema/user.png';
const { width: WIDTH } = Dimensions.get('window');

export class RegistroAM extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cedula: "",
      nombres: "",
      apellidos: "",
      fecha_nacimiento: '',
      genero: "",
      etnia: "",
      domicilio: "",
      pais_origen: "",
      fecha_registro: '',
      checked: '',
      checked1: '',
      selectedValue: 'Hombre',
      setSelectedValue: 'Hombre',
      currentDate: new Date(),
      fecha_registro: moment(new Date()).format("YYYY-MM-DD"),
      //Ver y ocultar clave
      showPass: true,
      press: false,

      cedulaValidate: true,
      nombresValidate: true,
      apellidosValidate: true,
      etniaValidate: true,
      domicilioValidate: true,
      pais_origenValidate: true,
    }
  }

  checkValue(str, max) {
    if (str.charAt(0) !== '0' || str == '00') {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? '0' + num
          : num.toString();
    }
    return str;
  }

  dateTimeInputChangeHandler = (e) => {
    this.type = 'text';
    var input = e;
    var expr = new RegExp(/\D\/$/);
    if (expr.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split('/').map(function (v) {
      return v.replace(/\D/g, '');
    });
    if (values[1]) values[1] = this.checkValue(values[1], 12);
    if (values[0]) values[0] = this.checkValue(values[0], 31);
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + '/' : v;
    });
    this.setState({
      registrationDate: output.join('').substr(0, 14),
    });
  };

  registroAdultoM = async () => {
    //alert('OK');
    const { cedula } = this.state;
    const { nombres } = this.state;
    const { apellidos } = this.state;
    const { fecha_nacimiento } = this.state;
    const { genero } = this.state;
    const { etnia } = this.state;
    const { domicilio } = this.state;
    const { pais_origen } = this.state;
    const { fecha_registro } = this.state;


    return await fetch('http://192.168.100.18/pruebas_react/registraAM.php', {
      method: 'POST',
      headers: {
        'Accept': 'Application/json',
        'Content-type': 'Application/json'
      },
      body: JSON.stringify({
        cedula: cedula,
        nombres: nombres,
        apellidos: apellidos,
        fecha_nacimiento: fecha_nacimiento,
        genero: genero,
        etnia: etnia,
        domicilio: domicilio,
        pais_origen: pais_origen,
        fecha_registro: fecha_registro,
      })

    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === "Ok") {
          //alert("Bienvenido");
          Alert.alert('Registro de Información', 'Datos Registrados correctamente...',
            [{ text: 'Continuar', onPress: () => this.props.navigation.navigate('ListaAM'), style: 'destructive' }]);
        } else if (responseJson === "No") {
          //alert("Todos los campos son obligatorios");
          Alert.alert('Error de Registro', 'Ya existe un registro con ese número de cédula', [{ text: 'Aceptar' }]);
        } else {
          Alert.alert('Error de Registro', 'Todos los campos son obligatorios', [{ text: 'Aceptar' }]);
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  //actualizar pagina
  _onRefresh() {
    this.props.navigation.replace('RegistroAM')
    null, // no params
    null
  }
  
  //validaciones de datos
  validateCedula(cedula, type) {
   var alph = /^([0-9]{0,10})$/
    if (type == 'cedula') {
      if (alph.test(cedula)) {
        this.setState({ cedulaValidate: true })
        this.setState({ cedula })
      } else {
        this.setState({ cedulaValidate: false })
      }
    }
  }
  validateNombre(nombres, type) {
    var alph = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
    if (type == 'nombres') {
      if (alph.test(nombres)) {
        this.setState({ nombresValidate: true })
        this.setState({ nombres })
      } else {
        this.setState({ nombresValidate: false })
      }
    }
  }

  validateApellidos(apellidos, type) {
    var alph = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
    if (type == 'apellidos') {
      if (alph.test(apellidos)) {
        this.setState({ apellidosValidate: true })
        this.setState({ apellidos })
      } else {
        this.setState({ apellidosValidate: false })
      }
    }
  }

  validateEtnia(etnia, type) {
    var alph = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
    if (type == 'etnia') {
      if (alph.test(etnia)) {
        this.setState({ etniaValidate: true })
        this.setState({ etnia })
      } else {
        this.setState({ etniaValidate: false })
      }
    }
  }

  validateDomicilio(domicilio, type) {
    var alph = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
    if (type == 'domicilio') {
      if (alph.test(domicilio)) {
        this.setState({ domicilioValidate: true })
        this.setState({ domicilio })
      } else {
        this.setState({ domicilioValidate: false })
      }
    }
  }

  validatePais(pais_origen, type) {
    var alph = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
    if (type == 'pais') {
      if (alph.test(pais_origen)) {
        this.setState({ pais_origenValidate: true })
        this.setState({ pais_origen })
      } else {
        this.setState({ pais_origenValidate: false })
      }
    }
  }

  render() {

    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <ScrollView style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)} />
          } >
          <View tyle={styles.tituloContainer}>
            <Text style={styles.TituloLogin}>Formulario de Registro</Text>
          </View>
          <View style={styles.inputContainer}>
            <Icons name={'idcard'} size={28} color={'rgba(0,0,0,1)'}
              style={styles.inputIcon} />
            <TextInput
              style={[styles.input, !this.state.cedulaValidate ? styles.inputError : null]}
              placeholder={'Cédula'}
              placeholderTextColor={'rgba(0,0,0,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={cedula => this.validateCedula(cedula, 'cedula')}
            />
          </View >
          <View style={styles.errorContainer }>
            <Text style={[styles.TextDefault, !this.state.cedulaValidate ? styles.TextError : null, 
              this.state.cedulaValidate ? styles.TextErrorValid : null ]}>Debe ingresar 10 digitos numéricos</Text>
          </View>
          <View style={styles.inputContainer }>
            <Icon name={'ios-person'} size={30} color={'rgba(0,0,0,1)'}
              style={styles.inputIcon} />
            <TextInput
              style={[styles.input, !this.state.nombresValidate ? styles.inputError : null]}
              placeholder={'Nombres'}
              placeholderTextColor={'rgba(0,0,0,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={nombres => this.validateNombre(nombres, 'nombres')}
            />
          </View>
          <View style={styles.errorContainer }>
            <Text style={[styles.TextDefault, !this.state.nombresValidate ? styles.TextError : null, 
              this.state.cedulaValidate ? styles.TextErrorValid : null ]}>Solo se permiten letras</Text>
          </View>
          <View style={styles.inputContainer}>
            <Icon name={'ios-person'} size={30} color={'rgba(0,0,0,1)'}
              style={styles.inputIcon} />
            <TextInput
              style={[styles.input, !this.state.apellidosValidate ? styles.inputError : null]}
              placeholder={'Apellidos'}
              placeholderTextColor={'rgba(0,0,0,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={apellidos => this.validateApellidos(apellidos, 'apellidos')}
            />
          </View>
          <View style={styles.errorContainer }>
            <Text style={[styles.TextDefault, !this.state.apellidosValidate ? styles.TextError : null, 
              this.state.cedulaValidate ? styles.TextErrorValid : null ]}>Solo se permiten letras</Text>
          </View>
          <View style={styles.inputContainer2}>
            <View style={styles.input} >
              <IconFont name={'venus-mars'} size={30} color={'rgba(0,0,0,1)'}
                style={styles.inputIcon1} />
              <Picker
                mode="dropdown"
                selectedValue={this.state.genero}
                onValueChange={(itemValue, itemIndex) => this.setState({ genero: itemValue })}>
                <Picker.Item label="Seleccionar el genero" />
                <Picker.Item label="Hombre" value="Hombre" />
                <Picker.Item label="Mujer" value="Mujer" />

              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer2}>
            <Icon name={'ios-calendar'} size={30} color={'rgba(0,0,0,1)'}
              style={styles.inputIconDate} />
            <DatePicker
              showIcon={false}
              androidMode="spinner"
              style={styles.datePickerStyle}
              date={this.state.fecha_nacimiento}
              mode="date"
              placeholder="Fecha de nacimiento"
              placeholderTextColor={'rgba(0,0,0,0.7)'}
              //underlineColorAndroid='transparent'
              format="YYYY-MM-DD"
              maxDate={moment().locale('es').format('YYYY-MM-DD')}
              confirmBtnText="Chọn"
              cancelBtnText="Hủy"
              customStyles={{
                dateInput: {
                  width: WIDTH - 55,
                  height: 45,
                  borderRadius: 45,
                  fontSize: 10,
                  textAlign: 'left',
                  backgroundColor: 'rgba(0,0,0,0.35)',
                  color: 'black',
                },
              }}
              onDateChange={(fecha_nacimiento) => {
                this.setState({ fecha_nacimiento: fecha_nacimiento });
              }}
              onChangeText={fecha_nacimiento => this.setState({ fecha_nacimiento })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name={'ios-people'} size={30} color={'rgba(0,0,0,1)'}
              style={styles.inputIcon} />
            <TextInput
              style={[styles.input, !this.state.etniaValidate ? styles.inputError : null]}
              placeholder={'Autoidentificación étnica'}
              placeholderTextColor={'rgba(0,0,0,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={etnia => this.validateEtnia(etnia, 'etnia')}
            />
          </View>
          <View style={styles.errorContainer }>
            <Text style={[styles.TextDefault, !this.state.etniaValidate ? styles.TextError : null, 
              this.state.cedulaValidate ? styles.TextErrorValid : null ]}>Solo se permiten letras</Text>
          </View>
          <View style={styles.inputContainer}>
            <Icon name={'ios-pin'} size={30} color={'rgba(0,0,0,1)'}
              style={styles.inputIcon} />
            <TextInput
              style={[styles.input, !this.state.domicilioValidate ? styles.inputError : null]}
              placeholder={'Domicilio'}
              placeholderTextColor={'rgba(0,0,0,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={domicilio => this.validateDomicilio(domicilio, 'domicilio')}
            />
          </View>
          <View style={styles.errorContainer }>
            <Text style={[styles.TextDefault, !this.state.domicilioValidate ? styles.TextError : null, 
              this.state.cedulaValidate ? styles.TextErrorValid : null ]}>Solo se permiten letras</Text>
          </View>
          <View style={styles.inputContainer}>
            <IconFont name={'globe'} size={30} color={'rgba(0,0,0,1)'}
              style={styles.inputIcon} />
            <TextInput
              style={[styles.input, !this.state.pais_origenValidate ? styles.inputError : null]}
              placeholder={'País de origen'}
              placeholderTextColor={'rgba(0,0,0,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={pais_origen => this.validatePais(pais_origen, 'pais')}
            />
          </View>
          <View style={styles.errorContainer }>
            <Text style={[styles.TextDefault, !this.state.pais_origenValidate ? styles.TextError : null, 
              this.state.cedulaValidate ? styles.TextErrorValid : null ]}>Solo se permiten letras</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: 20, fontSize: 16, marginLeft: 25, fontWeight: 'bold' }}>Fecha de Registro: </Text>
            <View style={styles.fechareg}>
              <Icon name={'ios-calendar'} size={30} color={'rgba(0,0,0,1)'}
                style={styles.inputIconDate2} />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', textAlign: 'left', alignContent: 'stretch' }}>

                <DatePicker

                  showIcon={false}
                  androidMode="spinner"
                  disabled={true}
                  style={styles.datePickerStyle2}
                  date={this.state.fecha_registro}
                  mode="date"
                  //placeholder="Fecha de registro"
                  placeholderTextColor={'rgba(0,0,0,0.35)'}
                  //underlineColorAndroid='transparent'
                  format="YYYY-MM-DD"
                  maxDate={moment().format('YYYY-MM-DD')}
                  confirmBtnText="Chọn"
                  cancelBtnText="Hủy"
                  customStyles={{
                    disabled: {
                      backgroundColor: 'transparent'
                    },
                    dateInput: {
                      width: WIDTH - 55,
                      height: 45,
                      borderRadius: 45,
                      fontSize: 10,
                      backgroundColor: 'rgba(0,0,0,0.35)',
                      color: 'rgba(0,0,0,0.7)',
                    },
                  }}
                  onDateChange={(fecha_registro) => {
                    this.setState({ fecha_registro: fecha_registro });
                  }}
                  onChangeText={fecha_registro => this.setState({ fecha_registro })}
                />
              </View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.btnRegistrar}
              onPress={this.registroAdultoM} > 
              <Text style={styles.text}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancelar} onPress={() => this.props.navigation.navigate('ListaAM')}>
              <Text style={styles.text}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

    );
  }


};
export default RegistroAM;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginBottom: 0,
    marginTop: 0
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 15,
  },
  logoLogin: {
    height: 150
  },
  tituloContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10
  },
  tituloLabel: {
    alignItems: 'stretch',
    marginBottom: 50,

  },
  TituloLogin: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    alignItems: 'center',
    textAlign: 'center',
    opacity: 0.5,
    marginBottom: 10,

  },
  TextInfo: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 0,
    opacity: 0.5
  },
  radioButton: {
    paddingLeft: 10,
    paddingRight: 30,
    textAlign: 'justify',
    marginTop: 0,
    marginRight: 10
  },
  TextRadio1: {
    color: '#2C3E50',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'justify',
  },
  TextRadio2: {
    color: '#2C3E50',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'justify',
  },
  Radio2: {
    marginLeft: 60
  },
  labelSexo: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
    //opacity: 0.5
    textAlign: 'left',
  },
  inputContainer: {
    marginTop: 10,
    textAlign: 'left',
  },
  fechareg: {
    marginTop: 10,
    textAlign: 'left',
    alignItems: 'flex-end',
    width: WIDTH - 190,
  },
  inputContainer2: {
    marginTop: 10,
    textAlign: 'left',
    alignItems: 'center',
    marginBottom: 10
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 18,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(201,201,201,1)',
    marginHorizontal: 25,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 3
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  inputIcon1: {
    position: 'absolute',
    top: 8,
    left: 15,
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
  btnRegistrar: {
    width: WIDTH - 250,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#005DA6',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 30

  },
  btnCancelar: {
    width: WIDTH - 250,
    height: 45,
    borderRadius: 45,
    marginBottom: 20,
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    marginTop: 20,
  },
  datePickerStyle: {
    width: WIDTH - 55,
    marginTop: 2,
    textAlign: 'left'
  },
  datePickerStyle2: {
    width: WIDTH - 200,
    marginTop: 2,
    textAlign: 'left'
  },
  inputIconDate: {
    position: 'absolute',
    top: 5,
    left: 40,
  },
  inputIconDate2: {
    position: 'absolute',
    top: 5,
    left: 25,
    //marginLeft: WIDTH - 400,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  errorContainer:{
    marginBottom: -10,
    marginTop: 1
  },
  errorContainer2:{
    marginBottom: -5,
    marginTop: -2
  },
  TextError:{
    color:'red',
    textAlign: 'center',
    alignItems: 'center'
  },
  TextErrorValid:{
    textAlign: 'center',
    alignItems: 'center',
    opacity: 0.9,
    color: 'rgba(0,0,0,0)' 
  },
  TextValid:{
    color: 'green',
    textAlign: 'center',
    alignItems: 'center',
  },
  TextDefault:{
    textAlign: 'center',
    alignItems: 'center', 
    color: 'rgba(0,0,0,0)'
  },
  TextDefault1:{
    textAlign: 'center',
    alignItems: 'center', 
    color: 'rgba(0,0,0,0)'
  }
});