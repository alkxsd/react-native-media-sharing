import { Image } from 'react-native'
import React from 'react'
import images from '@/constants/Images'

type Props = {}

const ImageLogo = ({...rest}: Props) => {
  return (
    <>
        <Image
          source={images.logo}
          className="w-[258px] h-[86px]"
          resizeMode="contain"
          {...rest}
        />
    </>
  )
}

export default ImageLogo