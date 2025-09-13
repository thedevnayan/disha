import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Sample data for career paths
const careerPaths = [
  { id: '1', title: 'Engineering', subtitle: 'B.Tech, M.Tech', salary: '₹5-12 LPA', image: require("@/assets/images/explore/engineering.png"), rating: '92%', category: 'Engineering' },
  { id: '2', title: 'Medicine', subtitle: 'MBBS, MD', salary: '₹8-25 LPA', image: require("@/assets/images/explore/medical.png"), rating: '88%', category: 'Medical' },
  { id: '3', title: 'Business Admin', subtitle: 'BBA, MBA', salary: '₹6-20 LPA', image: require("@/assets/images/explore/business-admin.png"), rating: '85%', category: 'Commerce' },
  { id: '4', title: 'Law', subtitle: 'LLB, LLM', salary: '₹4-15 LPA', image: require("@/assets/images/explore/Law.png"), rating: '82%', category: 'Law' },
  { id: '5', title: 'Teaching', subtitle: 'B.Ed, M.Ed', salary: '₹3-10 LPA', image: require("@/assets/images/explore/Law.png"), rating: '82%', category: 'Arts' },
  { id: '6', title: 'Architecture', subtitle: 'B.Arch, M.Arch', salary: '₹4-10 LPA', image: require("@/assets/images/explore/Arch.png"), rating: '78%', category: 'Science' },
  // Add more mock data as needed
];

const categories = [
  'All', 'Science', 'Commerce', 'Arts', 'Medical', 'Engineering', 'Law'
];

const explore = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const filteredCareerPaths = careerPaths.filter(path => {
    const matchesCategory = selectedCategory === 'All' || path.category === selectedCategory;
    const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.categoryButton, selectedCategory === item && styles.categoryButtonSelected]}
      onPress={() => setSelectedCategory(item)}
      activeOpacity={1}
    >
      <Text style={[styles.categoryText, selectedCategory === item && styles.categoryTextSelected]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  type CareerPath = {
    id: string;
    title: string;
    subtitle: string;
    salary: string;
    image: string;
    rating: string;
  };

  const renderCareerCard = ({ item }: { item: CareerPath }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageContainer}>
        <Image   source={typeof item.image === "string" ? { uri: item.image } : item.image} style={styles.cardImage} />
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#f9f506ff" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        <Text style={styles.cardSalary}>{item.salary}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {!isSearchVisible ? (
          <>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Explore Career Paths</Text>
            <TouchableOpacity onPress={() => setIsSearchVisible(true)}>
              <Ionicons name="search-outline" size={24} color="#000" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.searchBarExpanded}>
              <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#9ca3af" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  placeholderTextColor="#9ca3af"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus={true}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => {
              setIsSearchVisible(false);
              setSearchQuery('');
            }}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
      <FlatList
        data={filteredCareerPaths} // Now using the filtered data
        renderItem={renderCareerCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.cardRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  searchBarExpanded: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  cancelButton: {
    marginLeft: 10,
    color: '#007AFF',
    fontSize: 16,
  },
  categoryList: {
    marginVertical: 20,
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    marginRight: 10,
    height: 36,
  },
  categoryButtonSelected: {
    backgroundColor: '#f9f506ff',
  },
  categoryText: {
    fontWeight: '500',
    color: '#475569',
  },
  categoryTextSelected: {
    color: '#1c1c0d',
    fontWeight: '700',
  },
  cardList: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  cardRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: "contain"
  },
  ratingContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    color: '#fff',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c0d',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },
  cardSalary: {
    fontSize: 14,
    color: '#71717A',
  },
});

export default explore;
