import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/component/Navigation';
import {AuthProvider} from './src/context/AuthContext';
import axios from 'axios';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#06bcee" />
      <Navigation />
    </AuthProvider>
  );
};

export default App;