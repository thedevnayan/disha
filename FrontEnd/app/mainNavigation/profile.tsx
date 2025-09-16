import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSession } from "../_layout";


const windowWidth = Dimensions.get('window').width;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { signOut, userProfile, setUserProfile } = useSession();

  const handleRetakeAssessment = () => {
    if (userProfile) {
      setUserProfile({ ...userProfile, isAssessmentComplete: false });
    }
    router.navigate("/assesment");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8ai9dqCugWabTJeVAbkyL_DKyYL1UagACHQzEEuCgy-LC3f145oKr4kQ9WWXwAoi0rjkqXPC78sG5BIJjYWKqmTr8YSdYdSYtnlXEPBCAsiUDHnnh_XWtk4tMAbL9bWy40cOxfRlV5eGoZr9LHRjC_zTGhWMSHP5sFFtRJfloLmvIiMqEiaxJH0ncWC4B2AzRSJuTYUgCMLoAN2iw4lKlC0TQ7S3bvAfZ_b0EONRGD91jqqE7ItpyyujL9IETDqRw4geBRJP6ss4',
              }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userProfile?.fullName ?? "User"}</Text>
              <Text style={styles.userSubtitle}>
                {userProfile?.currentClass ? `Class ${userProfile.currentClass}` : ""}
                {userProfile?.selectedState ? `, ${userProfile.selectedState}` : ""}
                {userProfile?.selectedDistrict ? `, ${userProfile.selectedDistrict}` : ""}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>Career Assessment</Text>
                <Text style={styles.cardSubtitle}>
                  Your top recommendation is{' '}
                  <Text style={styles.highlightText}>
                    {userProfile?.bestStreams && userProfile.bestStreams.length > 0
                      ? userProfile.bestStreams[0].stream
                      : "—"}
                  </Text>.
                </Text>
              </View>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="share" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>View Full Report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={handleRetakeAssessment}>
                <Text style={styles.secondaryButtonText}>Retake Test</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Items</Text>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <MaterialIcons name="school" size={24} color="#64748b" />
                <Text style={styles.menuItemText}>Saved Colleges</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <MaterialIcons name="download" size={24} color="#64748b" />
                <Text style={styles.menuItemText}>Downloaded Materials</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <MaterialIcons name="notifications" size={24} color="#64748b" />
                <Text style={styles.menuItemText}>Notifications</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <MaterialIcons name="language" size={24} color="#64748b" />
                <Text style={styles.menuItemText}>Language</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <MaterialIcons name="help" size={24} color="#64748b" />
                <Text style={styles.menuItemText}>Help &amp; Support</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <MaterialIcons name="privacy-tip" size={24} color="#64748b" />
                <Text style={styles.menuItemText}>Privacy Policy</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={signOut}>
              <View style={styles.menuItemContent}>
                <MaterialIcons name="logout" size={24} color="#ef4444" />
                <Text style={styles.logoutText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollViewContent: {
    paddingBottom: 100, // Add padding for the footer
  },
  header: {
    padding: 16,
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  userSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  mainContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#475569',
  },
  highlightText: {
    fontWeight: '600',
    color: '#1e293b',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 16,
  },
  primaryButton: {
    flex: 1,
    minWidth: 84,
    maxWidth: 480,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    minWidth: 84,
    maxWidth: 480,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1e293b',
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    paddingBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 8,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    color: '#1e293b',
    fontWeight: '500',
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: '500',
  },
});