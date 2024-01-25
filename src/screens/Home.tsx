import { useState } from 'react'
import { FlatList, HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { useNavigation } from '@react-navigation/native'
import { HomeHeader } from '../components/HomeHeader'
import { Group } from '../components/Group'
import { ExerciseCard } from '../components/ExerciseCard'

export const Home = () => {
  const [groups, setGroups] = useState<string[]>([
    'Costas',
    'Bíceps',
    'Tríceps',
    'ombro',
  ])
  const [exercises, setExercises] = useState<string[]>([
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'Levantamento terras',
  ])
  const [groupSelected, setGroupSelected] = useState('Costas')

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const handleOpenExerciseDetails = () => {
    navigation.navigate('exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item: string) => item}
        renderItem={({ item }: { item: string }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack px="$8">
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="$gray200" fontSize="$md">
            Exercícios
          </Heading>

          <Text color="$gray200" fontSize="$sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item: string) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </VStack>
    </VStack>
  )
}
