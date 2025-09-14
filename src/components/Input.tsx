import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fonts, scale} from '../theme';
import {Icons} from '../config';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  secureToggle?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  error,
  secureTextEntry,
  secureToggle,
  style,
  ...rest
}) => {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, style]}
          secureTextEntry={hidden}
          autoCapitalize={rest.autoCapitalize || 'none'}
          {...rest}
        />
        {secureToggle ? (
          <TouchableOpacity
            onPress={() => setHidden(p => !p)}
            accessibilityRole="button">
            <Image
              source={hidden ? Icons.eyeShow : Icons.eyeHide}
              style={styles.toggleIcon}
              resizeMode="contain"
              tintColor={colors.primary}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {marginBottom: scale.mvs(14)},
  label: {
    fontFamily: fonts.medium,
    fontSize: scale.font(12),
    marginBottom: scale.mvs(4),
    color: colors.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale.ms(10),
    backgroundColor: colors.inputTextBackground,
    paddingHorizontal: scale.ms(14),
  },
  input: {
    flex: 1,
    paddingVertical: scale.mvs(12),
    color: colors.textPrimary,
    fontFamily: fonts.regular,
  },
  toggleIcon: {
    width: scale.ms(20),
    height: scale.ms(20),
    marginLeft: scale.ms(8),
  },
  error: {
    color: colors.error,
    fontSize: scale.font(11),
    marginTop: scale.mvs(4),
  },
  inputError: {borderWidth: 1, borderColor: colors.error},
});

export default Input;
