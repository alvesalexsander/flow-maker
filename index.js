const ScenarioStorage = require('./models/classes/common/ScenarioStorage.class');
const SessionStorage = require('./models/classes/common/SessionStorage.class');

global.scenarioStorage = new ScenarioStorage();
global.sessionStorage = new SessionStorage();