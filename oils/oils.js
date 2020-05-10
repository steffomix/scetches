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

function toUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

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

