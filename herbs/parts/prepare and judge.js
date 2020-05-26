
        function _getRouter (name) {
            if ( router[name] ) {
                return router[name];
            } else {
                var newRouter = new CommandRouter(name);
                name = '' + name;
                logger.info('Create CommandRouter ' + name);
                router[name] = newRouter;
                return newRouter;
            }
        }

        function Listener () {
            var listener = {};

            this.getListener = function (id) {
                return listener[id];
            };

            this.listenTo = function (id, fn) {
                listener[id] = fn;
            };

            this.list = function(){
                return Object.keys(listener);
            }
        }

/*
prepare
	wir werden jetzt auf dem boden der tatsachen notlanden
	dazu brauche ich zwei besonders leidensfähige sensible fräulein hier auf der bühne
	die darauf achten dass die landung so wenig tote und verletzte wie möglich verursacht
		fräulein kommen
	eine zur rechten und eine zur linken müsst ihr mit euren geglügelten hühnerärmchen an meinen beinen fest halten
	und wenn es zu schlimm und rumpelig wird müsst ihr ordentlich zu fassen
		und wenn ihr es gar nicht mehr aushaltet, dürft ihr auch gern mal zärtlich zu-beißen, aber nichts ab-beißen bitte
	
	alle anderen lehnen sich bitte nach vorne und setzen ihre masken auf sofern vorhanden und machen die äuglein zu
		eltern halten bitte ihre kinder fest
		denn jetzt wird es richtig ungemütlich
		aber ich werde mein bestes tun um es so kurz und schmerzlos wie möglich zu machen
		
	sobald wir gelandet sind werden wir die toten und verletzten versorgen
		
		
*/

        /**
         * Creates a command router instance
         * @param name {string} Only used as logging prefix
         * @constructor
         */
        function CommandRouter (name) {

            var modules = {},
                listener = new Listener();


            /**
             * Add module to command receivers list and
             * combines name and command to command 'name.command'.
             * E.g. router.route('moduleName.command', []);
             * @param name {string} command prefix and module name
             * @param module {object}
             * @param commands {object} key<command>:value<boolean enabled> pairs
             */
            this.addModule = function (name, module, commands) {
                if ( modules[name] ) {
                    return logger.error('CommandRouter: Module "' + name + '" already set');
                } else {
                    this.replaceModule(name, module, commands);
                }
            };
            /**
             * Overwrites receivers list and
             * combines name and command to command 'name.command'.
             * E.g. router.route('moduleName.command', []);
             * @param name {string} command prefix and module name
             * @param module {object}
             * @param commands {object} key<command>:value<boolean enabled> pairs
             */
            this.replaceModule = function(name, module, commands){
                modules[name] = module;
                _.each(commands, function (fn, key) {
                    listener.listenTo(name + '.' + key, fn);
                });
            };
/*
  
gods judgement
	wange schlagen, kritisiert werden
		himmel: andere hinhalten, nach mehr fragen
		hölle: empörung, verleumdung, verurteilung, bestrafung, gewinn herausschlagen
		alle: kritikunfähiges hochmütiges dreckspack
		
	beschädigung von eigentum (kratzer im auto)
		himmel: gott danken für schutz, herz nicht an materielles zu binden
		hölle: empörung, anzeige, schadensersatz, gewinn herausschlagen
		alle: materialistisches gieriges dreckspack
			
	hurerei
		himmel: auf eigenes potential vertrauen oder das es gesehen wird
		hölle: sich wie eine straßenhure aufbretzeln und bei freiern zu bewerben um von freiern benutzt zu werden
		alle: huren und freier geworden, hochmut und selbstdarstellung zum guten ton geworden
            
    krankheiten
		himmel: fokus auf gesundes leben um
		hölle: fokus auf krankheiten heilen
		alle: hydra von gesundheitssystem geschaffen das kranke braucht um zu überleben
	
	sozialsysteme
		himmel: herz voller nächstenliebe als sozialversicherung
		hölle: herz and hydra von regierung verkauft, herz in schutzkiste gegen berührung gepackt, 
			monatliches schutzgeld bezahlt und sozialsystem drauf geschrieben
		alle: nächstenliebe, liebendes herz an den teufel verkauft
	
	diebe und abtreibung
		himmel: eine umgebung schaffen in der diebe niemals stehlen müssen und frauen niemals nötig haben abzutreiben
		hölle: eine grauenvolle umgebung schaffen und strauchelnde als schwächlinge verurteilen
		alle: ihr seht den splitter im auge der abtreibenden mutter aber nicht den balken in eurem auge, 
			die ihr diese lebensfeindliche umgebung geschaffen habt
		
	erziehung zur hilflosigkeit
		himmel: 
		
	
	
		
	
	
 */