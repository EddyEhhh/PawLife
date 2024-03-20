import React, { useState, useEffect } from "react";
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
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axiosInstance from "./util/axiosInstance";
import Modal from "react-native-modal";

const PawEditTab = ({ route, navigation }) => {
  const { petID } = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [petImage, setPetImage] = useState(null);
  const [petName, setPetName] = useState(null);
  const [petSpecies, setPetSpecies] = useState(null);
  const [petBreed, setPetBreed] = useState(null);
  const [petAge, setPetAge] = useState(null);
  // const [petBirthday, setPetBirthday] = useState(null);
  const [petGender, setPetGender] = useState(null);
  const [chipNumber, setChipNumber] = useState(null);
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [allergies, setAllergies] = useState([]);
  const [isAllergyModalVisible, setAllergyModalVisible] = useState(false);
  const [newAllergyType, setNewAllergyType] = useState("");
  const [newAllergyDesc, setNewAllergyDesc] = useState("");

  const [prevConditions, setPrevConditions] = useState([]);
  const [isPrevCondModalVisible, setPrevCondModalVisible] = useState(false);
  const [newPrevCondition, setNewPrevCondition] = useState("");
  const [newPrevNotes, setPrevNewNotes] = useState("");

  const [prevSurgery, setPrevSurgery] = useState([]);
  const [isSurgeryModalVisible, setSurgeryModalVisible] = useState(false);
  const [newSurgery, setNewSurgery] = useState("");
  const [newSurgeryDate, setNewSurgeryDate] = useState("");
  const [isSurgeryDatePickerVisible, setSurgeryDatePickerVisibility] =
    useState(false);
  const [newSurgeryNotes, setNewSurgeryNotes] = useState("");

  const [existingConditions, setExistingConditions] = useState([]);
  const [isCondModalVisible, setCondModalVisible] = useState(false);
  const [newCondition, setNewCondition] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const [existingMedications, setExistingMedications] = useState([]);
  const [isMedModalVisible, setMedModalVisible] = useState(false);
  const [newMedication, setNewMedication] = useState("");
  const [newDosage, setNewDosage] = useState("");
  const [newFrequency, setNewFrequency] = useState("");
  const [newMedNotes, setNewMedNotes] = useState("");

  const [vaccinations, setVaccinations] = useState([]);
  const [isVaccModalVisible, setVaccModalVisible] = useState(false);
  const [newVaccination, setNewVaccination] = useState("");
  const [newVaccDate, setNewVaccDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [newVaccNotes, setNewVaccNotes] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get("/api/v1/pets/pet", {
          params: {
            _id: petID,
          },
        })
        .catch((err) => console.log(err))
        .then((response) => {
          setData(response.data.pet[0]);
          setPetSpecies(response.data.pet[0].species);
          setPetAge(response.data.pet[0].age.toString());
          setAllergies(response.data.pet[0].health.medical_history.allergies);
          setPrevConditions(
            response.data.pet[0].health.medical_history.previous_conditions
          );
          setPrevSurgery(
            response.data.pet[0].health.medical_history.previous_surgeries
          );
          setExistingConditions(
            response.data.pet[0].health.existing_conditions
          );
          setExistingMedications(response.data.pet[0].health.medications);
          setVaccinations(response.data.pet[0].health.vaccinations);
          setPetImage(response.data.pet[0].image_url);
          setPetGender("Female");
          setLoading(false);
        });
    };
    fetchData();
  }, [petID]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPetImage(result.assets[0].uri);
    }
  };

  const deletePet = () => {
    axiosInstance
      .delete("/api/v1/pets/pet", {
        params: {
          pet_id: petID,
        },
      })
      .catch((err) => console.log(err))
      .then((response) => {
        console.log(response);
      });
  };

  const speciesList = [
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
    { label: "Rabbit", value: "Rabbit" },
    { label: "Hamster", value: "Hamster" },
    { label: "Pig", value: "Pig" },
    { label: "Bird", value: "Bird" },
  ];

  const FormatDate = (data) => {
    let dateTimeString =
      data.getDate() + "-" + (data.getMonth() + 1) + "-" + data.getFullYear();

    return dateTimeString; // It will look something like this 3-5-2021 16:23
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setNewVaccDate(FormatDate(date));
    hideDatePicker();
  };

  const handleSelection = (gender) => {
    setPetGender(gender);
  };

  const handleAddCondition = () => {
    if (!newCondition.trim() || !newNotes.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setExistingConditions([
      ...existingConditions,
      { condition: newCondition, notes: newNotes },
    ]);
    setNewCondition("");
    setNewNotes("");
    setCondModalVisible(false);
  };

  const handleAddMedication = () => {
    if (!newMedication.trim() || !newDosage.trim() || !newFrequency.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setExistingMedications([
      ...existingMedications,
      {
        medication_name: newMedication,
        dosage: newDosage,
        frequency: newFrequency,
        notes: newMedNotes,
      },
    ]);
    setNewMedication("");
    setNewDosage("");
    setNewFrequency("");
    setNewMedNotes("");
    setMedModalVisible(false);
  };

  const handleAddVaccination = () => {
    if (!newVaccination.trim() || !newVaccDate.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setVaccinations([
      ...vaccinations,
      {
        vaccine_name: newVaccination,
        date_administered: newVaccDate,
        notes: newVaccNotes,
      },
    ]);
    setNewVaccination("");
    setNewVaccDate("");
    setNewVaccNotes("");
    setVaccModalVisible(false);
  };

  const handleAddPrevCondition = () => {
    if (!newPrevCondition.trim() || !newPrevNotes.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setPrevConditions([
      ...prevConditions,
      {
        condition: newPrevCondition,
        notes: newPrevNotes,
      },
    ]);
    setNewPrevCondition("");
    setPrevNewNotes("");
    setPrevCondModalVisible(false);
  };

  const handleAddAllergy = () => {
    if (!newAllergyType.trim() || !newAllergyDesc.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setAllergies([
      ...allergies,
      {
        type: newAllergyType,
        description: newAllergyDesc,
      },
    ]);
    setNewAllergyDesc("");
    setNewAllergyType("");
    setAllergyModalVisible(false);
  };

  const showSurgeryDatePicker = () => {
    setSurgeryDatePickerVisibility(true);
  };

  const hideSurgeryDatePicker = () => {
    setSurgeryDatePickerVisibility(false);
  };

  const handleSurgeryConfirm = (date) => {
    setNewSurgeryDate(FormatDate(date));
    hideSurgeryDatePicker();
  };

  const handleAddSurgery = () => {
    if (!newSurgery.trim() || !newSurgeryDate.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setPrevSurgery([
      ...prevSurgery,
      {
        surgery_name: newSurgery,
        surgery_date: newSurgeryDate,
        notes: newSurgeryNotes,
      },
    ]);
    setNewSurgery("");
    setNewSurgeryDate("");
    setNewSurgeryNotes("");
    setSurgeryModalVisible(false);
  };

  return (
    <View style={globalStyles.container}>
      {loading && (
        <View>
          <Text>loading</Text>
        </View>
      )}
      {!loading && (
        <ScrollView scrollIndicatorInsets={{ right: 1 }}>
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
                <Text style={styles.backIconText}>{data.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.backIconContainer}
                onPress={() => deletePet()}
              >
                <MaterialCommunityIcons
                  name="delete"
                  style={{
                    position: "absolute",
                    right: 20,
                    top: -20,
                    fontSize: 22,
                    color: "#D45C57",
                  }}
                />
              </TouchableOpacity>
              <View style={styles.petsImageContainer}>
                <TouchableOpacity onPress={pickImage}>
                  <Image
                    source={require("../assets/edit.png")}
                    style={{ position: "absolute", top: 0, right: -20 }}
                  />
                  {petImage && (
                    <Image
                      source={{ uri: petImage }}
                      style={styles.petsImage}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder="Name"
                clearButtonMode="never"
                defaultValue={data.name}
                onChangeText={(text) => setPetName(text)}
              />
              <Dropdown
                style={styles.dropdown}
                value={petSpecies}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemTextStyle}
                iconStyle={styles.iconStyle}
                data={speciesList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Species"
                searchPlaceholder="Search..."
                onChange={(item) => {
                  setPetSpecies(item.value);
                }}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Breed"
                clearButtonMode="never"
                defaultValue={data.breed}
                onChangeText={(text) => setPetBreed(text)}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Age"
                clearButtonMode="never"
                keyboardType="number-pad"
                defaultValue={petAge}
                onChangeText={(text) => setPetBreed(text)}
              />
              {/* <TextInput
                style={styles.searchInput}
                placeholder="Birthday"
                clearButtonMode="never"
                onPressIn={showDatePicker}
                value={petBirthday}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              /> */}
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  onPress={() => handleSelection("Male")}
                  style={[
                    styles.genderButton,
                    petGender === "Male" && styles.selectedButton,
                  ]}
                >
                  <MaterialIcons
                    name="male"
                    style={[
                      styles.genderIcon,
                      petGender === "Male" && styles.selectedIcon,
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSelection("Female")}
                  style={[
                    styles.genderButton,
                    petGender === "Female" && styles.selectedButton,
                  ]}
                >
                  <MaterialIcons
                    name="female"
                    style={[
                      styles.genderIcon,
                      petGender === "Female" && styles.selectedIcon,
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder="Chip Number"
                defaultValue={data.microchip_number}
                clearButtonMode="never"
                onChangeText={(text) => setChipNumber(text)}
              />
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Health</Text>
                <View>
                  <Text style={styles.sectionTitle2}>Allergies</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setAllergyModalVisible(true)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                  {allergies.map((item, index) => (
                    <View key={item._id} style={styles.conditionContainer}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.conditionText}>{item.type}</Text>
                        <Text style={styles.notesText}>{item.description}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.sectionTitle2}>Previous Conditions</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setPrevCondModalVisible(true)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                  {prevConditions.map((item, index) => (
                    <View key={item._id} style={styles.conditionContainer}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.conditionText}>
                          {item.condition}
                        </Text>
                        <Text style={styles.notesText}>{item.notes}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.sectionTitle2}>Previous Surgery</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setSurgeryModalVisible(true)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                  {prevSurgery.map((item, index) => (
                    <View key={item._id} style={styles.conditionContainer}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.conditionText}>
                          {item.surgery_name}
                        </Text>
                        <Text style={styles.notesText}>
                          {item.surgery_date}
                        </Text>
                        <Text style={styles.notesText}>{item.notes}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.sectionTitle2}>Existing Conditions</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setCondModalVisible(true)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                  {existingConditions.map((item, index) => (
                    <View key={item._id} style={styles.conditionContainer}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.conditionText}>
                          {item.condition}
                        </Text>
                        <Text style={styles.notesText}>{item.notes}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.sectionTitle2}>Medications</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setMedModalVisible(true)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                  {existingMedications.map((item, index) => (
                    <View key={item._id} style={styles.conditionContainer}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.conditionText}>
                          {item.medication_name}
                        </Text>
                        <Text style={styles.notesText}>{item.dosage}</Text>
                        <Text style={styles.notesText}>{item.frequency}</Text>
                        <Text style={styles.notesText}>{item.notes}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.sectionTitle2}>Vaccinations</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setVaccModalVisible(true)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                  {vaccinations.map((item, index) => (
                    <View key={item._id} style={styles.conditionContainer}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.conditionText}>
                          {item.vaccine_name}
                        </Text>
                        <Text style={styles.notesText}>
                          {item.date_administered}
                        </Text>
                        <Text style={styles.notesText}>{item.notes}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {}}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <Modal
                  isVisible={isAllergyModalVisible}
                  onBackdropPress={() => setAllergyModalVisible(false)}
                >
                  <View style={styles.modalContent}>
                    <TextInput
                      placeholder="Type"
                      value={newAllergyType}
                      onChangeText={setNewAllergyType}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Description"
                      value={newAllergyDesc}
                      onChangeText={setNewAllergyDesc}
                      style={[styles.input, { marginTop: 10 }]}
                    />
                    <TouchableOpacity
                      style={[styles.buttonContainer, { marginTop: 20 }]}
                      onPress={handleAddAllergy}
                    >
                      <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <Modal
                  isVisible={isPrevCondModalVisible}
                  onBackdropPress={() => setPrevCondModalVisible(false)}
                >
                  <View style={styles.modalContent}>
                    <TextInput
                      placeholder="Condition"
                      value={newPrevCondition}
                      onChangeText={setNewPrevCondition}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Notes"
                      value={newPrevNotes}
                      onChangeText={setPrevNewNotes}
                      style={[styles.input, { marginTop: 10 }]}
                    />
                    <TouchableOpacity
                      style={[styles.buttonContainer, { marginTop: 20 }]}
                      onPress={handleAddPrevCondition}
                    >
                      <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <Modal
                  isVisible={isSurgeryModalVisible}
                  onBackdropPress={() => setSurgeryModalVisible(false)}
                >
                  <View style={styles.modalContent}>
                    <TextInput
                      placeholder="Surgery Name"
                      value={newSurgery}
                      onChangeText={setNewSurgery}
                      style={styles.input}
                    />
                    <TextInput
                      style={[styles.input, { marginTop: 10 }]}
                      placeholder="Surgery Date"
                      onPressIn={showSurgeryDatePicker}
                      value={newSurgeryDate}
                    />
                    <DateTimePickerModal
                      isVisible={isSurgeryDatePickerVisible}
                      mode="date"
                      onConfirm={handleSurgeryConfirm}
                      onCancel={hideSurgeryDatePicker}
                    />
                    <TextInput
                      placeholder="Notes"
                      value={newSurgeryNotes}
                      onChangeText={setNewSurgeryNotes}
                      style={[styles.input, { marginTop: 10 }]}
                    />
                    <TouchableOpacity
                      style={[styles.buttonContainer, { marginTop: 20 }]}
                      onPress={handleAddSurgery}
                    >
                      <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <Modal
                  isVisible={isCondModalVisible}
                  onBackdropPress={() => setCondModalVisible(false)}
                >
                  <View style={styles.modalContent}>
                    <TextInput
                      placeholder="Condition"
                      value={newCondition}
                      onChangeText={setNewCondition}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Notes"
                      value={newNotes}
                      onChangeText={setNewNotes}
                      style={[styles.input, { marginTop: 10 }]}
                    />
                    <TouchableOpacity
                      style={[styles.buttonContainer, { marginTop: 20 }]}
                      onPress={handleAddCondition}
                    >
                      <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <Modal
                  isVisible={isMedModalVisible}
                  onBackdropPress={() => setMedModalVisible(false)}
                >
                  <View style={styles.modalContent}>
                    <TextInput
                      placeholder="Medication Name"
                      value={newMedication}
                      onChangeText={setNewMedication}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Dosage"
                      value={newDosage}
                      onChangeText={setNewDosage}
                      style={[styles.input, { marginTop: 10 }]}
                    />
                    <TextInput
                      placeholder="Frequency"
                      value={newFrequency}
                      onChangeText={setNewFrequency}
                      style={[styles.input, { marginTop: 10 }]}
                    />
                    <TextInput
                      placeholder="Notes"
                      value={newMedNotes}
                      onChangeText={setNewMedNotes}
                      style={[styles.input, { marginTop: 10 }]}
                    />
                    <TouchableOpacity
                      style={[styles.buttonContainer, { marginTop: 20 }]}
                      onPress={handleAddMedication}
                    >
                      <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <Modal
                  isVisible={isVaccModalVisible}
                  onBackdropPress={() => setVaccModalVisible(false)}
                >
                  <View style={styles.modalContent}>
                    <TextInput
                      placeholder="Vaccine Name"
                      value={newVaccination}
                      onChangeText={setNewVaccination}
                      style={styles.input}
                    />
                    <TextInput
                      style={[styles.input, { marginTop: 10 }]}
                      placeholder="Date administered"
                      onPressIn={showDatePicker}
                      value={newVaccDate}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                    <TextInput
                      placeholder="Notes"
                      value={newVaccNotes}
                      onChangeText={setNewVaccNotes}
                      style={[styles.input, { marginTop: 10 }]}
                    />
                    <TouchableOpacity
                      style={[styles.buttonContainer, { marginTop: 20 }]}
                      onPress={handleAddVaccination}
                    >
                      <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            </View>

            <View style={{ height: 30 }} />
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
  bottomContainer: {
    marginHorizontal: 25,
    marginTop: 25,
  },
  backIconContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    width: 60,
    alignSelf: "center",
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
  dropdown: {
    fontFamily: "frank-regular",
    backgroundColor: "#F9F9F9",
    borderColor: "#D8D8D8",
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 20,
    color: "#5A7A7D",
    paddingVertical: 3,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#C7C7CD",
    fontFamily: "frank-regular",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#5A7A7D",
    fontFamily: "frank-regular",
  },
  inputSearchStyle: {
    fontSize: 14,
    fontFamily: "frank-regular",
  },
  itemTextStyle: {
    fontSize: 14,
    fontFamily: "frank-regular",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  genderButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#164348",
    padding: 20,
    marginHorizontal: 25,
  },
  selectedButton: {
    borderColor: "#7BDFF2",
  },
  genderIcon: {
    fontSize: 70,
    color: "#164348",
  },
  selectedIcon: {
    color: "#7BDFF2",
  },
  buttonContainer: {
    marginTop: 30,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 15,
    width: 230,
    borderRadius: 18,
    backgroundColor: "#E0FCF9",
  },
  buttonText: {
    color: "#164348",
    textAlign: "center",
    fontFamily: "frank-bold",
    fontSize: 16,
  },
  sectionContainer: {
    backgroundColor: "white",
    marginTop: 20,
    marginHorizontal: 25,
  },
  sectionTitle: {
    fontFamily: "frank-bold",
    fontSize: 20,
    color: "#164348",
    marginBottom: 20,
  },
  sectionTitle2: {
    fontFamily: "frank-regular",
    fontSize: 16,
    color: "#164348",
    marginBottom: 5,
  },
  conditionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
  },
  conditionText: {
    fontFamily: "frank-regular",
    fontSize: 14,
    color: "#5A7A7D",
  },
  addButton: {
    backgroundColor: "#E0FCF9",
    borderRadius: 20,
    padding: 0,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    fontSize: 22,
    right: 0,
    top: -5,
  },
  addButtonText: {
    fontFamily: "frank-bold",
    fontSize: 18,
    color: "#164348",
  },
  notesText: {
    fontFamily: "frank-regular",
    fontSize: 12,
    color: "#5A7A7D",
    marginTop: 5,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: "#E0FCF9",
    color: "#164348",
    padding: 10,
    borderRadius: 20,
    textAlign: "center",
    fontFamily: "frank-bold",
    fontSize: 16,
    width: 230,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  input: {
    height: 40,
    borderColor: "#D8D8D8",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    fontFamily: "frank-regular",
    color: "#5A7A7D",
    fontSize: 14,
    width: "100%",
  },
});
export default PawEditTab;
