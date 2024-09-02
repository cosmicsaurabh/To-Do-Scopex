import { StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';

const useThemedStyles = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return StyleSheet.create({
    container: {
    //   flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#fff',
    //   padding: 20,
    },
    // text: {
    //   color: isDarkMode ? '#fff' : '#000',
    // },
    // Add other styles here
  });
};

export default useThemedStyles;
