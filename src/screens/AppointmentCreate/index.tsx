import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { 
    Text, 
    View, 
    ScrollView,
    Platform,
    KeyboardAvoidingView
} from 'react-native';

import uuid from 'react-native-uuid';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { theme } from '../../global/styles/theme';
import { styles } from './style';

import { CategorySelect } from '../../componentes/CategorySelect';
import { GuildIcon } from '../../componentes/GuildIcon';
import { TextArea } from '../../componentes/TextArea';
import { ModalView } from '../../componentes/ModalView';
import { SmallInput } from '../../componentes/SmallInput';
import { Background } from '../../componentes/Background';
import { Button } from '../../componentes/Button';
import { Header } from '../../componentes/Header';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../componentes/Guild';

export function AppointmentCreate(){
    const [category, setCategory] = useState('');
    const [openGuildModal, setOpenGuildModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    const [day, setDay] = useState('');
    const [mounth, setMounth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();
    
    function handleOpenGuilds(){
        setOpenGuildModal(true);
    }

    function handleCloseGuilds(){
        setOpenGuildModal(false);
    }

    function handleCategorySelect(categoryId: string){
        setCategory(categoryId);
    }

    function handleGuildSelect(guildSelect: GuildProps){
        setOpenGuildModal(false)
        setGuild(guildSelect);
    }

    async function handleSave() {
        const newAppointment = {
            id:uuid.v4(),
            guild,
            category,
            date: `${day}/${mounth} às ${hour}:${minute}h`,
            description,
        };
        
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );
        navigation.navigate('Home');
    }


    return (
<KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
>
    <Background>
    <ScrollView>
        <Header 
            title='Agendar partida'
        />

        <Text style={[
            styles.label,
            { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>
            Categoria
        </Text>

        <CategorySelect 
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
        />

        <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
                <View style={styles.select}>
                    {
                    guild.icon 
                    ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> 
                    : <View style={styles.image} />
                    }
                        <View style={styles.selectBody}>
                            <Text style={styles.label}>
                            {guild.name 
                            ? guild.name 
                            : 'Selecione um servidor'}
                            </Text>
                        </View>

                    <Feather
                        name='chevron-right'                         
                        color={theme.colors.heading}
                        size={18}
                    />

                </View>
            </RectButton>

            <View style={styles.field}>
                <View>
                    <Text style={[styles.label, {marginBottom: 12}]}>
                        Dia e mês
                    </Text>

                    <View style={styles.column}>
                        <SmallInput 
                        maxLength={2}
                        onChangeText={setDay}
                        />
                        <Text style={styles.divider}>
                            /
                        </Text>
                        <SmallInput 
                        maxLength={2}
                        onChangeText={setMounth}
                        />
                    </View>
                </View>

                <View>
                    <Text style={[styles.label, {marginBottom: 12}]}>
                        Hora e minuto
                    </Text>

                    <View style={styles.column}>
                        <SmallInput 
                        maxLength={2}
                        onChangeText={setHour}
                        />
                        <Text style={styles.divider}>
                            :
                        </Text>
                        <SmallInput 
                        maxLength={2}
                        onChangeText={setMinute}/>
                    </View>
                </View>            
            </View>

            <View style={[styles.field, {marginBottom: 12}]}>
                <Text style={styles.label}>
                    Descrição
                </Text>

                <Text style={styles.caracteresLimit}>
                    Max 100 caracteres
                </Text>
            </View>           

                <TextArea
                multiline
                maxLength={100}
                numberOfLines={5}
                autoCorrect={false}
                onChangeText={setDescription}
                />

            <View style={styles.footer}>
                <Button 
                title='Agendar'
                onPress={handleSave}
                />
            </View>
            
        </View> 
    </ScrollView>

    </Background>

    <ModalView visible={openGuildModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect}/>
    </ModalView>
    
</KeyboardAvoidingView>
    );
}


