import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import { Image,
         StyleSheet, 
         Text, 
         View,
        ImageBackground, 
        TextInput,
        Dimensions,
        TouchableOpacity,
        Item,
        Label,
        ScrollView, Alert, Platform, Button} from 'react-native';
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
import { Picker } from '@react-native-picker/picker'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AvUser from '../assets/img_sistema/user.png';
const {width: WIDTH} = Dimensions.get('window');


//Función  que contiene el componente para seleccionar la img de la galería.
//*************************************************************************/
function ImagePickerChoose(props){
  const [image, setImage] = useState(null);
  const [photoStatus, setPhotoStatus] = useState("No se ha seleccionado ninguna Foto de Perfil.");
  //Controla que los permisos para acceder a la galeria hayan sido dados.
  useEffect(()  =>{
    (async () => {
      if(Platform.OS !== 'web'){
        const {status} = await ImagePickerChoose.requestCameraRollPermissionsAsync();
        if(status !== 'granted'){
          alert('Lo sentimos, se necesitan permisos para acceder a la galería');
        }
      }
    })();
  }, []);

  //Selecciona una imagen de manera asincrona desde la galería y cuando se carga 
  //manda  a llamar  a la funcion callback para enviarle el uri al componente padre.
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4,3],
      quality: 1,
    });
    if(!result.cancelled){
      setImage(result.uri);
      setPhotoStatus('');
    }
    props.parentCallBack(result)
  };
  return(
    <View style={styles.logoContainer}>
      <TouchableOpacity 
        style={{borderWidth:1,
          borderColor:'rgba(0,0,0,0.2)',
          alignItems:'center',
          justifyContent:'center',
          width:150,
          height:150,
          backgroundColor:'transparent',
          borderRadius:75,}}
        onPress={pickImage}
      >
      <Text style={{fontSize: 12, color: "#888888", textAlign: 'center'}}>{photoStatus}</Text>
      {image && <Image source={{uri: image}} style={{width: 150, height: 150, borderRadius:75, marginTop: -17}} />}</TouchableOpacity>
    </View>
  );
}


export  class RegistroAM extends Component {
  
    constructor(props){
        super(props)
        this.state = {
          cedula: "",
          nombres: "",
          apellidos: "",
          fecha_nacimiento: '',
          genero: "",
          etnia: "",
          domicilio:"",
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
          //Obtiene la imagen del componente ImagePickerChoose
          image: '',
    }
  }

  setImageState = (img) => {
    this.setState({
      image: img.uri
    })
  }

