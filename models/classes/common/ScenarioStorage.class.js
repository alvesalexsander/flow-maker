class ScenarioStorage {
    
    // scenarios = [];
    scenarios = {};
    qtdScenarios = 0;

    pushNewScenarios(scenariosArray) {
        // this.scenarios.push(scenariosArray);
        this.qtdScenarios++;
        this.scenarios[this.qtdScenarios] = scenariosArray;
    }

    getScenarios() {
        return this.scenarios;
    }

    extractScenarios() {
        const flowchartScenarios = this.scenarios;
        // this.scenarios = [];
        this.scenarios = {};
        this.qtdScenarios = 0;
        return flowchartScenarios;
    }
    
}

module.exports = ScenarioStorage;