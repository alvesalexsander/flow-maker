const ScenarioStorage = require('./models/classes/common/ScenarioStorage.class');
const ScenarioTracker = require('./models/classes/common/ScenarioTracker.class');
const SessionStorage = require('./models/classes/common/SessionStorage.class');

global.scenarioStorage = new ScenarioStorage();
global.scenarioTracker = new ScenarioTracker();
global.sessionStorage = new SessionStorage();