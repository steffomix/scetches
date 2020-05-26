
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

sacrifice language
	learn kabalah
	
	sprache der prinzipien oder des geistes der dinge
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
		
	es gibt auber auch menschen die lassen die worte in sich hinein, 
		nehmen sie auf, verarbeiten sie innerlich und ändern vielleicht ihr verhalten und ihre eigenschaften
			das ist ein geistiger mensch
		
	es gibt aber auch menschen die nehmen die worte in sich auf, 
		verarbeiten sie aber äußerlich und versuchen eigenschaften und verhaltensweisen von anderen zu verändern 
			das ist ein religiöser mensch
		
	ein konkretes beispiel
		wenn ich einem nach inner verarbeitenden sage er solle aus dem kopf raus raus nehmen
			dann wird er das nach innen so verarbeiten das er sich sagt er solle nicht so viel mit weltlichen dingen beschäftigen
		wenn ich das gleiche aber einem religiösen menschen sage
			dann schnappt er sich ein messer und schneidet anderen die köpfe aber
			
	noch ein konkretes beispiel
		wenn ich einem steinmenschen die lebensfreude meines heiligen geistes gebe
			dann wird er daran verglühen und verbrennen
			
		wenn ich ihn einem geistmenschen gebe
			dann wird er ihn in tiefe weisheiten des leben leiten
			
		wenn ich ihn einem religiösen menschen gebe
			dann wird er seiner religion mit viel neuem antrieb ausüben

	aber was ist religion?
		religion ist was ich anbete, 
		das kann die religion erfolgreicher geschäftsmänner sein
		die religion der kriegstreiberei
		die religion der politischen manipulation
		die religion des geschickten ausnutzens der dummen und schwachen
		die religion der gottesanbeter uns
		
		
	aber was hat das alles mit kabbala zu tun?
		kabbala ist die sprache des inneren geistes
		oder die ursprüngliche göttliche sprache
		die sprache ohne worte, oder die telepatische sprache, die jeder nach seinen eigenschaften und verhaltensweisen versteht
		
	das heist also, um kabbala verstehen zu können muss man als erstes lernen den inneren geist der dinge zu erkennen
	dann muss man lernen aus dem kopf heraus zu gehen um anerzogene verhaltensweisen zu überwinden 
	und eigenschaften über bord zu werfen die einem die klare sicht versperren
		
		
		
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
