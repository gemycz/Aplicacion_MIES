import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity, AsyncStorage, ScrollView, FlatList, RefreshControl
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import bgImage from '../assets/img_sistema/fondo_login.jpg';
import lgLogin from '../assets/img_sistema/login_img.png';
import AvUser from '../assets/img_sistema/user.png';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import 'moment/locale/es';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import { Searchbar } from 'react-native-paper';

const { width: WIDTH } = Dimensions.get('window')

export class ListaAMScreen extends Component {

  constructor() {
    super()
    this.AdultosMayores()
    this.state = {
      isReady: false,
      usuario: "",
      clave: "",
      edad: "",
      currentDate: new Date(),
      markedDate: moment(new Date()).format("YYYY-MM-DD"),
      listadoAdultMay: [],
      loading: false,
      refreshing: false,
      search: ""
    };
  }

  Test = () => {
    this.props.navigation.navigate('Test')
  }
  AdultosMayores = () => {

    fetch('http://192.168.100.18/pruebas_react/lista_AdultosMayores.php', {
      method: 'GET',
      headers: {
        'Accept': 'Application/json',
        'Content-type': 'Application/json'
      }
    })
      .then((respuesta) => respuesta.json())
      .then((respuestaJson) => {
        this.setState({ listadoAdultMay: respuestaJson, loading: false, refreshing: false, })
        //console.log(listadoAdultMay);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true });
    //this.AdultosMayores();
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.setState({ loading: true });
    fetch('http://192.168.100.18/pruebas_react/lista_AdultosMayores.php').then(() => {
      this.setState({ loading: false });
      this.setState({ refreshing: false });
      this.AdultosMayores();
    });
  }

  //BARRA DE BUSQUEDA//
  /******************/
  renderHeader = () => {
    const { search } = this.state;
    return (
      <SearchBar
        placeholder="Buscar"
        lightTheme
        onChangeText={text => this.searchAction(text)}
        autoCorrect={false}
        value={search}
        containerStyle={{ backgroundColor: '#005DA6', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
        inputContainerStyle={{ backgroundColor: 'white' }}
      />
    )
  }
  searchAction = (text) => {
    const newData = this.state.listadoAdultMay.filter(item => {
      const itemData = `${item.am_nombres.toUpperCase() + item.am_apellidos.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;

    });
    this.setState({
      listadoAdultMay: newData,
      search: text
    });
    if (text == '') {
      this.AdultosMayores();
    }
  }

  render() {
    const { edad } = this.state;
    const a = moment();
    const b = moment(edad);
    const dateDiff = a.diff(b, 'years');
    const daysLeft = dateDiff !== null && !isNaN(dateDiff);
    const { firstQuery } = this.state;
    //const today = this.state.currentDate;
    //const day = moment(today).format(“dddd”);
    //const date = moment(today).format('YYYY-MM-DD');
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer} >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)} />
          }>
          <Content >
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                data={this.state.listadoAdultMay}
                ListHeaderComponent={this.renderHeader}
                renderItem={({ item }) => (
                  <ListItem thumbnail onPress={() => this.props.navigation.navigate("Test", {
                    id: item.am_id, nombre: item.am_nombres, apellido: item.am_apellidos, cedula: item.am_cedula,
                    domicilio: item.am_domicilio, autoidentificacion: item.am_etnia, genero: item.am_genero,
                    edad: moment().diff(item.am_fechNac, 'years')
                  })}>
                    <Left>
                      <Thumbnail square source={AvUser} />
                    </Left>
                    <Body>
                      <Text style={styles.text} >{item.am_nombres + ' ' + item.am_apellidos}</Text>
                      <Text note style={{ fontSize: 15, color: 'black' }}><Text style={{ fontWeight: 'bold' }}>Edad: </Text>{moment().diff(item.am_fechNac, 'years')}</Text>
                      <Text note style={{ fontSize: 15, color: 'black' }}><Text style={{ fontWeight: 'bold' }}>Proximo Test:</Text> {moment(item.am_fechReg).locale('es').add(6, 'months').format('MMMM, YYYY.')}</Text>
                    </Body>
                    <Right>
                      <Button transparent onPress={() => this.props.navigation.navigate("infoAM", {
                        id: item.am_id, nombre: item.am_nombres, apellido: item.am_apellidos, cedula: item.am_cedula,
                        domicilio: item.am_domicilio, autoidentificacion: item.am_etnia, genero: item.am_genero,
                        edad: moment().diff(item.am_fechNac, 'years')
                      })}>
                        <Icon name={'ios-eye'} size={30} color={'rgba(0,0,0,1)'} />
                      </Button>
                    </Right>
                  </ListItem>
                )} keyExtractor={item => item.am_id} />
            </SafeAreaView>
          </Content>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default ListaAMScreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: 0,
  },
  Titulo: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    opacity: 0.5,
    textAlign: 'center',
    paddingTop: 20,
  },
  text: {
    paddingTop: 10,
    fontWeight: 'bold'
  }
});
