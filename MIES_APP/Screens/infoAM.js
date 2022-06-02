//import { StatusBar } from 'expo-status-bar';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import { NavigationContext, useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    TextInput,
    Dimensions,
    TouchableOpacity, AsyncStorage, ScrollView
} from 'react-native';
import bgImage from '../assets/img_sistema/fondo_login.jpg';
import AvUser from '../assets/img_sistema/user.png';
//import Icon from 'react-native-vector-icons/Ionicons';
//import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import 'moment/locale/es';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: WIDTH } = Dimensions.get('window');

export class infoAM extends Component {

    static contextType = NavigationContext;
    state = {
        isReady: false,
        listadoAdultMay: [],
        nombre: this.props.route.params.nombre,
        apellido: this.props.route.params.apellido,
        cedula: this.props.route.params.cedula,
        domicilio: this.props.route.params.domicilio,
        autoidentificacion: this.props.route.params.autoidentificacion,
        genero: this.props.route.params.genero,
        edad: this.props.route.params.edad,
    };

    Ubicacion = () => {
        this.props.navigation.navigate('Ubicacion')
    }
    Test = () => {
        this.props.navigation.navigate('Test')
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ isReady: true });
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer} >
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <View style={{ alignItems: 'center', paddingTop: 30, paddingBottom: 10 }}>
                                <Thumbnail square source={AvUser} style={{ width: 150, height: 150 }} />
                            </View>
                            <Text style={styles.subtitulo}>{this.state.nombre + ' ' + this.state.apellido}.</Text>
                            <Text style={styles.items}>Cédula:</Text>
                            <Text style={styles.resp}>{this.state.cedula}.</Text>
                            <Text style={styles.items}>Dirección:</Text>
                            <Text style={styles.resp}>{this.state.domicilio}.</Text>
                            <Text style={styles.items}>Autoidentificación:</Text>
                            <Text style={styles.resp}>{this.state.autoidentificacion}.</Text>
                            <Text style={styles.items}>Sexo:</Text>
                            <Text style={styles.resp}>{this.state.genero}.</Text>
                            <Text style={styles.items}>Edad:</Text>
                            <Text style={styles.resp}>{this.state.edad} Años.</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

export default infoAM;

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        paddingTop: 30,
    },
    Titulo: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        opacity: 0.8,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    subtitulo: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,

        textAlign: 'center',
        textTransform: 'uppercase'
    },
    items: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 20,

        textAlign: 'left',
    },
    resp: {
        color: 'black',
        fontSize: 18,

        marginTop: 10,
        marginBottom: 10,
        marginLeft: 70,
        opacity: 0.7,
        textAlign: 'left',
    },
    text: {
        paddingTop: 10,
        fontWeight: 'bold'
    }
});
