/**
 * @License : MIT
 * @Author : Nuno F.
 * @Date : 2026-04-22
 */

// ----- Expo / React ----- //
import {JSX} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";

// ----- Props types ----- //
type Props = {
    title: string;
    label?: string;
};

/**
 * Loader component that displays a centered loading card with a title, spinner, and label.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Title text displayed above the spinner.
 * @param {string} props.label - Label text displayed below the spinner.
 * @returns {JSX.Element} The rendered loader overlay.
 */
export function Loader({title, label}: Props): JSX.Element {
    return (
        <View style={styles.overlay}>
            <View style={styles.card}>
                <View style={styles.badge}/>
                <Text style={styles.title}>{title}</Text>
                <ActivityIndicator size="large" color="#b00020"/>
                <Text style={styles.label}>{label}</Text>
            </View>
        </View>
    );
}

// ----- Styles ----- //
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
    },
    card: {
        width: 220,
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderRadius: 22,
        backgroundColor: "#fff",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eee",
        gap: 12,
    },
    badge: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#b00020",
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111",
    },
    label: {
        fontSize: 15,
        color: "#555",
    },
});
