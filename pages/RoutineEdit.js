// =====================================================
// ================ Routine Edit Screen ================
// =====================================================
// - Manages and groups Routine Items & Rows components 
// - Passes prompts back to components
// - Navigation between components
// -----------------------------------------------------

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

// ---------- Components ----------
import RoutineRow from '../components/RoutineRow';
import RoutineItem from '../components/RoutineItem';
// import routineData from '../data/routineData';

// * Intial test data, will be replaced by routineData.js 
const testData = [
    { id: '1', title: 'Oil Cleanse', brands: 'Haruharu', image: 'https://i0.wp.com/mikrokosmos.hr/wp-content/uploads/2024/10/Dizajn_bez_naslova__2_s-removebg-preview.png?fit=500%2C500&ssl=1', step: 1 }, 
    { id: '2', title: 'Hydrating Cleanse', brands: 'Haruharu', image: 'https://i0.wp.com/mikrokosmos.hr/wp-content/uploads/2024/10/13-1.png?fit=500%2C500&ssl=1', step: 2 }, 
    { id: '3', title: 'Toner', brands: 'Anua', image: 'https://asianbeautyessentials.com/cdn/shop/files/ANUA77TONER1_5fc7ec57-1447-4883-b0ce-70905ea60573_1024x.png?v=1740704275', step: 3 }, 
]

// ---------- Routine Edit Function ----------
export default function RoutineEdit({ route }) {
  const { category } = route.params;                    // * Retrieves the selected category from navigation (Hair, Face, etc.)
  const [search, setSearch] = useState('');             // * Holds value in search bar
  const [dailyMode, setDailyMode] = useState(false);    // * True = one routine for all days, False = unique routines for each day
  const [selectedDay, setSelectedDay] = useState(0);    // * Monday = 0, & Sunday = 6

  const [routine, setRoutine] = useState({
    MON: [...testData],
    TUES: [],
    WED: [],
    THR: [],
    FRI: [],
    SAT: [],
    SUN: [],
  });
  
  // * Converts selectedDay number into string equivalent
  const dayKey = ['MON', 'TUES', 'WED', 'THR', 'FRI', 'SAT', 'SUN'][selectedDay];

  // ---------- Reorder Routine Steps ----------
  const handleReorder = (data) => {
    const updated = data.map((item, index) => ({
      ...item,
      step: index + 1,
    }));
    setRoutine(prev => ({
      ...prev,
      [dayKey]: updated,
    }));
  };

  return (
    <View style={styles.container}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={45} color={colors.lightCream} />
        <Text style={styles.title}>{category}</Text>
        <View style={{ width: 24 }} /> {/* Spacing on right of Category for symmentry */}
      </View>

      {/* ---------- Search Bar & Daily Toggle ---------- */}
      <RoutineRow
        search={search}
        setSearch={setSearch}
        dailyMode={dailyMode}
        toggleDailyMode={() => setDailyMode(prev => !prev)}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      {/* ---------- Routine Steps ---------- */}
        <DraggableFlatList
          // * Step List & allows for Drag & Drop
          data={routine [dayKey]}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => handleReorder(data)}
          
          // * Handle each item & drag between steps
          renderItem={({ item, drag, isActive, index }) => (
            <RoutineItem item={item} drag={drag} isActive={isActive} index={index} />
          )}
          
          // * Spacing so last item is not cut off at the bottom
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }} 
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightCream,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.mainLialune,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  title: {
    fontSize: 64,
    fontFamily: fonts.title,
    color: colors.lightCream,
  },
});