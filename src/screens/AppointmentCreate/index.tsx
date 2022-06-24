import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import { 
    Text, 
    View, 
    ScrollView,
    Platform,
    KeyboardAvoidingView
} from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './style';

import { CategorySelect } from '../../componentes/CategorySelect';
import { GuildIcon } from '../../componentes/GuildIcon';
import { TextArea } from '../../componentes/TextArea';
import { ModalView } from '../../componentes/ModalView';
import { SmallInput } from '../../componentes/SmallInput';
import { Button } from '../../componentes/Button';
import { Header } from '../../componentes/Header';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../componentes/Guild';

export function AppointmentCreate(){
    const [category, setCategory] = useState('');
    const [openGuildModal, setOpenGuildModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    function handleOpenGuilds(){
        setOpenGuildModal(true);
    }

    function handleGuildSelect(guildSelect: GuildProps){
        setOpenGuildModal(false)
        setGuild(guildSelect);
    }

    return (
<KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
>

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
            setCategory={setCategory}
            categorySelected={category}
        />

        <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
                <View style={styles.select}>
                    {
                    guild.icon 
                    ? <GuildIcon /> 
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
                    <Text style={styles.label}>
                        Dia e mês
                    </Text>

                    <View style={styles.column}>
                        <SmallInput maxLength={2}/>
                        <Text style={styles.divider}>
                            /
                        </Text>
                        <SmallInput maxLength={2}/>
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>
                        Hora e minuto
                    </Text>

                    <View style={styles.column}>
                        <SmallInput maxLength={2}/>
                        <Text style={styles.divider}>
                            :
                        </Text>
                        <SmallInput maxLength={2}/>
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
                />

            <View style={styles.footer}>
                <Button title='Agendar'/>
            </View>
            
        </View> 
    </ScrollView>

    <ModalView visible={openGuildModal}>
        <Guilds handleGuildSelect={handleGuildSelect}/>
    </ModalView>

</KeyboardAvoidingView>
    );
}


