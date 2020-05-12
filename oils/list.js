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
	satans folterbank (weiche decken & kissen)
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
 C:\Users\stbri\Documents\NetBeansProjects\common\list.js
 
 /*
 sacrifice suecides
 */
 
 
 /*
 sacrifice sinners
 */
 
 
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
























