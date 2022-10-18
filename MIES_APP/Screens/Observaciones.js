import React, {useEffect, useState} from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import bgImage from '../assets/img_sistema/fondo_login.jpg';
import Textarea from 'react-native-textarea';
import * as ImagePicker from 'expo-image-picker';
//import { Camera } from 'expo-camera';
import {FontAwesome} from '@expo/vector-icons';

//Función que contiene el componente para seleccionar imagenes de la galería
//************************************* */
function ImagePickerChoose(props) {
    const [image, setImage] = useState(null);
    const [photoStatus, setPhotoStatus] = useState('No se ha seleccionado ninguna imagen');
    //controla que los permisos para acceder a la galería hayan sido dados
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Lo sentimos, se necesitan permisos para acceder a la galería');
                }
            }
        })();
    }, []);
    //Selecciona una imágen de manera asincrina desde la galeria y cuando se carga
    //manda a llamar a la función parentCallBack para enviarle el uri al componente padre
    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
            setPhotoStatus('Listo! la imagen fue cargada exitosamente')
        }
        props.parentCallBack(result)
    };
    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <FontAwesome name="image" size={20} color="black"/>
                <Text style={styles.btnText}> Seleccionar Imagen</Text>
            </TouchableOpacity>
            <Text style={styles.TextInfo1}>{photoStatus}</Text>
            {image && <Image source={{uri: image}} style={{width: 260, height: 260, marginTop: 20}}/>}
        </View>


    );
}

const {width: WIDTH} = Dimensions.get('window')
export class Observaciones extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '',//obtiene la imagen del componente ImagePickerChoose
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
        if (localUri == null || localUri === '') {
            //Alert.alert('Debe seleccionar una imágen')
            Alert.alert('Error de Carga', 'Debe seleccionar una imagen o tomar una foto. Intente nuevamente', [{text: 'Aceptar'}]);
        } else {
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let formData = new FormData();
            formData.append('photo', {uri: localUri, name: filename, type});

            return await fetch('http://192.168.100.18/pruebas_react/upload_image.php', {
                method: 'POST',
                body: formData,
                header: {
                    'content-type': 'multipart/form-data',
                },
            }).then(res => res.json())
                .catch(error => console.error('Error', error))
                .then(response => {
                    if (response.status === 1) {
                        //Alert.alert('Imagen guardada')
                        Alert.alert('Subida exitosa', 'La imagen se ha guardado correctamente', [{text: 'Aceptar'}]);
                    } else {
                        //Alert.alert('No se ha podido guardar la imagen, intentelo de nuevo')
                        Alert.alert('Error de carga', 'No se ha podido guardar la imagen, intentelo de nuevo', [{text: 'Aceptar'}]);
                    }
                });
        }

    };

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <Text style={styles.TextInfo}>Registre todas las anomalias que noto en el adulto mayor durante
                            la realizacion de los test.</Text>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={this.onChange}
                            defaultValue={this.state.text}
                            maxLength={500}
                            placeholder={'El adulto mayor tardo un tiempo considerable en responder las preguntas de indole familiar y emocional。。。'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                        <Text style={styles.TextInfo}>Tome una foto o seleccione una imagen del adulto mayor</Text>
                        <TouchableOpacity style={styles.button2}
                                          onPress={() => this.props.navigation.navigate('Camara')}>
                            <FontAwesome name="camera" size={20} color="black"/>
                            <Text style={styles.btnText}> Tomar foto</Text>
                        </TouchableOpacity>

                        <ImagePickerChoose parentCallBack={this.setImageState}></ImagePickerChoose>
                        <TouchableOpacity style={styles.button1} onPress={this.uploadImage}>
                            <FontAwesome name="upload" size={20} color="white"/>
                            <Text style={styles.btnText}> Subir Foto</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                        <TouchableOpacity style={styles.btnRegistrar}
                                          onPress={() => this.props.navigation.navigate('Test')}>
                            <Text style={styles.text}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnCancelar}
                                          onPress={() => this.props.navigation.navigate('Test')}>
                            <Text style={styles.text}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}
export default Observaciones;

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
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 70,
    },
    logoLogin: {

        height: 150
    },
    tituloContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    tituloLabel: {
        alignItems: 'stretch',
        marginBottom: 50,
        marginTop: 20
    },
    TituloLogin: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        opacity: 0.5
    },
    TextInfo: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        opacity: 40,
        marginBottom: 10
    },

    labelEdad: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        //opacity: 0.5
        textAlign: 'left',
    },
    inputContainer: {
        marginTop: 10
    },
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingRight: 30,
        paddingLeft: 30
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#85929E',
        margin: 30,
        borderRadius: 10,
        height: 60,
        width: 200,
    },
    button2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#85929E',
        marginBottom: -20,
        borderRadius: 10,
        height: 60,
        width: 200,
        marginTop: 30
    },
    button1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212121',
        margin: 30,
        borderRadius: 10,
        height: 60,
        width: 200,
    },
    textareaContainer: {
        height: 150,
        padding: 5,
        backgroundColor: '#F5FCFF',
        marginBottom: 30,
        marginTop: 10
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
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
    btnRegistrar: {
        width: 160,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#005DA6',
        justifyContent: 'center',
        marginTop: 20,
    },
    btnCancelar: {
        width: 160,
        height: 45,
        borderRadius: 45,
        marginBottom: 20,
        backgroundColor: '#E74C3C',
        justifyContent: 'center',
        marginTop: 20,
    },
    TextInfo1: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'normal',
        marginTop: 0,
        opacity: 0.5,
        textAlign: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center',
    },
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop: 10,
    },
    btnSection: {
        width: WIDTH - 110,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#C0C0C0',
        justifyContent: 'center',
        marginTop: 20,


    },
    btnText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        width: WIDTH - 110,
        height: 25,
        borderRadius: 5,
        justifyContent: 'center',
    }
});
