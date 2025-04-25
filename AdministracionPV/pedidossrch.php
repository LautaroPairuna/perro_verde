<?php
if (session_id() == "") session_start(); // Init session data
ob_start(); // Turn on output buffering
?>
<?php include_once "ewcfg14.php" ?>
<?php include_once ((EW_USE_ADODB) ? "adodb5/adodb.inc.php" : "ewmysql14.php") ?>
<?php include_once "phpfn14.php" ?>
<?php include_once "pedidosinfo.php" ?>
<?php include_once "userfn14.php" ?>
<?php

//
// Page class
//

$pedidos_search = NULL; // Initialize page object first

class cpedidos_search extends cpedidos {

	// Page ID
	var $PageID = 'search';

	// Project ID
	var $ProjectID = '{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}';

	// Table name
	var $TableName = 'pedidos';

	// Page object name
	var $PageObjName = 'pedidos_search';

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

		// Table object (pedidos)
		if (!isset($GLOBALS["pedidos"]) || get_class($GLOBALS["pedidos"]) == "cpedidos") {
			$GLOBALS["pedidos"] = &$this;
			$GLOBALS["Table"] = &$GLOBALS["pedidos"];
		}

		// Page ID
		if (!defined("EW_PAGE_ID"))
			define("EW_PAGE_ID", 'search', TRUE);

