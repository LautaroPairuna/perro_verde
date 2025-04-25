<?php
if (session_id() == "") session_start(); // Init session data
ob_start(); // Turn on output buffering
?>
<?php include_once "ewcfg14.php" ?>
<?php include_once ((EW_USE_ADODB) ? "adodb5/adodb.inc.php" : "ewmysql14.php") ?>
<?php include_once "phpfn14.php" ?>
<?php include_once "productoespecificacionesinfo.php" ?>
<?php include_once "productosinfo.php" ?>
<?php include_once "userfn14.php" ?>
<?php

//
// Page class
//

$productoespecificaciones_add = NULL; // Initialize page object first

class cproductoespecificaciones_add extends cproductoespecificaciones {

	// Page ID
	var $PageID = 'add';

	// Project ID
	var $ProjectID = '{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}';

	// Table name
	var $TableName = 'productoespecificaciones';

	// Page object name
	var $PageObjName = 'productoespecificaciones_add';

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

		// Table object (productoespecificaciones)
		if (!isset($GLOBALS["productoespecificaciones"]) || get_class($GLOBALS["productoespecificaciones"]) == "cproductoespecificaciones") {
			$GLOBALS["productoespecificaciones"] = &$this;
			$GLOBALS["Table"] = &$GLOBALS["productoespecificaciones"];
		}

		// Table object (productos)
		if (!isset($GLOBALS['productos'])) $GLOBALS['productos'] = new cproductos();

		// Page ID
		if (!defined("EW_PAGE_ID"))
			define("EW_PAGE_ID", 'add', TRUE);

