import { TouchableOpacity } from 'react-native'
import { Heading, HStack, Text, VStack, Icon } from '@gluestack-ui/themed'
import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from './UserPhoto'

export function HomeHeader() {
  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center">
      <UserPhoto
        source={{ uri: 'https://github.com/luanyata.png' }}
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

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="$gray200" size="md" />
      </TouchableOpacity>
    </HStack>
  )
}
