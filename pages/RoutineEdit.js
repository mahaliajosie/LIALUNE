// =====================================================
// ================ Routine Edit Screen ================
// =====================================================
// - Manages and groups Routine Items & Rows components 
// - Passes prompts back to components
// - Navigation between components
// -----------------------------------------------------

// import React, { useState, useCallback } from 'react';
// import { View, Text, Pressable, StyleSheet, ScrollView, Switch } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

// ---------- Components ----------
import RoutineRow from '../components/RoutineRow';
import RoutineItem from '../components/RoutineItem';
// import routineData from '../data/routineData';

// Intial test data, will be replaced by routineData.js 
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
//   const [selectedDay, setSelectedDay] = useState('MON');
  const [selectedDay, setSelectedDay] = useState(0);    // * Monday = 0, & Sunday = 6
//   const [routine, setRoutine] = useState(routineData[category][selectedDay]);
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

//   const handleToggleDaily = () => {
//     setDailyMode(prev => !prev);
//     if (!dailyMode) {
//       setSelectedDay('MON');
//     }
//   };

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
        <Ionicons name="arrow-back" size={24} color={colors.lightCream} />
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

      {/* ---------- Search Bar ---------- */}
      {/* <View style={styles.searchBox}>
        <Ionicons name="add-circle" size={24} color="#70C1FF" />
        <TextInput
          placeholder="+ add"
          placeholderTextColor="#70C1FF"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View> */}

      {/* ---------- Daily Toggle ---------- */}
      {/* <View style={styles.toggleWrapper}>
        <Switch value={dailyMode} onValueChange={handleToggleDaily} thumbColor="#70C1FF" />
        <Text style={styles.toggleLabel}>daily</Text>
      </View> */}

      {/* ---------- Day Selector ---------- */}
      {/* {dailyMode && (
        <View style={styles.daysRow}>
          {['MON','TUES','WED','THR','FRI','SAT','SUN'].map(day => (
            <Pressable key={day} onPress={() => setSelectedDay(day)}>
              <Text style={[
                styles.dayText,
                selectedDay === day && styles.selectedDay
              ]}>
                {day}
              </Text>
            </Pressable>
          ))}
        </View>
      )} */}

      {/* Routine Steps */}
      <ScrollView>
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
        
          //   renderItem={({ item, drag }) => (
        //     <View style={styles.stepRow}>
        //       <Text style={styles.stepText}>Step {item.step}:</Text>
        //       <Text style={styles.stepLabel}>{item.label}</Text>
        //       <Pressable onLongPress={drag} style={styles.dragIcon}>
        //         <Ionicons name="menu-outline" size={20} color="#70C1FF" />
        //       </Pressable>
        //     </View>
        //   )}
        />
      </ScrollView>
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
//   searchBox: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     margin: 15,
//     borderRadius: 10,
//     padding: 10,
//     alignItems: 'center',
//   },
//   searchInput: {
//     marginLeft: 10,
//     fontSize: 18,
//     color: '#70C1FF',
//     flex: 1,
//   },
//   toggleWrapper: {
//     alignItems: 'center',
//     marginVertical: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   toggleLabel: {
//     fontSize: 18,
//     marginLeft: 10,
//     color: '#70C1FF',
//     fontWeight: 'bold',
//   },
//   daysRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   dayText: {
//     fontSize: 16,
//     color: '#125DAB',
//     paddingHorizontal: 6,
//   },
//   selectedDay: {
//     fontWeight: 'bold',
//     textDecorationLine: 'underline',
//   },
//   stepRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     marginHorizontal: 15,
//     backgroundColor: '#fff',
//     marginVertical: 5,
//     borderRadius: 10,
//   },
//   stepText: {
//     fontSize: 14,
//     color: '#125DAB',
//     marginRight: 5,
//   },
//   stepLabel: {
//     fontSize: 16,
//     color: '#125DAB',
//     flex: 1,
//   },
//   dragIcon: {
//     paddingHorizontal: 8,
//   },
});