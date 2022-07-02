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
      .get(`${BASE_URL}/daftar_laporan.php`,{"Access-Control-Allow-Origin": "*"})
      .then(({data}) => {
        setData(data.data);
      })
      .catch(console.log);
  },[route?.params]);

  
  useEffect(()=>{
    if(!userInfo?.username){
      navigation?.navigate('LOGIN')
    }
  },[userInfo])

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default HomeScreen;