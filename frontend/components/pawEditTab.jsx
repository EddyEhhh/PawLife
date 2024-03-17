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
import axiosInstance from "./util/axiosInstance";

const PawEditTab = ({ route, navigation }) => {
  const { petID } = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [petImage, setPetImage] = useState(null);
  const [petName, setPetName] = useState(null);
  const [petSpecies, setPetSpecies] = useState(null);
  const [petBreed, setPetBreed] = useState(null);
  const [petBirthday, setPetBirthday] = useState(null);
  const [petGender, setPetGender] = useState(null);
  const [chipNumber, setChipNumber] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
          setLoading(false);
          setPetImage(imgPlaceholder);
          setPetBirthday(mockPetData.birthday);
          setPetSpecies(data.species);
          setPetGender(mockPetData.gender);
        });
    };
    fetchData();
  }, [petID]);

  useEffect(() => {}, []);

  const imgPlaceholder =
    "https://www.crossdogs.org/images/dog-placeholder.png?mgiToken=tcgtxemc";

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setPetBirthday(date.toString().substr(4, 12));
    hideDatePicker();
  };

  const handleSelection = (gender) => {
    setPetGender(gender);
  };

  const speciesList = [
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
    { label: "Rabbit", value: "Rabbit" },
    { label: "Hamster", value: "Hamster" },
    { label: "Pig", value: "Pig" },
    { label: "Bird", value: "Bird" },
  ];

  const mockPetData = {
    _id: 2,
    name: "Abby",
    species: "Dog",
    breed: "Poodle",
    birthday: "May 21 2019",
    gender: "Female",
    imageURL:
      "https://www.purina.com.sg/sites/default/files/styles/ttt_image_original/public/2021-02/BREED%20Hero%20Desktop_0050_poodle_toy.webp?itok=7Y1anr9w",
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
              />
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
                clearButtonMode="never"
                onChangeText={(text) => setChipNumber(text)}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {}}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
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
});
export default PawEditTab;
