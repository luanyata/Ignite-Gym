import HistorySvg from '@assets/history.svg'
import HomeSvg from '@assets/home.svg'
import ProfileSvg from '@assets/profile.svg'

import { useToken } from '@gluestack-ui/themed'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Exercise } from '@screens/Exercise'
import { History } from '@screens/History'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'

type AppRoutes = {
  home: undefined
  exercise: { exerciseId: string }
  profile: undefined
  history: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export const AppRoutes = () => {
  const gray200 = useToken('colors', 'gray200')
  const gray600 = useToken('colors', 'gray600')
  const green500 = useToken('colors', 'green500')

  const size6 = useToken('fontSizes', '2xl')

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: green500,
        tabBarInactiveTintColor: gray200,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: gray600,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={size6} height={size6} />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={size6} height={size6} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={size6} height={size6} />
          ),
        }}
      />

      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
