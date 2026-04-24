// ----- Expo / React ----- //
import {StyleSheet, Text, Pressable} from 'react-native'
import React from 'react'

// ----- Props ----- //
type Props = {
    title: string;
    subtitle: string;
    onPress: () => void;
    tone?: "light" | "dark";
}

export default function ActionCard({title, subtitle, onPress, tone}: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.actionCard,
                tone === "dark" ? styles.actionCardDark : styles.actionCardLight,
            ]}
        >
            <Text
                style={[
                    styles.actionTitle,
                    tone === "dark" ? styles.actionTitleDark : styles.actionTitleLight,
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.actionSubtitle,
                    tone === "dark"
                        ? styles.actionSubtitleDark
                        : styles.actionSubtitleLight,
                ]}
            >
                {subtitle}
            </Text>
        </Pressable>
    )
}

// ----- Styles ----- //
const styles = StyleSheet.create({
    actionCard: {
        flex: 1,
        borderRadius: 20,
        padding: 16,
        minHeight: 120,
        justifyContent: "space-between",
        borderWidth: 1,
    },
    actionCardLight: {
        backgroundColor: "#fff",
        borderColor: "#E5E7EB",
    },
    actionCardDark: {
        backgroundColor: "#B00020",
        borderColor: "#B00020",
    },
    actionTitle: {
        fontSize: 18,
        fontWeight: "900",
    },
    actionTitleLight: {
        color: "#111827",
    },
    actionTitleDark: {
        color: "#fff",
    },
    actionSubtitle: {
        fontSize: 14,
        lineHeight: 20,
    },
    actionSubtitleLight: {
        color: "#4B5563",
    },
    actionSubtitleDark: {
        color: "#FCE7F3",
    },
})
