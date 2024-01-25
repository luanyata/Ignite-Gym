import { ComponentProps } from 'react'
import { Image } from '@gluestack-ui/themed'

type Props = ComponentProps<typeof Image>

export const UserPhoto = ({ ...rest }: Props) => {
  return (
    <Image
      w="$16"
      h="$16"
      rounded="$full"
      borderWidth="$2"
      borderColor="$gray400"
      alt="Imagem do usuário"
      {...rest}
    />
  )
}
