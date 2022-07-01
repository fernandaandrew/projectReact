import React, {useContext,useState,useEffect} from 'react';
import {Button, StyleSheet, Text, View,TouchableOpacity, TextInput      } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';

const DetailLaporanScreen = ({navigation,route}) => {
    const {params}=route;
    const { isLoading} = useContext(AuthContext);
    const [data,setData]=useState({
        id:null,
        username:'',
        tanggal:'',
        deskripsi:''
    })

    useEffect(()=>{
        axios
        .get(`${BASE_URL}/detail_laporan.php?id=${params.id}`)
        .then(({data}) => {
            setData(data.data);
        })
        .catch(console.log);
    },[]);


    const simpan=()=>{
        axios
        .post(`${BASE_URL}/update_laporan.php?id=${params.id}`,data,
        {
            'Content-Type':'application/json'
        })
        .then(({data}) => {
            navigation?.navigate('CONTENT',{screen:'DETAILLAPORAN',params:data.data})    
        })
        .catch(console.log);
    }

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={{flex:1, alignContent:'center',margin:20}}>
                <View style={{flexDirection:'row',backgroundColor:'white',borderRadius:20}}>
                    <Text style={[styles.label,{flex:2}]}>{data?.username}</Text>
                    <Text style={[styles.label,{flex:1}]}>{data?.tanggal}</Text>
                </View> 
                <View style={{backgroundColor:'white',borderRadius:20,padding:10,marginVertical:10}}>
                    <Text style={[styles.label,{margin:0}]}>Deskripsi : </Text>
                    <View style={{backgroundColor:'white',borderRadius:20,margin:15}}>
                        <TextInput  multiline={3} value={data.deskripsi} onChangeText={(value)=>setData({...data,deskripsi:value})} style={{margin:10,borderRadius:10,padding:5}} placeholder={'Isi deskripsi di sini'}/>
                    </View>
                    <TouchableOpacity style={{borderRadius:20,margin:10,padding:8}} onPress={simpan}>
                        <Text style={{fontWeight:'700',textAlign:'center'}}>Simpan</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label:{
    margin:10,
    fontWeight:'700',
    fontSize:14
  }
});

export default DetailLaporanScreen;