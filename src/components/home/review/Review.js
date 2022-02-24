import React, { useState } from "react";
import { View } from "react-native";
import data from "../../../../assets/documents/topic1/topic.json";

export default function Review({ route }) {
  console.log(route);
  const { id } = route.params;
  const [arr, setArr] = useState(data.topic[id - 1].transfers);
  console.log(arr);

  return <View></View>;
}
