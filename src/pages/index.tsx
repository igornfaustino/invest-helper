import { Box, Button, Flex, FormControl, FormLabel, Input, theme } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import VMasker from 'vanilla-masker'
import Header from '../components/Header'
import StockInput from '../components/StockInput'
import { money2number } from '../utils/money'


type Stock = {
  name: string,
  qtd: number,
  price: string,
  percentage: string
}

type FormValues = {
  stocks: Stock[],
  newValue: string
}

type Report = {
  name: string,
  operation: number
}

const Home: NextPage = () => {
  const [report, setReport] = useState<Report[]>([])
  const methods = useForm<FormValues>()
  const { control, handleSubmit, formState: { errors } } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stocks'
  })

  const addStock = () => {
    append({
      name: '',
      qtd: 0,
      price: '',
      percentage: ''
    })
  }

  const generateReport = ({ stocks, newValue }: FormValues) => {
    const stocksInfo = stocks.map(stock => ({
      qtd: stock.qtd,
      total: money2number(stock.price) * stock.qtd,
      price: money2number(stock.price),
      percentage: Number(VMasker.toPattern(stock.percentage, {
        pattern: '9.99'
      })),
      name: stock.name
    }))
    const total = money2number(newValue) + stocksInfo.reduce((total, stock) => total + stock.total, 0)
    const report = stocksInfo.map(stock => {
      const estimatedValue = total * stock.percentage
      const difference = estimatedValue - stock.total
      const numberOsStocksToNegotiate = Math.round(difference / stock.price)
      return {
        name: stock.name,
        operation: numberOsStocksToNegotiate
      }
    })
    setReport(report)
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <br />


      <FormProvider {...methods}>
        <Box as="main" padding={{ lg: "0px 17%", md: "0px 5px" }}>
          <Box as="form" margin="0 auto" onSubmit={handleSubmit(generateReport)}>
            <FormControl isInvalid={!!errors.newValue}>
              <FormLabel>Valor aportado</FormLabel>
              <Controller
                name="newValue"
                defaultValue={'0'}
                control={control}
                render={({ field }) => (
                  <Input {...field} value={VMasker.toMoney(field.value, { unit: 'R$' })} />
                )} />
            </FormControl>

            <br />
            <hr />
            <br />

            <Flex flexDirection="column" gap="16px">
              {fields.map((field, index) => (
                <StockInput
                  key={field.id}
                  name={`stocks.${index}`}
                  onRemove={() => remove(index)}
                  errors={errors.stocks?.[index] as any}
                />
              ))}
            </Flex>

            <br />

            <Flex gap="15px">
              <Button
                bgColor={theme.colors.blue[500]}
                color={theme.colors.white}
                type="button"
                onClick={addStock}
              >
                Adicionar
              </Button>
              <Button
                bgColor={theme.colors.green[500]}
                color={theme.colors.white}
                type="submit"
              >
                Calcular
              </Button>
            </Flex>
          </Box>

        </Box>
      </FormProvider>


      <br />
      <br />

      {report.map(({ name, operation }, index) => (
        <p key={index}><b>{name}</b>: {operation}</p>
      ))}
    </div >
  )
}

export default Home
