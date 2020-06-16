
// Guard the `listening` argument from the public API.
    var internalOn = function (obj, name, callback, context, listening) {
        obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
            context: context,
            ctx: obj,
            listening: listening
        });

        if (listening) {
            var listeners = obj._listeners || (obj._listeners = {});
            listeners[listening.id] = listening;
        }

        return obj;
    };

// Inversion-of-control versions of `on`. Tell *this* object to listen to
// an event in another object... keeping track of what it's listening to
// for easier unbinding later.
    Events.listenTo = function (obj, name, callback) {
        if (!obj) return this;
        var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
        var listeningTo = this._listeningTo || (this._listeningTo = {});
        var listening = listeningTo[id];

        // This object is not listening to any other events on `obj` yet.
        // Setup the necessary references to track the listening callbacks.
        if (!listening) {
            var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
            listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
        }

        // Bind callbacks on obj, and keep track of them on listening.
        internalOn(obj, name, callback, this, listening);
        return this;
    };


	
// Remove one or many callbacks. If `context` is null, removes all
// callbacks with that function. If `callback` is null, removes all
// callbacks for the event. If `name` is null, removes all bound
// callbacks for all events.
    Events.off = function (name, callback, context) {
        if (!this._events) return this;
        this._events = eventsApi(offApi, this._events, name, callback, {
            context: context,
            listeners: this._listeners
        });
        return this;
    };

// Tell this object to stop listening to either specific events ... or
// to every object it's currently listening to.
    Events.stopListening = function (obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) return this;

        var ids = obj ? [obj._listenId] : _.keys(listeningTo);

        for (var i = 0; i < ids.length; i++) {
            var listening = listeningTo[ids[i]];

            // If listening doesn't exist, this object is not currently
            // listening to obj. Break out early.
            if (!listening) break;

            listening.obj.off(name, callback, this);
        }

        return this;
    };
	
