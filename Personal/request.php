<?php
if (!empty($_GET['itemId'])) {
    $item_url = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=' . urlencode($_GET['itemId']);

    $item_json = file_get_contents($item_url);

    print($item_json);
    return $item_json;
}

