import { Button, Flex, FormControl, FormLabel, Input, theme } from "@chakra-ui/react"
import { UseFormRegister } from "react-hook-form"

type Props = {
  register: UseFormRegister<any>
  onRemove: () => void
  name: string
  errors?: {
    name?: { message: string },
    price?: { message: string },
    percentage?: { message: string },
    total?: { message: string },
  }
}

const StockInput = ({ register, name, onRemove, errors }: Props) => {
  return (
    <>
      <Flex
        gap="8px"
        alignItems="flex-end"
        justifyContent="center"
        padding="20px 30px"
        bgColor={theme.colors.gray[100]}
      >
        <FormControl w="auto" isInvalid={!!errors?.name?.message}>
          <FormLabel>Ativo</FormLabel>
          <Input bgColor={theme.colors.white} {...register(`${name}.name`, {
            required: 'campo obrigatório'
          })} />
        </FormControl>
        <FormControl w="auto" isInvalid={!!errors?.total?.message}>
          <FormLabel>Valor atual</FormLabel>
          <Input bgColor={theme.colors.white} {...register(`${name}.total`, {
            required: 'campo obrigatório'
          })} />
        </FormControl>
        <FormControl w="auto" isInvalid={!!errors?.price?.message}>
          <FormLabel>Valor por ativo</FormLabel>
          <Input bgColor={theme.colors.white} {...register(`${name}.price`, {
            required: 'campo obrigatório'
          })} />
        </FormControl>
        <FormControl w="auto" isInvalid={!!errors?.percentage?.message}>
          <FormLabel>Porcentagem esperada</FormLabel>
          <Input
            bgColor={theme.colors.white}
            {...register(`${name}.percentage`, {
              required: 'campo obrigatório'
            })}
          />
        </FormControl>

        <Button
          type="button"
          onClick={onRemove}
          bgColor={theme.colors.red[500]}
          color={theme.colors.white}
          _hover={{
            bgColor: theme.colors.red[200],
          }}
        >
          Remover
        </Button>
      </Flex>
    </>
  );
}

export default StockInput
