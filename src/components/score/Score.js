import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";

export default function Score({ route, navigation }) {
  const { allQues, numAnswer, size } = route.params;
  console.log(allQues  )
  const isTrueAnswer = (obj, index) => {
    if (obj.yourS === index) {
      if (obj.yourS === obj.posAS) {
        return 1;
      } else {
        return 0;
      }
    }
    if (index == obj.posAS) {
      return 1;
    }
    return -1;
  };
  const hanleStyle = (obj, index) => {
    const isAnswer = isTrueAnswer(obj, index);
    if (isAnswer == 1) {
      return style.success;
    }
    if (isAnswer == 0) {
      return style.fail;
    }
  };
  //nghe - question
  const hanleDetailQues = (allQues, idCau) => navigation.navigate("Xem lại", {allQues, idCau});
  return (
    <View>
      <Text style={style.textBig}>Danh sách câu</Text>
      <View
        style={{flexDirection: "row", justifyContent: "space-around", marginTop: 30}}
      >
        <Text style={{ fontSize: 22 }}>Đúng: {numAnswer}</Text>
        <Text style={{ fontSize: 22 }}>Tổng: {size}</Text>
      </View>
      <ScrollView
        style={{ marginTop: 30, height: Dimensions.get("window").height - 300 }}
      >
        {allQues?.map((obj, indexCau) => (
          <TouchableOpacity
            key={indexCau}
            style={[style.flexRow, { width: "100%", marginTop: 30 }]}
            onPress={() => hanleDetailQues(allQues, indexCau)}
          >
            <View style={{ textAlign: "center", marginLeft: 20 }}>
              {obj.rs?<Ionicons name="checkmark-outline" size={40} color="green" />:<Ionicons name="close-outline" size={40} color="red" />}
            </View>
            <View style={{ width: 100, marginLeft: 10 }}>
              <Text style={{ fontSize: 22 }}>Câu: {indexCau + 1}</Text>
            </View>
            <View
              style={[
                style.flexRow,
                { justifyContent: "space-around", height: "100%" },
              ]}
            >
              {obj.pos.map((cir, index) => (
                <View
                  key={index}
                  style={[style.circle, hanleStyle(obj, index)]}
                >
                  <Text style={[style.textCircle, { textAlign: "center" }]}>
                    {index + 1}
                  </Text>
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
    lineHeight: 40,
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
