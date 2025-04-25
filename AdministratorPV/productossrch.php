<?php
if (session_id() == "") session_start(); // Init session data
ob_start(); // Turn on output buffering
?>
<?php include_once "ewcfg14.php" ?>
<?php include_once ((EW_USE_ADODB) ? "adodb5/adodb.inc.php" : "ewmysql14.php") ?>
<?php include_once "phpfn14.php" ?>
<?php include_once "productosinfo.php" ?>
<?php include_once "userfn14.php" ?>
<?php

//
// Page class
//

$productos_search = NULL; // Initialize page object first

class cproductos_search extends cproductos {

	// Page ID
	var $PageID = 'search';

	// Project ID
	var $ProjectID = '{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}';

	// Table name
	var $TableName = 'productos';

	// Page object name
	var $PageObjName = 'productos_search';

	// Page headings
	var $Heading = '';
	var $Subheading = '';

	// Page heading
	function PageHeading() {
		global $Language;
		if ($this->Heading <> "")
			return $this->Heading;
		if (method_exists($this, "TableCaption"))
			return $this->TableCaption();
		return "";
	}

	// Page subheading
	function PageSubheading() {
		global $Language;
		if ($this->Subheading <> "")
			return $this->Subheading;
		if ($this->TableName)
			return $Language->Phrase($this->PageID);
		return "";
	}

	// Page name
	function PageName() {
		return ew_CurrentPage();
	}

	// Page URL
	function PageUrl() {
		$PageUrl = ew_CurrentPage() . "?";
		if ($this->UseTokenInUrl) $PageUrl .= "t=" . $this->TableVar . "&"; // Add page token
		return $PageUrl;
	}

	// Message
	function getMessage() {
		return @$_SESSION[EW_SESSION_MESSAGE];
	}

	function setMessage($v) {
		ew_AddMessage($_SESSION[EW_SESSION_MESSAGE], $v);
	}

	function getFailureMessage() {
		return @$_SESSION[EW_SESSION_FAILURE_MESSAGE];
	}

	function setFailureMessage($v) {
		ew_AddMessage($_SESSION[EW_SESSION_FAILURE_MESSAGE], $v);
	}

	function getSuccessMessage() {
		return @$_SESSION[EW_SESSION_SUCCESS_MESSAGE];
	}

	function setSuccessMessage($v) {
		ew_AddMessage($_SESSION[EW_SESSION_SUCCESS_MESSAGE], $v);
	}

	function getWarningMessage() {
		return @$_SESSION[EW_SESSION_WARNING_MESSAGE];
	}

	function setWarningMessage($v) {
		ew_AddMessage($_SESSION[EW_SESSION_WARNING_MESSAGE], $v);
	}

	// Methods to clear message
	function ClearMessage() {
		$_SESSION[EW_SESSION_MESSAGE] = "";
	}

	function ClearFailureMessage() {
		$_SESSION[EW_SESSION_FAILURE_MESSAGE] = "";
	}

	function ClearSuccessMessage() {
		$_SESSION[EW_SESSION_SUCCESS_MESSAGE] = "";
	}

	function ClearWarningMessage() {
		$_SESSION[EW_SESSION_WARNING_MESSAGE] = "";
	}

	function ClearMessages() {
		$_SESSION[EW_SESSION_MESSAGE] = "";
		$_SESSION[EW_SESSION_FAILURE_MESSAGE] = "";
		$_SESSION[EW_SESSION_SUCCESS_MESSAGE] = "";
		$_SESSION[EW_SESSION_WARNING_MESSAGE] = "";
	}

	// Show message
	function ShowMessage() {
		$hidden = FALSE;
		$html = "";

		// Message
		$sMessage = $this->getMessage();
		if (method_exists($this, "Message_Showing"))
			$this->Message_Showing($sMessage, "");
		if ($sMessage <> "") { // Message in Session, display
			if (!$hidden)
				$sMessage = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" . $sMessage;
			$html .= "<div class=\"alert alert-info ewInfo\">" . $sMessage . "</div>";
			$_SESSION[EW_SESSION_MESSAGE] = ""; // Clear message in Session
		}

		// Warning message
		$sWarningMessage = $this->getWarningMessage();
		if (method_exists($this, "Message_Showing"))
			$this->Message_Showing($sWarningMessage, "warning");
		if ($sWarningMessage <> "") { // Message in Session, display
			if (!$hidden)
				$sWarningMessage = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" . $sWarningMessage;
			$html .= "<div class=\"alert alert-warning ewWarning\">" . $sWarningMessage . "</div>";
			$_SESSION[EW_SESSION_WARNING_MESSAGE] = ""; // Clear message in Session
		}

		// Success message
		$sSuccessMessage = $this->getSuccessMessage();
		if (method_exists($this, "Message_Showing"))
			$this->Message_Showing($sSuccessMessage, "success");
		if ($sSuccessMessage <> "") { // Message in Session, display
			if (!$hidden)
				$sSuccessMessage = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" . $sSuccessMessage;
			$html .= "<div class=\"alert alert-success ewSuccess\">" . $sSuccessMessage . "</div>";
			$_SESSION[EW_SESSION_SUCCESS_MESSAGE] = ""; // Clear message in Session
		}

		// Failure message
		$sErrorMessage = $this->getFailureMessage();
		if (method_exists($this, "Message_Showing"))
			$this->Message_Showing($sErrorMessage, "failure");
		if ($sErrorMessage <> "") { // Message in Session, display
			if (!$hidden)
				$sErrorMessage = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" . $sErrorMessage;
			$html .= "<div class=\"alert alert-danger ewError\">" . $sErrorMessage . "</div>";
			$_SESSION[EW_SESSION_FAILURE_MESSAGE] = ""; // Clear message in Session
		}
		echo "<div class=\"ewMessageDialog\"" . (($hidden) ? " style=\"display: none;\"" : "") . ">" . $html . "</div>";
	}
	var $PageHeader;
	var $PageFooter;

	// Show Page Header
	function ShowPageHeader() {
		$sHeader = $this->PageHeader;
		$this->Page_DataRendering($sHeader);
		if ($sHeader <> "") { // Header exists, display
			echo "<p>" . $sHeader . "</p>";
		}
	}

	// Show Page Footer
	function ShowPageFooter() {
		$sFooter = $this->PageFooter;
		$this->Page_DataRendered($sFooter);
		if ($sFooter <> "") { // Footer exists, display
			echo "<p>" . $sFooter . "</p>";
		}
	}

	// Validate page request
	function IsPageRequest() {
		global $objForm;
		if ($this->UseTokenInUrl) {
			if ($objForm)
				return ($this->TableVar == $objForm->GetValue("t"));
			if (@$_GET["t"] <> "")
				return ($this->TableVar == $_GET["t"]);
		} else {
			return TRUE;
		}
	}
	var $Token = "";
	var $TokenTimeout = 0;
	var $CheckToken = EW_CHECK_TOKEN;
	var $CheckTokenFn = "ew_CheckToken";
	var $CreateTokenFn = "ew_CreateToken";

	// Valid Post
	function ValidPost() {
		if (!$this->CheckToken || !ew_IsPost())
			return TRUE;
		if (!isset($_POST[EW_TOKEN_NAME]))
			return FALSE;
		$fn = $this->CheckTokenFn;
		if (is_callable($fn))
			return $fn($_POST[EW_TOKEN_NAME], $this->TokenTimeout);
		return FALSE;
	}

