import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
function Home({navigation}) {
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    navigation.addListener('focus', async () => {
      getList();
    })
  },[]);
  const getList = () => {
    axios({
      url: 'https://65a349efa54d8e805ed381db.mockapi.io/notes',
      method: 'GET',
    }).then(res => {
      var response = res.data;
      setList(response);
    });
  };
  
  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredList = list.filter(data => data.title.includes(searchText));

  const handelDetete = (id) => {
    axios
      .delete("https://65a349efa54d8e805ed381db.mockapi.io/notes/"+id,)
      .then(() => {
        alert( "Deleted Successfully" );
        getList()
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={{flex : 1}}>
      <View style={styles.header}>
        <Text style={styles.txt_main}>Ghi chú</Text>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('AddScreen')
        }}>
          <Image style={styles.tinyLogo} source={{uri: 'https://w7.pngwing.com/pngs/100/522/png-transparent-computer-icons-plus-and-minus-signs-symbol-plus-miscellaneous-cross-sign-thumbnail.png'}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.header_container}>
        <TextInput style={{width: '100%', borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10}} placeholder='Search...' onChangeText={handleSearch}></TextInput>
      </View>
      <FlatList 
        style={styles.content}
        data={filteredList}
        renderItem={({item}) => (
          <View style={styles.item_course}>
            <View style={{width: 300}}>
              <Text style={styles.txt_title}>{item.title}</Text>
              <Text style={styles.txt_content}>{item.content}</Text>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
              <TouchableOpacity onPress={()=>
                navigation.navigate('EditScreen',item)
              }>
                <Image style={styles.tinyLogo} source={{uri: 'https://w7.pngwing.com/pngs/1018/119/png-transparent-computer-icons-editing-pencil-miscellaneous-angle-pencil.png'}}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> handelDetete(item.id)}>
              <Image style={styles.tinyLogo} source={{uri: 'https://cdn-icons-png.flaticon.com/512/1345/1345874.png'}}/>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  tinyLogo: {
    width : 20,
    height : 20,
    marginTop: 5,
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#eeeeee',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    marginBottom: 25,
    padding: 10,
  },
  form: {
    padding: 15,
    // backgroundColor : "#e3e3e3",
    marginTop: 10,
  },

  txtClose: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'right',
  },
  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
  },
  header_container: {
    alignItems:'center',
    paddingHorizontal : 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txt_main: {
    color: 'black',
    fontSize: 30,
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
    justifyContent: 'space-evenly',
  },
  txt_content: {
    color: 'gray',
    fontSize: 16,
    marginTop: 5,
  },
  txt_title: {
    color: 'black',
    fontSize: 20,
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
    display: 'flex',
    padding: 20,
    backgroundColor: '#000',
    marginTop: 20,
  },
  textButton: {
    textAlign: 'center',
    color: '#FFF',
  },
});
export default Home;
