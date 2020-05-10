<?php


class DB extends SQLite3
{
    function __construct()
    {
        //$this->open('sqlite.db');
    }
}
/*
$d = 'images/';
$dir = opendir($d);
$images = array();
while (false !== ($file = readdir($dir))) {
    if ($file != "." && $file != "..") {
        $f = explode('|', $file)[0];
        $images[$f] = $file;
    }
}
//sort($images);
ksort($images);
$db = new DB();
$dbname = 'db-oils.sqlite';
unlink($dbname);
$db->open($dbname);
$db->exec('CREATE TABLE IF NOT EXISTS "oils" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT, `url` TEXT, `description` TEXT, `image` BLOB )');
$db->exec("CREATE TABLE IF NOT EXISTS `issues` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT, `url` TEXT, `description` TEXT, `image` BLOB )");
$db->exec("CREATE TABLE `issues_oils` ( `id_oil` INTEGER NOT NULL, `id_issue` INTEGER NOT NULL, `rank` INTEGER, `description` TEXT )");
$oils = file('db-all-oils-from-issues.txt');
sort($oils);
foreach ($oils as $oil) {
    $oil = trim($oil);
    $oilParts = explode('|', $oil);
    $url = $oilParts[0];
    $name = $oilParts[1];
    $f = 'beschreibungen/' . urlencode($oil . "\r\n");
    $desc = file_exists($f) ? trim(file_get_contents($f)) : '';
    if (array_key_exists($url, $images) || $url == 'basilikum.htm') {
        $f = 'images/' . $images[$url];
        $image = is_file($f) ? file_get_contents($f) : '';
    } else {
        $image = '';
    }
    $stmt = $db->prepare("INSERT INTO oils (name, url, description, image) VALUES (:name, :url, :desc, :image)");
    $stmt->bindParam(':name', $name, SQLITE3_TEXT);
    $stmt->bindParam(':url', $url, SQLITE3_TEXT);
    $stmt->bindParam(':desc', $desc, SQLITE3_TEXT);
    $stmt->bindParam(':image', $image, SQLITE3_BLOB);
    $stmt->execute();
}

$issueOils = unserialize(file_get_contents('db-issues-oils.txt'));
foreach($issueOils as $issue => $issueOils){
    $issue = trim(urldecode($issue));
    $issue = explode('|', $issue)[1];
    $stmt = $db->prepare('INSERT INTO issues (name) VALUES (:name)');
    $stmt->bindParam(':name', $issue, SQLITE3_TEXT);
    $stmt->execute();
    $id_issue = $db->lastInsertRowID();
    foreach($issueOils as $oil){
        $oil = explode('|', $oil);
        $name = $oil[1];
        $stmt = $db->prepare('SELECT id FROM oils WHERE name = :name');
        $stmt->bindParam(':name', $name, SQLITE3_TEXT);
        $res = $stmt->execute();
        $res = $res->fetchArray();
        $id_oil = $res['id'];
        $stmt = $db->prepare('INSERT INTO issues_oils (id_issue, id_oil) VALUES (:issue, :oil)');
        $e = $db->lastErrorMsg();
        $stmt->bindParam(':issue', $id_issue, SQLITE3_TEXT);
        $stmt->bindParam(':oil', $id_oil, SQLITE3_TEXT);
        $stmt->execute();
    }
}

*/




$db = new DB();
$dbname = 'db-oils.sqlite';//'db-oils.sqlite';
//unlink($dbname);
$db->open($dbname);
$res = $db->query('SELECT * FROM oils ORDER by name');
$oils = array();
while(false !== ($row = $res->fetchArray())){
    $test = json_encode(array($row['description']));
    if(json_last_error()){
        $row['description'] = utf8_encode($row['description']);
    }
    $oils[] = array($row['id'], $row['name'], $row['url'], trim($row['description']));

}

$res = $db->query('SELECT * FROM issues ORDER by name');
$issues = array();
while(false !== ($row = $res->fetchArray())){ $test = json_encode(array($row['name']));
    if(json_last_error()){
        echo $row['name'], '  ', json_last_error_msg()."\n";
    }
    $issues[] = array($row['id'], $row['name'], $row['url'], $row['description']);
}

