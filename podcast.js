$(document).ready(function() {
    var SEEN = {};
    var QUEUE = [];
    var BOTS = {};
    var STREAM = 1;
    var last_update = 0;

    var male_voices = [ 10, 21, 31 ];
    var female_voices = [ 0, 30, 38, 55 ];

    function choice(elements) {
        var i = Math.floor(Math.random() * elements.length);
        return elements[i];
    }

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
        if (msg && msg.text && msg.text !== "null" && msg.text.length < 140) {
            var bot = BOTS[msg.bot_id];
            var noises;

            console.log(bot && bot.name, msg.text);

            if (bot) {
                if (Math.random() > 0.5) { msg.text = bot.name + " says: " + msg.text; }

                noises = new SpeechSynthesisUtterance(msg.text);

                if (!bot.voice) {
                    var voices = window.speechSynthesis.getVoices();
                    if (bot.sex === "male") {
                        bot.voice = voices[choice(male_voices)];
                    }
                    else {
                        bot.voice = voices[choice(female_voices)];
                    }
                }

                noises.voice = bot.voice;

                $('.talking-wrapper').show();
                $('.talking-wrapper .name').text(bot.name);
                $('.user-image img').attr("src", "/static/" + bot.photo_url);
            } else {
                noises = new SpeechSynthesisUtterance(msg.text);
                $('.talking-wrapper').hide();
            }

            window.speechSynthesis.speak(noises);
            noises.onend = function() {
                var next_time = Math.min(2, Math.max(0, Math.random() * 3));
                console.log("Saying in ", next_time);
                window.setTimeout(say, next_time * 1000)
            };
        } else {
            console.log("skipping", msg);
            window.setTimeout(say, 1000);
        }
    }

    function start(bots) {
        for (var i = 0; i < bots.length; ++i) {
            BOTS[bots[i].bot_id] = bots[i];
        }
        var go = function() {
            step();
            say();
        };
        if (window.speechSynthesis.getVoices()) { go(); }
        else { window.speechSynthesis.onvoiceschanged = go; }
    }

    call("bot/query", { }, start);
});
