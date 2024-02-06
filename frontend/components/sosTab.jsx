import React , {useState}from "react";
import {Text, View ,TouchableOpacity , Image, SafeAreaView , FlatList , StyleSheet} from 'react-native';
import globalStyles from "../style/global";


const SosTab = ({ navigation }) =>{

    const[vets, SetVets] = useState([
        {Vet: 'A', id: 1}, 
        {Vet: 'B', id: 2}, 
        {Vet: 'C', id: 3}, 
        {Vet: 'D', id: 4}, 
    ]);

    return(
    <View style ={globalStyles.container}>
        <SafeAreaView style={{
            flex:1
            }}>
        <TouchableOpacity>
            <Image source= {require('../assets/sosPage-assets/Vector.png')}
                    style= {{
                        position: "absolute",
                        top : 50,
                        left : 30
                    }}
            />

        </TouchableOpacity>
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
        <Text style={{
            color: '#164348',
            justifyContent: "center",
            fontFamily: "frank-regular",
            fontSize: 11,
            fontStyle: "normal",
            fontWeight: "300",
            lineHeight: 18,
            paddingLeft: 40,
            marginTop: 15,
            paddingRight : 40
        }}>
            Before scheduling an urgent visit to the vet, would you like to explore VetPal Assist?
        </Text>
        <TouchableOpacity 
            style={{
            marginLeft: 100,
            marginRight: 100,
            marginTop : 20,
            paddingTop: 20,
            backgroundColor: "#FBE9F2",
            borderRadius: 15,
            height: 130,
            alignItems: 'center',
        }}>
            <Image source= {require('../assets/sosPage-assets/lightbulb-logo.png')}
                   resizeMode='contain' 
                   style={{
                    flex: .7 ,
                    }} 
            />
            <Text style = {{
                color: '#164348',
                justifyContent: "center",
                fontFamily: "frank-regular",
                fontSize: 15,
                paddingTop: 5,
            }}
            >VetPal Assist</Text>
            <Text style = {{
                color: '#164348',
                justifyContent: "center",
                fontFamily: "frank-regular",
                fontSize: 10,
                paddingTop: 5,
                paddingLeft: 18,
                paddingRight: 18
            }}
            >Offering tailored triage solutions and expert advice at your fingertips.</Text>
       </TouchableOpacity>
        <View style={{
            marginLeft: 100,
            marginRight: 100,
            paddingTop: 20,
            paddingBottom: 20,
            
        }}>
        </View>
        </SafeAreaView>

        <SafeAreaView style={
            {flex:1.1, backgroundColor: 'white'}
        }>
            <FlatList
                data = {vets}
                renderItem={( {item} )=> (
                   <View style = { styles.item }
                   ><Text>{item.Vet}</Text>
                   </View>
                )}
            />
        </SafeAreaView>
    </View>
    );
}

const styles = StyleSheet.create({
    item: {
        marginTop: 18,
        padding: 30,
        backgroundColor: '#F2F2F2',
        marginHorizontal: 10,
        marginLeft: 25,
        marginRight: 25,
        height: 150,
        borderRadius: 30,
        
    }
})
export default SosTab;