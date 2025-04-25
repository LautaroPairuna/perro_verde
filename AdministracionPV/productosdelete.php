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

$productos_delete = NULL; // Initialize page object first

class cproductos_delete extends cproductos {

	// Page ID
	var $PageID = 'delete';

	// Project ID
	var $ProjectID = '{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}';

	// Table name
	var $TableName = 'productos';

	// Page object name
	var $PageObjName = 'productos_delete';

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
			define("EW_PAGE_ID", 'delete', TRUE);

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

		// User profile
		$UserProfile = new cUserProfile();

		// Security
		$Security = new cAdvancedSecurity();
		if (!$Security->IsLoggedIn()) $Security->AutoLogin();
		$Security->LoadCurrentUserLevel($this->ProjectID . $this->TableName);
		if (!$Security->CanDelete()) {
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

		$this->CurrentAction = (@$_GET["a"] <> "") ? $_GET["a"] : @$_POST["a_list"]; // Set up current action
		$this->id->SetVisibility();
		$this->id->Visible = !$this->IsAdd() && !$this->IsCopy() && !$this->IsGridAdd();
		$this->producto->SetVisibility();
		$this->marca_id->SetVisibility();
		$this->rubro_id->SetVisibility();
		$this->moneda_id->SetVisibility();
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
			ew_SaveDebugMsg();
			header("Location: " . $url);
		}
		exit();
	}
	var $DbMasterFilter = "";
	var $DbDetailFilter = "";
	var $StartRec;
	var $TotalRecs = 0;
	var $RecCnt;
	var $RecKeys = array();
	var $Recordset;
	var $StartRowCnt = 1;
	var $RowCnt = 0;

	//
	// Page main
	//
	function Page_Main() {
		global $Language;

		// Set up Breadcrumb
		$this->SetupBreadcrumb();

		// Load key parameters
		$this->RecKeys = $this->GetRecordKeys(); // Load record keys
		$sFilter = $this->GetKeyFilter();
		if ($sFilter == "")
			$this->Page_Terminate("productoslist.php"); // Prevent SQL injection, return to list

		// Set up filter (SQL WHHERE clause) and get return SQL
		// SQL constructor in productos class, productosinfo.php

		$this->CurrentFilter = $sFilter;

		// Get action
		if (@$_POST["a_delete"] <> "") {
			$this->CurrentAction = $_POST["a_delete"];
		} elseif (@$_GET["a_delete"] == "1") {
			$this->CurrentAction = "D"; // Delete record directly
		} else {
			$this->CurrentAction = "I"; // Display record
		}
		if ($this->CurrentAction == "D") {
			$this->SendEmail = TRUE; // Send email on delete success
			if ($this->DeleteRows()) { // Delete rows
				if ($this->getSuccessMessage() == "")
					$this->setSuccessMessage($Language->Phrase("DeleteSuccess")); // Set up success message
				$this->Page_Terminate($this->getReturnUrl()); // Return to caller
			} else { // Delete failed
				$this->CurrentAction = "I"; // Display record
			}
		}
		if ($this->CurrentAction == "I") { // Load records for display
			if ($this->Recordset = $this->LoadRecordset())
				$this->TotalRecs = $this->Recordset->RecordCount(); // Get record count
			if ($this->TotalRecs <= 0) { // No record found, exit
				if ($this->Recordset)
					$this->Recordset->Close();
				$this->Page_Terminate("productoslist.php"); // Return to list
			}
		}
	}

	// Load recordset
	function LoadRecordset($offset = -1, $rowcnt = -1) {

		// Load List page SQL
		$sSql = $this->ListSQL();
		$conn = &$this->Connection();

		// Load recordset
		$dbtype = ew_GetConnectionType($this->DBID);
		if ($this->UseSelectLimit) {
			$conn->raiseErrorFn = $GLOBALS["EW_ERROR_FN"];
			if ($dbtype == "MSSQL") {
				$rs = $conn->SelectLimit($sSql, $rowcnt, $offset, array("_hasOrderBy" => trim($this->getOrderBy()) || trim($this->getSessionOrderBy())));
			} else {
				$rs = $conn->SelectLimit($sSql, $rowcnt, $offset);
			}
			$conn->raiseErrorFn = '';
		} else {
			$rs = ew_LoadRecordset($sSql, $conn);
		}

		// Call Recordset Selected event
		$this->Recordset_Selected($rs);
		return $rs;
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
		$this->producto->setDbValue($row['producto']);
		$this->marca_id->setDbValue($row['marca_id']);
		$this->rubro_id->setDbValue($row['rubro_id']);
		$this->moneda_id->setDbValue($row['moneda_id']);
		$this->descripcion->setDbValue($row['descripcion']);
		$this->foto->Upload->DbValue = $row['foto'];
		$this->foto->CurrentValue = $this->foto->Upload->DbValue;
		$this->precio->setDbValue($row['precio']);
		$this->stock->setDbValue($row['stock']);
		$this->destacado->setDbValue($row['destacado']);
		$this->visitas->setDbValue($row['visitas']);
		$this->activo->setDbValue($row['activo']);
	}

	// Return a row with default values
	function NewRow() {
		$row = array();
		$row['id'] = NULL;
		$row['producto'] = NULL;
		$row['marca_id'] = NULL;
		$row['rubro_id'] = NULL;
		$row['moneda_id'] = NULL;
		$row['descripcion'] = NULL;
		$row['foto'] = NULL;
		$row['precio'] = NULL;
		$row['stock'] = NULL;
		$row['destacado'] = NULL;
		$row['visitas'] = NULL;
		$row['activo'] = NULL;
		return $row;
	}

	// Load DbValue from recordset
	function LoadDbValues(&$rs) {
		if (!$rs || !is_array($rs) && $rs->EOF)
			return;
		$row = is_array($rs) ? $rs : $rs->fields;
		$this->id->DbValue = $row['id'];
		$this->producto->DbValue = $row['producto'];
		$this->marca_id->DbValue = $row['marca_id'];
		$this->rubro_id->DbValue = $row['rubro_id'];
		$this->moneda_id->DbValue = $row['moneda_id'];
		$this->descripcion->DbValue = $row['descripcion'];
		$this->foto->Upload->DbValue = $row['foto'];
		$this->precio->DbValue = $row['precio'];
		$this->stock->DbValue = $row['stock'];
		$this->destacado->DbValue = $row['destacado'];
		$this->visitas->DbValue = $row['visitas'];
		$this->activo->DbValue = $row['activo'];
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
		}

		// Call Row Rendered event
		if ($this->RowType <> EW_ROWTYPE_AGGREGATEINIT)
			$this->Row_Rendered();
	}

	//
	// Delete records based on current filter
	//
	function DeleteRows() {
		global $Language, $Security;
		$DeleteRows = TRUE;
		$sSql = $this->SQL();
		$conn = &$this->Connection();
		$conn->raiseErrorFn = $GLOBALS["EW_ERROR_FN"];
		$rs = $conn->Execute($sSql);
		$conn->raiseErrorFn = '';
		if ($rs === FALSE) {
			return FALSE;
		} elseif ($rs->EOF) {
			$this->setFailureMessage($Language->Phrase("NoRecord")); // No record found
			$rs->Close();
			return FALSE;
		}
		$rows = ($rs) ? $rs->GetRows() : array();
		$conn->BeginTrans();

		// Clone old rows
		$rsold = $rows;
		if ($rs)
			$rs->Close();

		// Call row deleting event
		if ($DeleteRows) {
			foreach ($rsold as $row) {
				$DeleteRows = $this->Row_Deleting($row);
				if (!$DeleteRows) break;
			}
		}
		if ($DeleteRows) {
			$sKey = "";
			foreach ($rsold as $row) {
				$sThisKey = "";
				if ($sThisKey <> "") $sThisKey .= $GLOBALS["EW_COMPOSITE_KEY_SEPARATOR"];
				$sThisKey .= $row['id'];
				$this->LoadDbValues($row);
				$this->foto->OldUploadPath = "../public/images/productos/";
				@unlink($this->foto->OldPhysicalUploadPath() . $row['foto']);
				$conn->raiseErrorFn = $GLOBALS["EW_ERROR_FN"];
				$DeleteRows = $this->Delete($row); // Delete
				$conn->raiseErrorFn = '';
				if ($DeleteRows === FALSE)
					break;
				if ($sKey <> "") $sKey .= ", ";
				$sKey .= $sThisKey;
			}
		}
		if (!$DeleteRows) {

			// Set up error message
			if ($this->getSuccessMessage() <> "" || $this->getFailureMessage() <> "") {

				// Use the message, do nothing
			} elseif ($this->CancelMessage <> "") {
				$this->setFailureMessage($this->CancelMessage);
				$this->CancelMessage = "";
			} else {
				$this->setFailureMessage($Language->Phrase("DeleteCancelled"));
			}
		}
		if ($DeleteRows) {
			$conn->CommitTrans(); // Commit the changes
		} else {
			$conn->RollbackTrans(); // Rollback changes
		}

		// Call Row Deleted event
		if ($DeleteRows) {
			foreach ($rsold as $row) {
				$this->Row_Deleted($row);
			}
		}
		return $DeleteRows;
	}

	// Set up Breadcrumb
	function SetupBreadcrumb() {
		global $Breadcrumb, $Language;
		$Breadcrumb = new cBreadcrumb();
		$url = substr(ew_CurrentUrl(), strrpos(ew_CurrentUrl(), "/")+1);
		$Breadcrumb->Add("list", $this->TableVar, $this->AddMasterUrl("productoslist.php"), "", $this->TableVar, TRUE);
		$PageId = "delete";
		$Breadcrumb->Add("delete", $PageId, $url);
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
}
?>
<?php ew_Header(FALSE) ?>
<?php

