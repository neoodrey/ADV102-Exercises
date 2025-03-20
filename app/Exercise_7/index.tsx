import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';

const generateMathQuestions = (amount: number) => {
    const questions = [];
    const operators = ['+', '-', '*', '/'];

    for (let i = 0; i < amount; i++) {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const operator = operators[Math.floor(Math.random() * operators.length)];

        let question = `${num1} ${operator} ${num2} = ?`;
        let correctAnswer;

        switch (operator) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                correctAnswer = num1 - num2;
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
            case '/':
                correctAnswer = (num1 / num2).toFixed(1);
                break;
        }

        const incorrectAnswers = [correctAnswer + 1, correctAnswer - 1, correctAnswer + 2];

        questions.push({
            question,
            correct_answer: correctAnswer.toString(),
            incorrect_answers: incorrectAnswers.map(ans => ans.toString()),
        });
    }
    return questions;
};

const Quiz = () => {
    const [numQuestions, setNumQuestions] = useState<string>('10');
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const startQuiz = () => {
        const amount = Math.max(10, Math.min(30, parseInt(numQuestions, 10)));
        setQuestions(generateMathQuestions(amount));
        setCurrentIndex(0);
        setScore(0);
        setQuizStarted(true);
        setQuizCompleted(false);
    };

    const handleAnswer = (answer: string) => {
        if (answer === questions[currentIndex].correct_answer) {
            setScore(score + 1);
        }
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setQuizStarted(false);
            setQuizCompleted(true);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {!quizStarted && !quizCompleted ? (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter number of questions (10-30):</Text>
                    <TextInput
                        value={numQuestions}
                        onChangeText={setNumQuestions}
                        keyboardType='numeric'
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.button} onPress={startQuiz}>
                        <Text style={styles.buttonText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            ) : quizCompleted ? (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Quiz Completed!</Text>
                    <Text style={styles.resultText}>Your Score: {score}/{questions.length}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setQuizCompleted(false)}>
                        <Text style={styles.buttonText}>Restart Quiz</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                questions.length > 0 && currentIndex < questions.length && (
                    <View style={styles.quizContainer}>
                        <Text style={styles.question}>{questions[currentIndex].question}</Text>
                        {questions[currentIndex].incorrect_answers.concat(questions[currentIndex].correct_answer)
                            .sort(() => Math.random() - 0.5)
                            .map((answer, index) => (
                                <TouchableOpacity key={index} style={styles.answerButton} onPress={() => handleAnswer(answer)}>
                                    <Text style={styles.answerText}>{answer}</Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                )
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    quizContainer: {
        width: '100%',
        alignItems: 'center',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    answerButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: '80%',
        alignItems: 'center',
    },
    answerText: {
        color: '#fff',
        fontSize: 16,
    },
    resultContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Quiz;
