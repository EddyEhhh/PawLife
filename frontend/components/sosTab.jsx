import React, { useState , useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import globalStyles from "../style/global"
import axiosInstance from "./util/axiosInstance";

const SosTab = ({ navigation }) => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance.get('/api/v1/vets')
      .catch(err => console.log(err))
      .then( (response) =>{
        setData(response.data)
        setLoading(false);
      }
      )
    };

    fetchData();
  }, []);

  return (
    <View style={globalStyles.container}>
    {loading && <View><Text>loading</Text></View>}
    {!loading && 
    <View>
      <ScrollView>
        <SafeAreaView style={styles.topContainer}>
          <TouchableOpacity>
            <Image source={require("../assets/sosPage-assets/Vector.png")} />
          </TouchableOpacity>
          <Text style={styles.title}>Emergency Pet Aid</Text>
          <Text style={styles.subtitle}>
            Instant Access to Nearest Vet Clinic Now!
          </Text>
          <Text style={styles.description}>
            Before scheduling an urgent visit to the vet, would you like to
            explore VetPal Assist?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../assets/sosPage-assets/lightbulb-logo.png")}
                resizeMode="contain"
                style={styles.buttonImage}
              />
              <Text style={styles.buttonText}>VetPal Assist</Text>
              <Text style={styles.buttonDescription}>
                Offering tailored triage solutions and expert advice at your
                fingertips.
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <SafeAreaView style={{ backgroundColor: "white" }}>
          {data.vets.map((item) => (
            <View style={styles.item} key={item._id}>
              <Text>{item._id}</Text>
            </View>
          ))}
        </SafeAreaView>
      </ScrollView>
    </View>
    }
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 70,
    height: 320,
    marginHorizontal: 25,
  },
  title: {
    color: "#164348",
    justifyContent: "center",
    fontFamily: "frank-black",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "900",
    lineHeight: 50,
    marginTop: 25,
  },
  subtitle: {
    color: "#164348",
    justifyContent: "center",
    fontFamily: "frank-regular",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: 18,
  },
  description: {
    color: "#164348",
    justifyContent: "center",
    fontFamily: "frank-regular",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: 18,
    marginTop: 15,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#FBE9F2",
    borderRadius: 15,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 14,
    paddingTop: 10,
  },
  buttonDescription: {
    paddingTop: 10,
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 10,
    textAlign: "center",
  },
  item: {
    marginTop: 18,
    padding: 30,
    backgroundColor: "#F2F2F2",
    marginHorizontal: 10,
    marginLeft: 25,
    marginRight: 25,
    height: 150,
    borderRadius: 30,
  },
});

export default SosTab;
