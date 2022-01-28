import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import data from "../../../assets/documents/topic1/topic.json";
import { Overlay } from "react-native-elements";

const Store = createContext({});
const Option = ({ text }) => {
  const { hanleNext, className } = useContext(Store);
  return (
    <TouchableOpacity
      style={[
        styles.option,
        className?.text === text &&
          (className?.res ? styles.succes : styles.fail),
      ]}
      onPress={() => hanleNext(text)}
    >
      <Text style={{ fontSize: 22, color: "blue" }}>{text}</Text>
    </TouchableOpacity>
  );
};
const Options = ({ qes }) => {
  const [bool, setBool] = useState(true);
  useEffect(() => {
    setBool(Math.floor(Math.random() * 3));
  }, [qes?.qs]);
  return (
    <>
      {bool == 0 ? (
        <>
          <Option text={qes?.as} />
          <Option text={qes?.temp} />
          <Option text={qes?.temp2} />
        </>
      ) : bool == 1 ? (
        <>
          <Option text={qes?.temp} />
          <Option text={qes?.as} />
          <Option text={qes?.temp2} />
        </>
      ) : (
        <>
          <Option text={qes?.temp} />
          <Option text={qes?.temp2} />
          <Option text={qes?.as} />
        </>
      )}
    </>
  );
};
export default function Game({ route }) {
  const { id } = route.params;
  const [arr, setArr] = useState(data.topic[id - 1].transfers);
  const [question, setQuestion] = useState();
  const [counter, setCounter] = useState(null);
  const [className, setClassName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function addQuestion() {
    const arrQues = [].concat(data.topic[id - 1].transfers);
    const quetion = arr[Math.floor(Math.random() * arr.length)];
    setArr(arr.filter((e) => e.id !== quetion.id));
    arrQues.splice(quetion.id - 1, 1);
    const temp = arrQues[Math.floor(Math.random() * arrQues.length)];
    arrQues.splice(temp.id - 1, 1);
    const temp2 = arrQues[Math.floor(Math.random() * arrQues.length)];
    const bool = Math.round(Math.random());
    bool
      ? setQuestion({
          qs: quetion.vi,
          as: quetion.es,
          temp: temp.es,
          temp2: temp2.es,
        }) //lay tieng viet lam cau hoi
      : setQuestion({
          qs: quetion.es,
          as: quetion.vi,
          temp: temp.vi,
          temp2: temp2.vi,
        }); //lay tieng anh lam  cau hoi
  }
  useEffect(() => {
    setCounter({ numAnswer: 0, current: 1, size: arr.length });
  }, []);

  useEffect(() => {
    if (counter && counter.current !== 1 && counter?.current === counter?.size) {
      setModalVisible(true);
    } else
      setTimeout(() => {
        setLoading(false);
        addQuestion();
        setClassName(null);
      }, 300);
  }, [counter]);
  const hanleNext = function (rs) {
    if (rs === question?.as) {
      setClassName({ text: rs, res: true });
      setCounter((e) => {
        return {
          ...counter,
          numAnswer: e?.numAnswer + 1,
          current: e?.current + 1,
        };
      });
    } else {
      setClassName({ text: rs, rss: false });
      setCounter({...counter, current: counter?.current + 1 });
    }
  };
  const onCloseModal = () => {
    const arrQ = data.topic[id - 1].transfers
    setCounter({ numAnswer: 0, current: 1, size: arrQ.length });
    setArr(arrQ)
    setModalVisible(false);
  };
  return (
    <Store.Provider value={{ hanleNext, className }}>
      <View style={styles.container}>
        <Overlay isVisible={modalVisible} onBackdropPress={onCloseModal}>
          <View style={styles.viewTrans}>
            <Text style={styles.title}>Hoàn thành</Text>
            <View
              style={{
                width: 200,
                borderBottomColor: "#cbcaca",
                borderBottomWidth: 1,
                marginTop: 20,
                marginBottom: 20,
              }}
            />
            <Text style={styles.textCount}>Điểm: {counter?.numAnswer}</Text>
            <Text style={styles.textCount}>
              {counter?.numAnswer < counter?.size
                ? "Cần cố gắng hơn"
                : "Tuyệt vời"}
            </Text>
          </View>
        </Overlay>
        <View>
          <Text style={styles.title}>Từ vựng</Text>
          <Text style={styles.question}>{question?.qs}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Trả lời</Text>
        </View>
        <View>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Options qes={question} />
          )}
        </View>
      </View>
      <View style={styles.viewCount}>
        <Text style={styles.textCount}>Điểm: {counter?.numAnswer}</Text>
        <Text style={styles.textCount}>
          Câu: {counter?.current}/{counter?.size}
        </Text>
      </View>
    </Store.Provider>
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
});
