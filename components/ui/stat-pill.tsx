/**
 * @License : MIT
 * @Author : Nuno F.
 * @Date : 2026-04-24
 */

// ----- Expo / React ----- //
import React from 'react'
import {StyleSheet, Text, View} from "react-native";

// ----- Props types ----- //
type Props = {
    label: string;
    value: string | number;
}

export default function StatPill({label, value}: Props) {
    return (
        <View style={styles.pill}>
            <Text style={styles.pillValue}>{value}</Text>
            <Text style={styles.pillLabel}>{label}</Text>
        </View>
    )
}

// ----- Styles ----- //
const styles = StyleSheet.create({
    pill: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 18,
        paddingVertical: 14,
        alignItems: "center",
        gap: 3,
    },
    pillValue: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "900",
    },
    pillLabel: {
        color: "#CBD5E1",
        fontSize: 12,
        fontWeight: "600",
    },
})
