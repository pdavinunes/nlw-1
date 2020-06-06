import React, {useState, useEffect} from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

interface Item {
    label: string,
    value: string
}


const Home = () => {

    const [uf, setUf] = useState('');
    const [ufs, setUfs] = useState<string[]>([]);
    const [city, setCity] = useState('');
    const [cities, setCities] = useState<string[]>([]);

    const navigation = useNavigation();

    useEffect(() => {
        Axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then( response => {
                const ufInitials = response.data.map(uf => uf.sigla);
                setUfs(ufInitials);
            })
    }, [])

    useEffect(() => {
        if(uf === '0'){
            setCities([]);
            return; 
        }

        Axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
            .then( response => {
                const cityNames = response.data.map(city => city.nome);
                setCities(cityNames);
            })
    }, [uf])

    function handleNavigateToPoints() {
       navigation.navigate('Points', {
           uf,
           city
       }) 
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding': undefined}>
        <ImageBackground 
            source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{width: 274, height: 368}}
            >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')}  />
                <View> 
                    <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                    <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
                </View>
            </View>

            <View style={styles.footer}>

                <RNPickerSelect
                    placeholder={{label: "Selecione uma UF"}}
                    onValueChange={ (value) => {setUf(value)} }
                    style={{
                        inputAndroid: {
                            height: 60,
                            backgroundColor: '#FFF',
                            borderRadius: 10,
                            marginBottom: 8,
                            paddingHorizontal: 24,
                            fontSize: 16,
                        },
                        iconContainer: {
                            top: 20,
                            right: 20,
                        }
                        
                    }}
                    items={ufs.map( uf => {
                        return {label: uf, value: uf, key: uf}
                    })}
                    useNativeAndroidPickerStyle={false}
                    Icon={ () => (<Icon name="chevron-down" color="#ddd" size={25}/>) }
                />

                <RNPickerSelect
                    placeholder={{label: "Selecione uma Cidade"}}
                    onValueChange={ (value) => {setCity(value)} }
                    style={{
                        inputAndroid: {
                            height: 60,
                            backgroundColor: '#FFF',
                            borderRadius: 10,
                            marginBottom: 8,
                            paddingHorizontal: 24,
                            fontSize: 16,
                        },
                        iconContainer: {
                            top: 20,
                            right: 20,
                        }
                        
                    }}
                    items={cities.map( city => {
                        return {label: city, value: city, key: city}
                    })}
                    useNativeAndroidPickerStyle={false}
                    Icon={ () => (<Icon name="chevron-down" color="#ddd" size={25}/>) }
                />

                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24}/>
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;