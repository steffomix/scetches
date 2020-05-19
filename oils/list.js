/*

$oils = array(0-id, 1-name, 2url, 3-description
$issues = array(0-id, 1-name, 2-url, 3-description
$issues_oils = array(0-id_oil, 1-id_issue, 2-rank, 3-description

 */

var inp_oil = getNode('search_oil');
var inp_issue = getNode('search_issue');
var disp_description = getNode('description');
var disp_oils = getNode('oils');
var disp_issues = getNode('issues');
var disp_link = getNode('link');



function getNode(id){
    return document.getElementById(id);
}

$(document).ready(function () {
    resetOils();
    resetIssues();
})

function resetOils(){
    listOils(db.oils);
    inp_oil.value = '';
}

function resetIssues(){
    listIssues(db.issues);
    inp_issue.value = '';
}

function onSearchOil() {
    //var node = $('#onSearchOil');
    var rows = findOils(inp_oil.value);
    if (rows.length) {
        var row = rows[0];
        var id = row[0];
        listOils(rows);
    }
}

function onSearchIssue() {
//var node = $('#onSearchOil');
    var rows = findIssues(inp_issue.value);
    if (rows.length) {
        var row = rows[0];
        var id = row[0];
        listIssues(rows);
    }
}
function onClickOil(id){
    var issues = findRelatedIssues(id);
    listIssues(issues);
    showDescription(id);
}

function onClickIssue(id){
    var oils = findRelatedOils(id)
    listOils(oils);
}

function findOils(str) {
    if (str == '') return db['oils'];
    str = toUpperCase(str);
    inp_oil.value = str;
    var rx = RegExp(str);
    var rows = [];
    var oils = db.oils;
    for (var i = 0; i < oils.length; i++) {
        if (rx.test(oils[i][1])) {
            rows.push(oils[i]);
        }
    }
    return rows;
}
function findIssues(str) {
    if (str == '') return db['issues'];
    str = toUpperCase(str);
    inp_issue.value = str;
    var rx = RegExp(str);
    var rows = [];
    var issues = db.issues;
    for (var i = 0; i < issues.length; i++) {
        if (rx.test(issues[i][1])) {
            rows.push(issues[i]);
        }
    }
    return rows;
}

/**
 * 
 * @param id <int> of oil or issue
 * @param rel <int> findIssues=0, findOils=1
 *
 * $issues_oils = array(0-id_oil, 1-id_issue, 2-rank, 3-description
 */
function _findRelated(id, rel){
        // find links
    var links = db.issues_oils;
    var rel2 = rel == 0 ? 1 : 0;
    var related = [];
    for (var i = 0; i < links.length; i++) {
        if (links[i][rel] == id) related.push(links[i][rel2]);
    }
    // find issues
    var found = [];
    if (related.length) {
        var requested = db[rel == 0 ? 'issues' : 'oils'];
        for (var i = 0; i < related.length; i++) {
            for (var ii = 0; ii < requested.length; ii++) {
                if (related[i] == requested[ii][0]) {
                    found.push(requested[i]);
                }
            }
        }
    }
    return found;
}
function findRelatedIssues(id) {
    return _findRelated(id, 0);
}
function findRelatedOils(id){
    return _findRelated(id, 1);
}
/**
 * 
 * @param {string} str info
 * @returns {string}
 */
function toUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
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
		
		
  
