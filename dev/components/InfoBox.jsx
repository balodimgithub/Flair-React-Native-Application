import { View, Text } from 'react-native'
import React from 'react'

const Infobox = ({title, subtitle, containerStyles, titleStyles}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-semibold ${titleStyles}`}>{title}</Text>
      <Text className="text-gray-100 text-sm text-center font-bold">{subtitle}</Text>
    </View>
  )
}

export default Infobox