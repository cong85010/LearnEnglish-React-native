import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import data from "../../../../assets/documents/topic1/topic.json";
import Ionicons from "react-native-vector-icons/Ionicons";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
const Option = ({ text, answer }) => {
  // const { hanleNext, className, loading } = useContext(Store);
  return (
    <TouchableOpacity
      style={[
        styles.option,
        text && answer == 1 ? styles.succes : answer == -1 ? styles.fail : "",
      ]}
    >
      <Text style={{ fontSize: 22, color: "blue" }}>{text}</Text>
    </TouchableOpacity>
  );
};
const Options = ({ qes }) => {
  console.log(qes);
  return (
    <>
      {qes?.arrAS?.map((text, index) => (
        <Option
          text={text}
          answer={index == qes.posAS ? 1 : index == qes.yourS ? -1 : 0}
          key={index}
        />
      ))}
    </>
  );
};
export default function Review({ route }) {
  console.log(route.params);
  const { obj } = route.params;
  const { idCau } = route.params;
  // const [arr, setArr] = useState(data.topic[id - 1].transfers);
  console.log(obj);
  function onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    // this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        console.log("up");
        break;
      case SWIPE_DOWN:
        this.setState({ backgroundColor: "green" });
        break;
      case SWIPE_LEFT:
        console.log("left");

        break;
      case SWIPE_RIGHT:
        this.setState({ backgroundColor: "yellow" });
        break;
    }
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <View style={styles.container}>
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        config={config}
      >
        <View>
          <Text style={styles.title}>Từ vựng</Text>
          <Text style={styles.question}>{obj?.qs}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Trả lời</Text>
        </View>
        <Options qes={obj} />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Ionicons name="chevron-back-outline" size={40} color="green" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chevron-forward-outline" size={40} color="green" />
          </TouchableOpacity>
        </View>
      </GestureRecognizer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: "relative",
  },
  title: {
    fontSize: 24,
    color: "#ea901d",
    fontWeight: "bold",
    textAlign: "center",
  },
  question: {
    marginTop: 20,
    fontSize: 23,
    color: "blue",
    textAlign: "center",
  },
  option: {
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 30,
    padding: 20,
  },
  succes: {
    backgroundColor: "#32f032",
  },
  fail: {
    backgroundColor: "red",
  },
  viewCount: {
    position: "absolute",
    bottom: 0,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textCount: {
    textAlign: "center",
    fontSize: 22,
  },
  viewTrans: {
    padding: 10,
  },
  listButton: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    fontSize: 22,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    width: 130,
    padding: 5,
    textAlign: "center",
  },
});