	// Create Token
	function CreateToken() {
		global $gsToken;
		if ($this->CheckToken) {
			$fn = $this->CreateTokenFn;
			if ($this->Token == "" && is_callable($fn)) // Create token
				$this->Token = $fn();
			$gsToken = $this->Token; // Save to global variable
		}
	}

	//
	// Page class constructor
	//
	function __construct() {
		global $conn, $Language;
		$GLOBALS["Page"] = &$this;
		$this->TokenTimeout = ew_SessionTimeoutTime();

		// Language object
		if (!isset($Language)) $Language = new cLanguage();

		// Parent constuctor
		parent::__construct();

		// Table object (productos)
		if (!isset($GLOBALS["productos"]) || get_class($GLOBALS["productos"]) == "cproductos") {
			$GLOBALS["productos"] = &$this;
			$GLOBALS["Table"] = &$GLOBALS["productos"];
		}

		// Page ID
		if (!defined("EW_PAGE_ID"))
			define("EW_PAGE_ID", 'search', TRUE);

		// Table name (for backward compatibility)
		if (!defined("EW_TABLE_NAME"))
			define("EW_TABLE_NAME", 'productos', TRUE);

		// Start timer
		if (!isset($GLOBALS["gTimer"]))
			$GLOBALS["gTimer"] = new cTimer();

		// Debug message
		ew_LoadDebugMsg();

		// Open connection
		if (!isset($conn))
			$conn = ew_Connect($this->DBID);
	}

	//
	//  Page_Init
	//
	function Page_Init() {
		global $gsExport, $gsCustomExport, $gsExportFile, $UserProfile, $Language, $Security, $objForm;

		// Is modal
		$this->IsModal = (@$_GET["modal"] == "1" || @$_POST["modal"] == "1");

		// User profile
		$UserProfile = new cUserProfile();

		// Security
		$Security = new cAdvancedSecurity();
		if (!$Security->IsLoggedIn()) $Security->AutoLogin();
		$Security->LoadCurrentUserLevel($this->ProjectID . $this->TableName);
		if (!$Security->CanSearch()) {
			$Security->SaveLastUrl();
			$this->setFailureMessage(ew_DeniedMsg()); // Set no permission
			if ($Security->CanList())
				$this->Page_Terminate(ew_GetUrl("productoslist.php"));
			else
				$this->Page_Terminate(ew_GetUrl("login.php"));
		}

		// NOTE: Security object may be needed in other part of the script, skip set to Nothing
		// 
		// Security = null;
		// 
		// Create form object

		$objForm = new cFormObj();
		$this->CurrentAction = (@$_GET["a"] <> "") ? $_GET["a"] : @$_POST["a_list"]; // Set up current action
		$this->id->SetVisibility();
		$this->id->Visible = !$this->IsAdd() && !$this->IsCopy() && !$this->IsGridAdd();
		$this->producto->SetVisibility();
		$this->marca_id->SetVisibility();
		$this->rubro_id->SetVisibility();
		$this->moneda_id->SetVisibility();
		$this->descripcion->SetVisibility();
		$this->foto->SetVisibility();
		$this->precio->SetVisibility();
		$this->stock->SetVisibility();
		$this->destacado->SetVisibility();
		$this->visitas->SetVisibility();
		$this->activo->SetVisibility();

		// Global Page Loading event (in userfn*.php)
		Page_Loading();

		// Page Load event
		$this->Page_Load();

		// Check token
		if (!$this->ValidPost()) {
			echo $Language->Phrase("InvalidPostRequest");
			$this->Page_Terminate();
			exit();
		}

		// Create Token
		$this->CreateToken();
	}

	//
	// Page_Terminate
	//
	function Page_Terminate($url = "") {
		global $gsExportFile, $gTmpImages;

		// Page Unload event
		$this->Page_Unload();

		// Global Page Unloaded event (in userfn*.php)
		Page_Unloaded();

		// Export
		global $EW_EXPORT, $productos;
		if ($this->CustomExport <> "" && $this->CustomExport == $this->Export && array_key_exists($this->CustomExport, $EW_EXPORT)) {
				$sContent = ob_get_contents();
			if ($gsExportFile == "") $gsExportFile = $this->TableVar;
			$class = $EW_EXPORT[$this->CustomExport];
			if (class_exists($class)) {
				$doc = new $class($productos);
				$doc->Text = $sContent;
				if ($this->Export == "email")
					echo $this->ExportEmail($doc->Text);
				else
					$doc->Export();
				ew_DeleteTmpImages(); // Delete temp images
				exit();
			}
		}
		$this->Page_Redirecting($url);

		// Close connection
		ew_CloseConn();

		// Go to URL if specified
		if ($url <> "") {
			if (!EW_DEBUG_ENABLED && ob_get_length())
				ob_end_clean();

			// Handle modal response
			if ($this->IsModal) { // Show as modal
				$row = array("url" => $url, "modal" => "1");
				$pageName = ew_GetPageName($url);
				if ($pageName != $this->GetListUrl()) { // Not List page
					$row["caption"] = $this->GetModalCaption($pageName);
					if ($pageName == "productosview.php")
						$row["view"] = "1";
				} else { // List page should not be shown as modal => error
					$row["error"] = $this->getFailureMessage();
				}
				echo ew_ArrayToJson(array($row));
			} else {
				ew_SaveDebugMsg();
				header("Location: " . $url);
			}
		}
		exit();
	}
	var $FormClassName = "form-horizontal ewForm ewSearchForm";
	var $IsModal = FALSE;
	var $IsMobileOrModal = FALSE;

	//
	// Page main
	//
	function Page_Main() {
		global $objForm, $Language, $gsSearchError;
		global $gbSkipHeaderFooter;

		// Set up Breadcrumb
		$this->SetupBreadcrumb();

		// Check modal
		if ($this->IsModal)
			$gbSkipHeaderFooter = TRUE;
		$this->IsMobileOrModal = ew_IsMobile() || $this->IsModal;
		if ($this->IsPageRequest()) { // Validate request

			// Get action
			$this->CurrentAction = $objForm->GetValue("a_search");
			switch ($this->CurrentAction) {
				case "S": // Get search criteria

					// Build search string for advanced search, remove blank field
					$this->LoadSearchValues(); // Get search values
					if ($this->ValidateSearch()) {
						$sSrchStr = $this->BuildAdvancedSearch();
					} else {
						$sSrchStr = "";
						$this->setFailureMessage($gsSearchError);
					}
					if ($sSrchStr <> "") {
						$sSrchStr = $this->UrlParm($sSrchStr);
						$sSrchStr = "productoslist.php" . "?" . $sSrchStr;
						$this->Page_Terminate($sSrchStr); // Go to list page
					}
			}
		}

		// Restore search settings from Session
		if ($gsSearchError == "")
			$this->LoadAdvancedSearch();

		// Render row for search
		$this->RowType = EW_ROWTYPE_SEARCH;
		$this->ResetAttrs();
		$this->RenderRow();
	}

	// Build advanced search
	function BuildAdvancedSearch() {
		$sSrchUrl = "";
		$this->BuildSearchUrl($sSrchUrl, $this->id); // id
		$this->BuildSearchUrl($sSrchUrl, $this->producto); // producto
		$this->BuildSearchUrl($sSrchUrl, $this->marca_id); // marca_id
		$this->BuildSearchUrl($sSrchUrl, $this->rubro_id); // rubro_id
		$this->BuildSearchUrl($sSrchUrl, $this->moneda_id); // moneda_id
		$this->BuildSearchUrl($sSrchUrl, $this->descripcion); // descripcion
		$this->BuildSearchUrl($sSrchUrl, $this->foto); // foto
		$this->BuildSearchUrl($sSrchUrl, $this->precio); // precio
		$this->BuildSearchUrl($sSrchUrl, $this->stock); // stock
		$this->BuildSearchUrl($sSrchUrl, $this->destacado); // destacado
		$this->BuildSearchUrl($sSrchUrl, $this->visitas); // visitas
		$this->BuildSearchUrl($sSrchUrl, $this->activo); // activo
		if ($sSrchUrl <> "") $sSrchUrl .= "&";
		$sSrchUrl .= "cmd=search";
		return $sSrchUrl;
	}