		// Table name (for backward compatibility)
		if (!defined("EW_TABLE_NAME"))
			define("EW_TABLE_NAME", 'pedidos', TRUE);

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
				$this->Page_Terminate(ew_GetUrl("pedidoslist.php"));
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
		$this->datos->SetVisibility();
		$this->total->SetVisibility();
		$this->estado->SetVisibility();
		$this->metodo_pago->SetVisibility();
		$this->comprador_nombre->SetVisibility();
		$this->comprador_email->SetVisibility();
		$this->comprador_telefono->SetVisibility();
		$this->direccion_envio->SetVisibility();
		$this->mp_payment_id->SetVisibility();
		$this->tarjeta_last4->SetVisibility();
		$this->tarjeta_payment_method->SetVisibility();
		$this->transferencia_ref->SetVisibility();
		$this->mp_error_code->SetVisibility();
		$this->mp_error_message->SetVisibility();
		$this->mp_response->SetVisibility();
		$this->createdAt->SetVisibility();
		$this->updatedAt->SetVisibility();

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
		global $EW_EXPORT, $pedidos;
		if ($this->CustomExport <> "" && $this->CustomExport == $this->Export && array_key_exists($this->CustomExport, $EW_EXPORT)) {
				$sContent = ob_get_contents();
			if ($gsExportFile == "") $gsExportFile = $this->TableVar;
			$class = $EW_EXPORT[$this->CustomExport];
			if (class_exists($class)) {
				$doc = new $class($pedidos);
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
					if ($pageName == "pedidosview.php")
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
						$sSrchStr = "pedidoslist.php" . "?" . $sSrchStr;
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
		$this->BuildSearchUrl($sSrchUrl, $this->datos); // datos
		$this->BuildSearchUrl($sSrchUrl, $this->total); // total
		$this->BuildSearchUrl($sSrchUrl, $this->estado); // estado
		$this->BuildSearchUrl($sSrchUrl, $this->metodo_pago); // metodo_pago
		$this->BuildSearchUrl($sSrchUrl, $this->comprador_nombre); // comprador_nombre
		$this->BuildSearchUrl($sSrchUrl, $this->comprador_email); // comprador_email
		$this->BuildSearchUrl($sSrchUrl, $this->comprador_telefono); // comprador_telefono
		$this->BuildSearchUrl($sSrchUrl, $this->direccion_envio); // direccion_envio
		$this->BuildSearchUrl($sSrchUrl, $this->mp_payment_id); // mp_payment_id
		$this->BuildSearchUrl($sSrchUrl, $this->tarjeta_last4); // tarjeta_last4
		$this->BuildSearchUrl($sSrchUrl, $this->tarjeta_payment_method); // tarjeta_payment_method
		$this->BuildSearchUrl($sSrchUrl, $this->transferencia_ref); // transferencia_ref
		$this->BuildSearchUrl($sSrchUrl, $this->mp_error_code); // mp_error_code
		$this->BuildSearchUrl($sSrchUrl, $this->mp_error_message); // mp_error_message
		$this->BuildSearchUrl($sSrchUrl, $this->mp_response); // mp_response
		$this->BuildSearchUrl($sSrchUrl, $this->createdAt); // createdAt
		$this->BuildSearchUrl($sSrchUrl, $this->updatedAt); // updatedAt
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

		// datos
		$this->datos->AdvancedSearch->SearchValue = $objForm->GetValue("x_datos");
		$this->datos->AdvancedSearch->SearchOperator = $objForm->GetValue("z_datos");

		// total
		$this->total->AdvancedSearch->SearchValue = $objForm->GetValue("x_total");
		$this->total->AdvancedSearch->SearchOperator = $objForm->GetValue("z_total");

		// estado
		$this->estado->AdvancedSearch->SearchValue = $objForm->GetValue("x_estado");
		$this->estado->AdvancedSearch->SearchOperator = $objForm->GetValue("z_estado");

		// metodo_pago
		$this->metodo_pago->AdvancedSearch->SearchValue = $objForm->GetValue("x_metodo_pago");
		$this->metodo_pago->AdvancedSearch->SearchOperator = $objForm->GetValue("z_metodo_pago");

		// comprador_nombre
		$this->comprador_nombre->AdvancedSearch->SearchValue = $objForm->GetValue("x_comprador_nombre");
		$this->comprador_nombre->AdvancedSearch->SearchOperator = $objForm->GetValue("z_comprador_nombre");

		// comprador_email
		$this->comprador_email->AdvancedSearch->SearchValue = $objForm->GetValue("x_comprador_email");
		$this->comprador_email->AdvancedSearch->SearchOperator = $objForm->GetValue("z_comprador_email");

		// comprador_telefono
		$this->comprador_telefono->AdvancedSearch->SearchValue = $objForm->GetValue("x_comprador_telefono");
		$this->comprador_telefono->AdvancedSearch->SearchOperator = $objForm->GetValue("z_comprador_telefono");

		// direccion_envio
		$this->direccion_envio->AdvancedSearch->SearchValue = $objForm->GetValue("x_direccion_envio");
		$this->direccion_envio->AdvancedSearch->SearchOperator = $objForm->GetValue("z_direccion_envio");

		// mp_payment_id
		$this->mp_payment_id->AdvancedSearch->SearchValue = $objForm->GetValue("x_mp_payment_id");
		$this->mp_payment_id->AdvancedSearch->SearchOperator = $objForm->GetValue("z_mp_payment_id");

		// tarjeta_last4
		$this->tarjeta_last4->AdvancedSearch->SearchValue = $objForm->GetValue("x_tarjeta_last4");
		$this->tarjeta_last4->AdvancedSearch->SearchOperator = $objForm->GetValue("z_tarjeta_last4");

		// tarjeta_payment_method
		$this->tarjeta_payment_method->AdvancedSearch->SearchValue = $objForm->GetValue("x_tarjeta_payment_method");
		$this->tarjeta_payment_method->AdvancedSearch->SearchOperator = $objForm->GetValue("z_tarjeta_payment_method");

		// transferencia_ref
		$this->transferencia_ref->AdvancedSearch->SearchValue = $objForm->GetValue("x_transferencia_ref");
		$this->transferencia_ref->AdvancedSearch->SearchOperator = $objForm->GetValue("z_transferencia_ref");

		// mp_error_code
		$this->mp_error_code->AdvancedSearch->SearchValue = $objForm->GetValue("x_mp_error_code");
		$this->mp_error_code->AdvancedSearch->SearchOperator = $objForm->GetValue("z_mp_error_code");

		// mp_error_message
		$this->mp_error_message->AdvancedSearch->SearchValue = $objForm->GetValue("x_mp_error_message");
		$this->mp_error_message->AdvancedSearch->SearchOperator = $objForm->GetValue("z_mp_error_message");

		// mp_response
		$this->mp_response->AdvancedSearch->SearchValue = $objForm->GetValue("x_mp_response");
		$this->mp_response->AdvancedSearch->SearchOperator = $objForm->GetValue("z_mp_response");

		// createdAt
		$this->createdAt->AdvancedSearch->SearchValue = $objForm->GetValue("x_createdAt");
		$this->createdAt->AdvancedSearch->SearchOperator = $objForm->GetValue("z_createdAt");

		// updatedAt
		$this->updatedAt->AdvancedSearch->SearchValue = $objForm->GetValue("x_updatedAt");
		$this->updatedAt->AdvancedSearch->SearchOperator = $objForm->GetValue("z_updatedAt");
	}

	// Render row values based on field settings
	function RenderRow() {
		global $Security, $Language, $gsLanguage;

		// Initialize URLs
		// Convert decimal values if posted back

		if ($this->total->FormValue == $this->total->CurrentValue && is_numeric(ew_StrToFloat($this->total->CurrentValue)))
			$this->total->CurrentValue = ew_StrToFloat($this->total->CurrentValue);

		// Call Row_Rendering event
		$this->Row_Rendering();

		// Common render codes for all row types
		// id
		// datos
		// total
		// estado
		// metodo_pago
		// comprador_nombre
		// comprador_email
		// comprador_telefono
		// direccion_envio
		// mp_payment_id
		// tarjeta_last4
		// tarjeta_payment_method
		// transferencia_ref
		// mp_error_code
		// mp_error_message
		// mp_response
		// createdAt
		// updatedAt

		if ($this->RowType == EW_ROWTYPE_VIEW) { // View row

		// id
		$this->id->ViewValue = $this->id->CurrentValue;
		$this->id->ViewCustomAttributes = "";

		// datos
		$this->datos->ViewValue = $this->datos->CurrentValue;
		$this->datos->ViewCustomAttributes = "";

		// total
		$this->total->ViewValue = $this->total->CurrentValue;
		$this->total->ViewCustomAttributes = "";

		// estado
		$this->estado->ViewValue = $this->estado->CurrentValue;
		$this->estado->ViewCustomAttributes = "";

		// metodo_pago
		$this->metodo_pago->ViewValue = $this->metodo_pago->CurrentValue;
		$this->metodo_pago->ViewCustomAttributes = "";

		// comprador_nombre
		$this->comprador_nombre->ViewValue = $this->comprador_nombre->CurrentValue;
		$this->comprador_nombre->ViewCustomAttributes = "";

		// comprador_email
		$this->comprador_email->ViewValue = $this->comprador_email->CurrentValue;
		$this->comprador_email->ViewCustomAttributes = "";

		// comprador_telefono
		$this->comprador_telefono->ViewValue = $this->comprador_telefono->CurrentValue;
		$this->comprador_telefono->ViewCustomAttributes = "";

		// direccion_envio
		$this->direccion_envio->ViewValue = $this->direccion_envio->CurrentValue;
		$this->direccion_envio->ViewCustomAttributes = "";

		// mp_payment_id
		$this->mp_payment_id->ViewValue = $this->mp_payment_id->CurrentValue;
		$this->mp_payment_id->ViewCustomAttributes = "";

		// tarjeta_last4
		$this->tarjeta_last4->ViewValue = $this->tarjeta_last4->CurrentValue;
		$this->tarjeta_last4->ViewCustomAttributes = "";

		// tarjeta_payment_method
		$this->tarjeta_payment_method->ViewValue = $this->tarjeta_payment_method->CurrentValue;
		$this->tarjeta_payment_method->ViewCustomAttributes = "";

		// transferencia_ref
		$this->transferencia_ref->ViewValue = $this->transferencia_ref->CurrentValue;
		$this->transferencia_ref->ViewCustomAttributes = "";

		// mp_error_code
		$this->mp_error_code->ViewValue = $this->mp_error_code->CurrentValue;
		$this->mp_error_code->ViewCustomAttributes = "";

		// mp_error_message
		$this->mp_error_message->ViewValue = $this->mp_error_message->CurrentValue;
		$this->mp_error_message->ViewCustomAttributes = "";

		// mp_response
		$this->mp_response->ViewValue = $this->mp_response->CurrentValue;
		$this->mp_response->ViewCustomAttributes = "";

		// createdAt
		$this->createdAt->ViewValue = $this->createdAt->CurrentValue;
		$this->createdAt->ViewValue = ew_FormatDateTime($this->createdAt->ViewValue, 11);
		$this->createdAt->ViewCustomAttributes = "";

		// updatedAt
		$this->updatedAt->ViewValue = $this->updatedAt->CurrentValue;
		$this->updatedAt->ViewValue = ew_FormatDateTime($this->updatedAt->ViewValue, 11);
		$this->updatedAt->ViewCustomAttributes = "";

			// id
			$this->id->LinkCustomAttributes = "";
			$this->id->HrefValue = "";
			$this->id->TooltipValue = "";

			// datos
			$this->datos->LinkCustomAttributes = "";
			$this->datos->HrefValue = "";
			$this->datos->TooltipValue = "";

			// total
			$this->total->LinkCustomAttributes = "";
			$this->total->HrefValue = "";
			$this->total->TooltipValue = "";

			// estado
			$this->estado->LinkCustomAttributes = "";
			$this->estado->HrefValue = "";
			$this->estado->TooltipValue = "";

			// metodo_pago
			$this->metodo_pago->LinkCustomAttributes = "";
			$this->metodo_pago->HrefValue = "";
			$this->metodo_pago->TooltipValue = "";

			// comprador_nombre
			$this->comprador_nombre->LinkCustomAttributes = "";
			$this->comprador_nombre->HrefValue = "";
			$this->comprador_nombre->TooltipValue = "";

			// comprador_email
			$this->comprador_email->LinkCustomAttributes = "";
			$this->comprador_email->HrefValue = "";
			$this->comprador_email->TooltipValue = "";

			// comprador_telefono
			$this->comprador_telefono->LinkCustomAttributes = "";
			$this->comprador_telefono->HrefValue = "";
			$this->comprador_telefono->TooltipValue = "";

			// direccion_envio
			$this->direccion_envio->LinkCustomAttributes = "";
			$this->direccion_envio->HrefValue = "";
			$this->direccion_envio->TooltipValue = "";

			// mp_payment_id
			$this->mp_payment_id->LinkCustomAttributes = "";
			$this->mp_payment_id->HrefValue = "";
			$this->mp_payment_id->TooltipValue = "";

			// tarjeta_last4
			$this->tarjeta_last4->LinkCustomAttributes = "";
			$this->tarjeta_last4->HrefValue = "";
			$this->tarjeta_last4->TooltipValue = "";

			// tarjeta_payment_method
			$this->tarjeta_payment_method->LinkCustomAttributes = "";
			$this->tarjeta_payment_method->HrefValue = "";
			$this->tarjeta_payment_method->TooltipValue = "";

			// transferencia_ref
			$this->transferencia_ref->LinkCustomAttributes = "";
			$this->transferencia_ref->HrefValue = "";
			$this->transferencia_ref->TooltipValue = "";

			// mp_error_code
			$this->mp_error_code->LinkCustomAttributes = "";
			$this->mp_error_code->HrefValue = "";
			$this->mp_error_code->TooltipValue = "";

			// mp_error_message
			$this->mp_error_message->LinkCustomAttributes = "";
			$this->mp_error_message->HrefValue = "";
			$this->mp_error_message->TooltipValue = "";

			// mp_response
			$this->mp_response->LinkCustomAttributes = "";
			$this->mp_response->HrefValue = "";
			$this->mp_response->TooltipValue = "";

			// createdAt
			$this->createdAt->LinkCustomAttributes = "";
			$this->createdAt->HrefValue = "";
			$this->createdAt->TooltipValue = "";

			// updatedAt
			$this->updatedAt->LinkCustomAttributes = "";
			$this->updatedAt->HrefValue = "";
			$this->updatedAt->TooltipValue = "";
		} elseif ($this->RowType == EW_ROWTYPE_SEARCH) { // Search row

			// id
			$this->id->EditAttrs["class"] = "form-control";
			$this->id->EditCustomAttributes = "";
			$this->id->EditValue = ew_HtmlEncode($this->id->AdvancedSearch->SearchValue);
			$this->id->PlaceHolder = ew_RemoveHtml($this->id->FldCaption());

			// datos
			$this->datos->EditAttrs["class"] = "form-control";
			$this->datos->EditCustomAttributes = "";
			$this->datos->EditValue = ew_HtmlEncode($this->datos->AdvancedSearch->SearchValue);
			$this->datos->PlaceHolder = ew_RemoveHtml($this->datos->FldCaption());

			// total
			$this->total->EditAttrs["class"] = "form-control";
			$this->total->EditCustomAttributes = "";
			$this->total->EditValue = ew_HtmlEncode($this->total->AdvancedSearch->SearchValue);
			$this->total->PlaceHolder = ew_RemoveHtml($this->total->FldCaption());

			// estado
			$this->estado->EditAttrs["class"] = "form-control";
			$this->estado->EditCustomAttributes = "";
			$this->estado->EditValue = ew_HtmlEncode($this->estado->AdvancedSearch->SearchValue);
			$this->estado->PlaceHolder = ew_RemoveHtml($this->estado->FldCaption());

			// metodo_pago
			$this->metodo_pago->EditAttrs["class"] = "form-control";
			$this->metodo_pago->EditCustomAttributes = "";
			$this->metodo_pago->EditValue = ew_HtmlEncode($this->metodo_pago->AdvancedSearch->SearchValue);
			$this->metodo_pago->PlaceHolder = ew_RemoveHtml($this->metodo_pago->FldCaption());

			// comprador_nombre
			$this->comprador_nombre->EditAttrs["class"] = "form-control";
			$this->comprador_nombre->EditCustomAttributes = "";
			$this->comprador_nombre->EditValue = ew_HtmlEncode($this->comprador_nombre->AdvancedSearch->SearchValue);
			$this->comprador_nombre->PlaceHolder = ew_RemoveHtml($this->comprador_nombre->FldCaption());

			// comprador_email
			$this->comprador_email->EditAttrs["class"] = "form-control";
			$this->comprador_email->EditCustomAttributes = "";
			$this->comprador_email->EditValue = ew_HtmlEncode($this->comprador_email->AdvancedSearch->SearchValue);
			$this->comprador_email->PlaceHolder = ew_RemoveHtml($this->comprador_email->FldCaption());

			// comprador_telefono
			$this->comprador_telefono->EditAttrs["class"] = "form-control";
			$this->comprador_telefono->EditCustomAttributes = "";
			$this->comprador_telefono->EditValue = ew_HtmlEncode($this->comprador_telefono->AdvancedSearch->SearchValue);
			$this->comprador_telefono->PlaceHolder = ew_RemoveHtml($this->comprador_telefono->FldCaption());

			// direccion_envio
			$this->direccion_envio->EditAttrs["class"] = "form-control";
			$this->direccion_envio->EditCustomAttributes = "";
			$this->direccion_envio->EditValue = ew_HtmlEncode($this->direccion_envio->AdvancedSearch->SearchValue);
			$this->direccion_envio->PlaceHolder = ew_RemoveHtml($this->direccion_envio->FldCaption());

			// mp_payment_id
			$this->mp_payment_id->EditAttrs["class"] = "form-control";
			$this->mp_payment_id->EditCustomAttributes = "";
			$this->mp_payment_id->EditValue = ew_HtmlEncode($this->mp_payment_id->AdvancedSearch->SearchValue);
			$this->mp_payment_id->PlaceHolder = ew_RemoveHtml($this->mp_payment_id->FldCaption());

			// tarjeta_last4
			$this->tarjeta_last4->EditAttrs["class"] = "form-control";
			$this->tarjeta_last4->EditCustomAttributes = "";
			$this->tarjeta_last4->EditValue = ew_HtmlEncode($this->tarjeta_last4->AdvancedSearch->SearchValue);
			$this->tarjeta_last4->PlaceHolder = ew_RemoveHtml($this->tarjeta_last4->FldCaption());

			// tarjeta_payment_method
			$this->tarjeta_payment_method->EditAttrs["class"] = "form-control";
			$this->tarjeta_payment_method->EditCustomAttributes = "";
			$this->tarjeta_payment_method->EditValue = ew_HtmlEncode($this->tarjeta_payment_method->AdvancedSearch->SearchValue);
			$this->tarjeta_payment_method->PlaceHolder = ew_RemoveHtml($this->tarjeta_payment_method->FldCaption());

			// transferencia_ref
			$this->transferencia_ref->EditAttrs["class"] = "form-control";
			$this->transferencia_ref->EditCustomAttributes = "";
			$this->transferencia_ref->EditValue = ew_HtmlEncode($this->transferencia_ref->AdvancedSearch->SearchValue);
			$this->transferencia_ref->PlaceHolder = ew_RemoveHtml($this->transferencia_ref->FldCaption());

			// mp_error_code
			$this->mp_error_code->EditAttrs["class"] = "form-control";
			$this->mp_error_code->EditCustomAttributes = "";
			$this->mp_error_code->EditValue = ew_HtmlEncode($this->mp_error_code->AdvancedSearch->SearchValue);
			$this->mp_error_code->PlaceHolder = ew_RemoveHtml($this->mp_error_code->FldCaption());

			// mp_error_message
			$this->mp_error_message->EditAttrs["class"] = "form-control";
			$this->mp_error_message->EditCustomAttributes = "";
			$this->mp_error_message->EditValue = ew_HtmlEncode($this->mp_error_message->AdvancedSearch->SearchValue);
			$this->mp_error_message->PlaceHolder = ew_RemoveHtml($this->mp_error_message->FldCaption());

			// mp_response
			$this->mp_response->EditAttrs["class"] = "form-control";
			$this->mp_response->EditCustomAttributes = "";
			$this->mp_response->EditValue = ew_HtmlEncode($this->mp_response->AdvancedSearch->SearchValue);
			$this->mp_response->PlaceHolder = ew_RemoveHtml($this->mp_response->FldCaption());

			// createdAt
			$this->createdAt->EditAttrs["class"] = "form-control";
			$this->createdAt->EditCustomAttributes = "";
			$this->createdAt->EditValue = ew_HtmlEncode(ew_FormatDateTime(ew_UnFormatDateTime($this->createdAt->AdvancedSearch->SearchValue, 11), 11));
			$this->createdAt->PlaceHolder = ew_RemoveHtml($this->createdAt->FldCaption());

			// updatedAt
			$this->updatedAt->EditAttrs["class"] = "form-control";
			$this->updatedAt->EditCustomAttributes = "";
			$this->updatedAt->EditValue = ew_HtmlEncode(ew_FormatDateTime(ew_UnFormatDateTime($this->updatedAt->AdvancedSearch->SearchValue, 11), 11));
			$this->updatedAt->PlaceHolder = ew_RemoveHtml($this->updatedAt->FldCaption());
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
		if (!ew_CheckNumber($this->total->AdvancedSearch->SearchValue)) {
			ew_AddMessage($gsSearchError, $this->total->FldErrMsg());
		}
		if (!ew_CheckEuroDate($this->createdAt->AdvancedSearch->SearchValue)) {
			ew_AddMessage($gsSearchError, $this->createdAt->FldErrMsg());
		}
		if (!ew_CheckEuroDate($this->updatedAt->AdvancedSearch->SearchValue)) {
			ew_AddMessage($gsSearchError, $this->updatedAt->FldErrMsg());
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
		$this->datos->AdvancedSearch->Load();
		$this->total->AdvancedSearch->Load();
		$this->estado->AdvancedSearch->Load();
		$this->metodo_pago->AdvancedSearch->Load();
		$this->comprador_nombre->AdvancedSearch->Load();
		$this->comprador_email->AdvancedSearch->Load();
		$this->comprador_telefono->AdvancedSearch->Load();
		$this->direccion_envio->AdvancedSearch->Load();
		$this->mp_payment_id->AdvancedSearch->Load();
		$this->tarjeta_last4->AdvancedSearch->Load();
		$this->tarjeta_payment_method->AdvancedSearch->Load();
		$this->transferencia_ref->AdvancedSearch->Load();
		$this->mp_error_code->AdvancedSearch->Load();
		$this->mp_error_message->AdvancedSearch->Load();
		$this->mp_response->AdvancedSearch->Load();
		$this->createdAt->AdvancedSearch->Load();
		$this->updatedAt->AdvancedSearch->Load();
	}

	// Set up Breadcrumb
	function SetupBreadcrumb() {
		global $Breadcrumb, $Language;
		$Breadcrumb = new cBreadcrumb();
		$url = substr(ew_CurrentUrl(), strrpos(ew_CurrentUrl(), "/")+1);
		$Breadcrumb->Add("list", $this->TableVar, $this->AddMasterUrl("pedidoslist.php"), "", $this->TableVar, TRUE);
		$PageId = "search";
		$Breadcrumb->Add("search", $PageId, $url);
	}

	// Setup lookup filters of a field
	function SetupLookupFilters($fld, $pageId = null) {
		global $gsLanguage;
		$pageId = $pageId ?: $this->PageID;
		switch ($fld->FldVar) {
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
if (!isset($pedidos_search)) $pedidos_search = new cpedidos_search();

// Page init
$pedidos_search->Page_Init();

// Page main
$pedidos_search->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$pedidos_search->Page_Render();
?>
<?php include_once "header.php" ?>
<script type="text/javascript">

// Form object
var CurrentPageID = EW_PAGE_ID = "search";
<?php if ($pedidos_search->IsModal) { ?>
var CurrentAdvancedSearchForm = fpedidossearch = new ew_Form("fpedidossearch", "search");
<?php } else { ?>
var CurrentForm = fpedidossearch = new ew_Form("fpedidossearch", "search");
<?php } ?>

// Form_CustomValidate event
fpedidossearch.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fpedidossearch.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
// Form object for search
// Validate function for search

fpedidossearch.Validate = function(fobj) {
	if (!this.ValidateRequired)
		return true; // Ignore validation
	fobj = fobj || this.Form;
	var infix = "";
	elm = this.GetElements("x" + infix + "_id");
	if (elm && !ew_CheckInteger(elm.value))
		return this.OnError(elm, "<?php echo ew_JsEncode2($pedidos->id->FldErrMsg()) ?>");
	elm = this.GetElements("x" + infix + "_total");
	if (elm && !ew_CheckNumber(elm.value))
		return this.OnError(elm, "<?php echo ew_JsEncode2($pedidos->total->FldErrMsg()) ?>");
	elm = this.GetElements("x" + infix + "_createdAt");
	if (elm && !ew_CheckEuroDate(elm.value))
		return this.OnError(elm, "<?php echo ew_JsEncode2($pedidos->createdAt->FldErrMsg()) ?>");
	elm = this.GetElements("x" + infix + "_updatedAt");
	if (elm && !ew_CheckEuroDate(elm.value))
		return this.OnError(elm, "<?php echo ew_JsEncode2($pedidos->updatedAt->FldErrMsg()) ?>");

	// Fire Form_CustomValidate event
	if (!this.Form_CustomValidate(fobj))
		return false;
	return true;
}
</script>
<script type="text/javascript">

// Write your client script here, no need to add script tags.
</script>
<?php $pedidos_search->ShowPageHeader(); ?>
<?php
$pedidos_search->ShowMessage();
?>
<form name="fpedidossearch" id="fpedidossearch" class="<?php echo $pedidos_search->FormClassName ?>" action="<?php echo ew_CurrentPage() ?>" method="post">
<?php if ($pedidos_search->CheckToken) { ?>
<input type="hidden" name="<?php echo EW_TOKEN_NAME ?>" value="<?php echo $pedidos_search->Token ?>">
<?php } ?>
<input type="hidden" name="t" value="pedidos">
<input type="hidden" name="a_search" id="a_search" value="S">
<input type="hidden" name="modal" value="<?php echo intval($pedidos_search->IsModal) ?>">
<div class="ewSearchDiv"><!-- page* -->
<?php if ($pedidos->id->Visible) { // id ?>
	<div id="r_id" class="form-group">
		<label for="x_id" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_id"><?php echo $pedidos->id->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_id" id="z_id" value="="></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->id->CellAttributes() ?>>
			<span id="el_pedidos_id">
<input type="text" data-table="pedidos" data-field="x_id" name="x_id" id="x_id" placeholder="<?php echo ew_HtmlEncode($pedidos->id->getPlaceHolder()) ?>" value="<?php echo $pedidos->id->EditValue ?>"<?php echo $pedidos->id->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->datos->Visible) { // datos ?>
	<div id="r_datos" class="form-group">
		<label for="x_datos" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_datos"><?php echo $pedidos->datos->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_datos" id="z_datos" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->datos->CellAttributes() ?>>
			<span id="el_pedidos_datos">
<input type="text" data-table="pedidos" data-field="x_datos" name="x_datos" id="x_datos" size="35" placeholder="<?php echo ew_HtmlEncode($pedidos->datos->getPlaceHolder()) ?>" value="<?php echo $pedidos->datos->EditValue ?>"<?php echo $pedidos->datos->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->total->Visible) { // total ?>
	<div id="r_total" class="form-group">
		<label for="x_total" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_total"><?php echo $pedidos->total->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_total" id="z_total" value="="></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->total->CellAttributes() ?>>
			<span id="el_pedidos_total">
<input type="text" data-table="pedidos" data-field="x_total" name="x_total" id="x_total" size="30" placeholder="<?php echo ew_HtmlEncode($pedidos->total->getPlaceHolder()) ?>" value="<?php echo $pedidos->total->EditValue ?>"<?php echo $pedidos->total->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->estado->Visible) { // estado ?>
	<div id="r_estado" class="form-group">
		<label for="x_estado" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_estado"><?php echo $pedidos->estado->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_estado" id="z_estado" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->estado->CellAttributes() ?>>
			<span id="el_pedidos_estado">
<input type="text" data-table="pedidos" data-field="x_estado" name="x_estado" id="x_estado" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->estado->getPlaceHolder()) ?>" value="<?php echo $pedidos->estado->EditValue ?>"<?php echo $pedidos->estado->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->metodo_pago->Visible) { // metodo_pago ?>
	<div id="r_metodo_pago" class="form-group">
		<label for="x_metodo_pago" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_metodo_pago"><?php echo $pedidos->metodo_pago->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_metodo_pago" id="z_metodo_pago" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->metodo_pago->CellAttributes() ?>>
			<span id="el_pedidos_metodo_pago">
<input type="text" data-table="pedidos" data-field="x_metodo_pago" name="x_metodo_pago" id="x_metodo_pago" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->metodo_pago->getPlaceHolder()) ?>" value="<?php echo $pedidos->metodo_pago->EditValue ?>"<?php echo $pedidos->metodo_pago->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->comprador_nombre->Visible) { // comprador_nombre ?>
	<div id="r_comprador_nombre" class="form-group">
		<label for="x_comprador_nombre" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_comprador_nombre"><?php echo $pedidos->comprador_nombre->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_comprador_nombre" id="z_comprador_nombre" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->comprador_nombre->CellAttributes() ?>>
			<span id="el_pedidos_comprador_nombre">
<input type="text" data-table="pedidos" data-field="x_comprador_nombre" name="x_comprador_nombre" id="x_comprador_nombre" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->comprador_nombre->getPlaceHolder()) ?>" value="<?php echo $pedidos->comprador_nombre->EditValue ?>"<?php echo $pedidos->comprador_nombre->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->comprador_email->Visible) { // comprador_email ?>
	<div id="r_comprador_email" class="form-group">
		<label for="x_comprador_email" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_comprador_email"><?php echo $pedidos->comprador_email->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_comprador_email" id="z_comprador_email" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->comprador_email->CellAttributes() ?>>
			<span id="el_pedidos_comprador_email">
<input type="text" data-table="pedidos" data-field="x_comprador_email" name="x_comprador_email" id="x_comprador_email" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->comprador_email->getPlaceHolder()) ?>" value="<?php echo $pedidos->comprador_email->EditValue ?>"<?php echo $pedidos->comprador_email->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->comprador_telefono->Visible) { // comprador_telefono ?>
	<div id="r_comprador_telefono" class="form-group">
		<label for="x_comprador_telefono" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_comprador_telefono"><?php echo $pedidos->comprador_telefono->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_comprador_telefono" id="z_comprador_telefono" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->comprador_telefono->CellAttributes() ?>>
			<span id="el_pedidos_comprador_telefono">
<input type="text" data-table="pedidos" data-field="x_comprador_telefono" name="x_comprador_telefono" id="x_comprador_telefono" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->comprador_telefono->getPlaceHolder()) ?>" value="<?php echo $pedidos->comprador_telefono->EditValue ?>"<?php echo $pedidos->comprador_telefono->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->direccion_envio->Visible) { // direccion_envio ?>
	<div id="r_direccion_envio" class="form-group">
		<label for="x_direccion_envio" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_direccion_envio"><?php echo $pedidos->direccion_envio->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_direccion_envio" id="z_direccion_envio" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->direccion_envio->CellAttributes() ?>>
			<span id="el_pedidos_direccion_envio">
<input type="text" data-table="pedidos" data-field="x_direccion_envio" name="x_direccion_envio" id="x_direccion_envio" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->direccion_envio->getPlaceHolder()) ?>" value="<?php echo $pedidos->direccion_envio->EditValue ?>"<?php echo $pedidos->direccion_envio->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->mp_payment_id->Visible) { // mp_payment_id ?>
	<div id="r_mp_payment_id" class="form-group">
		<label for="x_mp_payment_id" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_mp_payment_id"><?php echo $pedidos->mp_payment_id->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_mp_payment_id" id="z_mp_payment_id" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->mp_payment_id->CellAttributes() ?>>
			<span id="el_pedidos_mp_payment_id">
<input type="text" data-table="pedidos" data-field="x_mp_payment_id" name="x_mp_payment_id" id="x_mp_payment_id" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->mp_payment_id->getPlaceHolder()) ?>" value="<?php echo $pedidos->mp_payment_id->EditValue ?>"<?php echo $pedidos->mp_payment_id->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->tarjeta_last4->Visible) { // tarjeta_last4 ?>
	<div id="r_tarjeta_last4" class="form-group">
		<label for="x_tarjeta_last4" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_tarjeta_last4"><?php echo $pedidos->tarjeta_last4->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_tarjeta_last4" id="z_tarjeta_last4" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->tarjeta_last4->CellAttributes() ?>>
			<span id="el_pedidos_tarjeta_last4">
