import { View } from 'react-native'
import React from 'react'
import { Text } from '@gluestack-ui/themed'

type Props = {
  message: string
}

export const Toast = ({ message }: Props) => {
  return (
    <View>
      <Text color="$white">{message}</Text>
    </View>
  )
}
