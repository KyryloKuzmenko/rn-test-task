import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';

import Feeds from '../components/Feeds/Feeds';
import Profile from '../components/Profile/Profile';


export default function Home() {
  const [activeTab, setActiveTab] = useState<'Feeds' | 'Profile'>('Profile');

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Profile' && styles.activeTab]}
            onPress={() => setActiveTab('Profile')}
          >
            <Text style={styles.tabText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Feeds' && styles.activeTab]}
            onPress={() => setActiveTab('Feeds')}
          >
            <Text style={styles.tabText}>Feeds</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === 'Profile' && <Profile />}
          {activeTab === 'Feeds' && <Feeds />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, 
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
