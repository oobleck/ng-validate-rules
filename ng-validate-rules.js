;(function(ng) {
  'use strict';

  var moduleName = "ng-validate-rules";
  var dirName = 'srValidateRules';
  // This is an array because the description needs to be translatable
  var defaultRules = [{
    "description": "At least 8 characters",
    "regex": "(?=.{8,})"
  }, {
    "description": "At least one uppercase character",
    "regex": "(?=.*[A-Z])"
  }, {
    "description": "At least one lowercase character",
    "regex": "(?=.*[a-z])"
  }, {
    "description": "At least one number",
    "regex": "(?=.*\\d)"
  }];

  /**
    Example usage:

    ```html
    <form name="myForm" id="myForm" novalidate>
      <!-- Here we collect the data and add the directive(s) to validate with -->
      <input type="password" name="password" id="password" required
        ng-model="password"
        sr-validate-rules="[{ description: 'At elast 8 characters', regex: '(?=.{8,})' }]">

    <!-- Here we display each rule and update it's class as the value passes or fails -->
      <ul class="pw-rules">
        <li class="pw-rule"
          ng-class="{'pw-rule-match': !myForm.password.$error[desc] && myForm.password.$dirty}"
          ng-repeat="(desc, valid) in myForm.password.$validators" ng-if="desc !== 'required'">{{::desc}}</li>
      </ul>
    </form>
    ```
  */

  Directive.$inject = [];

  function Directive() {
    function link(scope, elem, attr, ngModel) {
      // Check for valid elements and ngModel presence.
      if (!ngModel || !/input|select|textarea|meter|progress/i.test(elem[0].nodeName)) {
        return false;
      }

      // Detect passe din rules, or use default rules
      var rules = scope.rules || defaultRules;
      // Itterate over each rule and add it to the field's $validators object
      ng.forEach(rules, function(val, idx) {
        /*
          Here we're using the rule.description as the key in $validators so we
          can easily display it in the template, if desired.
          AngularJS doens't care what the validator key is, as long as it's valid JS
        */
        ngModel.$validators[val.description] = function validator(modelValue, viewValue) {
          var value = modelValue || viewValue;
          /*
            We're stripping off any leading/trailing slashes to ensure it works
            as valid regex in this directive.
          */
          var rx = new RegExp(val.regex.replace(/^\/|\/$/g, ''));
          return rx.test(value);
        };
      });
    }

    var Directive = {
      restrict: 'A',
      require: 'ngModel',
      link: link,
      scope: {
        // This is how we can pass in custom validation rules/messages
        rules: '=' + dirName
      }
    };

    return Directive;
  }

  ng.module(moduleName, [])
    .directive(dirName, Directive);

}(angular));
