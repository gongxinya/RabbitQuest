import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';

const RabbitInfo = () => (
    <Card style={styles.card}>
        <Card.Title title="Rabbit Facts" titleStyle={styles.title} />
        <Card.Content style={styles.layout}>
            <Image source={require('./images/rabbit.png')} style={styles.image} />
            <Text style={styles.content}>Rabbits belong to the family Leporidae, which is a family of mammals consisting of over 60 species. These adorable creatures are found in different habitats, including forests, meadows, grasslands, and deserts. Rabbits are herbivores and feed on a variety of vegetation such as grass, leaves, and bark. They are also an important part of the food chain, serving as prey for many predators such as foxes, wolves, and birds of prey.</Text>
        </Card.Content>
    </Card>
);

const RabbitBehavior = () => (
    <Card style={styles.card}>
        <Card.Title title="Rabbit Behavior" titleStyle={styles.title} />
        <Card.Content style={styles.layout}>
            <Image source={require('./images/rabbit1.png')} style={styles.image} />
            <Text style={styles.content}>Rabbits are social animals that live in groups called warrens. They are most active at dawn and dusk, and spend the rest of their day sleeping or grooming themselves. Rabbits communicate with each other through a variety of sounds and body language.
                The best living temperature for rabbits is between 10°C to 20°C (50°F to 68°F). Rabbits are more comfortable in cooler temperatures, but they can also tolerate warmer temperatures as long as they have access to shade and cool water.
                The ideal humidity range for rabbits is between 40% to 60%. Higher humidity can lead to respiratory problems and other health issues, while lower humidity can cause dry skin and other discomforts. It's important to maintain a consistent level of humidity to keep rabbits healthy and happy.</Text>
        </Card.Content>
    </Card>
);

const RabbitCare = () => (
    <Card style={styles.card}>
        <Card.Title title="Rabbit Survival" titleStyle={styles.title} />
        <Card.Content style={styles.layout}>
            <Image source={require('./images/rabbit2.png')} style={styles.image} />
            <Text style={styles.content}>Rabbits are known for their adorable and distinctive appearance, including their long ears and soft fur. But did you know that their fur color can also impact their ability to survive in different environments? It's true!
Rabbits come in a variety of colors and patterns, from white and brown to black and spotted. The color of a rabbit's fur can affect how well it blends in with its surroundings, which can have a big impact on its chances of survival.
For example, white rabbits are better suited for surviving in snowy environments, as their fur provides natural camouflage against the white background. This helps them to avoid predators and stay safe. On the other hand, black rabbits are better suited for survival at night or in non-snowy environments, as their dark fur makes them less visible in the shadows.</Text>
        </Card.Content>
    </Card>
);

const styles = StyleSheet.create({
    card: {
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    layout: {
        flexDirection: 'row',
        // alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 16,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginLeft: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
});

export default function App() {
    return (
        <View style={styles.container}>
            <RabbitInfo />
            <RabbitBehavior />
            <RabbitCare />
        </View>
    );
}
