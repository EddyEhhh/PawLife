import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import globalStyles from "../style/global";
import axiosInstance from "./util/axiosInstance";

const BookingTab = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get("/api/v1/vets")
        .catch((err) => console.log(err))
        .then((response) => {
          setData(response.data);
          setFilteredData(response.data.vets);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredClinics = data.vets.filter((clinic) =>
      clinic.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredClinics);
  };

  return (
    <View style={globalStyles.container}>
      {loading && (
        <View>
          <Text>loading</Text>
        </View>
      )}
      {!loading && (
        <View style={globalStyles.container}>
          <ScrollView scrollIndicatorInsets={{ right: 1 }}>
            <SafeAreaView style={styles.topContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require("../assets/sosPage-assets/back-icon.png")}
                />
              </TouchableOpacity>
              <Text style={styles.title}>PawsBooking</Text>
              <Text style={styles.subtitle}>
                Make advance booking with your trusted veterinarians
              </Text>
            </SafeAreaView>

            <SafeAreaView style={{ backgroundColor: "white" }}>
              <View style={styles.SectionStyle}>
                <Image
                  source={require("../assets/paws.png")} //Change your icon image here
                  style={styles.ImageStyle}
                />

                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for clinics or vets..."
                  clearButtonMode="while-editing"
                  onChangeText={(query) => handleSearch(query)}
                />
              </View>

              {filteredData.map((item) => (
                <View key={item._id}>
                  <View style={styles.item}>
                    <View style={styles.topWrapper}>
                      <View style={styles.leftWrapper}>
                        <Image
                          source={{
                            uri: item.image_url,
                          }}
                          style={styles.clinicsLogo} // Apply styles to the Image component if necessary
                        />
                      </View>
                      <View style={styles.rightWrapper}>
                        <View style={styles.innerLeftWrapper}>
                          <Text style={styles.clinicsName}>{item.name}</Text>
                          <Text style={styles.clinicsAddress}>
                            {item.location.street} {"\n"}
                            {item.location.country}
                            {item.location.postal_code}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.time}>Fee: $90</Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.clincisDetails}>
                        Pets Treated: Dog, Cat, Guinea Pig, Reptile, Hamster,
                        Rat, Tortoise, Rabbit
                      </Text>
                      <Text style={styles.clincisDetails}>
                        Speciality(s): Ophthalmology, Canine Medicine,
                        Cardiology
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.scheduleButtonContainer}
                      onPress={() => {
                        navigation.navigate("BookingDetailsScreen", {
                          vetID: item._id,
                        });
                      }}
                    >
                      <Text style={styles.scheduleButtonTitle}>Schedule</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <View style={{ height: 20 }} />
              <View
                style={{ flexGrow: 1, height: "100%", backgroundColor: "#fff" }}
              />
            </SafeAreaView>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 64,
    height: 120,
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
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 20,
    fontFamily: "frank-regular",
    color: "#5A7A7D",
    fontSize: 14,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ImageStyle: {
    alignItems: "center",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#5A7A7D",
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
  clinicsLogo: {
    height: 60,
    width: 60,
    borderRadius: 10,
    resizeMode: "contain",
  },
  clinicsName: {
    fontFamily: "frank-regular",
    color: "#000",
    fontSize: 12,
  },
  clinicsAddress: {
    marginTop: 20,
    fontFamily: "frank-regular",
    color: "#3B8989",
    fontSize: 12,
  },
  rightWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  innerLeftWrapper: {
    flex: 1,
  },
  time: {
    fontFamily: "frank-regular",
    color: "#000",
    fontSize: 14,
  },
  clincisDetails: {
    marginTop: 10,
    fontFamily: "frank-light",
    color: "#000",
    fontSize: 12,
  },
  scheduleButtonContainer: {
    marginTop: 15,
    paddingVertical: 15,
    backgroundColor: "#E0FCF9",
    borderRadius: 18,
    alignItems: "center",
    width: 230,
  },
  scheduleButtonTitle: {
    fontFamily: "frank-bold",
    color: "#164348",
    fontSize: 14,
  },
});

export default BookingTab;
