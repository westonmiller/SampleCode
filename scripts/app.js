(function(document){
 	var app = document.querySelector('#app');

 	app.openAddDialog = function(){
 		app.$.addButton.innerHTML = 'Add';
 		app.$.addButton.removeEventListener('tap', this.saveResource);
 		app.$.addButton.addEventListener('tap', this.addResource);
 		app.$.addDialog.open();
 	};

 	app.closeAddDialog = function(){
 		app.$.addDialog.close();
 		app.resetForm();
 	};

 	app.isFormValid = function() {
 		if (app.$.resourceDropDown.selectedItemLabel === undefined) {
 			app.$.resourceDropDown.invalid = true;
 			return false;
 		} else {
 			app.$.resourceDropDown.invalid = false;
 		}
 		if (app.$.titleInput.value === "") {
			app.$.titleInput.invalid = true;
			return false;
		}
		else {
			app.$.titleInput.invalid = false;
		}
 		return true;
 	};

 	app.addResource = function(){
 		if (app.isFormValid()) {
	 		app.$.resourcesList.addResource(app.getResourceFromForm());
	 		app.closeAddDialog();
 		}
  	};

  	app.resetForm = function() {
	  		app.selectedDropboxId = -1;
	 		app.$.titleInput.value = "";
	 		app.$.authorInput.value = "";
	 		app.$.descriptionInput.value = "";
	 		app.$.resourceDropDown.invalid = false;
	 		app.$.titleInput.invalid = false;
  	};

  	app.editResource = function(resource, index){
  		app.selectedDropboxId = -1;
 		app.$.titleInput.value = resource.title;
 		app.$.authorInput.value = resource.author;
 		app.$.descriptionInput.value = resource.description;
 		var idLookUp = {
 			website: 0,
 			podcast: 1,
 			book: 2
 		};
 		app.selectedDropboxId = idLookUp[resource.type];
 		app.$.addButton.innerHTML = 'Save';
 		app.indexToEdit = index;
 		app.$.addButton.removeEventListener('tap', app.addResource);
 		app.$.addButton.addEventListener('tap', app.saveResource);
 		app.$.addDialog.open();
  	};
  	
  	app.getResourceFromForm = function() {
  		var resource = {
 			type: app.$.resourceDropDown.selectedItem.getAttribute('value'),
 			title: app.$.titleInput.value,
 			author: app.$.authorInput.value,
 			description: app.$.descriptionInput.value
 		};
 		return resource;
  	};

  	app.saveResource = function() {
  		if (app.isFormValid()) {
  			app.$.resourcesList.saveResource(app.getResourceFromForm(), app.indexToEdit);
  			app.closeAddDialog();
  		}
  	};

})(document);