import { Button, Flex, FormControl, FormLabel, Input, theme } from "@chakra-ui/react"
import { Controller } from "react-hook-form"
import VMasker from 'vanilla-masker'

type Props = {
  control: any
  onRemove: () => void
  name: string
  errors?: {
    name?: { message: string },
    price?: { message: string },
    percentage?: { message: string },
    total?: { message: string },
  }
}

const StockInput = ({ control, name, onRemove, errors }: Props) => {
  return (
    <>
      <Flex
        gap="8px"
        alignItems={{ base: "center", md: "flex-end" }}
        justifyContent="center"
        flexDirection={{ base: "column", sm: "row" }}
        padding="20px 30px"
        bgColor={theme.colors.gray[100]}
      >
        <FormControl w="auto" isInvalid={!!errors?.name?.message}>
          <FormLabel>Ativo</FormLabel>
          <Controller
            name={`${name}.name`}
            rules={{
              required: 'campo obrigatório'
            }}
            control={control}
            render={({ field }) => (
              <Input
                bgColor={theme.colors.white}
                {...field} />
            )}
          />
        </FormControl>
        <FormControl w="auto" isInvalid={!!errors?.total?.message}>
          <FormLabel>Valor atual</FormLabel>
          <Controller
            name={`${name}.total`}
            rules={{
              required: 'campo obrigatório'
            }}
            control={control}
            render={({ field }) => (
              <Input
                bgColor={theme.colors.white}
                {...field} value={VMasker.toMoney(field.value, { unit: 'R$' })} />
            )}
          />
        </FormControl>
        <FormControl w="auto" isInvalid={!!errors?.price?.message}>
          <FormLabel>Valor por ativo</FormLabel>
          <Controller
            name={`${name}.price`}
            rules={{
              required: 'campo obrigatório'
            }}
            control={control}
            render={({ field }) => (
              <Input
                bgColor={theme.colors.white}
                {...field} value={VMasker.toMoney(field.value, { unit: 'R$' })} />
            )}
          />
        </FormControl>
        <FormControl w="auto" isInvalid={!!errors?.percentage?.message}>
          <FormLabel>Porcentagem esperada</FormLabel>
          <Controller
            name={`${name}.percentage`}
            rules={{
              required: 'campo obrigatório'
            }}
            control={control}
            render={({ field }) => (
              <Input
                bgColor={theme.colors.white}
                {...field}
                value={VMasker.toPattern(field.value, {
                  pattern: '9.99'
                })} />
            )}
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
