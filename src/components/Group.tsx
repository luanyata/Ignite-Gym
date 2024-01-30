import { Pressable, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Pressable> & {
  name: string
  isActive: boolean
}

export const Group = ({ name, isActive, ...rest }: Props) => {
  return (
    <Pressable
      mr="$3"
      w="$24"
      h="$10"
      bg="$gray600"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      {...rest}
    >
      <Text
        color={isActive ? '$green500' : '$gray200'}
        textTransform="uppercase"
        fontSize="$xs"
        fontWeight="$bold"
      >
        {name}
      </Text>
    </Pressable>
  )
}
