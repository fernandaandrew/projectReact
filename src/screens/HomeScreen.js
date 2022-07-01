<<<<<<< HEAD
import React, {useContext,useState,useEffect} from 'react';
import {Button, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({navigation,route}) => {
  const {params}=route;
  const {userInfo, isLoading, logout} = useContext(AuthContext);
  const [data,setData]=useState([])

  useEffect(()=>{
    axios
      .get(`${BASE_URL}/daftar_laporan.php`)
      .then(({data}) => {
        setData(data.data);
      })
      .catch(console.log);
      console.log(route)
  },[]);

  
  useFocusEffect  (()=>{ 
    axios
      .get(`${BASE_URL}/daftar_laporan.php`)
      .then(({data}) => {
        setData(data.data);
      })
      .catch(console.log);
  });
  
  useEffect(()=>{
    if(!userInfo?.username){
      navigation?.navigate('LOGIN')
    }
  },[userInfo])
=======
import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = () => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);
>>>>>>> 1d78b5df64403e62a75026d5a6657d0dedab24f2

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
<<<<<<< HEAD
      <View style={{width:'100%',flexDirection:'row'}}>
        <View style={{flex:2}}>
          <TouchableOpacity style={{backgroundColor:'red',padding:5,margin:15, borderRadius:20,}} onPress={logout} >
              <Text style={{color:'black',fontSize:16,fontWeight:'bold',textAlign:'center'}}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1}}/>
        <View style={{flex:2 ,alignContent:'flex-start' }}>
          <TouchableOpacity style={{backgroundColor:'blue',padding:10,margin:15, borderRadius:20, width:'100  %'}} onPress={()=>navigation?.navigate('CONTENT',{screen:'TAMBAHLAPORAN'})} >
            <Text style={{color:'black',fontSize:14,fontWeight:'bold',textAlign:'center'}}> + Tambah laporan</Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        data.map((item,i)=>(
            <View style={styles.listItem} key={i}>
              <Text style={styles.title}>Laporan dari {item.username} </Text>
              <Text style={styles.title}>{item.tanggal} </Text>
              <TouchableOpacity style={styles.detailBtn} onPress={()=>navigation?.navigate('CONTENT',{screen:'DETAILLAPORAN',params:item})}>
                <Text style={{fontWeight:'800'}}>Detail</Text>
              </TouchableOpacity>
            </View>
        ))
      }
=======
      <Text style={styles.welcome}>Welcome {userInfo.user.name}</Text>
      <Button title="Logout" color="red" onPress={logout} />
>>>>>>> 1d78b5df64403e62a75026d5a6657d0dedab24f2
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
  },
  listItem:{
    flexDirection:'row',
    backgroundColor:'white',
    margin:5,
    padding:10,
    borderRadius:16
  },
  title:{
    flex:2
  },
  detailBtn:{
    flex:1,
    borderRadius:20,
    backgroundColor:'green',
    padding:5,
    textAlign:'center',
    
  }
=======
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
>>>>>>> 1d78b5df64403e62a75026d5a6657d0dedab24f2
});

export default HomeScreen;