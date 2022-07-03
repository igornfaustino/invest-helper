import { Button, Flex, FormControl, FormLabel, Input, theme } from "@chakra-ui/react"
import { UseFormRegister } from "react-hook-form"

type Props = {
  register: UseFormRegister<any>
  onRemove: () => void
  name: string
}

const StockInput = ({ register, name, onRemove }: Props) => {
  return (
    <>
      <Flex
        gap="8px"
        alignItems="flex-end"
        justifyContent="center"
        padding="20px 30px"
        bgColor={theme.colors.gray[100]}
      >
        <FormControl w="auto">
          <FormLabel>Ativo</FormLabel>
          <Input bgColor={theme.colors.white} {...register(`${name}.name`)} />
        </FormControl>
        <FormControl w="auto">
          <FormLabel>Valor atual</FormLabel>
          <Input bgColor={theme.colors.white} {...register(`${name}.total`)} />
        </FormControl>
        <FormControl w="auto">
          <FormLabel>Valor por ativo</FormLabel>
          <Input bgColor={theme.colors.white} {...register(`${name}.price`)} />
        </FormControl>
        <FormControl w="auto">
          <FormLabel>Porcentagem esperada</FormLabel>
          <Input
            bgColor={theme.colors.white}
            {...register(`${name}.percentage`)}
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
