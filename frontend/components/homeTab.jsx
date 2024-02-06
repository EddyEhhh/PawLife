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

const HomeTab = ({ navigation }) => {
  return (
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
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonTitle}>Locate Nearest Vets Now!</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.bottomContainer}>
          <Text style={styles.h4}>Upcoming Emergency Appointment</Text>
          <TouchableOpacity style={styles.apptContainer} disabled={true}>
            <Text style={styles.apptObject}>
              You have no upcoming appointment currently...
            </Text>
          </TouchableOpacity>
          <Text style={styles.h4}>Feature lists</Text>
          <View style={styles.featureContainer}>
            <TouchableOpacity
              style={[styles.featureBox, { backgroundColor: "#FBE9F2" }]}
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
            >
              <Image
                style={{ resizeMode: "contain" }}
                source={require("../assets/homePage-assets/onlinemedical.png")}
              />
              <Text style={styles.featureObject}>PawsBooking</Text>
              <Text style={styles.featureDesc}>
                Schedule appointment directly from the Clinic Directory, keeping
                your pet's healthcare on track
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    marginHorizontal: 25,
    marginTop: 70,
    height: 320,
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
    paddingTop: 40,
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
});
export default HomeTab;
