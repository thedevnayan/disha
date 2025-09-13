import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const ProgressBar = ({ currentStep, totalSteps }:QuizInterface) => {
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

const OptionCard = ({ label, text, isSelected, onPress } : QuizInterface) => (
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

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
const router = useRouter();
  const currentQuestion = questionData[currentQuestionIndex];
  const totalQuestions = questionData.length;

  const handleNext = () => {
    if (selectedOption !== "") {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption("");
      } else {
        Alert.alert('Quiz Complete!', 'You have finished the quiz.');
      }
    } else {
      Alert.alert('Error', 'Please select an option.');
    }
  };

    const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(""); // Clear selection on back navigation
    } else {
        router.back();
    }
  };

  return (
    <SafeAreaView style={screenStyles.container}>
      <View style={screenStyles.header}>
        <TouchableOpacity style={screenStyles.backButton} onPress={handleBack} activeOpacity={1}>
          <Image source={require("@/assets/images/BackWard.png")} style={screenStyles.backIcon} />
        </TouchableOpacity>
        <ProgressBar currentStep={currentQuestionIndex + 1} totalSteps={totalQuestions} title={''} btnOnPress={function (): void {
                  throw new Error('Function not implemented.');
              } } label={''} text={''} cardIsSelected={false} onPress={function (): void {
                  throw new Error('Function not implemented.');
              } } isSelected={false} />
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
                onPress={() => setSelectedOption(option.label)} title={''} btnOnPress={function (): void {
                    throw new Error('Function not implemented.');
                } } currentStep={0} totalSteps={0} cardIsSelected={false}          />
        ))}
      </ScrollView>

      <View style={screenStyles.bottomContainer}>
        <YellowBtn title="Next" onPress={handleNext} btnOnPress={function (): void {
                  throw new Error('Function not implemented.');
              } } currentStep={0} totalSteps={0} label={''} text={''} cardIsSelected={false} isSelected={false} />
      </View>
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

export default Quiz;
