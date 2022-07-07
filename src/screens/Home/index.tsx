import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Load } from '../../componentes/Load';
import { Profile } from '../../componentes/Profile';
import { ListDivider } from '../../componentes/ListDivider';
import { ListHeader } from '../../componentes/ListHeader';
import { Background } from '../../componentes/Background';
import { ButtonAdd } from '../../componentes/ButtonAdd';
import { Appointment, AppointmentProps } from '../../componentes/Appointment';
import { CategorySelect } from '../../componentes/CategorySelect';

import { styles } from './style';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
 
export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    const navigation = useNavigation();


    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps){
        navigation.navigate('AppointmentDetails', {guildSelected});
    }

    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];
    
        if(category){
          setAppointments(storage.filter(item => item.category === category));
        }else{

        }        
        setLoading(false);
      }
    
      useFocusEffect(useCallback(() => {
       loadAppointments();
      },[category]));

      return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>

            <CategorySelect
                setCategory={handleCategorySelect}
                categorySelected={category}
            />

            {
            loading ? <Load /> :
            <>
            <ListHeader 
                title='Partidas agendadas'
                subtitle={`Total ${appointments.length}`}
            />

            
            <FlatList
                data={appointments}
                keyExtractor={item =>item.id}
                renderItem={({ item }) => (
                <Appointment 
                    data={item}
                    onPress={() =>handleAppointmentDetails(item)}
                />                    
                )}
                ItemSeparatorComponent={() => <ListDivider />}
                contentContainerStyle={{ paddingBottom: 69 }}
                style={styles.matches}
                showsVerticalScrollIndicator={false}                
            />
            </>
                        
        }
        </Background>
    )
}