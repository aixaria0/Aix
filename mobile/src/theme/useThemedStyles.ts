import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

/**
 * Hook to generate themed styles for a component.
 * This ensures all styles respect the current theme.
 */
export const useThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  styleFactory: (palette: ReturnType<typeof useTheme>['theme']['palette']) => T
): T => {
  const { theme } = useTheme();
  return StyleSheet.create(styleFactory(theme.palette));
};
