// Initialize the app
var app = angular.module('yaml_OMORI_translator', []);

// Define the controller for the app
app.controller('yaml_OMORI_translator_ctrl', function ($scope) {

    // Initialize the original messages array
    $scope.messages = [];
    $scope.translated = [];

    // Function to extract the text from the YAML string
    function extractText(yamlStr) {
        var obj = jsyaml.load(yamlStr);
        return obj['text'];
    }

    // Function to load a YAML file
    $scope.loadYaml = function () {
        var input = document.getElementById('load-file');
        input.accept = '.yaml';
        var file = input.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            $scope.$apply(function () {
                $scope.messages = [];
                var yamlStr = reader.result;
                var obj = jsyaml.load(yamlStr);
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        $scope.messages.push({
                            key_name: key,
                            faceset: obj[key]['faceset'],
                            faceindex: obj[key]['faceindex'],
                            text: obj[key]['text']
                        });

                        $scope.translated.push({
                            key_name: key,
                            faceset: obj[key]['faceset'],
                            faceindex: obj[key]['faceindex'],
                            text: obj[key]['text']
                        });
                    }
                }
            });
        };
    };

    // Function to save the translations as a YAML file
    $scope.saveYaml = function () {
        var obj = {};
        for (var i = 0; i < $scope.messages.length; i++) {
            obj['message_' + i] = {
                foo: 07,
                text: $scope.messages[i].translation,
                baz: 'bar.'
            };
        }
        var yamlStr = jsyaml.dump(obj);
        var blob = new Blob([yamlStr], { type: 'text/yaml' });
        var a = document.createElement('a');
        a.download = 'translations.yaml';
        a.href = URL.createObjectURL(blob);
        a.click();
    };

});
