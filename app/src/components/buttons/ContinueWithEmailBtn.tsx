import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ContinueWithEmailBtnProps {
  onPress: () => void;
}

const ContinueWithEmailBtn: React.FC<ContinueWithEmailBtnProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Continue with email</Text>
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
    marginRight: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContinueWithEmailBtn;
