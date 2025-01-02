// import React, { useState, useLayoutEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Pressable,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
// } from "react-native";

// const QuestionItem = ({ item }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [attempts, setAttempts] = useState([]);

//   const handleOptionPress = (option) => {
//     if (isCorrect) return; // Prevent selection if already correct

//     setSelectedOption(option);
//     const correct = option === item.correctAnswer;
//     setIsCorrect(correct);

//     if (!correct) {
//       setAttempts([...attempts, option]);
//     }
//   };

//   const getOptionStyle = (option) => {
//     if (selectedOption === option) {
//       if (isCorrect) {
//         return styles.correctOption;
//       }
//       return styles.wrongOption;
//     }
//     if (attempts.includes(option)) {
//       return styles.attemptedOption;
//     }
//     return styles.optionButton;
//   };

//   const getOptionTextStyle = (option) => {
//     if (selectedOption === option) {
//       if (isCorrect) {
//         return styles.correctOptionText;
//       }
//       return styles.wrongOptionText;
//     }
//     if (attempts.includes(option)) {
//       return styles.attemptedOptionText;
//     }
//     return styles.optionText;
//   };

//   return (
//     <View style={styles.questionCard}>
//       <Text style={styles.questionText}>{item.question}</Text>

//       <View style={styles.optionsContainer}>
//         {item.options.map((option, index) => (
//           <Pressable
//             key={index}
//             style={[getOptionStyle(option)]}
//             android_ripple={{ color: "#ccc" }}
//             onPress={() => handleOptionPress(option)}
//           >
//             <Text style={[getOptionTextStyle(option)]}>{option}</Text>
//           </Pressable>
//         ))}
//       </View>