  //función para subir imagen al server, en este caso es un servidor en PHP
  uploadImage = async () => {
    let localUri = this.state.image;
    if (localUri == null || localUri == '') {
      Alert.alert('Debe seleccionar una imágen')
    }
    else {
      let filename = localUri.split('/').pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append('photo', { uri: localUri, name: filename, type });

      return await fetch('http://192.168.1.5/pruebas_react/upload_image.php', {
        method: 'POST',
        body: formData,
        header: {
          'content-type': 'multipart/form-data',
        },
      }).then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          if (response.status == 1) {
            Alert.alert('Imágen guardada')
          }
          else {
            Alert.alert('No se ha podido guardar la imágen, intentelo de nuevo')

          }
        });
    }

  };

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

  registroAdultoM = () => {
    //alert('OK');
    const {cedula} = this.state;
    const {nombres} = this.state;
    const {apellidos} = this.state;
    const {fecha_nacimiento} = this.state;
    const {genero} = this.state;
    const {etnia} = this.state;
    const {domicilio} = this.state;
    const {pais_origen} = this.state;
    const {fecha_registro} = this.state;

    fetch('http://192.168.1.5/pruebas_react/registraAM.php', {
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
      .then((responseJson) =>{
        alert(responseJson);
        
        this.uploadImage();
        this.props.navigation.navigate('ListaAM')
      }).catch((error)=>{
        console.log(error);
      });

  }
  

  showPass = () => {
    if(this.state.press == false){
      this.setState({showPass : false, press: true })
    }else{
      this.setState({showPass : true, press: false })
    }
  }


  render(){
    const { checked } = this.state;
    const { checked1 } = this.state;
  

    return (
      
      <ScrollView style={styles.scrollView}>
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={lgLogin} style={styles.logoLogin} />
        </View>
        <View tyle={styles.tituloContainer}>
            <Text style={styles.TituloLogin}>Registrar Adulto Mayor</Text> 
        </View>
        <View style={styles.inputContainer}>
          <Icons name={'idcard'} size={28} color={'rgba(0,0,0,1)'} 
          style={styles.inputIcon}/>
          <TextInput
            style={styles.input}  
            placeholder={'Cédula'}
            placeholderTextColor={'rgba(0,0,0,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText= {cedula => this.setState({cedula})}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name={'ios-person'} size={30} color={'rgba(0,0,0,1)'} 
          style={styles.inputIcon}/>
          <TextInput
            style={styles.input}  
            placeholder={'Nombres'}
            placeholderTextColor={'rgba(0,0,0,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText= {nombres => this.setState({nombres})}
          />
        </View>
        <View style={styles.inputContainer}>
            
          <Icon name={'ios-person'} size={30} color={'rgba(0,0,0,1)'} 
          style={styles.inputIcon}/>
          <TextInput
            style={styles.input}  
            placeholder={'Apellidos'}
            placeholderTextColor={'rgba(0,0,0,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText= {apellidos => this.setState({apellidos})}
          />
        </View>

        <View style={styles.inputContainer}>
        <View style={styles.input} >
          <IconFont name={'venus-mars'} size={30} color={'rgba(0,0,0,1)'} 
          style={styles.inputIcon1}/>
          <Picker
          selectedValue={this.state.genero} 
            onValueChange={(itemValue, itemIndex) => this.setState({ genero: itemValue })}>
            <Picker.Item label="Hombre" value="hombre" />
            <Picker.Item label="Mujer" value="mujer" />
            
          </Picker>
        </View>
        </View>
        
        <View style={styles.inputContainer}>
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
              this.setState({fecha_nacimiento: fecha_nacimiento });
            }}
            onChangeText= {fecha_nacimiento => this.setState({fecha_nacimiento})}
            />
        </View>
       
        <View style={styles.inputContainer}>
          <Icon name={'ios-people'} size={30} color={'rgba(0,0,0,1)'} 
          style={styles.inputIcon}/>
          <TextInput
            style={styles.input}  
            placeholder={'Autoidentificación étnica'}
            placeholderTextColor={'rgba(0,0,0,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText= {etnia => this.setState({etnia})}
          />
         
        </View>

        <View style={styles.inputContainer}>
          <Icon name={'ios-pin'} size={30} color={'rgba(0,0,0,1)'} 
          style={styles.inputIcon}/>
          <TextInput
            style={styles.input}  
            placeholder={'Domicilio'}
            placeholderTextColor={'rgba(0,0,0,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText= {domicilio => this.setState({domicilio})}
          />
         
        </View>

        <View style={styles.inputContainer}>
          <IconFont name={'globe'} size={30} color={'rgba(0,0,0,1)'} 
          style={styles.inputIcon}/>
          <TextInput
            style={styles.input}  
            placeholder={'País de origen'}
            placeholderTextColor={'rgba(0,0,0,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText= {pais_origen => this.setState({pais_origen})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name={'ios-calendar'} size={30} color={'rgba(0,0,0,1)'} 
          style={styles.inputIconDate2}/>
          <View style={{flexDirection:'row', justifyContent:'flex-start', textAlign:'left', alignContent:'stretch'}}>
            <DatePicker
            showIcon={false}
            androidMode="spinner"
            //disabled={true}
            style={styles.datePickerStyle}
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
              this.setState({fecha_registro: fecha_registro });
            }}
            onChangeText= {fecha_registro => this.setState({fecha_registro})}
          />
          </View>
        </View>

        <View style={{ marginTop: 15}}>
          <Text style={{fontSize: 16, textAlign: 'left', fontWeight: 'bold'}}>Seleccione una Foto de Perfil</Text> 
          <ImagePickerChoose parentCallBack={this.setImageState}></ImagePickerChoose>
          <TouchableOpacity
            onPress={this.uploadImage}
            
          ><Text>Subir foto</Text></TouchableOpacity>
          <StatusBar style="auto" />
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.btnRegistrar}
              onPress={this.registroAdultoM }>
              <Text style={styles.text}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancelar} onPress={() => this.props.navigation.navigate('ListaAM')}>
              <Text style={styles.text}>Cancelar</Text>
            </TouchableOpacity>
        </View>  
        

      </ImageBackground>
      </ScrollView>
      
    );
  }

  
};
export default RegistroAM;

const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView: {
     // backgroundColor: 'pink',
      marginBottom: 0,
      marginTop: 0
    },
    logoContainer:{
      alignItems: 'center',
      marginBottom: 0,
      marginTop: 15,
    },
    logoLogin: {
      height: 150 
    },
    tituloContainer:{
      alignItems: 'center',
      marginBottom: 50 
    },
    tituloLabel:{
        alignItems: 'stretch',
        marginBottom: 50 
      },
    TituloLogin: {
      color: 'black',
      fontSize: 35,
      fontWeight: 'bold',
      marginTop: 0,
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
    labelSexo:{
     color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 5,
      //opacity: 0.5
      textAlign: 'left',
    },
    inputContainer: {
      marginTop: 10,
      textAlign: 'left'
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
    forgot:{
      color:'rgba(0,0,0,1)',
      fontSize:18,
      paddingTop: 20,
    },
    btnRegistrar: {
      width: WIDTH - 300,
      height: 45,
      borderRadius: 45,
      backgroundColor: '#005DA6',
      justifyContent: 'center',
      marginTop: 20,
      marginRight: 30
  
    },
    btnCancelar: {
      width: WIDTH - 300,
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
    inputIconDate: {
      position: 'absolute',
      top: 5,
      left: 15,
    },
    inputIconDate2: {
      position: 'absolute',
      top: 5,
      left: 15,
    },
    text: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold'
    }
  });