import { useState } from 'react'
import {
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
  useToast,
  useToken,
} from '@gluestack-ui/themed'
import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Image } from 'react-native'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthRoutesProps } from '../routes/auth.routes'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { AppError } from '@utils/AppError'
import { useAuth } from '@hooks/useAuth'
import { Toast } from '../components/Toast'

type FormDataProps = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const red500 = useToken('colors', 'red500')

  const { singIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  })

  const navigation = useNavigation<AuthRoutesProps>()

  const handleNewAccount = () => {
    navigation.navigate('signUp')
  }

  const handleSignIn = async ({ email, password }: FormDataProps) => {
    try {
      setIsLoading(true)
      await singIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'

      setIsLoading(false)

      toast.show({
        render: () => <Toast message={title} />,
        placement: 'top',
        containerStyle: {
          backgroundColor: red500,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 5,
        },
      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px="$10" pb="$16">
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          style={{
            position: 'absolute',
          }}
        />

        <Center my="$24">
          <LogoSvg />
          <Text color="$gray100" fontSize="$sm">
            Treine sua mente e seu corpo.
          </Text>
        </Center>

        <Center>
          <Heading
            color="$gray100"
            fontSize="$xl"
            mb="$6"
            fontFamily="$heading"
          >
            Acesse a conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
        </Center>
        <Center mt="$1/4">
          <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
            Não tem uma conta?
          </Text>

          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
