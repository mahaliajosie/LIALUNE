// =====================================================
// ================ Routine Edit Screen ================
// =====================================================
// - Manages and groups Routine Items & Rows components 
// - Passes prompts back to components
// - Navigation between components
// -----------------------------------------------------

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Pressable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

// ---------- Components ----------
import RoutineRow from '../components/RoutineRow';
import RoutineItem from '../components/RoutineItem';
import productData from '../data/productData';


// * Intial test data, will be replaced by productData.js 
const testData = [
    { id: '1', title: 'Oil Cleanse', brands: 'Haruharu', image: 'https://i0.wp.com/mikrokosmos.hr/wp-content/uploads/2024/10/Dizajn_bez_naslova__2_s-removebg-preview.png?fit=500%2C500&ssl=1', step: 1 }, 
    { id: '2', title: 'Hydrating Cleanse', brands: 'Haruharu', image: 'https://i0.wp.com/mikrokosmos.hr/wp-content/uploads/2024/10/13-1.png?fit=500%2C500&ssl=1', step: 2 }, 
    { id: '3', title: 'Toner', brands: 'Anua', image: 'https://asianbeautyessentials.com/cdn/shop/files/ANUA77TONER1_5fc7ec57-1447-4883-b0ce-70905ea60573_1024x.png?v=1740704275', step: 3 }, 
]

// ---------- Routine Edit Function ----------
export default function RoutineEdit({ route }) {
  const category = route?.params?.category ?? 'Routine';  // * Retrieves the selected category from navigation (Hair, Face, etc.)
  const [search, setSearch] = useState('');               // * Holds value in search bar
  const [dailyMode, setDailyMode] = useState(false);      // * True = one routine for all days, False = unique routines for each day
  const [selectedDay, setSelectedDay] = useState(0);      // * Monday = 0, & Sunday = 6
  const navigation = useNavigation(); 

  const [routine, setRoutine] = useState({
    MON: [...productData],
    TUES: [],
    WED: [],
    THR: [],
    FRI: [],
    SAT: [],
    SUN: [],
  });
  
  // * Converts selectedDay number into string equivalent
  const dayKey = ['MON', 'TUES', 'WED', 'THR', 'FRI', 'SAT', 'SUN'][selectedDay];

  const calculateSteps = (data) => {
    return data.map((item, index) => ({
      ...item,
      step: index + 1, // 1-based numbering instead of 0-based
    }));
  };

  useEffect(() => {
    if (routine[dayKey] && routine[dayKey].length > 0) {
      const updated = calculateSteps(routine[dayKey]);
      setRoutine(prev => ({
        ...prev,
        [dayKey]: updated,
      }));
    }
  }, [routine[dayKey]]);

  // ---------- Reorder Routine Steps ----------
  const handleReorder = (data) => {
    const updated = calculateSteps(data);
    setRoutine((prev) => ({
      ...prev,
      [dayKey]: updated,
    }));
  };

  return (
    <View style={styles.container}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={58} color={colors.lightCream} />
        </Pressable>
        <Text style={styles.title}>{category}</Text>
        {/* <View style={{ width: 28 }} /> Spacing on right of Category for symmentry */}
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
            <RoutineItem 
              item={item} 
              drag={drag} 
              isActive={isActive} 
              index={index} 
            />
          )}

          // * Spacing so last item is not cut off at the bottom
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }} 
        />
        <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"  // or 'dark-content' depending on background
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightCream,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',          // Keeps everything centered vertically
    // justifyContent: 'center',      // Title remains centered
    backgroundColor: colors.mainLialune,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
    // position: 'relative',
  },
  backButton: {
    // position: 'absolute',
    // left: 12,
    // top: '50%',                   // Vertically center back arrow
    // transform: [{ translateY: -14 }],  // Adjust for icon size (28px / 2)
    marginRight: 16,
  },

  title: {
    fontSize: 24,
    fontFamily: fonts.heading,       // Your heading font
    color: colors.lightCream,
    // textAlign: 'center',
  },

  // header: {
  //   flexDirection: 'row',
  //   // width: '100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // position: 'absolute',
  //   backgroundColor: colors.mainLialune,
  //   paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 70,
  //   paddingHorizontal: 15,
  //   paddingBottom: 20,
  //   // top: 0,
  //   // zIndex: 10,
  // },
  // title: {
  //   fontSize: 64,
  //   fontFamily: fonts.heading,
  //   color: colors.lightCream,
  //   // alignItems: 'center',
  // },
  // titleContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // backButton: {
  //   position: 'absolute',
  //   // top: 80,
  //   left: 12,
  //   // right: 20,
  //   // zIndex: 2,
  // },
});