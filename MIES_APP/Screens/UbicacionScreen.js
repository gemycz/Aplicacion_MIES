import {Content, Text} from 'native-base';
import {Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CheckBox} from 'react-native-elements'
import React, {Component} from 'react';
import bgImage from '../assets/img_sistema/fondo_login.jpg';
import * as Font from 'expo-font';

const {width: WIDTH} = Dimensions.get('window');

export class UbicacionScreen extends Component {

    IndiTestYesavage = () => {
        this.props.navigation.navigate('IndiTestYesavage')
    }

    ListAdultoM = () => {
        this.props.navigation.navigate('ListaAM')
    }

    constructor() {
        super()
        //this.AdultosMayores()
        this.state = {
            isReady: false,
            usuario: "",
            clave: "",
            listadoAdultMay: [],
            puntoAtencion: false,
            domicilio: false
        };
    }

    Test = () => {
        this.props.navigation.navigate('Test')
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({isReady: true});
    }

    puntoAtencion() {
        //alert('Punto de Atención');
        this.setState({puntoAtencion: true, domicilio: false})
    }

    domicilio() {
        //alert('Domicilio');
        this.setState({domicilio: true, puntoAtencion: false})
    }

    render() {
        return (

            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <Content padder>
                    <View style={styles.ContainerTitulo}>
                        <Text style={styles.Titulo}>Ubicación del Adulto Mayor</Text>
                    </View>
                    <View style={styles.ContainerText}>
                        <Text style={styles.text}>El adulto mayor puede realizar el Test con el acompañamiento
                            únicamente en su domicilio.</Text>
                    </View>
                    <View style={styles.ContainerText}>
                        <Text style={styles.textSub}>Antes de realizar los Tests debe informar sobre el sitio donde se
                            está llevando a cabo.</Text>
                    </View>
                    <View style={{paddingLeft: 25, paddingTop: 15}}>
                        <CheckBox checked={this.state.puntoAtencion}
                                  onPress={() => this.puntoAtencion()}
                                  containerStyle={{backgroundColor: 'transparent'}}
                                  title={<Text style={styles.textOption}>Punto de Atención</Text>}
                        />

                        <CheckBox checked={this.state.domicilio}
                                  onPress={() => this.domicilio()}
                                  containerStyle={{backgroundColor: 'transparent'}}
                                  title={<Text style={styles.textOption}>Domicilio</Text>}

                        />
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity style={styles.btnContinuar} onPress={this.IndiTestYesavage}>
                            <Text style={styles.textBtn}>Continuar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSalir} onPress={this.ListAdultoM}>
                            <Text style={styles.textBtn}>Salir</Text>
                        </TouchableOpacity>
                    </View>

                </Content>
            </ImageBackground>
        );
    }
}

export default UbicacionScreen;

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        // paddingTop: 50,
    },
    ContainerTitulo: {
        //width: WIDTH - 45
    },
    Titulo: {
        color: 'black',
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 10,
        opacity: 0.8,
        textAlign: 'center',
        // paddingTop: 50,

    },
    text: {
        paddingTop: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    textSub: {
        paddingTop: 35,
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    textOption: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        lineHeight: 30,
        marginLeft: 20
    },
    ContainerText: {
        //width: WIDTH - 55
    },
    btnContinuar: {
        width: WIDTH - 250,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#005DA6',
        justifyContent: 'center',
        marginTop: 50,
        marginRight: 30
    },
    btnSalir: {
        width: WIDTH - 250,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#de0404',
        justifyContent: 'center',
        marginTop: 50,
    },
    textBtn: {
        color: '#ffff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