	// Build search URL
	function BuildSearchUrl(&$Url, &$Fld, $OprOnly=FALSE) {
		global $objForm;
		$sWrk = "";
		$FldParm = $Fld->FldParm();
		$FldVal = $objForm->GetValue("x_$FldParm");
		$FldOpr = $objForm->GetValue("z_$FldParm");
		$FldCond = $objForm->GetValue("v_$FldParm");
		$FldVal2 = $objForm->GetValue("y_$FldParm");
		$FldOpr2 = $objForm->GetValue("w_$FldParm");
		$FldVal = $FldVal;
		if (is_array($FldVal)) $FldVal = implode(",", $FldVal);
		$FldVal2 = $FldVal2;
		if (is_array($FldVal2)) $FldVal2 = implode(",", $FldVal2);
		$FldOpr = strtoupper(trim($FldOpr));
		$lFldDataType = ($Fld->FldIsVirtual) ? EW_DATATYPE_STRING : $Fld->FldDataType;
		if ($FldOpr == "BETWEEN") {
			$IsValidValue = ($lFldDataType <> EW_DATATYPE_NUMBER) ||
				($lFldDataType == EW_DATATYPE_NUMBER && $this->SearchValueIsNumeric($Fld, $FldVal) && $this->SearchValueIsNumeric($Fld, $FldVal2));
			if ($FldVal <> "" && $FldVal2 <> "" && $IsValidValue) {
				$sWrk = "x_" . $FldParm . "=" . urlencode($FldVal) .
					"&y_" . $FldParm . "=" . urlencode($FldVal2) .
					"&z_" . $FldParm . "=" . urlencode($FldOpr);
			}
		} else {
			$IsValidValue = ($lFldDataType <> EW_DATATYPE_NUMBER) ||
				($lFldDataType == EW_DATATYPE_NUMBER && $this->SearchValueIsNumeric($Fld, $FldVal));
			if ($FldVal <> "" && $IsValidValue && ew_IsValidOpr($FldOpr, $lFldDataType)) {
				$sWrk = "x_" . $FldParm . "=" . urlencode($FldVal) .
					"&z_" . $FldParm . "=" . urlencode($FldOpr);
			} elseif ($FldOpr == "IS NULL" || $FldOpr == "IS NOT NULL" || ($FldOpr <> "" && $OprOnly && ew_IsValidOpr($FldOpr, $lFldDataType))) {
				$sWrk = "z_" . $FldParm . "=" . urlencode($FldOpr);
			}
			$IsValidValue = ($lFldDataType <> EW_DATATYPE_NUMBER) ||
				($lFldDataType == EW_DATATYPE_NUMBER && $this->SearchValueIsNumeric($Fld, $FldVal2));
			if ($FldVal2 <> "" && $IsValidValue && ew_IsValidOpr($FldOpr2, $lFldDataType)) {
				if ($sWrk <> "") $sWrk .= "&v_" . $FldParm . "=" . urlencode($FldCond) . "&";
				$sWrk .= "y_" . $FldParm . "=" . urlencode($FldVal2) .
					"&w_" . $FldParm . "=" . urlencode($FldOpr2);
			} elseif ($FldOpr2 == "IS NULL" || $FldOpr2 == "IS NOT NULL" || ($FldOpr2 <> "" && $OprOnly && ew_IsValidOpr($FldOpr2, $lFldDataType))) {
				if ($sWrk <> "") $sWrk .= "&v_" . $FldParm . "=" . urlencode($FldCond) . "&";
				$sWrk .= "w_" . $FldParm . "=" . urlencode($FldOpr2);
			}
		}
		if ($sWrk <> "") {
			if ($Url <> "") $Url .= "&";
			$Url .= $sWrk;
		}
	}

	function SearchValueIsNumeric($Fld, $Value) {
		if (ew_IsFloatFormat($Fld->FldType)) $Value = ew_StrToFloat($Value);
		return is_numeric($Value);
	}

	// Load search values for validation
	function LoadSearchValues() {
		global $objForm;

		// Load search values
		// id

		$this->id->AdvancedSearch->SearchValue = $objForm->GetValue("x_id");
		$this->id->AdvancedSearch->SearchOperator = $objForm->GetValue("z_id");

		// producto
		$this->producto->AdvancedSearch->SearchValue = $objForm->GetValue("x_producto");
		$this->producto->AdvancedSearch->SearchOperator = $objForm->GetValue("z_producto");

		// marca_id
		$this->marca_id->AdvancedSearch->SearchValue = $objForm->GetValue("x_marca_id");
		$this->marca_id->AdvancedSearch->SearchOperator = $objForm->GetValue("z_marca_id");

		// rubro_id
		$this->rubro_id->AdvancedSearch->SearchValue = $objForm->GetValue("x_rubro_id");
		$this->rubro_id->AdvancedSearch->SearchOperator = $objForm->GetValue("z_rubro_id");

		// moneda_id
		$this->moneda_id->AdvancedSearch->SearchValue = $objForm->GetValue("x_moneda_id");
		$this->moneda_id->AdvancedSearch->SearchOperator = $objForm->GetValue("z_moneda_id");

		// descripcion
		$this->descripcion->AdvancedSearch->SearchValue = $objForm->GetValue("x_descripcion");
		$this->descripcion->AdvancedSearch->SearchOperator = $objForm->GetValue("z_descripcion");

		// foto
		$this->foto->AdvancedSearch->SearchValue = $objForm->GetValue("x_foto");
		$this->foto->AdvancedSearch->SearchOperator = $objForm->GetValue("z_foto");

		// precio
		$this->precio->AdvancedSearch->SearchValue = $objForm->GetValue("x_precio");
		$this->precio->AdvancedSearch->SearchOperator = $objForm->GetValue("z_precio");

		// stock
		$this->stock->AdvancedSearch->SearchValue = $objForm->GetValue("x_stock");
		$this->stock->AdvancedSearch->SearchOperator = $objForm->GetValue("z_stock");

		// destacado
		$this->destacado->AdvancedSearch->SearchValue = $objForm->GetValue("x_destacado");
		$this->destacado->AdvancedSearch->SearchOperator = $objForm->GetValue("z_destacado");

		// visitas
		$this->visitas->AdvancedSearch->SearchValue = $objForm->GetValue("x_visitas");
		$this->visitas->AdvancedSearch->SearchOperator = $objForm->GetValue("z_visitas");

		// activo
		$this->activo->AdvancedSearch->SearchValue = $objForm->GetValue("x_activo");
		$this->activo->AdvancedSearch->SearchOperator = $objForm->GetValue("z_activo");
	}

