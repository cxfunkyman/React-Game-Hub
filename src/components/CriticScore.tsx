import { Badge } from '@chakra-ui/react';
import React from 'react'

interface Props {
    score: number;
}

const CriticScore = ({ score }: Props) => {
    let color = score >= 90 ? 'green' : score >= 80 ? 'yellow' : score < 80 ? 'red'  : '';
  return (
    <Badge colorScheme={color} fontSize='14px' paddingX={2} borderRadius='5px'>
        { score }
    </Badge>
  )
}

export default CriticScore