		// Table name (for backward compatibility)
		if (!defined("EW_TABLE_NAME"))
			define("EW_TABLE_NAME", 'productoespecificaciones', TRUE);

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
		if (!$Security->CanAdd()) {
			$Security->SaveLastUrl();
			$this->setFailureMessage(ew_DeniedMsg()); // Set no permission
			if ($Security->CanList())
				$this->Page_Terminate(ew_GetUrl("productoespecificacioneslist.php"));
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
		$this->producto_id->SetVisibility();
		$this->categoria->SetVisibility();
		$this->especificaciones->SetVisibility();
		$this->orden->SetVisibility();
		$this->id_copy->SetVisibility();
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

		// Process auto fill
		if (@$_POST["ajax"] == "autofill") {
			$results = $this->GetAutoFill(@$_POST["name"], @$_POST["q"]);
			if ($results) {

				// Clean output buffer
				if (!EW_DEBUG_ENABLED && ob_get_length())
					ob_end_clean();
				echo $results;
				$this->Page_Terminate();
				exit();
			}
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
		global $EW_EXPORT, $productoespecificaciones;
		if ($this->CustomExport <> "" && $this->CustomExport == $this->Export && array_key_exists($this->CustomExport, $EW_EXPORT)) {
				$sContent = ob_get_contents();
			if ($gsExportFile == "") $gsExportFile = $this->TableVar;
			$class = $EW_EXPORT[$this->CustomExport];
			if (class_exists($class)) {
				$doc = new $class($productoespecificaciones);
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
					if ($pageName == "productoespecificacionesview.php")
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
	var $FormClassName = "form-horizontal ewForm ewAddForm";
	var $IsModal = FALSE;
	var $IsMobileOrModal = FALSE;
	var $DbMasterFilter = "";
	var $DbDetailFilter = "";
	var $StartRec;
	var $Priv = 0;
	var $OldRecordset;
	var $CopyRecord;

	//
	// Page main
	//
	function Page_Main() {
		global $objForm, $Language, $gsFormError;
		global $gbSkipHeaderFooter;

		// Check modal
		if ($this->IsModal)
			$gbSkipHeaderFooter = TRUE;
		$this->IsMobileOrModal = ew_IsMobile() || $this->IsModal;
		$this->FormClassName = "ewForm ewAddForm form-horizontal";

		// Set up master/detail parameters
		$this->SetupMasterParms();

		// Set up current action
		if (@$_POST["a_add"] <> "") {
			$this->CurrentAction = $_POST["a_add"]; // Get form action
		} else { // Not post back

			// Load key values from QueryString
			$this->CopyRecord = TRUE;
			if (@$_GET["id"] != "") {
				$this->id->setQueryStringValue($_GET["id"]);
				$this->setKey("id", $this->id->CurrentValue); // Set up key
			} else {
				$this->setKey("id", ""); // Clear key
				$this->CopyRecord = FALSE;
			}
			if ($this->CopyRecord) {
				$this->CurrentAction = "C"; // Copy record
			} else {
				$this->CurrentAction = "I"; // Display blank record
			}
		}

		// Load old record / default values
		$loaded = $this->LoadOldRecord();

		// Load form values
		if (@$_POST["a_add"] <> "") {
			$this->LoadFormValues(); // Load form values
		}

		// Validate form if post back
		if (@$_POST["a_add"] <> "") {
			if (!$this->ValidateForm()) {
				$this->CurrentAction = "I"; // Form error, reset action
				$this->EventCancelled = TRUE; // Event cancelled
				$this->RestoreFormValues(); // Restore form values
				$this->setFailureMessage($gsFormError);
			}
		}

		// Perform current action
		switch ($this->CurrentAction) {
			case "I": // Blank record
				break;
			case "C": // Copy an existing record
				if (!$loaded) { // Record not loaded
					if ($this->getFailureMessage() == "") $this->setFailureMessage($Language->Phrase("NoRecord")); // No record found
					$this->Page_Terminate("productoespecificacioneslist.php"); // No matching record, return to list
				}
				break;
			case "A": // Add new record
				$this->SendEmail = TRUE; // Send email on add success
				if ($this->AddRow($this->OldRecordset)) { // Add successful
					if ($this->getSuccessMessage() == "")
						$this->setSuccessMessage($Language->Phrase("AddSuccess")); // Set up success message
					$sReturnUrl = $this->getReturnUrl();
					if (ew_GetPageName($sReturnUrl) == "productoespecificacioneslist.php")
						$sReturnUrl = $this->AddMasterUrl($sReturnUrl); // List page, return to List page with correct master key if necessary
					elseif (ew_GetPageName($sReturnUrl) == "productoespecificacionesview.php")
						$sReturnUrl = $this->GetViewUrl(); // View page, return to View page with keyurl directly
					$this->Page_Terminate($sReturnUrl); // Clean up and return
				} else {
					$this->EventCancelled = TRUE; // Event cancelled
					$this->RestoreFormValues(); // Add failed, restore form values
				}
		}

		// Set up Breadcrumb
		$this->SetupBreadcrumb();

		// Render row based on row type
		$this->RowType = EW_ROWTYPE_ADD; // Render add type

		// Render row
		$this->ResetAttrs();
		$this->RenderRow();
	}

	// Get upload files
	function GetUploadFiles() {
		global $objForm, $Language;

		// Get upload data
	}

	// Load default values
	function LoadDefaultValues() {
		$this->id->CurrentValue = NULL;
		$this->id->OldValue = $this->id->CurrentValue;
		$this->producto_id->CurrentValue = NULL;
		$this->producto_id->OldValue = $this->producto_id->CurrentValue;
		$this->categoria->CurrentValue = NULL;
		$this->categoria->OldValue = $this->categoria->CurrentValue;
		$this->especificaciones->CurrentValue = NULL;
		$this->especificaciones->OldValue = $this->especificaciones->CurrentValue;
		$this->orden->CurrentValue = 1;
		$this->id_copy->CurrentValue = NULL;
		$this->id_copy->OldValue = $this->id_copy->CurrentValue;
		$this->activo->CurrentValue = 1;
	}

	// Load form values
	function LoadFormValues() {

		// Load from form
		global $objForm;
		if (!$this->producto_id->FldIsDetailKey) {
			$this->producto_id->setFormValue($objForm->GetValue("x_producto_id"));
		}
		if (!$this->categoria->FldIsDetailKey) {
			$this->categoria->setFormValue($objForm->GetValue("x_categoria"));
		}
		if (!$this->especificaciones->FldIsDetailKey) {
			$this->especificaciones->setFormValue($objForm->GetValue("x_especificaciones"));
		}
		if (!$this->orden->FldIsDetailKey) {
			$this->orden->setFormValue($objForm->GetValue("x_orden"));
		}
		if (!$this->id_copy->FldIsDetailKey) {
			$this->id_copy->setFormValue($objForm->GetValue("x_id_copy"));
		}
		if (!$this->activo->FldIsDetailKey) {
			$this->activo->setFormValue($objForm->GetValue("x_activo"));
		}
	}

	// Restore form values
	function RestoreFormValues() {
		global $objForm;
		$this->producto_id->CurrentValue = $this->producto_id->FormValue;
		$this->categoria->CurrentValue = $this->categoria->FormValue;
		$this->especificaciones->CurrentValue = $this->especificaciones->FormValue;
		$this->orden->CurrentValue = $this->orden->FormValue;
		$this->id_copy->CurrentValue = $this->id_copy->FormValue;
		$this->activo->CurrentValue = $this->activo->FormValue;
	}

	// Load row based on key values
	function LoadRow() {
		global $Security, $Language;
		$sFilter = $this->KeyFilter();

		// Call Row Selecting event
		$this->Row_Selecting($sFilter);

		// Load SQL based on filter
		$this->CurrentFilter = $sFilter;
		$sSql = $this->SQL();
		$conn = &$this->Connection();
		$res = FALSE;
		$rs = ew_LoadRecordset($sSql, $conn);
		if ($rs && !$rs->EOF) {
			$res = TRUE;
			$this->LoadRowValues($rs); // Load row values
			$rs->Close();
		}
		return $res;
	}

	// Load row values from recordset
	function LoadRowValues($rs = NULL) {
		if ($rs && !$rs->EOF)
			$row = $rs->fields;
		else
			$row = $this->NewRow(); 

		// Call Row Selected event
		$this->Row_Selected($row);
		if (!$rs || $rs->EOF)
			return;
		$this->id->setDbValue($row['id']);
		$this->producto_id->setDbValue($row['producto_id']);
		$this->categoria->setDbValue($row['categoria']);
		$this->especificaciones->setDbValue($row['especificaciones']);
		$this->orden->setDbValue($row['orden']);
		$this->id_copy->setDbValue($row['id copy']);
		$this->activo->setDbValue($row['activo']);
	}

	// Return a row with default values
	function NewRow() {
		$this->LoadDefaultValues();
		$row = array();
		$row['id'] = $this->id->CurrentValue;
		$row['producto_id'] = $this->producto_id->CurrentValue;
		$row['categoria'] = $this->categoria->CurrentValue;
		$row['especificaciones'] = $this->especificaciones->CurrentValue;
		$row['orden'] = $this->orden->CurrentValue;
		$row['id copy'] = $this->id_copy->CurrentValue;
		$row['activo'] = $this->activo->CurrentValue;
		return $row;
	}

	// Load DbValue from recordset
	function LoadDbValues(&$rs) {
		if (!$rs || !is_array($rs) && $rs->EOF)
			return;
		$row = is_array($rs) ? $rs : $rs->fields;
		$this->id->DbValue = $row['id'];
		$this->producto_id->DbValue = $row['producto_id'];
		$this->categoria->DbValue = $row['categoria'];
		$this->especificaciones->DbValue = $row['especificaciones'];
		$this->orden->DbValue = $row['orden'];
		$this->id_copy->DbValue = $row['id copy'];
		$this->activo->DbValue = $row['activo'];
	}

	// Load old record
	function LoadOldRecord() {

		// Load key values from Session
		$bValidKey = TRUE;
		if (strval($this->getKey("id")) <> "")
			$this->id->CurrentValue = $this->getKey("id"); // id
		else
			$bValidKey = FALSE;

		// Load old record
		$this->OldRecordset = NULL;
		if ($bValidKey) {
			$this->CurrentFilter = $this->KeyFilter();
			$sSql = $this->SQL();
			$conn = &$this->Connection();
			$this->OldRecordset = ew_LoadRecordset($sSql, $conn);
		}
		$this->LoadRowValues($this->OldRecordset); // Load row values
		return $bValidKey;
	}

	// Render row values based on field settings
	function RenderRow() {
		global $Security, $Language, $gsLanguage;

		// Initialize URLs
		// Convert decimal values if posted back

		if ($this->id_copy->FormValue == $this->id_copy->CurrentValue && is_numeric(ew_StrToFloat($this->id_copy->CurrentValue)))
			$this->id_copy->CurrentValue = ew_StrToFloat($this->id_copy->CurrentValue);

		// Call Row_Rendering event
		$this->Row_Rendering();

		// Common render codes for all row types
		// id
		// producto_id
		// categoria
		// especificaciones
		// orden
		// id copy
		// activo

		if ($this->RowType == EW_ROWTYPE_VIEW) { // View row

		// producto_id
		if (strval($this->producto_id->CurrentValue) <> "") {
			$sFilterWrk = "`id`" . ew_SearchString("=", $this->producto_id->CurrentValue, EW_DATATYPE_NUMBER, "");
		$sSqlWrk = "SELECT `id`, `producto` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld` FROM `productos`";
		$sWhereWrk = "";
		$this->producto_id->LookupFilters = array();
		ew_AddFilter($sWhereWrk, $sFilterWrk);
		$this->Lookup_Selecting($this->producto_id, $sWhereWrk); // Call Lookup Selecting
		if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
		$sSqlWrk .= " ORDER BY `id` ASC";
			$rswrk = Conn()->Execute($sSqlWrk);
			if ($rswrk && !$rswrk->EOF) { // Lookup values found
				$arwrk = array();
				$arwrk[1] = $rswrk->fields('DispFld');
				$this->producto_id->ViewValue = $this->producto_id->DisplayValue($arwrk);
				$rswrk->Close();
			} else {
				$this->producto_id->ViewValue = $this->producto_id->CurrentValue;
			}
		} else {
			$this->producto_id->ViewValue = NULL;
		}
		$this->producto_id->ViewCustomAttributes = "";

		// categoria
		$this->categoria->ViewValue = $this->categoria->CurrentValue;
		$this->categoria->ViewCustomAttributes = "";

		// especificaciones
		$this->especificaciones->ViewValue = $this->especificaciones->CurrentValue;
		$this->especificaciones->ViewCustomAttributes = "";

		// orden
		$this->orden->ViewValue = $this->orden->CurrentValue;
		$this->orden->ViewCustomAttributes = "";

		// id copy
		$this->id_copy->ViewValue = $this->id_copy->CurrentValue;
		$this->id_copy->ViewCustomAttributes = "";

		// activo
		if (strval($this->activo->CurrentValue) <> "") {
			$this->activo->ViewValue = $this->activo->OptionCaption($this->activo->CurrentValue);
		} else {
			$this->activo->ViewValue = NULL;
		}
		$this->activo->ViewCustomAttributes = "";

			// producto_id
			$this->producto_id->LinkCustomAttributes = "";
			$this->producto_id->HrefValue = "";
			$this->producto_id->TooltipValue = "";

			// categoria
			$this->categoria->LinkCustomAttributes = "";
			$this->categoria->HrefValue = "";
			$this->categoria->TooltipValue = "";

			// especificaciones
			$this->especificaciones->LinkCustomAttributes = "";
			$this->especificaciones->HrefValue = "";
			$this->especificaciones->TooltipValue = "";

			// orden
			$this->orden->LinkCustomAttributes = "";
			$this->orden->HrefValue = "";
			$this->orden->TooltipValue = "";

			// id copy
			$this->id_copy->LinkCustomAttributes = "";
			$this->id_copy->HrefValue = "";
			$this->id_copy->TooltipValue = "";

			// activo
			$this->activo->LinkCustomAttributes = "";
			$this->activo->HrefValue = "";
			$this->activo->TooltipValue = "";
		} elseif ($this->RowType == EW_ROWTYPE_ADD) { // Add row

			// producto_id
			$this->producto_id->EditCustomAttributes = "";
			if ($this->producto_id->getSessionValue() <> "") {
				$this->producto_id->CurrentValue = $this->producto_id->getSessionValue();
			if (strval($this->producto_id->CurrentValue) <> "") {
				$sFilterWrk = "`id`" . ew_SearchString("=", $this->producto_id->CurrentValue, EW_DATATYPE_NUMBER, "");
			$sSqlWrk = "SELECT `id`, `producto` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld` FROM `productos`";
			$sWhereWrk = "";
			$this->producto_id->LookupFilters = array();
			ew_AddFilter($sWhereWrk, $sFilterWrk);
			$this->Lookup_Selecting($this->producto_id, $sWhereWrk); // Call Lookup Selecting
			if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
			$sSqlWrk .= " ORDER BY `id` ASC";
				$rswrk = Conn()->Execute($sSqlWrk);
				if ($rswrk && !$rswrk->EOF) { // Lookup values found
					$arwrk = array();
					$arwrk[1] = $rswrk->fields('DispFld');
					$this->producto_id->ViewValue = $this->producto_id->DisplayValue($arwrk);
					$rswrk->Close();
				} else {
					$this->producto_id->ViewValue = $this->producto_id->CurrentValue;
				}
			} else {
				$this->producto_id->ViewValue = NULL;
			}
			$this->producto_id->ViewCustomAttributes = "";
			} else {
			if (trim(strval($this->producto_id->CurrentValue)) == "") {
				$sFilterWrk = "0=1";
			} else {
				$sFilterWrk = "`id`" . ew_SearchString("=", $this->producto_id->CurrentValue, EW_DATATYPE_NUMBER, "");
			}
			$sSqlWrk = "SELECT `id`, `producto` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld`, '' AS `SelectFilterFld`, '' AS `SelectFilterFld2`, '' AS `SelectFilterFld3`, '' AS `SelectFilterFld4` FROM `productos`";
			$sWhereWrk = "";
			$this->producto_id->LookupFilters = array();
			ew_AddFilter($sWhereWrk, $sFilterWrk);
			$this->Lookup_Selecting($this->producto_id, $sWhereWrk); // Call Lookup Selecting
			if ($sWhereWrk <> "") $sSqlWrk .= " WHERE " . $sWhereWrk;
			$sSqlWrk .= " ORDER BY `id` ASC";
			$rswrk = Conn()->Execute($sSqlWrk);
			if ($rswrk && !$rswrk->EOF) { // Lookup values found
				$arwrk = array();
				$arwrk[1] = ew_HtmlEncode($rswrk->fields('DispFld'));
				$this->producto_id->ViewValue = $this->producto_id->DisplayValue($arwrk);
			} else {
				$this->producto_id->ViewValue = $Language->Phrase("PleaseSelect");
			}
			$arwrk = ($rswrk) ? $rswrk->GetRows() : array();
			if ($rswrk) $rswrk->Close();
			$this->producto_id->EditValue = $arwrk;
			}

			// categoria
			$this->categoria->EditAttrs["class"] = "form-control";
			$this->categoria->EditCustomAttributes = "";
			$this->categoria->EditValue = ew_HtmlEncode($this->categoria->CurrentValue);
			$this->categoria->PlaceHolder = ew_RemoveHtml($this->categoria->FldCaption());

			// especificaciones
			$this->especificaciones->EditAttrs["class"] = "form-control";
			$this->especificaciones->EditCustomAttributes = "";
			$this->especificaciones->EditValue = ew_HtmlEncode($this->especificaciones->CurrentValue);
			$this->especificaciones->PlaceHolder = ew_RemoveHtml($this->especificaciones->FldCaption());

			// orden
			$this->orden->EditAttrs["class"] = "form-control";
			$this->orden->EditCustomAttributes = "";
			$this->orden->EditValue = ew_HtmlEncode($this->orden->CurrentValue);
			$this->orden->PlaceHolder = ew_RemoveHtml($this->orden->FldCaption());

			// id copy
			$this->id_copy->EditAttrs["class"] = "form-control";
			$this->id_copy->EditCustomAttributes = "";
			$this->id_copy->EditValue = ew_HtmlEncode($this->id_copy->CurrentValue);
			$this->id_copy->PlaceHolder = ew_RemoveHtml($this->id_copy->FldCaption());
			if (strval($this->id_copy->EditValue) <> "" && is_numeric($this->id_copy->EditValue)) $this->id_copy->EditValue = ew_FormatNumber($this->id_copy->EditValue, -2, -1, -2, 0);

			// activo
			$this->activo->EditAttrs["class"] = "form-control";
			$this->activo->EditCustomAttributes = "";
			$this->activo->EditValue = $this->activo->Options(TRUE);

			// Add refer script
			// producto_id

			$this->producto_id->LinkCustomAttributes = "";
			$this->producto_id->HrefValue = "";

			// categoria
			$this->categoria->LinkCustomAttributes = "";
			$this->categoria->HrefValue = "";

			// especificaciones
			$this->especificaciones->LinkCustomAttributes = "";
			$this->especificaciones->HrefValue = "";

			// orden
			$this->orden->LinkCustomAttributes = "";
			$this->orden->HrefValue = "";

			// id copy
			$this->id_copy->LinkCustomAttributes = "";
			$this->id_copy->HrefValue = "";

			// activo
			$this->activo->LinkCustomAttributes = "";
			$this->activo->HrefValue = "";
		}
		if ($this->RowType == EW_ROWTYPE_ADD || $this->RowType == EW_ROWTYPE_EDIT || $this->RowType == EW_ROWTYPE_SEARCH) // Add/Edit/Search row
			$this->SetupFieldTitles();

		// Call Row Rendered event
		if ($this->RowType <> EW_ROWTYPE_AGGREGATEINIT)
			$this->Row_Rendered();
	}

	// Validate form
	function ValidateForm() {
		global $Language, $gsFormError;

		// Initialize form error message
		$gsFormError = "";

		// Check if validation required
		if (!EW_SERVER_VALIDATE)
			return ($gsFormError == "");
		if (!$this->producto_id->FldIsDetailKey && !is_null($this->producto_id->FormValue) && $this->producto_id->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->producto_id->FldCaption(), $this->producto_id->ReqErrMsg));
		}
		if (!$this->categoria->FldIsDetailKey && !is_null($this->categoria->FormValue) && $this->categoria->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->categoria->FldCaption(), $this->categoria->ReqErrMsg));
		}
		if (!$this->especificaciones->FldIsDetailKey && !is_null($this->especificaciones->FormValue) && $this->especificaciones->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->especificaciones->FldCaption(), $this->especificaciones->ReqErrMsg));
		}
		if (!$this->orden->FldIsDetailKey && !is_null($this->orden->FormValue) && $this->orden->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->orden->FldCaption(), $this->orden->ReqErrMsg));
		}
		if (!ew_CheckInteger($this->orden->FormValue)) {
			ew_AddMessage($gsFormError, $this->orden->FldErrMsg());
		}
		if (!ew_CheckNumber($this->id_copy->FormValue)) {
			ew_AddMessage($gsFormError, $this->id_copy->FldErrMsg());
		}
		if (!$this->activo->FldIsDetailKey && !is_null($this->activo->FormValue) && $this->activo->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->activo->FldCaption(), $this->activo->ReqErrMsg));
		}

		// Return validate result
		$ValidateForm = ($gsFormError == "");

		// Call Form_CustomValidate event
		$sFormCustomError = "";
		$ValidateForm = $ValidateForm && $this->Form_CustomValidate($sFormCustomError);
		if ($sFormCustomError <> "") {
			ew_AddMessage($gsFormError, $sFormCustomError);
		}
		return $ValidateForm;
	}

	// Add record
	function AddRow($rsold = NULL) {
		global $Language, $Security;
		$conn = &$this->Connection();

		// Load db values from rsold
		$this->LoadDbValues($rsold);
		if ($rsold) {
		}
		$rsnew = array();

		// producto_id
		$this->producto_id->SetDbValueDef($rsnew, $this->producto_id->CurrentValue, 0, FALSE);

		// categoria
		$this->categoria->SetDbValueDef($rsnew, $this->categoria->CurrentValue, "", FALSE);

		// especificaciones
		$this->especificaciones->SetDbValueDef($rsnew, $this->especificaciones->CurrentValue, "", FALSE);

		// orden
		$this->orden->SetDbValueDef($rsnew, $this->orden->CurrentValue, 0, strval($this->orden->CurrentValue) == "");

		// id copy
		$this->id_copy->SetDbValueDef($rsnew, $this->id_copy->CurrentValue, NULL, FALSE);

		// activo
		$this->activo->SetDbValueDef($rsnew, $this->activo->CurrentValue, 0, strval($this->activo->CurrentValue) == "");

		// Call Row Inserting event
		$rs = ($rsold == NULL) ? NULL : $rsold->fields;
		$bInsertRow = $this->Row_Inserting($rs, $rsnew);
		if ($bInsertRow) {
			$conn->raiseErrorFn = $GLOBALS["EW_ERROR_FN"];
			$AddRow = $this->Insert($rsnew);
			$conn->raiseErrorFn = '';
			if ($AddRow) {
			}
		} else {
			if ($this->getSuccessMessage() <> "" || $this->getFailureMessage() <> "") {

				// Use the message, do nothing
			} elseif ($this->CancelMessage <> "") {
				$this->setFailureMessage($this->CancelMessage);
				$this->CancelMessage = "";
			} else {
				$this->setFailureMessage($Language->Phrase("InsertCancelled"));
			}
			$AddRow = FALSE;
		}
		if ($AddRow) {

			// Call Row Inserted event
			$rs = ($rsold == NULL) ? NULL : $rsold->fields;
			$this->Row_Inserted($rs, $rsnew);
		}
		return $AddRow;
	}

	// Set up master/detail based on QueryString
	function SetupMasterParms() {
		$bValidMaster = FALSE;

		// Get the keys for master table
		if (isset($_GET[EW_TABLE_SHOW_MASTER])) {
			$sMasterTblVar = $_GET[EW_TABLE_SHOW_MASTER];
			if ($sMasterTblVar == "") {
				$bValidMaster = TRUE;
				$this->DbMasterFilter = "";
				$this->DbDetailFilter = "";
			}
			if ($sMasterTblVar == "productos") {
				$bValidMaster = TRUE;
				if (@$_GET["fk_id"] <> "") {
					$GLOBALS["productos"]->id->setQueryStringValue($_GET["fk_id"]);
					$this->producto_id->setQueryStringValue($GLOBALS["productos"]->id->QueryStringValue);
					$this->producto_id->setSessionValue($this->producto_id->QueryStringValue);
					if (!is_numeric($GLOBALS["productos"]->id->QueryStringValue)) $bValidMaster = FALSE;
				} else {
					$bValidMaster = FALSE;
				}
			}
		} elseif (isset($_POST[EW_TABLE_SHOW_MASTER])) {
			$sMasterTblVar = $_POST[EW_TABLE_SHOW_MASTER];
			if ($sMasterTblVar == "") {
				$bValidMaster = TRUE;
				$this->DbMasterFilter = "";
				$this->DbDetailFilter = "";
			}
			if ($sMasterTblVar == "productos") {
				$bValidMaster = TRUE;
				if (@$_POST["fk_id"] <> "") {
					$GLOBALS["productos"]->id->setFormValue($_POST["fk_id"]);
					$this->producto_id->setFormValue($GLOBALS["productos"]->id->FormValue);
					$this->producto_id->setSessionValue($this->producto_id->FormValue);
					if (!is_numeric($GLOBALS["productos"]->id->FormValue)) $bValidMaster = FALSE;
				} else {
					$bValidMaster = FALSE;
				}
			}
		}
		if ($bValidMaster) {

			// Save current master table
			$this->setCurrentMasterTable($sMasterTblVar);

			// Reset start record counter (new master key)
			$this->StartRec = 1;
			$this->setStartRecordNumber($this->StartRec);

			// Clear previous master key from Session
			if ($sMasterTblVar <> "productos") {
				if ($this->producto_id->CurrentValue == "") $this->producto_id->setSessionValue("");
			}
		}
		$this->DbMasterFilter = $this->GetMasterFilter(); // Get master filter
		$this->DbDetailFilter = $this->GetDetailFilter(); // Get detail filter
	}

	// Set up Breadcrumb
	function SetupBreadcrumb() {
		global $Breadcrumb, $Language;
		$Breadcrumb = new cBreadcrumb();
		$url = substr(ew_CurrentUrl(), strrpos(ew_CurrentUrl(), "/")+1);
		$Breadcrumb->Add("list", $this->TableVar, $this->AddMasterUrl("productoespecificacioneslist.php"), "", $this->TableVar, TRUE);
		$PageId = ($this->CurrentAction == "C") ? "Copy" : "Add";
		$Breadcrumb->Add("add", $PageId, $url);
	}

	// Setup lookup filters of a field
	function SetupLookupFilters($fld, $pageId = null) {
		global $gsLanguage;
		$pageId = $pageId ?: $this->PageID;
		switch ($fld->FldVar) {
		case "x_producto_id":
			$sSqlWrk = "";
			$sSqlWrk = "SELECT `id` AS `LinkFld`, `producto` AS `DispFld`, '' AS `Disp2Fld`, '' AS `Disp3Fld`, '' AS `Disp4Fld` FROM `productos`";
			$sWhereWrk = "";
			$this->producto_id->LookupFilters = array();
			$fld->LookupFilters += array("s" => $sSqlWrk, "d" => "", "f0" => '`id` IN ({filter_value})', "t0" => "3", "fn0" => "");
			$sSqlWrk = "";
			$this->Lookup_Selecting($this->producto_id, $sWhereWrk); // Call Lookup Selecting
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
if (!isset($productoespecificaciones_add)) $productoespecificaciones_add = new cproductoespecificaciones_add();

// Page init
$productoespecificaciones_add->Page_Init();

// Page main
$productoespecificaciones_add->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$productoespecificaciones_add->Page_Render();
?>
<?php include_once "header.php" ?>
<script type="text/javascript">

// Form object
var CurrentPageID = EW_PAGE_ID = "add";
var CurrentForm = fproductoespecificacionesadd = new ew_Form("fproductoespecificacionesadd", "add");

// Validate form
fproductoespecificacionesadd.Validate = function() {
	if (!this.ValidateRequired)
		return true; // Ignore validation
	var $ = jQuery, fobj = this.GetForm(), $fobj = $(fobj);
	if ($fobj.find("#a_confirm").val() == "F")
		return true;
	var elm, felm, uelm, addcnt = 0;
	var $k = $fobj.find("#" + this.FormKeyCountName); // Get key_count
	var rowcnt = ($k[0]) ? parseInt($k.val(), 10) : 1;
	var startcnt = (rowcnt == 0) ? 0 : 1; // Check rowcnt == 0 => Inline-Add
	var gridinsert = $fobj.find("#a_list").val() == "gridinsert";
	for (var i = startcnt; i <= rowcnt; i++) {
		var infix = ($k[0]) ? String(i) : "";
		$fobj.data("rowindex", infix);
			elm = this.GetElements("x" + infix + "_producto_id");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productoespecificaciones->producto_id->FldCaption(), $productoespecificaciones->producto_id->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_categoria");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productoespecificaciones->categoria->FldCaption(), $productoespecificaciones->categoria->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_especificaciones");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productoespecificaciones->especificaciones->FldCaption(), $productoespecificaciones->especificaciones->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_orden");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productoespecificaciones->orden->FldCaption(), $productoespecificaciones->orden->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_orden");
			if (elm && !ew_CheckInteger(elm.value))
				return this.OnError(elm, "<?php echo ew_JsEncode2($productoespecificaciones->orden->FldErrMsg()) ?>");
			elm = this.GetElements("x" + infix + "_id_copy");
			if (elm && !ew_CheckNumber(elm.value))
				return this.OnError(elm, "<?php echo ew_JsEncode2($productoespecificaciones->id_copy->FldErrMsg()) ?>");
			elm = this.GetElements("x" + infix + "_activo");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productoespecificaciones->activo->FldCaption(), $productoespecificaciones->activo->ReqErrMsg)) ?>");

			// Fire Form_CustomValidate event
			if (!this.Form_CustomValidate(fobj))
				return false;
	}

	// Process detail forms
	var dfs = $fobj.find("input[name='detailpage']").get();
	for (var i = 0; i < dfs.length; i++) {
		var df = dfs[i], val = df.value;
		if (val && ewForms[val])
			if (!ewForms[val].Validate())
				return false;
	}
	return true;
}

