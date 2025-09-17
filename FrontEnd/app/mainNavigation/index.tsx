import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../_layout';

const SCREEN_WIDTH = Dimensions.get('window').width;

const RecommendedStream = ({ title, image }:any) => (
  <View style={styles.recommendedItem}>
    <Image source={{ uri: image }} style={styles.recommendedImage} />
    <Text style={styles.recommendedText}>{title}</Text>
  </View>
);

const RecommendedCollege = ({ title, image }:any) => (
  <View style={styles.recommendedCollegeItem}>
    <Image source={{ uri: image }} style={styles.collegeImage} />
    <Text style={styles.recommendedText}>{title}</Text>
  </View>
);

const RecentActivity = ({ title, subtitle, icon, color }:any) => (
  <View style={styles.activityItem}>
    <View style={[styles.activityIconContainer, { backgroundColor: color }]}>
      <FontAwesome name={icon} size={24} color="#1C1C0D" />
    </View>
    <View style={styles.activityTextContainer}>
      <Text style={styles.activityTitle} numberOfLines={1}>{title}</Text>
      <Text style={styles.activitySubtitle} numberOfLines={2}>{subtitle}</Text>
    </View>
  </View>
);

export default function Home() {
  const { userProfile } = useSession();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8ai9dqCugWabTJeVAbkyL_DKyYL1UagACHQzEEuCgy-LC3f145oKr4kQ9WWXwAoi0rjkqXPC78sG5BIJjYWKqmTr8YSdYdSYtnlXEPBCAsiUDHnnh_XWtk4tMAbL9bWy40cOxfRlV5eGoZr9LHRjC_zTGhWMSHP5sFFtRJfloLmvIiMqEiaxJH0ncWC4B2AzRSJuTYUgCMLoAN2iw4lKlC0TQ7S3bvAfZ_b0EONRGD91jqqE7ItpyyujL9IETDqRw4geBRJP6ss4" }}
              style={styles.userImg}
            />
            <Text style={styles.name}>Hi, {userProfile?.fullName ?? "User"}</Text>
          </View>
          <View style={styles.headerRight}>
            <FontAwesome name="bell-o" size={24} color="#1C1C0D" />
          </View>
        </View>

        {/* Categories Grid */}
        <View style={styles.sectionPadding}>
          <View style={styles.gridContainer}>
            <TouchableOpacity onPress={() => router.push('/mainNavigation/explore')}>
            <View style={[styles.gridItem, { backgroundColor: '#FDE047' }]}>
              <FontAwesome name="briefcase" size={40} color="#B45309" />
              <Text style={[styles.gridTitle, { color: '#B45309' }]}>Career Guidance</Text>
            </View>
            </TouchableOpacity>
            <View style={[styles.gridItem, { backgroundColor: '#BFDBFE' }]}>
              <FontAwesome name="podcast" size={40} color="#1E40AF" />
              <Text style={[styles.gridTitle, { color: '#1E40AF' }]}>One on One Career Counciling</Text>
            </View>
            <View style={[styles.gridItem, { backgroundColor: '#D1FAE5' }]}>
              <FontAwesome name="book" size={40} color="#065F46" />
              <Text style={[styles.gridTitle, { color: '#065F46' }]}>E-Book Resourses</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/mainNavigation/colleges')}>
            <View style={[styles.gridItem, { backgroundColor: '#E9D5FF' }]}>
              <FontAwesome name="map-marker" size={40} color="#6B21A8" />
              <Text style={[styles.gridTitle, { color: '#6B21A8' }]}>Colleges Near Me</Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recommended Streams */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>Recommended Streams</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollView}>
          <RecommendedStream title="Engineering" image="https://lh3.googleusercontent.com/aida-public/AB6AXuBmpW6PiwyUlJnenvf5x4OGT7BNgSpIuFIwD6Y7fyoW_pd6HKS-LXS7g1yxja_NRaDHBoV5FLuYR3qn0a9nRDx_nEyZecaJ5pqLnI6M4RbyFKXiiWx_Wi-Kqg__yVfCfYLm1QlX_abcIqc9lqY7NBubrX8RCja1Ed4PN31Xum2cOTI3FtKYRDmiRxI-GZfnl3JFKLPI2if-HM8rLM4zq2e0dGISwn7gwW8GJAiWnVk3uRe7sCIPRi3e--BmvO6r50QNufQ_5e-FLj4" />
          <RecommendedStream title="Medical" image="https://lh3.googleusercontent.com/aida-public/AB6AXuCwD1w6yC-gKZu3tvoB4P37w5VpChk3nEU93XAj-_vgzUrHFUehLnpS4R9nGnz1tXV_6Hj5WtRRslDJyxyExrdj4pj3bd7-ZWs8T3Mkwp-KaYpB-eyhbwpjATAjERoNPu_X6MXtkLP1pZmPi6PXIf1Yqg5I4F-_LMRHuMj5QrXjWv7ZhY9nPsWnKc7RTXjMxRHY-oAHiSLRhQWCQlanTf3tq782rMWKg93o4UgadbsZ6CuTzQ9Ky3XStUVY1yKB4WcubRbqPsT3MKY" />
          <RecommendedStream title="Arts" image="https://lh3.googleusercontent.com/aida-public/AB6AXuAfLEDFU-DcY2xL0qjxbBqqnB5-SXYa_u2WoBPq6MO5djzgOPol9sDD4SiBLPcCfzRDpYPK5t8cDlGK3NxADHX9bCoI1fp0uffOsYd3KliShitJekr0CGe6UH9p8-rCD8MOf0PrZHbrBIKf3Xkuk2XIJrduY4D3sLKsqyShIVbgIub36oy8tLa7Rrqs6Vqio6bWhp7B4A_BOEZZo72SW5owOe0KdlGC5URKiqCMgYrDwdN5hWpn_OmiEbbOsusCHTT4oUx6vkwRLDs" />
        </ScrollView>

        {/* Recommended Colleges */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>Recommended Colleges</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollView}>
          <RecommendedCollege title="Government College for Women, Parade" image="https://lh3.googleusercontent.com/aida-public/AB6AXuCVyLE9KhuZsNE5uSUiSQft6lffvoNuE75Fb83eddXqvw6hrYHO7-F9cdeQBh3daCoxFfpH-8LD2-JqbJ6gz4tYQHBKAduccCiQA6bPDEr9UDKh9XXHNQ__L70BZ_jkMJVSIe8ZiZgoobJ3u-Qf2nnv8Jb7RrLzfHw_3AyQYvCYZQIOETD2DFr0Mq0g4C91hwBUdnx9ntSDxW2XJGVtR9DeP1yXNzcbUEIr0BEYktmFflOdVjGtYnXa_McpBbRPISZSoTWb80EzX7Q" />
          <RecommendedCollege title="Government College for Women, Gandhi Nagar" image="https://lh3.googleusercontent.com/aida-public/AB6AXuDoPk5u-rfg8Bf4xOD5T_I6Xr1yOPg6ys6m1buN7PBawfD5-Za_AznRhsJJbEDcyGnCvarlgeOxWko0MdMfuDmo7-U3BNfSBeKtBOGTpdfV7MzBEFPHF1fANfVprWe9HytgFOl80PDNuLp7gBzUpYTjFIPYs1QBPjNyftaMIyAWE__KKXwzX-KFWJkwYQ1XxF_e3rWrlKFfau6UpdD7IVFHkzxjh8mPFllnBA_eR7EoqIqW-DUqYtChoBCPsMax7W1j4gTxbUv1YJk" />
          <RecommendedCollege title="Government College for Women, Udhampur" image="https://lh3.googleusercontent.com/aida-public/AB6AXuBl_2v7gDz8R50bfNJIyTd-w_nLPsHL17Ba7y9_3nqabIoeGZYEZmI7Q9YeKpW4AM-nGNjjai2kwTmx-ZSxP9gSADNassNF5AXCmKTD8_YpmqAuB3Yhv1jKOwiuhgxtl-Hlv6ILblMRxr9bYscXwPuKKvjiXmd-BtDd4QcwSRFUK2LJVnPArrCIFRwODqaNZUjItV0qEny1MTCeGHGrRLgkVpiTrWQy3YSASxZf7etVkCnEtbFJiiPphsvjKHTKXqR7C5p3FSdZfFA" />
        </ScrollView>

        {/* Recent Activities */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
        </View>
        <View style={[styles.sectionPadding, { paddingTop: 0 }]}>
          <RecentActivity title="Engineering" subtitle="Career Guidance" icon="briefcase" color="#FEF3C7" />
          <RecentActivity title="Government College for Women, Parade" subtitle="College Finder" icon="graduation-cap" color="#DBEAFE" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    backgroundColor: '#F9FAFB',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 8,
    backgroundColor: '#F9FAFB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerRight: {
    justifyContent: 'flex-end',
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C0D',
  },
  sectionPadding: {
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  gridItem: {
    width: (SCREEN_WIDTH - 48) / 2,
    height: 150, // Fixed height for consistent look
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    padding: 16,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C0D',
  },
  horizontalScrollView: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 16,
  },
  recommendedItem: {
    width: 160,
    flexDirection: 'column',
    gap: 8,
  },
  recommendedImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  recommendedText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C0D',
  },
  recommendedCollegeItem: {
    width: 192,
    flexDirection: 'column',
    gap: 8,
  },
  collegeImage: {
    width: '100%',
    aspectRatio: 16 / 10,
    borderRadius: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 12,
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  activityTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C0D',
  },
  activitySubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
  },
});
