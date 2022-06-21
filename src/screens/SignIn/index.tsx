import React from 'react';
import { 
    Text, 
    View , 
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import IllustrationImg from '../../assets/illustration.png'
import { styles } from './style';

import { ButtonIcon } from '../../componentes/ButtonIcon';

export function SignIn() {
    const navegation = useNavigation();
    function handleSignIn(){
        navegation.navigate('Home');
    
    }
    return (

<View style={styles.container}>

    <Image 
        source={IllustrationImg} 
        style={styles.image}
        resizeMode="stretch"
    />

    <View style={styles.content}>
        <Text style={styles.title}>
        Conecte-se{'\n'}
        e organize suas{'\n'}
        jogatinas
        </Text>

        <Text style={styles.subtitle}>
        Crie grupos para jogar seus games{'\n'}
        favoritos com seus amigos
        </Text>

    <ButtonIcon 
        title="Entrar com Discord"
        onPress={handleSignIn}
    />

    </View>
</View>
  );
}