	// Render row values based on field settings
	function RenderRow() {
		global $Security, $Language, $gsLanguage;

		// Initialize URLs
		// Convert decimal values if posted back

		if ($this->precio->FormValue == $this->precio->CurrentValue && is_numeric(ew_StrToFloat($this->precio->CurrentValue)))
			$this->precio->CurrentValue = ew_StrToFloat($this->precio->CurrentValue);

		// Call Row_Rendering event
		$this->Row_Rendering();

		// Common render codes for all row types
		// id
		// producto
		// marca_id
		// rubro_id
		// moneda_id
		// descripcion
		// foto
		// precio
		// stock
		// destacado
		// visitas
		// activo

		if ($this->RowType == EW_ROWTYPE_VIEW) { // View row

		// id
		$this->id->ViewValue = $this->id->CurrentValue;
		$this->id->ViewCustomAttributes = "";

		// producto
		$this->producto->ViewValue = $this->producto->CurrentValue;
		$this->producto->ViewCustomAttributes = "";

		// marca_id
		if (strval($this->marca_id->CurrentValue) <> "") {
			$sFilterWrk = "`id`" . ew_SearchString("=", $this->marca_id->CurrentValue, EW_DATATYPE_NUMBER, "");
		$sSqlWrk = "SELECT `id`, `marca` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld` FROM `cfgmarcas`";
		$sWhereWrk = "";
		$this->marca_id->LookupFilters = array();
		ew_AddFilter($sWhereWrk, $sFilterWrk);
		$this->Lookup_Selecting($this->marca_id, $sWhereWrk); // Call Lookup Selecting
		if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
		$sSqlWrk .= " ORDER BY `marca` ASC";
			$rswrk = Conn()->Execute($sSqlWrk);
			if ($rswrk && !$rswrk->EOF) { // Lookup values found
				$arwrk = array();
				$arwrk[1] = $rswrk->fields('DispFld');
				$this->marca_id->ViewValue = $this->marca_id->DisplayValue($arwrk);
				$rswrk->Close();
			} else {
				$this->marca_id->ViewValue = $this->marca_id->CurrentValue;
			}
		} else {
			$this->marca_id->ViewValue = NULL;
		}
		$this->marca_id->ViewCustomAttributes = "";

		// rubro_id
		if (strval($this->rubro_id->CurrentValue) <> "") {
			$sFilterWrk = "`id`" . ew_SearchString("=", $this->rubro_id->CurrentValue, EW_DATATYPE_NUMBER, "");
		$sSqlWrk = "SELECT `id`, `rubro` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld` FROM `cfgrubros`";
		$sWhereWrk = "";
		$this->rubro_id->LookupFilters = array();
		ew_AddFilter($sWhereWrk, $sFilterWrk);
		$this->Lookup_Selecting($this->rubro_id, $sWhereWrk); // Call Lookup Selecting
		if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
		$sSqlWrk .= " ORDER BY `rubro` ASC";
			$rswrk = Conn()->Execute($sSqlWrk);
			if ($rswrk && !$rswrk->EOF) { // Lookup values found
				$arwrk = array();
				$arwrk[1] = $rswrk->fields('DispFld');
				$this->rubro_id->ViewValue = $this->rubro_id->DisplayValue($arwrk);
				$rswrk->Close();
			} else {
				$this->rubro_id->ViewValue = $this->rubro_id->CurrentValue;
			}
		} else {
			$this->rubro_id->ViewValue = NULL;
		}
		$this->rubro_id->ViewCustomAttributes = "";

		// moneda_id
		if (strval($this->moneda_id->CurrentValue) <> "") {
			$sFilterWrk = "`id`" . ew_SearchString("=", $this->moneda_id->CurrentValue, EW_DATATYPE_NUMBER, "");
		$sSqlWrk = "SELECT `id`, `moneda` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld` FROM `cfgmonedas`";
		$sWhereWrk = "";
		$this->moneda_id->LookupFilters = array();
		ew_AddFilter($sWhereWrk, $sFilterWrk);
		$this->Lookup_Selecting($this->moneda_id, $sWhereWrk); // Call Lookup Selecting
		if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
		$sSqlWrk .= " ORDER BY `id` ASC";
			$rswrk = Conn()->Execute($sSqlWrk);
			if ($rswrk && !$rswrk->EOF) { // Lookup values found
				$arwrk = array();
				$arwrk[1] = $rswrk->fields('DispFld');
				$this->moneda_id->ViewValue = $this->moneda_id->DisplayValue($arwrk);
				$rswrk->Close();
			} else {
				$this->moneda_id->ViewValue = $this->moneda_id->CurrentValue;
			}
		} else {
			$this->moneda_id->ViewValue = NULL;
		}
		$this->moneda_id->ViewCustomAttributes = "";

		// descripcion
		$this->descripcion->ViewValue = $this->descripcion->CurrentValue;
		$this->descripcion->ViewCustomAttributes = "";

		// foto
		$this->foto->UploadPath = "../public/images/productos/";
		if (!ew_Empty($this->foto->Upload->DbValue)) {
			$this->foto->ViewValue = $this->foto->Upload->DbValue;
		} else {
			$this->foto->ViewValue = "";
		}
		$this->foto->ViewCustomAttributes = "";

		// precio
		$this->precio->ViewValue = $this->precio->CurrentValue;
		$this->precio->ViewCustomAttributes = "";

		// stock
		$this->stock->ViewValue = $this->stock->CurrentValue;
		$this->stock->ViewCustomAttributes = "";

		// destacado
		if (strval($this->destacado->CurrentValue) <> "") {
			$this->destacado->ViewValue = $this->destacado->OptionCaption($this->destacado->CurrentValue);
		} else {
			$this->destacado->ViewValue = NULL;
		}
		$this->destacado->ViewCustomAttributes = "";

		// visitas
		$this->visitas->ViewValue = $this->visitas->CurrentValue;
		$this->visitas->ViewCustomAttributes = "";

		// activo
		if (strval($this->activo->CurrentValue) <> "") {
			$this->activo->ViewValue = $this->activo->OptionCaption($this->activo->CurrentValue);
		} else {
			$this->activo->ViewValue = NULL;
		}
		$this->activo->ViewCustomAttributes = "";

			// id
			$this->id->LinkCustomAttributes = "";
			$this->id->HrefValue = "";
			$this->id->TooltipValue = "";

			// producto
			$this->producto->LinkCustomAttributes = "";
			$this->producto->HrefValue = "";
			$this->producto->TooltipValue = "";

			// marca_id
			$this->marca_id->LinkCustomAttributes = "";
			$this->marca_id->HrefValue = "";
			$this->marca_id->TooltipValue = "";

			// rubro_id
			$this->rubro_id->LinkCustomAttributes = "";
			$this->rubro_id->HrefValue = "";
			$this->rubro_id->TooltipValue = "";

			// moneda_id
			$this->moneda_id->LinkCustomAttributes = "";
			$this->moneda_id->HrefValue = "";
			$this->moneda_id->TooltipValue = "";

			// descripcion
			$this->descripcion->LinkCustomAttributes = "";
			$this->descripcion->HrefValue = "";
			$this->descripcion->TooltipValue = "";

			// foto
			$this->foto->LinkCustomAttributes = "";
			$this->foto->HrefValue = "";
			$this->foto->HrefValue2 = $this->foto->UploadPath . $this->foto->Upload->DbValue;
			$this->foto->TooltipValue = "";

			// precio
			$this->precio->LinkCustomAttributes = "";
			$this->precio->HrefValue = "";
			$this->precio->TooltipValue = "";

			// stock
			$this->stock->LinkCustomAttributes = "";
			$this->stock->HrefValue = "";
			$this->stock->TooltipValue = "";

			// destacado
			$this->destacado->LinkCustomAttributes = "";
			$this->destacado->HrefValue = "";
			$this->destacado->TooltipValue = "";

			// visitas
			$this->visitas->LinkCustomAttributes = "";
			$this->visitas->HrefValue = "";
			$this->visitas->TooltipValue = "";

			// activo
			$this->activo->LinkCustomAttributes = "";
			$this->activo->HrefValue = "";
			$this->activo->TooltipValue = "";
		} elseif ($this->RowType == EW_ROWTYPE_SEARCH) { // Search row

			// id
			$this->id->EditAttrs["class"] = "form-control";
			$this->id->EditCustomAttributes = "";
			$this->id->EditValue = ew_HtmlEncode($this->id->AdvancedSearch->SearchValue);
			$this->id->PlaceHolder = ew_RemoveHtml($this->id->FldCaption());

			// producto
			$this->producto->EditAttrs["class"] = "form-control";
			$this->producto->EditCustomAttributes = "";
			$this->producto->EditValue = ew_HtmlEncode($this->producto->AdvancedSearch->SearchValue);
			$this->producto->PlaceHolder = ew_RemoveHtml($this->producto->FldCaption());

			// marca_id
			$this->marca_id->EditCustomAttributes = "";
			if (trim(strval($this->marca_id->AdvancedSearch->SearchValue)) == "") {
				$sFilterWrk = "0=1";
			} else {
				$sFilterWrk = "`id`" . ew_SearchString("=", $this->marca_id->AdvancedSearch->SearchValue, EW_DATATYPE_NUMBER, "");
			}
			$sSqlWrk = "SELECT `id`, `marca` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld`, '' AS `SelectFilterFld`, '' AS `SelectFilterFld2`, '' AS `SelectFilterFld3`, '' AS `SelectFilterFld4` FROM `cfgmarcas`";
			$sWhereWrk = "";
			$this->marca_id->LookupFilters = array();
			ew_AddFilter($sWhereWrk, $sFilterWrk);
			$this->Lookup_Selecting($this->marca_id, $sWhereWrk); // Call Lookup Selecting
			if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
			$sSqlWrk .= " ORDER BY `marca` ASC";
			$rswrk = Conn()->Execute($sSqlWrk);
			if ($rswrk && !$rswrk->EOF) { // Lookup values found
				$arwrk = array();
				$arwrk[1] = ew_HtmlEncode($rswrk->fields('DispFld'));
				$this->marca_id->AdvancedSearch->ViewValue = $this->marca_id->DisplayValue($arwrk);
			} else {
				$this->marca_id->AdvancedSearch->ViewValue = $Language->Phrase("PleaseSelect");
			}
			$arwrk = ($rswrk) ? $rswrk->GetRows() : array();
			if ($rswrk) $rswrk->Close();
			$this->marca_id->EditValue = $arwrk;

			// rubro_id
			$this->rubro_id->EditCustomAttributes = "";
			if (trim(strval($this->rubro_id->AdvancedSearch->SearchValue)) == "") {
				$sFilterWrk = "0=1";
			} else {
				$sFilterWrk = "`id`" . ew_SearchString("=", $this->rubro_id->AdvancedSearch->SearchValue, EW_DATATYPE_NUMBER, "");
			}
			$sSqlWrk = "SELECT `id`, `rubro` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld`, '' AS `SelectFilterFld`, '' AS `SelectFilterFld2`, '' AS `SelectFilterFld3`, '' AS `SelectFilterFld4` FROM `cfgrubros`";
			$sWhereWrk = "";
			$this->rubro_id->LookupFilters = array();
			ew_AddFilter($sWhereWrk, $sFilterWrk);
			$this->Lookup_Selecting($this->rubro_id, $sWhereWrk); // Call Lookup Selecting
			if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
			$sSqlWrk .= " ORDER BY `rubro` ASC";
			$rswrk = Conn()->Execute($sSqlWrk);
			if ($rswrk && !$rswrk->EOF) { // Lookup values found
				$arwrk = array();
				$arwrk[1] = ew_HtmlEncode($rswrk->fields('DispFld'));
				$this->rubro_id->AdvancedSearch->ViewValue = $this->rubro_id->DisplayValue($arwrk);
			} else {
				$this->rubro_id->AdvancedSearch->ViewValue = $Language->Phrase("PleaseSelect");
			}
			$arwrk = ($rswrk) ? $rswrk->GetRows() : array();
			if ($rswrk) $rswrk->Close();
			$this->rubro_id->EditValue = $arwrk;

			// moneda_id
			$this->moneda_id->EditCustomAttributes = "";
			if (trim(strval($this->moneda_id->AdvancedSearch->SearchValue)) == "") {
				$sFilterWrk = "0=1";
			} else {
				$sFilterWrk = "`id`" . ew_SearchString("=", $this->moneda_id->AdvancedSearch->SearchValue, EW_DATATYPE_NUMBER, "");
			}
			$sSqlWrk = "SELECT `id`, `moneda` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld`, '' AS `SelectFilterFld`, '' AS `SelectFilterFld2`, '' AS `SelectFilterFld3`, '' AS `SelectFilterFld4` FROM `cfgmonedas`";
			$sWhereWrk = "";
			$this->moneda_id->LookupFilters = array();
			ew_AddFilter($sWhereWrk, $sFilterWrk);
			$this->Lookup_Selecting($this->moneda_id, $sWhereWrk); // Call Lookup Selecting
			if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
			$sSqlWrk .= " ORDER BY `id` ASC";
			$rswrk = Conn()->Execute($sSqlWrk);
			if ($rswrk && !$rswrk->EOF) { // Lookup values found
				$arwrk = array();
				$arwrk[1] = ew_HtmlEncode($rswrk->fields('DispFld'));
				$this->moneda_id->AdvancedSearch->ViewValue = $this->moneda_id->DisplayValue($arwrk);
			} else {
				$this->moneda_id->AdvancedSearch->ViewValue = $Language->Phrase("PleaseSelect");
			}
			$arwrk = ($rswrk) ? $rswrk->GetRows() : array();
			if ($rswrk) $rswrk->Close();
			$this->moneda_id->EditValue = $arwrk;

			// descripcion
			$this->descripcion->EditAttrs["class"] = "form-control";
			$this->descripcion->EditCustomAttributes = "";
			$this->descripcion->EditValue = ew_HtmlEncode($this->descripcion->AdvancedSearch->SearchValue);
			$this->descripcion->PlaceHolder = ew_RemoveHtml($this->descripcion->FldCaption());

			// foto
			$this->foto->EditAttrs["class"] = "form-control";
			$this->foto->EditCustomAttributes = "";
			$this->foto->EditValue = ew_HtmlEncode($this->foto->AdvancedSearch->SearchValue);
			$this->foto->PlaceHolder = ew_RemoveHtml($this->foto->FldCaption());

			// precio
			$this->precio->EditAttrs["class"] = "form-control";
			$this->precio->EditCustomAttributes = "";
			$this->precio->EditValue = ew_HtmlEncode($this->precio->AdvancedSearch->SearchValue);
			$this->precio->PlaceHolder = ew_RemoveHtml($this->precio->FldCaption());

			// stock
			$this->stock->EditAttrs["class"] = "form-control";
			$this->stock->EditCustomAttributes = "";
			$this->stock->EditValue = ew_HtmlEncode($this->stock->AdvancedSearch->SearchValue);
			$this->stock->PlaceHolder = ew_RemoveHtml($this->stock->FldCaption());

			// destacado
			$this->destacado->EditAttrs["class"] = "form-control";
			$this->destacado->EditCustomAttributes = "";
			$this->destacado->EditValue = $this->destacado->Options(TRUE);

			// visitas
			$this->visitas->EditAttrs["class"] = "form-control";
			$this->visitas->EditCustomAttributes = "";
			$this->visitas->EditValue = ew_HtmlEncode($this->visitas->AdvancedSearch->SearchValue);
			$this->visitas->PlaceHolder = ew_RemoveHtml($this->visitas->FldCaption());

			// activo
			$this->activo->EditAttrs["class"] = "form-control";
			$this->activo->EditCustomAttributes = "";
			$this->activo->EditValue = $this->activo->Options(TRUE);
		}
		if ($this->RowType == EW_ROWTYPE_ADD || $this->RowType == EW_ROWTYPE_EDIT || $this->RowType == EW_ROWTYPE_SEARCH) // Add/Edit/Search row
			$this->SetupFieldTitles();

		// Call Row Rendered event
		if ($this->RowType <> EW_ROWTYPE_AGGREGATEINIT)
			$this->Row_Rendered();
	}

