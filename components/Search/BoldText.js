// ===========================================
// ================ Bold Text ================
// ===========================================
// - Text Matching & Bold highlighting  
// -------------------------------------------
import React from 'react';
import { Text } from 'react-native';
import colors from '@constants/colors';
import fonts from '@constants/fonts';

export default function BoldText({ text, query }) {
  if (!query) {
    return <Text style={styles.productText}>{text}</Text>;
  }

  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  const parts = text.split(regex);

  return (
    <Text style={styles.productText}>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <Text key={index} style={styles.boldText}>
            {part}
          </Text>
        ) : (
          <Text key={index}>{part}</Text>
        )
      )}
    </Text>
  );
}

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const styles = {
  productText: {
    fontSize: 16,
    fontFamily: fonts.body,
    color: colors.mainLialune,
    flexShrink: 1,
  },
  boldText: {
    fontFamily: fonts.boldBody,
    color: colors.primaryDeepBlue,
  },
};