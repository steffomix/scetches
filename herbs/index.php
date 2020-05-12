<?php

$dbName = 'db.sqlite';
unlink($dbName);
$db = new SQLite3($dbName);
//$db->open($dbName);
$db->exec('CREATE TABLE "herbs" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT NOT NULL,
	"url"	TEXT NOT NULL,
	"intro"	TEXT,
	"collect"	TEXT,
	"farming"	TEXT,
	"description"	TEXT,
	"history"	TEXT,
	"usage"	TEXT,
	"brief"	TEXT,
	"img_name" TEXT,
	"img_width" INTEGER,
	"img_height" INTEGER,
	"image"	BLOB
)');
$db->exec('CREATE TABLE "herbs_usages" (
	"herb_id" INTEGER,
	"usage_id" INTEGER
)');
$db->exec('CREATE TABLE "herbs_main_usages" (
	"herb_id" INTEGER,
	"main_usage_id" INTEGER
)');
$db->exec('CREATE TABLE "herbs_healings" (
	"herb_id" INTEGER,
	"healings_id" INTEGER
)');

$db->exec('CREATE TABLE "healings" (
	"id" INTEGER,
	"name" INTEGER
)');

$db->exec('CREATE TABLE "usages" (
	"id" INTEGER,
	"name" INTEGER
)');
$db->exec('CREATE TABLE "main_usages" (
	"id" INTEGER,
	"name" INTEGER
)');
function getSites($file){
	$idx = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','xy','xy');
	$pat = 'index-%s.htm';
	$url = 'https://www.heilkraeuter.de/lexikon/';
	$sites = array();
	foreach($idx as $id){
		$sites[] = file_get_contents(sprintf($url.$pat, $id));
	}
	fwrite(fopen($file, 'w'), serialize($sites));

}


function readSites($file){
	// <div class="abisznavigation">
	// <li class="linkliste"><b><i><a href="moschus-malve.htm">Abelmoschus</A> ****</I></B></LI>
	$file = file_get_contents($file);
	$sites = unserialize($file);
	
	foreach($sites as $site){
		$str = substr($site, strpos($site, 'abisznavigation'));
		$entrys = explode('linkliste', $str);
		array_shift($entrys);
		$herbs = array();
		foreach($entrys as $entry){
			$start = strpos($entry, 'href="') + strlen('href="');
			$end = strpos($entry, '</A>') - $start;
			$entry = substr($entry, $start, $end);
			$parts = explode('">', $entry);
			$url = $parts[0];
			$name = $parts[1];
			$contents = getContent($url);
			$relations = getRelations($contents['brief']);
			$image = getImage($contents['intro']);
			writeDb(array('name' => $name, 'url' => $url, 'image' => $image, 'contents' => $contents, 'relations' => $relations));
			break;
		}
		break;
	}
	return array('contents' => $contents, 'relations' => $relations) ;
}

function getImage($str){
	if(strpos($str, 'img')){
		$cut = '<img src="';
		$str = substr($str, strpos($str, $cut) + strlen($cut));
		$str = substr($str, 0, strpos($str, '"'));
		$url = 'https://www.heilkraeuter.de/lexikon/'.$str;
		$inf = getimagesize($url);
		if($inf){
			return array('name' => $str, 'url' => $url, 'width' => $inf[0], 'height' => $inf[1]);
		}
	}
	return false;
}

