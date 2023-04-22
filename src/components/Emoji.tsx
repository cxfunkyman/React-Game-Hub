import React from 'react'
import bullsEye  from '../assets/Emojis/bulls-eye.webp';
import  meh from '../assets/Emojis/meh.webp';
import  thumbsUp from '../assets/Emojis/thumbs-up.webp';
import { Image, ImageProps } from '@chakra-ui/react';
interface Props {
    rating: number;
}
const Emoji = ({ rating }: Props) => {

    if (rating < 3) return null;

    const emojiMap: { [key: number]: ImageProps } = {
        3: { src: meh , alt: 'Good', boxSize: '25px'},
        4: { src: thumbsUp , alt: 'Recommended', boxSize: '25px'},
        5: { src: bullsEye , alt: 'Exceptional', boxSize: '30px'}
    }

  return (
    <Image { ...emojiMap[rating] } marginTop={2}/>
  )
}

export default Emoji