import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { Box, useToken } from '@gluestack-ui/themed'
import { AppRoutes } from './app.routes'

export function Routes() {
  const theme = DefaultTheme

  theme.colors.background = useToken('colors', 'gray700')

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer>
        {/* <AuthRoutes /> */}
        <AppRoutes />
      </NavigationContainer>
    </Box>
  )
}
