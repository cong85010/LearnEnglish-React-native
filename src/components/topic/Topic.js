import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedbackComponent,
  View,
} from "react-native";
import data from "../../../assets/documents/topic1/topic.json";
import { Overlay } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";
import { Audio } from "expo-av";
import { color } from "react-native-elements/dist/helpers";

const TextEng = ({ text, handleShowModal, topic }) => {
  const index = text.indexOf("(");
  if (index !== -1) {
    console.log(text)
    const number = Number.parseInt(text.substring(index + 1));
    const result = topic.transfers.find((obj) => obj.id == number);
    return (
      <Text
        style={[styles.content_text, styles.textEng]}
        onPress={() => handleShowModal(result)}
      >
        {result?.es + " "}
      </Text>
    );
  } else {
    const regex = /\d+/;
    if (regex.exec(text)) {
      const number = Number.parseInt(text.match(regex)[0]);
      const result = topic.transfers.find((obj) => obj.id == number);
      return (
        <Text
          style={[styles.content_text, styles.textEng]}
          onPress={() => handleShowModal(result)}
        >
          {result?.es + " "}
        </Text>
      );
    }
  }
  return <Text>{text + " "}</Text>;
};
export default function Topic({ route, navigation }) {
  const [textTrans, setTextTrans] = useState({});
  const [topic, setTopic] = useState(null);
  const [fecthing, setFecthing] = useState(false);

  useEffect(() => {
    const { id } = route.params;
    setTopic(data.topic[id - 1]);
  }, []);
  console.log(topic);
  const handleShowModal = (objText) => {
    setModalVisible(true);
    setTextTrans(objText);
    setFecthing(true);
    try {
      //de11f79466cfb16683c1810e0b9ff27c7313fc54
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + objText.es)
        .then((res) => res.json())
        .then((arr) => {
          try {
            const { phonetics } = arr[0];
            const obj = phonetics[0];
            setTextTrans({ ...objText, ...obj });
            setFecthing(false);
            console.log("V")
          } catch (error) {
            console.log(error);
            setTextTrans(objText);
            setFecthing(false);
          }
        });
    } catch (error) {}
  };
  const [modalVisible, setModalVisible] = useState(false);
  const sound = new Audio.Sound();

  const handleAudio = async () => {
    try {
      if (!textTrans.audio) {
        return;
      }
      const link = "https://" + textTrans.audio.substring(2);
      await sound.loadAsync({
        uri: link,
      });
      const checkLoaded = await sound.getStatusAsync();
      if (checkLoaded.isLoaded) {
        await sound.playAsync();
        setTimeout(() => {
          sound.unloadAsync();
        }, 1000);
      } else {
        console.log("Error in Loading mp3");
      }
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
  const handleCloseModal = () => {
    setModalVisible(false);
    setTextTrans({});
  };
  const onGame = () => navigation.navigate("Chơi game", route.params);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Overlay isVisible={modalVisible} onBackdropPress={handleCloseModal}>
          <View style={styles.viewTrans}>
            <Text>
              <View style={styles.flexCenter}>
                {fecthing ? (
                  <ActivityIndicator size="large" />
                ) : (
                  <Ionicons
                    name="volume-high-outline"
                    size={40}
                    color="#4F8EF7"
                    style={styles.flexCenter}
                    onPress={handleAudio}
                  />
                )}

                <Text style={styles.textShow}>{textTrans.es}</Text>
                {!fecthing &&
                  <Text style={styles.textShow}>{textTrans.text}</Text>
                }
                <View
                  style={{
                    width: 200,
                    borderBottomColor: "#cbcaca",
                    borderBottomWidth: 1,
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                />
                <Text style={styles.textShow}>{textTrans.vi}</Text>
              </View>
            </Text>
          </View>
        </Overlay>
        <View style={styles.content}>
          {topic && (
            <>
              <Text style={styles.textBig}>{topic.title.split(":")[0]}</Text>
              <Text style={[styles.textBig, styles.title]}>
                {topic.title.split(":")[1]}
              </Text>
              <Text style={styles.badgeContainer}>
                {topic.content.split(" ").map((text, key) => (
                  <TextEng
                    text={text}
                    key={key}
                    handleShowModal={handleShowModal}
                    topic={topic}
                  />
                ))}
              </Text>
            </>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.viewGame} onPress={onGame}>
        <Ionicons name="game-controller-outline" size={30} color="#fff">
          <Text style={{ marginLeft: 20 }}>Chơi game</Text>
        </Ionicons>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    overflow: "scroll",
    position: "relative",
    fontSize: 22,
  },
  textBig: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: "rgb(234, 144, 29)",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
  },
  content: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  content_text: {
    width: "100%",
    fontSize: 22,
    textAlign: "auto",
    lineHeight: 30,
    overflow: "scroll",
  },
  badgeContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 22,
  },
  textEng: {
    color: "blue",
    fontWeight: "bold",
  },
  hiddenTrans: {
    bottom: -100,
  },
  viewTrans: {
    padding: 20,
  },
  textTrans: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 100,
  },
  textShow: {
    fontSize: 22,
    textTransform: "capitalize",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  viewGame: {
    flex: 1,
    backgroundColor: "#ea911c",
    padding: 10,
    display: 'flex',
    alignItems: 'center'
  },
});
