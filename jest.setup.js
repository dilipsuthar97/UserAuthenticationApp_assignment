/* eslint-disable no-undef */
import '@testing-library/jest-native/extend-expect';
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
// Mock size-matters methods
jest.mock('react-native-size-matters', () => ({
  s: v => v,
  vs: v => v,
  ms: v => v,
  mvs: v => v,
}));