overtuere feuerwand
	mein stab hält meinen heiligen geist des himmels, der mir heilig ist
		jeder kann ihn wohl lesen oder übersetzen in seine sprache
		aber wirklich verstehen kann ihn nur wem er heilig geworden ist
			heilig werden kann er aber nur dort wo er allen anderen eine qual ist
			dort musst du ihn mit hin nehmen und heilig halten entgegen aller wiederstände
	wenn dich einer auf die eine wange schlägt halte auch die andere hin
		vergleich himmel-hölle
    wenn einer dein äußeres, deinen materiellen Reichtum beschädigt
		vergleiche himmel-hölle
	was ist die hure babylons
		vergleiche huren-job mit job-bewerber
    warum seid ihr hier? mein stab wird es euch sagen
		simsalabim, stab verwandel dich in eine angelrute
		mit einem unsichtbaren faden gemacht aus geduldigen Gold
		mit einem Haken dran wie ein Kreuz gemacht aus zwei balken aus Liebe und Vergebung
		und einem möglichst blutigen Köder daran um möglichst viele haie und andere raubfische anzulocken
    köderfang
		vom desinteressierten streuner
		vom probierer
		vom abhängigen brustlutscher
		vom predigenden selbstdarsteller
			wehe dem der seines nächsten willen zur demut missbraucht um sich selbst zu erhöhen
		vom echten zubeißer der sich mit ans kreuz hängt und selbst zum köder wird
    leine einholen und aus dem wasser ziehen
		bedeutung von wasser und luft
		vom herrschen und dienen
		vom gebot und vom gesetz
			wehe dem der moses' gebote in strafbare gesetze verwandelt
			vom dienen m
		vom teilen des wassers und vom nadelöhr, dem schmalen pfad dazwischen
			
			
			
            
      
 */
 
 
 /*
 sacrifice lukewarm
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
		bei dem geringsten gehfühl nicht gut genug zu sein zum herrn des himmels kommen
		herr nimmt dich bei der hand
		drehen jeden stein um und schauen in jede ecke
		bis schlange gefunden die ihre nächsten verurteilt
		und lassen sie den stab des heiligen geistes herauf griechen
		und mit ihrem eigenen feuer der reuhe neu einbrennen
		bis alles verzehrt ist das nich dem himmel angehört
		wehe aber ihr wenn sie von dem alles verzehrenden feuer des heiligen geistes flieht
		denn da ist nur ein zufluchtsort und das ist die hölle
	denn siehe mein stab ist mächtig denn er hält den geist des himmels der mir heilig ist über alles
		und ich kann alles vergeben außer das jemand meinen heiligen geist des himmels verhöhnt
		denn der hat im himmel nichts zu suchen und will dort auch nicht sein.
		
	münze werfen über das schicksal der religiösen schafe, kühe und ochsen
		liebe & vergebung zwei seiten derselben münze
		
 */
 
 /*
 sacrifice suecides
	karte zum malen der spirituellen welt ind kompass benötigt
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
		
	
	
	
	
	
	
	
	
	
sacrifice earth and navigation
		
 
	
	
	
 
 
 */
 
function listOils(oils) {
    var list = [], t1, t2, oil;
    for (var i = 0; i < oils.length; i++) {
        oil = oils[i];
        t1 = oil[3] ? '' : '*';
        t2 = oil[3] ? '' : '';
        list.push('<span onclick="onClickOil(' + (oil[0]) + ')">' + t1 + oil[1] + t2 + '</span>');
    }
    //list[0] = '<b>' + list[0] + '</b>';
    disp_oils.innerHTML = list.join('<br>');
}

function listIssues(issues) {
    var list = [], issue;
    for (var i = 0; i < issues.length; i++) {
        issue = issues[i];
        list.push('<span onclick="onClickIssue(' + (issue[0]) + ')">' + issue[1] + '</span>');
    }
    //list[0] = '<b>' + list[0] + '</b>';
    disp_issues.innerHTML = list.join('<br>');
}
 
 /*
 sacrifice 
 */
 
 
 /*
 
 */
 
 
 /*
 
 */
 
 
 /*
 
 */


function listOils(oils) {
    var list = [], t1, t2, oil;
    for (var i = 0; i < oils.length; i++) {
        oil = oils[i];
        t1 = oil[3] ? '' : '*';
        t2 = oil[3] ? '' : '';
        list.push('<span onclick="onClickOil(' + (oil[0]) + ')">' + t1 + oil[1] + t2 + '</span>');
    }
    //list[0] = '<b>' + list[0] + '</b>';
    disp_oils.innerHTML = list.join('<br>');
}

function listIssues(issues) {
    var list = [], issue;
    for (var i = 0; i < issues.length; i++) {
        issue = issues[i];
        list.push('<span onclick="onClickIssue(' + (issue[0]) + ')">' + issue[1] + '</span>');
    }
    //list[0] = '<b>' + list[0] + '</b>';
    disp_issues.innerHTML = list.join('<br>');
}

function showLink(oil) {
    var name = oil[1];
    disp_link.innerHTML = 'Google Suche nach: <a href="https://www.google.com/search?q=' + name + '" target="_blank">' + name + '</a>';
}








function showDescription(id) {
    var oils = db['oils'], oil;
    for(var i=0; i<oils.length;i++){
        if(oils[i][0] == id){
            oil=oils[i];
            break;
        }
    }
    disp_description.innerHTML = oil[3] ? oil[3] : 'Keine Beschreibung verfügbar <br>für ' + oil[1];
    showLink(oil);
    $('img').remove();

}
























