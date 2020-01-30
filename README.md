# SFDC_AuraEnabledScanner
Simple Command Line Utility that scans a src/classes folder and creates a csv listing properties and methods that are @AuraEnabled.

We had a task where we needed to list out all of the AuraEnabled methods in our Salesforce Org, so we could keep track of them since Salesforce is enabling their mandatory updates soon which changes some of how permissions are handled with @AuraEnabled items.

I knew we had a lot of these in our org.... (Approx 325, give or take) and I didn't want to go through the individual Apex classes one at a time tracking them down. So I wrote this to automate the process.

Usage:
`samuel@tt: AuraEnabledScanner $ node index.js ~/path/to/classes/directory`



/**
Copyright 2020 Samuel Reyes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/