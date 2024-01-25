import { ComponentProps } from 'react'
import { Image } from '@gluestack-ui/themed'

type Props = ComponentProps<typeof Image>

export const UserPhoto = ({ size, alt, ...rest }: Props) => {
  return (
    <Image
      size={size}
      rounded="$full"
      borderWidth="$2"
      borderColor="$gray400"
      alt={alt}
      {...rest}
    />
  )
}
