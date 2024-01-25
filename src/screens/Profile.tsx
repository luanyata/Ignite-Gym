import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Center,
  ScrollView,
  VStack,
  Text,
  Heading,
  View,
  useToast,
  useToken,
} from '@gluestack-ui/themed'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

const PHOTO_SIZE = 'lg'

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/luanyata.png')

  const red500 = useToken('colors', 'red500')
  const toast = useToast()

  const handlePhotoSelected = async () => {
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      const photoUri = photoSelected?.assets[0]?.uri

      if (photoUri) {
        const photoInfo = await FileSystem.getInfoAsync(photoUri)

        if (
          photoInfo.exists &&
          photoInfo.size &&
          photoInfo.size / 1024 / 1024 > 2
        ) {
          return toast.show({
            render: () => (
              <View>
                <Text color="$white">
                  Essa imagem é muito grande. Escolha uma de até 5MB.
                </Text>
              </View>
            ),
            placement: 'top',
            containerStyle: {
              backgroundColor: red500,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 5,
            },
          })
        }

        setUserPhoto(photoUri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

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
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handlePhotoSelected}>
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
