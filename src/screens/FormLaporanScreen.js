import React, {useContext,useState,useEffect} from 'react';
import {Button, StyleSheet, Text, View,TouchableOpacity, TextInput} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';

const FormLaporanScreen = ({navigation,route}) => {
    const {params}=route;
    const { userInfo } = useContext(AuthContext);
    const [data,setData]=useState([]);
    const [deskripsi,setDeskripsi]=useState('');

    const submit=()=>{
        axios
        .post(`${BASE_URL}/tambah_laporan.php`,{
            username:userInfo.username,
            deskripsi:deskripsi
        },{
            'Content-Type':'application/json'
        })
        .then(({data}) => {
            if(data.result==="success"){
                setData(data.data);
                navigation?.navigate("CONTENT",{screen:"HOME",params:{option:'STORE'}})
            }
        })
        .catch(console.log);
    }
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'white',borderRadius:20,margin:15}}>
                <TextInput multiline={3} onChangeText={(value)=>setDeskripsi(value)} style={{margin:15,borderRadius:10,padding:10}} placeholder={'Isi deskripsi di sini'}/>
            </View>
            <TouchableOpacity onPress={submit} style={{borderRadius:15,margin:10,padding:5,backgroundColor:'blue'}}>
                <Text style={{fontSize:14,fontWeight:'600',textAlign:'center',color:'white'}}>Kirim</Text>
            </TouchableOpacity>
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
    borderRadius:20
  }
});

export default FormLaporanScreen;