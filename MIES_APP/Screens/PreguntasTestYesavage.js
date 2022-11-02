import React from 'react';
import {Alert, Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import bgImage from '../assets/img_sistema/fondo_login.jpg';
import {RadioButton} from 'react-native-paper';
//import DatePicker from '@react-native-community/datetimepicker';
//https://snack.expo.io/@phattran1201/date-picker-example
import moment from 'moment';

const {width: WIDTH} = Dimensions.get('window')


export class Formularioye extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: '',
            checked1: '',
            checked2: '',
            checked3: '',
            checked4: '',
            checked5: '',
            checked6: '',
            checked7: '',
            checked8: '',
            checked9: '',
            checked10: '',
            checked11: '',
            checked12: '',
            checked13: '',
            checked14: '',
            puntaje: 0,
            temp: '',
            estado: '1',
            uno: '1',
            cero: '0',
            datetimeStart: moment(new Date()),
            //Ver y ocultar clave
            showPass: true,
            press: false
        }
        this.onsubmitGuardar = this.onsubmitGuardar.bind(this);
        this.alertTime = this.alertTime.bind(this);
        this.calculartotal = this.calculartotal.bind(this);
    }

    calculartotal = (total) => {
        this.setState({
            temp: total,
        })
    }

    alertTime = (time) => {
        Alert.alert(
            'Resultados Test Yesavage',
            'Tiempo de duración: ' + time +
            '\n\nPuntaje Total: ' + this.state.temp + '.',
            [
                {text: 'Aceptar', onPress: () => this.props.navigation.navigate('Test')}
            ],
            {cancelable: false}
        )
    }

    //CALCULO DE TIEMPO DE APLICACIÓN

    onsubmitGuardar = () => {
        const {datetimeStart} = this.state;
        const datetimeEnd = moment(new Date());
        //fechas para enviar a la base de datos
        const fechaInicial = datetimeStart.format('HH:mm:ss a');
        const fechaFinal = datetimeEnd.format('HH:mm:ss a');
        const diferencia = moment(datetimeEnd).diff(datetimeStart, 'seconds');
        //mostrar fecha inicial
        console.log(fechaInicial);

        //mostrar fecha final
        console.log(fechaFinal);
        let time = new Date();

        time.setHours(parseInt(diferencia / 3600) % 24);
        time.setMinutes(parseInt(diferencia / 60) % 60);
        time.setSeconds(parseInt(diferencia % 60));
        time = time.toTimeString().split(" ")[0];

        console.log('Tiempo duración', time);

        const {checked} = this.state;
        const {checked1} = this.state;
        const {checked2} = this.state;
        const {checked3} = this.state;
        const {checked4} = this.state;
        const {checked5} = this.state;
        const {checked6} = this.state;
        const {checked7} = this.state;
        const {checked8} = this.state;
        const {checked9} = this.state;
        const {checked10} = this.state;
        const {checked11} = this.state;
        const {checked12} = this.state;
        const {checked13} = this.state;
        const {checked14} = this.state;
        const {estado} = this.state;

        var preg = parseInt(this.state.checked);
        var preg1 = parseInt(this.state.checked1);
        var preg2 = parseInt(this.state.checked2);
        var preg3 = parseInt(this.state.checked3);
        var preg4 = parseInt(this.state.checked4);
        var preg5 = parseInt(this.state.checked5);
        var preg6 = parseInt(this.state.checked6);
        var preg7 = parseInt(this.state.checked7);
        var preg8 = parseInt(this.state.checked8);
        var preg9 = parseInt(this.state.checked9);
        var preg10 = parseInt(this.state.checked10);
        var preg11 = parseInt(this.state.checked11);
        var preg12 = parseInt(this.state.checked12);
        var preg13 = parseInt(this.state.checked13);
        var preg14 = parseInt(this.state.checked14);

        fetch('http://192.168.100.18/pruebas_react/regisprueba.php', {
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-type': 'Application/json'
            },
            body: JSON.stringify({
                checked: checked,
                checked1: checked1,
                checked2: checked2,
                checked3: checked3,
                checked4: checked4,
                checked5: checked5,
                checked6: checked6,
                checked7: checked7,
                checked8: checked8,
                checked9: checked9,
                checked10: checked10,
                checked11: checked11,
                checked12: checked12,
                checked13: checked13,
                checked14: checked14,
                fechaInicial: fechaInicial,
                fechaFinal: fechaFinal,
                time: time,
                estado: estado
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson === "Ok") {
                    var total = preg + preg1 + preg2 + preg3 + preg4 + preg5 + preg6 + preg7 + preg8 + preg9 + preg10 + preg11 + preg12 + preg13 + preg14;
                    this.calculartotal(total);
                    this.alertTime(time);
                } else if (responseJson === "No") {
                    alert("Error al realizar el registro");
                } else {
                    alert("Todos los campos son obligatorios");
                }
            }).catch((error) => {
            console.log(error);
        });

    }

    render() {

        const {checked} = this.state;
        const {checked1} = this.state;
        const {checked2} = this.state;
        const {checked3} = this.state;
        const {checked4} = this.state;
        const {checked5} = this.state;
        const {checked6} = this.state;
        const {checked7} = this.state;
        const {checked8} = this.state;
        const {checked9} = this.state;
        const {checked10} = this.state;
        const {checked11} = this.state;
        const {checked12} = this.state;
        const {checked13} = this.state;
        const {checked14} = this.state;
        const {estado} = this.state;
        const {uno} = this.state;
        const {cero} = this.state;
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.TituloLogin}>Intrucciones</Text>
                    </View>
                    <View style={styles.subtitulo}>
                        <Text style={styles.TextInfoSub}>Responda cada una de las siguientes preguntas según como se ha
                            sentido Ud. durante la última semana.</Text>
                    </View>

                    <View tyle={styles.tituloEdad}>
                        <Text style={styles.TituloEda}>Cada una de estas respuestas cuenta <Text style={{color: 'red'}}>1
                            PUNTO.</Text></Text>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>1. ¿Está Ud. básicamente satisfecho con su vida?</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group re
                                           onValueChange={checked => this.setState({checked})}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>2. ¿Ha disminuido o abandonado muchos de sus intereses o actividades
                            previas?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked1: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked1 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked1: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked1 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked1: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>3. ¿Siente que su vida está vacía?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked2: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked2 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked2: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked2 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked2: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>4. ¿Se siente aburrido frecuentemente?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked3: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked3 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked3: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked3 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked3: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>5. ¿Está Ud. de buen ánimo la mayoría del tiempo?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked4: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked4 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked4: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked4 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked4: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>6. ¿Está preocupado o teme que algo malo le va a pasar?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked5: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked5 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked5: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked5 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked5: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>7. ¿Se siente feliz la mayor parte del tiempo?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked6: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked6 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked6: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked6 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked6: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>8. ¿Se siente con frecuencia desamparado?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked7: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked7 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked7: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked7 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked7: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>9. ¿Prefiere Ud. quedarse en casa a salir a hacer cosas
                            nuevas?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked8: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked8 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked8: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked8 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked8: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>10. ¿Siente Ud. que tiene más problemas con su memoria que otras
                            personas de su edad?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked9: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked9 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked9: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked9 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked9: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>11. ¿Cree Ud. que es maravilloso estar vivo?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked10: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked10 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked10: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked10 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked10: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>12. ¿Se siente inútil o despreciable como está Ud.
                            actualmente?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked11: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked11 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked11: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked11 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked11: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>13. ¿Se siente lleno de energía?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked12: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked12 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked12: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked12 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked12: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>14. ¿Se encuentrra sin esperanza ante su situación actual?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked13: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked13 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked13: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked13 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked13: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={styles.tituloLabel}>
                        <Text style={styles.label}>15. ¿Cree Ud. que las otras personas están en general mejor que
                            Ud?</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <RadioButton.Group
                            onValueChange={(v) => {
                                this.setState({checked14: v})
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioButton
                                        value={this.state.uno}
                                        status={checked14 === uno ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked14: uno});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>Si</Text>
                                <View>
                                    <RadioButton
                                        value={this.state.cero}
                                        status={checked14 === cero ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({checked14: cero});
                                        }}
                                    />
                                </View>
                                <Text style={styles.TextRadio}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity style={styles.btnRegistrar}
                                          onPress={this.onsubmitGuardar}>
                            <Text style={styles.text1}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnCancelar}
                                          onPress={() => this.props.navigation.navigate('Test')}>
                            <Text style={styles.text1}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}
