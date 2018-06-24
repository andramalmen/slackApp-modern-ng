import '../sass/styles.scss'
import angular from 'angular'
import RootComponent from './root.component'
import ChatModule from './chat/chat.module'

/**
 * @ngdoc module
 * @name root
 *
 * @description
 *
 * This is the root module
 *
 **/
const RootModule = angular
    .module('root', [ChatModule.name])
    .component('root', RootComponent)

export default RootModule
