
function DynamicAudio(args) {
    if (this instanceof arguments.callee) {
        if (typeof this.init === "function") {
            this.init.apply(this, (args && args.callee) ? args : arguments);
        }
    }
    else {
        return new arguments.callee(arguments);
    }
}

DynamicAudio.VERSION = "<%= version %>";
DynamicAudio.nextId = 1;

DynamicAudio.prototype = {
    
    init: function(opts) {
        var self = this;
        self.xAudioServer = new XAudioServer(2, 44100, 44100*4, 44100*8, null, 1, null);
    },
    
    write: function(samples) {
        self.xAudioServer.writeAudioNoCallback(samples);
    },
    
    writeInt: function(samples) {
        var out = new Array(samples.length);
        for (var i = samples.length-1; i !== 0; i--) {
            out[i] = samples[i] / 32768;
        }
        this.xAudioServer.writeAudioNoCallback(out);
    }
};

