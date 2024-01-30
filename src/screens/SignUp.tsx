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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { api } from '../services/api'
import { AppError } from '../utils/AppError'
import { Toast } from '../components/Toast'

type FormDataProps = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  passwordConfirm: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere'),
})

export const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })

  const red500 = useToken('colors', 'red500')
  const green500 = useToken('colors', 'green500')
  const toast = useToast()

  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleSignUp = async ({ name, email, password }: FormDataProps) => {
    try {
      await api.post('/users', { name, email, password })

      toast.show({
        render: () => <Toast message="Conta criada com sucesso!" />,
        placement: 'top',
        containerStyle: {
          backgroundColor: green500,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 5,
        },
      })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde'

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

        <Center my="$1/4">
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
            Crie sua conta
          </Heading>

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

          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.passwordConfirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>
        <Center mt="$1/4">
          <Button
            title="Voltar para o login"
            variant="outline"
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
