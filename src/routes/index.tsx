import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { useAuth } from '@hooks/useAuth'
import { AuthRoutes } from './auth.routes'
import { Box, useToken } from '@gluestack-ui/themed'
import { AppRoutes } from './app.routes'
import { Loading } from '../components/Loading'

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
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
