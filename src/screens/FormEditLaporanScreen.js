import React, {useContext,useState,useEffect} from 'react';
import {Button, StyleSheet, Text, View,TouchableOpacity, TextInput ,Image     } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { BASE_URL } from '../config';

const DetailLaporanScreen = ({navigation,route}) => {
    const {params}=route;
    const { isLoading} = useContext(AuthContext);
    const [data,setData]=useState({
        id:null,
        username:'',
        image:'',
        tanggal:'',
        deskripsi:''
    })
    const [selectedImage,setSelectedImage]=useState(null);

    useEffect(()=>{
        axios
        .get(`${BASE_URL}/detail_laporan.php?id=${params.id}`)
        .then(({data}) => {
            setData(data.data);
        })
        .catch(console.log);
    },[]);


    const simpan=()=>{
        var form=new FormData();
        form.append('id',data.id);
        form.append('deskripsi',data.deskripsi);
        form.append('username',data.username);
        form.append('image_base64',selectedImage);

        axios
        .post(`${BASE_URL}/update_laporan.php?id=${params.id}`,form,
        {
            'Content-Type': 'multipart/form-data' 
        })
        .then(({data}) => {
            if(data.result==="success"){
                navigation?.navigate('CONTENT',{screen:'DETAILLAPORAN',params:data.data})    
            }
            else{
                alert('Gagal mengubah laporan');
            }
        })
        .catch(console.log);
    }

    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
  
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (result.cancelled) {
          return
        }else{
          setSelectedImage(result.uri);
        }
      };

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={{flex:1, alignContent:'center',margin:20}}>
                <View style={{backgroundColor:'white',borderRadius:20}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.label,{flex:2}]}>{data?.username}</Text>
                        <Text style={[styles.label,{flex:1}]}>{data?.tanggal}</Text>
                    </View>
                    {selectedImage?(
                        <View style={{margin:10,alignItems:'center'}}>
                            <Image source={{uri:`${selectedImage}`}} style={{width:250,height:250,resizeMode:'contain',margin:15}}/>
                        </View>
                    ):data.image? (
                        <View style={{margin:10,alignItems:'center'}}>
                            <Image source={{uri:`${BASE_URL}/${data.image}?date=${new Date()}`}} style={{width:250,height:250,resizeMode:'contain',margin:15}}/>
                        </View>
                    ):null}     
                </View>
                <View style={{backgroundColor:'white',borderRadius:20,padding:10,marginVertical:10}}>
                    <Text style={[styles.label,{margin:0}]}>Deskripsi : </Text>
                    <View style={{backgroundColor:'white',borderRadius:20,margin:15}}>
                        <TextInput  multiline={true} numberOfLines={3} value={data.deskripsi} onChangeText={(value)=>setData({...data,deskripsi:value})} style={{margin:10,borderRadius:10,padding:5}} placeholder={'Isi deskripsi di sini'}/>
                        <Button title="Pick an image from camera roll" onPress={pickImage} />
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