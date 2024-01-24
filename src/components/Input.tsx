import { Input as GlueInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type InputProps = {
  placeholder: string
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  secureTextEntry?: boolean
} & ComponentProps<typeof GlueInput>

export const Input = ({
  placeholder,
  autoCapitalize,
  keyboardType,
  secureTextEntry,
  ...rest
}: InputProps) => {
  return (
    <GlueInput
      bg="$gray700"
      h="$14"
      px="$4"
      borderWidth="$0"
      mb="$4"
      $focus={{
        backgroundColor: '$gray700',
        borderWidth: '$1',
        borderColor: '$green500',
      }}
      {...rest}
    >
      <InputField
        fontSize="$md"
        color="$white"
        fontFamily="$body"
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </GlueInput>
  )
}
