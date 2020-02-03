/* eslint-disable */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("sapmlservices.controller.View1", {

		onInit: function () {},
		uploadPress: function (oEvent) {
			var oFileUploader = this.getView().byId("fileUploader");
			if (!oFileUploader.getValue()) {
				MessageToast.show("Dosya seçmeniz gerekiyor");
				return;
			}
			var that = this;
			var f = document.querySelector('input[type="file"]').files[0];
			
			var data = new FormData();
			data.append('files', document.getElementById("__xmlview0--fileUploader-fu").files[0], document.getElementById(
				"__xmlview0--fileUploader-fu").files[0].name);
			var xhr = new XMLHttpRequest();
			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					var vjson = JSON.parse(this.responseText);
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(vjson.predictions[0]);
					that.getView().setModel(oModel);
					var label = vjson.predictions[0].results[0].label;
					var score = vjson.predictions[0].results[0].score;
					var searchURL =
						"https://www.amazon.com.tr/s/ref=nb_sb_noss?__mk_tr_TR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&url=search-alias%3Daps&field-keywords=";
					sap.m.URLHelper.redirect(searchURL + vjson.predictions[0].results[0].label + "&N=", true);
				}
			});

			xhr.open("POST", "https://sandbox.api.sap.com/ml/prodimgclassifier/inference_sync");
			xhr.setRequestHeader("apikey", "c3Mg3PSbtNxSguHIyLjGfAUMwZWyCGYP");
			xhr.setRequestHeader("accept", "application/json");
			xhr.send(data);
		}

	});
});