import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
      <Ionicons
        name={answer ? "ellipse" : "ellipse-outline"}
        size={30}
        color={answer == 1 ? "#32f032" : answer == -1 ? "red" : "black"}
      />
      <Text
        style={{ fontSize: 22, color: "blue", textTransform: "capitalize" }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const Options = ({ qes }) => {
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
  const [question, setQuestion] = useState();
  const [indexQues, setIndexQues] = useState();
  const { allQues } = route.params;
  const { idCau } = route.params;
  console.log(allQues);
  useEffect(() => {
    setQuestion(allQues[idCau]);
    setIndexQues(idCau);
  }, []);
  function onSwipeLeft() {
    const id = indexQues + 1;
    if (id < allQues.length) {
      setIndexQues(id);
      setQuestion(allQues[id]);
    }
  }

  function onSwipeRight() {
    const id = indexQues - 1;
    if (id >= 0) {
      setIndexQues(id);
      setQuestion(allQues[id]);
    }
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={config}
    >
      <View
        style={styles.viewCount}
      >
        <Text style={styles.textCount}>
          Câu: {indexQues + 1}/{allQues.length}
        </Text>
      </View>
      <View style={[styles.container, { height: 1000,  }]}>
        <View>
          <Text style={styles.title}>Question</Text>
          <Text style={styles.question}>{question?.qs}</Text>
        </View>
        <View
              style={{
                width: "100%",
                borderBottomColor: "#cbcaca",
                borderBottomWidth: 1,
                marginTop: 20,
                marginBottom: 20,
              }}
            />
       
        <Options qes={question} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <TouchableOpacity style={{ padding: 20 }} onPress={onSwipeRight}>
            <Ionicons
              name="chevron-back-circle-outline"
              size={50}
              color={indexQues ? "black" : "#cccccc"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20 }} onPress={onSwipeLeft}>
            <Ionicons
              name="chevron-forward-circle-outline"
              size={50}
              color={indexQues != allQues.length - 1 ? "black" : "#cccccc"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </GestureRecognizer>
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
    textTransform: "capitalize",
  },
  option: {
    flexDirection: "row",
    textAlign: "center",
    borderColor: "#cccccc",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 30,
    padding: 20,
    overflow: "hidden",
  },
  succes: {
    borderColor: "#32f032",
  },
  fail: {
    borderColor: "red",
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
  viewCount: {
    marginTop: 30,
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
});
