import angular from 'angular';
import uiRouter from 'angular-ui-router';
import MatchWindowHeight from './shared/utilities/match-window-height.directive';

import ChatPageComponent from './containers/chat-page/chat-page.component';

const ChatModule = angular
  .module('components.chat', [
    uiRouter
  ])
  .config(/*@ngInject*/ ($stateProvider) => {
    $stateProvider
      .state('chat', {
        url: '',
        component: 'chatPage'
      })
  })
  .directive('matchWindowHeight', MatchWindowHeight)
  .component('chatPage', ChatPageComponent)

export default ChatModule;
