import React, {useContext,useState,useEffect} from 'react';
import {Button, StyleSheet, Text, View,TouchableOpacity, TextInput, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';

const FormLaporanScreen = ({navigation,route}) => { 
    const {params}=route;
    const { userInfo } = useContext(AuthContext);
    const [data,setData]=useState([]);
    const [deskripsi,setDeskripsi]=useState('');

    const [image, setImage] = useState(null);

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
        console.log(result)
        setImage(result);
      }
    };
    
    const submit=()=>{
        var form=new FormData();
        form.append('deskripsi',deskripsi);
        form.append('username',userInfo.username);
        form.append('image_base64',image.uri);
        axios
        .post(`${BASE_URL}/tambah_laporan.php`,form,{ 'Content-Type': 'multipart/form-data' })
        .then(({data}) => {
            if(data.result==="success"){
                setData(data.data);
                navigation?.navigate("CONTENT",{screen:"HOME",params:{option:'STORE'}})
            }else{
              alert('Gagal menambah laporan');
            }
          })
          .catch((e)=>console.log(JSON.stringify(e)));
    }
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'white',borderRadius:20,margin:15}}>
              {image!==null?(
                <Image source={{uri:image.uri}} style={styles.thumbnail}/>
              ):null}
            </View>
            <View style={{backgroundColor:'white',borderRadius:20,margin:15}}>
              <TextInput multiline={true}  numberOfLines={3} onChangeText={(value)=>setDeskripsi(value)} style={{margin:15,borderRadius:10,padding:10}} placeholder={'Isi deskripsi di sini'}/>
              <Button title="Pick an image from camera roll" onPress={pickImage} />
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
  },
  thumbnail:{
    width: 300,
    height: 300,
    resizeMode: "contain",
    alignSelf:'center'
  }
});

export default FormLaporanScreen;