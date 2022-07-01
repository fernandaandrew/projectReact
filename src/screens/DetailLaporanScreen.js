import React, {useContext,useState,useEffect} from 'react';
import {Button, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useFocusEffect } from '@react-navigation/native';

const DetailLaporanScreen = ({navigation,route}) => {
    const {params}=route;
    const { isLoading} = useContext(AuthContext);
    const [data,setData]=useState({
        id:null,
        username:'',
        tanggal:'',
        deskripsi:''
    })

    useFocusEffect(()=>{
        axios
        .get(`${BASE_URL}/detail_laporan.php?id=${params.id}`)
        .then(({data}) => {
            setData(data.data);
        })
        .catch(console.log);
    });
    
    const hapusLaporan=()=>{
        axios
        .post(`${BASE_URL}/delete_laporan.php`,{
            id:data.id,
        },{
            'Content-Type':'application/json'
        })
        .then(({data}) => {
            if(data.result==="success"){
                setData(data.data);     
                navigation?.navigate("CONTENT",{screen:"HOME",params:{uption:"DELETE"}})
            }
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
                    <Text style={styles.label}>{data?.deskripsi}</Text>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:2}}>
                            <TouchableOpacity onPress={()=>navigation?.navigate('CONTENT',{screen:'UBAHLAPORAN',params:data})}>
                                <Text style={{color:'blue'}}>Ubah Laporan</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={hapusLaporan} style={{borderRadius:20,backgroundColor:'red'}}>
                                <Text style={{textAlign:'center',fontWeight:'700'}}>Hapus</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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