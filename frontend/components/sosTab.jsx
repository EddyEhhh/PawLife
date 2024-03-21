import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import Modal from "react-native-modal";
import globalStyles from "../style/global";
import axiosInstance from "./util/axiosInstance";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";

const SosTab = ({ navigation }) => {
  const [data, setData] = useState({});
  const [petData, setPetData] = useState({});
  const [petLoading, setPetLoading] = useState(true);
  const [emergencyLoading, setEmergencyLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [clinicSelectionVisible, setClinicSelectionVisible] = useState(false);
  const [petSelectionVisible, setPetSelectionVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    global.address &&
      setCurrentLocation(
        global.address[0].streetNumber +
          " " +
          global.address[0].street +
          ", " +
          global.address[0].country +
          " " +
          global.address[0].postalCode
      );
    // setSelectedPet(mockPetsData[0]);
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchData = async () => {
    var getData = {
      longitude: global.currentLocation.coords.longitude,
      latitude: global.currentLocation.coords.latitude,
    };
    const config = {
      headers: { "Content-Type": "application/json" },
      params: getData,
    };
    await axiosInstance
      .get("/api/v1/pets")
      .catch((err) => console.log(err))
      .then((response) => {
        setPetData(response.data);
        setPetLoading(false);
      });
    await axiosInstance
      .get("/api/v1/emergency", config)
      .catch((err) => console.log(err))
      .then((response) => {
        setData(response.data);
        setEmergencyLoading(false);
      });
  };

  const toggleModal = (item) => {
    setSelectedItem(item);
    setModalVisible(!isModalVisible);
  };

  const confirmedModalClick = async (vet_id, appointmentTime) => {
    setModalVisible(!isModalVisible);
    await axiosInstance
      .post("/api/v1/emergency", {
        params: {
          pet_id: selectedPet._id,
          vet_id: vet_id,
          appointment_time: appointmentTime,
          appointment_duration: 30,
        },
      })
      .then((response) => {
        console.log("Appointment Confirmed");
        fetchData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const CovertTime = (datetime) => {
    var utcSeconds = datetime;
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    var options = {
      timeZone: "Asia/Singapore",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return d.toLocaleString("en-US", options);
  };

  return (
    <View style={globalStyles.container}>
      {(petLoading || emergencyLoading) && (
        <View>
          <Text>loading</Text>
        </View>
      )}
      {!petLoading && !emergencyLoading && (
        <View style={globalStyles.container}>
          <ScrollView>
            <SafeAreaView style={styles.topContainer}>
              <Image
                style={{ resizeMode: "contain" }}
                source={require("../assets/logo.png")}
              />
              {petSelectionVisible && (
                <TouchableOpacity
                  style={styles.selectedPetContainer}
                  onPress={() => {
                    setClinicSelectionVisible(false);
                  }}
                >
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.petsName}>{selectedPet.name}</Text>
                    <Text style={styles.selectedPetsDetails}>
                      {" "}
                      {selectedPet.species}
                      {" • "}
                      {selectedPet.breed}
                    </Text>
                  </View>
                  <Image
                    source={{
                      uri: selectedPet.image_url,
                    }}
                    style={styles.selectedPetsImage} // Apply styles to the Image component if necessary
                  />
                </TouchableOpacity>
              )}
              <Text style={styles.title}>Emergency Pet Aid</Text>
              <Text style={styles.subtitle}>
                Instant Access to Nearest Vet Clinic Now!
              </Text>
              <Text style={styles.description}>
                Before scheduling an urgent visit to the vet, would you like to
                explore VetPal Assist?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("VetPalScreen");
                    global.navFromSos = true;
                  }}
                >
                  <Image
                    source={require("../assets/sosPage-assets/lightbulb-logo.png")}
                    resizeMode="contain"
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
              <View style={{ marginHorizontal: 25, marginTop: 25 }}>
                <View style={styles.locationContainer}>
                  <Image
                    style={styles.locationLogo}
                    source={require("../assets/sosPage-assets/location.png")}
                    resizeMode="contain"
                  />
                  <Text style={styles.currentLocation}>{currentLocation}</Text>
                </View>
              </View>
              {!clinicSelectionVisible && (
                <View>
                  <Text style={styles.petSelectionTitle}>
                    Select your pet for emergency vet help.
                  </Text>
                  {petData.pets &&
                    petData.pets.map((item) => (
                      <View key={item._id}>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedPet(item);
                            setPetSelectionVisible(true);
                            setClinicSelectionVisible(true);
                          }}
                        >
                          <View style={styles.petItem}>
                            <View style={styles.petTopWrapper}>
                              <View style={styles.petLeftWrapper}>
                                <Image
                                  source={{
                                    uri: item.image_url,
                                  }}
                                  style={styles.petsImage} // Apply styles to the Image component if necessary
                                />
                              </View>
                              <View style={styles.petRightWrapper}>
                                <View style={styles.petInnerLeftWrapper}>
                                  <Text style={styles.petsName}>
                                    {item.name}
                                  </Text>
                                  <Text style={styles.petsDetails}>
                                    {item.species}
                                    {" • "}
                                    {item.breed}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ))}
                </View>
              )}
              {clinicSelectionVisible && (
                <View>
                  {data.vets &&
                    data.vets.map((item) => (
                      <View key={item.vet._id}>
                        <View style={styles.item}>
                          <View style={styles.topWrapper}>
                            <View style={styles.leftWrapper}>
                              <Image
                                source={{
                                  uri: item.vet.image_url,
                                }}
                                style={styles.clinicsLogo} // Apply styles to the Image component if necessary
                              />
                            </View>
                            <View style={styles.rightWrapper}>
                              <View style={styles.innerLeftWrapper}>
                                <Text style={styles.clinicsName}>
                                  {item.vet.name}
                                </Text>
                                <Text style={styles.clinicsAddress}>
                                  {item.vet.location.street} {"\n"}
                                  {item.vet.location.country}
                                  {item.vet.location.postal_code}
                                </Text>
                              </View>
                              <View>
                                <Text style={styles.time}>
                                  {CovertTime(item.next_available)}
                                </Text>
                                <View style={styles.distanceWrapper}>
                                  <View>
                                    <Text style={styles.distance}>
                                      {
                                        item.distance_matrix.rows[0].elements[0]
                                          .duration.text
                                      }
                                    </Text>
                                    <Text style={styles.distance}>
                                      {
                                        item.distance_matrix.rows[0].elements[0]
                                          .distance.text
                                      }
                                    </Text>
                                  </View>
                                  <View style={styles.distanceRightWrapper}>
                                    <Image
                                      source={require("../assets/sosPage-assets/car-logo.png")}
                                      style={styles.carLogo}
                                    />
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          <TouchableOpacity
                            style={styles.scheduleButtonContainer}
                            onPress={() => {
                              toggleModal(item);
                            }}
                          >
                            <Text style={styles.scheduleButtonTitle}>
                              Schedule Urgent Visit
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                </View>
              )}
              <View style={{ height: 20 }} />
              <View
                style={{
                  flexGrow: 1,
                  height: "100%",
                  backgroundColor: "#fff",
                }}
              />
            </SafeAreaView>
          </ScrollView>
          <Modal
            transparent={true}
            visible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
          >
            <View
              style={styles.modalContainer}
              backgroundColor="rgba(0, 0, 0, 0.2)"
            >
              {selectedItem && (
                <View style={styles.modalBody}>
                  <View style={styles.TopPressContainer}>
                    <View style={styles.topWrapper}>
                      <View style={styles.leftWrapper}>
                        <Image
                          source={{
                            uri: selectedItem.vet.image_url,
                          }}
                          style={styles.clinicsLogo} // Apply styles to the Image component if necessary
                        />
                      </View>
                      <View style={styles.rightWrapper}>
                        <View style={styles.innerLeftWrapper}>
                          <Text style={styles.clinicsName}>
                            {selectedItem.vet.name}
                          </Text>
                          <Text style={styles.clinicsAddress}>
                            {selectedItem.vet.location.street} {"\n"}
                            {selectedItem.vet.location.country}
                            {selectedItem.vet.location.postal_code}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.time}>
                            {CovertTime(selectedItem.next_available)}
                          </Text>
                          <View style={styles.distanceWrapper}>
                            <View>
                              <Text style={styles.distance}>
                                {
                                  selectedItem.distance_matrix.rows[0]
                                    .elements[0].duration.text
                                }
                              </Text>
                              <Text style={styles.distance}>
                                {
                                  selectedItem.distance_matrix.rows[0]
                                    .elements[0].distance.text
                                }
                              </Text>
                            </View>
                            <View style={styles.distanceRightWrapper}>
                              <Image
                                source={require("../assets/sosPage-assets/car-logo.png")}
                                style={styles.carLogo}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.BottomPressContainer}>
                    <Text style={styles.Modalsubtitle}>
                      Are you sure you want to schedule an urgent visit for your
                      pet?
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.ModalCancelButton,
                        { backgroundColor: "#A5A5A5" },
                      ]}
                      onPress={() => setModalVisible(false)}
                    >
                      <View>
                        <Text style={styles.scheduleButtonTitle}>Cancel</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.ModalScheduleButton,
                        { backgroundColor: "#F05D5E" },
                      ]}
                      onPress={() =>
                        confirmedModalClick(
                          selectedItem.vet._id,
                          selectedItem.next_available
                        )
                      }
                    >
                      <View>
                        <Text style={styles.scheduleButtonTitle}>Schedule</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 60,
    height: 335,
    marginHorizontal: 25,
  },
  selectedPetContainer: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
  },
  selectedPetsDetails: {
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 12,
  },
  selectedPetsImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
    resizeMode: "cover",
    marginLeft: 5,
  },
  title: {
    color: "#164348",
    justifyContent: "center",
    fontFamily: "frank-black",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "900",
    lineHeight: 50,
    marginTop: 20,
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
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
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
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationLogo: {
    marginRight: 10,
  },
  currentLocation: {
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 12,
  },
  petSelectionTitle: {
    marginHorizontal: 25,
    fontFamily: "frank-medium",
    color: "#164348",
    fontSize: 16,
    marginTop: 20,
  },
  petItem: {
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
  petTopWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  petLeftWrapper: {
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
  petRightWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  petInnerLeftWrapper: {
    flex: 1,
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
    paddingLeft: 5,
  },
  distanceWrapper: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    paddingLeft: 15,
  },
  distanceRightWrapper: {
    flex: 1,
  },
  distance: {
    fontFamily: "arapey-regular",
    color: "#3B8989",
    fontSize: 14,
  },
  carLogo: {
    position: "absolute",
    bottom: 0,
  },
  scheduleButtonContainer: {
    marginTop: 15,
    paddingVertical: 15,
    backgroundColor: "#F05D5E",
    borderRadius: 18,
    alignItems: "center",
    width: 230,
  },
  scheduleButtonTitle: {
    fontFamily: "frank-bold",
    color: "#fff",
    fontSize: 14,
  },
  modalContainer: {
    left: -20,
    bottom: 0,
    width: "120%",
    height: "110%",
    alignContent: "center",
    justifyContent: "center",
  },
  modalBody: {
    display: "flex",
    backgroundColor: "#F2F2F2",
    marginTop: 10,
    marginHorizontal: "5%",
    borderRadius: 20,
    height: "28%",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopPressContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  BottomPressContainer: {
    marginTop: 0,
    backgroundColor: "#FFFFFF",
    flex: 1.2,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  ModalCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 7,
    marginTop: 15,
    borderRadius: 18,
    alignItems: "center",
    width: 100,
    height: 50,
    justifyContent: "center",
  },
  ModalScheduleButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 7,
    marginTop: 15,
    borderRadius: 18,
    alignItems: "center",
    width: 150,
    height: 50,
    justifyContent: "center",
  },
  Modalsubtitle: {
    paddingHorizontal: 40,
    fontFamily: "frank-regular",
    color: "#000",
    fontSize: 15,
    textAlign: "center",
  },
});

export default SosTab;
