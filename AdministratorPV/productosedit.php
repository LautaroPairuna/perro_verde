<?php
if (session_id() == "") session_start(); // Init session data
ob_start(); // Turn on output buffering
?>
<?php include_once "ewcfg14.php" ?>
<?php include_once ((EW_USE_ADODB) ? "adodb5/adodb.inc.php" : "ewmysql14.php") ?>
<?php include_once "phpfn14.php" ?>
<?php include_once "productosinfo.php" ?>
<?php include_once "productoespecificacionesgridcls.php" ?>
<?php include_once "productofotosgridcls.php" ?>
<?php include_once "productoversionesgridcls.php" ?>
<?php include_once "userfn14.php" ?>
<?php

//
// Page class
//

$productos_edit = NULL; // Initialize page object first

class cproductos_edit extends cproductos {

	// Page ID
	var $PageID = 'edit';

	// Project ID
	var $ProjectID = '{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}';

	// Table name
	var $TableName = 'productos';

	// Page object name
	var $PageObjName = 'productos_edit';

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
			define("EW_PAGE_ID", 'edit', TRUE);

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
		if (!$Security->CanEdit()) {
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

		// Process auto fill
		if (@$_POST["ajax"] == "autofill") {

			// Process auto fill for detail table 'productoespecificaciones'
			if (@$_POST["grid"] == "fproductoespecificacionesgrid") {
				if (!isset($GLOBALS["productoespecificaciones_grid"])) $GLOBALS["productoespecificaciones_grid"] = new cproductoespecificaciones_grid;
				$GLOBALS["productoespecificaciones_grid"]->Page_Init();
				$this->Page_Terminate();
				exit();
			}

			// Process auto fill for detail table 'productofotos'
			if (@$_POST["grid"] == "fproductofotosgrid") {
				if (!isset($GLOBALS["productofotos_grid"])) $GLOBALS["productofotos_grid"] = new cproductofotos_grid;
				$GLOBALS["productofotos_grid"]->Page_Init();
				$this->Page_Terminate();
				exit();
			}

			// Process auto fill for detail table 'productoversiones'
			if (@$_POST["grid"] == "fproductoversionesgrid") {
				if (!isset($GLOBALS["productoversiones_grid"])) $GLOBALS["productoversiones_grid"] = new cproductoversiones_grid;
				$GLOBALS["productoversiones_grid"]->Page_Init();
				$this->Page_Terminate();
				exit();
			}
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
	var $FormClassName = "form-horizontal ewForm ewEditForm";
	var $IsModal = FALSE;
	var $IsMobileOrModal = FALSE;
	var $DbMasterFilter;
	var $DbDetailFilter;

	//
	// Page main
	//
	function Page_Main() {
		global $objForm, $Language, $gsFormError, $gbSkipHeaderFooter;

		// Check modal
		if ($this->IsModal)
			$gbSkipHeaderFooter = TRUE;
		$this->IsMobileOrModal = ew_IsMobile() || $this->IsModal;
		$this->FormClassName = "ewForm ewEditForm form-horizontal";
		$sReturnUrl = "";
		$loaded = FALSE;
		$postBack = FALSE;

		// Set up current action and primary key
		if (@$_POST["a_edit"] <> "") {
			$this->CurrentAction = $_POST["a_edit"]; // Get action code
			if ($this->CurrentAction <> "I") // Not reload record, handle as postback
				$postBack = TRUE;

			// Load key from Form
			if ($objForm->HasValue("x_id")) {
				$this->id->setFormValue($objForm->GetValue("x_id"));
			}
		} else {
			$this->CurrentAction = "I"; // Default action is display

			// Load key from QueryString
			$loadByQuery = FALSE;
			if (isset($_GET["id"])) {
				$this->id->setQueryStringValue($_GET["id"]);
				$loadByQuery = TRUE;
			} else {
				$this->id->CurrentValue = NULL;
			}
		}

		// Load current record
		$loaded = $this->LoadRow();

		// Process form if post back
		if ($postBack) {
			$this->LoadFormValues(); // Get form values

			// Set up detail parameters
			$this->SetupDetailParms();
		}

		// Validate form if post back
		if ($postBack) {
			if (!$this->ValidateForm()) {
				$this->CurrentAction = ""; // Form error, reset action
				$this->setFailureMessage($gsFormError);
				$this->EventCancelled = TRUE; // Event cancelled
				$this->RestoreFormValues();
			}
		}

		// Perform current action
		switch ($this->CurrentAction) {
			case "I": // Get a record to display
				if (!$loaded) { // Load record based on key
					if ($this->getFailureMessage() == "") $this->setFailureMessage($Language->Phrase("NoRecord")); // No record found
					$this->Page_Terminate("productoslist.php"); // No matching record, return to list
				}

				// Set up detail parameters
				$this->SetupDetailParms();
				break;
			Case "U": // Update
				if ($this->getCurrentDetailTable() <> "") // Master/detail edit
					$sReturnUrl = $this->GetViewUrl(EW_TABLE_SHOW_DETAIL . "=" . $this->getCurrentDetailTable()); // Master/Detail view page
				else
					$sReturnUrl = $this->getReturnUrl();
				if (ew_GetPageName($sReturnUrl) == "productoslist.php")
					$sReturnUrl = $this->AddMasterUrl($sReturnUrl); // List page, return to List page with correct master key if necessary
				$this->SendEmail = TRUE; // Send email on update success
				if ($this->EditRow()) { // Update record based on key
					if ($this->getSuccessMessage() == "")
						$this->setSuccessMessage($Language->Phrase("UpdateSuccess")); // Update success
					$this->Page_Terminate($sReturnUrl); // Return to caller
				} elseif ($this->getFailureMessage() == $Language->Phrase("NoRecord")) {
					$this->Page_Terminate($sReturnUrl); // Return to caller
				} else {
					$this->EventCancelled = TRUE; // Event cancelled
					$this->RestoreFormValues(); // Restore form values if update failed

					// Set up detail parameters
					$this->SetupDetailParms();
				}
		}

		// Set up Breadcrumb
		$this->SetupBreadcrumb();

		// Render the record
		$this->RowType = EW_ROWTYPE_EDIT; // Render as Edit
		$this->ResetAttrs();
		$this->RenderRow();
	}

	// Set up starting record parameters
	function SetupStartRec() {
		if ($this->DisplayRecs == 0)
			return;
		if ($this->IsPageRequest()) { // Validate request
			if (@$_GET[EW_TABLE_START_REC] <> "") { // Check for "start" parameter
				$this->StartRec = $_GET[EW_TABLE_START_REC];
				$this->setStartRecordNumber($this->StartRec);
			} elseif (@$_GET[EW_TABLE_PAGE_NO] <> "") {
				$PageNo = $_GET[EW_TABLE_PAGE_NO];
				if (is_numeric($PageNo)) {
					$this->StartRec = ($PageNo-1)*$this->DisplayRecs+1;
					if ($this->StartRec <= 0) {
						$this->StartRec = 1;
					} elseif ($this->StartRec >= intval(($this->TotalRecs-1)/$this->DisplayRecs)*$this->DisplayRecs+1) {
						$this->StartRec = intval(($this->TotalRecs-1)/$this->DisplayRecs)*$this->DisplayRecs+1;
					}
					$this->setStartRecordNumber($this->StartRec);
				}
			}
		}
		$this->StartRec = $this->getStartRecordNumber();

		// Check if correct start record counter
		if (!is_numeric($this->StartRec) || $this->StartRec == "") { // Avoid invalid start record counter
			$this->StartRec = 1; // Reset start record counter
			$this->setStartRecordNumber($this->StartRec);
		} elseif (intval($this->StartRec) > intval($this->TotalRecs)) { // Avoid starting record > total records
			$this->StartRec = intval(($this->TotalRecs-1)/$this->DisplayRecs)*$this->DisplayRecs+1; // Point to last page first record
			$this->setStartRecordNumber($this->StartRec);
		} elseif (($this->StartRec-1) % $this->DisplayRecs <> 0) {
			$this->StartRec = intval(($this->StartRec-1)/$this->DisplayRecs)*$this->DisplayRecs+1; // Point to page boundary
			$this->setStartRecordNumber($this->StartRec);
		}
	}

	// Get upload files
	function GetUploadFiles() {
		global $objForm, $Language;

		// Get upload data
		$this->foto->Upload->Index = $objForm->Index;
		$this->foto->Upload->UploadFile();
		$this->foto->CurrentValue = $this->foto->Upload->FileName;
	}

	// Load form values
	function LoadFormValues() {

		// Load from form
		global $objForm;
		$this->GetUploadFiles(); // Get upload files
		if (!$this->id->FldIsDetailKey)
			$this->id->setFormValue($objForm->GetValue("x_id"));
		if (!$this->producto->FldIsDetailKey) {
			$this->producto->setFormValue($objForm->GetValue("x_producto"));
		}
		if (!$this->marca_id->FldIsDetailKey) {
			$this->marca_id->setFormValue($objForm->GetValue("x_marca_id"));
		}
		if (!$this->rubro_id->FldIsDetailKey) {
			$this->rubro_id->setFormValue($objForm->GetValue("x_rubro_id"));
		}
		if (!$this->moneda_id->FldIsDetailKey) {
			$this->moneda_id->setFormValue($objForm->GetValue("x_moneda_id"));
		}
		if (!$this->descripcion->FldIsDetailKey) {
			$this->descripcion->setFormValue($objForm->GetValue("x_descripcion"));
		}
		if (!$this->precio->FldIsDetailKey) {
			$this->precio->setFormValue($objForm->GetValue("x_precio"));
		}
		if (!$this->stock->FldIsDetailKey) {
			$this->stock->setFormValue($objForm->GetValue("x_stock"));
		}
		if (!$this->destacado->FldIsDetailKey) {
			$this->destacado->setFormValue($objForm->GetValue("x_destacado"));
		}
		if (!$this->visitas->FldIsDetailKey) {
			$this->visitas->setFormValue($objForm->GetValue("x_visitas"));
		}
		if (!$this->activo->FldIsDetailKey) {
			$this->activo->setFormValue($objForm->GetValue("x_activo"));
		}
	}

	// Restore form values
	function RestoreFormValues() {
		global $objForm;
		$this->id->CurrentValue = $this->id->FormValue;
		$this->producto->CurrentValue = $this->producto->FormValue;
		$this->marca_id->CurrentValue = $this->marca_id->FormValue;
		$this->rubro_id->CurrentValue = $this->rubro_id->FormValue;
		$this->moneda_id->CurrentValue = $this->moneda_id->FormValue;
		$this->descripcion->CurrentValue = $this->descripcion->FormValue;
		$this->precio->CurrentValue = $this->precio->FormValue;
		$this->stock->CurrentValue = $this->stock->FormValue;
		$this->destacado->CurrentValue = $this->destacado->FormValue;
		$this->visitas->CurrentValue = $this->visitas->FormValue;
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
		} elseif ($this->RowType == EW_ROWTYPE_EDIT) { // Edit row

			// id
			$this->id->EditAttrs["class"] = "form-control";
			$this->id->EditCustomAttributes = "";
			$this->id->EditValue = $this->id->CurrentValue;
			$this->id->ViewCustomAttributes = "";

			// producto
			$this->producto->EditAttrs["class"] = "form-control";
			$this->producto->EditCustomAttributes = "";
			$this->producto->EditValue = ew_HtmlEncode($this->producto->CurrentValue);
			$this->producto->PlaceHolder = ew_RemoveHtml($this->producto->FldCaption());

			// marca_id
			$this->marca_id->EditCustomAttributes = "";
			if (trim(strval($this->marca_id->CurrentValue)) == "") {
				$sFilterWrk = "0=1";
			} else {
				$sFilterWrk = "`id`" . ew_SearchString("=", $this->marca_id->CurrentValue, EW_DATATYPE_NUMBER, "");
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
				$this->marca_id->ViewValue = $this->marca_id->DisplayValue($arwrk);
			} else {
				$this->marca_id->ViewValue = $Language->Phrase("PleaseSelect");
			}
			$arwrk = ($rswrk) ? $rswrk->GetRows() : array();
			if ($rswrk) $rswrk->Close();
			$this->marca_id->EditValue = $arwrk;

			// rubro_id
			$this->rubro_id->EditCustomAttributes = "";
			if (trim(strval($this->rubro_id->CurrentValue)) == "") {
				$sFilterWrk = "0=1";
			} else {
				$sFilterWrk = "`id`" . ew_SearchString("=", $this->rubro_id->CurrentValue, EW_DATATYPE_NUMBER, "");
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
				$this->rubro_id->ViewValue = $this->rubro_id->DisplayValue($arwrk);
			} else {
				$this->rubro_id->ViewValue = $Language->Phrase("PleaseSelect");
			}
			$arwrk = ($rswrk) ? $rswrk->GetRows() : array();
			if ($rswrk) $rswrk->Close();
			$this->rubro_id->EditValue = $arwrk;

			// moneda_id
			$this->moneda_id->EditCustomAttributes = "";
			if (trim(strval($this->moneda_id->CurrentValue)) == "") {
				$sFilterWrk = "0=1";
			} else {
				$sFilterWrk = "`id`" . ew_SearchString("=", $this->moneda_id->CurrentValue, EW_DATATYPE_NUMBER, "");
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
				$this->moneda_id->ViewValue = $this->moneda_id->DisplayValue($arwrk);
			} else {
				$this->moneda_id->ViewValue = $Language->Phrase("PleaseSelect");
			}
			$arwrk = ($rswrk) ? $rswrk->GetRows() : array();
			if ($rswrk) $rswrk->Close();
			$this->moneda_id->EditValue = $arwrk;

			// descripcion
			$this->descripcion->EditAttrs["class"] = "form-control";
			$this->descripcion->EditCustomAttributes = "";
			$this->descripcion->EditValue = ew_HtmlEncode($this->descripcion->CurrentValue);
			$this->descripcion->PlaceHolder = ew_RemoveHtml($this->descripcion->FldCaption());

			// foto
			$this->foto->EditAttrs["class"] = "form-control";
			$this->foto->EditCustomAttributes = "";
			$this->foto->UploadPath = "../public/images/productos/";
			if (!ew_Empty($this->foto->Upload->DbValue)) {
				$this->foto->EditValue = $this->foto->Upload->DbValue;
			} else {
				$this->foto->EditValue = "";
			}
			if (!ew_Empty($this->foto->CurrentValue))
				$this->foto->Upload->FileName = $this->foto->CurrentValue;
			if ($this->CurrentAction == "I" && !$this->EventCancelled) ew_RenderUploadField($this->foto);

			// precio
			$this->precio->EditAttrs["class"] = "form-control";
			$this->precio->EditCustomAttributes = "";
			$this->precio->EditValue = ew_HtmlEncode($this->precio->CurrentValue);
			$this->precio->PlaceHolder = ew_RemoveHtml($this->precio->FldCaption());
			if (strval($this->precio->EditValue) <> "" && is_numeric($this->precio->EditValue)) $this->precio->EditValue = ew_FormatNumber($this->precio->EditValue, -2, -1, -2, 0);

			// stock
			$this->stock->EditAttrs["class"] = "form-control";
			$this->stock->EditCustomAttributes = "";
			$this->stock->EditValue = ew_HtmlEncode($this->stock->CurrentValue);
			$this->stock->PlaceHolder = ew_RemoveHtml($this->stock->FldCaption());

			// destacado
			$this->destacado->EditAttrs["class"] = "form-control";
			$this->destacado->EditCustomAttributes = "";
			$this->destacado->EditValue = $this->destacado->Options(TRUE);

			// visitas
			$this->visitas->EditAttrs["class"] = "form-control";
			$this->visitas->EditCustomAttributes = "";
			$this->visitas->EditValue = $this->visitas->CurrentValue;
			$this->visitas->ViewCustomAttributes = "";

			// activo
			$this->activo->EditAttrs["class"] = "form-control";
			$this->activo->EditCustomAttributes = "";
			$this->activo->EditValue = $this->activo->Options(TRUE);

			// Edit refer script
			// id

			$this->id->LinkCustomAttributes = "";
			$this->id->HrefValue = "";

			// producto
			$this->producto->LinkCustomAttributes = "";
			$this->producto->HrefValue = "";

			// marca_id
			$this->marca_id->LinkCustomAttributes = "";
			$this->marca_id->HrefValue = "";

			// rubro_id
			$this->rubro_id->LinkCustomAttributes = "";
			$this->rubro_id->HrefValue = "";

			// moneda_id
			$this->moneda_id->LinkCustomAttributes = "";
			$this->moneda_id->HrefValue = "";

			// descripcion
			$this->descripcion->LinkCustomAttributes = "";
			$this->descripcion->HrefValue = "";

			// foto
			$this->foto->LinkCustomAttributes = "";
			$this->foto->HrefValue = "";
			$this->foto->HrefValue2 = $this->foto->UploadPath . $this->foto->Upload->DbValue;

			// precio
			$this->precio->LinkCustomAttributes = "";
			$this->precio->HrefValue = "";

			// stock
			$this->stock->LinkCustomAttributes = "";
			$this->stock->HrefValue = "";

			// destacado
			$this->destacado->LinkCustomAttributes = "";
			$this->destacado->HrefValue = "";

			// visitas
			$this->visitas->LinkCustomAttributes = "";
			$this->visitas->HrefValue = "";
			$this->visitas->TooltipValue = "";

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
		if (!$this->producto->FldIsDetailKey && !is_null($this->producto->FormValue) && $this->producto->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->producto->FldCaption(), $this->producto->ReqErrMsg));
		}
		if (!$this->marca_id->FldIsDetailKey && !is_null($this->marca_id->FormValue) && $this->marca_id->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->marca_id->FldCaption(), $this->marca_id->ReqErrMsg));
		}
		if (!$this->rubro_id->FldIsDetailKey && !is_null($this->rubro_id->FormValue) && $this->rubro_id->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->rubro_id->FldCaption(), $this->rubro_id->ReqErrMsg));
		}
		if (!$this->moneda_id->FldIsDetailKey && !is_null($this->moneda_id->FormValue) && $this->moneda_id->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->moneda_id->FldCaption(), $this->moneda_id->ReqErrMsg));
		}
		if (!$this->precio->FldIsDetailKey && !is_null($this->precio->FormValue) && $this->precio->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->precio->FldCaption(), $this->precio->ReqErrMsg));
		}
		if (!ew_CheckNumber($this->precio->FormValue)) {
			ew_AddMessage($gsFormError, $this->precio->FldErrMsg());
		}
		if (!$this->stock->FldIsDetailKey && !is_null($this->stock->FormValue) && $this->stock->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->stock->FldCaption(), $this->stock->ReqErrMsg));
		}
		if (!ew_CheckInteger($this->stock->FormValue)) {
			ew_AddMessage($gsFormError, $this->stock->FldErrMsg());
		}
		if (!$this->destacado->FldIsDetailKey && !is_null($this->destacado->FormValue) && $this->destacado->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->destacado->FldCaption(), $this->destacado->ReqErrMsg));
		}
		if (!$this->activo->FldIsDetailKey && !is_null($this->activo->FormValue) && $this->activo->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->activo->FldCaption(), $this->activo->ReqErrMsg));
		}

		// Validate detail grid
		$DetailTblVar = explode(",", $this->getCurrentDetailTable());
		if (in_array("productoespecificaciones", $DetailTblVar) && $GLOBALS["productoespecificaciones"]->DetailEdit) {
			if (!isset($GLOBALS["productoespecificaciones_grid"])) $GLOBALS["productoespecificaciones_grid"] = new cproductoespecificaciones_grid(); // get detail page object
			$GLOBALS["productoespecificaciones_grid"]->ValidateGridForm();
		}
		if (in_array("productofotos", $DetailTblVar) && $GLOBALS["productofotos"]->DetailEdit) {
			if (!isset($GLOBALS["productofotos_grid"])) $GLOBALS["productofotos_grid"] = new cproductofotos_grid(); // get detail page object
			$GLOBALS["productofotos_grid"]->ValidateGridForm();
		}
		if (in_array("productoversiones", $DetailTblVar) && $GLOBALS["productoversiones"]->DetailEdit) {
			if (!isset($GLOBALS["productoversiones_grid"])) $GLOBALS["productoversiones_grid"] = new cproductoversiones_grid(); // get detail page object
			$GLOBALS["productoversiones_grid"]->ValidateGridForm();
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

	// Update record based on key values
	function EditRow() {
		global $Security, $Language;
		$sFilter = $this->KeyFilter();
		$sFilter = $this->ApplyUserIDFilters($sFilter);
		$conn = &$this->Connection();
		$this->CurrentFilter = $sFilter;
		$sSql = $this->SQL();
		$conn->raiseErrorFn = $GLOBALS["EW_ERROR_FN"];
		$rs = $conn->Execute($sSql);
		$conn->raiseErrorFn = '';
		if ($rs === FALSE)
			return FALSE;
		if ($rs->EOF) {
			$this->setFailureMessage($Language->Phrase("NoRecord")); // Set no record message
			$EditRow = FALSE; // Update Failed
		} else {

			// Begin transaction
			if ($this->getCurrentDetailTable() <> "")
				$conn->BeginTrans();

			// Save old values
			$rsold = &$rs->fields;
			$this->LoadDbValues($rsold);
			$this->foto->OldUploadPath = "../public/images/productos/";
			$this->foto->UploadPath = $this->foto->OldUploadPath;
			$rsnew = array();

			// producto
			$this->producto->SetDbValueDef($rsnew, $this->producto->CurrentValue, "", $this->producto->ReadOnly);

			// marca_id
			$this->marca_id->SetDbValueDef($rsnew, $this->marca_id->CurrentValue, 0, $this->marca_id->ReadOnly);

			// rubro_id
			$this->rubro_id->SetDbValueDef($rsnew, $this->rubro_id->CurrentValue, 0, $this->rubro_id->ReadOnly);

			// moneda_id
			$this->moneda_id->SetDbValueDef($rsnew, $this->moneda_id->CurrentValue, 0, $this->moneda_id->ReadOnly);

			// descripcion
			$this->descripcion->SetDbValueDef($rsnew, $this->descripcion->CurrentValue, NULL, $this->descripcion->ReadOnly);

			// foto
			if ($this->foto->Visible && !$this->foto->ReadOnly && !$this->foto->Upload->KeepFile) {
				$this->foto->Upload->DbValue = $rsold['foto']; // Get original value
				if ($this->foto->Upload->FileName == "") {
					$rsnew['foto'] = NULL;
				} else {
					$rsnew['foto'] = $this->foto->Upload->FileName;
				}
			}

			// precio
			$this->precio->SetDbValueDef($rsnew, $this->precio->CurrentValue, 0, $this->precio->ReadOnly);

			// stock
			$this->stock->SetDbValueDef($rsnew, $this->stock->CurrentValue, 0, $this->stock->ReadOnly);

			// destacado
			$this->destacado->SetDbValueDef($rsnew, $this->destacado->CurrentValue, 0, $this->destacado->ReadOnly);

			// activo
			$this->activo->SetDbValueDef($rsnew, $this->activo->CurrentValue, 0, $this->activo->ReadOnly);
			if ($this->foto->Visible && !$this->foto->Upload->KeepFile) {
				$this->foto->UploadPath = "../public/images/productos/";
				if (!ew_Empty($this->foto->Upload->Value)) {
					if ($this->foto->Upload->FileName == $this->foto->Upload->DbValue) { // Overwrite if same file name
						$this->foto->Upload->DbValue = ""; // No need to delete any more
					} else {
						$rsnew['foto'] = ew_UploadFileNameEx($this->foto->PhysicalUploadPath(), $rsnew['foto']); // Get new file name
					}
				}
			}

			// Call Row Updating event
			$bUpdateRow = $this->Row_Updating($rsold, $rsnew);
			if ($bUpdateRow) {
				$conn->raiseErrorFn = $GLOBALS["EW_ERROR_FN"];
				if (count($rsnew) > 0)
					$EditRow = $this->Update($rsnew, "", $rsold);
				else
					$EditRow = TRUE; // No field to update
				$conn->raiseErrorFn = '';
				if ($EditRow) {
					if ($this->foto->Visible && !$this->foto->Upload->KeepFile) {
						if (!ew_Empty($this->foto->Upload->Value)) {
							if (!$this->foto->Upload->SaveToFile($rsnew['foto'], TRUE)) {
								$this->setFailureMessage($Language->Phrase("UploadErrMsg7"));
								return FALSE;
							}
						}
						if ($this->foto->Upload->DbValue <> "")
							@unlink($this->foto->OldPhysicalUploadPath() . $this->foto->Upload->DbValue);
					}
				}

				// Update detail records
				$DetailTblVar = explode(",", $this->getCurrentDetailTable());
				if ($EditRow) {
					if (in_array("productoespecificaciones", $DetailTblVar) && $GLOBALS["productoespecificaciones"]->DetailEdit) {
						if (!isset($GLOBALS["productoespecificaciones_grid"])) $GLOBALS["productoespecificaciones_grid"] = new cproductoespecificaciones_grid(); // Get detail page object
						$EditRow = $GLOBALS["productoespecificaciones_grid"]->GridUpdate();
					}
				}
				if ($EditRow) {
					if (in_array("productofotos", $DetailTblVar) && $GLOBALS["productofotos"]->DetailEdit) {
						if (!isset($GLOBALS["productofotos_grid"])) $GLOBALS["productofotos_grid"] = new cproductofotos_grid(); // Get detail page object
						$EditRow = $GLOBALS["productofotos_grid"]->GridUpdate();
					}
				}
				if ($EditRow) {
					if (in_array("productoversiones", $DetailTblVar) && $GLOBALS["productoversiones"]->DetailEdit) {
						if (!isset($GLOBALS["productoversiones_grid"])) $GLOBALS["productoversiones_grid"] = new cproductoversiones_grid(); // Get detail page object
						$EditRow = $GLOBALS["productoversiones_grid"]->GridUpdate();
					}
				}

				// Commit/Rollback transaction
				if ($this->getCurrentDetailTable() <> "") {
					if ($EditRow) {
						$conn->CommitTrans(); // Commit transaction
					} else {
						$conn->RollbackTrans(); // Rollback transaction
					}
				}
			} else {
				if ($this->getSuccessMessage() <> "" || $this->getFailureMessage() <> "") {

					// Use the message, do nothing
				} elseif ($this->CancelMessage <> "") {
					$this->setFailureMessage($this->CancelMessage);
					$this->CancelMessage = "";
				} else {
					$this->setFailureMessage($Language->Phrase("UpdateCancelled"));
				}
				$EditRow = FALSE;
			}
		}

		// Call Row_Updated event
		if ($EditRow)
			$this->Row_Updated($rsold, $rsnew);
		$rs->Close();

		// foto
		ew_CleanUploadTempPath($this->foto, $this->foto->Upload->Index);
		return $EditRow;
	}

	// Set up detail parms based on QueryString
	function SetupDetailParms() {

		// Get the keys for master table
		if (isset($_GET[EW_TABLE_SHOW_DETAIL])) {
			$sDetailTblVar = $_GET[EW_TABLE_SHOW_DETAIL];
			$this->setCurrentDetailTable($sDetailTblVar);
		} else {
			$sDetailTblVar = $this->getCurrentDetailTable();
		}
		if ($sDetailTblVar <> "") {
			$DetailTblVar = explode(",", $sDetailTblVar);
			if (in_array("productoespecificaciones", $DetailTblVar)) {
				if (!isset($GLOBALS["productoespecificaciones_grid"]))
					$GLOBALS["productoespecificaciones_grid"] = new cproductoespecificaciones_grid;
				if ($GLOBALS["productoespecificaciones_grid"]->DetailEdit) {
					$GLOBALS["productoespecificaciones_grid"]->CurrentMode = "edit";
					$GLOBALS["productoespecificaciones_grid"]->CurrentAction = "gridedit";

					// Save current master table to detail table
					$GLOBALS["productoespecificaciones_grid"]->setCurrentMasterTable($this->TableVar);
					$GLOBALS["productoespecificaciones_grid"]->setStartRecordNumber(1);
					$GLOBALS["productoespecificaciones_grid"]->producto_id->FldIsDetailKey = TRUE;
					$GLOBALS["productoespecificaciones_grid"]->producto_id->CurrentValue = $this->id->CurrentValue;
					$GLOBALS["productoespecificaciones_grid"]->producto_id->setSessionValue($GLOBALS["productoespecificaciones_grid"]->producto_id->CurrentValue);
				}
			}
			if (in_array("productofotos", $DetailTblVar)) {
				if (!isset($GLOBALS["productofotos_grid"]))
					$GLOBALS["productofotos_grid"] = new cproductofotos_grid;
				if ($GLOBALS["productofotos_grid"]->DetailEdit) {
					$GLOBALS["productofotos_grid"]->CurrentMode = "edit";
					$GLOBALS["productofotos_grid"]->CurrentAction = "gridedit";

					// Save current master table to detail table
					$GLOBALS["productofotos_grid"]->setCurrentMasterTable($this->TableVar);
					$GLOBALS["productofotos_grid"]->setStartRecordNumber(1);
					$GLOBALS["productofotos_grid"]->producto_id->FldIsDetailKey = TRUE;
					$GLOBALS["productofotos_grid"]->producto_id->CurrentValue = $this->id->CurrentValue;
					$GLOBALS["productofotos_grid"]->producto_id->setSessionValue($GLOBALS["productofotos_grid"]->producto_id->CurrentValue);
				}
			}
			if (in_array("productoversiones", $DetailTblVar)) {
				if (!isset($GLOBALS["productoversiones_grid"]))
					$GLOBALS["productoversiones_grid"] = new cproductoversiones_grid;
				if ($GLOBALS["productoversiones_grid"]->DetailEdit) {
					$GLOBALS["productoversiones_grid"]->CurrentMode = "edit";
					$GLOBALS["productoversiones_grid"]->CurrentAction = "gridedit";

					// Save current master table to detail table
					$GLOBALS["productoversiones_grid"]->setCurrentMasterTable($this->TableVar);
					$GLOBALS["productoversiones_grid"]->setStartRecordNumber(1);
					$GLOBALS["productoversiones_grid"]->producto_id->FldIsDetailKey = TRUE;
					$GLOBALS["productoversiones_grid"]->producto_id->CurrentValue = $this->id->CurrentValue;
					$GLOBALS["productoversiones_grid"]->producto_id->setSessionValue($GLOBALS["productoversiones_grid"]->producto_id->CurrentValue);
				}
			}
		}
	}

	// Set up Breadcrumb
	function SetupBreadcrumb() {
		global $Breadcrumb, $Language;
		$Breadcrumb = new cBreadcrumb();
		$url = substr(ew_CurrentUrl(), strrpos(ew_CurrentUrl(), "/")+1);
		$Breadcrumb->Add("list", $this->TableVar, $this->AddMasterUrl("productoslist.php"), "", $this->TableVar, TRUE);
		$PageId = "edit";
		$Breadcrumb->Add("edit", $PageId, $url);
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
if (!isset($productos_edit)) $productos_edit = new cproductos_edit();

// Page init
$productos_edit->Page_Init();

// Page main
$productos_edit->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$productos_edit->Page_Render();
?>
<?php include_once "header.php" ?>
<script type="text/javascript">

// Form object
var CurrentPageID = EW_PAGE_ID = "edit";
var CurrentForm = fproductosedit = new ew_Form("fproductosedit", "edit");

// Validate form
fproductosedit.Validate = function() {
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
			elm = this.GetElements("x" + infix + "_producto");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productos->producto->FldCaption(), $productos->producto->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_marca_id");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productos->marca_id->FldCaption(), $productos->marca_id->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_rubro_id");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productos->rubro_id->FldCaption(), $productos->rubro_id->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_moneda_id");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productos->moneda_id->FldCaption(), $productos->moneda_id->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_precio");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productos->precio->FldCaption(), $productos->precio->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_precio");
			if (elm && !ew_CheckNumber(elm.value))
				return this.OnError(elm, "<?php echo ew_JsEncode2($productos->precio->FldErrMsg()) ?>");
			elm = this.GetElements("x" + infix + "_stock");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productos->stock->FldCaption(), $productos->stock->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_stock");
			if (elm && !ew_CheckInteger(elm.value))
				return this.OnError(elm, "<?php echo ew_JsEncode2($productos->stock->FldErrMsg()) ?>");
			elm = this.GetElements("x" + infix + "_destacado");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productos->destacado->FldCaption(), $productos->destacado->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_activo");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productos->activo->FldCaption(), $productos->activo->ReqErrMsg)) ?>");

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
fproductosedit.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fproductosedit.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
fproductosedit.Lists["x_marca_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_marca","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgmarcas"};
fproductosedit.Lists["x_marca_id"].Data = "<?php echo $productos_edit->marca_id->LookupFilterQuery(FALSE, "edit") ?>";
fproductosedit.Lists["x_rubro_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_rubro","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgrubros"};
fproductosedit.Lists["x_rubro_id"].Data = "<?php echo $productos_edit->rubro_id->LookupFilterQuery(FALSE, "edit") ?>";
fproductosedit.Lists["x_moneda_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_moneda","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgmonedas"};
fproductosedit.Lists["x_moneda_id"].Data = "<?php echo $productos_edit->moneda_id->LookupFilterQuery(FALSE, "edit") ?>";
fproductosedit.Lists["x_destacado"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductosedit.Lists["x_destacado"].Options = <?php echo json_encode($productos_edit->destacado->Options()) ?>;
fproductosedit.Lists["x_activo"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductosedit.Lists["x_activo"].Options = <?php echo json_encode($productos_edit->activo->Options()) ?>;

// Form object for search
</script>
<script type="text/javascript">

// Write your client script here, no need to add script tags.
</script>
<?php $productos_edit->ShowPageHeader(); ?>
<?php
$productos_edit->ShowMessage();
?>
<form name="fproductosedit" id="fproductosedit" class="<?php echo $productos_edit->FormClassName ?>" action="<?php echo ew_CurrentPage() ?>" method="post">
<?php if ($productos_edit->CheckToken) { ?>
<input type="hidden" name="<?php echo EW_TOKEN_NAME ?>" value="<?php echo $productos_edit->Token ?>">
<?php } ?>
<input type="hidden" name="t" value="productos">
<input type="hidden" name="a_edit" id="a_edit" value="U">
<input type="hidden" name="modal" value="<?php echo intval($productos_edit->IsModal) ?>">
<div class="ewEditDiv"><!-- page* -->
<?php if ($productos->id->Visible) { // id ?>
	<div id="r_id" class="form-group">
		<label id="elh_productos_id" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->id->FldCaption() ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->id->CellAttributes() ?>>
<span id="el_productos_id">
<span<?php echo $productos->id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productos->id->EditValue ?></p></span>
</span>
<input type="hidden" data-table="productos" data-field="x_id" name="x_id" id="x_id" value="<?php echo ew_HtmlEncode($productos->id->CurrentValue) ?>">
<?php echo $productos->id->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productos->producto->Visible) { // producto ?>
	<div id="r_producto" class="form-group">
		<label id="elh_productos_producto" for="x_producto" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->producto->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->producto->CellAttributes() ?>>
<span id="el_productos_producto">
<input type="text" data-table="productos" data-field="x_producto" name="x_producto" id="x_producto" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productos->producto->getPlaceHolder()) ?>" value="<?php echo $productos->producto->EditValue ?>"<?php echo $productos->producto->EditAttributes() ?>>
</span>
<?php echo $productos->producto->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productos->marca_id->Visible) { // marca_id ?>
	<div id="r_marca_id" class="form-group">
		<label id="elh_productos_marca_id" for="x_marca_id" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->marca_id->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->marca_id->CellAttributes() ?>>
<span id="el_productos_marca_id">
<div class="ewDropdownList has-feedback">
	<span onclick="" class="form-control dropdown-toggle" aria-expanded="false"<?php if ($productos->marca_id->ReadOnly) { ?> readonly<?php } else { ?>data-toggle="dropdown"<?php } ?>>
		<?php echo $productos->marca_id->ViewValue ?>
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
<?php echo $productos->marca_id->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productos->rubro_id->Visible) { // rubro_id ?>
	<div id="r_rubro_id" class="form-group">
		<label id="elh_productos_rubro_id" for="x_rubro_id" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->rubro_id->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->rubro_id->CellAttributes() ?>>
<span id="el_productos_rubro_id">
<div class="ewDropdownList has-feedback">
	<span onclick="" class="form-control dropdown-toggle" aria-expanded="false"<?php if ($productos->rubro_id->ReadOnly) { ?> readonly<?php } else { ?>data-toggle="dropdown"<?php } ?>>
		<?php echo $productos->rubro_id->ViewValue ?>
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
<?php echo $productos->rubro_id->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productos->moneda_id->Visible) { // moneda_id ?>
	<div id="r_moneda_id" class="form-group">
		<label id="elh_productos_moneda_id" for="x_moneda_id" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->moneda_id->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->moneda_id->CellAttributes() ?>>
<span id="el_productos_moneda_id">
<div class="ewDropdownList has-feedback">
	<span onclick="" class="form-control dropdown-toggle" aria-expanded="false"<?php if ($productos->moneda_id->ReadOnly) { ?> readonly<?php } else { ?>data-toggle="dropdown"<?php } ?>>
		<?php echo $productos->moneda_id->ViewValue ?>
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
<?php echo $productos->moneda_id->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productos->descripcion->Visible) { // descripcion ?>
	<div id="r_descripcion" class="form-group">
		<label id="elh_productos_descripcion" for="x_descripcion" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->descripcion->FldCaption() ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->descripcion->CellAttributes() ?>>
<span id="el_productos_descripcion">
<input type="text" data-table="productos" data-field="x_descripcion" name="x_descripcion" id="x_descripcion" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productos->descripcion->getPlaceHolder()) ?>" value="<?php echo $productos->descripcion->EditValue ?>"<?php echo $productos->descripcion->EditAttributes() ?>>
</span>
<?php echo $productos->descripcion->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productos->foto->Visible) { // foto ?>
	<div id="r_foto" class="form-group">
		<label id="elh_productos_foto" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->foto->FldCaption() ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->foto->CellAttributes() ?>>
<span id="el_productos_foto">
<div id="fd_x_foto">
<span title="<?php echo $productos->foto->FldTitle() ? $productos->foto->FldTitle() : $Language->Phrase("ChooseFile") ?>" class="btn btn-default btn-sm fileinput-button ewTooltip<?php if ($productos->foto->ReadOnly || $productos->foto->Disabled) echo " hide"; ?>">
	<span><?php echo $Language->Phrase("ChooseFileBtn") ?></span>
	<input type="file" title=" " data-table="productos" data-field="x_foto" name="x_foto" id="x_foto"<?php echo $productos->foto->EditAttributes() ?>>
</span>
<input type="hidden" name="fn_x_foto" id= "fn_x_foto" value="<?php echo $productos->foto->Upload->FileName ?>">
<?php if (@$_POST["fa_x_foto"] == "0") { ?>
<input type="hidden" name="fa_x_foto" id= "fa_x_foto" value="0">
<?php } else { ?>
<input type="hidden" name="fa_x_foto" id= "fa_x_foto" value="1">
<?php } ?>
<input type="hidden" name="fs_x_foto" id= "fs_x_foto" value="191">
<input type="hidden" name="fx_x_foto" id= "fx_x_foto" value="<?php echo $productos->foto->UploadAllowedFileExt ?>">
<input type="hidden" name="fm_x_foto" id= "fm_x_foto" value="<?php echo $productos->foto->UploadMaxFileSize ?>">
</div>
<table id="ft_x_foto" class="table table-condensed pull-left ewUploadTable"><tbody class="files"></tbody></table>
</span>
<?php echo $productos->foto->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productos->precio->Visible) { // precio ?>
	<div id="r_precio" class="form-group">
		<label id="elh_productos_precio" for="x_precio" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->precio->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->precio->CellAttributes() ?>>
<span id="el_productos_precio">
<input type="text" data-table="productos" data-field="x_precio" name="x_precio" id="x_precio" size="30" placeholder="<?php echo ew_HtmlEncode($productos->precio->getPlaceHolder()) ?>" value="<?php echo $productos->precio->EditValue ?>"<?php echo $productos->precio->EditAttributes() ?>>
</span>
<?php echo $productos->precio->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productos->stock->Visible) { // stock ?>
	<div id="r_stock" class="form-group">
		<label id="elh_productos_stock" for="x_stock" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->stock->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->stock->CellAttributes() ?>>
<span id="el_productos_stock">
<input type="text" data-table="productos" data-field="x_stock" name="x_stock" id="x_stock" size="30" placeholder="<?php echo ew_HtmlEncode($productos->stock->getPlaceHolder()) ?>" value="<?php echo $productos->stock->EditValue ?>"<?php echo $productos->stock->EditAttributes() ?>>
</span>
<?php echo $productos->stock->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productos->destacado->Visible) { // destacado ?>
	<div id="r_destacado" class="form-group">
		<label id="elh_productos_destacado" for="x_destacado" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->destacado->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->destacado->CellAttributes() ?>>
<span id="el_productos_destacado">
<select data-table="productos" data-field="x_destacado" data-value-separator="<?php echo $productos->destacado->DisplayValueSeparatorAttribute() ?>" id="x_destacado" name="x_destacado"<?php echo $productos->destacado->EditAttributes() ?>>
<?php echo $productos->destacado->SelectOptionListHtml("x_destacado") ?>
</select>
</span>
<?php echo $productos->destacado->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productos->visitas->Visible) { // visitas ?>
	<div id="r_visitas" class="form-group">
		<label id="elh_productos_visitas" for="x_visitas" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->visitas->FldCaption() ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->visitas->CellAttributes() ?>>
<span id="el_productos_visitas">
<span<?php echo $productos->visitas->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productos->visitas->EditValue ?></p></span>
</span>
<input type="hidden" data-table="productos" data-field="x_visitas" name="x_visitas" id="x_visitas" value="<?php echo ew_HtmlEncode($productos->visitas->CurrentValue) ?>">
<?php echo $productos->visitas->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($productos->activo->Visible) { // activo ?>
	<div id="r_activo" class="form-group">
		<label id="elh_productos_activo" for="x_activo" class="<?php echo $productos_edit->LeftColumnClass ?>"><?php echo $productos->activo->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $productos_edit->RightColumnClass ?>"><div<?php echo $productos->activo->CellAttributes() ?>>
<span id="el_productos_activo">
<select data-table="productos" data-field="x_activo" data-value-separator="<?php echo $productos->activo->DisplayValueSeparatorAttribute() ?>" id="x_activo" name="x_activo"<?php echo $productos->activo->EditAttributes() ?>>
<?php echo $productos->activo->SelectOptionListHtml("x_activo") ?>
</select>
</span>
<?php echo $productos->activo->CustomMsg ?></div></div>
	</div>
<?php } ?>
</div><!-- /page* -->
<?php
	if (in_array("productoespecificaciones", explode(",", $productos->getCurrentDetailTable())) && $productoespecificaciones->DetailEdit) {
?>
<?php if ($productos->getCurrentDetailTable() <> "") { ?>
<h4 class="ewDetailCaption"><?php echo $Language->TablePhrase("productoespecificaciones", "TblCaption") ?></h4>
<?php } ?>
<?php include_once "productoespecificacionesgrid.php" ?>
<?php } ?>
<?php
	if (in_array("productofotos", explode(",", $productos->getCurrentDetailTable())) && $productofotos->DetailEdit) {
?>
<?php if ($productos->getCurrentDetailTable() <> "") { ?>
<h4 class="ewDetailCaption"><?php echo $Language->TablePhrase("productofotos", "TblCaption") ?></h4>
<?php } ?>
<?php include_once "productofotosgrid.php" ?>
<?php } ?>
<?php
	if (in_array("productoversiones", explode(",", $productos->getCurrentDetailTable())) && $productoversiones->DetailEdit) {
?>
<?php if ($productos->getCurrentDetailTable() <> "") { ?>
<h4 class="ewDetailCaption"><?php echo $Language->TablePhrase("productoversiones", "TblCaption") ?></h4>
<?php } ?>
<?php include_once "productoversionesgrid.php" ?>
<?php } ?>
<?php if (!$productos_edit->IsModal) { ?>
<div class="form-group"><!-- buttons .form-group -->
	<div class="<?php echo $productos_edit->OffsetColumnClass ?>"><!-- buttons offset -->
<button class="btn btn-primary ewButton" name="btnAction" id="btnAction" type="submit"><?php echo $Language->Phrase("SaveBtn") ?></button>
<button class="btn btn-default ewButton" name="btnCancel" id="btnCancel" type="button" data-href="<?php echo $productos_edit->getReturnUrl() ?>"><?php echo $Language->Phrase("CancelBtn") ?></button>
	</div><!-- /buttons offset -->
</div><!-- /buttons .form-group -->
<?php } ?>
</form>
<script type="text/javascript">
fproductosedit.Init();
</script>
<?php
$productos_edit->ShowPageFooter();
if (EW_DEBUG_ENABLED)
	echo ew_DebugMsg();
?>
<script type="text/javascript">

// Write your table-specific startup script here
// document.write("page loaded");

</script>
<?php include_once "footer.php" ?>
<?php
$productos_edit->Page_Terminate();
?>
