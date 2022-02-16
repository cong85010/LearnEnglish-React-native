import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import img1 from "./images/book.png";
import Topic from "../topic/Topic";
import { Course } from "../course/Course";
import { createStackNavigator } from "@react-navigation/stack";
import data from "../../../assets/documents/topic1/topic.json";
import Game from "../games/Game";
import Score from "../score/Score";
const arrCourse = [
  {
    image: img1,
    title: "Học 1500 từ vựng theo người Do Thái",
    id: 1,
    type: "topic",
  },
  {
    image: img1,
    title: "Học 100 từ vựng theo người Do Thái",
    id: 2,
    type: "songs",
  },
];
const arrCourse2 = [
  {
    image: img1,
    title: "Học 1500 từ vựng theo người Do Thái",
    id: 1,
  },
  {
    image: img1,
    title: "Học 1500 từ vựng theo người Do Thái",
    id: 2,
  },
];

export const Courses = ({ route, navigation }) => {
  const { type } = route.params;
  return (
    <ScrollView>
      {data[type]?.map((course, key) => (
        <Course
          course={course}
          key={key}
          navigation={navigation}
          route="Chủ đề"
        />
      ))}
    </ScrollView>
  );
};
export const MainHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageHome}
        source={{
          uri: "https://media.istockphoto.com/vectors/english-vector-id1047570732?k=20&m=1047570732&s=612x612&w=0&h=fcgzlrNrq_hws1ykrLSpyBVZoIGr54EUueD6WAEVW0c=",
        }}
      />
      <ScrollView>
        {arrCourse.map((course, key) => (
          <Course course={course} key={key} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();
export function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Trang chủ">
      <Stack.Screen name="Trang chủ" component={MainHome} />
      <Stack.Screen name="Danh sách" component={Courses} />
      <Stack.Screen name="Chủ đề" component={Topic} />
      <Stack.Screen name="Chơi game" component={Game} />
      <Stack.Screen name="Điểm" component={Score} />
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imageHome: {
    width: "100%",
    height: "50%",
  },
  course: {
    width: "90%",
    flexDirection: "row",
    padding: "20px",
    alignItems: "center",
    margin: "20px",
    marginBottom: "0",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.41,
    shadowRadius: 6.11,

    elevation: 10,
  },
  image: {
    width: "50px",
    height: "50px",
  },
  text: {
    marginLeft: "20px",
    fontSize: 22,
    fontWeight: "bold",
    color: "#ea901d",
  },
});
