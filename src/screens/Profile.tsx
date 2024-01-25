import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Center,
  ScrollView,
  VStack,
  Text,
  Heading,
  View,
} from '@gluestack-ui/themed'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

const PHOTO_SIZE = 'lg'

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          {photoIsLoading ? (
            <View>
              <Text>Carregando</Text>
            </View>
          ) : (
            <UserPhoto
              source={{ uri: 'https://github.com/luanyata.png' }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>
          <Input bg="$gray600" placeholder="Nome" />

          <Input bg="$gray600" placeholder="E-mail" isDisabled />

          <Heading
            color="$gray200"
            fontSize="$md"
            mb="$2"
            alignSelf="flex-start"
            mt="$12"
          >
            Alterar senha
          </Heading>

          <Input bg="$gray600" placeholder="Senha antiga" secureTextEntry />

          <Input bg="$gray600" placeholder="Nova senha" secureTextEntry />

          <Input
            bg="$gray600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button title="Atualizar" mt="$4" />
        </Center>
      </ScrollView>
    </VStack>
  )
}
