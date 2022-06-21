import React, { useState } from 'react';
import { View, FlatList } from 'react-native';

import { Profile } from '../../componentes/Profile';
import { ListHeader } from '../../componentes/ListHeader';
import { ButtonAdd } from '../../componentes/ButtonAdd';
import { Appointment } from '../../componentes/Appointment';
import { CategorySelect } from '../../componentes/CategorySelect';

import { styles } from './style';
 
export function Home() {
    const [category, setCategory] = useState('')

    const appointments = [{
        id: '1',
        guild: {
            id:'1',
            name:'Lendários',
            icon: null,
            owner: true
        },
        category:'1',
        date:'21/06 às 02:40h',
        description: 'É hoje que vemos chegar ao challenger sem perder uma partida da md10'
    },
]

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    return (
        <View>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd />
            </View>

            <View>
                <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
                />

                <View style={styles.content}>
                    <ListHeader 
                    title='Partidas agendadas'
                    subtitle='Total 6'                    
                    />

                <FlatList
                    data={appointments}
                    keyExtractor={item =>item.id}
                    renderItem={({ item }) => (
                        <Appointment data={item} />
                    )}
                
                />

                </View>
            </View>
        </View>
    )
}