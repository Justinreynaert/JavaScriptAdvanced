<?php 
//scriptje voor Javascript cursus project "ajax_keuzelijsten"
// produceert een xml bestand


$gewesten="<gewesten><gewest>Brussel</gewest><gewest>Waals gewest</gewest><gewest>Vlaanderen</gewest></gewesten>";

$prov_g_vl = "<provincies><provincie naam='Antwerpen' code='ant' /><provincie naam='Limburg' code='lim' /><provincie naam='Oost-Vlaanderen' code='ovl' /><provincie naam='Vlaams-Brabant ' code='vbr' /><provincie naam='West-Vlaanderen' code='wvl' /></provincies>";
$prov_g_wg = "<provincies><provincie naam='Henegouwen' code='hen' /><provincie naam='Luik' code='lui' /><provincie naam='Luxemburg' code='lux' /><provincie naam='Namen' code='nam' /><provincie naam='Waals-Brabant' code='wbr' /></provincies>";
$prov_g_br = "<provincies><provincie naam='Brussel' code='bru' /></provincies>";
 
$stad_ant = "<steden><stad naam='Antwerpen'  code='461496' /><stad naam='Geel'  code='35189' /><stad naam='Herentals'  code='26071' /><stad naam='Hoogstraten'  code='18582' /><stad naam='Lier'  code='33272' /><stad naam='Mechelen'  code='78268' /><stad naam='Mortsel'  code='24427' /><stad naam='Turnhout'  code='39791' /></steden>";
$stad_lim = "<steden><stad naam='Beringen ' code='41072' /><stad naam='Bilzen ' code='30057' /><stad naam='Borgloon ' code='10152' /><stad naam='Bree ' code='14503' /><stad naam='Dilsen-Stokkem ' code='19106' /><stad naam='Genk ' code='63787' /><stad naam='Halen ' code='8624' /><stad naam='Hamont-Achel ' code='13770' /><stad naam='Hasselt ' code='70035' /><stad naam='Herk-de-Stad ' code='11795' /><stad naam='Lommel ' code='31898' /><stad naam='Maaseik ' code='23631' /><stad naam='Peer ' code='15810' /><stad naam='Sint-Truiden ' code='38247' /><stad naam='Tongeren ' code='29687' /></steden>";
$stad_ovl = "<steden><stad naam='Aalst' code='77360' /><stad naam='Deinze ' code='28320' /><stad naam='Dendermonde ' code='43347' /><stad naam='Eeklo ' code='19535' /><stad naam='Gent ' code='233120' /><stad naam='Geraardsbergen ' code='31380' /><stad naam='Lokeren ' code='37850' /><stad naam='Ninove ' code='35651' /><stad naam='Oudenaarde ' code='28517' /><stad naam='Ronse ' code='24158' /><stad naam='Sint-Niklaas ' code='69725' /><stad naam='Zottegem ' code='24548' /></steden>";
$stad_wvl = "<steden><stad naam='Blankenberge ' code='18175' /><stad naam='Brugge ' code='117224' /><stad naam='Damme ' code='10899' /><stad naam='Diksmuide ' code='15733' /><stad naam='Gistel ' code='11125' /><stad naam='Harelbeke ' code='26172' /><stad naam='Ieper ' code='34897' /><stad naam='Izegem ' code='26544' /><stad naam='Kortrijk ' code='73657' /><stad naam='Lo-Reninge ' code='3306' /><stad naam='Menen ' code='32413' /><stad naam='Mesen ' code='988' /><stad naam='Nieuwpoort ' code='10855' /><stad naam='Oostende ' code='68931' /><stad naam='Oudenburg ' code='8929' /><stad naam='Poperinge ' code='19623' /><stad naam='Roeselare ' code='55775' /><stad naam='Tielt ' code='19269' /><stad naam='Torhout ' code='19453' /><stad naam='Veurne ' code='11843' /><stad naam='Waregem ' code='35852' /><stad naam='Wervik ' code='17607' /></steden>";
$stad_vbr = "<steden><stad naam='Diest' code='22740' /><stad naam='Halle ' code='34882' /><stad naam='Landen ' code='14682' /><stad naam='Leuven ' code='90706' /><stad naam='Scherpenheuvel-Zichem ' code='22064' /><stad naam='Tienen ' code='31835' /><stad naam='Vilvoorde ' code='37324' /><stad naam='Zoutleeuw ' code='7947' /></steden>";
$stad_hen = "<steden><stad naam='Aat' code='26799' /><stad naam='Antoing ' code='7549' /><stad naam='Beaumont ' code='6698' /><stad naam='Bergen ' code='91221' /><stad naam='Binche ' code='32409' /><stad naam='Charleroi ' code='201300' /><stad naam='Châtelet ' code='35621' /><stad naam='Chièvres ' code='6198' /><stad naam='Chimay ' code='9774' /><stad naam='Doornik ' code='67534' /><stad naam='Edingen ' code='11980' /><stad naam='Fleurus ' code='22221' /><stad naam='Fontaine-l'Evêque ' code='16687' /><stad naam='Komen-Waasten ' code='17562' /><stad naam='La Louvière ' code='77210' /><stad naam='Le Rœulx ' code='7977' /><stad naam='Lessen ' code='17848' /><stad naam='Leuze-en-Hainaut ' code='13223' /><stad naam='Moeskroen ' code='52825' /><stad naam='Péruwelz ' code='16843' /><stad naam='Saint-Ghislain ' code='22466' /><stad naam=''s-Gravenbrakel ' code='20305' /><stad naam='Thuin ' code='14625' /><stad naam='Zinnik ' code='25420' /></steden>";
$stad_lui = "<steden><stad naam='Borgworm' code='14050' /><stad naam='Eupen ' code='18248' /><stad naam='Hannuit ' code='14291' /><stad naam='Herve ' code='16772' /><stad naam='Hoei ' code='20071' /><stad naam='Limburg ' code='5616' /><stad naam='Luik ' code='187086' /><stad naam='Malmedy ' code='11829' /><stad naam='Sankt Vith ' code='9169' /><stad naam='Seraing ' code='60740' /><stad naam='Spa ' code='10543' /><stad naam='Stavelot ' code='6671' /><stad naam='Verviers ' code='53597' /><stad naam='Wezet ' code='16817' /></steden>";
$stad_nam = "<steden><stad naam='Andenne' code='24407' /><stad naam='Beauraing ' code='8344' /><stad naam='Ciney ' code='14958' /><stad naam='Couvin ' code='13476' /><stad naam='Dinant ' code='13012' /><stad naam='Fosses-la-Ville ' code='9311' /><stad naam='Gembloers ' code='21964' /><stad naam='Namen ' code='107178' /><stad naam='Philippeville ' code='8320' /><stad naam='Rochefort ' code='12038' /><stad naam='Walcourt ' code='17516' /></steden>";
$stad_lux = "<steden><stad naam='Aarlen' code='26367' /><stad naam='Bastenaken ' code='14144' /><stad naam='Bouillon ' code='5455' /><stad naam='Chiny ' code='5013' /><stad naam='Durbuy ' code='10531' /><stad naam='Florenville ' code='5449' /><stad naam='Houffalize ' code='4749' /><stad naam='La Roche-en-Ardenne ' code='4267' /><stad naam='Marche-en-Famenne ' code='16994' /><stad naam='Neufchâteau ' code='6539' /><stad naam='Saint-Hubert ' code='5718' /><stad naam='Virton ' code='11165' /></steden>";
$stad_bru = "<steden><stad naam='Brussel' code='144784' /></steden>";
$stad_wbr = "<steden><stad naam='Geldenaken' code='12440' /><stad naam='Genepiën' code='14136' /><stad naam='Nijvel' code='24290' /><stad naam='Ottignies-Louvain-la-Neuve ' code='29521' /><stad naam='Waver ' code='32201' /></steden>";

// reageert op de GET/POST in het XMLHttpRequest.open
// slechts één variabele: 'wat'
// voorbeelden:

// steden_xml.php?wat=$prov_g_vl 
//		geeft de provincielijst met 
//			als root element <provincies>
//			het attrib code bevat de 3letter ocde vd provincie
// steden_xml.php?wat=$stad_lux 
//		geeft de stedenlijst van de provincie luxemburg met 
//			als root element <steden>
//			het attrib code bevat nu het aantal inwoners van die  stad

if (!empty($_REQUEST['wat'])){
	$wat = $_REQUEST['wat'];
	$xml=$$wat; // doorgegeven querystring bevat een naam van een variabele
}else{
	$xml=$stad_wvl; //default output
}


header("Content-Type: application/xml");
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo $xml;

?>
