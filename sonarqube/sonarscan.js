const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: "sqp_60f6b763ec24b8f3fc1569b1fadfcf2ac3f3a7d7",
        options: {
            'sonar.projectName': 'terra-solutions',
            'sonar.projectDescription': 'Here I can add a description of my project',
            'sonar.projectKey': 'terra-solutions',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.login':'admin',
            'sonar.password':'baqthiar@21'
        }
    },
    () => process.exit()
)