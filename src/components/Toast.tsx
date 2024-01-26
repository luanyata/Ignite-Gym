import { View } from 'react-native'
import React from 'react'
import { useToast, Text, useToken } from '@gluestack-ui/themed'

type Props = {
  message: string
  type?: 'error' | 'success'
}

export const Toast = ({ message, type }: Props) => {
  const toast = useToast()

  const red500 = useToken('colors', 'red500')
  const green500 = useToken('colors', 'green500')

  return toast.show({
    render: () => (
      <View>
        <Text color="$white">{message}</Text>
      </View>
    ),
    placement: 'top',
    containerStyle: {
      backgroundColor: type === 'error' ? red500 : green500,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
    },
  })
}
