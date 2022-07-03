import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { UseFormRegister } from "react-hook-form"

type Props = {
  register: UseFormRegister<any>
  onRemove: () => void
  name: string
}

const StockInput = ({ register, name, onRemove }: Props) => {
  return (
    <>
      <FormControl  >
        <FormLabel>Ativo</FormLabel>
        <Input {...register(`${name}.name`)} />
      </FormControl>
      <FormControl  >
        <FormLabel>Valor atual</FormLabel>
        <Input {...register(`${name}.total`)} />
      </FormControl>
      <FormControl  >
        <FormLabel>Valor por ativo</FormLabel>
        <Input {...register(`${name}.price`)} />
      </FormControl>
      <FormControl  >
        <FormLabel>Porcentagem esperada</FormLabel>
        <Input {...register(`${name}.percentage`)} />
      </FormControl>

      <Button type="button" onClick={onRemove}>Remover</Button>
      <br />
      <hr />
      <br />
    </>
  )
}

export default StockInput