<input type="text" data-table="pedidos" data-field="x_tarjeta_last4" name="x_tarjeta_last4" id="x_tarjeta_last4" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->tarjeta_last4->getPlaceHolder()) ?>" value="<?php echo $pedidos->tarjeta_last4->EditValue ?>"<?php echo $pedidos->tarjeta_last4->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->tarjeta_payment_method->Visible) { // tarjeta_payment_method ?>
	<div id="r_tarjeta_payment_method" class="form-group">
		<label for="x_tarjeta_payment_method" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_tarjeta_payment_method"><?php echo $pedidos->tarjeta_payment_method->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_tarjeta_payment_method" id="z_tarjeta_payment_method" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->tarjeta_payment_method->CellAttributes() ?>>
			<span id="el_pedidos_tarjeta_payment_method">
<input type="text" data-table="pedidos" data-field="x_tarjeta_payment_method" name="x_tarjeta_payment_method" id="x_tarjeta_payment_method" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->tarjeta_payment_method->getPlaceHolder()) ?>" value="<?php echo $pedidos->tarjeta_payment_method->EditValue ?>"<?php echo $pedidos->tarjeta_payment_method->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->transferencia_ref->Visible) { // transferencia_ref ?>
	<div id="r_transferencia_ref" class="form-group">
		<label for="x_transferencia_ref" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_transferencia_ref"><?php echo $pedidos->transferencia_ref->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_transferencia_ref" id="z_transferencia_ref" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->transferencia_ref->CellAttributes() ?>>
			<span id="el_pedidos_transferencia_ref">
