import { MaterialCommunityIcons } from '@expo/vector-icons'; // For icons
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from './_layout';
import axios from "axios"; 
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';




interface QuizInterface {
  title: string;
  btnOnPress: () => void;
  currentStep: number;
  totalSteps: number;
  label: string;
  text: string;
  cardIsSelected: boolean;
  onPress: () => void;
  isSelected: boolean;
}

const scoringMatrix: Record<number, Record<string, Record<string, number>>> = {
  0: { // Q1
    A: { Science: 2, Engineering: 1 },
    B: { Arts: 2, Architecture: 1 },
    C: { Engineering: 2, Architecture: 1 },
    D: { Management: 2 },
    E: { Medical: 1, SocialSciences: 2 }
  },
  1: { // Q2
    A: { Science: 2, DataScience: 1 },
    B: { Arts: 2, Design: 1 },
    C: { Engineering: 2 },
    D: { Management: 2 },
    E: { Psychology: 2, SocialSciences: 1 }
  },
  2: { // Q3
    A: { Science: 2, Research: 1 },
    B: { Arts: 2, SocialSciences: 1 },
    C: { Engineering: 2, Architecture: 1 },
    D: { Management: 2 },
    E: { Psychology: 2, Medical: 1 }
  },
  3: { // Q4
    A: { Research: 2, Science: 1 },
    B: { Arts: 2, Design: 1 },
    C: { Engineering: 2 },
    D: { Management: 2, Business: 1 },
    E: { Medical: 1, SocialSciences: 2 }
  },
  4: { // Q5
    A: { Science: 2, Research: 1 },
    B: { Arts: 2, Design: 1 },
    C: { Engineering: 2 },
    D: { Management: 2 },
    E: { Psychology: 2, Medical: 1 }
  },
  5: { // Q6
    A: { DataScience: 2, Research: 2 },
    B: { Arts: 2, Architecture: 1 },
    C: { Engineering: 2 },
    D: { Management: 2 },
    E: { Psychology: 2, Medical: 1 }
  },
  6: { // Q7
    A: { Research: 2, Science: 1 },
    B: { Arts: 2, Design: 1 },
    C: { Engineering: 2, Architecture: 1 },
    D: { Management: 2 },
    E: { SocialSciences: 2, Medical: 1 }
  },
  7: { // Q8
    A: { Science: 2, Engineering: 1 },
    B: { Arts: 2, Design: 1 },
    C: { Engineering: 2, Architecture: 1 },
    D: { Management: 2 },
    E: { Medical: 2, SocialSciences: 1 }
  },
  8: { // Q9
    A: { Science: 2, Research: 1 },
    B: { Arts: 2, Design: 1 },
    C: { Engineering: 2 },
    D: { Management: 2 },
    E: { SocialSciences: 2, Psychology: 1 }
  },
  9: { // Q10
    A: { Science: 2, Research: 1 },
    B: { Arts: 2, Design: 1 },
    C: { Engineering: 2, Architecture: 1 },
    D: { Management: 2 },
    E: { Psychology: 2, SocialSciences: 1 }
  }
};

