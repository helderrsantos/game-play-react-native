import React from 'react';
import { View, FlatList } from 'react-native';
import { GuildProps } from '../../componentes/Guild';

import { Guild } from '../../componentes/Guild';
import { ListDivider } from '../../componentes/ListDivider';

import { styles } from './style';

type Props = {
    handleGuildSelect:(guild: GuildProps) => void;
}

export function Guilds({handleGuildSelect}: Props){
   const guilds = [
    {
        id: '1',
        name: 'Lendários',
        icon: 'image.png',
        owner: true
    },
    {
        id: '2',
        name: 'Galera do game',
        icon: 'image.png',
        owner: true
    },
   ]
    return(
    <View style={styles.container}>
        <FlatList 
            data={guilds}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Guild 
                data={item}
                onPress={() => handleGuildSelect(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.guilds}
        />
    </View>
    )
}