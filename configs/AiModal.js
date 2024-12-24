import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { Asset } from 'expo-asset';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { zhCN } from 'date-fns/locale';


export const loadModel = async () => {
  await tf.ready();

  const model = await tf.loadGraphModel(bundleResourceIO(
    require('../assets/ncf_model_js/model.json'),
    require('../assets/ncf_model_js/group1-shard1of2.bin')
  ))
  return model;
};
export const recommendTours = async (model, userId, userEncoder, tourEncoder, numTours, topN = 5) => {
  // Step 1: Encode user ID
  const encodedUserId = userEncoder.transform([userId])[0]; // Simulate user encoding

  // Step 2: Create input arrays
  const allTours = Array.from({ length: numTours }, (_, i) => i); // Equivalent to np.arange(num_tours)
  const userArray = tf.tensor2d(Array(numTours).fill([encodedUserId]), [numTours, 1]); // Shape (numTours, 1)
  const tourArray = tf.tensor2d(allTours.map(t => [t]), [numTours, 1]); // Shape (numTours, 1)

  try {
    // Step 3: Predict using the model
    const predictions = model.predict([userArray, tourArray]);
    const predictionScores = await predictions.data(); // Flatten predictions

    // Step 4: Sort predictions and extract top indices
    const sortedIndices = Array.from(predictionScores)
      .map((score, index) => ({ score, index }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topN)
      .map(item => item.index);

    // Step 5: Decode tour indices back to tour IDs
    const recommendedTourIds = sortedIndices.map(index => tourEncoder.inverseTransform(index)); // Simulate decoding

    console.log(`Recommended tours for user ${userId}:`, recommendedTourIds);
    return recommendedTourIds;
  } catch (error) {
    console.error('Error during recommendation:', error);
    throw error;
  } finally {
    userArray.dispose();
    tourArray.dispose();
  }
};