<input type="text" data-table="pedidos" data-field="x_transferencia_ref" name="x_transferencia_ref" id="x_transferencia_ref" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->transferencia_ref->getPlaceHolder()) ?>" value="<?php echo $pedidos->transferencia_ref->EditValue ?>"<?php echo $pedidos->transferencia_ref->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->mp_error_code->Visible) { // mp_error_code ?>
	<div id="r_mp_error_code" class="form-group">
		<label for="x_mp_error_code" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_mp_error_code"><?php echo $pedidos->mp_error_code->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_mp_error_code" id="z_mp_error_code" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->mp_error_code->CellAttributes() ?>>
			<span id="el_pedidos_mp_error_code">
<input type="text" data-table="pedidos" data-field="x_mp_error_code" name="x_mp_error_code" id="x_mp_error_code" size="30" maxlength="64" placeholder="<?php echo ew_HtmlEncode($pedidos->mp_error_code->getPlaceHolder()) ?>" value="<?php echo $pedidos->mp_error_code->EditValue ?>"<?php echo $pedidos->mp_error_code->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->mp_error_message->Visible) { // mp_error_message ?>
	<div id="r_mp_error_message" class="form-group">
		<label for="x_mp_error_message" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_mp_error_message"><?php echo $pedidos->mp_error_message->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_mp_error_message" id="z_mp_error_message" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->mp_error_message->CellAttributes() ?>>
			<span id="el_pedidos_mp_error_message">
<input type="text" data-table="pedidos" data-field="x_mp_error_message" name="x_mp_error_message" id="x_mp_error_message" size="35" placeholder="<?php echo ew_HtmlEncode($pedidos->mp_error_message->getPlaceHolder()) ?>" value="<?php echo $pedidos->mp_error_message->EditValue ?>"<?php echo $pedidos->mp_error_message->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->mp_response->Visible) { // mp_response ?>
	<div id="r_mp_response" class="form-group">
		<label for="x_mp_response" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_mp_response"><?php echo $pedidos->mp_response->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("LIKE") ?><input type="hidden" name="z_mp_response" id="z_mp_response" value="LIKE"></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->mp_response->CellAttributes() ?>>
			<span id="el_pedidos_mp_response">
<input type="text" data-table="pedidos" data-field="x_mp_response" name="x_mp_response" id="x_mp_response" size="35" placeholder="<?php echo ew_HtmlEncode($pedidos->mp_response->getPlaceHolder()) ?>" value="<?php echo $pedidos->mp_response->EditValue ?>"<?php echo $pedidos->mp_response->EditAttributes() ?>>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->createdAt->Visible) { // createdAt ?>
	<div id="r_createdAt" class="form-group">
		<label for="x_createdAt" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_createdAt"><?php echo $pedidos->createdAt->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_createdAt" id="z_createdAt" value="="></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->createdAt->CellAttributes() ?>>
			<span id="el_pedidos_createdAt">
<input type="text" data-table="pedidos" data-field="x_createdAt" data-format="11" name="x_createdAt" id="x_createdAt" placeholder="<?php echo ew_HtmlEncode($pedidos->createdAt->getPlaceHolder()) ?>" value="<?php echo $pedidos->createdAt->EditValue ?>"<?php echo $pedidos->createdAt->EditAttributes() ?>>
<?php if (!$pedidos->createdAt->ReadOnly && !$pedidos->createdAt->Disabled && !isset($pedidos->createdAt->EditAttrs["readonly"]) && !isset($pedidos->createdAt->EditAttrs["disabled"])) { ?>
<script type="text/javascript">
ew_CreateDateTimePicker("fpedidossearch", "x_createdAt", {"ignoreReadonly":true,"useCurrent":false,"format":11});
</script>
<?php } ?>
</span>
		</div></div>
	</div>
<?php } ?>
<?php if ($pedidos->updatedAt->Visible) { // updatedAt ?>
	<div id="r_updatedAt" class="form-group">
		<label for="x_updatedAt" class="<?php echo $pedidos_search->LeftColumnClass ?>"><span id="elh_pedidos_updatedAt"><?php echo $pedidos->updatedAt->FldCaption() ?></span>
		<p class="form-control-static ewSearchOperator"><?php echo $Language->Phrase("=") ?><input type="hidden" name="z_updatedAt" id="z_updatedAt" value="="></p>
		</label>
		<div class="<?php echo $pedidos_search->RightColumnClass ?>"><div<?php echo $pedidos->updatedAt->CellAttributes() ?>>
			<span id="el_pedidos_updatedAt">
<input type="text" data-table="pedidos" data-field="x_updatedAt" data-format="11" name="x_updatedAt" id="x_updatedAt" placeholder="<?php echo ew_HtmlEncode($pedidos->updatedAt->getPlaceHolder()) ?>" value="<?php echo $pedidos->updatedAt->EditValue ?>"<?php echo $pedidos->updatedAt->EditAttributes() ?>>
<?php if (!$pedidos->updatedAt->ReadOnly && !$pedidos->updatedAt->Disabled && !isset($pedidos->updatedAt->EditAttrs["readonly"]) && !isset($pedidos->updatedAt->EditAttrs["disabled"])) { ?>
<script type="text/javascript">
ew_CreateDateTimePicker("fpedidossearch", "x_updatedAt", {"ignoreReadonly":true,"useCurrent":false,"format":11});
</script>
<?php } ?>
</span>
		</div></div>
	</div>
<?php } ?>
</div><!-- /page* -->
<?php if (!$pedidos_search->IsModal) { ?>
<div class="form-group"><!-- buttons .form-group -->
	<div class="<?php echo $pedidos_search->OffsetColumnClass ?>"><!-- buttons offset -->
<button class="btn btn-primary ewButton" name="btnAction" id="btnAction" type="submit"><?php echo $Language->Phrase("Search") ?></button>
<button class="btn btn-default ewButton" name="btnReset" id="btnReset" type="button" onclick="ew_ClearForm(this.form);"><?php echo $Language->Phrase("Reset") ?></button>
	</div><!-- /buttons offset -->
</div><!-- /buttons .form-group -->
<?php } ?>
</form>
<script type="text/javascript">
fpedidossearch.Init();
</script>
<?php
$pedidos_search->ShowPageFooter();
if (EW_DEBUG_ENABLED)
	echo ew_DebugMsg();
?>
<script type="text/javascript">

// Write your table-specific startup script here
// document.write("page loaded");

</script>
<?php include_once "footer.php" ?>
<?php
$pedidos_search->Page_Terminate();
?>
