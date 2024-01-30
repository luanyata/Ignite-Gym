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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Toast } from '../components/Toast'

type FormDataProps = {
  name: string
  email: string
  oldPassword: string
  password: string
  passwordConfirm: string
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
  oldPassword: yup.string().default(''),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .default(''),

  passwordConfirm: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere.')
    .default(''),
})

const PHOTO_SIZE = 'lg'

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/luanyata.png')

  const red500 = useToken('colors', 'red500')
  const green500 = useToken('colors', 'green500')
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
  })

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
          toast.show({
            render: () => (
              <Toast message="Essa imagem é muito grande. Escolha uma de até 5MB." />
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

  const handleUpdateProfile = async ({
    name,
    email,
    oldPassword,
    password,
    passwordConfirm,
  }: FormDataProps) => {
    console.log({ name, email, oldPassword, password, passwordConfirm })
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

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <Input placeholder="E-mail" isDisabled value={value} />
            )}
          />

          <Heading
            color="$gray200"
            fontSize="$md"
            mb="$2"
            alignSelf="flex-start"
            mt="$12"
            fontFamily="$heading"
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.oldPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                returnKeyType="send"
                errorMessage={errors.passwordConfirm?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt="$4"
            onPress={handleSubmit(handleUpdateProfile)}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
