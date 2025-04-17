// ============================================================
// ======================= Routine Rows =======================
// ============================================================
// - Responsible for row of options:
//    * Search Input, Daily Toggle & Day of the Week Selection
// ------------------------------------------------------------
// - Reusable option rows for:
// - search bar, toggle mode, & any row with icon & text
// - Renders the products: image, name, brand & step
// ------------------------------------------------------------
import React from 'react';
import { View, Text, TextInput, Switch, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import colors from '../constants/colors';
import fonts from '../constants/fonts';

export default function RoutineRow({
  search,
  setSearch,
  dailyMode,
  toggleDailyMode,
  selectedDay,
  setSelectedDay
}) {
  const days = ['MON', 'TUES', 'WED', 'THR', 'FRI', 'SAT', 'SUN'];

  const navigation = useNavigation(); 

  return (
    <View style={styles.wrapper}>
      {/* ------ Search ------ */}
      <Pressable onPress={() => navigation.navigate('ProductSearch')} style={styles.searchContainer}>
           <TextInput
            placeholder="+ add" // shown when nothing is typed
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={colors.mainLialune}
            // style={styles.searchInput}
            editable={false} // Prevents Keyboard from opening
            pointerEvents='none' // Allows Pressable to capture touch
          />
      </Pressable>

      {/* ------ Toggle ------ */}
      <View style={styles.toggleRow}>
        <Switch
          value={dailyMode}
          onValueChange={toggleDailyMode}
          trackColor={{ false: colors.inactiveBlue, true: colors.mainLialune }}
          thumbColor={colors.white} // white dot on toggle
        />
        <Text style={styles.toggleLabel}>daily</Text>
      </View>

      {/* ------ Days of Week ------ */}
      {dailyMode && (
        <View style={styles.daysRow}>
          {/* --- loops through the 7 days & creates a button for each --- */}
          {days.map((day, index) => ( 
            <Pressable key={day} onPress={() => setSelectedDay(index)}>
              <Text
                style={[
                  styles.dayText, // Displays Day name in base style
                  selectedDay === index && styles.activeDayText, // Active DAY style in bold
                ]}
              >
                {day}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    backgroundColor: colors.darkCream,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 60,
  },
  searchInput: {
    fontSize: 16,
    color: colors.primaryDeepBlue,      
    fontFamily: fonts.body,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    top: 8,
  },
  toggleLabel: {    // --- DAILY text ---
    fontSize: 20,
    fontFamily: fonts.subtext,
    color: colors.mainLialune,
    marginLeft: 8,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dayText: {
    fontSize: 18,
    fontFamily: fonts.title,
    color: colors.primaryDeepBlue,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  activeDayText: {
    fontFamily: fonts.title,
    textDecorationLine: 'underline',
    color: colors.mainLialune,
  },
});