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

const PawTab = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get("/api/v1/pets")
        .catch((err) => console.log(err))
        .then((response) => {
          setData(response.data);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <View style={globalStyles.container}>
      {loading && (
        <View>
          <Text>loading</Text>
        </View>
      )}
      {!loading && (
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
            <View>
              {data.pets.map((item) => (
                <View key={item._id}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PawEditScreen", { petID: item._id })
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
            <View style={{ height: 20 }} />
            <View
              style={{ flexGrow: 1, height: "100%", backgroundColor: "#fff" }}
            />
          </SafeAreaView>
        </ScrollView>
      )}
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
