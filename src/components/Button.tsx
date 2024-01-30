import {
  ButtonSpinner,
  ButtonText,
  Button as GlueButton,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<typeof GlueButton> & {
  title: string
  isLoading?: boolean
}

export const Button = ({
  title,
  variant,
  isLoading,
  onPress,
  ...rest
}: ButtonProps) => {
  return (
    <GlueButton
      w="$full"
      h="$14"
      rounded="$sm"
      onPress={onPress}
      bg={variant === 'outline' ? 'transparent' : '$green700'}
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderColor={variant === 'outline' ? '$green700' : '$transparent'}
      $active-bg={variant === 'outline' ? '$gray500' : '$green500'}
      variant={variant}
      disabled={isLoading}
      {...rest}
    >
      {isLoading && <ButtonSpinner mr="$1" />}

      <ButtonText
        color={variant === 'outline' ? '$green500' : '$white'}
        fontFamily="$heading"
        fontSize="$sm"
      >
        {title}
      </ButtonText>
    </GlueButton>
  )
}
