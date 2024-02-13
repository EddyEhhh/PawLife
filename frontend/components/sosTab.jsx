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

const SosTab = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get("/api/v1/vets")
        .catch((err) => console.log(err))
        .then((response) => {
          setData(response.data);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={globalStyles.container}>
      {loading && (
        <View>
          <Text>loading</Text>
        </View>
      )}
      {!loading && (
        <View>
          <ScrollView>
            <SafeAreaView style={styles.topContainer}>
              <TouchableOpacity>
                <Image
                  source={require("../assets/sosPage-assets/back-icon.png")}
                />
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
                <>
                  <Modal
                    transparent={true}
                    visible={isModalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                  >
                    <View
                      style={styles.modalContainer}
                      backgroundColor="rgba(0,0,0,0.1)"
                    >
                      <View style={styles.modalBody}>
                        <View style={styles.TopPressContainer}>
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
                                <Text style={styles.clinicsName}>
                                  {item.name}
                                </Text>
                                <Text style={styles.clinicsAddress}>
                                  {item.location.street} {"\n"}
                                  {item.location.country}
                                  {item.location.postal_code}
                                </Text>
                              </View>
                              <View>
                                <Text style={styles.time}>1:45 AM</Text>
                                <View style={styles.distanceWrapper}>
                                  <View>
                                    <Text style={styles.distance}>25 min</Text>
                                    <Text style={styles.distance}>5 km</Text>
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
                            Are you sure you want to schedule an urgent visit
                            for your pet?
                          </Text>
                          <TouchableOpacity
                            style={[
                              styles.ModalCancelButton,
                              { backgroundColor: "#A5A5A5" },
                            ]}
                            onPress={toggleModal}
                          >
                            <View>
                              <Text style={styles.scheduleButtonTitle}>
                                Cancel
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.ModalScheduleButton,
                              { backgroundColor: "#F05D5E" },
                            ]}
                          >
                            <View>
                              <Text style={styles.scheduleButtonTitle}>
                                Schedule
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>

                  <View style={styles.item} key={item._id}>
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
                          <Text style={styles.time}>1:45 AM</Text>
                          <View style={styles.distanceWrapper}>
                            <View>
                              <Text style={styles.distance}>25 min</Text>
                              <Text style={styles.distance}>5 km</Text>
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
                      onPress={toggleModal}
                    >
                      <Text style={styles.scheduleButtonTitle}>
                        Schedule Urgent Visit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ))}
            </SafeAreaView>
          </ScrollView>
        </View>
      )}
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
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  modalBody: {
    display: "flex",
    backgroundColor: "#D9FBF7",
    marginTop: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  TopPressContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  BottomPressContainer: {
    backgroundColor: "#F2F2F2",
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
    marginVertical: 5,
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
    marginVertical: 5,
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
