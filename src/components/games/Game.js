import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import data from "../../../assets/documents/topic1/topic.json";
import { Overlay } from "react-native-elements";
import { Audio } from "expo-av";

const Store = createContext({});
const URL = "https://api.deepcode.tk";

const Option = ({ text }) => {
  const { hanleNext, className, loading } = useContext(Store);
  return (
    <TouchableOpacity
      style={[
        styles.option,
        text &&
          className?.text === text &&
          (className?.res ? styles.succes : styles.fail),
      ]}
      onPress={() => !loading && hanleNext(text)}
    >
      <Text style={{ fontSize: 22, color: "blue" }}>{text}</Text>
    </TouchableOpacity>
  );
};
export const Options = ({ qes }) => {
  return (
    <>
      {qes?.arrAS?.map((text, index) => (
        <Option text={text} key={index} />
      ))}
    </>
  );
};
//vi tri chon
export default function Game({ route, navigation }) {
  const { id } = route.params;
  const [arr, setArr] = useState(data.topic[id - 1].transfers);
  const [question, setQuestion] = useState();
  const [counter, setCounter] = useState(null);
  const [className, setClassName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //set POSITION
  function addQuestion() {
    const arrQues = [].concat(data.topic[id - 1].transfers);
    const quetion = arr[Math.floor(Math.random() * arr.length)];
    setArr(arr.filter((e) => e.id !== quetion.id));
    arrQues.splice(quetion.id - 1, 1);
    const temp = arrQues[Math.floor(Math.random() * arrQues.length)];
    arrQues.splice(temp.id - 1, 1);
    let temp2 = temp;
    while (temp2.id == temp.id) {
      temp2 = arrQues[Math.floor(Math.random() * arrQues.length)];
    }
    const bool = Math.round(Math.random());

    if (bool) {
      const randomAS = [quetion?.es, temp.es, temp2.es].sort(
        () => Math.random() - 0.5
      );
      setQuestion({
        id: id,
        checkEsAudio: false,
        qs: quetion.vi,
        as: quetion.es,
        arrAS: randomAS,
      }); //lay tieng viet lam cau hoi
    } else {
      const randomAS = [quetion?.vi, temp.vi, temp2.vi].sort(
        () => Math.random() - 0.5
      );
      setQuestion({
        id: id,
        checkEsAudio: true,
        qs: quetion.es,
        as: quetion.vi,
        arrAS: randomAS,
      }); //lay tieng anh lam  cau hoi
    }
  }
  useEffect(() => {
    setCounter({ numAnswer: 0, allQues: [], current: 1, size: arr.length });
  }, []);

  useEffect(() => {
    if (counter?.current == 4) setModalVisible(true);

    if (
      counter &&
      counter.current !== 1 &&
      counter?.current === counter?.size
    ) {
      setModalVisible(true);
    } else
      setTimeout(() => {
        setLoading(false);
        addQuestion();
        setClassName(null);
      }, 1000);
    return clearTimeout();
  }, [counter]);
  const sound = new Audio.Sound();

  const handleAudio = () => {
    try {
      const word = question.checkEsAudio ? question.qs : question.as;
      fetch(URL + "/text=" + word)
        .then((res) => console.log(res))
        .then(async (arr) => {
          try {
            const { phonetics } = arr[0];
            const obj = phonetics[0];
            if (!obj.audio) {
              return;
            }
            const link = "https://" + obj.audio.substring(2);
            await sound.loadAsync({
              uri: link,
            });
            const checkLoaded = await sound.getStatusAsync();
            if (checkLoaded.isLoaded) {
              await sound.playAsync();
            } else {
              console.log("Error in Loading mp3");
            }
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //Vi tri cau
  const hanleNext = async function (rs) {
    setLoading(true);
    await handleAudio();
    if (rs === question?.as) {
      setClassName({ text: rs, res: true });
      const posYours = question.arrAS.indexOf(rs);
      const posAsYours = question.arrAS.indexOf(question.as);
      const ques = {
        num: counter.numAnswer + 1,
        ...question,
        posAS: posAsYours,
        yourS: posYours,
        pos: question.arrAS,
      };
      const arrQues = [...counter.allQues, ques];
      setCounter((e) => {
        return {
          ...counter,
          allQues: arrQues,
          numAnswer: e?.numAnswer + 1,
          current: e?.current + 1,
        };
      });
    } else {
      setClassName({ text: rs, rss: false });
      const posYours = question.arrAS.indexOf(rs);
      const posAsYours = question.arrAS.indexOf(question.as);
      const ques = {
        num: counter.numAnswer + 1,
        ...question,
        posAS: posAsYours,
        yourS: posYours,
        pos: question.arrAS,
      };
      const arrQues = [...counter.allQues, ques];
      setCounter((e) => {
        return {
          ...counter,
          allQues: arrQues,
          current: e?.current + 1,
        };
      });
    }
  };
  const onCloseModal = () => {
    const arrQ = data.topic[id - 1].transfers;
    setCounter({ numAnswer: 0, allQues: [], current: 1, size: arrQ.length });
    setArr(arrQ);
    setModalVisible(false);
  };
  const hanleNextScore = () => {
    navigation.navigate("Điểm", counter);
    setModalVisible(false);
  };
  return (
    <Store.Provider value={{ hanleNext, className, loading }}>
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
            <View style={styles.listButton}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#008CBA" }]}
                onPress={hanleNextScore}
              >
                <Text
                  style={{ fontSize: 22, color: "white", textAlign: "center" }}
                >
                  Xem điểm
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.listButton}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#e7e7e7" }]}
              >
                <Text style={{ fontSize: 22, textAlign: "center" }}>Thoát</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#4CAF50" }]}
              >
                <Text
                  style={{ fontSize: 22, color: "white", textAlign: "center" }}
                >
                  Làm lại
                </Text>
              </TouchableOpacity>
            </View>
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
          <Options qes={question} />
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
