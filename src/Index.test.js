import React from 'react';
import ReactDOM from 'react-dom';
import ReactShallowRenderer from 'react-test-renderer/shallow';


import Header from './components/Header';
import AddSubtopic from './components/AddSubtopic';
import AddSubTopicForm from './components/AddSubTopicForm';
import AddTopic from './components/AddTopic';
import Challenge from './components/Challenge';
import HandwritingQuestion from './components/HandwritingQuestions';
import Home from './components/Home';
import InputQuestion from './components/InputQuestion';
import ManageQuestions from './components/ManageQuestions';
import MultipleChoiceImages from './components/MultipleChoiceImages';
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion';
import Notification from './components/Notification';
import PrivateRoute from './components/PrivateRoute';
import Question from './components/Question';

import SendNotification from './components/SendNotification';
import SignIn from './components/SignIn';
import Subtopic from './components/Subtopic';
import SubtopicDetail from './components/SubtopicDetail';
import TodayChallenge from './components/TodayChallenge';
import Topic from './components/Topic';
import TopicDetail from './components/TopicDetail';
import VoiceInputQuestion from './components/VoiceInputQuestions';



//Snapshot tests - will take a snapshot of rendered component and highlight when changes have been made
//Press u in the command line to approve changes

test('it should render header', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render add sub topic', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<AddSubtopic />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render add sub topic form', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<AddSubTopicForm />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render add topic', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<AddTopic />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render Challenge', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Challenge />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render HandwritingQuestion', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<HandwritingQuestion />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render Home', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Home />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render InputQuestion', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<InputQuestion />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render InputQuestion', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<InputQuestion />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render ManageQuestions', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<ManageQuestions />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render multichoice images', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<MultipleChoiceImages />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render multichoice questions', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<MultipleChoiceQuestion/>);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render notif', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Notification />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render private routes', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<PrivateRoute />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});


test('it should render sendnotif', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<SendNotification />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('it should render SignIn', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<SignIn />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});



test('it should render TodayChallenge', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<TodayChallenge />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});



test('it should render VoiceInputQuestionicDetail', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<VoiceInputQuestion />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});



