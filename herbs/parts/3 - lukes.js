
    function WorkMaster (script, name, socketManagerReady, onSocketMessage, createWorkerScope) {

        var workerId = allWorkerId++;
        var logger = Logger.getLogger('workerMaster');
        logger.setLevel(config.logger.workerMaster || 0);
        var jobId = 0;
        var worker = new Worker(config.paths.workerSlave);


        logger.info('Create Worker-master #' + workerId);
        /**
         * Container for running jobs
         * The contents will look like that:
         * worker.jobs {
             *      0: {
             *          id: jobId,
             *          job: Job {
             *              id: jobId,
             *              cmd: cmd,
             *              data: data
             *          },
             *          callback: function,
             *          scope: object
             *          },
             *       1: ...
             *  }
         *
         *
         * @type {{}}
         */
        worker.jobs = {};

        function getId () {

            return (jobId++) + '_' + Math.random().toString(36).substring(2);
        }
 /***
 sacrifice lukewarm - a travel to Holy-Wood movie studios
	himmlische folterbank (weiche decken & kissen) benötigt
	himmel, mild warmer sommerwind
	kuhwiese (blumenwiese)
	dämonenkrallen
	blumenstraus pflücken
	alle dinge sind ausdruck einen zustandes
	blumenstraus nach hause bringen
	sturm von geist nach verstand zerrupft blumenstraus
	blumen sterben/transformieren zu hässlichen gestrüpp mit harten samen
	engel am pult/tisch mit bibel links
	lege zerzausten blumenstraus rechts neben bibel
	gutes erdreich >finden<
		wüste lagert samen, regen überwältigt wüste - bibliothek
		auf steinen samen werden zermalen - pharisäer
		zwischen dornen zerstochen - denunzianten
		von tieren gefressen - religionen
		in säure zersetzt - übersetzer und interpretationisten
	nutzloses gras das nur rum steht und sich im lauwarmen sommerwind wiegt - lauwarme christen
		wiese mit nutzlosem gras - bester boden
		sanft schützt und stützt gras heranwachsende blumen
	wieder auf der blumenwiese
	religiöse schafe, kühe und ochsen fressen alles gras und auch die blumen
		aus angst am boden kriechende schlangen zu übersehen
	blumen auch abgefressen- propheten des himmels
	kleine aufgabe für lauwarme christen
		bei dem geringsten gehfühl nicht gut genug zu sein, 
			im herzen zum herrn des himmels kommen
			herr nimmt dich bei der hand
			drehen jeden stein um und schauen in jede ecke
			bis schlange gefunden die ihre nächsten verurteilt
			und lassen sie den stab des heiligen geistes herauf griechen
			und mit ihrem eigenen feuer der reuhe neu einbrennen
			bis alles verzehrt ist das nich dem himmel angehört
		wehe aber ihr wenn sie von dem alles verzehrenden feuer des heiligen geistes flieht
		denn da ist nur ein zufluchtsort und das ist die hölle
	denn siehe mein stab ist mächtig denn er hält den geist des himmels 
		der mir heilig ist über alles und auch euch heilig sein sollte über alles
		
	alles kann vergeben werden im himmel außer das jemand meinen heiligen geist des himmels verhöhnt
		denn der hat im himmel nichts zu suchen und will dort auch nicht sein.
		
	münze werfen über das schicksal der religiösen schafe, kühe und ochsen
		liebe & vergebung zwei seiten derselben münze
		
 */
 
 
        /**
         * Private wrapper from methods request and socket
         * @param sock {boolean} the job can response multiple times
         * @param cmd {string} Command for the Worker
         * @param data {any}
         * @param cb {function} callback
         * @param scope {object} optional scope
         * @returns Job {Job}
         */
        function _run (sock, cmd, data, cb, scope) {

            var id = getId(),
                job = new Job(sock, id, cmd, data);
            worker.jobs[id] = {
                job: job,
                sock: sock,
                cb: cb,
                scope: scope
            };
            worker.postMessage({
                id: id,
                cmd: cmd,
                data: data,
                callStack: new Error('Start Worker ' + (name || '')).stack.split('\n')
            });
            return job;
        }
