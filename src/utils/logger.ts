/* eslint-disable @typescript-eslint/no-explicit-any */
import { Platform } from 'react-native';

const isDev = __DEV__; // React Native ma built-in flag

class Logger {
  private static format(level: string, message: string) {
    const timestamp = new Date().toISOString();
    const platform = Platform.OS.toUpperCase();
    return `[${timestamp}] [${platform}] [${level}] ${message}`;
  }

  static log(message: string, data?: any) {
    if (!isDev) return; // production ma skip
    const logMessage = this.format('log', message);
    console.log(logMessage, data ?? '');
  }

  static debug(message: string, data?: any) {
    if (!isDev) return; // production ma skip
    const logMessage = this.format('DEBUG', message);
    console.debug(logMessage, data ?? '');
  }

  static warn(message: string, data?: any) {
    const logMessage = this.format('WARN', message);
    console.warn(logMessage, data ?? '');
  }

  static error(message: string, error?: any) {
    const logMessage = this.format('ERROR', message);
    console.error(logMessage, error ?? '');
  }
}

export default Logger;
