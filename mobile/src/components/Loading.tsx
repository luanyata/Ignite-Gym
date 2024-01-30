import { Center, Spinner } from '@gluestack-ui/themed'

export const Loading = () => {
  return (
    <Center flex={1} bgColor="$gray700">
      <Spinner />
    </Center>
  )
}