const questionData = [
  {
    question: 'Which of these activities do you enjoy the most?',
    options: [
      { label: 'A', text: 'Solving complex puzzles and brain-teasers.' },
      { label: 'B', text: 'Creating art, music, or writing stories.' },
      { label: 'C', text: 'Working with your hands to build or fix things.' },
      { label: 'D', text: 'Organizing events, projects, or teams.' },
      { label: 'E', text: 'Helping and advising others.' },
    ],
  },
  {
    question: 'When faced with a new challenge, your first instinct is to:',
    options: [
      { label: 'A', text: 'Analyze the problem logically and research solutions.' },
      { label: 'B', text: 'Brainstorm creative, out-of-the-box ideas.' },
      { label: 'C', text: 'Jump in and start experimenting to see what works.' },
      { label: 'D', text: 'Create a detailed plan and a clear set of steps.' },
      { label: 'E', text: 'Consult with others to get their perspectives.' },
    ],
  },
  {
    question: 'In a team setting, you are most likely to be the one who:',
    options: [
      { label: 'A', text: 'Provides the data and facts to support decisions.' },
      { label: 'B', text: 'Motivates the team and fosters a positive atmosphere.' },
      { label: 'C', text: 'Focuses on the practical tasks and gets things done.' },
      { label: 'D', text: 'Manages the timeline and ensures goals are met.' },
      { label: 'E', text: 'Listens to everyone and resolves conflicts.' },
    ],
  },
  {
    question: 'Which statement best describes your ideal work environment?',
    options: [
      { label: 'A', text: 'Quiet and independent, with a focus on deep work.' },
      { label: 'B', text: 'Open and collaborative, with room for new ideas.' },
      { label: 'C', text: 'Active and hands-on, with tangible results.' },
      { label: 'D', text: 'Structured and organized, with clear objectives.' },
      { label: 'E', text: 'Supportive and communicative, with a sense of community.' },
    ],
  },
  {
    question: 'When learning a new skill, you prefer to:',
    options: [
      { label: 'A', text: 'Read books and articles on the theory and history of the subject.' },
      { label: 'B', text: 'Watch videos or tutorials and try to replicate them artistically.' },
      { label: 'C', text: 'Learn by doing, through trial and error.' },
      { label: 'D', text: 'Follow a step-by-step guide or course.' },
      { label: 'E', text: 'Find a mentor who can show you the ropes.' },
    ],
  },
  {
    question: 'Your biggest strength is:',
    options: [
      { label: 'A', text: 'My ability to see the patterns and connections in complex systems.' },
      { label: 'B', text: 'My vivid imagination and innovative thinking.' },
      { label: 'C', text: 'My practical skills and knack for physical tasks.' },
      { label: 'D', text: 'My attention to detail and ability to plan for the future.' },
      { label: 'E', text: 'My empathy and ability to understand different viewpoints.' },
    ],
  },
  {
    question: 'What kind of weekend activity sounds most appealing?',
    options: [
      { label: 'A', text: 'Visiting a museum or attending a lecture.' },
      { label: 'B', text: 'Going to an art gallery or a concert.' },
      { label: 'C', text: 'Building or fixing something around the house.' },
      { label: 'D', text: 'Planning and executing a trip or a social gathering.' },
      { label: 'E', text: 'Volunteering for a local charity or cause.' },
    ],
  },
  {
    question: 'You are motivated by:',
    options: [
      { label: 'A', text: 'The thrill of solving a difficult problem.' },
      { label: 'B', text: 'The opportunity for self-expression and creation.' },
      { label: 'C', text: 'The satisfaction of seeing a tangible result of your work.' },
      { label: 'D', text: 'The security of a stable routine and clear goals.' },
      { label: 'E', text: 'The chance to make a positive impact on others.' },
    ],
  },
  {
    question: 'When working on a project, you focus on:',
    options: [
      { label: 'A', text: 'The underlying principles and theories.' },
      { label: 'B', text: 'The overall vision and aesthetic.' },
      { label: 'C', text: 'The execution and physical assembly.' },
      { label: 'D', text: 'The deadlines and milestones.' },
      { label: 'E', text: 'The needs of the people involved.' },
    ],
  },
  {
    question: 'Which role in a group project would you most prefer?',
    options: [
      { label: 'A', text: 'The researcher, gathering information and data.' },
      { label: 'B', text: 'The creative lead, designing the look and feel.' },
      { label: 'C', text: 'The builder, putting all the pieces together.' },
      { label: 'D', text: 'The project manager, overseeing the process.' },
      { label: 'E', text: 'The team facilitator, ensuring everyone is heard.' },
    ],
  },
];

const YellowBtn = ({ title, onPress }: QuizInterface) => (
  <TouchableOpacity onPress={onPress} style={buttonStyles.button}>
    <Text style={buttonStyles.text}>{title}</Text>
  </TouchableOpacity>
);

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#f9f506ff',
    paddingVertical: 18,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  text: {
    color: '#333333',
    fontWeight: '700',
    fontSize: 16,
  },
});

const ProgressBar = ({ currentStep, totalSteps }: QuizInterface) => {
  const progressWidth = (currentStep / totalSteps) * 100;
  return (
    <View style={progressBarStyles.container}>
      <View style={progressBarStyles.track}>
        <View style={[progressBarStyles.fill, { width: `${progressWidth}%` }]} />
      </View>
    </View>
  );
};

const progressBarStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    height: 6,
  },
  track: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#f9f506ff',
    borderRadius: 20,
  },
});

const OptionCard = ({ label, text, isSelected, onPress }: QuizInterface) => (
  <TouchableOpacity
    activeOpacity={1}
    style={[
      optionStyles.card,
      isSelected && optionStyles.cardSelected
    ]}
    onPress={onPress}
  >
    <View style={optionStyles.leftSection}>
      <Text style={optionStyles.label}>{label}</Text>
    </View>
    <Text style={optionStyles.text}>{text}</Text>
    <View style={optionStyles.radioCircle}>
      {isSelected && <View style={optionStyles.radioInnerCircle} />}
    </View>
  </TouchableOpacity>
);

const optionStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#f9f506ff',
    backgroundColor: '#FFF9C4',
  },
  leftSection: {
    width: 32,
    height: 32,
    backgroundColor: '#E2E8F0',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#475569',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#f9f506ff',
  },
});

