import React, {useState, useEffect} from 'react';
import { View, FlatList } from 'react-native';

import { Guild, GuildProps } from '../../componentes/Guild';
import { Load } from '../../componentes/Load';
import { ListDivider } from '../../componentes/ListDivider';

import { styles } from './style';
import { api } from '../../services/api';

type Props = {
    handleGuildSelect:(guild: GuildProps) => void;
}

export function Guilds({handleGuildSelect}: Props){
   const [guilds, setGuilds] = useState<GuildProps[]>([]);
   const [loading, setLoading] = useState(true);

   async function fetGuilds() {
    const response = await api.get('/users/@me/guilds');

    setGuilds(response.data);
    setLoading(false);
   }

   useEffect(() => {
    fetGuilds();
   },[]);

    return(
    <View style={styles.container}>
        {
            loading ? <Load /> :
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
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
            ListHeaderComponent={() => <ListDivider isCentered />}
            style={styles.guilds}
            />
        }
    </View>
    )
}