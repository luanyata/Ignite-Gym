import { Center, Heading, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Image } from 'react-native'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthRoutesProps } from '../routes/auth.routes'

export const SignIn = () => {
  const navigation = useNavigation<AuthRoutesProps>()

  const handleNewAccount = () => {
    navigation.navigate('signUp')
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

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />

          <Button title="Acessar" onPress={() => console.log('hello')} />
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