	// Validate search
	function ValidateSearch() {
		global $gsSearchError;

		// Initialize
		$gsSearchError = "";

		// Check if validation required
		if (!EW_SERVER_VALIDATE)
			return TRUE;
		if (!ew_CheckInteger($this->id->AdvancedSearch->SearchValue)) {
			ew_AddMessage($gsSearchError, $this->id->FldErrMsg());
		}
		if (!ew_CheckNumber($this->precio->AdvancedSearch->SearchValue)) {
			ew_AddMessage($gsSearchError, $this->precio->FldErrMsg());
		}
		if (!ew_CheckInteger($this->stock->AdvancedSearch->SearchValue)) {
			ew_AddMessage($gsSearchError, $this->stock->FldErrMsg());
		}
		if (!ew_CheckInteger($this->visitas->AdvancedSearch->SearchValue)) {
			ew_AddMessage($gsSearchError, $this->visitas->FldErrMsg());
		}

		// Return validate result
		$ValidateSearch = ($gsSearchError == "");

		// Call Form_CustomValidate event
		$sFormCustomError = "";
		$ValidateSearch = $ValidateSearch && $this->Form_CustomValidate($sFormCustomError);
		if ($sFormCustomError <> "") {
			ew_AddMessage($gsSearchError, $sFormCustomError);
		}
		return $ValidateSearch;
	}

