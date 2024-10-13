import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({handlePress, title,textStyle, containerStyle, isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={`justify-center items-center rounded-xl min-h-[62px] bg-secondary ${containerStyle}
    ${isLoading ? "opacity-50" : ""}`}
    disabled ={isLoading }>
      <Text className={`${textStyle} text-lg text-center font-[sans-serif] font-[800]`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton