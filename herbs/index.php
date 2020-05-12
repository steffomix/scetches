<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<style>
	body{
		padding: 2em;
	}
</style>
</head>
<body>
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
	"usage_id" INTEGER,
	"is_main_usage" INTEGER
)');

$db->exec('CREATE TABLE "healings" (
	"id" INTEGER,
	"name" INTEGER
)');

$db->exec('CREATE TABLE "usages" (
	"id" INTEGER,
	"name" INTEGER
)');


// ### temp tables ###
// store all usage first even if doubled to ID them later
$db->exec('CREATE TABLE "tmp_usages" (
	"herb_id" INTEGER,
	"is_main" INTEGER,
	"name" TEXT
)');
// store all healings first even if doubled to ID them later
$db->exec('CREATE TABLE "tmp_healings" (
	"herb_id" INTEGER,
	"name" INTEGER
)');
function getSites($file){
	$idx = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','xy','z');
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
			//sleep(3);
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
			// break;
		}
		// break;
	}
	// return array('contents' => $contents, 'relations' => $relations) ;
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
		}else{
			echo '<b>'.$url.'</b>'.'<img src="'.$url.'" />';
			return false;
		}
	}
	return false;
}

function is_utf8($string) {
   
    // From http://w3.org/International/questions/qa-forms-utf-8.html
    return preg_match('%^(?:
          [\x09\x0A\x0D\x20-\x7E]            # ASCII
        | [\xC2-\xDF][\x80-\xBF]             # non-overlong 2-byte
        |  \xE0[\xA0-\xBF][\x80-\xBF]        # excluding overlongs
        | [\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}  # straight 3-byte
        |  \xED[\x80-\x9F][\x80-\xBF]        # excluding surrogates
        |  \xF0[\x90-\xBF][\x80-\xBF]{2}     # planes 1-3
        | [\xF1-\xF3][\x80-\xBF]{3}          # planes 4-15
        |  \xF4[\x80-\x8F][\x80-\xBF]{2}     # plane 16
    )*$%xs', $string);
   
}

function prep($str){
	if(!is_utf8($str)){
		$str = utf8_encode($str);
	}
	return trim($str);
}
function trace($str, $bold = false){
	echo $bold ? '<br><b>'.$str.'</b><br>' : '<small>'.$str.', </small>';
	flush();
}
function writeDb($entry){
	
	global $db;
	$stmt = $db->prepare("INSERT INTO herbs 
		('name', 'url', 'intro', 'collect', 'farming', 'description', 'history', 'usage', 'brief', 'img_name', 'img_width', 'img_height', 'image')
		VALUES
		(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
	
	list( $name, $url, $image, $contents, $relations) = array_values($entry);
	trace('<h2>'.$name.'</h2>', true);
	$stmt->bindValue(1, prep($name), SQLITE3_TEXT);
	$stmt->bindValue(2, prep($url), SQLITE3_TEXT);
	list($intro, $collect, $farming, $description, $history, $usage, $brief) = array_values($contents);
	$stmt->bindValue(3, prep($intro), SQLITE3_TEXT);
	$stmt->bindValue(4, prep($collect), SQLITE3_TEXT);
	$stmt->bindValue(5, prep($farming), SQLITE3_TEXT);
	$stmt->bindValue(6, prep($description), SQLITE3_TEXT);
	$stmt->bindValue(7, prep($history), SQLITE3_TEXT);
	$stmt->bindValue(8, prep($usage), SQLITE3_TEXT);
	$stmt->bindValue(9, prep($brief), SQLITE3_TEXT);
	
	if(is_array($image)){
		list($img_name, $img_url, $img_width, $img_height) = array_values($image);
		$img =  file_get_contents($img_url);
		trace('<br><img src="'. $img_url .'" /><br>');
	}else{
		$img_name = $img_url = $img_width = $img_height = $img = '';
	}
	if(!$img){
		trace('<h2> No image found for : '.$name.'</h2>');
	}
	$stmt->bindValue(10, prep($img_name), SQLITE3_TEXT);
	$stmt->bindValue(11, $img_width, SQLITE3_INTEGER);
	$stmt->bindValue(12, $img_height, SQLITE3_INTEGER);
	$stmt->bindValue(13, $img, SQLITE3_BLOB);
	
	$stmt->execute();
	$last_id = $db->lastInsertRowID();
	// 'healings' => $heals, 'usages' => $usages, 'main_usages' => $mainUsages);
	list($healings, $usages, $mainUsages) = array_values($relations);
	array_walk($healings, 'prep');
	array_walk($usages, 'prep');
	array_walk($mainUsages, 'prep');
	trace('<b>healings:</b> ');
	foreach($healings as $heal){
		trace($heal);
		$stmt = $db->prepare('INSERT INTO tmp_healings (herb_id, name) VALUES (:id, :name)');
		$stmt->bindValue(':id', $last_id, SQLITE3_INTEGER);
		$stmt->bindValue(':name', $heal, SQLITE3_TEXT);
		$stmt->execute();
	}
	trace('<b>usages</b>: ');
	foreach($usages as $usage){
		trace($usage);
		$stmt = $db->prepare('INSERT INTO tmp_usages (herb_id, is_main, name) VALUES (:id, 0, :name)');
		$stmt->bindValue(':id', $last_id, SQLITE3_INTEGER);
		$stmt->bindValue(':name', $usage, SQLITE3_TEXT);
		$stmt->execute();
	}
	trace('<b>main usages: </b>');
	foreach($mainUsages as $usage){
		trace($usage);
		$stmt = $db->prepare('INSERT INTO tmp_usages (herb_id, is_main, name) VALUES (:id, 1, :name)');
		$stmt->bindValue(':id', $last_id, SQLITE3_INTEGER);
		$stmt->bindValue(':name', $usage, SQLITE3_TEXT);
		$stmt->execute();
	}
	trace('-----'.$last_id.'-----', true);
}




function getContentSection($str, $nd){
	$str = substr($str, strpos($str, $nd) + strlen($nd));
	return $str;
}

function cutSite($site, $lastPart, $cut){
	return substr($site, 0, strlen($site) - strlen($lastPart) - strlen($cut));
}

$fails = array();
function getContent($url){
	global $fails;
	$url = 'https://www.heilkraeuter.de/lexikon/'.$url;
	//sleep(3);
	$site = trim(file_get_contents($url));
	if(!$site){
		echo '<h1>fail: '.$url.'</h1>';
	}
	$site = prep($site);
	$start = strpos($site, '<!-- InhaltStart -->') + strlen('<!-- InhaltStart -->');
	$site = substr($site, $start);
	// <!-- InhaltEnde -->
	// <!-- aprodukttipps -->
	// <!-- hier werbung unten -->
	$et1 = '<!-- InhaltEnde -->';
	$et2 = '<!-- aprodukttipps -->';
	$et3 = '<!-- hier werbung unten -->';
	$e1 = strpos($site, $et1);
	$e2 = strpos($site, $et2);
	$e3 = strpos($site, $et3);
	if($e1){
		$end =  strpos($site, $et1);
	}elseif($e2){
		$end = strpos($site, $et2);
	}elseif($e3){
		$end = strpos($site, $et3);
	}else{
		$fails[] = $url;
	}
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
// getSites($f);
readSites($f);
fwrite(fopen('failed_urls.txt', 'w'), implode("\r\n", $fails));
// echo sprintf($herbs);



$db->close();
