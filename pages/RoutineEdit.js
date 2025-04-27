// =====================================================
// ================ Routine Edit Screen ================
// =====================================================
// - Manages and groups Routine Items & Rows components 
// - Passes prompts back to components
// - Navigation between components
// -----------------------------------------------------
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, Pressable } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
// import { Pressable } from 'react-native-gesture-handler';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import colors from '@constants/colors';
import fonts from '@constants/fonts';
// ---------- Components ----------
import RoutineRow from '@components/RoutineRow';
import RoutineItem from '@components/RoutineItem';
import productData from '@data/productData';

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

  // ---------- Find Routine Steps ----------
  const calculateSteps = (data) => {
    return data.map((item, index) => ({
      ...item,
      step: index + 1, // 1-based numbering instead of 0-based
    }));
  };

  // ---------- Set Routine Steps ----------
  useEffect(() => {
    const currentData = routine[dayKey] || [];
    const toUpdate = currentData.some((item, index) => item.step !== index + 1);
  
    if (toUpdate) {
      const updated = calculateSteps(currentData);
      setRoutine(prev => ({
        ...prev,
        [dayKey]: updated,
      }));
    }
  }, [routine, dayKey]);

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
          <Text>
              <Ionicons name="chevron-back" size={58} color={colors.lightCream} />
            </Text>
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{category}</Text>
          {/* <View style={{ width: 28 }} /> Spacing on right of Category for symmentry */}
        </View>
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
    backgroundColor: colors.mainLialune,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 60,
    // flexDirection: 'row',
    alignItems: 'center',          // Centered vertically
    justifyContent: 'center',      // Title centered horizontally
    position: 'relative',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    // top: '50%',
    // transform: [{ translateY: -29 }],
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 72,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(45),
    fontFamily: fonts.heading,       
    color: colors.lightCream,
  },
});