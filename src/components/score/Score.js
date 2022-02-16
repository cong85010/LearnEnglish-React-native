import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";

export default function Score({ route }) {
  const { allQues } = route.params;
  console.log(allQues);
  return (
    <View>
      <Text style={style.textBig}>Danh sách câu</Text>
      <ScrollView
        style={{ marginTop: 30, height: Dimensions.get("window").height - 200 }}
      >
        {allQues?.map((obj, index) => (
          <View
            key={index}
            style={[style.flexRow, { width: "100%", marginTop: 30 }]}
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
                  style={[
                    style.circle,
                      (obj.yourS === index ? style.success : style.fail),
                  ]}
                >
                  <Text style={style.textCircle}>{index + 1}</Text> 
                </View>
              ))}
            </View>
          </View>
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
