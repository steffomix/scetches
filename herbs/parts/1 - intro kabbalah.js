
// pathfinder


define(['config', 'logger'], function(){

    return {};
});

(function () {


    function JobContext(event){
        this.id = event.data.id;
        this.cmd = event.data.cmd;
        this.data = event.data.data;
    }

    JobContext.prototype.response = function(data){
        self.postMessage({
            id: this.id,
            cmd: this.cmd,
            data: data
        });
    }


    self.addEventListener('message', function (e) {

        var job = new JobContext(e);

        console.log('Starting job #' + job.id + ' ' + job.cmd + ' with data: \n', job.data);

        switch (job.cmd) {

            case '--start--':
                self.importScripts('/js/lib/pathfinding.js');
                job.response(job.data);

                break;

            case '--terminate--':
                console.log('Terminate Worker');
                close();
                break;

            case 'find':

                var finder = new PF.AStarFinder({
                        allowDiagonal: true
                    }),
                    grid = new PF.Grid(data.matrix),
                    path = finder.findPath(data.startX, data.startY, data.endX, data.endY, grid);
                post({path: path});

                break;

            default:
                console.log('Worker Pathfinder: Command ' + cmd + ' not supported.');

        }

    }, false);
});


/*

###
### egal was ich euch sage, es wird euch nicht gefallen, den meisten jedenfalls nicht
###

sacrifice language
	learn kabbalah
	
	sprache der prinzipien oder des geistes der dinge oder der bedeutung der dinge
		alle dinge haben eigenschaften und verhaltensweisen
		das ding ist die hülle und deren inhalt dessen eigenschaften und verhaltensweisen
	
	wenn man mit einem dicken hammer auf einen stein haut erhält man viele kleine steine
	wenn man mit einem dicken hammer auf einen menschen haut erhält man nicht viele kleine menschen sondern einen haufen matsch
		die eigenschaften und verhaltensweisen sind beim stein gleich geblieben
		aber beim zermatschten menschen haben sich die verhaltensweisen geändert
		
	wenn ich mit einem stein rede, dann schwingt er von den luftschwingungen etwas erschüttert, geht vielleicht in resonanz mit den luftschwingungen und kann gar zerbrechen, aber das war es dann auch
	wenn ich mit einem menschen rede ist die reaktion sehr unterschiedlich
		weil menschen dem außen nach zwar sehr ähnlich aussehen
		aber dem innern nach sehr unterschiedlich reagiern
		
	es gibt menschen die reagieren wie steine auf worte
		sie nehmen die worte war, gehen vielleicht in resonanz mit ihnen oder zerbrechen gar daran und das wars dann auch
			das ist ein toter mensch
		
	es gibt aber auch menschen die nehmen die worte in ihren verstand, 
		verarbeiten sie aber äußerlich und versuchen eigenschaften und verhaltensweisen von anderen zu verändern 
			das ist ein kopf mensch oder auch religiöser mensch
		
	es gibt auber auch menschen die lassen die worte in ihr herz auf, 
		nehmen sie auf, verarbeiten sie innerlich und ändern vielleicht ihr verhalten und ihre eigenschaften
			das ist ein geistiger mensch
		
	ein konkretes beispiel
		wenn ich einem nach inner verarbeitenden sage er solle aus dem kopf raus gehen
			dann wird er das nach innen so verarbeiten das er sich sagt er solle nicht so viel mit weltlichen dingen beschäftigen/nachdenken
		wenn ich das gleiche aber einem nach außen verarbeitenden menschen sage
			dann schnappt er sich ein messer und schneidet anderen die köpfe ab
		wenn ich das gleiche einem tozten menschen sage, dann denkt er für immer darüber nach - oder auch nicht
			
	noch ein konkretes beispiel
		wenn ich einem steinmenschen die lebensfreude meines heiligen geistes gebe
			dann wird er daran verglühen und verbrennen
			
		wenn ich ihn einem geistmenschen gebe
			dann wird er ihn in tiefe weisheiten des leben leiten
			
		wenn ich ihn einem religiösen menschen gebe
			dann wird er seiner religion mit viel neuem antrieb ausüben

	ein kabbalah darüber wie das kleine im großen wiederkehrt
		zunächst das kleine
			da ist der kleine nörgler oder nöglerin, der sich für etwas besseres hält
			der allzugerne zu den eltern oder irgend einen anderen mächtigen rennt
			um sich wegen einer ungerechtigkeit, beleidigung oder gemeinheit zu beschweren
			
			und da ist der sündenböck, der immer schuld ist aber sich nicht wehrt, weil er ist ja eh immer schuld
			der sündenbock der immer buckelt, sich bückt und immer um des lieben friedens willen alles tut was man ihm auflädt
			
			und da ist der aufpasser, der die nörgler bedient und den sündenbock den eltern oder starken zur bestrafung zuführt
		
		das ganze nennt man eine disfunktionale beziehung und das gibt es genauso im großen
			die eltern, das ist staatsapparat, die regierung
			die besseren, das sind die unternehmer, die gerechten, die sich aufgrund ihrer herkunft oder ausbildung für etwas besseres halten
			der sündenbock, das ist der gemeine arbeiter
			der aufpasser, das ist der polizist
			und der allerschlimmste von allen, das ist der schmierige anwalt, der dafür sorgt, das alles wie geschmiert läuft
			
			das ist die gleiche dysfunktionale beziehung wie in der familie
			
			wenn euch dieser ganze staatsapparat also vorkommt wie ein großer kindergarten, dann liegt ihr völlig richtig
			
		die gleiche dysfunktionale beziehung gibts auch in der religion
			da gibts den allmächtigen gott
			die kirche oder das religiöse gebilde
			da gibts den gläubigen sünder
			da gibts den verbanner, dämonenjäger und hexenverbrenner
			und der allerschlimmste ist der priester, der dafür sorgt, das alles wie geschmiert läuft
			
			
	### seht, dafür ist uns kabbalah von den engeln aus dem himmel gegeben worden
	### damit wir uns nicht in äußeren erscheinlichkeiten verlieren
	### damit wir stets die essenz der dinge im auge behalten
	
	### wenn wir aber kabbalah verlernen, dann können es die wenigen die es noch verstehen, zur manipulation verwenden
	### denn wenn man es einmal richtig verstanden hat, dann lernt man schnell wen man wann, wie und wo anstubsen muss
	### um seine ziele zu erreichen
	
	
		
		
		
	
		
		
	*/
	
	
// game cache
define(['config', 'logger', 'underscore', 'workerSocket', 'workerRouter', 'server', 'cacheFloorManager', 'workerMainPlayer'],
    function (config, Logger, _, socket, router, server, floorManager) {

        var instance,
            logger = Logger.getLogger('gameCache');
        logger.setLevel(config.logger.gameCache || 0);

        logger.info('Load Interfaces');


        return getInstance();

        function getInstance() {
            if (!instance) {
                instance = new GameCache();
            }
            return instance;
        }


        function GameCache() {
            // register at game-websocket to receive commands
            router.addModule('cache', this, {
                onUpdateFloor: function (job) {
                    floorManager.updateFloor(job.data);
                },
                onUpdateTile: function(job){
                    floorManager.updateTile(job.data);
                }
            });

        }

    });