	// Load advanced search
	function LoadAdvancedSearch() {
		$this->id->AdvancedSearch->Load();
		$this->producto->AdvancedSearch->Load();
		$this->marca_id->AdvancedSearch->Load();
		$this->rubro_id->AdvancedSearch->Load();
		$this->moneda_id->AdvancedSearch->Load();
		$this->descripcion->AdvancedSearch->Load();
		$this->foto->AdvancedSearch->Load();
		$this->precio->AdvancedSearch->Load();
		$this->stock->AdvancedSearch->Load();
		$this->destacado->AdvancedSearch->Load();
		$this->visitas->AdvancedSearch->Load();
		$this->activo->AdvancedSearch->Load();
	}

	// Set up Breadcrumb
	function SetupBreadcrumb() {
		global $Breadcrumb, $Language;
		$Breadcrumb = new cBreadcrumb();
		$url = substr(ew_CurrentUrl(), strrpos(ew_CurrentUrl(), "/")+1);
		$Breadcrumb->Add("list", $this->TableVar, $this->AddMasterUrl("productoslist.php"), "", $this->TableVar, TRUE);
		$PageId = "search";
		$Breadcrumb->Add("search", $PageId, $url);
	}

	// Setup lookup filters of a field
	function SetupLookupFilters($fld, $pageId = null) {
		global $gsLanguage;
		$pageId = $pageId ?: $this->PageID;
		switch ($fld->FldVar) {
		case "x_marca_id":
			$sSqlWrk = "";
			$sSqlWrk = "SELECT `id` AS `LinkFld`, `marca` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld` FROM `cfgmarcas`";
			$sWhereWrk = "";
			$this->marca_id->LookupFilters = array();
			$fld->LookupFilters += array("s" => $sSqlWrk, "d" => "", "f0" => '`id` IN ({filter_value})', "t0" => "3", "fn0" => "");
			$sSqlWrk = "";
			$this->Lookup_Selecting($this->marca_id, $sWhereWrk); // Call Lookup Selecting
			if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
			$sSqlWrk .= " ORDER BY `marca` ASC";
			if ($sSqlWrk <> "")
				$fld->LookupFilters["s"] .= $sSqlWrk;
			break;
		case "x_rubro_id":
			$sSqlWrk = "";
			$sSqlWrk = "SELECT `id` AS `LinkFld`, `rubro` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld` FROM `cfgrubros`";
			$sWhereWrk = "";
			$this->rubro_id->LookupFilters = array();
			$fld->LookupFilters += array("s" => $sSqlWrk, "d" => "", "f0" => '`id` IN ({filter_value})', "t0" => "3", "fn0" => "");
			$sSqlWrk = "";
			$this->Lookup_Selecting($this->rubro_id, $sWhereWrk); // Call Lookup Selecting
			if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
			$sSqlWrk .= " ORDER BY `rubro` ASC";
			if ($sSqlWrk <> "")
				$fld->LookupFilters["s"] .= $sSqlWrk;
			break;
		case "x_moneda_id":
			$sSqlWrk = "";
			$sSqlWrk = "SELECT `id` AS `LinkFld`, `moneda` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld` FROM `cfgmonedas`";
			$sWhereWrk = "";
			$this->moneda_id->LookupFilters = array();
			$fld->LookupFilters += array("s" => $sSqlWrk, "d" => "", "f0" => '`id` IN ({filter_value})', "t0" => "3", "fn0" => "");
			$sSqlWrk = "";
			$this->Lookup_Selecting($this->moneda_id, $sWhereWrk); // Call Lookup Selecting
			if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
			$sSqlWrk .= " ORDER BY `id` ASC";
			if ($sSqlWrk <> "")
				$fld->LookupFilters["s"] .= $sSqlWrk;
			break;
		}
	}

	// Setup AutoSuggest filters of a field
	function SetupAutoSuggestFilters($fld, $pageId = null) {
		global $gsLanguage;
		$pageId = $pageId ?: $this->PageID;
		switch ($fld->FldVar) {
		}
	}

	// Page Load event
	function Page_Load() {

		//echo "Page Load";
	}

	// Page Unload event
	function Page_Unload() {

		//echo "Page Unload";
	}

	// Page Redirecting event
	function Page_Redirecting(&$url) {

		// Example:
		//$url = "your URL";

	}

	// Message Showing event
	// $type = ''|'success'|'failure'|'warning'
	function Message_Showing(&$msg, $type) {
		if ($type == 'success') {

			//$msg = "your success message";
		} elseif ($type == 'failure') {

			//$msg = "your failure message";
		} elseif ($type == 'warning') {

			//$msg = "your warning message";
		} else {

			//$msg = "your message";
		}
	}

	// Page Render event
	function Page_Render() {

		//echo "Page Render";
	}

	// Page Data Rendering event
	function Page_DataRendering(&$header) {

		// Example:
		//$header = "your header";

	}

	// Page Data Rendered event
	function Page_DataRendered(&$footer) {

		// Example:
		//$footer = "your footer";

	}

	// Form Custom Validate event
	function Form_CustomValidate(&$CustomError) {

		// Return error message in CustomError
		return TRUE;
	}
}
?>
<?php ew_Header(FALSE) ?>
<?php

// Create page object
if (!isset($productos_search)) $productos_search = new cproductos_search();

