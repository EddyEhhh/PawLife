import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView, TextInput, useColorScheme,
} from "react-native";
import globalStyles from "../style/global";
import axiosInstance from "./util/axiosInstance";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Dropdown} from "react-native-element-dropdown";

const BookingDetails = ({ route, navigation }) => {
  const { vetID, petID } = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const [bookingDate, setBookingDate] = useState([[],[],[]]);
  const [bookingDateData, setBookingDateData] = useState([[],[],[]]);

  const [numOfTimeslot, setNumOfTimeSlot] = useState(3);


  const [isBookingDatePickerStart1, setBookingDatePickerStart1] = useState(false)
  const [isBookingDatePickerStart2, setBookingDatePickerStart2] = useState(false)
  const [isBookingDatePickerStart3, setBookingDatePickerStart3] = useState(false)

  const [isBookingDatePickerEnd1, setBookingDatePickerEnd1] = useState(false)
  const [isBookingDatePickerEnd2, setBookingDatePickerEnd2] = useState(false)
  const [isBookingDatePickerEnd3, setBookingDatePickerEnd3] = useState(false)

  const [isButtonClickable, setButtonClickable] = useState(false)


  const colorScheme = useColorScheme();

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

  const showBookingDatePickerStart1 = () => {
    setBookingDatePickerStart1(true);
  };
  const hideBookingDatePickerStart1 = () => {
    setBookingDatePickerStart1(false);
  };
  const handleBookingConfirmStart1 = (date) => {
    if(bookingDateData[0][1] !== undefined && bookingDateData[0][1] <= date) {
      alert("Please select a starting time before the end");
      return;
    }
    if(date < Date.now()) {
      alert("Please select a valid time");
      return;
    }
    const options = {weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'};
    bookingDate[0][0] = (date.toLocaleString([], options));
    bookingDateData[0][0] = date;
    hideBookingDatePickerStart1();
    console.log(bookingDate)
  };

  const showBookingDatePickerEnd1 = () => {
    setBookingDatePickerEnd1(true);
  };
  const hideBookingDatePickerEnd1 = () => {
    setBookingDatePickerEnd1(false);
  };
  const handleBookingConfirmEnd1 = (date) => {
    if(bookingDateData[0][0] === undefined) {
      alert("Please select a starting date");
      return;
    }
    if(bookingDateData[0][0] >= date){
      alert("Please select a date after the starting date");
      return;
    }
    const options = {weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'};
    bookingDate[0][1] = (date.toLocaleString([], options));
    bookingDateData[0][1] = date;
    hideBookingDatePickerEnd1();
    clickableSchedule()
    console.log(bookingDate)
  };

  const postTimeslot = async () => {
    console.log(bookingDateData[0][0].toLocaleString())
    let bookingEpochData = [];
    bookingDateData.map(eachBooking => { eachBooking[0] &&
      bookingEpochData.push({
        end: Date.parse(eachBooking[1]) / 1000 +28800,
        start: Date.parse(eachBooking[0]) / 1000 +28800
      })
    })
    console.log(bookingEpochData)


    await axiosInstance
        .post("/api/v1/appointments/"+vetID, {
          pet_id: petID,
          bookings: bookingEpochData
        })
        .catch((err) => console.log(err))
        .then((result) => {
          navigation.navigate("BookingPaymentScreen", {
            vetID: vetID,
          });
        })
  };



  // D2
  const showBookingDatePickerStart2 = () => {
    setBookingDatePickerStart2(true);
  };
  const hideBookingDatePickerStart2 = () => {
    setBookingDatePickerStart2(false);
  };
  const handleBookingConfirmStart2 = (date) => {
    if(bookingDateData[1][1] !== undefined && bookingDateData[1][1] <= date) {
      alert("Please select a starting time before the end");
      return;
    }
    if(date < Date.now()) {
      alert("Please select a valid time");
      return;
    }
    const options = {weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'};
    bookingDate[1][0] = (date.toLocaleString([], options));
    bookingDateData[1][0] = date;
    hideBookingDatePickerStart2();
    console.log(bookingDate)
  };

  const showBookingDatePickerEnd2 = () => {
    setBookingDatePickerEnd2(true);
  };
  const hideBookingDatePickerEnd2 = () => {
    setBookingDatePickerEnd2(false);
  };
  const handleBookingConfirmEnd2 = (date) => {
    if(bookingDateData[1][0] === undefined) {
      alert("Please select a starting date");
      return;
    }
    if(bookingDateData[1][0] >= date){
      alert("Please select a date after the starting date");
      return;
    }
    const options = {weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'};
    bookingDate[1][1] = (date.toLocaleString([], options));
    bookingDateData[1][1] = date;
    hideBookingDatePickerEnd2();
    clickableSchedule()
    console.log(bookingDate)
  };


  // D3

  const showBookingDatePickerStart3 = () => {
    setBookingDatePickerStart3(true);
  };
  const hideBookingDatePickerStart3 = () => {
    setBookingDatePickerStart3(false);
  };
  const handleBookingConfirmStart3 = (date) => {
    if(bookingDateData[2][1] !== undefined && bookingDateData[2][1] <= date) {
      alert("Please select a starting time before the end");
      return;
    }
    if(date < Date.now()) {
      alert("Please select a valid time");
      return;
    }
    const options = {weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'};
    bookingDate[2][0] = (date.toLocaleString([], options));
    bookingDateData[2][0] = date;
    hideBookingDatePickerStart3();
    console.log(bookingDate)
  };


  const showBookingDatePickerEnd3 = () => {
    setBookingDatePickerEnd3(true);
  };
  const hideBookingDatePickerEnd3 = () => {
    setBookingDatePickerEnd3(false);
  };
  const handleBookingConfirmEnd3 = (date) => {
    if(bookingDateData[2][0] === undefined) {
      alert("Please select a starting date");
      return;
    }
    if(bookingDateData[2][0] >= date){
      alert("Please select a date after the starting date");
      return;
    }
    const options = {weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'};
    bookingDate[2][1] = (date.toLocaleString([], options));
    bookingDateData[2][1] = date;
    hideBookingDatePickerEnd3();
    clickableSchedule()
    console.log(bookingDate)
  };

  const clickableSchedule = () => {
    console.log("HI"+numOfTimeslot)
    // console.log(numOfTimeslot == 2 && bookingDate[0][1] !== undefined)
    if(numOfTimeslot == 1 && bookingDate[0][1] !== undefined){
      console.log("RUN1");
      setButtonClickable(true);
      return;
    }else if(numOfTimeslot == 2 && bookingDate[0][1] !== undefined && bookingDate[1][1] !== undefined){
      console.log("RUN2");

      setButtonClickable(true);
      return;
    }else if(numOfTimeslot == 3 && bookingDate[0][1] !== undefined && bookingDate[1][1] !== undefined && bookingDate[2][1] !== undefined){
      console.log("RUN3");

      setButtonClickable(true);
      return;
    }
    setButtonClickable(false);
  }

  const clickableScheduleCheck = (num) => {
    console.log("HI"+numOfTimeslot)
    // console.log(numOfTimeslot == 2 && bookingDate[0][1] !== undefined)
    if(num == 1 && bookingDate[0][1] !== undefined){
      console.log("RUN1");
      setBookingDateData([bookingDateData[0],[],[]])
      setBookingDate([bookingDate[0],[],[]])
      setButtonClickable(true);
      return;
    }else if(num == 2 && bookingDate[0][1] !== undefined && bookingDate[1][1] !== undefined){
      console.log("RUN2");
      setBookingDateData([bookingDateData[0],bookingDateData[1],[]])
      setBookingDate([bookingDate[0],bookingDate[1],[]])
      setButtonClickable(true);
      return;
    }else if(num == 3 && bookingDate[0][1] !== undefined && bookingDate[1][1] !== undefined && bookingDate[2][1] !== undefined){
      console.log("RUN3");

      setButtonClickable(true);
      return;
    }
    setButtonClickable(false);
  }

  // const mockData = {
  //   availDate: {
  //     "15 Feb, Thurs": [
  //       "1000 AM",
  //       "1100 AM",
  //       "1300 PM",
  //       "1400 PM",
  //       "1500 PM",
  //       "1600 PM",
  //       "1700 PM",
  //       "1800 PM",
  //       "1900 PM",
  //     ],
  //     "16 Feb, Fri": ["0900 AM", "1200 PM", "0300 PM"],
  //     "17 Feb, Sat": ["1100 AM", "0100 PM", "0400 PM"],
  //     "18 Feb, Sun": ["1100 AM", "0100 PM", "0400 PM"],
  //     "19 Feb, Mon": ["1100 AM", "0100 PM", "0400 PM"],
  //   },
  // };
  // const [selectedDate, setSelectedDate] = useState(
  //   Object.keys(mockData.availDate)[0]
  // );
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDatePress = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimePress = (time) => {
    setSelectedTime(time);
  };

  // const isButtonClickable = selectedTime !== null;

  const numberOfTimeSlotList = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];


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
                    uri: data.vet[0].image_url,
                  }}
                  style={styles.clinicsLogo} // Apply styles to the Image component if necessary
                />
              </View>

              <Text style={styles.title}>{data.vet[0].name}</Text>
              <Text style={styles.subtitle}>
                {data.vet[0].location.street}, {data.vet[0].location.country}{" "}
                {data.vet[0].location.postal_code}
              </Text>
              <Text style={styles.subtitle2}>
                Pets Treated: {data.vet[0].specialties.join(", ")}
              </Text>
              {/*<Text style={styles.subtitle2}>*/}
              {/*  Speciality(s): Ophthalmology, Canine Medicine, Cardiology*/}
              {/*</Text>*/}
              <View style={{ height: 25 }} />
            </SafeAreaView>

            <SafeAreaView style={{ backgroundColor: "white" }}>
              {/*<ScrollView horizontal showsHorizontalScrollIndicator={false}>*/}
              {/*  {Object.keys(mockData.availDate).map((date, index) => (*/}
              {/*    <TouchableOpacity*/}
              {/*      key={index}*/}
              {/*      onPress={() => handleDatePress(date)}*/}
              {/*    >*/}
              {/*      <View*/}
              {/*        style={[*/}
              {/*          styles.dateContainer,*/}
              {/*          selectedDate === date*/}
              {/*            ? styles.selectedDate*/}
              {/*            : styles.unselectedDate,*/}
              {/*        ]}*/}
              {/*      >*/}
              {/*        <Text style={styles.dateText}>{date}</Text>*/}
              {/*      </View>*/}
              {/*    </TouchableOpacity>*/}
              {/*  ))}*/}
              {/*</ScrollView>*/}
              {/*<View style={{ marginHorizontal: 25 }}>*/}
                <Text style={styles.consultFee}>Consultation Fee: $90</Text>
              {/*  <Text style={styles.availTimeSlotText}>*/}
              {/*    Preference timeslot(s):*/}
              {/*  </Text>*/}
              {/*</View>*/}

              <View style={{ marginHorizontal: 25, justifyContent: 'center', alignItems: 'center' }}>

              <Text style={[styles.availTimeSlotText]}>
                Number of preferred timeslot:
              </Text>
              </View>
              <Dropdown
                  style={[styles.dropdown]}
                  value={numOfTimeslot}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  itemTextStyle={styles.itemTextStyle}
                  iconStyle={styles.iconStyle}
                  data={numberOfTimeSlotList}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={numOfTimeslot}
                  searchPlaceholder="Search..."
                  onChange={(item) => {
                    setNumOfTimeSlot(item.value);
                    clickableScheduleCheck(item.value)
                    console.log(numOfTimeslot)
                  }}
              />

              <View>
              <View style={{ marginHorizontal: 25, marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.availTimeSlotText]}>
                  1st preferred timeslot:
                </Text>
              </View>
              <View style={{marginVertical: 20, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex:1}}>
                <TextInput
                    style={[ {justifyContent: 'flex-start',}]}
                    placeholderTextColor="#c7c7cd"
                    placeholder="From"
                    onPressIn={showBookingDatePickerStart1}
                    showSoftInputOnFocus={false}
                    value={bookingDate[0][0]}
                />
                </View>
                <Text >
                  to
                </Text>
                <View style={{flex:1}}>
                <TextInput
                    style={[ {justifyContent: 'flex-end',}]}
                    placeholderTextColor="#c7c7cd"
                    placeholder="Till"
                    onPressIn={showBookingDatePickerEnd1}
                    showSoftInputOnFocus={false}
                    value={bookingDate[0][1]}
                />
                </View>
              </View>
              <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
              />
              </View>

              {numOfTimeslot >= 2 && <View>
                <View style={{marginHorizontal: 25, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={[styles.availTimeSlotText]}>
                    2nd preferred timeslot:
                  </Text>
                </View>
                <View style={{marginVertical: 20, justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{flex: 1}}>
                    <TextInput
                        style={[{justifyContent: 'flex-start',}]}
                        placeholderTextColor="#c7c7cd"
                        placeholder="From"
                        onPressIn={showBookingDatePickerStart2}
                        showSoftInputOnFocus={false}
                        value={bookingDate[1][0]}
                    />
                  </View>
                  <Text>
                    to
                  </Text>
                  <View style={{flex: 1}}>
                    <TextInput
                        style={[{justifyContent: 'flex-end',}]}
                        placeholderTextColor="#c7c7cd"
                        placeholder="Till"
                        onPressIn={showBookingDatePickerEnd2}
                        showSoftInputOnFocus={false}
                        value={bookingDate[1][1]}
                    />
                  </View>
                </View>
                <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
              </View>
              }
              {numOfTimeslot >= 3 && <View>
                <View style={{marginHorizontal: 25, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={[styles.availTimeSlotText]}>
                    3rd preferred timeslot:
                  </Text>
                </View>
                <View style={{marginVertical: 20, justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{flex: 1}}>
                    <TextInput
                        style={[{justifyContent: 'flex-start',}]}
                        placeholderTextColor="#c7c7cd"
                        placeholder="From"
                        onPressIn={showBookingDatePickerStart3}
                        showSoftInputOnFocus={false}
                        value={bookingDate[2][0]}
                    />
                  </View>
                  <Text>
                    to
                  </Text>
                  <View style={{flex: 1}}>
                    <TextInput
                        style={[{justifyContent: 'flex-end',}]}
                        placeholderTextColor="#c7c7cd"
                        placeholder="Till"
                        onPressIn={showBookingDatePickerEnd3}
                        showSoftInputOnFocus={false}
                        value={bookingDate[2][1]}
                    />
                  </View>
                </View>
                <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
              </View>}




              <DateTimePickerModal
                  isVisible={isBookingDatePickerStart1}
                  mode="datetime"
                  onConfirm={handleBookingConfirmStart1}
                  isDarkModeEnabled={colorScheme === "dark"}
                  onCancel={hideBookingDatePickerStart1}
                  minuteInterval={30}
              />
                <DateTimePickerModal
                    isVisible={isBookingDatePickerEnd1}
                    mode="datetime"
                    onConfirm={handleBookingConfirmEnd1}
                    isDarkModeEnabled={colorScheme === "dark"}
                    onCancel={hideBookingDatePickerEnd1}
                    minuteInterval={30}
                />

              <DateTimePickerModal
                  isVisible={isBookingDatePickerStart2}
                  mode="datetime"
                  onConfirm={handleBookingConfirmStart2}
                  isDarkModeEnabled={colorScheme === "dark"}
                  onCancel={hideBookingDatePickerStart2}
                  minuteInterval={30}
              />
              <DateTimePickerModal
                  isVisible={isBookingDatePickerEnd2}
                  mode="datetime"
                  onConfirm={handleBookingConfirmEnd2}
                  isDarkModeEnabled={colorScheme === "dark"}
                  onCancel={hideBookingDatePickerEnd2}
                  minuteInterval={30}
              />

              <DateTimePickerModal
                  isVisible={isBookingDatePickerStart3}
                  mode="datetime"
                  onConfirm={handleBookingConfirmStart3}
                  isDarkModeEnabled={colorScheme === "dark"}
                  onCancel={hideBookingDatePickerStart3}
                  minuteInterval={30}
              />
              <DateTimePickerModal
                  isVisible={isBookingDatePickerEnd3}
                  mode="datetime"
                  onConfirm={handleBookingConfirmEnd3}
                  isDarkModeEnabled={colorScheme === "dark"}
                  onCancel={hideBookingDatePickerEnd3}
                  minuteInterval={30}
              />


                {/*<DateTimePickerModal*/}
                {/*    isVisible={isBookingDatePicker[0][1]}*/}
                {/*    mode="datetime"*/}
                {/*    onConfirm={handleBookingConfirmEnd1}*/}
                {/*    isDarkModeEnabled={colorScheme === "dark"}*/}
                {/*    onCancel={hideBookingDatePicker}*/}
                {/*/>*/}
                {/*{selectedDate && (*/}
                {/*  <View style={styles.timeContainer}>*/}
                {/*    {mockData.availDate[selectedDate].map((time, index) => (*/}
                {/*      <TouchableOpacity*/}
                {/*        key={index}*/}
                {/*        onPress={() => handleTimePress(time)}*/}
                {/*      >*/}
                {/*        <Text*/}
                {/*          style={[*/}
                {/*            styles.timeText,*/}
                {/*            selectedTime === time*/}
                {/*              ? styles.selectedTime*/}
                {/*              : styles.unselectedTime,*/}
                {/*          ]}*/}
                {/*        >*/}
                {/*          {time}*/}
                {/*        </Text>*/}
                {/*      </TouchableOpacity>*/}
                {/*    ))}*/}
                {/*  </View>*/}
                {/*)}*/}
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  isButtonClickable
                    ? styles.buttonClickable
                    : styles.buttonDisabled,
                ]}
                disabled={!isButtonClickable}
                onPress={() => {
                  postTimeslot()
                  // navigation.navigate("TelePaymentScreen", {
                  //   vetID: vetID,
                  //   selectedDate: selectedDate,
                  //   selectedTime: selectedTime,
                  // });
                }}
              >
                <Text
                  style={[
                    isButtonClickable
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
  dropdown: {
    fontFamily: "frank-regular",
    backgroundColor: "#F9F9F9",
    borderColor: "#D8D8D8",
    borderWidth: 0.5,
    borderRadius: 20,
    marginHorizontal: 100,
    marginTop: 10,
    paddingHorizontal: 20,
    color: "#5A7A7D",
    paddingVertical: 3,
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
  wrapper: {
    padding: 10,
    backgroundColor: '#FFFFFF'
  }
});

export default BookingDetails;
