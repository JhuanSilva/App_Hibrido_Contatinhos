import { StatusBar } from 'react-native'

import {
  useFonts,
  Ubuntu_700Bold,
  Ubuntu_500Medium,
  Ubuntu_400Regular
} from '@expo-google-fonts/ubuntu'

import { Home } from '@/app/home';
import { Loading } from '@/app/components/loading';

  export default function App() {
    const[fontsLoaded] = useFonts({
      Ubuntu_700Bold,
      Ubuntu_500Medium,
      Ubuntu_400Regular
    })
  
    if(!fontsLoaded){
      return <Loading />
    }

    return(
      <>
        <StatusBar barStyle={'light-content'}
        backgroundColor={'transparent'}/>
        <Home />
      </>
    )

  }

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
