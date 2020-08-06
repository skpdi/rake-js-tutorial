/*
 * Sentinel-Shuttle for Javascript
 *
 * by Data Infrastructure
 * Template version
 * - 0.1.1 : first release
 * - 0.1.2 : log_id methods
 * - 0.1.3 : remove _$ssToken
 * - 0.1.4 : getImmutableJSONObject()
 * - 0.1.5 : extra partition exception
 *
 * Author
 *  - Sentinel Shuttle Generator v3.0
 *  - hyeyoung.song@sk.com (Data Infrastructure Team)
 */

/**
 * body layout, global variable to support runtime action key selection
 *
 */

var _$gShuttleBodyLayout_DiRakeClientTestJsSentinelShuttle = {
    
};

/**
 * constructor for shuttle
 */
function DiRakeClientTestJsSentinelShuttle(userSpecifiedKeys) {

    /**
     * polyfill utils
     *
     * SEN-309
     *     - Object.keys (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
     * SEN-397
     *     - Array.isArray (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
     */

    var util = {};

    util.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };

    util.getObjectKeys = (function() {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function(obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());

    /** constructor start */
    var log = {
        sentinel_meta: {
            _$schemaId: "DiRakeClientTestJs",
            _$projectId: "",
            _$fieldOrder: {},
            _$encryptionFields: [
                    "device_id"
            ]
        }
    };

    var headers = [
        "base_time",
    "local_time",
    "recv_time",
    "os_name",
    "os_version",
    "resolution",
    "screen_width",
    "screen_height",
    "language_code",
    "rake_lib",
    "rake_lib_version",
    "ip",
    "recv_host",
    "token",
    "log_version",
    "device_id",
    "device_model",
    "manufacturer",
    "carrier_name",
    "network_type",
    "app_release",
    "app_build_number",
    "browser_name",
    "browser_version",
    "referrer",
    "url",
    "document_title",
    "page_id",
    "action_id",
    "reserved01",
    "reserved02"
    ];

    var bodies = [
        "context_id",
    "context_desc"
    ];

    var action_key_fields = [
        "page_id", "action_id"
    ];
    
    var body_layout = _$gShuttleBodyLayout_DiRakeClientTestJsSentinelShuttle;

    var extra_partition_field = '';

    var shuttle = {};

    function capitalize(str) {
        str = str === null ? '' : String(str);
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    for (var i = 0, headersLength = headers.length; i < headersLength; i++) {

        log.sentinel_meta._$fieldOrder[headers[i]] = i;
        if(headers[i] === "log_version") {
            log[headers[i]] = "19.06.28:3.1.0:0";
        } else {
            log[headers[i]] = "";
            shuttle['set' + capitalize(headers[i])] = (function (header) {
                return function (value) {
                    log[header] = value;
                    return shuttle;
                };
            })(headers[i]);
        }
    }

    for (var i = 0, bodiesLength = bodies.length; i < bodiesLength; i++) {
        shuttle['set' + capitalize(bodies[i])] = (function (body) {
            return function (value) {
                log._$body[body] = value;
                return shuttle;
            };
        })(bodies[i]);
    }

    log._$body = {};
    log.sentinel_meta._$fieldOrder._$body = headers.length;

    for (var i = 0, headersLength = headers.length; i < headersLength; i++) {
        shuttle['get' + capitalize(headers[i])] = (function (header) {
            return function () {
                return log[header];
            };
        })(headers[i]);
    }

    for (var i = 0, bodiesLength = bodies.length; i < bodiesLength; i++) {
        shuttle['get' + capitalize(bodies[i])] = (function (body) {
            return function () {
                return log._$body[body];
            };
        })(bodies[i]);
    }

    /**
     * @deprecated As of Sentinel-Shuttle 1.5.30, use getImmutableJSONObject() instead
     */
    shuttle.get = function () {
        return log;
    };

    shuttle.getImmutableJSONObject = function () {
        
        if(extra_partition_field !== '' && (!log[extra_partition_field] || log[extra_partition_field] === "") ) {
            throw extra_partition_field + ' should not be empty.';
        }
        var immutable = JSON.parse(JSON.stringify(log));
        return immutable;
    };

    shuttle.getBodyFields = function () {
        return bodies.slice();
    };

    
    
    shuttle.getHeaderFields = function() {
        return headers.slice();
    };

    shuttle.getActionKeyFields = function() {
        return action_key_fields.slice();
    };

    shuttle.getFromLog = function (jsonLog) {
        jsonLog["sentinel_meta"] = log.sentinel_meta;
        return jsonLog;
    };

    shuttle.getSentinelMeta = function () {
        return log.sentinel_meta;
    };

    shuttle.toShuttleObject = function(data) {
        for (var i = 0, headersLength = headers.length; i < headersLength; i++) {
            if(data.hasOwnProperty(headers[i])) {
                log[headers[i]] = data[headers[i]];
            } else {
                log[headers[i]] = "";
            }
        }

        log["log_version"] = "19.06.28:3.1.0:0";

        for (var i = 0, bodiesLength = bodies.length; i < bodiesLength; i++) {
            if(data.hasOwnProperty(bodies[i])) {
                log._$body[bodies[i]] = data[bodies[i]];
            }
        }

        return log;
    };

    shuttle.clearBody = function () {
        if (log._$body) {
            log._$body = {};
        }
        
        return shuttle;
    };
    
    var logging = function(message) {
        if (console && console.log) {
            console.log("[SHUTTLE] " + message);
        }
    };

        /**
       * setBodyOf* method example
       *
       * if an action key is "/detail/eventpoint:note_tab.unfoldbtn"
       * (combined action key using ':')
       *
       * and the body layout looks like
       *
       * "/detail/eventpoint:note_tap.unfoldbtn":["geofence_key","advertise_id","mbr_id"]
       *
       * then a setBodyOf* method will be created dynamically using the code described below
       *
       * shuttle.setBodyOf_detail_eventpoint__note_tab_unfoldbtn = function() {
         *    log: this.clearBody();
         *    this.get().page_id = "/detail/eventpoint";
         *    this.get().action_id = "note_tap.unfoldbtn";
         *    this.get()._$body.geofence_key = (geofence_key === 0) ? geofence_key : (geofence_key || '' );
         *    this.get()._$body.advertise_id = (advertise_id === 0) ? advertise_id : (advertise_id || '' );
         *    this.get()._$body.mbr_id = (mbr_id) === 0 ?mbr_id : (mbr_id || '' );
         * };
       */

    shuttle.createSetBodyOfFunctionName = function (actionKey) {
        return "setBodyOf" + actionKey.replace(/:/gi, "__").replace(/[\/\.]/gi, "_");
    };

    shuttle.getBodyLayout = function() {
        return JSON.parse(JSON.stringify(body_layout));
    };

    var createSetBodyOfFunc = function (shuttle, actionKeyFields, actionKey, requiredBodyFields) {
        var setBodyOfFuncName = shuttle.createSetBodyOfFunctionName(actionKey);

        var temp = [];
        var bodyVarName = "this.get()._$body.";

        temp.push("this.clearBody();\n");

        // extraPartitionField가 존재할 경우 추가시 setBodyOf 함수에 extraPartitionField를 parameter로 추가하여 항상 받도록 한다.
        if(extra_partition_field !== ''){
            temp.push(
                "this.get()[\"" + extra_partition_field + "\"] = " + extra_partition_field + ";\n"
            );
        }

        for (var index = 0; index < requiredBodyFields.length; index++) {
            var bodyFields = requiredBodyFields[index];

            temp.push(
                bodyVarName + bodyFields + " = (" + bodyFields+ " === 0) ? " + bodyFields + " : (" + bodyFields + " || '' );\n"
            );
        }

        var actionKeyFieldValues = actionKey.split(":");

        for(var index = 0; index < actionKeyFieldValues.length; index++) {
            var actionKeyValue = actionKeyFieldValues[index];
            temp.push("this.get()." + actionKeyFields[index] + " = \"" + actionKeyValue + "\";\n");
        }

        if (actionKeyFields.length < 0 || actionKeyFields.length > 2)
            throw new Error("Invalid action key fields length");

        temp.push("return this;");
        var funcBody = temp.join("");

        var setBodyOfFields = [];
        if (extra_partition_field !== '') {
            setBodyOfFields.push(extra_partition_field);
        }

        shuttle[setBodyOfFuncName] = new Function(setBodyOfFields.concat(requiredBodyFields), funcBody);
    };

    /** create setBodyOf* dynamically SEN-230 */
    var filteredKeys = [];
    var filteredLayout = {};

    /** create setBodyOf* upon the user specified body layout (constructor param) */
    if (userSpecifiedKeys !== void 0 && util.isArray(userSpecifiedKeys)) {
        for (var index = 0; index < userSpecifiedKeys.length; index++) {
            var userSpecifiedKey = userSpecifiedKeys[index];

            if (body_layout[userSpecifiedKey] !== void 0) {
                /** 1. filter out useless action keys */
                filteredKeys.push(userSpecifiedKey);
                /** 2. filter out useless body layout */
                filteredLayout[userSpecifiedKey] = body_layout[userSpecifiedKey];
            }
        }

        if (filteredKeys.length === 0) {
            logging("passed constructor param 'userSpecifiedBodyLayout' is invalid, use default bodyLayout");
        }
    }

    /** fallback, use default keys, body layout */
    if (filteredKeys.length === 0) {
        filteredKeys = util.getObjectKeys(body_layout);
        filteredLayout = body_layout;
    }

    for (var index = 0; index < filteredKeys.length; index++) {
        var actionKey = filteredKeys[index];
        createSetBodyOfFunc(shuttle, action_key_fields, actionKey, filteredLayout[actionKey]);
    }


    return shuttle;
}


