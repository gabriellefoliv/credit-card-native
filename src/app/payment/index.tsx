import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { CARD_SIDE, CreditCard } from "@/components/credit-card";
import { useSharedValue } from "react-native-reanimated";
import { Input } from "@/components/input";
import { useState } from "react";



export function Payment() {
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [date, setDate] = useState("")
    const [code, setCode] = useState("")

    const cardSide = useSharedValue(CARD_SIDE.front)

    function showFrontCard() {
        cardSide.value = CARD_SIDE.front
    }

    function showBackCard() {
        cardSide.value = CARD_SIDE.back
    }

    function handleFlipCard() {
        if(cardSide.value === CARD_SIDE.front) {
            showBackCard()
        } else {
            showFrontCard()
        }
    }

    return (
        <View style={styles.container}>

            <CreditCard 
                cardSide={cardSide} 
                data={{ 
                    name, 
                    number: number.replace(/(\d{4})(?=\d)/g, "$1 "), 
                    date, 
                    code 
                }}
            />
            
            <TouchableOpacity style={styles.button} onPress={handleFlipCard}>
                <Text>Inverter</Text>
            </TouchableOpacity>

            <View style={styles.form}>
                <Input placeholder="Nome do titular" onChangeText={setName} onFocus={showFrontCard}/>
                <Input placeholder="Número do cartão" keyboardType="numeric" maxLength={16} onChangeText={setNumber} onFocus={showBackCard} />

                <View style={styles.InputInline}>
                    <Input placeholder="01/02" style={styles.smallInput} onChangeText={setDate} onFocus={showBackCard}/>
                    <Input placeholder="123" style={styles.smallInput} keyboardType="numeric" onChangeText={setCode} onFocus={showBackCard}/>
                </View>
            </View>
        </View>
    )
}