import React from "react";
import {Text, View} from 'react-native';
import globalStyles from "../style/global";

const SosTab = ({ navigation }) =>{
    return(
    <View style ={globalStyles.container}>
        <Text style= {
            {color: '#164348',
            justifyContent: "center",
            fontFamily: "frank-regular",
            fontSize: 30,
            fontStyle: "normal",
            fontWeight: "900",
            lineHeight: 50,
            paddingLeft: 40,
            marginTop: 90}
        }>
            Emergency Pet Aid
        </Text>
        <Text style= {
            {color: '#164348',
            justifyContent: "center",
            fontFamily: "frank-regular",
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: "300",
            lineHeight: 18,
            paddingLeft: 40}
        }>
            Instant Access to Nearest Vet Clinic Now!
        </Text>
    </View>
    );
}
export default SosTab;