// Page init
$productos_search->Page_Init();

// Page main
$productos_search->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$productos_search->Page_Render();
?>
<?php include_once "header.php" ?>
<script type="text/javascript">

// Form object
var CurrentPageID = EW_PAGE_ID = "search";
<?php if ($productos_search->IsModal) { ?>
var CurrentAdvancedSearchForm = fproductossearch = new ew_Form("fproductossearch", "search");
<?php } else { ?>
var CurrentForm = fproductossearch = new ew_Form("fproductossearch", "search");
<?php } ?>

// Form_CustomValidate event
fproductossearch.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fproductossearch.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
fproductossearch.Lists["x_marca_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_marca","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgmarcas"};
fproductossearch.Lists["x_marca_id"].Data = "<?php echo $productos_search->marca_id->LookupFilterQuery(FALSE, "search") ?>";
fproductossearch.Lists["x_rubro_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_rubro","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgrubros"};
fproductossearch.Lists["x_rubro_id"].Data = "<?php echo $productos_search->rubro_id->LookupFilterQuery(FALSE, "search") ?>";
fproductossearch.Lists["x_moneda_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_moneda","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgmonedas"};
fproductossearch.Lists["x_moneda_id"].Data = "<?php echo $productos_search->moneda_id->LookupFilterQuery(FALSE, "search") ?>";
fproductossearch.Lists["x_destacado"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductossearch.Lists["x_destacado"].Options = <?php echo json_encode($productos_search->destacado->Options()) ?>;
fproductossearch.Lists["x_activo"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductossearch.Lists["x_activo"].Options = <?php echo json_encode($productos_search->activo->Options()) ?>;

// Form object for search
// Validate function for search

fproductossearch.Validate = function(fobj) {
	if (!this.ValidateRequired)
		return true; // Ignore validation
	fobj = fobj || this.Form;
	var infix = "";
	elm = this.GetElements("x" + infix + "_id");
	if (elm && !ew_CheckInteger(elm.value))
		return this.OnError(elm, "<?php echo ew_JsEncode2($productos->id->FldErrMsg()) ?>");
	elm = this.GetElements("x" + infix + "_precio");
	if (elm && !ew_CheckNumber(elm.value))
		return this.OnError(elm, "<?php echo ew_JsEncode2($productos->precio->FldErrMsg()) ?>");
	elm = this.GetElements("x" + infix + "_stock");
	if (elm && !ew_CheckInteger(elm.value))
		return this.OnError(elm, "<?php echo ew_JsEncode2($productos->stock->FldErrMsg()) ?>");
	elm = this.GetElements("x" + infix + "_visitas");
	if (elm && !ew_CheckInteger(elm.value))
		return this.OnError(elm, "<?php echo ew_JsEncode2($productos->visitas->FldErrMsg()) ?>");

	// Fire Form_CustomValidate event
	if (!this.Form_CustomValidate(fobj))
		return false;
	return true;
}
</script>
<script type="text/javascript">

// Write your client script here, no need to add script tags.
</script>
<?php $productos_search->ShowPageHeader(); ?>
<?php
$productos_search->ShowMessage();
?>
<form name="fproductossearch" id="fproductossearch" class="<?php echo $productos_search->FormClassName ?>" action="<?php echo ew_CurrentPage() ?>" method="post">
<?php if ($productos_search->CheckToken) { ?>
<input type="hidden" name="<?php echo EW_TOKEN_NAME ?>" value="<?php echo $productos_search->Token ?>">
<?php } ?>
<input type="hidden" name="t" value="productos">
<input type="hidden" name="a_search" id="a_search" value="S">
<input type="hidden" name="modal" value="<?php echo intval($productos_search->IsModal) ?>">
<div class="ewSearchDiv"><!-- page* -->
<?php if ($productos->id->Visible) { // id ?>
	<div id="r_id" class="form-group">
		<label for="x_id" class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_id"><?php echo $productos->id->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_id" id="z_id" value="="></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->id->CellAttributes() ?>>
			<span id="el_productos_id">
<input type="text" data-table="productos" data-field="x_id" name="x_id" id="x_id" placeholder="<?php echo ew_HtmlEncode($productos->id->getPlaceHolder()) ?>" value="<?php echo $productos->id->EditValue ?>"<?php echo $productos->id->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($productos->producto->Visible) { // producto ?>
	<div id="r_producto" class="form-group">
		<label for="x_producto" class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_producto"><?php echo $productos->producto->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_producto" id="z_producto" value="LIKE"></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->producto->CellAttributes() ?>>
			<span id="el_productos_producto">
<input type="text" data-table="productos" data-field="x_producto" name="x_producto" id="x_producto" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productos->producto->getPlaceHolder()) ?>" value="<?php echo $productos->producto->EditValue ?>"<?php echo $productos->producto->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($productos->marca_id->Visible) { // marca_id ?>
	<div id="r_marca_id" class="form-group">
		<label for="x_marca_id" class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_marca_id"><?php echo $productos->marca_id->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_marca_id" id="z_marca_id" value="="></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->marca_id->CellAttributes() ?>>
			<span id="el_productos_marca_id">
<div class="ewDropdownList has-feedback">
	<span onclick="" class="form-control dropdown-toggle" aria-expanded="false"<?php if ($productos->marca_id->ReadOnly) { ?> readonly<?php } else { ?>data-toggle="dropdown"<?php } ?>>
		<?php echo $productos->marca_id->AdvancedSearch->ViewValue ?>
	</span>
	<?php if (!$productos->marca_id->ReadOnly) { ?>
	<span class="glyphicon glyphicon-remove form-control-feedback ewDropdownListClear"></span>
	<span class="form-control-feedback"><span class="caret"></span></span>
	<?php } ?>
	<div id="dsl_x_marca_id" data-repeatcolumn="1" class="dropdown-menu">
		<div class="ewItems" style="position: relative; overflow-x: hidden;">
<?php echo $productos->marca_id->RadioButtonListHtml(TRUE, "x_marca_id") ?>
		</div>
	</div>
	<div id="tp_x_marca_id" class="ewTemplate"><input type="radio" data-table="productos" data-field="x_marca_id" data-value-separator="<?php echo $productos->marca_id->DisplayValueSeparatorAttribute() ?>" name="x_marca_id" id="x_marca_id" value="{value}"<?php echo $productos->marca_id->EditAttributes() ?>></div>
</div>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($productos->rubro_id->Visible) { // rubro_id ?>
	<div id="r_rubro_id" class="form-group">
		<label for="x_rubro_id" class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_rubro_id"><?php echo $productos->rubro_id->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_rubro_id" id="z_rubro_id" value="="></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->rubro_id->CellAttributes() ?>>
			<span id="el_productos_rubro_id">
<div class="ewDropdownList has-feedback">
	<span onclick="" class="form-control dropdown-toggle" aria-expanded="false"<?php if ($productos->rubro_id->ReadOnly) { ?> readonly<?php } else { ?>data-toggle="dropdown"<?php } ?>>
		<?php echo $productos->rubro_id->AdvancedSearch->ViewValue ?>
	</span>
	<?php if (!$productos->rubro_id->ReadOnly) { ?>
	<span class="glyphicon glyphicon-remove form-control-feedback ewDropdownListClear"></span>
	<span class="form-control-feedback"><span class="caret"></span></span>
	<?php } ?>
	<div id="dsl_x_rubro_id" data-repeatcolumn="1" class="dropdown-menu">
		<div class="ewItems" style="position: relative; overflow-x: hidden;">
<?php echo $productos->rubro_id->RadioButtonListHtml(TRUE, "x_rubro_id") ?>
		</div>
	</div>
	<div id="tp_x_rubro_id" class="ewTemplate"><input type="radio" data-table="productos" data-field="x_rubro_id" data-value-separator="<?php echo $productos->rubro_id->DisplayValueSeparatorAttribute() ?>" name="x_rubro_id" id="x_rubro_id" value="{value}"<?php echo $productos->rubro_id->EditAttributes() ?>></div>
</div>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($productos->moneda_id->Visible) { // moneda_id ?>
	<div id="r_moneda_id" class="form-group">
		<label for="x_moneda_id" class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_moneda_id"><?php echo $productos->moneda_id->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_moneda_id" id="z_moneda_id" value="="></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->moneda_id->CellAttributes() ?>>
			<span id="el_productos_moneda_id">
<div class="ewDropdownList has-feedback">
	<span onclick="" class="form-control dropdown-toggle" aria-expanded="false"<?php if ($productos->moneda_id->ReadOnly) { ?> readonly<?php } else { ?>data-toggle="dropdown"<?php } ?>>
		<?php echo $productos->moneda_id->AdvancedSearch->ViewValue ?>
	</span>
	<?php if (!$productos->moneda_id->ReadOnly) { ?>
	<span class="glyphicon glyphicon-remove form-control-feedback ewDropdownListClear"></span>
	<span class="form-control-feedback"><span class="caret"></span></span>
	<?php } ?>
	<div id="dsl_x_moneda_id" data-repeatcolumn="1" class="dropdown-menu">
		<div class="ewItems" style="position: relative; overflow-x: hidden;">
<?php echo $productos->moneda_id->RadioButtonListHtml(TRUE, "x_moneda_id") ?>
		</div>
	</div>
	<div id="tp_x_moneda_id" class="ewTemplate"><input type="radio" data-table="productos" data-field="x_moneda_id" data-value-separator="<?php echo $productos->moneda_id->DisplayValueSeparatorAttribute() ?>" name="x_moneda_id" id="x_moneda_id" value="{value}"<?php echo $productos->moneda_id->EditAttributes() ?>></div>
</div>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($productos->descripcion->Visible) { // descripcion ?>
	<div id="r_descripcion" class="form-group">
		<label for="x_descripcion" class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_descripcion"><?php echo $productos->descripcion->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_descripcion" id="z_descripcion" value="LIKE"></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->descripcion->CellAttributes() ?>>
			<span id="el_productos_descripcion">
<input type="text" data-table="productos" data-field="x_descripcion" name="x_descripcion" id="x_descripcion" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productos->descripcion->getPlaceHolder()) ?>" value="<?php echo $productos->descripcion->EditValue ?>"<?php echo $productos->descripcion->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($productos->foto->Visible) { // foto ?>
	<div id="r_foto" class="form-group">
		<label class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_foto"><?php echo $productos->foto->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_foto" id="z_foto" value="LIKE"></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->foto->CellAttributes() ?>>
			<span id="el_productos_foto">
<input type="text" data-table="productos" data-field="x_foto" name="x_foto" id="x_foto" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productos->foto->getPlaceHolder()) ?>" value="<?php echo $productos->foto->EditValue ?>"<?php echo $productos->foto->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($productos->precio->Visible) { // precio ?>
	<div id="r_precio" class="form-group">
		<label for="x_precio" class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_precio"><?php echo $productos->precio->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_precio" id="z_precio" value="="></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->precio->CellAttributes() ?>>
			<span id="el_productos_precio">
<input type="text" data-table="productos" data-field="x_precio" name="x_precio" id="x_precio" size="30" placeholder="<?php echo ew_HtmlEncode($productos->precio->getPlaceHolder()) ?>" value="<?php echo $productos->precio->EditValue ?>"<?php echo $productos->precio->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($productos->stock->Visible) { // stock ?>
	<div id="r_stock" class="form-group">
		<label for="x_stock" class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_stock"><?php echo $productos->stock->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_stock" id="z_stock" value="="></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->stock->CellAttributes() ?>>
			<span id="el_productos_stock">
<input type="text" data-table="productos" data-field="x_stock" name="x_stock" id="x_stock" size="30" placeholder="<?php echo ew_HtmlEncode($productos->stock->getPlaceHolder()) ?>" value="<?php echo $productos->stock->EditValue ?>"<?php echo $productos->stock->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($productos->destacado->Visible) { // destacado ?>
	<div id="r_destacado" class="form-group">
		<label for="x_destacado" class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_destacado"><?php echo $productos->destacado->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_destacado" id="z_destacado" value="="></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->destacado->CellAttributes() ?>>
			<span id="el_productos_destacado">
<select data-table="productos" data-field="x_destacado" data-value-separator="<?php echo $productos->destacado->DisplayValueSeparatorAttribute() ?>" id="x_destacado" name="x_destacado"<?php echo $productos->destacado->EditAttributes() ?>>
<?php echo $productos->destacado->SelectOptionListHtml("x_destacado") ?>
</select>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($productos->visitas->Visible) { // visitas ?>
	<div id="r_visitas" class="form-group">
		<label for="x_visitas" class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_visitas"><?php echo $productos->visitas->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_visitas" id="z_visitas" value="="></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->visitas->CellAttributes() ?>>
			<span id="el_productos_visitas">
<input type="text" data-table="productos" data-field="x_visitas" name="x_visitas" id="x_visitas" size="30" placeholder="<?php echo ew_HtmlEncode($productos->visitas->getPlaceHolder()) ?>" value="<?php echo $productos->visitas->EditValue ?>"<?php echo $productos->visitas->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($productos->activo->Visible) { // activo ?>
	<div id="r_activo" class="form-group">
		<label for="x_activo" class="<?php echo $productos_search->LeftColumnClass ?>"><span id="elh_productos_activo"><?php echo $productos->activo->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_activo" id="z_activo" value="="></p>
		</label>
		<div class="<?php echo $productos_search->RightColumnClass ?>"><div<?php echo $productos->activo->CellAttributes() ?>>
			<span id="el_productos_activo">
<select data-table="productos" data-field="x_activo" data-value-separator="<?php echo $productos->activo->DisplayValueSeparatorAttribute() ?>" id="x_activo" name="x_activo"<?php echo $productos->activo->EditAttributes() ?>>
<?php echo $productos->activo->SelectOptionListHtml("x_activo") ?>
</select>
</span>
		</div></div>
	</div>
<?php } ?>
</div><!-- /page* -->
<?php if (!$productos_search->IsModal) { ?>
<div class="form-group"><!-- buttons .form-group -->
	<div class="<?php echo $productos_search->OffsetColumnClass ?>"><!-- buttons offset -->
<button class="btn btn-primary ewButton" name="btnAction" id="btnAction" type="submit"><?php echo $Language->Phrase("Search") ?></button>
<button class="btn btn-default ewButton" name="btnReset" id="btnReset" type="button" onclick="ew_ClearForm(this.form);"><?php echo $Language->Phrase("Reset") ?></button>
	</div><!-- /buttons offset -->
</div><!-- /buttons .form-group -->
<?php } ?>
</form>
<script type="text/javascript">
fproductossearch.Init();
</script>
<?php
$productos_search->ShowPageFooter();
if (EW_DEBUG_ENABLED)
	echo ew_DebugMsg();
?>
<script type="text/javascript">

// Write your table-specific startup script here
// document.write("page loaded");

</script>
<?php include_once "footer.php" ?>
<?php
$productos_search->Page_Terminate();
?>
