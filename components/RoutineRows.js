// ======================================================
// ==================== Routine Rows ====================
// ======================================================
// - Reusable option rows for:
// - search bar, toggle mode, & any row with icon & text
// - Renders the products: image, name, brand & step
// ------------------------------------------------------
import React from 'react';
import { View, TextInput, Text, Pressable, Switch } from 'react-native';

export default function RoutineRows({ search, setSearch, dailyMode, toggleDailyMode, selectedDay, setSelectedDay }) {
  const days = ['MON', 'TUES', 'WED', 'THR', 'FRI', 'SAT', 'SUN'];

  return (
    <View>
      <TextInput
        placeholder="+ add"
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: '#F5F5F5',
          padding: 12,
          borderRadius: 10,
          marginVertical: 12,
          color: '#125DAB',
        }}
        placeholderTextColor="#70C1FF"
      />

      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Switch
          value={dailyMode}
          onValueChange={toggleDailyMode}
          trackColor={{ false: '#ccc', true: '#70C1FF' }}
          thumbColor={dailyMode ? '#fff' : '#eee'}
        />
        <Text style={{ color: '#70C1FF', marginTop: 5 }}>daily</Text>
      </View>

      {dailyMode && (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
          {days.map((day, index) => (
            <Pressable key={index} onPress={() => setSelectedDay(index)}>
              <Text style={{
                marginHorizontal: 6,
                color: selectedDay === index ? '#70C1FF' : '#125DAB',
                fontWeight: selectedDay === index ? 'bold' : 'normal',
                textDecorationLine: selectedDay === index ? 'underline' : 'none',
              }}>
                {day}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}