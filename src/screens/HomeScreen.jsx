import React, { useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING, RADIUS, FONT } from '../constants/spacing';
import { MEDICINES } from '../data/medicines';
import MedicineCard from '../components/MedicineCard';
import AppButton from '../components/AppButton';
import ProgressCard from '../components/ProgressCard';
import NextReminderCard from '../components/NextReminderCard';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export default function HomeScreen({ navigation }) {
  const [medicines, setMedicines] = useState(MEDICINES);

  const takenCount = medicines.filter((m) => m.status === 'Taken').length;
  const nextPending = medicines.find((m) => m.status === 'Pending');

  const handleAddMedicine = (newMedicine) => {
    setMedicines((prev) => [...prev, newMedicine]);
  };

  const handleMarkTaken = (medicine) => {
    setMedicines((prev) =>
      prev.map((m) =>
        m.id === medicine.id ? { ...m, status: 'Taken' } : m
      )
    );
  };

  const renderItem = ({ item }) => (
    <MedicineCard
      medicine={item}
      onPress={() =>
        navigation.navigate('MedicineDetail', { medicineId: item.id, name: item.name })
      }
    />
  );

  const ListHeader = () => (
    <>
      <View style={styles.headerTop}>
        <Image
          source={require('../../assets/branding/medireminder-compact.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Pressable
          style={styles.settingsIcon}
          onPress={() => navigation.navigate('Settings')}
          hitSlop={8}
        >
          <Text style={styles.settingsText}>&#9881;</Text>
        </Pressable>
      </View>

      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>{greeting()},</Text>
        <Text style={styles.heading}>Stay on track today.</Text>
      </View>

      <ProgressCard takenCount={takenCount} totalCount={medicines.length} />

      {nextPending ? (
        <NextReminderCard
          medicine={nextPending}
          onMarkTaken={() => handleMarkTaken(nextPending)}
        />
      ) : null}

      <Text style={styles.sectionTitle}>TODAY'S MEDICINES</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        style={styles.list}
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No medicines yet. Add your first one!</Text>
          </View>
        }
      />
      <View style={styles.footer}>
        <AppButton
          title="+ Add Medicine"
          onPress={() => navigation.navigate('AddMedicine', { onAdd: handleAddMedicine })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  headerLogo: {
    width: 168,
    height: 112,
  },
  greetingSection: {
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: FONT.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  heading: {
    fontSize: FONT.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  settingsIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.md,
  },
  settingsText: {
    fontSize: FONT.xlarge,
    color: COLORS.textPrimary,
  },
  sectionTitle: {
    fontSize: FONT.medium,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyText: {
    fontSize: FONT.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.background,
  },
});
