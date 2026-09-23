import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Onboarding({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur FLORENTSPORT</Text>
      <Text style={styles.subtitle}>Ton coach sportif personnel</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate('Home')}>
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  button: { backgroundColor: '#000', padding: 15, borderRadius: 10, width: '80%' },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});
