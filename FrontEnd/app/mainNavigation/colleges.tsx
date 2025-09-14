import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Types ---
interface College {
  id: string;
  name: string;
  rating: number;
  reviews: string; // label-like
  courses: string; // comma-separated
  distance: number; // km
  image: string;
}

// --- Dummy Data for Colleges ---
const collegeData: College[] = [
  {
    id: '1',
    name: 'Government College for Women, Gandhi Nagar',
    rating: 4.5,
    reviews: '100+',
    courses: 'B.A., B.Sc., B.Com.',
    distance: 5,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=500&q=80',
  },
  {
    id: '2',
    name: 'Government Degree College, Kathua',
    rating: 4.2,
    reviews: '80+',
    courses: 'B.A., B.Sc., B.Com.',
    distance: 15,
    image: 'https://images.unsplash.com/photo-1607237138185-e894ee31b2af?w=500&q=80',
  },
  {
    id: '3',
    name: 'Government Degree College, Udhampur',
    rating: 4.0,
    reviews: '60+',
    courses: 'B.A., B.Sc., B.Com.',
    distance: 125,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937c73?w=500&q=80',
  },
];

const dropdownData = {
  streams: ['Science', 'Commerce', 'Arts', 'Engineering', 'Medical'],
  courses: ['B.Sc.', 'B.Com.', 'B.A.', 'B.Tech', 'MBBS', 'BCA'],
};

// Map course -> stream for stream-wise filtering
const courseToStream: Record<string, string> = {
  'B.Sc.': 'Science',
  'B.Com.': 'Commerce',
  'B.A.': 'Arts',
  'B.Tech': 'Engineering',
  'MBBS': 'Medical',
  'BCA': 'Science',
};

// --- Reusable College Card Component ---
const CollegeCard: React.FC<{ college: College }> = ({ college }) => (
  <View style={styles.cardContainer}>
    <View style={styles.cardContent}>
      <View style={styles.cardTextContainer}>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>
            {college.rating} • {college.reviews} reviews
          </Text>
        </View>
        <Text style={styles.collegeName}>{college.name}</Text>
        <Text style={styles.collegeInfo}>
          {college.courses} | {college.distance} km
        </Text>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
      <Image source={{ uri: college.image }} style={styles.cardImage} />
    </View>
  </View>
);

