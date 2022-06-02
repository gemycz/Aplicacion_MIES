import { StatusBar } from 'expo-status-bar';
import { Container, Header, Content, List, ListItem,
         Left, Body, Right, Thumbnail, Text, Card, 
         CardItem, Button, Icon} from 'native-base';
import { Image} from 'react-native';
import {NavigationContext, useNavigation} from '@react-navigation/native';
import React, { Component } from 'react';
import { 
         StyleSheet,  
         View,
        ImageBackground, 
        TextInput,
        Dimensions,
        TouchableOpacity, AsyncStorage} from 'react-native';
import bgImage from '../assets/img_sistema/fondo_login.jpg';
import lgLogin from '../assets/img_sistema/login_img.png';
//import AvUser from '../assets/img_sistema/user.png';
import Escala_Lawton_Brody from '../assets/img_sistema/Escala_Lawton_Brody.png';
import Escala_Yesavage from '../assets/img_sistema/Escala_Yesavage.png';
import Mini_Examen_Mental from '../assets/img_sistema/Mini_Examen_Mental.png';
import Indice_Barthel from '../assets/img_sistema/Indice_Barthel.png';
import AvUser from '../assets/img_sistema/prueba.png';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const {width: WIDTH} = Dimensions.get('window')

export class Test extends Component{
  static contextType = NavigationContext;

    state = {
      
      isReady: false,
      listadoAdultMay: [],
      id: this.props.route.params.id,
      nombre: this.props.route.params.nombre,
      apellido: this.props.route.params.apellido,
      cedula: this.props.route.params.cedula,
      domicilio: this.props.route.params.domicilio,
      autoidentificacion: this.props.route.params.autoidentificacion,
      genero: this.props.route.params.genero,
      edad: this.props.route.params.edad,
    };

    TestBarthel = () =>{
        this.props.navigation.navigate('TestBarthel')
    }
    TestMiniExamenMental = () =>{
      this.props.navigation.navigate('TestMiniExamenMental')
    }
    IndiTestLawtonBrody = () =>{
      this.props.navigation.navigate('IndiTestLawtonBrody')
  }
    Ubicacion = () =>{
      this.props.navigation.navigate('Ubicacion')
  }
  Observaciones = () =>{
    this.props.navigation.navigate('Observaciones')
}
    render() {
    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer} >
        <Content padder >
      
        <Text style={styles.Titulo}><Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'left'}}>Adulto Mayor:</Text> {this.state.nombre +' '+this.state.apellido}.</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
          <View style={{ alignItems: 'center', marginRight:50}}>
            <TouchableOpacity style={{width: 125, height: 125, borderRadius: 90, justifyContent: 'center'}} onPress={this.Ubicacion}>
              <View  style={{alignItems: 'center'}}>
                <Thumbnail square source={Escala_Yesavage} style={{width: 125, height:125}}/>
              </View>
            </TouchableOpacity>
            <View  style={{ alignItems: 'center'}}>
              <Text>ESCALA DE</Text>
              <Text>YESAVAGE</Text>
            </View>
          </View> 
          <View style={{ alignItems: 'center', marginLeft:50}}>
            <TouchableOpacity style={{width: 125, height: 125, borderRadius: 90, justifyContent: 'center'}} onPress={this.TestBarthel}>
              <View  style={{alignItems: 'center'}}>
                <Thumbnail square source={Indice_Barthel} style={{width: 125, height:125}}/>
              </View>
            </TouchableOpacity >
            <View style={{ alignItems: 'center'}}>
              <Text>INDICE DE</Text>
              <Text>BARTHEL</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
          <View style={{ alignItems: 'center', marginRight:50}}>
            <TouchableOpacity style={{width: 125, height: 125, borderRadius: 90, justifyContent: 'center'}} onPress={this.IndiTestLawtonBrody}>
              <View  style={{alignItems: 'center'}}>
                <Thumbnail square source={Escala_Lawton_Brody} style={{width: 125, height:125}}/>
              </View>
            </TouchableOpacity>
            <View style={{ alignItems: 'center'}}>
              <Text>ESCALA DE</Text>
              <Text>LAWTON Y BRODY</Text>
            </View>
          </View> 
          <View style={{ alignItems: 'center', marginLeft:50}}>
            <TouchableOpacity style={{width: 125, height: 125, borderRadius: 90, justifyContent: 'center'}} onPress={this.TestMiniExamenMental}>
              <View  style={{alignItems: 'center'}}>
                <Thumbnail square source={Mini_Examen_Mental} style={{width: 125, height:125}}/>
              </View>
            </TouchableOpacity>
            <View style={{ alignItems: 'center'}}>
              <Text>MINI EXAMEN DEL</Text>
              <Text>ESTADO MENTAL</Text>
            </View>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: 25}}>
            <TouchableOpacity style={styles.btnContinuar} onPress={this.Observaciones}>
            <Text style={styles.textBtn}>AGREGAR</Text>
            <Text style={styles.textBtn}>OBSERVACIÓN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContinuar}>
            <Text style={styles.textBtn}>VER</Text>
            <Text style={styles.textBtn}>RESULTADOS</Text>
            </TouchableOpacity>
        </View>
               
        </Content>
      </ImageBackground>
    );}
  }
  export default Test;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: 20,
  },
  Titulo: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
    opacity: 0.5,
    textTransform: 'uppercase',
    marginLeft: 15
  },
  text: {
    paddingTop: 10,
    fontWeight: 'bold'
  },
  btnContinuar: {
    width: WIDTH - 230,
    height: 50,
    borderRadius: 45,
    backgroundColor: '#005DA6',
    justifyContent: 'center',
    marginTop: 50,
    marginRight: 30
  },
  btnSalir: {
    width: WIDTH - 230,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#de0404',
    justifyContent: 'center',
    marginTop: 50,
  },
  textBtn: {
    color: '#ffff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
