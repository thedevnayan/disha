import { StyleSheet, Text, Image, View, ImageSourcePropType } from 'react-native'
import React from 'react'

interface ImgFeatureCardProps {
  img: ImageSourcePropType
  title: string
  desc: string
}

const ImgFeatureCard = ({ img, title, desc }: ImgFeatureCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={img} style={styles.cardImg} />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.cardDesc} numberOfLines={2} ellipsizeMode="tail">
          {desc}
        </Text>
      </View>
    </View>
  )
}

export default ImgFeatureCard

const styles = StyleSheet.create({
  card: {
    height: 114,
    width: 360,
    backgroundColor: '#FCFCF8FF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    padding: 17,
    borderRadius: 16,
    alignItems: 'center',        
  },
  cardImg: {
    width: 80,
    height: 80,
    marginRight: 18,               
    resizeMode: 'contain',
    borderRadius: 16
  },
  textContainer: {
    flex: 1,                       
  },
  cardTitle: {
    color: '#1C1C0D',
    fontSize: 16,
    fontWeight: '600',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  cardDesc: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '400',
    flexWrap: 'wrap',
  },
})
