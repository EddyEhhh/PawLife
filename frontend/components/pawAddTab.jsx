import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import globalStyles from "../style/global";

const mockPetData = {
  _id: 2,
  name: "Abby",
  species: "Dog",
  breed: "Poodle",
  imageURL:
    "https://www.purina.com.sg/sites/default/files/styles/ttt_image_original/public/2021-02/BREED%20Hero%20Desktop_0050_poodle_toy.webp?itok=7Y1anr9w",
};

const PawAddTab = ({ navigation }) => {
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
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.backIconContainer}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require("../assets/sosPage-assets/back-icon.png")}
              />
              <Text style={styles.backIconText}>{mockPetData.name}</Text>
            </TouchableOpacity>
            <View style={styles.petsImageContainer}>
              <Image
                source={{
                  uri: mockPetData.imageURL,
                }}
                style={styles.petsImage} // Apply styles to the Image component if necessary
              />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Name"
              clearButtonMode="never"
              value={mockPetData.name}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Name"
              clearButtonMode="never"
              value={mockPetData.name}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Name"
              clearButtonMode="never"
              value={mockPetData.name}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Name"
              clearButtonMode="never"
              value={mockPetData.name}
            />
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
  bottomContainer: {
    marginHorizontal: 25,
    marginTop: 25,
  },
  backIconContainer: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically in the center
  },
  backIconText: {
    marginLeft: 15,
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 18,
  },
  petsImageContainer: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    marginVertical: 20,
  },
  petsImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    resizeMode: "cover",
    alignSelf: "center",
  },
  searchInput: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 20,
    fontFamily: "frank-regular",
    color: "#5A7A7D",
    fontSize: 14,
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
export default PawAddTab;
