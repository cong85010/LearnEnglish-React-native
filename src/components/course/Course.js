import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export function Course({ course, navigation, route = "Danh sách" }) {
  const { id, image, title } = course;
  const onCourse = () => navigation.navigate(route, { id: id });
  return (
    <TouchableOpacity style={styles.course} onPress={onCourse}>
      <Image source={image} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  course: {
    width: "90%",
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    margin: 20,
    marginBottom: 0,
    borderRadius: 25,
    borderColor: '#BBB7B7',
    borderStyle: "solid",
    borderWidth: 1
  },
  image: {
    width: "50px",
    height: "50px",
  },
  text: {
    marginLeft: 22,
    fontSize: 22,
    fontWeight: "bold",
    color: "#ea901d",
  },
});