//       {selectedOption && (
//         <View style={styles.feedbackContainer}>
//           {isCorrect ? (
//             <Text style={styles.correctFeedback}>Correct! Well done!</Text>
//           ) : (
//             <Text style={styles.wrongFeedback}>
//               Try again! That wasn't the right answer.
//             </Text>
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const Home = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useLayoutEffect(() => {
//     async function handleFetchQuestions() {
//       try {
//         const response = await fetch("http://192.168.31.101:3000/questions");
//         // const response = await fetch(
//         //   "https://quiz-api-ie4eb.ondigitalocean.app/questions"
//         // );
//         const data = await response.json();
//         const questionsArray = data.questions || data;
//         setQuestions(questionsArray);
//       } catch (err) {
//         setError("Failed to fetch questions");
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     handleFetchQuestions();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.loadingText}>Loading questions...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       <View style={styles.header}>
//         <Text style={styles.headerText}>Quiz</Text>
//       </View>

//       <FlatList
//         data={questions}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => <QuestionItem item={item} />}
//         contentContainerStyle={styles.listContainer}
//         ListEmptyComponent={
//           <Text style={styles.emptyText}>No questions available</Text>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     padding: 16,
//     backgroundColor: "#ffffff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e0e0e0",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//   },
//   listContainer: {
//     padding: 16,
//   },
//   questionCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   questionText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 16,
//   },
//   optionsContainer: {
//     gap: 12,
//   },
//   optionButton: {
//     padding: 16,
//     borderRadius: 8,
//     backgroundColor: "#f8f9fa",
//     borderWidth: 1,
//     borderColor: "#e0e0e0",
//   },
//   correctOption: {
//     padding: 16,
//     borderRadius: 8,
//     backgroundColor: "#e8f5e9",
//     borderWidth: 1,
//     borderColor: "#4caf50",
//   },
//   wrongOption: {
//     padding: 16,
//     borderRadius: 8,
//     backgroundColor: "#ffebee",
//     borderWidth: 1,
//     borderColor: "#f44336",
//   },
//   attemptedOption: {
//     padding: 16,
//     borderRadius: 8,
//     backgroundColor: "#fff3e0",
//     borderWidth: 1,
//     borderColor: "#ffb74d",
//   },
//   optionText: {
//     fontSize: 16,
//     color: "#444",
//   },
//   correctOptionText: {
//     fontSize: 16,
//     color: "#2e7d32",
//     fontWeight: "600",
//   },
//   wrongOptionText: {
//     fontSize: 16,
//     color: "#c62828",
//     fontWeight: "600",
//   },
//   attemptedOptionText: {
//     fontSize: 16,
//     color: "#f57c00",
//     fontWeight: "600",
//   },
//   feedbackContainer: {
//     marginTop: 16,
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   correctFeedback: {
//     color: "#2e7d32",
//     fontSize: 16,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   wrongFeedback: {
//     color: "#c62828",
//     fontSize: 16,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   loadingText: {
//     fontSize: 18,
//     color: "#666",
//   },
//   errorText: {
//     fontSize: 18,
//     color: "#f44336",
//   },
//   emptyText: {
//     textAlign: "center",
//     fontSize: 16,
//     color: "#666",
//     marginTop: 16,
//   },
// });

// export default Home;

import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";

const SubjectFilter = ({ subjects, selectedSubject, onSelectSubject }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      <Pressable
        style={[
          styles.filterChip,
          !selectedSubject && styles.selectedFilterChip,
        ]}
        onPress={() => onSelectSubject(null)}
      >
        <Text
          style={[
            styles.filterText,
            !selectedSubject && styles.selectedFilterText,
          ]}
        >
          All
        </Text>
      </Pressable>
      {subjects.map((subject) => (
        <Pressable
          key={subject}
          style={[
            styles.filterChip,
            selectedSubject === subject && styles.selectedFilterChip,
          ]}
          onPress={() => onSelectSubject(subject)}
        >
          <Text
            style={[
              styles.filterText,
              selectedSubject === subject && styles.selectedFilterText,
            ]}
          >
            {subject}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const QuestionItem = ({ item }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState([]);

  const handleOptionPress = (option) => {
    if (isCorrect) return;

    setSelectedOption(option);
    const correct = option === item.correctAnswer;
    setIsCorrect(correct);

    if (!correct) {
      setAttempts([...attempts, option]);
    }
  };

  const getOptionStyle = (option) => {
    if (selectedOption === option) {
      if (isCorrect) {
        return styles.correctOption;
      }
      return styles.wrongOption;
    }
    if (attempts.includes(option)) {
      return styles.attemptedOption;
    }
    return styles.optionButton;
  };

  const getOptionTextStyle = (option) => {
    if (selectedOption === option) {
      if (isCorrect) {
        return styles.correctOptionText;
      }
      return styles.wrongOptionText;
    }
    if (attempts.includes(option)) {
      return styles.attemptedOptionText;
    }
    return styles.optionText;
  };

  return (
    <View style={styles.questionCard}>
      <Text style={styles.subjectText}>{item.subject}</Text>
      <Text style={styles.questionText}>{item.question}</Text>

      <View style={styles.optionsContainer}>
        {item.options.map((option, index) => (
          <Pressable
            key={index}
            style={[getOptionStyle(option)]}
            android_ripple={{ color: "#ccc" }}
            onPress={() => handleOptionPress(option)}
          >
            <Text style={[getOptionTextStyle(option)]}>{option}</Text>
          </Pressable>
        ))}
      </View>

      {selectedOption && (
        <View style={styles.feedbackContainer}>
          {isCorrect ? (
            <Text style={styles.correctFeedback}>Correct! Well done!</Text>
          ) : (
            <Text style={styles.wrongFeedback}>
              Try again! That wasn't the right answer.
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjectOptions = [
    "Agronomy",
    "Horticulture",
    "Animal Husbandry",
    "Soil Science",
    "Plant Pathology",
    "Agricultural Entomology",
    "Agricultural Economics",
    "Agricultural Engineering",
    "Plant Breeding and Genetics",
    "Crop Physiology",
    "Agroforestry",
    "Sericulture",
    "Agricultural Biotechnology",
    "Organic Farming",
    "Weed Science",
    "Agricultural Microbiology",
    "Extension Education",
    "Environmental Science",
    "Agricultural Statistics",
    "Computer Science",
    "Economics",
  ];

  useLayoutEffect(() => {
    async function handleFetchQuestions() {
      try {
        const response = await fetch(
          "https://quiz-api-ie4eb.ondigitalocean.app/questions"
        );
        const data = await response.json();
        const questionsArray = data.questions || data;
        setQuestions(questionsArray);
      } catch (err) {
        setError("Failed to fetch questions");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    handleFetchQuestions();
  }, []);

  const filteredQuestions = selectedSubject
    ? questions.filter((q) => q.subject === selectedSubject)
    : questions;

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      

      <SubjectFilter
        subjects={subjectOptions}
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
      />

      <FlatList
        data={filteredQuestions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <QuestionItem item={item} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {selectedSubject
              ? `No questions available for ${selectedSubject}`
              : "No questions available"}
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  filterContainer: {
    padding: 16,
    backgroundColor: "#fff",
    gap: 8,
  },
  filterWrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 60,
    maxWidth: 120,
  },
  selectedFilterChip: {
    backgroundColor: '#2196f3',
    borderColor: '#1976d2',
  },
  filterText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  selectedFilterText: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  questionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subjectText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  correctOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#e8f5e9",
    borderWidth: 1,
    borderColor: "#4caf50",
  },
  wrongOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ffebee",
    borderWidth: 1,
    borderColor: "#f44336",
  },
  attemptedOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff3e0",
    borderWidth: 1,
    borderColor: "#ffb74d",
  },
  optionText: {
    fontSize: 16,
    color: "#444",
  },
  correctOptionText: {
    fontSize: 16,
    color: "#2e7d32",
    fontWeight: "600",
  },
  wrongOptionText: {
    fontSize: 16,
    color: "#c62828",
    fontWeight: "600",
  },
  attemptedOptionText: {
    fontSize: 16,
    color: "#f57c00",
    fontWeight: "600",
  },
  feedbackContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  correctFeedback: {
    color: "#2e7d32",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  wrongFeedback: {
    color: "#c62828",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "#f44336",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 16,
  },
});

export default Home;
