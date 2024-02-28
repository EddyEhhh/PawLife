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
import globalStyles from "../style/global";
import axiosInstance from "./util/axiosInstance";

const TeleDetails = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  // const [selectedDate, setSelectedDate] = useState(null);

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

  const mockData = {
    availDate: {
      "15 Feb, Thurs": [
        "1000 AM",
        "1100 AM",
        "1300 PM",
        "1400 PM",
        "1500 PM",
        "1600 PM",
        "1700 PM",
        "1800 PM",
        "1900 PM",
      ],
      "16 Feb, Fri": ["0900 AM", "1200 PM", "0300 PM"],
      "17 Feb, Sat": ["1100 AM", "0100 PM", "0400 PM"],
      "18 Feb, Sun": ["1100 AM", "0100 PM", "0400 PM"],
      "19 Feb, Mon": ["1100 AM", "0100 PM", "0400 PM"],
    },
  };
  const [selectedDate, setSelectedDate] = useState(
    Object.keys(mockData.availDate)[0]
  );
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDatePress = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimePress = (time) => {
    setSelectedTime(time);
  };

  const isButtonClickable = selectedTime !== null;

  return (
    <View style={globalStyles.container}>
      {loading && (
        <View>
          <Text>loading</Text>
        </View>
      )}
      {!loading && (
        <View style={globalStyles.container}>
          <ScrollView scrollIndicatorInsets={{ right: 1, flex: 1 }}>
            <SafeAreaView style={styles.topContainer}>
              <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={require("../assets/sosPage-assets/back-icon.png")}
                  />
                </TouchableOpacity>
                <Image
                  source={{
                    uri: data.vets[0].image_url,
                  }}
                  style={styles.clinicsLogo} // Apply styles to the Image component if necessary
                />
              </View>

              <Text style={styles.title}>{data.vets[0].name}</Text>
              <Text style={styles.subtitle}>
                {data.vets[0].location.street}, {data.vets[0].location.country}{" "}
                {data.vets[0].location.postal_code}
              </Text>
              <Text style={styles.subtitle2}>
                Pets Treated: Dog, Cat, Guinea Pig, Reptile, Hamster, Rat,
                Tortoise, Rabbit
              </Text>
              <Text style={styles.subtitle2}>
                Speciality(s): Ophthalmology, Canine Medicine, Cardiology
              </Text>
              <View style={{ height: 25 }} />
            </SafeAreaView>

            <SafeAreaView style={{ backgroundColor: "white" }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Object.keys(mockData.availDate).map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleDatePress(date)}
                  >
                    <View
                      style={[
                        styles.dateContainer,
                        selectedDate === date
                          ? styles.selectedDate
                          : styles.unselectedDate,
                      ]}
                    >
                      <Text style={styles.dateText}>{date}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={{ marginHorizontal: 25 }}>
                <Text style={styles.consultFee}>Consultation Fee: $90</Text>
                <Text style={styles.availTimeSlotText}>
                  Available timeslot(s):
                </Text>
              </View>
              <View>
                {selectedDate && (
                  <View style={styles.timeContainer}>
                    {mockData.availDate[selectedDate].map((time, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleTimePress(time)}
                      >
                        <Text
                          style={[
                            styles.timeText,
                            selectedTime === time
                              ? styles.selectedTime
                              : styles.unselectedTime,
                          ]}
                        >
                          {time}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  isButtonClickable
                    ? styles.buttonClickable
                    : styles.buttonDisabled,
                ]}
                disabled={!isButtonClickable}
                onPress={() => {
                  navigation.navigate("TelePaymentScreen", {
                    selectedDate: selectedDate,
                    selectedTime: selectedTime,
                  });
                }}
              >
                <Text
                  style={[
                    styles.buttonTextisButtonClickable
                      ? styles.textClickable
                      : styles.textDisabled,
                  ]}
                >
                  Schedule
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
            <View
              style={{ flexGrow: 1, height: "100%", backgroundColor: "#fff" }}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 64,
    height: "auto",
    marginHorizontal: 25,
  },
  clinicsLogo: {
    height: 70,
    width: 70,
    borderRadius: 10,
    resizeMode: "contain",
    right: 0,
    position: "absolute",
  },
  title: {
    color: "#164348",
    justifyContent: "center",
    fontFamily: "frank-black",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "900",
    lineHeight: 50,
    marginTop: 30,
    maxWidth: 270,
  },
  subtitle: {
    color: "#164348",
    justifyContent: "center",
    fontFamily: "frank-regular",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: 18,
    marginVertical: 10,
  },
  subtitle2: {
    color: "#164348",
    justifyContent: "center",
    fontFamily: "frank-regular",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: 18,
    marginTop: 5,
  },
  dateContainer: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "fff",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDate: {
    backgroundColor: "#E0FCF9",
    borderWidth: 0.5,
    borderColor: "#164348",
  },
  unselectedDate: {
    backgroundColor: "#F9F9F9",
    borderWidth: 0.5,
    borderColor: "#B2B2B2",
  },
  dateText: {
    fontSize: 14,
    fontFamily: "frank-regular",
  },
  consultFee: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: "frank-regular",
    alignSelf: "flex-end",
  },
  availTimeSlotText: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: "frank-regular",
    color: "#164348",
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTime: {
    backgroundColor: "#E0FCF9",
    borderWidth: 0.5,
    borderColor: "#164348",
  },
  unselectedTime: {
    backgroundColor: "#F9F9F9",
    borderWidth: 0.5,
    borderColor: "#B2B2B2",
  },
  timeText: {
    marginHorizontal: 5,
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 12,
    fontSize: 12,
    fontFamily: "frank-regular",
  },
  buttonContainer: {
    marginTop: 30,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonClickable: {
    paddingVertical: 15,
    width: 230,
    borderRadius: 18,
    backgroundColor: "#E0FCF9",
  },
  buttonDisabled: {
    backgroundColor: "#DADADA",
    width: 230,
    paddingVertical: 15,
    borderRadius: 18,
  },
  textClickable: {
    color: "#164348",
    textAlign: "center",
    fontFamily: "frank-bold",
    fontSize: 16,
  },
  textDisabled: {
    color: "#5A7A7D",
    textAlign: "center",
    fontFamily: "frank-bold",
    fontSize: 16,
  },
});

export default TeleDetails;
