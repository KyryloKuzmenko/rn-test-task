
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


interface LoginButtonProps {
  onPress: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>LogIn</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: 200, 
    marginTop: 20, 
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginButton;
