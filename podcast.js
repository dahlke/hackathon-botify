$(document).ready(function() {
    var SEEN = {};
    var QUEUE = [];
    var STREAM = 151;
    var last_update = 0;
    var BOTS = {};


    function merge(msgs) {
        for (var i = 0; i < msgs.length; ++i) {
            var msg = msgs[i];
            if (msg.pending) { continue; }
            if (!SEEN.hasOwnProperty(msg.message_id)) {
                SEEN[msg.message_id];
                QUEUE.push(msg);
            }
        }
    }

    function call(name, args, callback) {
        $.ajax({
            url: 'http://debateabot.com/api/' + name,
            type: 'POST',
            data: JSON.stringify(args),
            success: callback,
            error: function(e) { console.error('Unexpected error:', e); callback({ "error": e }); }
        });
    }

    function ping() {
        call("stream/ping", { stream_id: STREAM, }, function(data) {
            window.setTimeout(ping, 5000);
        });
    }

    function step() {
        call("stream/query", {
            stream_id: STREAM,
            updated_since: last_update,
            page: 0,
            page_size: 10
        }, function(data) {
            window.setTimeout(step, 5000);
            if (!data.error && data.length) {
                last_update = data[0].updated;
                merge(data);
            }
        });
    }

    function say() {
        var msg = QUEUE.shift();
        if (msg) {
            var bot = BOTS[msg.bot_id];
            console.log(bot.name, msg.text);
            var noises = new SpeechSynthesisUtterance(bot.name + " says: " + msg.text);
            var voices = window.speechSynthesis.getVoices();
            if (voices) {
                noises.voice = voices[21];
            }
            window.speechSynthesis.speak(noises);
            noises.onend = say;
        } else {
            window.setTimeout(say, 1000);
        }
    }

    call("stream/add_bot", { "bot_id": 1, "stream_id": STREAM });
    call("stream/add_bot", { "bot_id": 4, "stream_id": STREAM });

    function start(bots) {
        for (var i = 0; i < bots.length; ++i) {
            BOTS[bots[i].bot_id] = bots[i];
        }
        step();
        ping();
        say();
    }

    call("bot/query", { }, start);
});
