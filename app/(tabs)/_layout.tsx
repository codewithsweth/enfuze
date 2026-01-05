import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Home, Search, Megaphone, User, CircleDollarSign } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

function CreateCampaignButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.createButton}
      onPress={() => router.push('/campaign/select-template')}
    >
      <LinearGradient
        colors={['#10B981', '#059669']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.createButtonGradient}
      >
        <Megaphone color="#FFFFFF" size={28} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

function TabIcon({ Icon, size, color, focused }: { Icon: any; size: number; color: string; focused: boolean }) {
  return (
    <View style={[
      styles.tabIconContainer,
      focused && styles.tabIconContainerActive
    ]}>
      <Icon size={22} color={focused ? '#FFFFFF' : color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#D1D5DB',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          height: 90,
          paddingBottom: 12,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 6,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color, focused }) => (
            <TabIcon Icon={Home} size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color, focused }) => (
            <TabIcon Icon={Search} size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-campaign"
        options={{
          title: '',
          tabBarIcon: () => <CreateCampaignButton />,
          tabBarLabel: () => null,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="campaigns"
        options={{
          title: 'Coins',
          tabBarIcon: ({ size, color, focused }) => (
            <TabIcon Icon={CircleDollarSign} size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color, focused }) => (
            <TabIcon Icon={User} size={size} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  createButton: {
    position: 'absolute',
    top: -28,
    width: 64,
    height: 64,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1E2837',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainerActive: {
    backgroundColor: '#10B981',
  },
});
