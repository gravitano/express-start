/**
 * Created by rakhmatullahyoga on 11/07/17.
 */

'use strict';

module.exports = function (TOOLS, MODULES) {
    let welcomeService = TOOLS.SERVICES.WelcomeService;
    return {
        welcome: function(param, callback) {
            welcomeService.hello({message: "Hello world!"}, callback);
        }
    };
};