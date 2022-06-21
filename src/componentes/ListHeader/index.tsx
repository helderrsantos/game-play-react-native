import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './style';
import { theme } from '../../global/styles/theme';

type Props = {
    title: string;
    subtitle: string;
}

export function ListHeader ({
    title,
    subtitle,
}: Props){
    const {secondary50, secondary70} = theme.colors;
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                { title }
            </Text>

            <Text style={styles.subtitle}>
                { subtitle }
            </Text>
        </View>
    )
}