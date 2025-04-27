// ==============================================
// ============ AddToRoutineModal.js ============
// ==============================================
// - Fade-in/out modal with blurred background
// - Displays "Coming Soon!" message
// ----------------------------------------------

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

export default function AddToRoutineModal({ visible, onClose }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // * Fade in/out animation
  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none" // Using custom fade instead of default animations
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <BlurView intensity={80} tint="light" style={styles.blur}>
          {/* ---------- Pop-up Box ---------- */}
          <View style={styles.modalBox}>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text>
                <FontAwesomeIcon icon={faXmark} size={24} color={colors.primaryDeepBlue} />
              </Text>
            </Pressable>
            <Text style={styles.modalText}>Add to Routine Coming Soon!</Text>
          </View>
        </BlurView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(226, 208, 182, 0.6)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: colors.lightCream,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    maxWidth: '80%',
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    fontFamily: fonts.heading,
    color: colors.primaryDeepBlue,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});