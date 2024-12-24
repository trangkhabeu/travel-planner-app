import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    Image,
    Text,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useRouter } from 'expo-router';


export default function TripCard({ cardData = [] }) {
    const [saved, setSaved] = React.useState([]);
    const router = useRouter();

    useEffect(() => {
        console.log(cardData);
    }, [cardData]);

    const handleSave = useCallback(
        tour_id => {
            if (saved.includes(tour_id)) {
                // remove listing id from the `saved` array
                setSaved(saved.filter(val => val !== tour_id));
            } else {
                // add listing id to the `saved` array
                setSaved([...saved, tour_id]);
            }
        },
        [saved],
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.headerAction} />

                    {/* <View style={styles.headerAction}>
                        <TouchableOpacity onPress={() => { }}>
                            <FeatherIcon color="#000" name='sliders' size={21} />
                        </TouchableOpacity>
                    </View> */}
                </View>

                <Text style={styles.headerTitle}>Place to stay</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {cardData.map(({ tour_id, image, tour_name, duration, price, average_rating, description, location }, index) => {
                    return (
                        <TouchableOpacity key={tour_id || `item-${index}`} onPress={() =>
                            router.push({
                                pathname: "/discover/[id]",
                                params: {
                                    id: tour_id,
                                    tour_name: tour_name,
                                    description: description,
                                    price: price,
                                    image: image,
                                    location: location,
                                    duration: duration,
                                    average_rating: average_rating,
                                },
                            })
                        }>
                            <View style={styles.card}>
                                <View style={styles.cardLikeWrapper}>
                                    <TouchableOpacity onPress={() => handleSave(tour_id)}>
                                        <View style={styles.cardLike}>
                                            <FontAwesome
                                                color={saved.includes(tour_id) ? '#ea266d' : '#222'}
                                                name="heart"
                                                solid={saved.includes(tour_id)}
                                                size={20} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.cardTop}>
                                    <Image
                                        alt=""
                                        resizeMode="cover"
                                        style={styles.cardImg}
                                        source={{ uri: image }} />
                                </View>

                                <View style={styles.cardBody}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.cardTitle}>{tour_name}</Text>
                                    </View>
                                    <View style={styles.cardRating}>
                                        <Text style={styles.cardDates}>{duration}</Text>
                                        <FontAwesome
                                            color="#ea266d"
                                            name="star"
                                            solid={true}
                                            size={12}
                                            style={{ marginBottom: 2 }} />
                                        <Text style={styles.cardStars}>{average_rating}</Text>
                                    </View>
                                    <Text style={styles.cardPrice}>
                                        <Text style={{ fontWeight: '600' }}>{price} VND </Text>
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}

            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    content: {
        paddingTop: 8,
        paddingHorizontal: 16,
    },
    /** Header */
    header: {
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    headerTop: {
        marginHorizontal: -6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerAction: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
    },
    /** Card */
    card: {
        position: 'relative',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardLikeWrapper: {
        position: 'absolute',
        zIndex: 1,
        top: 12,
        right: 12,
    },
    cardLike: {
        width: 40,
        height: 40,
        borderRadius: 9999,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTop: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardImg: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardBody: {
        padding: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardRating: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#232425',
        marginRight: 'auto',
    },
    cardStars: {
        marginLeft: 2,
        marginRight: 8,
        fontSize: 15,
        fontWeight: '500',
        color: '#232425',
    },
    cardDates: {
        marginTop: 4,
        fontSize: 16,
        color: '#595a63',
        marginRight: 'auto',
    },
    cardPrice: {
        marginTop: 6,
        fontSize: 16,
        color: '#232425',
    },
});