
    define(['config', 'logger', 'workerEvents', 'underscore'], function (config, Logger, Events, _) {

        var instance;
                logger = Logger.getLogger('workerDispatcher');
            logger.setLevel(config.logger.workerDispatcher || 0);

        function getInstance () {
            if ( !instance ) {
                instance = createInstance();
            }
            return instance;
        }

        return getInstance();

        function createInstance () {
            /**
             * dummy for IDE (will be overwritten while creation)
             * orig: this.listenTo(this.eventHandler, 'event', this.callback);
             * wrap: <event>.listenTo(<eventContext>, <callback> [, <callbackContext (defaults to eventContext)>]);
             *
             * result in usage register: events.global.myEvent(this, callback);
             * result in usage trigger: events.global.myEvent.trigger();
             *
             * @param callback {object} orig this
             *
             */
            function e (callback) {}
            var eventHandler = {},
                template = {
                    mainPlayer: {
                        mouseDown: e,
                        mouseUp: e,
                        mouseGridMove: e
                    }
                };

            _.each(template, function (events, category) {
                var handler = eventHandler[category] = _.extend({}, Events);
                handler.name = category;
                var categoryEvents = {
                    // turn off listener from <category>.<**all events**> with given _this or callback or both:
                    // off() complete purge of category and all its events.
                    // off(callback) turn off all with given callback, no matter what this is
                    // off(null, this) turn off all with given this, no matter what callback is
                    // off(callback, this) turn off all with given callback and this
                    off: function (callback, _this) {
                        if(!callback && _this){
                            handler.off();
                        }else{
                            _.each(template[category], function(v, k){
                                k != 'off' && template[category][k].off(callback, _this);
                            });
                        }
                    }
                };
                events.all = e;
                _.each(events, function (value, event) {
                    // create new Listener <event> in <category>
                    // e.g.: template.global.onSomething(this, fn);
                    categoryEvents[event] = function (callback) {
                        handler.listenTo(handler, event, callback);
                    };
                    // create new Listener <event> in <category> for only one trigger
                    // e.g.: template.global.onSomething(this, fn);
                    categoryEvents[event].once = function (_this, callback) {
                        callback ? _this.listenToOnce(handler, event, callback) : handler.listenToOnce(handler, event, _this);
                    };
                    // trigger listener
                    // e.g.: template.global.onSomething.trigger();
                    categoryEvents[event].trigger = function () {
                        var args = Array.prototype.slice.call(arguments);
                        //logger.info('**Event** ' + category + '.' + event, args);
                        handler.trigger.apply(handler, [event].concat(args));
                    };
                    // returns trigger and destroy orig Trigger to prevent abuse
                    categoryEvents[event].claimTrigger = function(claimer){
                        var fn = categoryEvents[event].trigger;
                        delete categoryEvents[event].trigger; // cut reference to fn
                        categoryEvents[event].trigger = function(){
                            logger.error('Trigger ' + category + '.' + event + ' is claimed by :', claimer);
                        };
                        return fn;
                    };
                    // turn off listener from <category>.<event> with given _this or callback or both:
                    // off() complete purge of category.event
                    // off(callback) turn off all with given callback, no matter what this is
                    // off(null, this) turn off all with given this, no matter what callback is
                    // off(callback, this) turn off all with given callback and this
                    // e.g.: template.global.onSomething.off(fn, this);
                    categoryEvents[event].off = function (callback, _this) {
                        handler.off(event, callback, _this);
                    };

                });
                template[category] = categoryEvents;
            });

            return template;
        }

    });
	
	
 /*
 sacrifice suecides
	karte zum malen der spirituellen welt und kompass benötigt
	zwei wege des loslassens, verurteilen/verbannen und vergeben/zulassen
	beide resultieren in etwas sehr ähnliches 
	in unendlicher verurteilung hast du nichts mehr außer nur dich im ewigen unendlichen nichts
		das ist gottes zustand in unedlicher finsternis bevor alles erschaffen wurde was ist
	in unendlicher vergebung bist du  wassertropten im ewigen unendlichen ozean von allem was ist
		das ist gott selbst als unendliches licht, der wille zu leben und ausdruck unendlicher lebensfreude
	und dahin gehen wir jetzt und steigen von dort langsam hinab wohin du dich verirrt hast
		dort wo alles finster und keine lebensfreude mehr ist
	damit wir aber selbst nicht verloren gehen, sollten wir etwas mitnehmen das vom himmel ist
		und an einem sicheren ort verstecken, tief in uns wo niemand es uns stehlen oder verschmutzen kann.
	zererst nehmen wir etwas wasser, weil es sich am besten geistige zustände merken kann
		und segnen es mit himmlischer lebensfreude
	dann nehmen wir noch ein stück wießestes brot mit dem heiligen geist des himmels mit
	beides zusammen sieht dann etwa so aus wie - simsalabim - mein stab.
	das sollte vorerst reichen.
	
	nun schau, wenn wir hier bleiben sind wir zwar in der höchsten lebensfreude des himmlischen geistes
		aber wir haben nichts um dies zu ausdruck zu bringen.
	also fangen wir an zu träumen von dingen die wir herstellen und dingen die wir tun
		mit denen wir unseren himmlischen geist zum ausdruck bringen.
	all diese dinge aber sind wie eine verunreinigung unseres himmlischen geistes
		und sind wie alles weltlich materielle oder wie gesäuertes brot.
	dieses gesäuerte brot ist zwar ungeheuer fantastisch und vielfältig im geschmack
		wenn wir aber nur dieses brot essen, vergessen wir über kurz oder lang den geist des himmels
		den wir tief in uns verborgen aufbewahrt haben
	das unreine weltliche brot wird für uns dann wichtiger als das reine himmlische brot
		bis wir es gar nicht mehr wollen.
	wenn dass passiert sind wir im weltlichen verschüttet
		und aus dem buch des lebens im himmel verschwunden und wie tot und verloren
		
	dieser zustand des verschüttet und verloren seins erzeugt oder hat seine ganz eigene atmosphäre
	der schutt, welcher noch reste von lebensfreude enthält wird nun zur notwendigen nahrungsquelle
	da der direkte zugang zur quelle der lebensfreude verschlossen ist, 
		muss lebensfreude aus materiellen dingen entzogen werden
		die von denen geschaffen wurden, die noch genug lebensfreude haben
	dieses nun erzeugt einen wahrhaft teuflischen kreislauf in immer größeren mangel an lebensfreude
	bis hin zu dem punkt wo man in materiellen dingen nichts lebenswertes mehr finden kann
	
	womit wir nun bei dir angekommen sind und nun gemeinsam im finsteren loch fest sitzen
	und wenn niemand kommt der uns wieder mit der ursprünglichen lebensquelle verbindet
	sind wir für immer hier unten verloren
	
	nirgendwo fühlt man sich wertloser, verlorener und verbannter als im finsteren loch der untersten hölle
	diesen eindruck zu überwinden für jemanden der keinerlei verbindung zum himmel mehr hat vollkommen unmöglich
	darum bin ich selbst in diese deine finsternis hinab gestiegen
		denn nur ich der ich selbst aus der finsternis enstanden bin und mich selbst mit einem "Es werde Licht"
		ins himmlische leben gerufen habe, kann diese finsternis mit meinem heiligen geist des himmels überwinden
	niemand sonst kann das, glaubst du mir das?
		laut drehbuch solltest du jetzt JA sagen :D
	
	gut, dann werde ich jetzt seltsamen spezialgerät ein seltsameres gebräu anfertigen
		das ganz und gar nur aus wasser besteht.
		es wird dir helfen dich wieder an deine himmlische herkunft zu erinnern
		dich mit ihm wieder zu verbinden
		damit du wieder aus der quelle des lebens selbst deine lebensfeude beziehen kannst
		und nicht mehr an materiellen dingen oder gar deinen mitmenschen rum lutschen musst
	das du dann auch nicht mehr tun solltest
		denn wenn du mit neuer lebensenergie wieder in die welt hinaus rennst wie zuvor
		dann habe ich kein problem damit dich noch ein paar extra lektionen lernen zu lassen
	hast du das verstanden?
		laut drehbuch solltest du jetzt JA sagen :D
	
	das spezialgerät brauchen wir um die inneren elektromagnetischen verklumpungen aufzulösen
		die durch den ganzen elekrosmog überall verursacht wurden
		das wasser wird dann wieder etwas weicher, fast wie ein alkoholisches getränk
		und so geschmeidig wie aus den quellen des himalaya
		denn der geistige fluch sitzt nicht in der festen nahrung, sondern im wasser
		welches die geistige atmosphäre speichert
		
	### eine mystische geschichte dazu
		einst schwebte der geist wie luft über dem wasser
		dann aber bemächtigte sich das wasser dem geist
		umschloss es um es in seine tiefe zu ziehen und es zu beherrschen
		dann umschloss das feste land das wasser und formte alles was wir als materielles leben kennen
		und dieses leben ist nun dabei eine weitere, noch festere und undurchdringliche schicht zu konstruieren
		um den eingeschlossenen geist für immer in ein ewiges gefängnis zu sperren
		
	möchtest du für immer in ein ewiges materielles gefängis eingesperrt sein und von der materie beherrscht werden?
		laut drehbuch solltest du jetzt NEIN sagen :D
		
	gut, ob du hier jetzt aber raus kommst oder nicht, wird die münze entscheiden.
		schau, liebe und vergebung sind wie zwei seiten einer münze...
		nun wirf die münze über gott, der dich in diesen alptraum von leben gerufen hat ohne dich vorher zu fragen
		kannst du ihm das vergeben? denn nur wenn du ihm das vergeben kannst, kannst wie wieder zur liebe zum leben finden.
		laut drrehbuch solltest du jetzt besser JA sagen
		
	gut, dann werde ich jetzt mithilfe meines heiligen geistes eine himmlische atmophäre um dieses wasser erzeugen
		wärend ich es von seinen inneren verklumpungen bereinige
		dieses wasser solltest du dann nicht in kleinen schlucken sondern in großen zügen trinken.
		
	danach zeige ich dir wie man so ein gerät und dieses wasser selbst herstellt, denn ich will dich nicht von mir abhängig machen
		sondern ich will das du frei wirst, stark und voller lebenskraft im heiligen geist des himmels
		
	und danach zeige ich dir das dieses gerät bloß ein trainingsgerät ist, mit dem du lernen kannst leben mit kraft deines geistes zu beeinflussen
		und mit dem geist des himmels zu segnen
		denn deine vergebung hat den tod des gerichts überwunden und deine verachtung gegen das leben in liebe für das leben umgewandelt
		so vergib wie gott vergibt und liebe wie gott liebt und segne alles mit himmlischer lebensfreude
	
	*/
	
	var Events = {};

// Regular expression used to split event strings.
    var eventSplitter = /\s+/;

// Iterates over the standard `event, callback` (as well as the fancy multiple
// space-separated events `"change blur", callback` and jQuery-style event
// maps `{event: callback}`).
    var eventsApi = function (iteratee, events, name, callback, opts) {
        var i = 0, names;
        if (name && typeof name === 'object') {
            // Handle event maps.
            if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
            for (names = _.keys(name); i < names.length; i++) {
                events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
            }
        } else if (name && eventSplitter.test(name)) {
            // Handle space-separated event names by delegating them individually.
            for (names = name.split(eventSplitter); i < names.length; i++) {
                events = iteratee(events, names[i], callback, opts);
            }
        } else {
            // Finally, standard events.
            events = iteratee(events, name, callback, opts);
        }
        return events;
    };

// Bind an event to a `callback` function. Passing `"all"` will bind
// the callback to all events fired.
    Events.on = function (name, callback, context) {
        return internalOn(this, name, callback, context);
    };