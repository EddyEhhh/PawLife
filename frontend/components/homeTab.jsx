import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Platform,
  Linking,
  Modal,
} from "react-native";
import globalStyles from "../style/global";
import axiosInstance from "./util/axiosInstance";
import { useIsFocused } from "@react-navigation/native";

const HomeTab = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [urgentAppointmentVisibile, setUrgentAppointmentVisibile] =
    useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchData = async () => {
    await axiosInstance
      .get("/api/v1/appointments/emergency")
      .catch((err) => console.log(err))
      .then((response) => {
        if (!Object.keys(response.data.appointments).length) {
          setUrgentAppointmentVisibile(false);
        } else {
          setUrgentAppointmentVisibile(true);
          setData(response.data);
        }
        setLoading(false);
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

  const directToMap = (item) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${item.vet_id.name}, ${item.vet_id.location.street}, ${item.vet_id.location.country}`,
      android: `geo:0,0?q=${item.vet_id.name}, ${item.vet_id.location.street}, ${item.vet_id.location.country}`,
    });
    Linking.openURL(url);
  };

  const toggleModal = (item) => {
    setModalVisible(!isModalVisible);
    setSelectedItem(item);
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
          <ScrollView>
            <SafeAreaView style={styles.topContainer}>
              <Image
                style={{ resizeMode: "contain" }}
                source={require("../assets/logo.png")}
              />
              <Text style={styles.h1}>Emergency Pet Aid</Text>
              <Text style={styles.h2}>at Your Fingertips</Text>
              <Text style={styles.h3}>
                Find Nearby Veterinary Care in Emergency Situations: Your Pet's
                Lifeline!
              </Text>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate("SOS")}
              >
                <Text style={styles.buttonTitle}>Locate Nearest Vets Now!</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.bottomContainer}>
              <Text style={styles.h4}>Upcoming Emergency Appointment</Text>
              {!urgentAppointmentVisibile && (
                <TouchableOpacity style={styles.apptContainer} disabled={true}>
                  <Text style={styles.apptObject}>
                    You have no upcoming appointment currently...
                  </Text>
                </TouchableOpacity>
              )}
              {urgentAppointmentVisibile && (
                <View>
                  {data.appointments.map((item) => (
                    <View key={item._id}>
                      <View style={styles.item}>
                        <View style={styles.topWrapper}>
                          <View style={styles.leftWrapper}>
                            <Image
                              source={{
                                uri: item.vet_id.image_url,
                              }}
                              style={styles.clinicsLogo} // Apply styles to the Image component if necessary
                            />
                          </View>
                          <View style={styles.rightWrapper}>
                            <View
                              style={[
                                styles.innerLeftWrapper,
                                { marginRight: 15 },
                              ]}
                            >
                              <Text style={styles.clinicsName}>
                                {item.vet_id.name}
                              </Text>
                              <Text style={styles.clinicsAddress}>
                                {item.vet_id.location.street} {"\n"}
                                {item.vet_id.location.country}
                                {item.vet_id.location.postal_code}
                              </Text>
                              <View
                                style={[styles.rightWrapper, { marginTop: 10 }]}
                              >
                                <View style={styles.innerLeftWrapper}>
                                  <Text style={styles.time}>
                                    {CovertTime(item.start_at)}
                                  </Text>
                                </View>
                                <View>
                                  <Text style={styles.dogDetails}>Gigi</Text>
                                  <Text style={styles.dogDetails}>
                                    {" "}
                                    {item.pet_id.species}
                                    {" • "}
                                    {item.pet_id.breed}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  toggleModal();
                                }}
                              >
                                <Image
                                  style={{ resizeMode: "contain" }}
                                  source={require("../assets/homePage-assets/calendar-cancel.png")}
                                />
                              </TouchableOpacity>
                              <View style={styles.distanceWrapper}>
                                <TouchableOpacity
                                  onPress={() => directToMap(item)}
                                >
                                  <Image
                                    style={{ resizeMode: "contain" }}
                                    source={require("../assets/homePage-assets/direction.png")}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
              <Text style={styles.h4}>Feature lists</Text>
              <View style={styles.featureContainer}>
                <TouchableOpacity
                  style={[styles.featureBox, { backgroundColor: "#FBE9F2" }]}
                  onPress={() => navigation.navigate("VetPalScreen")}
                >
                  <Image
                    style={{ resizeMode: "contain" }}
                    source={require("../assets/homePage-assets/lightbulb.png")}
                  />
                  <Text style={styles.featureObject}>VetPal Assist</Text>
                  <Text style={styles.featureDesc}>
                    Offering tailored triage solutions and expert advice at your
                    fingertips.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.featureBox, { backgroundColor: "#E0FCF9" }]}
                  onPress={() => navigation.navigate("TeleScreen")}
                >
                  <Image
                    style={{ resizeMode: "contain" }}
                    source={require("../assets/homePage-assets/onlinemedical.png")}
                  />
                  <Text style={styles.featureObject}>Teleconsultation</Text>
                  <Text style={styles.featureDesc}>
                    Connect with trusted veterinarians through live video
                    consultations
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.featureBox, { backgroundColor: "#E8D1CF" }]}
                  onPress={() => navigation.navigate("BookingScreen")}
                >
                  <Image
                    style={{ resizeMode: "contain" }}
                    source={require("../assets/homePage-assets/onlinemedical.png")}
                  />
                  <Text style={styles.featureObject}>PawsBooking</Text>
                  <Text style={styles.featureDesc}>
                    Schedule appointment directly from the Clinic Directory,
                    keeping your pet's healthcare on track
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: 20 }} />
              <View
                style={{ flexGrow: 1, height: "100%", backgroundColor: "#fff" }}
              />
            </SafeAreaView>
          </ScrollView>
          {selectedItem && (
            <Modal
              transparent={true}
              visible={isModalVisible}
              onBackdropPress={() => setModalVisible(false)}
            >
              <View
                style={styles.modalContainer}
                backgroundColor="rgba(0, 0, 0, 0.2)"
              >
                <View style={styles.modalBody}>
                  <View style={styles.TopPressContainer}>
                    <View style={styles.topWrapper}>
                      <View style={styles.leftWrapper}>
                        <Image
                          source={{
                            uri: selectedItem.vet_id.image_url,
                          }}
                          style={styles.clinicsLogo} // Apply styles to the Image component if necessary
                        />
                      </View>
                      <View style={styles.rightWrapper}>
                        <View style={styles.innerLeftWrapper}>
                          <Text style={styles.clinicsName}>
                            {selectedItem.vet_id.name}
                          </Text>
                          <Text style={styles.clinicsAddress}>
                            {selectedItem.vet_id.location.street} {"\n"}
                            {selectedItem.vet_id.location.country}
                            {selectedItem.vet_id.location.postal_code}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.modalTime}>1:45 AM</Text>
                          <View style={styles.modalDistanceWrapper}>
                            <View>
                              <Text style={styles.modalDistance}>25 min</Text>
                              <Text style={styles.modalDistance}>5 km</Text>
                            </View>
                            <View style={styles.modalDistanceRightWrapper}>
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
                      Are you sure you want to cancel the emergency appointment?
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
                        { backgroundColor: "#D45C57" },
                      ]}
                    >
                      <View>
                        <Text style={styles.scheduleButtonTitle}>Confirm</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    marginHorizontal: 25,
    marginTop: 60,
    height: 300,
  },
  bottomContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  h1: {
    color: "#164348",
    justifyContent: "center",
    fontFamily: "frank-black",
    fontSize: 36,
    marginTop: 25,
  },
  h2: {
    color: "#164348",
    justifyContent: "center",
    fontFamily: "arapey-italic",
    fontSize: 24,
  },
  h3: {
    color: "#164348",
    justifyContent: "center",
    fontFamily: "frank-regular",
    fontSize: 16,
    paddingTop: 25,
  },
  buttonContainer: {
    marginTop: 20,
    marginRight: 40,
    paddingVertical: 20,
    backgroundColor: "#F05D5E",
    borderRadius: 18,
    alignItems: "center",
    width: 230,
  },
  buttonTitle: {
    fontFamily: "frank-bold",
    color: "#fff",
    fontSize: 16,
  },
  h4: {
    color: "#000",
    justifyContent: "center",
    fontFamily: "frank-medium",
    fontSize: 16,
    marginTop: 25,
  },
  apptContainer: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  apptObject: {
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 14,
  },
  item: {
    display: "flex",
    marginTop: 18,
    padding: 15,
    backgroundColor: "#F2F2F2",
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
    marginRight: 15,
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
    marginTop: 10,
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
    fontSize: 13,
    position: "absolute",
    bottom: 0,
  },
  dogDetails: {
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 12,
    right: 0,
    alignSelf: "flex-end",
  },
  distanceWrapper: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
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
  featureContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  featureBox: {
    flexBasis: "48%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    marginVertical: 5,
    backgroundColor: "#F2F2F2",
    borderRadius: 18,
    alignItems: "center",
    width: 245,
    height: 140,
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  featureObject: {
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 14,
    paddingTop: 10,
  },
  featureDesc: {
    paddingTop: 10,
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 10,
    textAlign: "center",
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
    marginTop: -55,
    marginHorizontal: "9%",
    borderRadius: 20,
    height: "28%",
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTime: {
    fontFamily: "frank-regular",
    color: "#000",
    fontSize: 14,
  },
  modalDistanceWrapper: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
  modalDistanceRightWrapper: {
    flex: 1,
  },
  modalDistance: {
    fontFamily: "arapey-regular",
    color: "#3B8989",
    fontSize: 14,
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
export default HomeTab;
