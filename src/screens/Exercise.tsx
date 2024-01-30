import { Button } from '@components/Button'
import { Toast } from '@components/Toast'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Feather } from '@expo/vector-icons'
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
  useToken,
} from '@gluestack-ui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

import BodySvg from '@assets/body.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import SeriesSvg from '@assets/series.svg'
import { Loading } from '@components/Loading'

type RouteParamsProps = {
  exerciseId: string
}

export const Exercise = () => {
  const [sendingRegister, setSendingRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()

  const red500 = useToken('colors', 'red500')
  const green500 = useToken('colors', 'green500')
  const toast = useToast()

  const { exerciseId } = route.params as RouteParamsProps

  const handleGoBack = () => {
    navigation.goBack()
  }

  const fetchExerciseDetails = async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/${exerciseId}`)

      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício'

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
    } finally {
      setIsLoading(false)
    }
  }

  const handleExerciseHistoryRegister = async () => {
    try {
      setSendingRegister(true)

      await api.post('/history', { exercise_id: exerciseId })

      toast.show({
        render: () => (
          <Toast message="Parabéns! Exercício registrado no seu histórico." />
        ),
        placement: 'top',
        containerStyle: {
          backgroundColor: green500,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 5,
        },
      })

      navigation.navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível registrar exercício.'

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
    } finally {
      setSendingRegister(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="$green500" size="lg" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt="$4"
          mb="$8"
          alignItems="center"
        >
          <Heading color="$gray100" fontSize="$lg" flexShrink={1}>
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="$gray200" ml="$1" textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p="$8">
            <Image
              w="$full"
              h="$80"
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
              }}
              alt="Nome do exercício"
              mb="$3"
              resizeMode="cover"
              rounded="$lg"
            />

            <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb="$6"
                mt="$5"
              >
                <HStack>
                  <SeriesSvg />

                  <Text color="$gray200" ml="$2">
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />

                  <Text color="$gray200" ml="$2">
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                isLoading={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}
