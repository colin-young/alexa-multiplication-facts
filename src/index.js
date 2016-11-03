/**
 Original code Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
 http://aws.amazon.com/apache2.0/
 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 
 Modifications Copyright 2016 Colin Young.
 */

/**
 * This sample shows how to create a simple Flash Card skill. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var two_times = [
    { "What is 2 times 1?": [ "2" ] },
    { "What is 2 times 2?": [ "4" ] },
    { "What is 2 times 3?": [ "6" ] },
    { "What is 2 times 4?": [ "8" ] },
    { "What is 2 times 5?": [ "10" ] },
    { "What is 2 times 6?": [ "12" ] },
    { "What is 2 times 7?": [ "14" ] },
    { "What is 2 times 8?": [ "16" ] },
    { "What is 2 times 9?": [ "18" ] },
    { "What is 2 times 10?": [ "20" ] },
    { "What is 2 times 11?": [ "22" ] },
    { "What is 2 times 12?": [ "24" ] }
];
var three_times = [
    { "What is 3 times 1?": [ "3" ] },
    { "What is 3 times 2?": [ "6" ] },
    { "What is 3 times 3?": [ "9" ] },
    { "What is 3 times 4?": [ "12" ] },
    { "What is 3 times 5?": [ "15" ] },
    { "What is 3 times 6?": [ "18" ] },
    { "What is 3 times 7?": [ "21" ] },
    { "What is 3 times 8?": [ "24" ] },
    { "What is 3 times 9?": [ "27" ] },
    { "What is 3 times 10?": [ "30" ] },
    { "What is 3 times 11?": [ "33" ] },
    { "What is 3 times 12?": [ "36" ] }
];
var four_times = [
    { "What is 4 times 1?": [ "4" ] },
    { "What is 4 times 2?": [ "8" ] },
    { "What is 4 times 3?": [ "12" ] },
    { "What is 4 times 4?": [ "16" ] },
    { "What is 4 times 5?": [ "20" ] },
    { "What is 4 times 6?": [ "24" ] },
    { "What is 4 times 7?": [ "28" ] },
    { "What is 4 times 8?": [ "32" ] },
    { "What is 4 times 9?": [ "36" ] },
    { "What is 4 times 10?": [ "40" ] },
    { "What is 4 times 11?": [ "44" ] },
    { "What is 4 times 12?": [ "48" ] }
];
var five_times = [
    { "What is 5 times 1?": [ "5" ] },
    { "What is 5 times 2?": [ "10" ] },
    { "What is 5 times 3?": [ "15" ] },
    { "What is 5 times 4?": [ "20" ] },
    { "What is 5 times 5?": [ "25" ] },
    { "What is 5 times 6?": [ "30" ] },
    { "What is 5 times 7?": [ "35" ] },
    { "What is 5 times 8?": [ "40" ] },
    { "What is 5 times 9?": [ "45" ] },
    { "What is 5 times 10?": [ "50" ] },
    { "What is 5 times 11?": [ "55" ] },
    { "What is 5 times 12?": [ "60" ] }
];
var six_times = [
    { "What is 6 times 1?": [ "6" ] },
    { "What is 6 times 2?": [ "12" ] },
    { "What is 6 times 3?": [ "18" ] },
    { "What is 6 times 4?": [ "24" ] },
    { "What is 6 times 5?": [ "30" ] },
    { "What is 6 times 6?": [ "36" ] },
    { "What is 6 times 7?": [ "42" ] },
    { "What is 6 times 8?": [ "48" ] },
    { "What is 6 times 9?": [ "54" ] },
    { "What is 6 times 10?": [ "60" ] },
    { "What is 6 times 11?": [ "66" ] },
    { "What is 6 times 12?": [ "72" ] }
];
var seven_times = [
    { "What is 7 times 1?": [ "7" ] },
    { "What is 7 times 2?": [ "14" ] },
    { "What is 7 times 3?": [ "21" ] },
    { "What is 7 times 4?": [ "28" ] },
    { "What is 7 times 5?": [ "35" ] },
    { "What is 7 times 6?": [ "42" ] },
    { "What is 7 times 7?": [ "49" ] },
    { "What is 7 times 8?": [ "56" ] },
    { "What is 7 times 9?": [ "63" ] },
    { "What is 7 times 10?": [ "70" ] },
    { "What is 7 times 11?": [ "77" ] },
    { "What is 7 times 12?": [ "84" ] }
];
var eight_times = [
    { "What is 8 times 1?": [ "8" ] },
    { "What is 8 times 2?": [ "16" ] },
    { "What is 8 times 3?": [ "24" ] },
    { "What is 8 times 4?": [ "32" ] },
    { "What is 8 times 5?": [ "40" ] },
    { "What is 8 times 6?": [ "48" ] },
    { "What is 8 times 7?": [ "56" ] },
    { "What is 8 times 8?": [ "64" ] },
    { "What is 8 times 9?": [ "72" ] },
    { "What is 8 times 10?": [ "80" ] },
    { "What is 8 times 11?": [ "88" ] },
    { "What is 8 times 12?": [ "96" ] }
];
var nine_times = [
    { "What is 9 times 1?": [ "9" ] },
    { "What is 9 times 2?": [ "18" ] },
    { "What is 9 times 3?": [ "27" ] },
    { "What is 9 times 4?": [ "36" ] },
    { "What is 9 times 5?": [ "45" ] },
    { "What is 9 times 6?": [ "54" ] },
    { "What is 9 times 7?": [ "63" ] },
    { "What is 9 times 8?": [ "72" ] },
    { "What is 9 times 9?": [ "81" ] },
    { "What is 9 times 10?": [ "90" ] },
    { "What is 9 times 11?": [ "99" ] },
    { "What is 9 times 12?": [ "108" ] }
];
var ten_times = [
    { "What is 10 times 1?": [ "10" ] },
    { "What is 10 times 2?": [ "20" ] },
    { "What is 10 times 3?": [ "30" ] },
    { "What is 10 times 4?": [ "40" ] },
    { "What is 10 times 5?": [ "50" ] },
    { "What is 10 times 6?": [ "60" ] },
    { "What is 10 times 7?": [ "70" ] },
    { "What is 10 times 8?": [ "80" ] },
    { "What is 10 times 9?": [ "90" ] },
    { "What is 10 times 10?": [ "100" ] },
    { "What is 10 times 11?": [ "110" ] },
    { "What is 10 times 12?": [ "120" ] }
];
var eleven_times = [
    { "What is 11 times 1?": [ "11" ] },
    { "What is 11 times 2?": [ "22" ] },
    { "What is 11 times 3?": [ "33" ] },
    { "What is 11 times 4?": [ "44" ] },
    { "What is 11 times 5?": [ "55" ] },
    { "What is 11 times 6?": [ "66" ] },
    { "What is 11 times 7?": [ "77" ] },
    { "What is 11 times 8?": [ "88" ] },
    { "What is 11 times 9?": [ "99" ] },
    { "What is 11 times 10?": [ "110" ] },
    { "What is 11 times 11?": [ "121" ] },
    { "What is 11 times 12?": [ "132" ] }
];
var twelve_times = [
    { "What is 12 times 1?": [ "12" ] },
    { "What is 12 times 2?": [ "24" ] },
    { "What is 12 times 3?": [ "36" ] },
    { "What is 12 times 4?": [ "48" ] },
    { "What is 12 times 5?": [ "60" ] },
    { "What is 12 times 6?": [ "72" ] },
    { "What is 12 times 7?": [ "84" ] },
    { "What is 12 times 8?": [ "96" ] },
    { "What is 12 times 9?": [ "108" ] },
    { "What is 12 times 10?": [ "120" ] },
    { "What is 12 times 11?": [ "132" ] },
    { "What is 12 times 12?": [ "144" ] }
];

var all_questions = two_times
    .concat(three_times)
    .concat(four_times)
    .concat(five_times)
    .concat(six_times)
    .concat(seven_times)
    .concat(eight_times)
    .concat(nine_times)
    .concat(ten_times)
    .concat(eleven_times)
    .concat(twelve_times);

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

     if (event.session.application.applicationId !== "amzn1.ask.skill.2c7f4a4e-0dee-4cbf-a5a2-81838ce24aa8") {
         context.fail("Invalid Application ID");
      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("SubGameIntent" == intentName) {
        handleSubGameIntent(intent, session, callback);
    } else if ("SubGameOnlyIntent" == intentName) {
        handleSubGameIntent(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
            handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } 
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 1;
var GAME_LENGTH = 5;
var QUESTIONS = all_questions;
var CARD_TITLE = "Multiplication Facts"; 

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Let's practice some multiplication facts.",
        shouldEndSession = false,
        spokenQuestion = "Which facts would you like to practice? For example say two times table for two times facts, or all for all numbers.",
        repromptText = spokenQuestion;

    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText
    };

    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = QUESTIONS.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < QUESTIONS.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = QUESTIONS[gameQuestionIndexes[correctAnswerIndex]][Object.keys(QUESTIONS[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes.gameStarted && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Sorry, your answer is not is our list. " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && intent.slots.Answer.value.toUpperCase() == correctAnswerText.toUpperCase()) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for learning with Alexa!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(QUESTIONS[gameQuestions[currentQuestionIndex]]);
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText =  spokenQuestion ;
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText +=  ""
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "gameStarted": gameInProgress,
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    QUESTIONS[gameQuestions[currentQuestionIndex]][Object.keys(QUESTIONS[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleSubGameIntent(intent, session, callback) {
    switch (intent.slots.SubGame.value.toLowerCase())
    {
        case "2 times table":
            QUESTIONS = two_times;
            break;
        case "3 times table":
            QUESTIONS = three_times;
            break;
        case "4 times table":
            QUESTIONS = four_times;
            break;
        case "5 times table":
            QUESTIONS = five_times;
            break;
        case "6 times table":
            QUESTIONS = six_times;
            break;
        case "7 times table":
            QUESTIONS = seven_times;
            break;
        case "8 times table":
            QUESTIONS = eight_times;
            break;
        case "9 times table":
            QUESTIONS = nine_times;
            break;
        case "10 times table":
            QUESTIONS = ten_times;
            break;
        case "11 times table":
            QUESTIONS = eleven_times;
            break;
        case "12 times table":
            QUESTIONS = twelve_times;
            break;
        case "all":
            QUESTIONS = all_questions;
            break;
    }

    var sessionAttributes = {},
        //CHANGE THIS TEXT
        speechOutput = "I will ask you " + GAME_LENGTH.toString()
            + " multiplication facts from the " + intent.slots.SubGame.value
            + ", try to get as many right as you can. Just say the answer. Let's begin. ",
        shouldEndSession = false,
        gameStarted = true,
        gameQuestions = populateGameQuestions(QUESTIONS),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex, QUESTIONS),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(QUESTIONS[gameQuestions[currentQuestionIndex]]),
        repromptText = spokenQuestion,

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += ""
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "gameStarted": gameStarted,
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            QUESTIONS[gameQuestions[currentQuestionIndex]][Object.keys(QUESTIONS[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Set a flag to track that we're in the Help state.
    if (session.attributes) {
        session.attributes.userPromptedToContinue = true;
    } else {
        // In case user invokes and asks for help simultaneously.
        session.attributes = { userPromptedToContinue: true };
    }
    
    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "To start a new game at any time, say, start new game. "
        + "To repeat the last element, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "Try to get the right answer. "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a custom closing statment when the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Thanks for practicing your multiplication facts!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return 1;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}