
var OS = require('os');
var OS_UTILS = require('os-utils');
var MOMENT = require('moment');
var MOMENT_TIMEZONE = require('moment-timezone');
var PUSAGE = require('pidusage');
var PROCESS = require('process');
var DEFERRED    = require('deferred');


function NODE_STATUS_HEALTH(){

	this.serviceStartTime   = 	MOMENT();
	this.lastRunningTime	= 	"";

}

NODE_STATUS_HEALTH.prototype = {

	status : function(){

		var self = this;
		var deffered  = DEFERRED();

		OS_UTILS.cpuUsage(function(cpuusages){

			PUSAGE.stat(process.pid, function(err, stat) {

			    var currentDate =  MOMENT();
			    var duration    = MOMENT.duration(currentDate.diff(self.serviceStartTime));
			    var output      = "<p>";
			    
			    output          += "<br/><b>Current  time:</b> " + currentDate.format("MM-DD-YYYY HH:mm:ss");
			    //output          += "<br/><b>Current  timezone:</b> " + MOMENT_TIMEZONE.tz().guess();
			    output          += "<br/><b>Service start time:</b> " + self.serviceStartTime.format("MM-DD-YYYY HH:mm:ss");; 
			    output          += "<br/><b>Last running time:</b> " ;
			    if (self.lastRunningTime != ""){ 
			        output += self.lastRunningTime.format("MM-DD-YYYY HH:mm:ss");;
			    }
			    output          += "<br/><b>Total running time:</b> "  + duration.days() + " days " +  duration.hours() + " hours " +  duration.minutes() + " minutes " +  duration.seconds() + " seconds " ;
			    output          += "<br/><br/><b>Host name:</b> " + OS.hostname();
			    output          += "<br/><b>Type:</b> " + OS.type();
			    output          += "<br/><b>Platform:</b> " + OS.platform();
			    output          += "<br/><b>Arch:</b> " + OS.arch();
			    output          += "<br/><b>Release:</b> " + OS.release();  
			    output          += "<br/><b>Total Memory(MB):</b> " + Number((OS.totalmem()/1000000).toFixed(2));  
			    output          += "<br/><b>Free Memory(MB):</b> " + Number((OS.freemem()/1000000).toFixed(2));  
			    output          += "<br/><b>Container Memory(MB):</b> " + process.env['MARATHON_APP_RESOURCE_MEM'];  
			    output          += "<br/><b>Total CPU Usage (%):</b> " + Number((cpuusages).toFixed(2));  
			    output          += "<br/><b>Process CPU Usage (%): </b> " + Number((stat.cpu).toFixed(2));  
			    output          += "<br/><b>Process Memory(MB): </b> " + Number((stat.memory/1000000).toFixed(2));  
			    output          += "<br/><b>Process Id : </b> " + PROCESS.pid;  
			    output          += "</p>";
				deffered.resolve(output);			 
			})
		});

      return deffered.promise;

	},

	health : function(){

      var deffered  = DEFERRED();

		OS_UTILS.cpuUsage(function(cpuusages){
		    var cpuUsagesPercentage = Number((cpuusages).toFixed(2));
		    var memoryUsagesPercentage = 100 - Number(((OS.freemem()/OS.totalmem())*100).toFixed(2));

		    if(cpuUsagesPercentage > 50){
				deffered.resolve({
					"Status" : "Unhealthy",
					"CPU Usages" : cpuUsagesPercentage,
					"Memory" : memoryUsagesPercentage,
					"Reason" : "CPU Usages High"
				});
		    }else if(memoryUsagesPercentage > 50){
				deffered.resolve( {
					"Status" : "Unhealthy",
					"CPU Usages" : cpuUsagesPercentage,
					"Memory" : memoryUsagesPercentage,
					"Reason" : "Memory Usages High"
				});
		    } else{
				deffered.resolve( {
					"Status" : "Healthy",
					"CPU Usages" : cpuUsagesPercentage,
					"Memory In Use" : memoryUsagesPercentage
				});	
		    }
		});

		return deffered.promise;

	}
}

module.exports = new NODE_STATUS_HEALTH();