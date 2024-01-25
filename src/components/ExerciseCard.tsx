import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import {
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Icon,
} from '@gluestack-ui/themed'

import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps

export const ExerciseCard = ({ ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="$gray500"
        alignItems="center"
        p="$2"
        pr="$4"
        rounded="$md"
        mb="$3"
      >
        <Image
          source={{
            uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg',
          }}
          alt="Imagem do exercício"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="$lg" color="$white" fontFamily="$heading">
            Remanda unilateral
          </Heading>

          <Text
            fontSize="$sm"
            color="$gray200"
            mt="$1"
            numberOfLines={2}
            fontFamily="$body"
          >
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}
