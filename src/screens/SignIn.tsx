import { Center, Heading, Text, VStack } from '@gluestack-ui/themed'
import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Image } from 'react-native'

export const SignIn = () => {
  return (
    <VStack flex={1} bg="$gray700" p="$10">
      <Image
        source={BackgroundImg}
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
        <Heading color="$gray100" fontSize="$xl" mb="$6" fontFamily="$heading">
          Acesse a conta
        </Heading>

        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input placeholder="Senha" secureTextEntry />
      </Center>
    </VStack>
  )
}
