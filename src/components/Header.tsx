import { Box, Heading, theme } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
  return (
    <Box
      padding="10px 20px"
      bgColor={theme.colors.green[700]}
    >
      <Heading size="lg" color={theme.colors.white}>
        INVEST HELPER
      </Heading>
    </Box>
  )
}

export default Header