export default Formularioye;


const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        //alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    scrollView: {
        // backgroundColor: 'pink',
        //marginBottom : 10,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 70,
    },
    inputContainer1: {
        marginTop: 20,

    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 40,
    },
    input: {
        width: 299,
        height: 42,
        borderRadius: 19,
        fontSize: 18,
        paddingTop: 9,
        paddingLeft: 39,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: "#FEFCFC",
        marginHorizontal: 25,

    },
    TextRadio: {
        fontSize: 16,
        marginTop: 0,
        top: 6,
        opacity: 0.5,
        marginRight: 50
    },
    tituloEdad: {
        alignItems: 'center',
        marginBottom: 50
    },
    TituloEda: {
        color: '#020202',
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center'

    },

    logoLogin: {
        height: 150
    },

    tituloLabel: {
        paddingLeft: 20,
        paddingRight: 15,
        marginBottom: 20,
        marginTop: 0,
        textAlign: 'justify',
    },
    subtitulo: {
        paddingLeft: 25,
        paddingRight: 25,
        justifyContent: 'center',
        marginTop: 0,
        textAlign: 'center',
    },
    TituloLogin: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 0,
        opacity: 0.5,
        justifyContent: 'center',

    },
    TextInfo: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 3,
        opacity: 0.5,
        textAlign: 'justify',
    },
    TextInfoSub: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 3,
        opacity: 0.5,
        textAlign: 'center',
    },

    label: {
        fontSize: 16,
        paddingLeft: 0,
        marginTop: 10,
        flexDirection: 'row',
        top: 5,
        fontWeight: 'bold'

    },
    inputContainer: {
        marginTop: 10
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
    text1: {
        color: '#ffff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    sectionStyle: {
        flex: 1,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        marginTop: 10,
    },

    container: {
        backgroundColor: '#FF0000',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        marginLeft: 7,
    },

});
