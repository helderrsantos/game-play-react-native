import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Fontisto } from '@expo/vector-icons';

import { 
    ImageBackground, 
    Text, 
    View, 
    FlatList
} from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './style';
import BannerImg from '../../assets/banner.png';

import { Background } from '../../componentes/Background';
import { ListHeader } from '../../componentes/ListHeader';
import { ButtonIcon } from '../../componentes/ButtonIcon';
import { Header } from '../../componentes/Header';
import { Member } from '../../componentes/Member';
import { ListDivider } from '../../componentes/ListDivider';

export function AppointmentDetails(){
  const members = [
    {
        id:'1',
        username: 'Helder',
        avatar_url: 'https://github.com/helderrsantos.png',
        status:'offline'
    },
    {
        id:'2',
        username: 'Rodrigo',
        avatar_url: 'https://github.com/helderrsantos.png',
        status:'online'
    },
  ]
    return (
    <Background>
        <Header 
            title='Detalhes'
            action={
              <BorderlessButton>
                <Fontisto 
                    name='share'
                    size={24}
                    color={theme.colors.primary}
                />
              </BorderlessButton>      
            }
        />

        <ImageBackground 
            source={BannerImg}
            style={styles.banner}
        >
            
            <View style={styles.bannerContent}>
            <Text style={styles.title}>
                Lendarios
            </Text>

            <Text style={styles.subtitle}>
                É hoje que vamos chegar ao challenger sem perder uma partida da md10
            </Text>
            </View>
        </ImageBackground>
        <ListHeader 
            title='Jogadores'
            subtitle='Total 3'        
        />
        <FlatList 
            data={members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <Member data={item} />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.members}
        />

        <View style={styles.footer}>
        <ButtonIcon 
            title='Entrar na partida'
        />
        </View>
    </Background>
    );
}