$res = $db->query('SELECT * FROM issues_oils ORDER by id_issue');
$issues_oils = array();
while(false !== ($row = $res->fetchArray())){
    $issues_oils[] = array($row['id_oil'], $row['id_issue'], $row['rank'], $row['description']);
}
$db->close();
$db=array(
    'oils' => $oils,
    'issues' => $issues,
    'issues_oils' => $issues_oils
    );
//fwrite(fopen('serialized_db.txt', 'w'), serialize($db));
$json = 'var db='.json_encode($db);
fwrite(fopen('js/db-oils.json', 'w'), $json);
echo substr($json, 0, 100);
echo "\r\n";
echo json_last_error();
//echo $json;



/*
$f = file('db-all-oils-from-issues.txt');
$repair = array();
foreach($f as $v){
    $name = trim(explode('|', $v)[1]);
    $repair[$name] = trim($v);
}


$dir = opendir('issues');
$allOils = array();
$db = array();
while(false !== ($file = readdir($dir))) {
    if ($file != "." && $file != "..") {
        //$file = 'Abbau-von-Giften.htm%7CAbbau+von+Giften%0A';
        $db[$file] = array();
        $page = file_get_contents('issues/' . $file);
        // <!-- #BeginEditable "hauptfenster" -->
        $nd = '<!-- #BeginEditable "hauptfenster" --> ';
        $page = substr($page,strpos($page, $nd) + strlen($nd));
        $page = substr($page, 0, strpos($page, '<script'));
        $parts = explode('<li>', $page);
        array_shift($parts);
        foreach($parts as $k => $part){
            $part = trim($part);
            $nd = '<a href="../aetherische-oele/';
            if(strpos($part, $nd) === false){
                $part = strpos($part, '<') === false ? $part : substr($part, 0, strpos($part, '<'));
                $parts[$k] = $repair[$part];
            }else{
                $part = substr($part, strpos($part, $nd) + strlen($nd));
                $part = substr($part, 0, strpos($part,'</a>'));
                $part = str_replace('">', '|', $part);
                $parts[$k] = $part;
            }
            if(!in_array($part, $allOils)) $allOils[] = $part;
        }
        $db[$file] = $parts;
        $f = fopen('issues2/'.$file, 'w');
        fwrite($f, implode("\r\n", $parts));
    }
}
sort($allOils);
fwrite(fopen('db-issues-oils.txt', 'w'), serialize($db));
//fwrite(fopen('db-all-oils-from-issues.txt', 'w'), implode("\r\n", $allOils));
*/
/*
$images = array();
$list = file('db-all-oils-from-issues.txt');
foreach($list as $item){
    $url = trim(explode('|', $item)[0]);
    // $file = file_get_contents('http://www.aetherische-oele.net/aetherische-oele/'.$url);
    $f = file_get_contents('http://www.aetherische-oele.net/aetherische-oele/'.$url);
    $desc = '';
    if($f){
        $nd = '<!-- #BeginEditable "hauptfenster" -->';
        $f = substr($f, strpos($f, $nd) + strlen($nd));
        $nd = '<!-- #EndEditable -->';
        $f = substr($f, 0, strpos($f, $nd));
        $nd = '<!-- Eigenen Shop verlinken -->';
        $f1 = substr($f, 0, strpos($f, $nd));
        $nd = '<!-- Eigenen Shop verlinken Ende -->';
        $f2 = substr($f, strpos($f, $nd) + strlen($nd));
        $desc = $f1 . $f2;
    }
    //$f = fopen('beschreibungen/'.urlencode($item), 'w');
    //fwrite($f, $desc);
    //fclose($f);

    $pics = explode('<img src="../Bilder/', $desc);
    array_shift($pics);
    foreach($pics as $pic){
        $pic = substr($pic, 0, strpos($pic, '"'));
        if(!in_array($pic, $images)) $images[] = $url.'|'.$pic;
    }
}
$url = 'http://www.aetherische-oele.net/Bilder/';
foreach($images as $pic){
    //$pic = 'Engelwurz3.jpg';

    $file = file_get_contents(trim($url.(explode('|', $pic)[1])));
    $f = fopen('images/'.strtolower($pic), 'w');
    fwrite($f, $file);
    fclose($f);
}
*/