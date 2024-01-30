import { TouchableOpacity } from 'react-native'
import { Heading, HStack, Text, VStack, Icon } from '@gluestack-ui/themed'
import { MaterialIcons } from '@expo/vector-icons'
import defaulUserPhotoImg from '@assets/userPhotoDefault.png'

import { UserPhoto } from './UserPhoto'
import { useAuth } from '@hooks/useAuth'

export const HomeHeader = () => {
  const { user, signOut } = useAuth()

  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center">
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : defaulUserPhotoImg}
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
