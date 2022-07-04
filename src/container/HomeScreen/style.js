import { StyleSheet } from "react-native";

const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    videorecordButton:{
        width:65,height:65,backgroundColor:'#f2784b',borderRadius:35,position:'absolute',bottom:20,right:20,justifyContent:'center',alignItems:'center',elevation:5,
    },
    nodataContainer:{
        flex:1,justifyContent:'center',alignItems:'center'
    },
    nodataText:{
        color:'#a6a4a2',textAlign:'center'
    }
})
export default styles;