/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"sapmlservices/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"sapmlservices/test/integration/pages/View1",
	"sapmlservices/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "sapmlservices.view.",
		autoWait: true
	});
});