// Form_CustomValidate event
fproductoespecificacionesadd.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fproductoespecificacionesadd.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
fproductoespecificacionesadd.Lists["x_producto_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_producto","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"productos"};
fproductoespecificacionesadd.Lists["x_producto_id"].Data = "<?php echo $productoespecificaciones_add->producto_id->LookupFilterQuery(FALSE, "add") ?>";
fproductoespecificacionesadd.Lists["x_activo"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductoespecificacionesadd.Lists["x_activo"].Options = <?php echo json_encode($productoespecificaciones_add->activo->Options()) ?>;

// Form object for search
</script>
<script type="text/javascript">

// Write your client script here, no need to add script tags.
</script>
<?php $productoespecificaciones_add->ShowPageHeader(); ?>
<?php
$productoespecificaciones_add->ShowMessage();
?>
<form name="fproductoespecificacionesadd" id="fproductoespecificacionesadd" class="<?php echo $productoespecificaciones_add->FormClassName ?>" action="<?php echo ew_CurrentPage() ?>" method="post">
<?php if ($productoespecificaciones_add->CheckToken) { ?>
<input type="hidden" name="<?php echo EW_TOKEN_NAME ?>" value="<?php echo $productoespecificaciones_add->Token ?>">
<?php } ?>
<input type="hidden" name="t" value="productoespecificaciones">
<input type="hidden" name="a_add" id="a_add" value="A">
<input type="hidden" name="modal" value="<?php echo intval($productoespecificaciones_add->IsModal) ?>">
<?php if ($productoespecificaciones->getCurrentMasterTable() == "productos") { ?>
<input type="hidden" name="<?php echo EW_TABLE_SHOW_MASTER ?>" value="productos">
<input type="hidden" name="fk_id" value="<?php echo $productoespecificaciones->producto_id->getSessionValue() ?>">
<?php } ?>
<div class="ewAddDiv"><!-- page* -->
<?php if ($productoespecificaciones->producto_id->Visible) { // producto_id ?>
	<div id="r_producto_id" class="form-group">
		<label id="elh_productoespecificaciones_producto_id" for="x_producto_id" class="<?php echo $productoespecificaciones_add->LeftColumnClass ?>"><?php echo $productoespecificaciones->producto_id->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productoespecificaciones_add->RightColumnClass ?>"><div<?php echo $productoespecificaciones->producto_id->CellAttributes() ?>>
<?php if ($productoespecificaciones->producto_id->getSessionValue() <> "") { ?>
<span id="el_productoespecificaciones_producto_id">
<span<?php echo $productoespecificaciones->producto_id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoespecificaciones->producto_id->ViewValue ?></p></span>
</span>
<input type="hidden" id="x_producto_id" name="x_producto_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->producto_id->CurrentValue) ?>">
<?php } else { ?>
<span id="el_productoespecificaciones_producto_id">
<div class="ewDropdownList has-feedback">
	<span onclick="" class="form-control dropdown-toggle" aria-expanded="false"<?php if ($productoespecificaciones->producto_id->ReadOnly) { ?> readonly<?php } else { ?>data-toggle="dropdown"<?php } ?>>
		<?php echo $productoespecificaciones->producto_id->ViewValue ?>
	</span>
	<?php if (!$productoespecificaciones->producto_id->ReadOnly) { ?>
	<span class="glyphicon glyphicon-remove form-control-feedback ewDropdownListClear"></span>
	<span class="form-control-feedback"><span class="caret"></span></span>
	<?php } ?>
	<div id="dsl_x_producto_id" data-repeatcolumn="1" class="dropdown-menu">
		<div class="ewItems" style="position: relative; overflow-x: hidden;">
<?php echo $productoespecificaciones->producto_id->RadioButtonListHtml(TRUE, "x_producto_id") ?>
		</div>
	</div>
	<div id="tp_x_producto_id" class="ewTemplate"><input type="radio" data-table="productoespecificaciones" data-field="x_producto_id" data-value-separator="<?php echo $productoespecificaciones->producto_id->DisplayValueSeparatorAttribute() ?>" name="x_producto_id" id="x_producto_id" value="{value}"<?php echo $productoespecificaciones->producto_id->EditAttributes() ?>></div>
</div>
</span>
<?php } ?>
<?php echo $productoespecificaciones->producto_id->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productoespecificaciones->categoria->Visible) { // categoria ?>
	<div id="r_categoria" class="form-group">
		<label id="elh_productoespecificaciones_categoria" for="x_categoria" class="<?php echo $productoespecificaciones_add->LeftColumnClass ?>"><?php echo $productoespecificaciones->categoria->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productoespecificaciones_add->RightColumnClass ?>"><div<?php echo $productoespecificaciones->categoria->CellAttributes() ?>>
<span id="el_productoespecificaciones_categoria">
<input type="text" data-table="productoespecificaciones" data-field="x_categoria" name="x_categoria" id="x_categoria" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->categoria->EditValue ?>"<?php echo $productoespecificaciones->categoria->EditAttributes() ?>>
</span>
<?php echo $productoespecificaciones->categoria->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productoespecificaciones->especificaciones->Visible) { // especificaciones ?>
	<div id="r_especificaciones" class="form-group">
		<label id="elh_productoespecificaciones_especificaciones" for="x_especificaciones" class="<?php echo $productoespecificaciones_add->LeftColumnClass ?>"><?php echo $productoespecificaciones->especificaciones->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productoespecificaciones_add->RightColumnClass ?>"><div<?php echo $productoespecificaciones->especificaciones->CellAttributes() ?>>
<span id="el_productoespecificaciones_especificaciones">
<input type="text" data-table="productoespecificaciones" data-field="x_especificaciones" name="x_especificaciones" id="x_especificaciones" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->especificaciones->EditValue ?>"<?php echo $productoespecificaciones->especificaciones->EditAttributes() ?>>
</span>
<?php echo $productoespecificaciones->especificaciones->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productoespecificaciones->orden->Visible) { // orden ?>
	<div id="r_orden" class="form-group">
		<label id="elh_productoespecificaciones_orden" for="x_orden" class="<?php echo $productoespecificaciones_add->LeftColumnClass ?>"><?php echo $productoespecificaciones->orden->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productoespecificaciones_add->RightColumnClass ?>"><div<?php echo $productoespecificaciones->orden->CellAttributes() ?>>
<span id="el_productoespecificaciones_orden">
<input type="text" data-table="productoespecificaciones" data-field="x_orden" name="x_orden" id="x_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->orden->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->orden->EditValue ?>"<?php echo $productoespecificaciones->orden->EditAttributes() ?>>
</span>
<?php echo $productoespecificaciones->orden->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productoespecificaciones->id_copy->Visible) { // id copy ?>
	<div id="r_id_copy" class="form-group">
		<label id="elh_productoespecificaciones_id_copy" for="x_id_copy" class="<?php echo $productoespecificaciones_add->LeftColumnClass ?>"><?php echo $productoespecificaciones->id_copy->FldCaption() ?></label>
		<div class="<?php echo $productoespecificaciones_add->RightColumnClass ?>"><div<?php echo $productoespecificaciones->id_copy->CellAttributes() ?>>
<span id="el_productoespecificaciones_id_copy">
<input type="text" data-table="productoespecificaciones" data-field="x_id_copy" name="x_id_copy" id="x_id_copy" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->id_copy->EditValue ?>"<?php echo $productoespecificaciones->id_copy->EditAttributes() ?>>
</span>
<?php echo $productoespecificaciones->id_copy->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productoespecificaciones->activo->Visible) { // activo ?>
	<div id="r_activo" class="form-group">
		<label id="elh_productoespecificaciones_activo" for="x_activo" class="<?php echo $productoespecificaciones_add->LeftColumnClass ?>"><?php echo $productoespecificaciones->activo->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productoespecificaciones_add->RightColumnClass ?>"><div<?php echo $productoespecificaciones->activo->CellAttributes() ?>>
<span id="el_productoespecificaciones_activo">
<select data-table="productoespecificaciones" data-field="x_activo" data-value-separator="<?php echo $productoespecificaciones->activo->DisplayValueSeparatorAttribute() ?>" id="x_activo" name="x_activo"<?php echo $productoespecificaciones->activo->EditAttributes() ?>>
<?php echo $productoespecificaciones->activo->SelectOptionListHtml("x_activo") ?>
</select>
</span>
<?php echo $productoespecificaciones->activo->CustomMsg ?></div></div>
	</div>
<?php } ?>
</div><!-- /page* -->
<?php if (!$productoespecificaciones_add->IsModal) { ?>
<div class="form-group"><!-- buttons .form-group -->
	<div class="<?php echo $productoespecificaciones_add->OffsetColumnClass ?>"><!-- buttons offset -->
<button class="btn btn-primary ewButton" name="btnAction" id="btnAction" type="submit"><?php echo $Language->Phrase("AddBtn") ?></button>
<button class="btn btn-default ewButton" name="btnCancel" id="btnCancel" type="button" data-href="<?php echo $productoespecificaciones_add->getReturnUrl() ?>"><?php echo $Language->Phrase("CancelBtn") ?></button>
	</div><!-- /buttons offset -->
</div><!-- /buttons .form-group -->
<?php } ?>
</form>
<script type="text/javascript">
fproductoespecificacionesadd.Init();
</script>
<?php
$productoespecificaciones_add->ShowPageFooter();
if (EW_DEBUG_ENABLED)
	echo ew_DebugMsg();
?>
<script type="text/javascript">

// Write your table-specific startup script here
// document.write("page loaded");

</script>
<?php include_once "footer.php" ?>
<?php
$productoespecificaciones_add->Page_Terminate();
?>
