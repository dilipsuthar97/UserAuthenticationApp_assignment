import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {colors, fonts, scale} from '../theme';

interface Props {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  variant?: 'primary' | 'outline';
}

const Button: React.FC<Props> = ({
  title,
  onPress,
  disabled,
  loading,
  style,
  variant = 'primary',
}) => {
  const isOutline = variant === 'outline';
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        isOutline ? styles.outline : styles.primary,
        (disabled || loading) && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.primary : colors.white} />
      ) : (
        <Text style={[styles.text, isOutline && styles.textOutline]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: scale.mvs(14),
    paddingHorizontal: scale.ms(18),
    borderRadius: scale.ms(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale.mvs(6),
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: scale.font(14),
  },
  textOutline: {
    color: colors.primary,
  },
});

export default Button;