const streamIcons: Record<string, any> = {
  Science: <MaterialCommunityIcons name="atom" size={32} color="#1C1C0D" />,
  Engineering: <MaterialCommunityIcons name="cog" size={32} color="#1C1C0D" />,
  Arts: <MaterialCommunityIcons name="palette" size={32} color="#1C1C0D" />,
  Architecture: <MaterialCommunityIcons name="office-building" size={32} color="#1C1C0D" />,
  Management: <MaterialCommunityIcons name="account-tie" size={32} color="#1C1C0D" />,
  Medical: <MaterialCommunityIcons name="hospital" size={32} color="#f9f506" />,
  SocialSciences: <MaterialCommunityIcons name="account-group" size={32} color="#1C1C0D" />,
  DataScience: <MaterialCommunityIcons name="database" size={32} color="#1C1C0D" />,
  Psychology: <MaterialCommunityIcons name="brain" size={32} color="#1C1C0D" />,
  Research: <MaterialCommunityIcons name="microscope" size={32} color="#1C1C0D" />,
  Design: <MaterialCommunityIcons name="vector-square" size={32} color="#1C1C0D" />,
  Business: <MaterialCommunityIcons name="briefcase" size={32} color="#1C1C0D" />,
};

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [resultData, setResultData] = useState<Array<{stream: string, score: number}>>([]);
  const [geminiResult, setGeminiResult] = useState<string | null>(null);
  const router = useRouter();
  const { userProfile, setUserProfile } = useSession();
  const currentQuestion = questionData[currentQuestionIndex];
  const totalQuestions = questionData.length;

  const handleOptionSelect = (label: string) => {
    setSelectedOption(label);

    const streamPoints = scoringMatrix[currentQuestionIndex]?.[label] || {};
    setScores((prevScores) => {
      const updated = { ...prevScores };
      for (const stream in streamPoints) {
        updated[stream] = (updated[stream] || 0) + streamPoints[stream];
      }
      return updated;
    });
  };

  // Collect Q&A pairs
  const getQAData = () => {
    return questionData.map((q, idx) => ({
      question: q.question,
      answer: selectedOption
    }));
  };

  const fetchGeminiRecommendation = async () => {
    try {
      const answers = getQAData();
      const res = await axios.post("http://172.20.10.7:4000/llm/get-career-predicted", { answers });
      console.log("Gemini response:", res.data);
      setGeminiResult(res.data.recommendation);
    } catch (err) {
      console.error("Error fetching Gemini recommendation:", err);
      setGeminiResult("Could not fetch recommendation");
    }
  };

  const handleNext = async () => {
    if (selectedOption !== "") {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption("");
      } else {
        await fetchGeminiRecommendation();
        setModalVisible(true);
      }
    } else {
      Alert.alert("Please select an option before proceeding.");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption("");
    } else {
      router.back();
    }
  };

  const getBestStreams = () => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 3); 
  };

  const handleModalClose = () => {
    setModalVisible(false);
    router.replace("/mainNavigation");
  };

  return (
    <SafeAreaView style={screenStyles.container}>
      <View style={screenStyles.header}>
        <TouchableOpacity style={screenStyles.backButton} onPress={handleBack} activeOpacity={1}>
          <Image source={require("@/assets/images/BackWard.png")} style={screenStyles.backIcon} />
        </TouchableOpacity>
        <ProgressBar currentStep={currentQuestionIndex + 1} totalSteps={totalQuestions} title={''} btnOnPress={function (): void {
          throw new Error('Function not implemented.');
        }} label={''} text={''} cardIsSelected={false} onPress={function (): void {
          throw new Error('Function not implemented.');
        }} isSelected={false} />
        <Text style={screenStyles.questionCount}>{currentQuestionIndex + 1}/{totalQuestions}</Text>
      </View>

      <ScrollView
        style={screenStyles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={screenStyles.questionTitle}>{currentQuestion.question}</Text>
        <Text style={screenStyles.questionSubtitle}>Select the option that best describes you.</Text>

        {currentQuestion.options.map((option) => (
          <OptionCard
            key={option.label}
            label={option.label}
            text={option.text}
            isSelected={selectedOption === option.label}
            onPress={() => handleOptionSelect(option.label)}
            title=""
            btnOnPress={() => { }}
            currentStep={0}
            totalSteps={0}
            cardIsSelected={false}
          />
        ))}
      </ScrollView>

      <View style={screenStyles.bottomContainer}>
        <YellowBtn title="Next" onPress={handleNext} btnOnPress={function (): void {
          throw new Error('Function not implemented.');
        }} currentStep={0} totalSteps={0} label={''} text={''} cardIsSelected={false} isSelected={false} />
      </View>

      {/* Modal for result */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.title}>Your Best Suitable Field</Text>
            {geminiResult ? (
              <Text style={modalStyles.streamText}>{geminiResult}</Text>
            ) : (
              <Text style={modalStyles.streamText}>Loading...</Text>
            )}
            <TouchableOpacity style={modalStyles.closeButton} onPress={handleModalClose}>
              <Text style={modalStyles.closeButtonText}>Go to Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    height: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 18,
    height: 18,
  },
  questionCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  questionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1C1C0D',
    marginBottom: 8,
  },
  questionSubtitle: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 20,
  },
  bottomContainer: {
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#1C1C0D',
    textAlign: 'center',
  },
  iconRow: {
    width: '100%',
    marginBottom: 18,
  },
  streamContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  streamText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 6,
    color: '#333',
  },
  scoreText: {
    fontSize: 15,
    color: '#888',
    marginTop: 2,
  },
  closeButton: {
    marginTop: 18,
    backgroundColor: '#f9f506',
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
});

export default Quiz;
