<?php

// Menu
$RootMenu = new cMenu("RootMenu", TRUE);
$RootMenu->AddMenuItem(13, "mci_Modulo_Gestion", $Language->MenuPhrase("13", "MenuText"), "", -1, "", TRUE, FALSE, TRUE, "");
$RootMenu->AddMenuItem(6, "mi_pedidos", $Language->MenuPhrase("6", "MenuText"), "pedidoslist.php", 13, "", IsLoggedIn() || AllowListMenu('{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}pedidos'), FALSE, FALSE, "");
$RootMenu->AddMenuItem(5, "mi_cfgslider", $Language->MenuPhrase("5", "MenuText"), "cfgsliderlist.php", 13, "", IsLoggedIn() || AllowListMenu('{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}cfgslider'), FALSE, FALSE, "");
$RootMenu->AddMenuItem(12, "mci_Modulo_Productos", $Language->MenuPhrase("12", "MenuText"), "", -1, "", TRUE, FALSE, TRUE, "");
$RootMenu->AddMenuItem(9, "mi_productos", $Language->MenuPhrase("9", "MenuText"), "productoslist.php", 12, "", IsLoggedIn() || AllowListMenu('{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}productos'), FALSE, FALSE, "");
$RootMenu->AddMenuItem(11, "mci_Modulo_Configuracion", $Language->MenuPhrase("11", "MenuText"), "", -1, "", TRUE, FALSE, TRUE, "");
$RootMenu->AddMenuItem(2, "mi_cfgmarcas", $Language->MenuPhrase("2", "MenuText"), "cfgmarcaslist.php", 11, "", IsLoggedIn() || AllowListMenu('{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}cfgmarcas'), FALSE, FALSE, "");
$RootMenu->AddMenuItem(4, "mi_cfgrubros", $Language->MenuPhrase("4", "MenuText"), "cfgrubroslist.php", 11, "", IsLoggedIn() || AllowListMenu('{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}cfgrubros'), FALSE, FALSE, "");
$RootMenu->AddMenuItem(1, "mi_cfgformaspagos", $Language->MenuPhrase("1", "MenuText"), "cfgformaspagoslist.php", 11, "", IsLoggedIn() || AllowListMenu('{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}cfgformaspagos'), FALSE, FALSE, "");
$RootMenu->AddMenuItem(3, "mi_cfgmonedas", $Language->MenuPhrase("3", "MenuText"), "cfgmonedaslist.php", 11, "", IsLoggedIn() || AllowListMenu('{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}cfgmonedas'), FALSE, FALSE, "");
echo $RootMenu->ToScript();
?>
<div class="ewVertical" id="ewMenu"></div>
