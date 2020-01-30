# SFDC_AuraEnabledScanner
Simple Command Line Utility that scans a src/classes folder and creates a csv listing properties and methods that are @AuraEnabled.

We had a task where we needed to list out all of the AuraEnabled methods in our Salesforce Org, so we could keep track of them since Salesforce is enabling their mandatory updates soon which changes some of how permissions are handled with @AuraEnabled items.

I knew we had a lot of these in our org.... (Approx 325, give or take) and I didn't want to go through the individual Apex classes one at a time tracking them down. So I wrote this to automate the process.

Usage:
`samuel@tt: AuraEnabledScanner $ node index.js ~/path/to/classes/directory`
