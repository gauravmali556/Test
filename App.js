import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet, FlatList, ScrollView } from "react-native";


const API = "https://jsonplaceholder.typicode.com/photos"




const App = () => {
  const [data, setData] = useState([])
  const [compareData, setCompareData] = useState([])

  useEffect(() => {
    setData([])
    setCompareData([])
    getImagesData()
  }, [])



  /**
   *  #### Compare image ###
   * 
   */
  onClickCompare = (id) => {
    let dataTemp = data.map((index, i) => {
      if (index.id == id) {
        return { ...index, isAdded: !index.isAdded }
      } else {
        return { ...index }
      }
    })

    let compareDataTemp = dataTemp.filter((item) => item.isAdded == true)
    setData(dataTemp)
    setCompareData(compareDataTemp)
  }




  /**
   *  #### API Call ###
   * 
   */
  getImagesData = () => {
    fetch(API)
      .then((response) => response.json())
      .then((json) => {
        json.map((index) => {
          index.isAdded = false
        })
        setData(json)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderImageList = (data) => {

    return (
      <View style={[AppStyles.imageGrid, { paddingHorizontal: 10, justifyContent: 'space-between' }]}>
        <Image style={{ height: 70, width: 70, borderRadius: 10 }} source={{ uri: data.url }} />

        <View style={{ flexDirection: 'row', }}>
          <Text style={{ fontWeight: "bold", }}>Title :</Text>
          <Text style={{ flex: 1 }} >{data.title}</Text>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <Text style={{ fontWeight: "bold", }}>ID    :</Text>
          <Text style={{ flex: 1 }} >{data.id}</Text>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <Text style={{ fontWeight: "bold", }}>Url    :</Text>
          <Text numberOfLines={3} style={{ flex: 1 }}>{data.url}</Text>
        </View>

        <Button onPress={() => onClickCompare(data.id)} title={data.isAdded ? "Remove" : "Compare"} />

      </View>
    )
  }




  return (
    <View style={{ flex: 1, margin: 10 }}>
      <View style={{ paddingVertical: 10 }}>
        <FlatList
          horizontal
          renderItem={(data) => renderImageList(data.item)}
          data={data}
          keyExtractor={(item, index) => index} />
      </View>
      <ScrollView>
        <View >

          <View style={{ borderWidth: 0.5, padding: 4, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>Comparison Table</Text>
          </View>

          <View style={{ flexDirection: 'row', borderWidth: 0.1 }}>

            <View style={[AppStyles.tableColm, { flex: 2 }]}></View>
            <View style={[AppStyles.tableColm, { flex: 0.5 }]}>
              <Text style={{ fontWeight: "bold", }}>ID</Text>
            </View>
            <View style={[AppStyles.tableColm, { flex: 2 }]}>
              <Text style={{ fontWeight: "bold", }} >URL</Text>
            </View>
            <View style={[AppStyles.tableColm, { flex: 3 }]}>
              <Text style={{ fontWeight: "bold", }}>Title</Text>
            </View>

          </View>
          {
            compareData.map((item) => {
              return (
                <View style={{ flexDirection: 'row', borderWidth: 0.4 }}>
                  <View style={[AppStyles.tableColm, { flex: 2 }]}>
                    <Image style={{ height: 50, width: 50, borderRadius: 10 }} source={{ uri: item.url }} />
                  </View>
                  <View style={[AppStyles.tableColm, { flex: 0.5 }]}>
                    <Text > {item.id}</Text>
                  </View>
                  <View style={[AppStyles.tableColm, { flex: 2 }]}>
                    <Text >{item.url}</Text>
                  </View>
                  <View style={[AppStyles.tableColm, { flex: 3 }]}>
                    <Text >{item.title}</Text>
                  </View>
                </View>
              )
            })
          }

        </View>
      </ScrollView>
    </View >
  )
}

const AppStyles = StyleSheet.create({
  tableColm: {
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  imageGrid: {
    width: 150,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
})
export default App