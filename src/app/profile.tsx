import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <View style={styles.container}>
            <Text>My profile</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});