// Create page object
if (!isset($productos_delete)) $productos_delete = new cproductos_delete();

// Page init
$productos_delete->Page_Init();

// Page main
$productos_delete->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$productos_delete->Page_Render();
?>
<?php include_once "header.php" ?>
<script type="text/javascript">

// Form object
var CurrentPageID = EW_PAGE_ID = "delete";
var CurrentForm = fproductosdelete = new ew_Form("fproductosdelete", "delete");

// Form_CustomValidate event
fproductosdelete.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fproductosdelete.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
fproductosdelete.Lists["x_marca_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_marca","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgmarcas"};
fproductosdelete.Lists["x_marca_id"].Data = "<?php echo $productos_delete->marca_id->LookupFilterQuery(FALSE, "delete") ?>";
fproductosdelete.Lists["x_rubro_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_rubro","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgrubros"};
fproductosdelete.Lists["x_rubro_id"].Data = "<?php echo $productos_delete->rubro_id->LookupFilterQuery(FALSE, "delete") ?>";
fproductosdelete.Lists["x_moneda_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_moneda","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgmonedas"};
fproductosdelete.Lists["x_moneda_id"].Data = "<?php echo $productos_delete->moneda_id->LookupFilterQuery(FALSE, "delete") ?>";
fproductosdelete.Lists["x_destacado"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductosdelete.Lists["x_destacado"].Options = <?php echo json_encode($productos_delete->destacado->Options()) ?>;
fproductosdelete.Lists["x_activo"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductosdelete.Lists["x_activo"].Options = <?php echo json_encode($productos_delete->activo->Options()) ?>;

// Form object for search
</script>
<script type="text/javascript">

// Write your client script here, no need to add script tags.
</script>
<?php $productos_delete->ShowPageHeader(); ?>
<?php
$productos_delete->ShowMessage();
?>
<form name="fproductosdelete" id="fproductosdelete" class="form-inline ewForm ewDeleteForm" action="<?php echo ew_CurrentPage() ?>" method="post">
<?php if ($productos_delete->CheckToken) { ?>
<input type="hidden" name="<?php echo EW_TOKEN_NAME ?>" value="<?php echo $productos_delete->Token ?>">
<?php } ?>
<input type="hidden" name="t" value="productos">
<input type="hidden" name="a_delete" id="a_delete" value="D">
<?php foreach ($productos_delete->RecKeys as $key) { ?>
<?php $keyvalue = is_array($key) ? implode($EW_COMPOSITE_KEY_SEPARATOR, $key) : $key; ?>
<input type="hidden" name="key_m[]" value="<?php echo ew_HtmlEncode($keyvalue) ?>">
<?php } ?>
<div class="box ewBox ewGrid">
<div class="<?php if (ew_IsResponsiveLayout()) { ?>table-responsive <?php } ?>ewGridMiddlePanel">
<table class="table ewTable">
	<thead>
	<tr class="ewTableHeader">
<?php if ($productos->id->Visible) { // id ?>
		<th class="<?php echo $productos->id->HeaderCellClass() ?>"><span id="elh_productos_id" class="productos_id"><?php echo $productos->id->FldCaption() ?></span></th>
<?php } ?>
<?php if ($productos->producto->Visible) { // producto ?>
		<th class="<?php echo $productos->producto->HeaderCellClass() ?>"><span id="elh_productos_producto" class="productos_producto"><?php echo $productos->producto->FldCaption() ?></span></th>
<?php } ?>
<?php if ($productos->marca_id->Visible) { // marca_id ?>
		<th class="<?php echo $productos->marca_id->HeaderCellClass() ?>"><span id="elh_productos_marca_id" class="productos_marca_id"><?php echo $productos->marca_id->FldCaption() ?></span></th>
<?php } ?>
<?php if ($productos->rubro_id->Visible) { // rubro_id ?>
		<th class="<?php echo $productos->rubro_id->HeaderCellClass() ?>"><span id="elh_productos_rubro_id" class="productos_rubro_id"><?php echo $productos->rubro_id->FldCaption() ?></span></th>
<?php } ?>
<?php if ($productos->moneda_id->Visible) { // moneda_id ?>
		<th class="<?php echo $productos->moneda_id->HeaderCellClass() ?>"><span id="elh_productos_moneda_id" class="productos_moneda_id"><?php echo $productos->moneda_id->FldCaption() ?></span></th>
<?php } ?>
<?php if ($productos->precio->Visible) { // precio ?>
		<th class="<?php echo $productos->precio->HeaderCellClass() ?>"><span id="elh_productos_precio" class="productos_precio"><?php echo $productos->precio->FldCaption() ?></span></th>
<?php } ?>
<?php if ($productos->stock->Visible) { // stock ?>
		<th class="<?php echo $productos->stock->HeaderCellClass() ?>"><span id="elh_productos_stock" class="productos_stock"><?php echo $productos->stock->FldCaption() ?></span></th>
<?php } ?>
<?php if ($productos->destacado->Visible) { // destacado ?>
		<th class="<?php echo $productos->destacado->HeaderCellClass() ?>"><span id="elh_productos_destacado" class="productos_destacado"><?php echo $productos->destacado->FldCaption() ?></span></th>
<?php } ?>
<?php if ($productos->visitas->Visible) { // visitas ?>
		<th class="<?php echo $productos->visitas->HeaderCellClass() ?>"><span id="elh_productos_visitas" class="productos_visitas"><?php echo $productos->visitas->FldCaption() ?></span></th>
<?php } ?>
<?php if ($productos->activo->Visible) { // activo ?>
		<th class="<?php echo $productos->activo->HeaderCellClass() ?>"><span id="elh_productos_activo" class="productos_activo"><?php echo $productos->activo->FldCaption() ?></span></th>
<?php } ?>
	</tr>
	</thead>
	<tbody>
<?php
$productos_delete->RecCnt = 0;
$i = 0;
while (!$productos_delete->Recordset->EOF) {
	$productos_delete->RecCnt++;
	$productos_delete->RowCnt++;

	// Set row properties
	$productos->ResetAttrs();
	$productos->RowType = EW_ROWTYPE_VIEW; // View

	// Get the field contents
	$productos_delete->LoadRowValues($productos_delete->Recordset);

	// Render row
	$productos_delete->RenderRow();
?>
	<tr<?php echo $productos->RowAttributes() ?>>
<?php if ($productos->id->Visible) { // id ?>
		<td<?php echo $productos->id->CellAttributes() ?>>
<span id="el<?php echo $productos_delete->RowCnt ?>_productos_id" class="productos_id">
<span<?php echo $productos->id->ViewAttributes() ?>>
<?php echo $productos->id->ListViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($productos->producto->Visible) { // producto ?>
		<td<?php echo $productos->producto->CellAttributes() ?>>
<span id="el<?php echo $productos_delete->RowCnt ?>_productos_producto" class="productos_producto">
<span<?php echo $productos->producto->ViewAttributes() ?>>
<?php echo $productos->producto->ListViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($productos->marca_id->Visible) { // marca_id ?>
		<td<?php echo $productos->marca_id->CellAttributes() ?>>
<span id="el<?php echo $productos_delete->RowCnt ?>_productos_marca_id" class="productos_marca_id">
<span<?php echo $productos->marca_id->ViewAttributes() ?>>
<?php echo $productos->marca_id->ListViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($productos->rubro_id->Visible) { // rubro_id ?>
		<td<?php echo $productos->rubro_id->CellAttributes() ?>>
<span id="el<?php echo $productos_delete->RowCnt ?>_productos_rubro_id" class="productos_rubro_id">
<span<?php echo $productos->rubro_id->ViewAttributes() ?>>
<?php echo $productos->rubro_id->ListViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($productos->moneda_id->Visible) { // moneda_id ?>
		<td<?php echo $productos->moneda_id->CellAttributes() ?>>
<span id="el<?php echo $productos_delete->RowCnt ?>_productos_moneda_id" class="productos_moneda_id">
<span<?php echo $productos->moneda_id->ViewAttributes() ?>>
<?php echo $productos->moneda_id->ListViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($productos->precio->Visible) { // precio ?>
		<td<?php echo $productos->precio->CellAttributes() ?>>
<span id="el<?php echo $productos_delete->RowCnt ?>_productos_precio" class="productos_precio">
<span<?php echo $productos->precio->ViewAttributes() ?>>
<?php echo $productos->precio->ListViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($productos->stock->Visible) { // stock ?>
		<td<?php echo $productos->stock->CellAttributes() ?>>
<span id="el<?php echo $productos_delete->RowCnt ?>_productos_stock" class="productos_stock">
<span<?php echo $productos->stock->ViewAttributes() ?>>
<?php echo $productos->stock->ListViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($productos->destacado->Visible) { // destacado ?>
		<td<?php echo $productos->destacado->CellAttributes() ?>>
<span id="el<?php echo $productos_delete->RowCnt ?>_productos_destacado" class="productos_destacado">
<span<?php echo $productos->destacado->ViewAttributes() ?>>
<?php echo $productos->destacado->ListViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($productos->visitas->Visible) { // visitas ?>
		<td<?php echo $productos->visitas->CellAttributes() ?>>
<span id="el<?php echo $productos_delete->RowCnt ?>_productos_visitas" class="productos_visitas">
<span<?php echo $productos->visitas->ViewAttributes() ?>>
<?php echo $productos->visitas->ListViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($productos->activo->Visible) { // activo ?>
		<td<?php echo $productos->activo->CellAttributes() ?>>
<span id="el<?php echo $productos_delete->RowCnt ?>_productos_activo" class="productos_activo">
<span<?php echo $productos->activo->ViewAttributes() ?>>
<?php echo $productos->activo->ListViewValue() ?></span>
</span>
</td>
<?php } ?>
	</tr>
<?php
	$productos_delete->Recordset->MoveNext();
}
$productos_delete->Recordset->Close();
?>
</tbody>
</table>
</div>
</div>
<div>
<button class="btn btn-primary ewButton" name="btnAction" id="btnAction" type="submit"><?php echo $Language->Phrase("DeleteBtn") ?></button>
<button class="btn btn-default ewButton" name="btnCancel" id="btnCancel" type="button" data-href="<?php echo $productos_delete->getReturnUrl() ?>"><?php echo $Language->Phrase("CancelBtn") ?></button>
</div>
</form>
<script type="text/javascript">
fproductosdelete.Init();
</script>
<?php
$productos_delete->ShowPageFooter();
if (EW_DEBUG_ENABLED)
	echo ew_DebugMsg();
?>
<script type="text/javascript">

// Write your table-specific startup script here
// document.write("page loaded");

</script>
<?php include_once "footer.php" ?>
<?php
$productos_delete->Page_Terminate();
?>
