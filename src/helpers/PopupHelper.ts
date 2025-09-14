import {createRef} from 'react';
import DropdownAlert, { DropdownAlertType } from 'react-native-dropdownalert';

export const alertRef = createRef<DropdownAlert>();

const error = (message: string) => {
  alertRef.current?.alertWithType('error', 'Error', message);
};

const success = (message: string) => {
  alertRef.current?.alertWithType('success', 'Success', message);
};

const info = (message: string) => {
  alertRef.current?.alertWithType('info', 'Info', message);
};

const show = (type: DropdownAlertType, title: string, message: string) => {
  alertRef.current?.alertWithType(type, title, message);
};

export default {
  error,
  success,
  info,
  show,
};
