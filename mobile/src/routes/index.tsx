import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { Box, useToken } from '@gluestack-ui/themed'
import { useAuth } from '@hooks/useAuth'
import { Loading } from '../components/Loading'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = useToken('colors', 'gray700')

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer>
        {user?.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
