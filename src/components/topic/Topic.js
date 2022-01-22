import React, { useState } from "react";
import {
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
import data from "../../../assets/documents/topic1/topic1.json";
import { Overlay } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";

const TextEng = ({ text, handleShowModal }) => {
  if (text[0] === "(") {
    const number = Number.parseInt(text.substring(1));
    const result = data.transfers.find((obj) => obj.id == number);
    return (
      <Text
        style={[styles.content_text, styles.textEng]}
        onPress={() => handleShowModal(result)}
      >
        {result.es + " "}
      </Text>
    );
  }
  return <Text style={styles.content_text}>{text + " "}</Text>;
};
export default function Topic() {
  const [textTrans, setTextTrans] = useState("");
  const handleShowModal = (objText) => {
    setModalVisible(true);
    setTextTrans(objText);
  };
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Overlay
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.viewTrans}>
            <Text>
              <View style={styles.flexCenter}>
                <Ionicons
                  name="volume-high-outline"
                  size={40}
                  color="#4F8EF7"
                  style={styles.flexCenter}
                />
                <Text style={styles.textShow}>{textTrans.es}</Text>
                <View
                  style={{
                    width: 200,
                    borderBottomColor: "#cbcaca",
                    borderBottomWidth: 1,
                    marginTop: 20,
                    marginBottom: 20
                  }}
                />
                <Text style={styles.textShow}>{textTrans.vi}</Text>
              </View>
            </Text>
          </View>
        </Overlay>

        <View style={styles.content}>
          <Text style={styles.title}>{data.title.split(":")[0]}</Text>
          <Text style={styles.title}>{data.title.split(":")[1]}</Text>
          <Text style={styles.badgeContainer}>
            {data.content.split(" ").map((text, key) => (
              <TextEng
                text={text}
                key={key}
                handleShowModal={handleShowModal}
              />
            ))}
          </Text>
        </View>
      </View>
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
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: "rgb(234, 144, 29)",
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
});
