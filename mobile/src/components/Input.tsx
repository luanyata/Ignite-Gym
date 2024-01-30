import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GlueInput,
  InputField,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type InputProps = ComponentProps<typeof InputField> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isDisabled?: boolean
}

export const Input = ({
  errorMessage = null,
  isInvalid,
  isDisabled,
  ...rest
}: InputProps) => {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb="$4" w="$full">
      <GlueInput
        bg="$gray600"
        h="$14"
        px="$4"
        borderWidth="$0"
        mb="$4"
        isInvalid={invalid}
        $invalid={{
          borderWidth: '$1',
          borderColor: '$red500',
        }}
        $focus={{
          borderWidth: '$1',
          borderColor: '$green500',
        }}
        isDisabled={isDisabled}
      >
        <InputField
          fontSize="$md"
          color="$white"
          fontFamily="$body"
          {...rest}
        />
      </GlueInput>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
