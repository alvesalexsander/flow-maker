class ScenarioStorage {
    
    scenarios = [];

    pushNewScenarios(scenariosArray) {
        this.scenarios.push(scenariosArray);
    }

    getScenarios() {
        return this.scenarios;
    }

    extractScenarios() {
        const flowchartScenarios = this.scenarios;
        this.scenarios = [];
        return flowchartScenarios;
    }
    
}

module.exports = ScenarioStorage;