function writeDb($entry){
	
	global $db;
	$stmt = $db->prepare("INSERT INTO herbs 
		('name', 'url', 'intro', 'collect', 'farming', 'description', 'history', 'usage', 'brief', 'img_name', 'img_width', 'img_height', 'image')
		VALUES
		(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
	
	list( $name, $url, $image, $contents, $relations) = array_values($entry);
	$stmt->bindValue(1, $name, SQLITE3_TEXT);
	$stmt->bindValue(2, $url, SQLITE3_TEXT);
	list($intro, $collect, $farming, $description, $history, $usage, $brief) = array_values($contents);
	$stmt->bindValue(3, utf8_encode($intro), SQLITE3_TEXT);
	$stmt->bindValue(4, utf8_encode($collect), SQLITE3_TEXT);
	$stmt->bindValue(5, utf8_encode($farming), SQLITE3_TEXT);
	$stmt->bindValue(6, utf8_encode($description), SQLITE3_TEXT);
	$stmt->bindValue(7, utf8_encode($history), SQLITE3_TEXT);
	$stmt->bindValue(8, utf8_encode($usage), SQLITE3_TEXT);
	$stmt->bindValue(9, utf8_encode($brief), SQLITE3_TEXT);
	list($img_name, $img_url, $img_width, $img_height) = array_values($image);
	$stmt->bindValue(10, $img_name, SQLITE3_TEXT);
	$stmt->bindValue(11, $img_width, SQLITE3_INTEGER);
	$stmt->bindValue(12, $img_height, SQLITE3_INTEGER);
	$url = 'https://www.heilkraeuter.de/lexikon/';
	$stmt->bindValue(13, file_get_contents($url.$img_name), SQLITE3_BLOB);
	$stmt->execute();
	$last_id = $db->lastInsertRowID();
	
	
	
}




function getContentSection($str, $nd){
	$str = substr($str, strpos($str, $nd) + strlen($nd));
	return $str;
}

function cutSite($site, $lastPart, $cut){
	return substr($site, 0, strlen($site) - strlen($lastPart) - strlen($cut));
}

function getContent($url){
	$url = 'https://www.heilkraeuter.de/lexikon/'.$url;
	$site = file_get_contents($url);
	$start = strpos($site, '<!-- InhaltStart -->') + strlen('<!-- InhaltStart -->');
	$site = substr($site, $start);
	$end = strpos($site, '<!-- hier werbung unten -->');
	$site = substr($site, 0, $end);
	
	$collect = $farm = $herbDesc = $history = $usage = $letter = $intro = '';
	
	$cut = '<H2><I>Sammeltipps</I></H2>';
	if(strpos($site, $cut)){
		$collect = getContentSection($site, $cut);
		$site = cutSite($site, $collect, $cut);
	}
	
	$cut = '<H2><I>Anbautipps</I></H2>';
	if(strpos($site, $cut)){
		$farm = getContentSection($site, $cut);
		$site = cutSite($site, $farm, $cut);
	}
	
	$cut = '<H2><I>Pflanzenbeschreibung</I></H2>';
	if(strpos($site, $cut)){
		$herbDesc = getContentSection($site, $cut);
		$site = cutSite($site, $herbDesc, $cut);
	}
	
	$cut = '<!-- BuchTippsKlein -->';
	if(strpos($site, $cut)){
		$foo = getContentSection($site, $cut);
		$site = cutSite($site, $foo, $cut);
	}
	
	
	$cut = '<H2><I>Geschichtliches</I></H2>';
	if(strpos($site, $cut)){
		$history = getContentSection($site, $cut);
		$site = cutSite($site, $history, $cut);
	}
	
	$cut = '<H2><I>Anwendung</I></H2>';
	if(strpos($site, $cut)){
		$usage = getContentSection($site, $cut);
		$site = cutSite($site, $usage, $cut);
	}
	
	$cut = '<script async';
	if(strpos($site, $cut)){
		$foo = getContentSection($site, $cut);
		$site = cutSite($site, $foo, $cut);
	}
	
	$cut = '<H2><I>Steckbrief</I></H2>';
	if(strpos($site, $cut)){
		$letter = getContentSection($site, $cut);
		$site = cutSite($site, $letter, $cut);
	}
	
	$intro = $site;
	
	return array(
		'intro' => $intro,
		'collect' => $collect,
		'farming' => $farm,
		'description' => $herbDesc,
		'history' => $history,
		'usage' => $usage,
		'brief' => $letter);
}


function getRelationParts($part){
	$cut = 'uebersicht">';
	$start = strpos($part, $cut) + strlen($cut);
	$part = substr($part, $start);
	while(strpos($part, $cut)){
		$part = substr($part, strpos($part, $cut) + strlen($cut));
	}
	$end = strpos($part, '</td>');
	$part = substr($part, 0, $end);
	$part = str_replace(array('<br/>', '<b>', '</b>', ','), '', $part);
	$part = explode("\n", $part);
	array_walk($part, 'trim');
	$parts = array();
	foreach($part as $p){
		if(trim($p)) $parts[] = trim($p);
	}
	return $parts;
}
function getRelations($str){
	$parts = array();
	$heals = array();
	$usages = array();
	$mainUsages = array();
	$cutStart = '<th class="uebersicht">';
	$cutEnd = '</tr>';
	while(strpos($str, $cutStart) && strpos($str, $cutEnd)){
		$start = strpos($str, $cutStart);
		$str = substr($str, $start);
		$end = strpos($str, $cutEnd);
		$parts[] = substr($str, 0, $end);
		$str = substr($str, $end + strlen($cutEnd));
	}
	foreach($parts as $part){
		if(strpos($part, 'Haupt-Anwendungen')){
			$mainUsages = getRelationParts($part);
		}
		if(strpos($part, 'Heilwirkung')){
			$heals = getRelationParts($part);
		}
		if(strpos($part, 'Anwendungsbereiche')){
			$usages = getRelationParts($part);
		}
		
	}
	return array('healings' => $heals, 'usages' => $usages, 'main_usages' => $mainUsages);
	
}




$f = 'sites.sx';
//getSites($f);
$herbs = readSites($f);
echo sprintf($herbs);



$db->close();
