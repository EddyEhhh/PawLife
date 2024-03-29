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
import globalStyles from "../style/global";
import axiosInstance from "./util/axiosInstance";

const BookingPayment = ({ navigation, route }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { vetID, selectedDate, selectedTime } = route.params;
  const [cardNumber, setCardNumber] = useState(null);
  const [MMYY, setMMYY] = useState(null);
  const [CVC, setCVC] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get("/api/v1/vets/vet", {
          params: {
            _id: vetID,
          },
        })
        .catch((err) => console.log(err))
        .then((response) => {
          setData(response.data);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  const handleCardNumber = (input) => {
    setCardNumber(input);
  };
  const handleMMYY = (input) => {
    setMMYY(input);
  };
  const handleCVC = (input) => {
    setCVC(input);
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
          <ScrollView scrollIndicatorInsets={{ right: 1, flex: 1 }}>
            <SafeAreaView style={styles.topContainer}>
              {/*<View>*/}
              {/*  <TouchableOpacity onPress={() => navigation.goBack()}>*/}
              {/*    <Image*/}
              {/*      source={require("../assets/sosPage-assets/back-icon.png")}*/}
              {/*    />*/}
              {/*  </TouchableOpacity>*/}
              {/*  <Image*/}
              {/*    source={{*/}
              {/*      uri: data.vet[0].image_url,*/}
              {/*    }}*/}
              {/*    style={styles.clinicsLogo} // Apply styles to the Image component if necessary*/}
              {/*  />*/}
              {/*</View>*/}

              <Text style={styles.title}>{data.vet[0].name}</Text>
              <Text style={styles.subtitle}>
                {data.vet[0].location.street}, {data.vet[0].location.country}{" "}
                {data.vet[0].location.postal_code}
              </Text>
              {/*<Text style={styles.subtitle2}>*/}
              {/*  Pets Treated: Dog, Cat, Guinea Pig, Reptile, Hamster, Rat,*/}
              {/*  Tortoise, Rabbit*/}
              {/*</Text>*/}
              {/*<Text style={styles.subtitle2}>*/}
              {/*  Speciality(s): Ophthalmology, Canine Medicine, Cardiology*/}
              {/*</Text>*/}
              <View style={{ height: 25 }} />
            </SafeAreaView>

            <SafeAreaView style={{ backgroundColor: "#FEFEFE" }}>
              <View style={{ backgroundColor: "white" }}>
                <View style={styles.dateTimeContainer}>
                  <Text style={styles.selectedDateTime}>
                    {selectedDate} • {selectedTime}
                  </Text>
                </View>
              </View>
              <View style={styles.paymentDetailsContainer}>
                <Text style={styles.teleconsultH1}>Teleconsultation</Text>
                <View style={styles.textWrapper}>
                  <Text style={styles.leftText}>Consultation fee:</Text>
                  <Text style={styles.rightText}>$90</Text>
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.leftText}>Discount:</Text>
                  <Text style={styles.rightText}>-</Text>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#879EA0",
                    marginVertical: 20,
                  }}
                ></View>
                <View style={styles.textWrapper}>
                  <Text style={styles.leftText}>Total Amount:</Text>
                  <Text style={styles.rightText}>$90</Text>
                </View>
              </View>
              <View style={styles.cardDetailsContainer}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.applePayContainer}
                >
                  <Image
                    source={require("../assets/telePage-assets/applepay.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.or}>OR</Text>
                <Text style={styles.payWithCard}>Pay with card</Text>
                <View style={styles.SectionStyle}>
                  <Image
                    source={require("../assets/telePage-assets/card.png")} //Change your icon image here
                    style={styles.ImageStyle}
                  />

                  <TextInput
                    style={styles.searchInput1}
                    placeholder="Card Number"
                    clearButtonMode="never"
                    onChangeText={(input) => handleCardNumber(input)}
                  />
                  <TextInput
                    style={styles.searchInput2}
                    placeholder="MM/YY"
                    clearButtonMode="never"
                    onChangeText={(input) => handleMMYY(input)}
                  />
                  <TextInput
                    style={styles.searchInput2}
                    placeholder="CVC"
                    clearButtonMode="never"
                    onChangeText={(input) => handleCVC(input)}
                  />
                </View>
                <TouchableOpacity
                  style={styles.checkoutButtonContainer}
                  onPress={() => {
                    navigation.navigate("HomeScreen");
                  }}
                >
                  <Text style={styles.checkoutButton}>Checkout</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
            <View
              style={{
                flexGrow: 1,
                height: "100%",
                backgroundColor: "#FEFEFE",
              }}
            />
            <View style={{ height: 20 }} />
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
  dateTimeContainer: {
    marginVertical: 25,
    alignSelf: "center",
    borderRadius: 18,
  },
  selectedDateTime: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E0FCF9",
    width: 230,
    paddingVertical: 15,
    color: "#164348",
    textAlign: "center",
    fontFamily: "frank-regular",
    fontSize: 16,
  },
  paymentDetailsContainer: {
    margin: 25,
  },
  teleconsultH1: {
    color: "#164348",
    fontFamily: "frank-black",
    fontSize: 18,
    marginBottom: 25,
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftText: {
    alignSelf: "flex-start",
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 14,
  },
  rightText: {
    alignSelf: "flex-end",
    fontFamily: "frank-regular",
    color: "#164348",
    fontSize: 14,
  },
  cardDetailsContainer: {
    marginHorizontal: 25,
  },
  applePayContainer: {
    alignSelf: "center",
    marginVertical: 25,
  },
  or: {
    alignSelf: "center",
    fontFamily: "frank-medium",
    color: "#164348",
    fontSize: 14,
  },
  payWithCard: {
    fontFamily: "frank-medium",
    color: "#164348",
    fontSize: 14,
    marginTop: 25,
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
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ImageStyle: {
    alignItems: "center",
    marginRight: 10,
  },
  searchInput1: {
    flex: 1,
    color: "#5A7A7D",
  },
  searchInput2: {
    flex: 0.35,
    color: "#5A7A7D",
  },
  checkoutButtonContainer: {
    marginTop: 25,
    paddingVertical: 15,
    backgroundColor: "#E0FCF9",
    borderRadius: 18,
    alignSelf: "center",
    width: 230,
  },
  checkoutButton: {
    fontFamily: "frank-bold",
    color: "#164348",
    alignSelf: "center",
    fontSize: 14,
  },
});

export default BookingPayment;