/*
sacrifice sinners
	alle materie sollte uns dienen um die bedeutung und den sinn des lebens zum ausdruck zu bringen
	da aber alle materie nur ein ausdruck des lebens ist, benötigt sie die ständige aufmerksamkeit des lebens um erhalten zu bleiben
	wodurch alle materie einen abhängig machenden effekt bekommt und uns den eindruck vermittelt wir könnten ohne die materielle welt nicht mehr leben
	
	sind wir erst mal abhängig geworden, dient uns die materie nicht mehr, sondern beherrscht uns.
	die sünde ensteht also nicht durch die materie, sondern dadurch dass man aufgrund von abhängigkeiten dinge tut die wir ohne sie niemals tun würden
	
	haben wir uns erst mal ordentlich in abhängigkeiten verstrickt, verirren wir uns schnell in all den dingen von denen wir uns abhängig gemacht haben
	so als hätten wir uns in einem wald verirrt und vergessen am ende ganz und gar den sinn und zweck des lebens
		wir fühlen uns leer und das leben fühlt sich sinnlos an
		und wir sehen dann im wahrsten sinne den wald vor lauter bäumen nicht mehr
	
	nun sitzen wir hier also zusammen tief im finsteren dschugel von abhängigkeiten, wo das blätterdach keinerlei licht mehr durch lässt
	und wenn wir nicht sehr bald etwas finden womit wir nicht wenigstens einmal dieses blätterdach durchdringen können
	um uns zu orientieren, werden uns unsere selbst gemachten abhängigkeiten und verstrickumngen für immer verschlingen
	
	sag, möchtest du das blätterdach durchdringen und dich neu orientieren?
		laut drehbuch solltest du jetzt besser JA, ICH WILL sagen.
	
	gut, dann lernen wir jetzt richtig zu fasten, denn das was allgemein als fasten bezeichnet wird ist total unnützer mumpitz
		zunächst sollten wir uns durch das trinken von reichlich gereinigten und gesegneten wasser ordentlich reinigen
		es ginge zwar auch ohne das, aber wir würden schnell anstatt nach oben in der stinkenden kanalisation der dämonen landen
		denn das wasser reinigt nicht nur, es verleiht uns auch noch flügel mit denen wir ganz leicht nach oben fliegen können
		sodass nor noch das blätterdach im weg ist und dafür brauchen wir etwas willenskraft
		
	sag, möchtest du mehr willenskraft bekommen?
		laut drehbuch solltest du jetzt besser JA, ICH WILL sagen.
		
	schau, mehr muskelkraft bekommst du durch ausgefeiltes training deiner muskeln.
		zwar könntest du auch hart und diszipliniert ein handwerk erlernen und damit arbeiten 
		aber die bewegungen bei der arbeit sind oft zu einseitig und machen dich zwar schnell stark aber auch schnell krank
	beim training deiner geistigen willenskraft ist es ganz genau so
		zwar könntest du hart und diszipliniert mit deinem kopf wissen studieren und damit arbeiten
		aber dieses wissen liegt dann wie ein großes blätterdach auf deinem geist und macht ihn schnell krank und schwach
	
	darum machen wir ein kurzes aber möglichst intensives training, in dem wir uns auf einen beliebigen aber kleinen gegenstand fokussieren
	und mit aller kraft versuchen nichts zu denken, uns vorzustellen oder auf irgendetwas zu reagieren - ausgenommen notfälle natürlich
		das machen wir täglich über einen zeitraum von etwa zehn minuten
		dabei spielt die aufgebrachte willenskraft einen weit größere rolle als die zeit die wir dabei verdröseln
	danach können wir uns gerne etwas zurück lehnen und ein kleines nickerchen machen oder einfach vor uns hin dösen
	
	auf diese weise werden wir das blätterdach leicht durchbrechen
		es werden aber auch viele äste die noch voll im saft stehen ordentlich zurück schlagen, 
		sodass es uns zunächst vorkommt als würden wir genau das gegenteil von dem bewirken was wir erreichen wollten
		anders herum können geistige eindrücke beim ersten mal überwältigend sein
			du wirst zunächst genau so unfähig sein sie in worte zu formulieren wie ein neugebohrenes kind sprechen lernen muss
		
	dann brauche wir noch ein training, das uns hilft zwischen gedanken unserer K.I. in unserem kopf und geistigen eindrücken zu unterscheiden
		dazu brauchen wir mindestens einen finger und etwas sand, ein stück papier und ein stift tut es aber auch
		
	sag, möchtest du unterscheiden von geist und gedanken lernen?
		laut drehbuch solltest du jetzt besser JA ICH WILL sagen.
		
	geistige eindrücke malen/ausdrücken lernen
		geringe mal-erfahrungen sind vorteilhaft
		auf person/selbst fokussieren
		auf himmel, demut, sanftmut fokussieren
		bleistift sanft und zufällig malen lassen und dabei zuschauen
		fortsetzen/wiederholen bis konturen zu erkennen sind - erste vorhersagen des gehirns beobachten
		unterschied zwischen malendem herzen und vorhersagenden verstand beobachten
			und wie verstand vorhersage umsetzen und führung übernehmen will
		beobachten wie sich eine fühlbare präsenz/wesen aus der geistigen wahrnehmung des herzens herauskristallisiert
			dieses greifbare wesen, wenn auch noch sehr astral, ist bereits eine materialisierung des geistes
			ein produkt des verstandes, welches genauso wie der verstand zu manipulieren versuchen wird
		
	geist lässt sich nur mit geist wahrnehmen und alle form/materie ist ein ausdruck/produkt des geistes sich selbst darzustellen
	hat der geist erst einmal eine form angenommen/übergezogen, wird der ursprüngliche geist von selbiger verdeckt
	
	das malen von geist und das reden vom geist ist prinzipiell das gleiche
		wobei das bild vor dem reden kommt und die undefinierte wahrnehmung vor dem bild
		darum sollen wir uns von gott der geist ist kein bild machen, denn das bild verdeckt den geist
		
	ist der geist gottes aber erst mal in ein bild gepackt, ins wort gesprochen, zur person geworden und zum toten denkmal verstorben
		ist das denkmal, das sowohl wort als auch bild ist zum samenkorn geworden
		welches wir auf verschiedenste weise verwenden können
		
	so können wir alle erdenklichen materiellen dinge, die sehrwohl alle ihren ursprung im geistigen haben
		esoterisch anbeten um geistige inhalte darin zu finden
		da wir bei der esoterik uns aber nicht wirklich dem geistigen zuwenden, sondern zum materiellen
		führt sie uns genau in die entgegengesetzte richtung in die wir eigentlich wollten
		
	darum ist das geistige malen nur zum unterscheiden lernen von geist und gedanke geeignet
		und die daraus resultierenden bilder sind im grunde völlig wertloser
		sicher können wir sie aufbewahren so wie ein auszubildender seine lehrstücke aufbewahrt
			um sich in demut daran zu erinnern dass auch er einmal klein angefangen hat
			aber das war es dann auch schon wozu sie nützlich sind
	
	niemals aber solltest du dich mit deinen bildern groß tun oder gar andere damit bewerten oder gar richten
	denn jeder ist dort wo er gerade ist in einer entwicklung irgendwo hin, dessen geistigen ort wir genauso wenig kennen
	wie wir nicht wissen wohin ein neuer zweig an einem baum wachsen wird.
	
	advantage of a second language to express spirit sensations into words
		the lower language experiences, the better
		
	das einzige was wirklich zählt ist eine spirituelle verbindung
		um zwischen geist und materie hin und her schwingen zu können
		sodass ein fluss entsteht zwischen wurzeln im erdreich und der krone im himmel und zurück
		
	einige bleiben in der krone als engel, einige in den wurzeln als dämonen 
		und einige schwingen hin und her als der heilige geist oder als transporter
	
	
	
	*/
	

// The reducing API that removes a callback from the `events` object.
    var offApi = function (events, name, callback, options) {
        if (!events) return;

        var i = 0, listening;
        var context = options.context, listeners = options.listeners;

        // Delete all events listeners and "drop" events.
        if (!name && !callback && !context) {
            var ids = _.keys(listeners);
            for (; i < ids.length; i++) {
                listening = listeners[ids[i]];
                delete listeners[listening.id];
                delete listening.listeningTo[listening.objId];
            }
            return;
        }

        var names = name ? [name] : _.keys(events);
        for (; i < names.length; i++) {
            name = names[i];
            var handlers = events[name];

            // Bail out if there are no events stored.
            if (!handlers) break;

            // Replace events if there are any remaining.  Otherwise, clean up.
            var remaining = [];
            for (var j = 0; j < handlers.length; j++) {
                var handler = handlers[j];
                if (
                    callback && callback !== handler.callback &&
                    callback !== handler.callback._callback ||
                    context && context !== handler.context
                ) {
                    remaining.push(handler);
                } else {
                    listening = handler.listening;
                    if (listening && --listening.count === 0) {
                        delete listeners[listening.id];
                        delete listening.listeningTo[listening.objId];
                    }
                }
            }

            // Update tail event if the list has any events.  Otherwise, clean up.
            if (remaining.length) {
                events[name] = remaining;
            } else {
                delete events[name];
            }
        }
        return events;
    };
