import { Text, View } from '@gluestack-ui/themed'
import React from 'react'

type Props = {
  message: string
}

export const Toast = ({ message }: Props) => {
  return (
    <View py="$5">
      <Text color="$white">{message}</Text>
    </View>
  )
}
