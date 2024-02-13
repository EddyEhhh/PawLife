import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import axios from "axios";
import globalStyles from "../style/global";

const VetPalAssist = () => {
  const [petDetails, setPetDetails] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = React.useState([]);
  const [selectedSymptomDetails, setSelectedSymptomDetails] = useState([]);
  const [chatTracker, setChatTracker] = useState(0);

  const symptoms = [
    { key: "1", value: "Acting Weird" },
    { key: "2", value: "Aggression" },
    { key: "3", value: "Always Hungry" },
    { key: "4", value: "Diarrhea" },
    { key: "5", value: "Itching" },
    { key: "6", value: "Vomitting" },
    { key: "6", value: "Limping" },
  ];
  useEffect(() => {
    // Fetch pet details from your database using Axios
    // axios
    //   .get("YOUR_API_URL")
    //   .then((response) => {
    //     // Update state with pet details
    //     setPetDetails(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching pet details:", error);
    //   });

    setPetDetails({
      name: "Doge",
      species: "Dog",
      breed: "Toy Poodle",
      age: 7,
    });
  }, []);

  const handleDiagnosis = () => {
    console.log("Selected Symptoms:", selectedSymptoms);
    if (selectedSymptoms.length !== 0) {
      setChatTracker((prevChatTracker) => prevChatTracker + 1);
      setTimeout(function () {
        setChatTracker((prevChatTracker) => prevChatTracker + 1);
        setTimeout(function () {
          setChatTracker((prevChatTracker) => prevChatTracker + 1);
        }, 1000);
      }, 1000);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={require("../assets/sosPage-assets/back-icon.png")} />
          </TouchableOpacity>
          <Image
            style={{ resizeMode: "contain", marginLeft: 20 }}
            source={require("../assets/vetPalPage-assets/logo.png")}
          />
        </View>
        <ScrollView style={styles.chatContainer}>
          {/* Display pet details */}
          {petDetails && (
            <View style={styles.systemPrompt}>
              <Text style={styles.systemMessage}>Name: {petDetails.name}</Text>
              <Text style={styles.systemMessage}>
                Species: {petDetails.species}
              </Text>
              <Text style={styles.systemMessage}>
                Breed: {petDetails.breed}
              </Text>
              <Text style={styles.systemMessage}>Age: {petDetails.age}</Text>
            </View>
          )}

          <View style={styles.userInput}>
            <Text
              style={[
                styles.systemMessage,
                { marginBottom: 10, fontFamily: "frank-bold" },
              ]}
            >
              What's your pet's main symptom(s)?
            </Text>
            {/* Dropdown to select symptoms */}
            <MultipleSelectList
              style={styles.userInput}
              setSelected={(val) => setSelectedSymptoms(val)}
              data={symptoms}
              save="value"
              label="Symptoms"
              maxHeight={200}
              inputStyles={{ fontFamily: "frank-regular" }}
              dropdownTextStyles={{ fontFamily: "frank-regular" }}
              badgeTextStyles={{ fontFamily: "frank-regular" }}
              labelStyles={{ fontFamily: "frank-black" }}
            />
          </View>

          {chatTracker >= 1 && (
            <View style={styles.systemPrompt}>
              <Text style={styles.systemMessage}>
                Tell us more about your dog's symptoms
              </Text>
            </View>
          )}

          {chatTracker >= 2 && (
            <View style={styles.systemPrompt}>
              <Text style={styles.systemMessage}>
                Is your pet lethargic, or do they have a reduced appetite?
              </Text>
            </View>
          )}

          {chatTracker >= 3 && (
            <View style={styles.userInput}>
              <SelectList
                style={styles.userInput}
                setSelected={(val) => setSelectedSymptomDetails(val)}
                data={["Yes", "No"]}
                save="value"
                maxHeight={200}
                inputStyles={{ fontFamily: "frank-regular" }}
                badgeTextStyles={{ fontFamily: "frank-regular" }}
                labelStyles={{ fontFamily: "frank-black" }}
              />
            </View>
          )}
        </ScrollView>
      </View>
      {/* Button to submit symptoms and details for diagnosis */}
      <TouchableOpacity style={styles.submitButton} onPress={handleDiagnosis}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  chatContainer: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 25,
    height: "auto",
    width: "100%",
  },
  systemPrompt: {
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  systemMessage: {
    fontFamily: "frank-regular",
  },
  userInput: {
    marginBottom: 15,
    backgroundColor: "#9A9EFF",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    marginLeft: "10%",
  },
  submitButton: {
    backgroundColor: "#9A9EFF",
    alignItems: "center",
    paddingVertical: 16,
    bottom: 0,
    width: "100%",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "frank-bold",
  },
});

export default VetPalAssist;
