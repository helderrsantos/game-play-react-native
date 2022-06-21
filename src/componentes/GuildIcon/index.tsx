import React from 'react';
import { Image } from 'react-native';

import { styles } from './style';

export function GuildIcon(){
    const uri= 'https://img.freepik.com/free-vector/modern-badge-discord-icon_578229-169.jpg?w=2000'
    return(
     <Image 
     source={{ uri }}
     style={styles.image}
     resizeMode='cover'
     
     />
    )
}