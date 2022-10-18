import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import {Avatar, Caption, Drawer, Paragraph, Text, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    return (
        <View style={{flex: 1, backgroundColor: '#005DA6'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://peinados.es/wp-content/uploads/2016/03/cortes-de-pelo-rostro-cuadrado-pelo-corto-pelo-castano-claro-istock.jpg'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>Pedro Perez</Title>
                                <Caption style={styles.caption}>@pedroperez1</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>Adultos Mayores:</Paragraph>
                                <Caption style={styles.caption}>40</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section styles={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={'white'}
                                    size={30}
                                />
                            )}
                            label={() => (
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 13,
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        marginLeft: -20
                                    }}
                                >Lista Adultos Mayor</Text>
                            )}
                            onPress={() => {
                                props.navigation.navigate('ListaAM')
                            }}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="account-outline"
                                    color={'white'}
                                    size={30}
                                />
                            )}
                            label={() => (
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 13,
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        marginLeft: -20
                                    }}
                                >Registrar Adulto Mayor</Text>
                            )}

                            onPress={() => {
                                props.navigation.navigate('RegistroAM')
                            }}
                        />


                        {/*<DrawerItem
                            icon={({color, size}) =>(
                                <Icon 
                                    name="bookmark-outline"
                                    color={color}
                                    size={size} 
                                />
                            )}
                            label="Test"
                            onPress={() => {}}
                        />*/}
                    </Drawer.Section>
                    {/*<Drawer.Section title="Preferencias">
                        <TouchableRipple onPress={()=>{toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme}/>  
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>*/}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="exit-to-app"
                            color={'white'}
                            size={30}
                        />
                    )}
                    label={() => (
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 13,
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                marginLeft: -20
                            }}
                        >Cerrar Sesión</Text>
                    )}
                    onPress={() => {
                        props.navigation.replace('Login')
                    }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        marginLeft: -5,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,1)'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: 'rgba(255,255,255,1)'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
        color: 'rgba(255,255,255,1)'
    },
    drawerSection: {
        marginTop: 15,

    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,

    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
