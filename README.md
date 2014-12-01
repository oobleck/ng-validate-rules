Angular Validation Rules
========================

A lightweight directive wrapper around [AngularJS](http://www.angularjs.org) `$validators` to make displaying a field's (un)matched validation rules easier and prettier.

This module requires [AngularJS](http://www.angularjs.org) v1.3.0+

Includes basic default validation for typical passwords:

- Min length 8 chars
- One or more uppercase letters
- One or more lowercase letters
- One or more number

~~See this [demo](#TBD).~~

This came about from a need to display a password's validation rules and make them localizable and configurable from a `brand.json` file.

## Installation

#### Bower

```bash
$ bower install [--save-dev|--save] ng-validate-rules
```

Then add this to your app's dependencies:

```js
['ng-validate-rules']
```

#### Manually

Or download the main file and drop wherever you need it.

## Examples

### Basic usage

Include as a dependency in your app:
```js
angular.module('app', ['ng-validate-rules']);
```

Add `sr-validate-rules` to a form control element.

```html
<form name="myForm" id="myForm" novalidate>
  <!-- Here we collect the data and add the directive(s) to validate with -->
  <input type="password" name="password" id="password" required
    ng-model="password"
    sr-validate-rules="[{ description: 'At least 8 characters', regex: '(?=.{8,})' }]">
</form>
```

### Rules (un)match display

If you want to display the rules being applied and their match status, you can do something like this (untested).

```html
<!-- Here we display each rule that remains unmatched -->
<ul class="pw-rules">
  <li class="pw-rule"
    ng-if="!myForm.password.$error[desc]"
    ng-repeat="(desc, valid) in myForm.password.$validators" ng-if="desc !== 'required'">{{::desc}}</li>
</ul>
```

Or toggle classes to style by CSS (tested).

```html
<!-- Here we display each rule and update it's class as the value passes or fails -->
<ul class="pw-rules">
  <li class="pw-rule"
    ng-class="{'pw-rule-match': !myForm.password.$error[desc] && myForm.password.$dirty}"
    ng-repeat="(desc, valid) in myForm.password.$validators" ng-if="desc !== 'required'">{{::desc}}</li>
</ul>
```

*Note: It's recommended to not use the AngularJS native validation directives in conjunction with this as those will display less nicely. But there's no reason they can't coexist.*

### Rules format

The basic format of the rules is an array, as follows:

```js
[
  {
    "description": "Must be at least 8 characters",
    "regex": "(?=.{8,})"
  }
]
```

## TODO

- [x] Get into Bower registry
- [ ] Get into ngModules registry
- [ ] Add build & minification
- [ ] Add tests
