/* Magic Mirror
 * Module: MMM-peopleinspace
 *
 * By Jonas Studer http://jonasstuder.com
 * MIT Licensed.
 */

Module.register("MMM-peopleinspace",{

	// Default module config.
	defaults: {
		apiEndPoint: "http://www.howmanypeopleareinspacerightnow.com/peopleinspace.json",
		updateInterval: 60 * 60 * 1000, 
		animationSpeed: 1000,
		initialLoadDelay: 1000,
		retryDelay: 2000,
		showNumber: true,
		showList: true,
		dayLabel: false
	},
	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define required scripts.
	getStyles: function() {
		return ["MMM-peopleinspace.css"];
	},

	// Define required translations.
	getTranslations: function() {
		// The translations for the defaut modules are defined in the core translation files.
		// Therefor we can just return false. Otherwise we should have returned a dictionairy.
		// If you're trying to build yiur own module including translations, check out the documentation.
		return false;
	},
	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		this.people = [];
		this.num_people = 0;
		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);
		this.updateTimer = null;
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		if (!this.loaded) {
			wrapper.innerHTML = this.translate("LOADING");
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		var table = document.createElement("table");
		table.className = "small";

		if(this.config.showNumber){
			var num_row = document.createElement("tr");
			table.appendChild(num_row);
			var num_cell = document.createElement("td");
			num_cell.colSpan = "3";
			num_cell.className = "spacepeeps_numberCell xlarge";
			num_cell.innerHTML = this.num_people;
			num_row.appendChild(num_cell);
		}

		if(this.config.showList) {
			for (var p in this.people) {
				var person = this.people[p];

				var row = document.createElement("tr");
				table.appendChild(row);

				var dayCell = document.createElement("td");
				dayCell.className = "spacepeeps_dayCell";
				dayCell.innerHTML = person.daysinspace();
				row.appendChild(dayCell);

				var flagCell = document.createElement("td");
				flagCell.className = "spacepeeps_flagCell bright";
				row.appendChild(flagCell);

				var countryflag = document.createElement("img");
				countryflag.src = person.countryflag;
				flagCell.appendChild(countryflag);

				var nameCell = document.createElement("td");
				nameCell.innerHTML = person.person_name;
				nameCell.className = "spacepeeps_nameCell bright";
				row.appendChild(nameCell);
			}
		}
		return table
	},

	getHeader: function() {
		return this.data.header;
	},

	updatePeople: function() {
		var url = this.config.apiEndPoint
		var self = this;
		var retry = true;
		this.sendSocketNotification('SPACEPEEPS_UPDATE', url);
	},

	/* processPeople(data)
	 * Uses the received data to set the various values.
	 *
	 * argument data object - Astronaut information received form howmanypeopleareinspacerightnow.com.
	 */
	processPeople: function(data) {
		this.people = [];
		this.num_people = data.number;
		for (var i = 0, count = data.people.length; i < count; i++) {

			var person = data.people[i];
			var self = this;
			self.people.push({
				person_name : person.name,
				launchdate: moment.utc(person.launchdate),
				countryflag : person.countryflag,
				daysinspace: function() {
					var now = moment.utc();
					var duration = moment.duration(now.diff(this.launchdate));
					var daysinspace = parseInt(duration.asDays());
					if(self.config.dayLabel){
						daysinspace += ' days'
					}					
					return daysinspace
				}
			});
		}

		this.show(this.config.animationSpeed, {lockString:this.identifier});
		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	},

	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		clearTimeout(this.updateTimer);
		this.updateTimer = setTimeout(function() {
			self.updatePeople();
		}, nextLoad);
	},
  	socketNotificationReceived: function(notification, payload) {
      	if (notification === 'SPACEPEEPS_DATA') {
        	Log.info('received SPACEPEEPS_DATA');
			this.processPeople(payload);
      	}
  	}

});

