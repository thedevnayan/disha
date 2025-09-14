// app/mainNavigation/timeline.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Mock data shaped like the screenshot
type TimelineItem = {
  id: string;
  type: 'College Admission' | 'Scholarship';
  title: string;
  description: string;
  status: 'Ongoing' | 'Closed' | 'DaysLeft';
  daysLeft?: number;
  deadlineLabel: string;
  ctaLabel: string;
  category: 'Scholarships' | 'Admissions';
  icon: any; // require(...)
  iconBg: string;
};

const DATA: TimelineItem[] = [
  {
    id: '1',
    type: 'College Admission',
    title: 'JKCET Engineering Admissions',
    description:
      'Jammu and Kashmir Board of Professional Entrance Examinations (JKBOPEE) has started the application process for the Common Entrance Test (CET) for engineering courses.',
    status: 'DaysLeft',
    daysLeft: 2,
    deadlineLabel: 'Last Date: 25th May 2025',
    ctaLabel: 'View Details',
    category: 'Admissions',
    icon: require('@/assets/images/timeline/graduateCap.png'),
    iconBg: '#E8F0FF',
  },
  {
    id: '2',
    type: 'Scholarship',
    title: 'AICTE Pragati Scholarship',
    description:
      'Scholarship for girl students pursuing technical education. Aims to provide financial assistance and support to meritorious girl students.',
    status: 'Ongoing',
    deadlineLabel: 'Deadline: 31st May 2025',
    ctaLabel: 'Apply Now',
    category: 'Scholarships',
    icon: require('@/assets/images/timeline/money.png'),
    iconBg: '#FFF7E6',
  },
  {
    id: '3',
    type: 'College Admission',
    title: 'University of Jammu Admissions',
    description:
      'Admission process for various undergraduate and postgraduate courses for the academic session 2024-25 has ended.',
    status: 'Closed',
    deadlineLabel: 'Last Date: 15th May 2025',
    ctaLabel: 'View Details',
    category: 'Admissions',
    icon: require('@/assets/images/timeline/graduateCap.png'),
    iconBg: '#E8F0FF',
  },
];

const CATEGORIES = ['All', 'Scholarships', 'Admissions'] as const;
type Category = (typeof CATEGORIES)[number];

export default function Timeline() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const filtered = useMemo(() => {
    return DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const renderChip = ({ item }: { item: Category }) => {
    const selected = selectedCategory === item;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item)}
        activeOpacity={1}
        style={[styles.chip, selected && styles.chipSelected]}
      >
        <Text style={[styles.chipText, selected && styles.chipTextSelected]} numberOfLines={1}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const StatusPill = ({ it }: { it: TimelineItem }) => {
    if (it.status === 'DaysLeft') {
      return <Text style={[styles.pill, styles.pillDays]}>{it.daysLeft} days left</Text>;
    }
    if (it.status === 'Ongoing') {
      return <Text style={[styles.pill, styles.pillOngoing]}>Ongoing</Text>;
    }
    return <Text style={[styles.pill, styles.pillClosed]}>Closed</Text>;
  };

  const Card = ({ it }: { it: TimelineItem }) => (
    <View style={styles.card}>
      {/* Top meta row */}
      <View style={styles.metaRow}>
        <View style={styles.metaLeft}>
          <View style={[styles.iconWrap, { backgroundColor: it.iconBg }]}>
            <Image source={it.icon} style={styles.iconImage} />
          </View>
          <Text style={styles.metaType}>{it.type}</Text>
        </View>
        <StatusPill it={it} />
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={2}>
        {it.title}
      </Text>

      {/* Description */}
      <Text style={styles.description} numberOfLines={3}>
        {it.description}
      </Text>

      {/* Footer row */}
      <View style={styles.footerRow}>
        <Text style={styles.deadline}>{it.deadlineLabel}</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.cta}>{it.ctaLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#F7F8FA'}}>
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {!isSearchVisible ? (
          <>
            <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="arrow-back-outline" size={24} color="#111827" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Timeline</Text>

            <TouchableOpacity onPress={() => setIsSearchVisible(true)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="search-outline" size={22} color="#111827" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.searchBarExpanded}>
              <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={18} color="#9CA3AF" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  placeholderTextColor="#9CA3AF"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsSearchVisible(false);
                setSearchQuery('');
              }}
            >
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Chips */}
      <FlatList
        data={[...CATEGORIES]}
        horizontal
        renderItem={renderChip}
        keyExtractor={(x) => x}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipList}
      />

      {/* Cards */}
      <FlatList
        data={filtered}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => <Card it={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found</Text>
        }
      />
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 0, backgroundColor: '#F7F8FA', height: "auto" },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#111827' },

  // Search
  searchBarExpanded: { flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    flex: 1,
    height: 40,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#111827' },
  cancelButton: { marginLeft: 10, color: '#007AFF', fontSize: 16 },

  // Chips
  chipList: { paddingHorizontal: 12,  paddingTop: 12, paddingBottom: 8 },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: "center",
    height: 42
  },
  chipSelected: { backgroundColor: '#111827' },
  chipText: { color: '#111827', fontWeight: '700' },
  chipTextSelected: { color: '#FFFFFF' },

  // List
  list: { paddingHorizontal: 12, paddingBottom: 20 },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFF1F4',
    // depth
    elevation: 2, // Android
    shadowColor: '#000', // iOS
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  metaLeft: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  iconImage: { width: 20, height: 20, resizeMode: 'contain' },
  metaType: { color: '#6B7280', fontSize: 12, fontWeight: '700' },

  // Status pill
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '700',
  },
  pillOngoing: { color: '#059669', backgroundColor: '#E6F9F0' },
  pillClosed: { color: '#DC2626', backgroundColor: '#FEE2E2' },
  pillDays: { color: '#6B7280', backgroundColor: '#F3F4F6' },

  // Title / Description
  title: { marginTop: 8, fontSize: 16, fontWeight: '800', color: '#0F172A' },
  description: { marginTop: 6, color: '#6B7280', lineHeight: 18 },

  // Footer
  footerRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  deadline: { color: '#6B7280', fontWeight: '600' },
  cta: { color: '#2563EB', fontWeight: '800' },

  emptyText: { textAlign: 'center', color: '#6B7280', paddingTop: 16 },
});
