import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
function EditScreen({navigation, route}) {
    const id = route.params.id;
    const [title, setTitle] = useState(route.params.title);
    const [content, setContent] = useState(route.params.content);

    const Submit = () => {
        axios.put("https://65a349efa54d8e805ed381db.mockapi.io/notes/"+id, {title, content})
        .then(result => {
            console.log(result.data)
            alert("Event updated successfully!");
            navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }
  return (
    <SafeAreaView>
        <View style={styles.form}>
            <TouchableOpacity onPress={()=> navigation.goBack()} >
                <Text style={styles.txtClose}>Đóng</Text>
            </TouchableOpacity>
            <TextInput style={styles.text_input} placeholder="Tiêu đề" onChangeText={(value) => setTitle(value)} value={title}/>
            <TextInput style={styles.text_input1} placeholder="Nội dung" onChangeText={(value) => setContent(value)} value={content}/>
            <TouchableOpacity
                onPress={Submit}
                style={styles.btnContainer}>
                <Text style={styles.textButton}>Lưu ghi chú</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    content: {
      padding: 10,
    },
    form: {
      padding: 15,
      // backgroundColor : "#e3e3e3",
      marginTop: 10,
    },
  
    txtClose: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
      textAlign: 'right',
    },
    text_input: {
      color: 'black',
      fontWeight: 'bold',
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      marginTop: 10,
    },
    text_input1: {
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      marginTop: 10,
    },
    header_container: {
      padding: 15,
      backgroundColor: '#eeeeee',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    txt_main: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    item_course: {
      borderRadius: 10,
      marginTop: 10,
      backgroundColor: '#eeeeee',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#e2e2e2',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    txt_name: {
      fontSize: 18,
      marginTop: 5,
      fontWeight: 'bold',
    },
    txt_item: {
      fontSize: 14,
      marginTop: 5,
    },
    txt_enabled: {
      fontSize: 14,
      marginTop: 5,
      color: 'green',
      fontWeight: 'bold',
    },
    txt_disabled: {
      fontSize: 14,
      marginTop: 5,
      color: 'yellow',
      fontWeight: 'bold',
    },
    txt_del: {
      fontSize: 14,
      marginTop: 5,
      color: 'red',
      fontWeight: 'bold',
    },
    txt_edit: {
      fontSize: 14,
      marginTop: 5,
      color: 'blue',
      fontWeight: 'bold',
    },
    btnContainer: {
      marginLeft: '25%',
      width: 200,
      display: 'flex',
      padding: 15,
      backgroundColor: '#000',
      marginTop: 20,
      borderRadius: 10,
    },
    textButton: {
      textAlign: 'center',
      color: '#FFF',
    },
  });

export default EditScreen