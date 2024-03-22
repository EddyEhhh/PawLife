import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import globalStyles from "../style/global";
import axiosInstance from "./util/axiosInstance";
import { useIsFocused } from "@react-navigation/native";

const PawTab = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchData = async () => {
    await axiosInstance
      .get("/api/v1/pets")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        setTimeout(() => {
          fetchData();
        }, 1000);
      });
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <SafeAreaView style={styles.topContainer}>
          <Image
            style={{ resizeMode: "contain" }}
            source={require("../assets/logo.png")}
          />
          <Text style={styles.title}>Pet Details</Text>
          <Text style={styles.subtitle}>
            Learn more about your furry friend.
          </Text>
        </SafeAreaView>

        <SafeAreaView style={{ backgroundColor: "white" }}>
          {loading && (
            <View style={styles.loadingContainer}>
              <Image
                style={{ width: 70, height: 70, alignSelf: "center" }}
                source={require("../assets/loading.gif")}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.infoHeader}>
                  What to Do in a Pet Emergency
                </Text>
                <Text style={styles.infoContent}>STAY CALM</Text>
                <Text style={styles.infoContent}>ASSESS THE PROBLEM</Text>
                <Text style={styles.infoContent}>BOOK AN EMERGENCY SLOT</Text>
                <Text style={styles.infoContent}>
                  CALM YOUR PET AS MUCH AS POSSIBLE
                </Text>
                <Text style={styles.infoContent}>
                  LOAD YOUR PET INTO HER CRATE FOR SAFE TRANSPORT
                </Text>
                <Text style={styles.infoContent}>DRIVE SAFELY TO THE VET</Text>
              </View>
            </View>
          )}
          {!loading && (
            <View>
              <View>
                {data.pets.map((item) => (
                  <View key={item._id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("PawEditScreen", {
                          petID: item._id,
                        })
                      }
                    >
                      <View style={styles.item}>
                        <View style={styles.topWrapper}>
                          <View style={styles.leftWrapper}>
                            <Image
                              source={{
                                uri: item.image_url,
                              }}
                              style={styles.petsImage} // Apply styles to the Image component if necessary
                            />
                          </View>
                          <View style={styles.rightWrapper}>
                            <View style={styles.innerLeftWrapper}>
                              <Text style={styles.petsName}>{item.name}</Text>
                              <Text style={styles.petsDetails}>
                                {item.species}
                                {" • "}
                                {item.breed}
                              </Text>
                            </View>
                            <View>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate("PawEditScreen", {
                                    petID: item._id,
                                  })
                                }
                              >
                                <Image source={require("../assets/edit.png")} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <View style={{ marginHorizontal: 25 }}>
                <TouchableOpacity
                  style={styles.addPetContainer}
                  onPress={() => navigation.navigate("PawAddScreen")}
                >
                  <Image source={require("../assets/add.png")} />
                  <Text style={styles.addPetText}>Add Pet</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={{ height: 20 }} />
          <View
            style={{ flexGrow: 1, height: "100%", backgroundColor: "#fff" }}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 60,
    height: 140,
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
    marginTop: 15,
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
  loadingContainer: {
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 25,
  },
  infoContainer: {
    alignItems: "center",
    padding: 10,
    marginTop: 15,
    borderRadius: 25,
    backgroundColor: "#E0FCF9",
  },
  infoHeader: {
    fontFamily: "frank-bold",
    color: "#164348",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  infoContent: {
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 14,
    marginBottom: 3,
    padding: 5,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#164348",
  },
  item: {
    display: "flex",
    marginTop: 18,
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#F2F2F2",
    marginHorizontal: 15,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  topWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftWrapper: {
    marginRight: 20,
  },
  petsImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    resizeMode: "cover",
  },
  petsName: {
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 16,
  },
  petsDetails: {
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 12,
  },
  rightWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  innerLeftWrapper: {
    flex: 1,
  },
  addPetContainer: {
    marginTop: 25,
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  addPetText: {
    marginLeft: 10,
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 12,
  },
});
export default PawTab;
