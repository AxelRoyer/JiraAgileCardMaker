var FixVersionNavigator = function(jiraUrl, jiraNavigator) {
	this.jiraNavigator = jiraNavigator;
	this.jah = new JiraApiHandler(jiraUrl, this);
	this.projectsDropDown = {
		value: ko.observable(),
		visible: ko.observable(false),
		options: ko.observableArray(),
		change: function() {
			if (this.projectsDropDown.value().value !== "none") {
				this.jah.requestFixVersions(this.projectsDropDown.value().value);
			}
		}
	}
	this.sprintsDropDown = {
		value: ko.observable(),
		visible: ko.observable(false),
		options: ko.observableArray(),
		change: function() {
			if (this.sprintsDropDown.value().value !== "none") {
				this.jah.requestFixVersion(this.projectsDropDown.value().value,this.sprintsDropDown.value().value);
			}
		}
	}
}

FixVersionNavigator.prototype.getDisplayName = function() {
	return "Sprint";
}

FixVersionNavigator.prototype.init = function() {
	ko.applyBindingsToNode(document.getElementById("projectsDropDown"), null, this);
	ko.applyBindingsToNode(document.getElementById("sprintsDropDown"), null, this);
}

FixVersionNavigator.prototype.hideAll = function() {
	this.projectsDropDown.visible(false);
	this.sprintsDropDown.visible(false);
}

FixVersionNavigator.prototype.requestTopLevelData = function() {
	this.jah.requestProjects();
}

FixVersionNavigator.prototype.receiveProjectData = function(views) {
	this.projectsDropDown.visible(true);
	JiraNavigator.setDropDown(this.projectsDropDown.options, views, "key", "name");
}

FixVersionNavigator.prototype.receiveFixVersionsData = function(views) {
	this.sprintsDropDown.visible(true);
	JiraNavigator.setDropDown(this.sprintsDropDown.options, views, "id", "name");
}

FixVersionNavigator.prototype.receiveJiraCallback = function(jiras) {
	this.jiraNavigator.receiveJiraCallback(jiras);
}