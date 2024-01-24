/* eslint-disable camelcase */
import { StatusBar, View } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Loading } from './src/components/Loading'
import { config } from './config/gluestack-ui.config'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <GluestackUIProvider config={config}>
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Loading />
      </View>
    </GluestackUIProvider>
  )
}
