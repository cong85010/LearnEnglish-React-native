import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";
import { Options } from "../games/Game";

export default function Score({ route, navigation }) {
  const { allQues, numAnswer, size } = route.params;
  const hanleStyle = (obj, index) => {
    if (obj.yourS === index) {
      if (obj.yourS === obj.posAS) {
        return style.success;
      } else {
        return style.fail;
      }
    }
    if (index == obj.posAS) {
      return style.success;
    }
  };
  //nghe - question
  const hanleDetailQues = (obj) =>  navigation.navigate("Xem lại", obj);
  return (
    <View>
      <Text style={style.textBig}>Danh sách câu</Text>
      <View style={[style.flexRow, { justifyContent: "space-around", marginTop: 30 }]}>
        <Text style={{ fontSize: 22 }}>Đúng: {numAnswer}</Text>
        <Text style={{ fontSize: 22 }}>Tổng: {size}</Text>
      </View>
      <ScrollView
        style={{ marginTop: 30, height: Dimensions.get("window").height - 200 }}
      >
        {allQues?.map((obj, index) => (
          <TouchableOpacity
            key={index}
            style={[style.flexRow, { width: "100%", marginTop: 30 }]}
            onPress={() => hanleDetailQues(obj)}
          >
            <View style={{ textAlign: "center", marginLeft: 20 }}>
              <Ionicons name="checkmark-outline" size={40} color="green" />
            </View>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 22 }}>Câu: {index + 1}</Text>
            </View>
            <View
              style={[
                style.flexRow,
                { justifyContent: "space-around", height: "100%" },
              ]}
            >
              {/* 1 2 3 */}
              {obj.pos.map((cir, index) => (
                <View
                  key={index}
                  style={[style.circle, hanleStyle(obj, index)]}
                >
                  <Text style={style.textCircle}>{index + 1}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const style = StyleSheet.create({
  textBig: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: "rgb(234, 144, 29)",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textCircle: {
    fontSize: 22,
    height: 50,
    lineHeight: 50,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderColor: "black",
    borderWidth: 1,
    textAlign: "center",
  },
  success: {
    backgroundColor: "#6FF681",
    color: "white",
  },
  fail: {
    backgroundColor: "#F5301B",
  },
});
