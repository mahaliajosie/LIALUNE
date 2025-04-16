// =====================================================
// ================ Routine Edit Screen ================
// =====================================================
// - Manages and groups Routine Items & Rows components 
// - Passes prompts back to components
// - Navigation between components
// -----------------------------------------------------

import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Switch } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DraggableFlatList from 'react-native-draggable-flatlist';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

// ---------- Components ----------
import RoutineRows from '../components/RoutineRows';
import RoutineItems from '../components/RoutineItems';
// import routineData from '../data/routineData';

// Intial test data, will be replaced by routineData.js 
const testData = [
    { id: '1', title: 'Oil Cleanse', brands: 'Haruharu', image: 'https://i0.wp.com/mikrokosmos.hr/wp-content/uploads/2024/10/Dizajn_bez_naslova__2_s-removebg-preview.png?fit=500%2C500&ssl=1', step: 1 }, 
    { id: '2', title: 'Hydrating Cleanse', brands: 'Haruharu', image: 'https://i0.wp.com/mikrokosmos.hr/wp-content/uploads/2024/10/13-1.png?fit=500%2C500&ssl=1', step: 2 }, 
    { id: '3', title: 'Toner', brands: 'Anua', image: 'https://asianbeautyessentials.com/cdn/shop/files/ANUA77TONER1_5fc7ec57-1447-4883-b0ce-70905ea60573_1024x.png?v=1740704275', step: 3 }, 
]

// ---------- Routine Edit Function ----------
export default function RoutineEdit({ route }) {
  const { category } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [dailyMode, setDailyMode] = useState(false);
//   const [selectedDay, setSelectedDay] = useState('MON');
  const [selectedDay, setSelectedDay] = useState(0); // Monday = 0
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

  const handleToggleDaily = () => {
    setDailyMode(prev => !prev);
    if (!dailyMode) {
      setSelectedDay('MON');
    }
  };

  const handleDragEnd = ({ data }) => {
    const updated = data.map((item, index) => ({
      ...item,
      step: index + 1
    }));
    setRoutine(updated);
  };

  return (
    <View style={styles.container}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color={colors.lightCream} />
        <Text style={styles.title}>{category}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ---------- Search Bar ---------- */}
      <View style={styles.searchBox}>
        <Ionicons name="add-circle" size={24} color="#70C1FF" />
        <TextInput
          placeholder="+ add"
          placeholderTextColor="#70C1FF"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* ---------- Daily Toggle ---------- */}
      <View style={styles.toggleWrapper}>
        <Switch value={dailyMode} onValueChange={handleToggleDaily} thumbColor="#70C1FF" />
        <Text style={styles.toggleLabel}>daily</Text>
      </View>

      {/* ---------- Day Selector ---------- */}
      {dailyMode && (
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
      )}

      {/* Routine Steps */}
      <ScrollView>
        <DraggableFlatList
          data={routine}
          onDragEnd={handleDragEnd}
          keyExtractor={(item) => item.id}
          renderItem={({ item, drag }) => (
            <View style={styles.stepRow}>
              <Text style={styles.stepText}>Step {item.step}:</Text>
              <Text style={styles.stepLabel}>{item.label}</Text>
              <Pressable onLongPress={drag} style={styles.dragIcon}>
                <Ionicons name="menu-outline" size={20} color="#70C1FF" />
              </Pressable>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F4FF',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#70C1FF',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Italiana_400Regular',
    color: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 18,
    color: '#70C1FF',
    flex: 1,
  },
  toggleWrapper: {
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toggleLabel: {
    fontSize: 18,
    marginLeft: 10,
    color: '#70C1FF',
    fontWeight: 'bold',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayText: {
    fontSize: 16,
    color: '#125DAB',
    paddingHorizontal: 6,
  },
  selectedDay: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#125DAB',
    marginRight: 5,
  },
  stepLabel: {
    fontSize: 16,
    color: '#125DAB',
    flex: 1,
  },
  dragIcon: {
    paddingHorizontal: 8,
  },
});