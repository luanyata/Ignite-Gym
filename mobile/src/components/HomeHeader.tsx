import defaulUserPhotoImg from '@assets/userPhotoDefault.png'
import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Heading, Icon, Text, VStack } from '@gluestack-ui/themed'
import { TouchableOpacity } from 'react-native'

import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { UserPhoto } from './UserPhoto'

export const HomeHeader = () => {
  const { user, signOut } = useAuth()

  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center">
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaulUserPhotoImg
        }
        alt="Imagem do usuário"
        mr="$4"
        size="sm"
      />

      <VStack flex={1}>
        <Text color="$gray100" fontSize="$md">
          Olá,
        </Text>

        <Heading color="$gray100" fontSize="$md" fontFamily="$heading">
          Luan
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="$gray200" size="md" />
      </TouchableOpacity>
    </HStack>
  )
}
