import React from "react";
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

const mockPetsData = [
  {
    _id: 1,
    name: "Gigi",
    species: "Dog",
    breed: "Shih Tzu",
    imageURL:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVcpEF_CefMEBZr08-Y2Fj1fpedpf3PXQyiDphvQWcA6rJvdGh",
  },
  {
    _id: 2,
    name: "Abby",
    species: "Dog",
    breed: "Poodle",
    imageURL:
      "https://www.purina.com.sg/sites/default/files/styles/ttt_image_original/public/2021-02/BREED%20Hero%20Desktop_0050_poodle_toy.webp?itok=7Y1anr9w",
  },
];

const PawTab = ({ navigation }) => {
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
          <View>
            {mockPetsData.map((item) => (
              <View key={item._id}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("PawEditScreen")}
                >
                  <View style={styles.item}>
                    <View style={styles.topWrapper}>
                      <View style={styles.leftWrapper}>
                        <Image
                          source={{
                            uri: item.imageURL,
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
                          <TouchableOpacity>
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