// --- Main App Component ---
export default function CollegeListScreen() {
  const [activeTab, setActiveTab] = useState<'Colleges' | 'Courses'>('Colleges');
  const [distance, setDistance] = useState(50);
  const [search, setSearch] = useState('');
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showStreamModal, setShowStreamModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);

  const parseCourses = (coursesStr: string) => coursesStr.split(',').map((s) => s.trim());

  // Filter courses shown in the Course modal based on selected stream
  const courseOptions = useMemo(() => {
    if (!selectedStream) return dropdownData.courses;
    return dropdownData.courses.filter((c) => courseToStream[c] === selectedStream);
  }, [selectedStream]);

  const filteredColleges = useMemo(() => {
    return collegeData.filter((college) => {
      const withinDistance = college.distance <= distance;
      const courses = parseCourses(college.courses);

      const matchesCourse = selectedCourse ? courses.includes(selectedCourse) : true;
      const matchesStream = selectedStream
        ? courses.some((c) => courseToStream[c] === selectedStream)
        : true;

      const matchesSearch = search
        ? college.name.toLowerCase().includes(search.toLowerCase())
        : true;

      return withinDistance && matchesCourse && matchesStream && matchesSearch;
    });
  }, [distance, selectedCourse, selectedStream, search]);

  const clearStream = () => setSelectedStream("");
  const clearCourse = () => setSelectedCourse("");
  const isCourseContext = activeTab === 'Courses';


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Stream Picker Modal */}
      <Modal
        visible={showStreamModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStreamModal(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setShowStreamModal(false)} />
        <View style={styles.modalSheet}>
          <Text style={styles.modalTitle}>Select Stream</Text>
          <FlatList
            data={dropdownData.streams}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedStream(item);
                  setShowStreamModal(false);
                  // If the selected course doesn't belong to the new stream, clear it
                  if (selectedCourse && courseToStream[selectedCourse] !== item) {
                    setSelectedCourse("");
                  }
                }}
                accessibilityRole="button"
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={{ padding: 12, color: '#666' }}>No streams</Text>}
          />
          {selectedStream && (
            <TouchableOpacity style={styles.clearBtn} onPress={clearStream} accessibilityRole="button">
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>

      {/* Course Picker Modal */}
      <Modal
        visible={showCourseModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCourseModal(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setShowCourseModal(false)} />
        <View style={styles.modalSheet}>
          <Text style={styles.modalTitle}>
            {selectedStream ? `Select Course (${selectedStream})` : 'Select Course'}
          </Text>
          <FlatList
            data={courseOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedCourse(item);
                  setShowCourseModal(false);
                }}
                accessibilityRole="button"
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={{ padding: 12, color: '#666' }}>
                No courses available for the selected stream
              </Text>
            }
          />
          {selectedCourse && (
            <TouchableOpacity style={styles.clearBtn} onPress={clearCourse} accessibilityRole="button">
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>

      {/* Main Content Area */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Colleges</Text>
        </View>
        <View style={styles.container}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              placeholder="Search for colleges"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              accessibilityRole="search"
            />
          </View>

          {/* Hero Banner */}
          <ImageBackground
            source={{
              uri:
                'https://images.unsplash.com/photo-1679756398608-29e265c14246?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.heroContainer}
            imageStyle={styles.heroImage}
          >
            <Text style={styles.heroTitle}>Jammu & Kashmir</Text>
            <Text style={styles.heroSubtitle}>Find colleges near you</Text>
          </ImageBackground>

          {/* Filter Section */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Filter</Text>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.tab, activeTab === 'Colleges' && styles.activeTab]}
                onPress={() => {
                  setActiveTab('Colleges');
                  setSelectedCourse(null);
                }}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === 'Colleges' }}
              >
                <Text style={[styles.tabText, activeTab === 'Colleges' && styles.activeTabText]}>
                  Colleges
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.tab, activeTab === 'Courses' && styles.activeTab]}
                onPress={() => setActiveTab('Courses')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === 'Courses' }}
              >
                <Text style={[styles.tabText, activeTab === 'Courses' && styles.activeTabText]}>
                  Courses
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dropdownContainer}>
              {/* Stream dropdown: always enabled */}
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowStreamModal(true)}
                accessibilityRole="button"
              >
                <Text style={styles.dropdownText}>
                  {selectedStream ? `Stream: ${selectedStream}` : 'Select Stream'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#555" />
              </TouchableOpacity>

              {/* Course dropdown: contextual gating */}

              <TouchableOpacity
                style={[
                  styles.dropdown,
                  !isCourseContext && styles.dropdownDimmed, // keep this LAST
                ]}
                disabled={!isCourseContext}
                onPress={() => {
                  if (!isCourseContext) return; // safety
                  setShowCourseModal(true);
                }}
                accessibilityState={{ disabled: !isCourseContext }}
              >
                <Text style={[styles.dropdownText, !isCourseContext && styles.dropdownTextDimmed]}>
                  {selectedCourse ? `Course: ${selectedCourse}` : 'Select Course'}
                </Text>
                <Ionicons name="chevron-down" size={20} color={isCourseContext ? '#555' : '#9CA3AF'} />
              </TouchableOpacity>
            </View>

            <Text style={styles.distanceLabel}>Distance (km): {Math.round(distance)}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={200}
              value={distance}
              onValueChange={setDistance}
              minimumTrackTintColor="#F9F506"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#F9F506"
            />
          </View>

          {/* Colleges List */}
          <View style={styles.collegesSection}>
            <Text style={styles.sectionTitle}>
              Colleges {filteredColleges.length > 0 ? `(${filteredColleges.length})` : ''}
            </Text>
            {filteredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
            {filteredColleges.length === 0 && (
              <Text style={{ color: '#666', marginTop: 8 }}>No colleges match the filters.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { backgroundColor: '#F8F9FA' },
  container: { paddingHorizontal: 16 },
    dropdownText: { color: '#333' },
  dropdownDimmed: { opacity: 0.45, backgroundColor: '#E5E7EB' },
  dropdownTextDimmed: { color: '#9CA3AF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
    backgroundColor: 'white',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEFF1',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 48, fontSize: 16 },
  heroContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  heroImage: { borderRadius: 16 },
  heroTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  heroSubtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  filterSection: { marginTop: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15 },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ECEFF1',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: { color: '#555', fontWeight: '500' },
  activeTabText: { color: '#0F172A' },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECEFF1',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
  },
  distanceLabel: {
    marginTop: 20,
    marginLeft: 5,
    color: '#555',
    fontWeight: '500',
  },
  slider: { width: '100%', height: 40, alignSelf: 'center' },
  collegesSection: { marginTop: 20 },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  cardTextContainer: { flex: 1, marginRight: 10 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  ratingText: { marginLeft: 5, fontSize: 12, color: '#666' },
  collegeName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  collegeInfo: { fontSize: 13, color: '#777', marginTop: 4 },
  detailsButton: {
    marginTop: 12,
    backgroundColor: '#F0F7FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  detailsButtonText: { color: '#0F172A', fontWeight: '600', fontSize: 13 },
  cardImage: { width: 100, height: 100, borderRadius: 12 },

  // Modal styles
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '60%',
  },
  modalTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  modalItemText: { fontSize: 15, color: '#0F172A' },
  clearBtn: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#F0F7FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  clearBtnText: { color: '#0F172A', fontWeight: '600' },
});
