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

$productos_list = NULL; // Initialize page object first

class cproductos_list extends cproductos {

	// Page ID
	var $PageID = 'list';

	// Project ID
	var $ProjectID = '{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}';

	// Table name
	var $TableName = 'productos';

	// Page object name
	var $PageObjName = 'productos_list';

	// Grid form hidden field names
	var $FormName = 'fproductoslist';
	var $FormActionName = 'k_action';
	var $FormKeyName = 'k_key';
	var $FormOldKeyName = 'k_oldkey';
	var $FormBlankRowName = 'k_blankrow';
	var $FormKeyCountName = 'key_count';

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

	// Page URLs
	var $AddUrl;
	var $EditUrl;
	var $CopyUrl;
	var $DeleteUrl;
	var $ViewUrl;
	var $ListUrl;

	// Export URLs
	var $ExportPrintUrl;
	var $ExportHtmlUrl;
	var $ExportExcelUrl;
	var $ExportWordUrl;
	var $ExportXmlUrl;
	var $ExportCsvUrl;
	var $ExportPdfUrl;

	// Custom export
	var $ExportExcelCustom = FALSE;
	var $ExportWordCustom = FALSE;
	var $ExportPdfCustom = FALSE;
	var $ExportEmailCustom = FALSE;

	// Update URLs
	var $InlineAddUrl;
	var $InlineCopyUrl;
	var $InlineEditUrl;
	var $GridAddUrl;
	var $GridEditUrl;
	var $MultiDeleteUrl;
	var $MultiUpdateUrl;

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

		// Initialize URLs
		$this->ExportPrintUrl = $this->PageUrl() . "export=print";
		$this->ExportExcelUrl = $this->PageUrl() . "export=excel";
		$this->ExportWordUrl = $this->PageUrl() . "export=word";
		$this->ExportHtmlUrl = $this->PageUrl() . "export=html";
		$this->ExportXmlUrl = $this->PageUrl() . "export=xml";
		$this->ExportCsvUrl = $this->PageUrl() . "export=csv";
		$this->ExportPdfUrl = $this->PageUrl() . "export=pdf";
		$this->AddUrl = "productosadd.php?" . EW_TABLE_SHOW_DETAIL . "=";
		$this->InlineAddUrl = $this->PageUrl() . "a=add";
		$this->GridAddUrl = $this->PageUrl() . "a=gridadd";
		$this->GridEditUrl = $this->PageUrl() . "a=gridedit";
		$this->MultiDeleteUrl = "productosdelete.php";
		$this->MultiUpdateUrl = "productosupdate.php";

		// Page ID
		if (!defined("EW_PAGE_ID"))
			define("EW_PAGE_ID", 'list', TRUE);

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

		// List options
		$this->ListOptions = new cListOptions();
		$this->ListOptions->TableVar = $this->TableVar;

		// Export options
		$this->ExportOptions = new cListOptions();
		$this->ExportOptions->Tag = "div";
		$this->ExportOptions->TagClassName = "ewExportOption";

		// Other options
		$this->OtherOptions['addedit'] = new cListOptions();
		$this->OtherOptions['addedit']->Tag = "div";
		$this->OtherOptions['addedit']->TagClassName = "ewAddEditOption";
		$this->OtherOptions['detail'] = new cListOptions();
		$this->OtherOptions['detail']->Tag = "div";
		$this->OtherOptions['detail']->TagClassName = "ewDetailOption";
		$this->OtherOptions['action'] = new cListOptions();
		$this->OtherOptions['action']->Tag = "div";
		$this->OtherOptions['action']->TagClassName = "ewActionOption";

		// Filter options
		$this->FilterOptions = new cListOptions();
		$this->FilterOptions->Tag = "div";
		$this->FilterOptions->TagClassName = "ewFilterOption fproductoslistsrch";

		// List actions
		$this->ListActions = new cListActions();
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
		if (!$Security->CanList()) {
			$Security->SaveLastUrl();
			$this->setFailureMessage(ew_DeniedMsg()); // Set no permission
			$this->Page_Terminate(ew_GetUrl("index.php"));
		}

		// NOTE: Security object may be needed in other part of the script, skip set to Nothing
		// 
		// Security = null;
		// 

		$this->CurrentAction = (@$_GET["a"] <> "") ? $_GET["a"] : @$_POST["a_list"]; // Set up current action

		// Get grid add count
		$gridaddcnt = @$_GET[EW_TABLE_GRID_ADD_ROW_COUNT];
		if (is_numeric($gridaddcnt) && $gridaddcnt > 0)
			$this->GridAddRowCount = $gridaddcnt;

		// Set up list options
		$this->SetupListOptions();
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

		// Setup other options
		$this->SetupOtherOptions();

		// Set up custom action (compatible with old version)
		foreach ($this->CustomActions as $name => $action)
			$this->ListActions->Add($name, $action);

		// Show checkbox column if multiple action
		foreach ($this->ListActions->Items as $listaction) {
			if ($listaction->Select == EW_ACTION_MULTIPLE && $listaction->Allow) {
				$this->ListOptions->Items["checkbox"]->Visible = TRUE;
				break;
			}
		}
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

	// Class variables
	var $ListOptions; // List options
	var $ExportOptions; // Export options
	var $SearchOptions; // Search options
	var $OtherOptions = array(); // Other options
	var $FilterOptions; // Filter options
	var $ListActions; // List actions
	var $SelectedCount = 0;
	var $SelectedIndex = 0;
	var $DisplayRecs = 20;
	var $StartRec;
	var $StopRec;
	var $TotalRecs = 0;
	var $RecRange = 10;
	var $Pager;
	var $AutoHidePager = EW_AUTO_HIDE_PAGER;
	var $AutoHidePageSizeSelector = EW_AUTO_HIDE_PAGE_SIZE_SELECTOR;
	var $DefaultSearchWhere = ""; // Default search WHERE clause
	var $SearchWhere = ""; // Search WHERE clause
	var $RecCnt = 0; // Record count
	var $EditRowCnt;
	var $StartRowCnt = 1;
	var $RowCnt = 0;
	var $Attrs = array(); // Row attributes and cell attributes
	var $RowIndex = 0; // Row index
	var $KeyCount = 0; // Key count
	var $RowAction = ""; // Row action
	var $RowOldKey = ""; // Row old key (for copy)
	var $RecPerRow = 0;
	var $MultiColumnClass;
	var $MultiColumnEditClass = "col-sm-12";
	var $MultiColumnCnt = 12;
	var $MultiColumnEditCnt = 12;
	var $GridCnt = 0;
	var $ColCnt = 0;
	var $DbMasterFilter = ""; // Master filter
	var $DbDetailFilter = ""; // Detail filter
	var $MasterRecordExists;
	var $MultiSelectKey;
	var $Command;
	var $RestoreSearch = FALSE;
	var $productoespecificaciones_Count;
	var $productofotos_Count;
	var $productoversiones_Count;
	var $DetailPages;
	var $Recordset;
	var $OldRecordset;

	//
	// Page main
	//
	function Page_Main() {
		global $objForm, $Language, $gsFormError, $gsSearchError, $Security, $EW_EXPORT;

		// Search filters
		$sSrchAdvanced = ""; // Advanced search filter
		$sSrchBasic = ""; // Basic search filter
		$sFilter = "";

		// Get command
		$this->Command = strtolower(@$_GET["cmd"]);
		if ($this->IsPageRequest()) { // Validate request

			// Process list action first
			if ($this->ProcessListAction()) // Ajax request
				$this->Page_Terminate();

			// Handle reset command
			$this->ResetCmd();

			// Set up Breadcrumb
			if ($this->Export == "")
				$this->SetupBreadcrumb();

			// Hide list options
			if ($this->Export <> "") {
				$this->ListOptions->HideAllOptions(array("sequence"));
				$this->ListOptions->UseDropDownButton = FALSE; // Disable drop down button
				$this->ListOptions->UseButtonGroup = FALSE; // Disable button group
			} elseif ($this->CurrentAction == "gridadd" || $this->CurrentAction == "gridedit") {
				$this->ListOptions->HideAllOptions();
				$this->ListOptions->UseDropDownButton = FALSE; // Disable drop down button
				$this->ListOptions->UseButtonGroup = FALSE; // Disable button group
			}

			// Hide options
			if ($this->Export <> "" || $this->CurrentAction <> "") {
				$this->ExportOptions->HideAllOptions();
				$this->FilterOptions->HideAllOptions();
			}

			// Hide other options
			if ($this->Export <> "") {
				foreach ($this->OtherOptions as &$option)
					$option->HideAllOptions();
			}

			// Get default search criteria
			ew_AddFilter($this->DefaultSearchWhere, $this->BasicSearchWhere(TRUE));
			ew_AddFilter($this->DefaultSearchWhere, $this->AdvancedSearchWhere(TRUE));

			// Get basic search values
			$this->LoadBasicSearchValues();

			// Get and validate search values for advanced search
			$this->LoadSearchValues(); // Get search values

			// Process filter list
			$this->ProcessFilterList();
			if (!$this->ValidateSearch())
				$this->setFailureMessage($gsSearchError);

			// Restore search parms from Session if not searching / reset / export
			if (($this->Export <> "" || $this->Command <> "search" && $this->Command <> "reset" && $this->Command <> "resetall") && $this->Command <> "json" && $this->CheckSearchParms())
				$this->RestoreSearchParms();

			// Call Recordset SearchValidated event
			$this->Recordset_SearchValidated();

			// Set up sorting order
			$this->SetupSortOrder();

			// Get basic search criteria
			if ($gsSearchError == "")
				$sSrchBasic = $this->BasicSearchWhere();

			// Get search criteria for advanced search
			if ($gsSearchError == "")
				$sSrchAdvanced = $this->AdvancedSearchWhere();
		}

		// Restore display records
		if ($this->Command <> "json" && $this->getRecordsPerPage() <> "") {
			$this->DisplayRecs = $this->getRecordsPerPage(); // Restore from Session
		} else {
			$this->DisplayRecs = 20; // Load default
		}

		// Load Sorting Order
		if ($this->Command <> "json")
			$this->LoadSortOrder();

		// Load search default if no existing search criteria
		if (!$this->CheckSearchParms()) {

			// Load basic search from default
			$this->BasicSearch->LoadDefault();
			if ($this->BasicSearch->Keyword != "")
				$sSrchBasic = $this->BasicSearchWhere();

			// Load advanced search from default
			if ($this->LoadAdvancedSearchDefault()) {
				$sSrchAdvanced = $this->AdvancedSearchWhere();
			}
		}

		// Build search criteria
		ew_AddFilter($this->SearchWhere, $sSrchAdvanced);
		ew_AddFilter($this->SearchWhere, $sSrchBasic);

		// Call Recordset_Searching event
		$this->Recordset_Searching($this->SearchWhere);

		// Save search criteria
		if ($this->Command == "search" && !$this->RestoreSearch) {
			$this->setSearchWhere($this->SearchWhere); // Save to Session
			$this->StartRec = 1; // Reset start record counter
			$this->setStartRecordNumber($this->StartRec);
		} elseif ($this->Command <> "json") {
			$this->SearchWhere = $this->getSearchWhere();
		}

		// Build filter
		$sFilter = "";
		ew_AddFilter($sFilter, $this->DbDetailFilter);
		ew_AddFilter($sFilter, $this->SearchWhere);

		// Set up filter
		if ($this->Command == "json") {
			$this->UseSessionForListSQL = FALSE; // Do not use session for ListSQL
			$this->CurrentFilter = $sFilter;
		} else {
			$this->setSessionWhere($sFilter);
			$this->CurrentFilter = "";
		}

		// Load record count first
		if (!$this->IsAddOrEdit()) {
			$bSelectLimit = $this->UseSelectLimit;
			if ($bSelectLimit) {
				$this->TotalRecs = $this->ListRecordCount();
			} else {
				if ($this->Recordset = $this->LoadRecordset())
					$this->TotalRecs = $this->Recordset->RecordCount();
			}
		}

		// Search options
		$this->SetupSearchOptions();
	}

	// Build filter for all keys
	function BuildKeyFilter() {
		global $objForm;
		$sWrkFilter = "";

		// Update row index and get row key
		$rowindex = 1;
		$objForm->Index = $rowindex;
		$sThisKey = strval($objForm->GetValue($this->FormKeyName));
		while ($sThisKey <> "") {
			if ($this->SetupKeyValues($sThisKey)) {
				$sFilter = $this->KeyFilter();
				if ($sWrkFilter <> "") $sWrkFilter .= " OR ";
				$sWrkFilter .= $sFilter;
			} else {
				$sWrkFilter = "0=1";
				break;
			}

			// Update row index and get row key
			$rowindex++; // Next row
			$objForm->Index = $rowindex;
			$sThisKey = strval($objForm->GetValue($this->FormKeyName));
		}
		return $sWrkFilter;
	}

	// Set up key values
	function SetupKeyValues($key) {
		$arrKeyFlds = explode($GLOBALS["EW_COMPOSITE_KEY_SEPARATOR"], $key);
		if (count($arrKeyFlds) >= 1) {
			$this->id->setFormValue($arrKeyFlds[0]);
			if (!is_numeric($this->id->FormValue))
				return FALSE;
		}
		return TRUE;
	}

	// Get list of filters
	function GetFilterList() {
		global $UserProfile;

		// Load server side filters
		if (EW_SEARCH_FILTER_OPTION == "Server") {
			$sSavedFilterList = isset($UserProfile) ? $UserProfile->GetSearchFilters(CurrentUserName(), "fproductoslistsrch") : "";
		} else {
			$sSavedFilterList = "";
		}

		// Initialize
		$sFilterList = "";
		$sFilterList = ew_Concat($sFilterList, $this->id->AdvancedSearch->ToJson(), ","); // Field id
		$sFilterList = ew_Concat($sFilterList, $this->producto->AdvancedSearch->ToJson(), ","); // Field producto
		$sFilterList = ew_Concat($sFilterList, $this->marca_id->AdvancedSearch->ToJson(), ","); // Field marca_id
		$sFilterList = ew_Concat($sFilterList, $this->rubro_id->AdvancedSearch->ToJson(), ","); // Field rubro_id
		$sFilterList = ew_Concat($sFilterList, $this->moneda_id->AdvancedSearch->ToJson(), ","); // Field moneda_id
		$sFilterList = ew_Concat($sFilterList, $this->descripcion->AdvancedSearch->ToJson(), ","); // Field descripcion
		$sFilterList = ew_Concat($sFilterList, $this->foto->AdvancedSearch->ToJson(), ","); // Field foto
		$sFilterList = ew_Concat($sFilterList, $this->precio->AdvancedSearch->ToJson(), ","); // Field precio
		$sFilterList = ew_Concat($sFilterList, $this->stock->AdvancedSearch->ToJson(), ","); // Field stock
		$sFilterList = ew_Concat($sFilterList, $this->destacado->AdvancedSearch->ToJson(), ","); // Field destacado
		$sFilterList = ew_Concat($sFilterList, $this->visitas->AdvancedSearch->ToJson(), ","); // Field visitas
		$sFilterList = ew_Concat($sFilterList, $this->activo->AdvancedSearch->ToJson(), ","); // Field activo
		if ($this->BasicSearch->Keyword <> "") {
			$sWrk = "\"" . EW_TABLE_BASIC_SEARCH . "\":\"" . ew_JsEncode2($this->BasicSearch->Keyword) . "\",\"" . EW_TABLE_BASIC_SEARCH_TYPE . "\":\"" . ew_JsEncode2($this->BasicSearch->Type) . "\"";
			$sFilterList = ew_Concat($sFilterList, $sWrk, ",");
		}
		$sFilterList = preg_replace('/,$/', "", $sFilterList);

		// Return filter list in json
		if ($sFilterList <> "")
			$sFilterList = "\"data\":{" . $sFilterList . "}";
		if ($sSavedFilterList <> "") {
			if ($sFilterList <> "")
				$sFilterList .= ",";
			$sFilterList .= "\"filters\":" . $sSavedFilterList;
		}
		return ($sFilterList <> "") ? "{" . $sFilterList . "}" : "null";
	}

	// Process filter list
	function ProcessFilterList() {
		global $UserProfile;
		if (@$_POST["ajax"] == "savefilters") { // Save filter request (Ajax)
			$filters = @$_POST["filters"];
			$UserProfile->SetSearchFilters(CurrentUserName(), "fproductoslistsrch", $filters);

			// Clean output buffer
			if (!EW_DEBUG_ENABLED && ob_get_length())
				ob_end_clean();
			echo ew_ArrayToJson(array(array("success" => TRUE))); // Success
			$this->Page_Terminate();
			exit();
		} elseif (@$_POST["cmd"] == "resetfilter") {
			$this->RestoreFilterList();
		}
	}

	// Restore list of filters
	function RestoreFilterList() {

		// Return if not reset filter
		if (@$_POST["cmd"] <> "resetfilter")
			return FALSE;
		$filter = json_decode(@$_POST["filter"], TRUE);
		$this->Command = "search";

		// Field id
		$this->id->AdvancedSearch->SearchValue = @$filter["x_id"];
		$this->id->AdvancedSearch->SearchOperator = @$filter["z_id"];
		$this->id->AdvancedSearch->SearchCondition = @$filter["v_id"];
		$this->id->AdvancedSearch->SearchValue2 = @$filter["y_id"];
		$this->id->AdvancedSearch->SearchOperator2 = @$filter["w_id"];
		$this->id->AdvancedSearch->Save();

		// Field producto
		$this->producto->AdvancedSearch->SearchValue = @$filter["x_producto"];
		$this->producto->AdvancedSearch->SearchOperator = @$filter["z_producto"];
		$this->producto->AdvancedSearch->SearchCondition = @$filter["v_producto"];
		$this->producto->AdvancedSearch->SearchValue2 = @$filter["y_producto"];
		$this->producto->AdvancedSearch->SearchOperator2 = @$filter["w_producto"];
		$this->producto->AdvancedSearch->Save();

		// Field marca_id
		$this->marca_id->AdvancedSearch->SearchValue = @$filter["x_marca_id"];
		$this->marca_id->AdvancedSearch->SearchOperator = @$filter["z_marca_id"];
		$this->marca_id->AdvancedSearch->SearchCondition = @$filter["v_marca_id"];
		$this->marca_id->AdvancedSearch->SearchValue2 = @$filter["y_marca_id"];
		$this->marca_id->AdvancedSearch->SearchOperator2 = @$filter["w_marca_id"];
		$this->marca_id->AdvancedSearch->Save();

		// Field rubro_id
		$this->rubro_id->AdvancedSearch->SearchValue = @$filter["x_rubro_id"];
		$this->rubro_id->AdvancedSearch->SearchOperator = @$filter["z_rubro_id"];
		$this->rubro_id->AdvancedSearch->SearchCondition = @$filter["v_rubro_id"];
		$this->rubro_id->AdvancedSearch->SearchValue2 = @$filter["y_rubro_id"];
		$this->rubro_id->AdvancedSearch->SearchOperator2 = @$filter["w_rubro_id"];
		$this->rubro_id->AdvancedSearch->Save();

		// Field moneda_id
		$this->moneda_id->AdvancedSearch->SearchValue = @$filter["x_moneda_id"];
		$this->moneda_id->AdvancedSearch->SearchOperator = @$filter["z_moneda_id"];
		$this->moneda_id->AdvancedSearch->SearchCondition = @$filter["v_moneda_id"];
		$this->moneda_id->AdvancedSearch->SearchValue2 = @$filter["y_moneda_id"];
		$this->moneda_id->AdvancedSearch->SearchOperator2 = @$filter["w_moneda_id"];
		$this->moneda_id->AdvancedSearch->Save();

		// Field descripcion
		$this->descripcion->AdvancedSearch->SearchValue = @$filter["x_descripcion"];
		$this->descripcion->AdvancedSearch->SearchOperator = @$filter["z_descripcion"];
		$this->descripcion->AdvancedSearch->SearchCondition = @$filter["v_descripcion"];
		$this->descripcion->AdvancedSearch->SearchValue2 = @$filter["y_descripcion"];
		$this->descripcion->AdvancedSearch->SearchOperator2 = @$filter["w_descripcion"];
		$this->descripcion->AdvancedSearch->Save();

		// Field foto
		$this->foto->AdvancedSearch->SearchValue = @$filter["x_foto"];
		$this->foto->AdvancedSearch->SearchOperator = @$filter["z_foto"];
		$this->foto->AdvancedSearch->SearchCondition = @$filter["v_foto"];
		$this->foto->AdvancedSearch->SearchValue2 = @$filter["y_foto"];
		$this->foto->AdvancedSearch->SearchOperator2 = @$filter["w_foto"];
		$this->foto->AdvancedSearch->Save();

		// Field precio
		$this->precio->AdvancedSearch->SearchValue = @$filter["x_precio"];
		$this->precio->AdvancedSearch->SearchOperator = @$filter["z_precio"];
		$this->precio->AdvancedSearch->SearchCondition = @$filter["v_precio"];
		$this->precio->AdvancedSearch->SearchValue2 = @$filter["y_precio"];
		$this->precio->AdvancedSearch->SearchOperator2 = @$filter["w_precio"];
		$this->precio->AdvancedSearch->Save();

		// Field stock
		$this->stock->AdvancedSearch->SearchValue = @$filter["x_stock"];
		$this->stock->AdvancedSearch->SearchOperator = @$filter["z_stock"];
		$this->stock->AdvancedSearch->SearchCondition = @$filter["v_stock"];
		$this->stock->AdvancedSearch->SearchValue2 = @$filter["y_stock"];
		$this->stock->AdvancedSearch->SearchOperator2 = @$filter["w_stock"];
		$this->stock->AdvancedSearch->Save();

		// Field destacado
		$this->destacado->AdvancedSearch->SearchValue = @$filter["x_destacado"];
		$this->destacado->AdvancedSearch->SearchOperator = @$filter["z_destacado"];
		$this->destacado->AdvancedSearch->SearchCondition = @$filter["v_destacado"];
		$this->destacado->AdvancedSearch->SearchValue2 = @$filter["y_destacado"];
		$this->destacado->AdvancedSearch->SearchOperator2 = @$filter["w_destacado"];
		$this->destacado->AdvancedSearch->Save();

		// Field visitas
		$this->visitas->AdvancedSearch->SearchValue = @$filter["x_visitas"];
		$this->visitas->AdvancedSearch->SearchOperator = @$filter["z_visitas"];
		$this->visitas->AdvancedSearch->SearchCondition = @$filter["v_visitas"];
		$this->visitas->AdvancedSearch->SearchValue2 = @$filter["y_visitas"];
		$this->visitas->AdvancedSearch->SearchOperator2 = @$filter["w_visitas"];
		$this->visitas->AdvancedSearch->Save();

		// Field activo
		$this->activo->AdvancedSearch->SearchValue = @$filter["x_activo"];
		$this->activo->AdvancedSearch->SearchOperator = @$filter["z_activo"];
		$this->activo->AdvancedSearch->SearchCondition = @$filter["v_activo"];
		$this->activo->AdvancedSearch->SearchValue2 = @$filter["y_activo"];
		$this->activo->AdvancedSearch->SearchOperator2 = @$filter["w_activo"];
		$this->activo->AdvancedSearch->Save();
		$this->BasicSearch->setKeyword(@$filter[EW_TABLE_BASIC_SEARCH]);
		$this->BasicSearch->setType(@$filter[EW_TABLE_BASIC_SEARCH_TYPE]);
	}

	// Advanced search WHERE clause based on QueryString
	function AdvancedSearchWhere($Default = FALSE) {
		global $Security;
		$sWhere = "";
		$this->BuildSearchSql($sWhere, $this->id, $Default, FALSE); // id
		$this->BuildSearchSql($sWhere, $this->producto, $Default, FALSE); // producto
		$this->BuildSearchSql($sWhere, $this->marca_id, $Default, FALSE); // marca_id
		$this->BuildSearchSql($sWhere, $this->rubro_id, $Default, FALSE); // rubro_id
		$this->BuildSearchSql($sWhere, $this->moneda_id, $Default, FALSE); // moneda_id
		$this->BuildSearchSql($sWhere, $this->descripcion, $Default, FALSE); // descripcion
		$this->BuildSearchSql($sWhere, $this->foto, $Default, FALSE); // foto
		$this->BuildSearchSql($sWhere, $this->precio, $Default, FALSE); // precio
		$this->BuildSearchSql($sWhere, $this->stock, $Default, FALSE); // stock
		$this->BuildSearchSql($sWhere, $this->destacado, $Default, FALSE); // destacado
		$this->BuildSearchSql($sWhere, $this->visitas, $Default, FALSE); // visitas
		$this->BuildSearchSql($sWhere, $this->activo, $Default, FALSE); // activo

		// Set up search parm
		if (!$Default && $sWhere <> "" && in_array($this->Command, array("", "reset", "resetall"))) {
			$this->Command = "search";
		}
		if (!$Default && $this->Command == "search") {
			$this->id->AdvancedSearch->Save(); // id
			$this->producto->AdvancedSearch->Save(); // producto
			$this->marca_id->AdvancedSearch->Save(); // marca_id
			$this->rubro_id->AdvancedSearch->Save(); // rubro_id
			$this->moneda_id->AdvancedSearch->Save(); // moneda_id
			$this->descripcion->AdvancedSearch->Save(); // descripcion
			$this->foto->AdvancedSearch->Save(); // foto
			$this->precio->AdvancedSearch->Save(); // precio
			$this->stock->AdvancedSearch->Save(); // stock
			$this->destacado->AdvancedSearch->Save(); // destacado
			$this->visitas->AdvancedSearch->Save(); // visitas
			$this->activo->AdvancedSearch->Save(); // activo
		}
		return $sWhere;
	}

	// Build search SQL
	function BuildSearchSql(&$Where, &$Fld, $Default, $MultiValue) {
		$FldParm = $Fld->FldParm();
		$FldVal = ($Default) ? $Fld->AdvancedSearch->SearchValueDefault : $Fld->AdvancedSearch->SearchValue; // @$_GET["x_$FldParm"]
		$FldOpr = ($Default) ? $Fld->AdvancedSearch->SearchOperatorDefault : $Fld->AdvancedSearch->SearchOperator; // @$_GET["z_$FldParm"]
		$FldCond = ($Default) ? $Fld->AdvancedSearch->SearchConditionDefault : $Fld->AdvancedSearch->SearchCondition; // @$_GET["v_$FldParm"]
		$FldVal2 = ($Default) ? $Fld->AdvancedSearch->SearchValue2Default : $Fld->AdvancedSearch->SearchValue2; // @$_GET["y_$FldParm"]
		$FldOpr2 = ($Default) ? $Fld->AdvancedSearch->SearchOperator2Default : $Fld->AdvancedSearch->SearchOperator2; // @$_GET["w_$FldParm"]
		$sWrk = "";
		if (is_array($FldVal)) $FldVal = implode(",", $FldVal);
		if (is_array($FldVal2)) $FldVal2 = implode(",", $FldVal2);
		$FldOpr = strtoupper(trim($FldOpr));
		if ($FldOpr == "") $FldOpr = "=";
		$FldOpr2 = strtoupper(trim($FldOpr2));
		if ($FldOpr2 == "") $FldOpr2 = "=";
		if (EW_SEARCH_MULTI_VALUE_OPTION == 1)
			$MultiValue = FALSE;
		if ($MultiValue) {
			$sWrk1 = ($FldVal <> "") ? ew_GetMultiSearchSql($Fld, $FldOpr, $FldVal, $this->DBID) : ""; // Field value 1
			$sWrk2 = ($FldVal2 <> "") ? ew_GetMultiSearchSql($Fld, $FldOpr2, $FldVal2, $this->DBID) : ""; // Field value 2
			$sWrk = $sWrk1; // Build final SQL
			if ($sWrk2 <> "")
				$sWrk = ($sWrk <> "") ? "($sWrk) $FldCond ($sWrk2)" : $sWrk2;
		} else {
			$FldVal = $this->ConvertSearchValue($Fld, $FldVal);
			$FldVal2 = $this->ConvertSearchValue($Fld, $FldVal2);
			$sWrk = ew_GetSearchSql($Fld, $FldVal, $FldOpr, $FldCond, $FldVal2, $FldOpr2, $this->DBID);
		}
		ew_AddFilter($Where, $sWrk);
	}

	// Convert search value
	function ConvertSearchValue(&$Fld, $FldVal) {
		if ($FldVal == EW_NULL_VALUE || $FldVal == EW_NOT_NULL_VALUE)
			return $FldVal;
		$Value = $FldVal;
		if ($Fld->FldDataType == EW_DATATYPE_BOOLEAN) {
			if ($FldVal <> "") $Value = ($FldVal == "1" || strtolower(strval($FldVal)) == "y" || strtolower(strval($FldVal)) == "t") ? $Fld->TrueValue : $Fld->FalseValue;
		} elseif ($Fld->FldDataType == EW_DATATYPE_DATE || $Fld->FldDataType == EW_DATATYPE_TIME) {
			if ($FldVal <> "") $Value = ew_UnFormatDateTime($FldVal, $Fld->FldDateTimeFormat);
		}
		return $Value;
	}

	// Return basic search SQL
	function BasicSearchSQL($arKeywords, $type) {
		$sWhere = "";
		$this->BuildBasicSearchSQL($sWhere, $this->producto, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->descripcion, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->foto, $arKeywords, $type);
		return $sWhere;
	}

	// Build basic search SQL
	function BuildBasicSearchSQL(&$Where, &$Fld, $arKeywords, $type) {
		global $EW_BASIC_SEARCH_IGNORE_PATTERN;
		$sDefCond = ($type == "OR") ? "OR" : "AND";
		$arSQL = array(); // Array for SQL parts
		$arCond = array(); // Array for search conditions
		$cnt = count($arKeywords);
		$j = 0; // Number of SQL parts
		for ($i = 0; $i < $cnt; $i++) {
			$Keyword = $arKeywords[$i];
			$Keyword = trim($Keyword);
			if ($EW_BASIC_SEARCH_IGNORE_PATTERN <> "") {
				$Keyword = preg_replace($EW_BASIC_SEARCH_IGNORE_PATTERN, "\\", $Keyword);
				$ar = explode("\\", $Keyword);
			} else {
				$ar = array($Keyword);
			}
			foreach ($ar as $Keyword) {
				if ($Keyword <> "") {
					$sWrk = "";
					if ($Keyword == "OR" && $type == "") {
						if ($j > 0)
							$arCond[$j-1] = "OR";
					} elseif ($Keyword == EW_NULL_VALUE) {
						$sWrk = $Fld->FldExpression . " IS NULL";
					} elseif ($Keyword == EW_NOT_NULL_VALUE) {
						$sWrk = $Fld->FldExpression . " IS NOT NULL";
					} elseif ($Fld->FldIsVirtual) {
						$sWrk = $Fld->FldVirtualExpression . ew_Like(ew_QuotedValue("%" . $Keyword . "%", EW_DATATYPE_STRING, $this->DBID), $this->DBID);
					} elseif ($Fld->FldDataType != EW_DATATYPE_NUMBER || is_numeric($Keyword)) {
						$sWrk = $Fld->FldBasicSearchExpression . ew_Like(ew_QuotedValue("%" . $Keyword . "%", EW_DATATYPE_STRING, $this->DBID), $this->DBID);
					}
					if ($sWrk <> "") {
						$arSQL[$j] = $sWrk;
						$arCond[$j] = $sDefCond;
						$j += 1;
					}
				}
			}
		}
		$cnt = count($arSQL);
		$bQuoted = FALSE;
		$sSql = "";
		if ($cnt > 0) {
			for ($i = 0; $i < $cnt-1; $i++) {
				if ($arCond[$i] == "OR") {
					if (!$bQuoted) $sSql .= "(";
					$bQuoted = TRUE;
				}
				$sSql .= $arSQL[$i];
				if ($bQuoted && $arCond[$i] <> "OR") {
					$sSql .= ")";
					$bQuoted = FALSE;
				}
				$sSql .= " " . $arCond[$i] . " ";
			}
			$sSql .= $arSQL[$cnt-1];
			if ($bQuoted)
				$sSql .= ")";
		}
		if ($sSql <> "") {
			if ($Where <> "") $Where .= " OR ";
			$Where .= "(" . $sSql . ")";
		}
	}

	// Return basic search WHERE clause based on search keyword and type
	function BasicSearchWhere($Default = FALSE) {
		global $Security;
		$sSearchStr = "";
		$sSearchKeyword = ($Default) ? $this->BasicSearch->KeywordDefault : $this->BasicSearch->Keyword;
		$sSearchType = ($Default) ? $this->BasicSearch->TypeDefault : $this->BasicSearch->Type;

		// Get search SQL
		if ($sSearchKeyword <> "") {
			$ar = $this->BasicSearch->KeywordList($Default);

			// Search keyword in any fields
			if (($sSearchType == "OR" || $sSearchType == "AND") && $this->BasicSearch->BasicSearchAnyFields) {
				foreach ($ar as $sKeyword) {
					if ($sKeyword <> "") {
						if ($sSearchStr <> "") $sSearchStr .= " " . $sSearchType . " ";
						$sSearchStr .= "(" . $this->BasicSearchSQL(array($sKeyword), $sSearchType) . ")";
					}
				}
			} else {
				$sSearchStr = $this->BasicSearchSQL($ar, $sSearchType);
			}
			if (!$Default && in_array($this->Command, array("", "reset", "resetall"))) $this->Command = "search";
		}
		if (!$Default && $this->Command == "search") {
			$this->BasicSearch->setKeyword($sSearchKeyword);
			$this->BasicSearch->setType($sSearchType);
		}
		return $sSearchStr;
	}

	// Check if search parm exists
	function CheckSearchParms() {

		// Check basic search
		if ($this->BasicSearch->IssetSession())
			return TRUE;
		if ($this->id->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->producto->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->marca_id->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->rubro_id->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->moneda_id->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->descripcion->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->foto->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->precio->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->stock->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->destacado->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->visitas->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->activo->AdvancedSearch->IssetSession())
			return TRUE;
		return FALSE;
	}

	// Clear all search parameters
	function ResetSearchParms() {

		// Clear search WHERE clause
		$this->SearchWhere = "";
		$this->setSearchWhere($this->SearchWhere);

		// Clear basic search parameters
		$this->ResetBasicSearchParms();

		// Clear advanced search parameters
		$this->ResetAdvancedSearchParms();
	}

	// Load advanced search default values
	function LoadAdvancedSearchDefault() {
		return FALSE;
	}

	// Clear all basic search parameters
	function ResetBasicSearchParms() {
		$this->BasicSearch->UnsetSession();
	}

	// Clear all advanced search parameters
	function ResetAdvancedSearchParms() {
		$this->id->AdvancedSearch->UnsetSession();
		$this->producto->AdvancedSearch->UnsetSession();
		$this->marca_id->AdvancedSearch->UnsetSession();
		$this->rubro_id->AdvancedSearch->UnsetSession();
		$this->moneda_id->AdvancedSearch->UnsetSession();
		$this->descripcion->AdvancedSearch->UnsetSession();
		$this->foto->AdvancedSearch->UnsetSession();
		$this->precio->AdvancedSearch->UnsetSession();
		$this->stock->AdvancedSearch->UnsetSession();
		$this->destacado->AdvancedSearch->UnsetSession();
		$this->visitas->AdvancedSearch->UnsetSession();
		$this->activo->AdvancedSearch->UnsetSession();
	}

	// Restore all search parameters
	function RestoreSearchParms() {
		$this->RestoreSearch = TRUE;

		// Restore basic search values
		$this->BasicSearch->Load();

		// Restore advanced search values
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

	// Set up sort parameters
	function SetupSortOrder() {

		// Check for Ctrl pressed
		$bCtrl = (@$_GET["ctrl"] <> "");

		// Check for "order" parameter
		if (@$_GET["order"] <> "") {
			$this->CurrentOrder = @$_GET["order"];
			$this->CurrentOrderType = @$_GET["ordertype"];
			$this->UpdateSort($this->id, $bCtrl); // id
			$this->UpdateSort($this->producto, $bCtrl); // producto
			$this->UpdateSort($this->marca_id, $bCtrl); // marca_id
			$this->UpdateSort($this->rubro_id, $bCtrl); // rubro_id
			$this->UpdateSort($this->moneda_id, $bCtrl); // moneda_id
			$this->UpdateSort($this->precio, $bCtrl); // precio
			$this->UpdateSort($this->stock, $bCtrl); // stock
			$this->UpdateSort($this->destacado, $bCtrl); // destacado
			$this->UpdateSort($this->visitas, $bCtrl); // visitas
			$this->UpdateSort($this->activo, $bCtrl); // activo
			$this->setStartRecordNumber(1); // Reset start position
		}
	}

	// Load sort order parameters
	function LoadSortOrder() {
		$sOrderBy = $this->getSessionOrderBy(); // Get ORDER BY from Session
		if ($sOrderBy == "") {
			if ($this->getSqlOrderBy() <> "") {
				$sOrderBy = $this->getSqlOrderBy();
				$this->setSessionOrderBy($sOrderBy);
				$this->producto->setSort("ASC");
			}
		}
	}

	// Reset command
	// - cmd=reset (Reset search parameters)
	// - cmd=resetall (Reset search and master/detail parameters)
	// - cmd=resetsort (Reset sort parameters)
	function ResetCmd() {

		// Check if reset command
		if (substr($this->Command,0,5) == "reset") {

			// Reset search criteria
			if ($this->Command == "reset" || $this->Command == "resetall")
				$this->ResetSearchParms();

			// Reset sorting order
			if ($this->Command == "resetsort") {
				$sOrderBy = "";
				$this->setSessionOrderBy($sOrderBy);
				$this->id->setSort("");
				$this->producto->setSort("");
				$this->marca_id->setSort("");
				$this->rubro_id->setSort("");
				$this->moneda_id->setSort("");
				$this->precio->setSort("");
				$this->stock->setSort("");
				$this->destacado->setSort("");
				$this->visitas->setSort("");
				$this->activo->setSort("");
			}

			// Reset start position
			$this->StartRec = 1;
			$this->setStartRecordNumber($this->StartRec);
		}
	}

	// Set up list options
	function SetupListOptions() {
		global $Security, $Language;

		// Add group option item
		$item = &$this->ListOptions->Add($this->ListOptions->GroupOptionName);
		$item->Body = "";
		$item->OnLeft = TRUE;
		$item->Visible = FALSE;

		// "view"
		$item = &$this->ListOptions->Add("view");
		$item->CssClass = "text-nowrap";
		$item->Visible = $Security->IsLoggedIn();
		$item->OnLeft = TRUE;

		// "edit"
		$item = &$this->ListOptions->Add("edit");
		$item->CssClass = "text-nowrap";
		$item->Visible = $Security->IsLoggedIn();
		$item->OnLeft = TRUE;

		// "detail_productoespecificaciones"
		$item = &$this->ListOptions->Add("detail_productoespecificaciones");
		$item->CssClass = "text-nowrap";
		$item->Visible = $Security->IsLoggedIn() && !$this->ShowMultipleDetails;
		$item->OnLeft = TRUE;
		$item->ShowInButtonGroup = FALSE;
		if (!isset($GLOBALS["productoespecificaciones_grid"])) $GLOBALS["productoespecificaciones_grid"] = new cproductoespecificaciones_grid;

		// "detail_productofotos"
		$item = &$this->ListOptions->Add("detail_productofotos");
		$item->CssClass = "text-nowrap";
		$item->Visible = $Security->IsLoggedIn() && !$this->ShowMultipleDetails;
		$item->OnLeft = TRUE;
		$item->ShowInButtonGroup = FALSE;
		if (!isset($GLOBALS["productofotos_grid"])) $GLOBALS["productofotos_grid"] = new cproductofotos_grid;

		// "detail_productoversiones"
		$item = &$this->ListOptions->Add("detail_productoversiones");
		$item->CssClass = "text-nowrap";
		$item->Visible = $Security->IsLoggedIn() && !$this->ShowMultipleDetails;
		$item->OnLeft = TRUE;
		$item->ShowInButtonGroup = FALSE;
		if (!isset($GLOBALS["productoversiones_grid"])) $GLOBALS["productoversiones_grid"] = new cproductoversiones_grid;

		// Multiple details
		if ($this->ShowMultipleDetails) {
			$item = &$this->ListOptions->Add("details");
			$item->CssClass = "text-nowrap";
			$item->Visible = $this->ShowMultipleDetails;
			$item->OnLeft = TRUE;
			$item->ShowInButtonGroup = FALSE;
		}

		// Set up detail pages
		$pages = new cSubPages();
		$pages->Add("productoespecificaciones");
		$pages->Add("productofotos");
		$pages->Add("productoversiones");
		$this->DetailPages = $pages;

		// List actions
		$item = &$this->ListOptions->Add("listactions");
		$item->CssClass = "text-nowrap";
		$item->OnLeft = TRUE;
		$item->Visible = FALSE;
		$item->ShowInButtonGroup = FALSE;
		$item->ShowInDropDown = FALSE;

		// "checkbox"
		$item = &$this->ListOptions->Add("checkbox");
		$item->Visible = $Security->IsLoggedIn();
		$item->OnLeft = TRUE;
		$item->Header = "<input type=\"checkbox\" name=\"key\" id=\"key\" onclick=\"ew_SelectAllKey(this);\">";
		$item->MoveTo(0);
		$item->ShowInDropDown = FALSE;
		$item->ShowInButtonGroup = FALSE;

		// Drop down button for ListOptions
		$this->ListOptions->UseImageAndText = TRUE;
		$this->ListOptions->UseDropDownButton = FALSE;
		$this->ListOptions->DropDownButtonPhrase = $Language->Phrase("ButtonListOptions");
		$this->ListOptions->UseButtonGroup = FALSE;
		if ($this->ListOptions->UseButtonGroup && ew_IsMobile())
			$this->ListOptions->UseDropDownButton = TRUE;
		$this->ListOptions->ButtonClass = "btn-sm"; // Class for button group

		// Call ListOptions_Load event
		$this->ListOptions_Load();
		$this->SetupListOptionsExt();
		$item = &$this->ListOptions->GetItem($this->ListOptions->GroupOptionName);
		$item->Visible = $this->ListOptions->GroupOptionVisible();
	}

	// Render list options
	function RenderListOptions() {
		global $Security, $Language, $objForm;
		$this->ListOptions->LoadDefault();

		// Call ListOptions_Rendering event
		$this->ListOptions_Rendering();

		// "view"
		$oListOpt = &$this->ListOptions->Items["view"];
		$viewcaption = ew_HtmlTitle($Language->Phrase("ViewLink"));
		if ($Security->IsLoggedIn()) {
			$oListOpt->Body = "<a class=\"ewRowLink ewView\" title=\"" . $viewcaption . "\" data-caption=\"" . $viewcaption . "\" href=\"" . ew_HtmlEncode($this->ViewUrl) . "\">" . $Language->Phrase("ViewLink") . "</a>";
		} else {
			$oListOpt->Body = "";
		}

		// "edit"
		$oListOpt = &$this->ListOptions->Items["edit"];
		$editcaption = ew_HtmlTitle($Language->Phrase("EditLink"));
		if ($Security->IsLoggedIn()) {
			$oListOpt->Body = "<a class=\"ewRowLink ewEdit\" title=\"" . ew_HtmlTitle($Language->Phrase("EditLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("EditLink")) . "\" href=\"" . ew_HtmlEncode($this->EditUrl) . "\">" . $Language->Phrase("EditLink") . "</a>";
		} else {
			$oListOpt->Body = "";
		}

		// Set up list action buttons
		$oListOpt = &$this->ListOptions->GetItem("listactions");
		if ($oListOpt && $this->Export == "" && $this->CurrentAction == "") {
			$body = "";
			$links = array();
			foreach ($this->ListActions->Items as $listaction) {
				if ($listaction->Select == EW_ACTION_SINGLE && $listaction->Allow) {
					$action = $listaction->Action;
					$caption = $listaction->Caption;
					$icon = ($listaction->Icon <> "") ? "<span class=\"" . ew_HtmlEncode(str_replace(" ewIcon", "", $listaction->Icon)) . "\" data-caption=\"" . ew_HtmlTitle($caption) . "\"></span> " : "";
					$links[] = "<li><a class=\"ewAction ewListAction\" data-action=\"" . ew_HtmlEncode($action) . "\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"\" onclick=\"ew_SubmitAction(event,jQuery.extend({key:" . $this->KeyToJson() . "}," . $listaction->ToJson(TRUE) . "));return false;\">" . $icon . $listaction->Caption . "</a></li>";
					if (count($links) == 1) // Single button
						$body = "<a class=\"ewAction ewListAction\" data-action=\"" . ew_HtmlEncode($action) . "\" title=\"" . ew_HtmlTitle($caption) . "\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"\" onclick=\"ew_SubmitAction(event,jQuery.extend({key:" . $this->KeyToJson() . "}," . $listaction->ToJson(TRUE) . "));return false;\">" . $Language->Phrase("ListActionButton") . "</a>";
				}
			}
			if (count($links) > 1) { // More than one buttons, use dropdown
				$body = "<button class=\"dropdown-toggle btn btn-default btn-sm ewActions\" title=\"" . ew_HtmlTitle($Language->Phrase("ListActionButton")) . "\" data-toggle=\"dropdown\">" . $Language->Phrase("ListActionButton") . "<b class=\"caret\"></b></button>";
				$content = "";
				foreach ($links as $link)
					$content .= "<li>" . $link . "</li>";
				$body .= "<ul class=\"dropdown-menu" . ($oListOpt->OnLeft ? "" : " dropdown-menu-right") . "\">". $content . "</ul>";
				$body = "<div class=\"btn-group\">" . $body . "</div>";
			}
			if (count($links) > 0) {
				$oListOpt->Body = $body;
				$oListOpt->Visible = TRUE;
			}
		}
		$DetailViewTblVar = "";
		$DetailCopyTblVar = "";
		$DetailEditTblVar = "";

		// "detail_productoespecificaciones"
		$oListOpt = &$this->ListOptions->Items["detail_productoespecificaciones"];
		if ($Security->IsLoggedIn()) {
			$body = $Language->Phrase("DetailLink") . $Language->TablePhrase("productoespecificaciones", "TblCaption");
			$body .= "&nbsp;" . str_replace("%c", $this->productoespecificaciones_Count, $Language->Phrase("DetailCount"));
			$body = "<a class=\"btn btn-default btn-sm ewRowLink ewDetail\" data-action=\"list\" href=\"" . ew_HtmlEncode("productoespecificacioneslist.php?" . EW_TABLE_SHOW_MASTER . "=productos&fk_id=" . urlencode(strval($this->id->CurrentValue)) . "") . "\">" . $body . "</a>";
			$links = "";
			if ($GLOBALS["productoespecificaciones_grid"]->DetailView && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
				$caption = $Language->Phrase("MasterDetailViewLink");
				$url = $this->GetViewUrl(EW_TABLE_SHOW_DETAIL . "=productoespecificaciones");
				$links .= "<li><a class=\"ewRowLink ewDetailView\" data-action=\"view\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"" . ew_HtmlEncode($url) . "\">" . ew_HtmlImageAndText($caption) . "</a></li>";
				if ($DetailViewTblVar <> "") $DetailViewTblVar .= ",";
				$DetailViewTblVar .= "productoespecificaciones";
			}
			if ($GLOBALS["productoespecificaciones_grid"]->DetailEdit && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
				$caption = $Language->Phrase("MasterDetailEditLink");
				$url = $this->GetEditUrl(EW_TABLE_SHOW_DETAIL . "=productoespecificaciones");
				$links .= "<li><a class=\"ewRowLink ewDetailEdit\" data-action=\"edit\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"" . ew_HtmlEncode($url) . "\">" . ew_HtmlImageAndText($caption) . "</a></li>";
				if ($DetailEditTblVar <> "") $DetailEditTblVar .= ",";
				$DetailEditTblVar .= "productoespecificaciones";
			}
			if ($links <> "") {
				$body .= "<button class=\"dropdown-toggle btn btn-default btn-sm ewDetail\" data-toggle=\"dropdown\"><b class=\"caret\"></b></button>";
				$body .= "<ul class=\"dropdown-menu\">". $links . "</ul>";
			}
			$body = "<div class=\"btn-group\">" . $body . "</div>";
			$oListOpt->Body = $body;
			if ($this->ShowMultipleDetails) $oListOpt->Visible = FALSE;
		}

		// "detail_productofotos"
		$oListOpt = &$this->ListOptions->Items["detail_productofotos"];
		if ($Security->IsLoggedIn()) {
			$body = $Language->Phrase("DetailLink") . $Language->TablePhrase("productofotos", "TblCaption");
			$body .= "&nbsp;" . str_replace("%c", $this->productofotos_Count, $Language->Phrase("DetailCount"));
			$body = "<a class=\"btn btn-default btn-sm ewRowLink ewDetail\" data-action=\"list\" href=\"" . ew_HtmlEncode("productofotoslist.php?" . EW_TABLE_SHOW_MASTER . "=productos&fk_id=" . urlencode(strval($this->id->CurrentValue)) . "") . "\">" . $body . "</a>";
			$links = "";
			if ($GLOBALS["productofotos_grid"]->DetailView && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
				$caption = $Language->Phrase("MasterDetailViewLink");
				$url = $this->GetViewUrl(EW_TABLE_SHOW_DETAIL . "=productofotos");
				$links .= "<li><a class=\"ewRowLink ewDetailView\" data-action=\"view\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"" . ew_HtmlEncode($url) . "\">" . ew_HtmlImageAndText($caption) . "</a></li>";
				if ($DetailViewTblVar <> "") $DetailViewTblVar .= ",";
				$DetailViewTblVar .= "productofotos";
			}
			if ($GLOBALS["productofotos_grid"]->DetailEdit && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
				$caption = $Language->Phrase("MasterDetailEditLink");
				$url = $this->GetEditUrl(EW_TABLE_SHOW_DETAIL . "=productofotos");
				$links .= "<li><a class=\"ewRowLink ewDetailEdit\" data-action=\"edit\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"" . ew_HtmlEncode($url) . "\">" . ew_HtmlImageAndText($caption) . "</a></li>";
				if ($DetailEditTblVar <> "") $DetailEditTblVar .= ",";
				$DetailEditTblVar .= "productofotos";
			}
			if ($links <> "") {
				$body .= "<button class=\"dropdown-toggle btn btn-default btn-sm ewDetail\" data-toggle=\"dropdown\"><b class=\"caret\"></b></button>";
				$body .= "<ul class=\"dropdown-menu\">". $links . "</ul>";
			}
			$body = "<div class=\"btn-group\">" . $body . "</div>";
			$oListOpt->Body = $body;
			if ($this->ShowMultipleDetails) $oListOpt->Visible = FALSE;
		}

		// "detail_productoversiones"
		$oListOpt = &$this->ListOptions->Items["detail_productoversiones"];
		if ($Security->IsLoggedIn()) {
			$body = $Language->Phrase("DetailLink") . $Language->TablePhrase("productoversiones", "TblCaption");
			$body .= "&nbsp;" . str_replace("%c", $this->productoversiones_Count, $Language->Phrase("DetailCount"));
			$body = "<a class=\"btn btn-default btn-sm ewRowLink ewDetail\" data-action=\"list\" href=\"" . ew_HtmlEncode("productoversioneslist.php?" . EW_TABLE_SHOW_MASTER . "=productos&fk_id=" . urlencode(strval($this->id->CurrentValue)) . "") . "\">" . $body . "</a>";
			$links = "";
			if ($GLOBALS["productoversiones_grid"]->DetailView && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
				$caption = $Language->Phrase("MasterDetailViewLink");
				$url = $this->GetViewUrl(EW_TABLE_SHOW_DETAIL . "=productoversiones");
				$links .= "<li><a class=\"ewRowLink ewDetailView\" data-action=\"view\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"" . ew_HtmlEncode($url) . "\">" . ew_HtmlImageAndText($caption) . "</a></li>";
				if ($DetailViewTblVar <> "") $DetailViewTblVar .= ",";
				$DetailViewTblVar .= "productoversiones";
			}
			if ($GLOBALS["productoversiones_grid"]->DetailEdit && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
				$caption = $Language->Phrase("MasterDetailEditLink");
				$url = $this->GetEditUrl(EW_TABLE_SHOW_DETAIL . "=productoversiones");
				$links .= "<li><a class=\"ewRowLink ewDetailEdit\" data-action=\"edit\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"" . ew_HtmlEncode($url) . "\">" . ew_HtmlImageAndText($caption) . "</a></li>";
				if ($DetailEditTblVar <> "") $DetailEditTblVar .= ",";
				$DetailEditTblVar .= "productoversiones";
			}
			if ($links <> "") {
				$body .= "<button class=\"dropdown-toggle btn btn-default btn-sm ewDetail\" data-toggle=\"dropdown\"><b class=\"caret\"></b></button>";
				$body .= "<ul class=\"dropdown-menu\">". $links . "</ul>";
			}
			$body = "<div class=\"btn-group\">" . $body . "</div>";
			$oListOpt->Body = $body;
			if ($this->ShowMultipleDetails) $oListOpt->Visible = FALSE;
		}
		if ($this->ShowMultipleDetails) {
			$body = $Language->Phrase("MultipleMasterDetails");
			$body = "<div class=\"btn-group\">";
			$links = "";
			if ($DetailViewTblVar <> "") {
				$links .= "<li><a class=\"ewRowLink ewDetailView\" data-action=\"view\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("MasterDetailViewLink")) . "\" href=\"" . ew_HtmlEncode($this->GetViewUrl(EW_TABLE_SHOW_DETAIL . "=" . $DetailViewTblVar)) . "\">" . ew_HtmlImageAndText($Language->Phrase("MasterDetailViewLink")) . "</a></li>";
			}
			if ($DetailEditTblVar <> "") {
				$links .= "<li><a class=\"ewRowLink ewDetailEdit\" data-action=\"edit\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("MasterDetailEditLink")) . "\" href=\"" . ew_HtmlEncode($this->GetEditUrl(EW_TABLE_SHOW_DETAIL . "=" . $DetailEditTblVar)) . "\">" . ew_HtmlImageAndText($Language->Phrase("MasterDetailEditLink")) . "</a></li>";
			}
			if ($DetailCopyTblVar <> "") {
				$links .= "<li><a class=\"ewRowLink ewDetailCopy\" data-action=\"add\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("MasterDetailCopyLink")) . "\" href=\"" . ew_HtmlEncode($this->GetCopyUrl(EW_TABLE_SHOW_DETAIL . "=" . $DetailCopyTblVar)) . "\">" . ew_HtmlImageAndText($Language->Phrase("MasterDetailCopyLink")) . "</a></li>";
			}
			if ($links <> "") {
				$body .= "<button class=\"dropdown-toggle btn btn-default btn-sm ewMasterDetail\" title=\"" . ew_HtmlTitle($Language->Phrase("MultipleMasterDetails")) . "\" data-toggle=\"dropdown\">" . $Language->Phrase("MultipleMasterDetails") . "<b class=\"caret\"></b></button>";
				$body .= "<ul class=\"dropdown-menu ewMenu\">". $links . "</ul>";
			}
			$body .= "</div>";

			// Multiple details
			$oListOpt = &$this->ListOptions->Items["details"];
			$oListOpt->Body = $body;
		}

		// "checkbox"
		$oListOpt = &$this->ListOptions->Items["checkbox"];
		$oListOpt->Body = "<input type=\"checkbox\" name=\"key_m[]\" class=\"ewMultiSelect\" value=\"" . ew_HtmlEncode($this->id->CurrentValue) . "\" onclick=\"ew_ClickMultiCheckbox(event);\">";
		$this->RenderListOptionsExt();

		// Call ListOptions_Rendered event
		$this->ListOptions_Rendered();
	}

	// Set up other options
	function SetupOtherOptions() {
		global $Language, $Security;
		$options = &$this->OtherOptions;
		$option = $options["addedit"];

		// Add
		$item = &$option->Add("add");
		$addcaption = ew_HtmlTitle($Language->Phrase("AddLink"));
		$item->Body = "<a class=\"ewAddEdit ewAdd\" title=\"" . $addcaption . "\" data-caption=\"" . $addcaption . "\" href=\"" . ew_HtmlEncode($this->AddUrl) . "\">" . $Language->Phrase("AddLink") . "</a>";
		$item->Visible = ($this->AddUrl <> "" && $Security->IsLoggedIn());
		$option = $options["detail"];
		$DetailTableLink = "";
		$item = &$option->Add("detailadd_productoespecificaciones");
		$url = $this->GetAddUrl(EW_TABLE_SHOW_DETAIL . "=productoespecificaciones");
		$caption = $Language->Phrase("Add") . "&nbsp;" . $this->TableCaption() . "/" . $GLOBALS["productoespecificaciones"]->TableCaption();
		$item->Body = "<a class=\"ewDetailAddGroup ewDetailAdd\" title=\"" . ew_HtmlTitle($caption) . "\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"" . ew_HtmlEncode($url) . "\">" . $caption . "</a>";
		$item->Visible = ($GLOBALS["productoespecificaciones"]->DetailAdd && $Security->IsLoggedIn() && $Security->IsLoggedIn());
		if ($item->Visible) {
			if ($DetailTableLink <> "") $DetailTableLink .= ",";
			$DetailTableLink .= "productoespecificaciones";
		}
		$item = &$option->Add("detailadd_productofotos");
		$url = $this->GetAddUrl(EW_TABLE_SHOW_DETAIL . "=productofotos");
		$caption = $Language->Phrase("Add") . "&nbsp;" . $this->TableCaption() . "/" . $GLOBALS["productofotos"]->TableCaption();
		$item->Body = "<a class=\"ewDetailAddGroup ewDetailAdd\" title=\"" . ew_HtmlTitle($caption) . "\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"" . ew_HtmlEncode($url) . "\">" . $caption . "</a>";
		$item->Visible = ($GLOBALS["productofotos"]->DetailAdd && $Security->IsLoggedIn() && $Security->IsLoggedIn());
		if ($item->Visible) {
			if ($DetailTableLink <> "") $DetailTableLink .= ",";
			$DetailTableLink .= "productofotos";
		}
		$item = &$option->Add("detailadd_productoversiones");
		$url = $this->GetAddUrl(EW_TABLE_SHOW_DETAIL . "=productoversiones");
		$caption = $Language->Phrase("Add") . "&nbsp;" . $this->TableCaption() . "/" . $GLOBALS["productoversiones"]->TableCaption();
		$item->Body = "<a class=\"ewDetailAddGroup ewDetailAdd\" title=\"" . ew_HtmlTitle($caption) . "\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"" . ew_HtmlEncode($url) . "\">" . $caption . "</a>";
		$item->Visible = ($GLOBALS["productoversiones"]->DetailAdd && $Security->IsLoggedIn() && $Security->IsLoggedIn());
		if ($item->Visible) {
			if ($DetailTableLink <> "") $DetailTableLink .= ",";
			$DetailTableLink .= "productoversiones";
		}

		// Add multiple details
		if ($this->ShowMultipleDetails) {
			$item = &$option->Add("detailsadd");
			$url = $this->GetAddUrl(EW_TABLE_SHOW_DETAIL . "=" . $DetailTableLink);
			$caption = $Language->Phrase("AddMasterDetailLink");
			$item->Body = "<a class=\"ewDetailAddGroup ewDetailAdd\" title=\"" . ew_HtmlTitle($caption) . "\" data-caption=\"" . ew_HtmlTitle($caption) . "\" href=\"" . ew_HtmlEncode($url) . "\">" . $caption . "</a>";
			$item->Visible = ($DetailTableLink <> "" && $Security->IsLoggedIn());

			// Hide single master/detail items
			$ar = explode(",", $DetailTableLink);
			$cnt = count($ar);
			for ($i = 0; $i < $cnt; $i++) {
				if ($item = &$option->GetItem("detailadd_" . $ar[$i]))
					$item->Visible = FALSE;
			}
		}
		$option = $options["action"];

		// Add multi delete
		$item = &$option->Add("multidelete");
		$item->Body = "<a class=\"ewAction ewMultiDelete\" title=\"" . ew_HtmlTitle($Language->Phrase("DeleteSelectedLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("DeleteSelectedLink")) . "\" href=\"\" onclick=\"ew_SubmitAction(event,{f:document.fproductoslist,url:'" . $this->MultiDeleteUrl . "'});return false;\">" . $Language->Phrase("DeleteSelectedLink") . "</a>";
		$item->Visible = ($Security->IsLoggedIn());

		// Set up options default
		foreach ($options as &$option) {
			$option->UseImageAndText = TRUE;
			$option->UseDropDownButton = FALSE;
			$option->UseButtonGroup = TRUE;
			$option->ButtonClass = "btn-sm"; // Class for button group
			$item = &$option->Add($option->GroupOptionName);
			$item->Body = "";
			$item->Visible = FALSE;
		}
		$options["addedit"]->DropDownButtonPhrase = $Language->Phrase("ButtonAddEdit");
		$options["detail"]->DropDownButtonPhrase = $Language->Phrase("ButtonDetails");
		$options["action"]->DropDownButtonPhrase = $Language->Phrase("ButtonActions");

		// Filter button
		$item = &$this->FilterOptions->Add("savecurrentfilter");
		$item->Body = "<a class=\"ewSaveFilter\" data-form=\"fproductoslistsrch\" href=\"#\">" . $Language->Phrase("SaveCurrentFilter") . "</a>";
		$item->Visible = TRUE;
		$item = &$this->FilterOptions->Add("deletefilter");
		$item->Body = "<a class=\"ewDeleteFilter\" data-form=\"fproductoslistsrch\" href=\"#\">" . $Language->Phrase("DeleteFilter") . "</a>";
		$item->Visible = TRUE;
		$this->FilterOptions->UseDropDownButton = TRUE;
		$this->FilterOptions->UseButtonGroup = !$this->FilterOptions->UseDropDownButton;
		$this->FilterOptions->DropDownButtonPhrase = $Language->Phrase("Filters");

		// Add group option item
		$item = &$this->FilterOptions->Add($this->FilterOptions->GroupOptionName);
		$item->Body = "";
		$item->Visible = FALSE;
	}

	// Render other options
	function RenderOtherOptions() {
		global $Language, $Security;
		$options = &$this->OtherOptions;
			$option = &$options["action"];

			// Set up list action buttons
			foreach ($this->ListActions->Items as $listaction) {
				if ($listaction->Select == EW_ACTION_MULTIPLE) {
					$item = &$option->Add("custom_" . $listaction->Action);
					$caption = $listaction->Caption;
					$icon = ($listaction->Icon <> "") ? "<span class=\"" . ew_HtmlEncode($listaction->Icon) . "\" data-caption=\"" . ew_HtmlEncode($caption) . "\"></span> " : $caption;
					$item->Body = "<a class=\"ewAction ewListAction\" title=\"" . ew_HtmlEncode($caption) . "\" data-caption=\"" . ew_HtmlEncode($caption) . "\" href=\"\" onclick=\"ew_SubmitAction(event,jQuery.extend({f:document.fproductoslist}," . $listaction->ToJson(TRUE) . "));return false;\">" . $icon . "</a>";
					$item->Visible = $listaction->Allow;
				}
			}

			// Hide grid edit and other options
			if ($this->TotalRecs <= 0) {
				$option = &$options["addedit"];
				$item = &$option->GetItem("gridedit");
				if ($item) $item->Visible = FALSE;
				$option = &$options["action"];
				$option->HideAllOptions();
			}
	}

	// Process list action
	function ProcessListAction() {
		global $Language, $Security;
		$userlist = "";
		$user = "";
		$sFilter = $this->GetKeyFilter();
		$UserAction = @$_POST["useraction"];
		if ($sFilter <> "" && $UserAction <> "") {

			// Check permission first
			$ActionCaption = $UserAction;
			if (array_key_exists($UserAction, $this->ListActions->Items)) {
				$ActionCaption = $this->ListActions->Items[$UserAction]->Caption;
				if (!$this->ListActions->Items[$UserAction]->Allow) {
					$errmsg = str_replace('%s', $ActionCaption, $Language->Phrase("CustomActionNotAllowed"));
					if (@$_POST["ajax"] == $UserAction) // Ajax
						echo "<p class=\"text-danger\">" . $errmsg . "</p>";
					else
						$this->setFailureMessage($errmsg);
					return FALSE;
				}
			}
			$this->CurrentFilter = $sFilter;
			$sSql = $this->SQL();
			$conn = &$this->Connection();
			$conn->raiseErrorFn = $GLOBALS["EW_ERROR_FN"];
			$rs = $conn->Execute($sSql);
			$conn->raiseErrorFn = '';
			$this->CurrentAction = $UserAction;

			// Call row action event
			if ($rs && !$rs->EOF) {
				$conn->BeginTrans();
				$this->SelectedCount = $rs->RecordCount();
				$this->SelectedIndex = 0;
				while (!$rs->EOF) {
					$this->SelectedIndex++;
					$row = $rs->fields;
					$Processed = $this->Row_CustomAction($UserAction, $row);
					if (!$Processed) break;
					$rs->MoveNext();
				}
				if ($Processed) {
					$conn->CommitTrans(); // Commit the changes
					if ($this->getSuccessMessage() == "")
						$this->setSuccessMessage(str_replace('%s', $ActionCaption, $Language->Phrase("CustomActionCompleted"))); // Set up success message
				} else {
					$conn->RollbackTrans(); // Rollback changes

					// Set up error message
					if ($this->getSuccessMessage() <> "" || $this->getFailureMessage() <> "") {

						// Use the message, do nothing
					} elseif ($this->CancelMessage <> "") {
						$this->setFailureMessage($this->CancelMessage);
						$this->CancelMessage = "";
					} else {
						$this->setFailureMessage(str_replace('%s', $ActionCaption, $Language->Phrase("CustomActionFailed")));
					}
				}
			}
			if ($rs)
				$rs->Close();
			$this->CurrentAction = ""; // Clear action
			if (@$_POST["ajax"] == $UserAction) { // Ajax
				if ($this->getSuccessMessage() <> "") {
					echo "<p class=\"text-success\">" . $this->getSuccessMessage() . "</p>";
					$this->ClearSuccessMessage(); // Clear message
				}
				if ($this->getFailureMessage() <> "") {
					echo "<p class=\"text-danger\">" . $this->getFailureMessage() . "</p>";
					$this->ClearFailureMessage(); // Clear message
				}
				return TRUE;
			}
		}
		return FALSE; // Not ajax request
	}

	// Set up search options
	function SetupSearchOptions() {
		global $Language;
		$this->SearchOptions = new cListOptions();
		$this->SearchOptions->Tag = "div";
		$this->SearchOptions->TagClassName = "ewSearchOption";

		// Search button
		$item = &$this->SearchOptions->Add("searchtoggle");
		$SearchToggleClass = ($this->SearchWhere <> "") ? " active" : " active";
		$item->Body = "<button type=\"button\" class=\"btn btn-default ewSearchToggle" . $SearchToggleClass . "\" title=\"" . $Language->Phrase("SearchPanel") . "\" data-caption=\"" . $Language->Phrase("SearchPanel") . "\" data-toggle=\"button\" data-form=\"fproductoslistsrch\">" . $Language->Phrase("SearchLink") . "</button>";
		$item->Visible = TRUE;

		// Show all button
		$item = &$this->SearchOptions->Add("showall");
		$item->Body = "<a class=\"btn btn-default ewShowAll\" title=\"" . $Language->Phrase("ShowAll") . "\" data-caption=\"" . $Language->Phrase("ShowAll") . "\" href=\"" . $this->PageUrl() . "cmd=reset\">" . $Language->Phrase("ShowAllBtn") . "</a>";
		$item->Visible = ($this->SearchWhere <> $this->DefaultSearchWhere && $this->SearchWhere <> "0=101");

		// Advanced search button
		$item = &$this->SearchOptions->Add("advancedsearch");
		$item->Body = "<a class=\"btn btn-default ewAdvancedSearch\" title=\"" . $Language->Phrase("AdvancedSearch") . "\" data-caption=\"" . $Language->Phrase("AdvancedSearch") . "\" href=\"productossrch.php\">" . $Language->Phrase("AdvancedSearchBtn") . "</a>";
		$item->Visible = TRUE;

		// Button group for search
		$this->SearchOptions->UseDropDownButton = FALSE;
		$this->SearchOptions->UseImageAndText = TRUE;
		$this->SearchOptions->UseButtonGroup = TRUE;
		$this->SearchOptions->DropDownButtonPhrase = $Language->Phrase("ButtonSearch");

		// Add group option item
		$item = &$this->SearchOptions->Add($this->SearchOptions->GroupOptionName);
		$item->Body = "";
		$item->Visible = FALSE;

		// Hide search options
		if ($this->Export <> "" || $this->CurrentAction <> "")
			$this->SearchOptions->HideAllOptions();
	}

	function SetupListOptionsExt() {
		global $Security, $Language;
	}

	function RenderListOptionsExt() {
		global $Security, $Language;
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

	// Load basic search values
	function LoadBasicSearchValues() {
		$this->BasicSearch->Keyword = @$_GET[EW_TABLE_BASIC_SEARCH];
		if ($this->BasicSearch->Keyword <> "" && $this->Command == "") $this->Command = "search";
		$this->BasicSearch->Type = @$_GET[EW_TABLE_BASIC_SEARCH_TYPE];
	}

	// Load search values for validation
	function LoadSearchValues() {
		global $objForm;

		// Load search values
		// id

		$this->id->AdvancedSearch->SearchValue = @$_GET["x_id"];
		if ($this->id->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->id->AdvancedSearch->SearchOperator = @$_GET["z_id"];

		// producto
		$this->producto->AdvancedSearch->SearchValue = @$_GET["x_producto"];
		if ($this->producto->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->producto->AdvancedSearch->SearchOperator = @$_GET["z_producto"];

		// marca_id
		$this->marca_id->AdvancedSearch->SearchValue = @$_GET["x_marca_id"];
		if ($this->marca_id->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->marca_id->AdvancedSearch->SearchOperator = @$_GET["z_marca_id"];

		// rubro_id
		$this->rubro_id->AdvancedSearch->SearchValue = @$_GET["x_rubro_id"];
		if ($this->rubro_id->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->rubro_id->AdvancedSearch->SearchOperator = @$_GET["z_rubro_id"];

		// moneda_id
		$this->moneda_id->AdvancedSearch->SearchValue = @$_GET["x_moneda_id"];
		if ($this->moneda_id->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->moneda_id->AdvancedSearch->SearchOperator = @$_GET["z_moneda_id"];

		// descripcion
		$this->descripcion->AdvancedSearch->SearchValue = @$_GET["x_descripcion"];
		if ($this->descripcion->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->descripcion->AdvancedSearch->SearchOperator = @$_GET["z_descripcion"];

		// foto
		$this->foto->AdvancedSearch->SearchValue = @$_GET["x_foto"];
		if ($this->foto->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->foto->AdvancedSearch->SearchOperator = @$_GET["z_foto"];

		// precio
		$this->precio->AdvancedSearch->SearchValue = @$_GET["x_precio"];
		if ($this->precio->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->precio->AdvancedSearch->SearchOperator = @$_GET["z_precio"];

		// stock
		$this->stock->AdvancedSearch->SearchValue = @$_GET["x_stock"];
		if ($this->stock->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->stock->AdvancedSearch->SearchOperator = @$_GET["z_stock"];

		// destacado
		$this->destacado->AdvancedSearch->SearchValue = @$_GET["x_destacado"];
		if ($this->destacado->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->destacado->AdvancedSearch->SearchOperator = @$_GET["z_destacado"];

		// visitas
		$this->visitas->AdvancedSearch->SearchValue = @$_GET["x_visitas"];
		if ($this->visitas->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->visitas->AdvancedSearch->SearchOperator = @$_GET["z_visitas"];

		// activo
		$this->activo->AdvancedSearch->SearchValue = @$_GET["x_activo"];
		if ($this->activo->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->activo->AdvancedSearch->SearchOperator = @$_GET["z_activo"];
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
		if (!isset($GLOBALS["productoespecificaciones_grid"])) $GLOBALS["productoespecificaciones_grid"] = new cproductoespecificaciones_grid;
		$sDetailFilter = $GLOBALS["productoespecificaciones"]->SqlDetailFilter_productos();
		$sDetailFilter = str_replace("@producto_id@", ew_AdjustSql($this->id->DbValue, "DB"), $sDetailFilter);
		$GLOBALS["productoespecificaciones"]->setCurrentMasterTable("productos");
		$sDetailFilter = $GLOBALS["productoespecificaciones"]->ApplyUserIDFilters($sDetailFilter);
		$this->productoespecificaciones_Count = $GLOBALS["productoespecificaciones"]->LoadRecordCount($sDetailFilter);
		if (!isset($GLOBALS["productofotos_grid"])) $GLOBALS["productofotos_grid"] = new cproductofotos_grid;
		$sDetailFilter = $GLOBALS["productofotos"]->SqlDetailFilter_productos();
		$sDetailFilter = str_replace("@producto_id@", ew_AdjustSql($this->id->DbValue, "DB"), $sDetailFilter);
		$GLOBALS["productofotos"]->setCurrentMasterTable("productos");
		$sDetailFilter = $GLOBALS["productofotos"]->ApplyUserIDFilters($sDetailFilter);
		$this->productofotos_Count = $GLOBALS["productofotos"]->LoadRecordCount($sDetailFilter);
		if (!isset($GLOBALS["productoversiones_grid"])) $GLOBALS["productoversiones_grid"] = new cproductoversiones_grid;
		$sDetailFilter = $GLOBALS["productoversiones"]->SqlDetailFilter_productos();
		$sDetailFilter = str_replace("@producto_id@", ew_AdjustSql($this->id->DbValue, "DB"), $sDetailFilter);
		$GLOBALS["productoversiones"]->setCurrentMasterTable("productos");
		$sDetailFilter = $GLOBALS["productoversiones"]->ApplyUserIDFilters($sDetailFilter);
		$this->productoversiones_Count = $GLOBALS["productoversiones"]->LoadRecordCount($sDetailFilter);
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
		$this->ViewUrl = $this->GetViewUrl();
		$this->EditUrl = $this->GetEditUrl();
		$this->InlineEditUrl = $this->GetInlineEditUrl();
		$this->CopyUrl = $this->GetCopyUrl();
		$this->InlineCopyUrl = $this->GetInlineCopyUrl();
		$this->DeleteUrl = $this->GetDeleteUrl();

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

	// Validate search
	function ValidateSearch() {
		global $gsSearchError;

		// Initialize
		$gsSearchError = "";

		// Check if validation required
		if (!EW_SERVER_VALIDATE)
			return TRUE;

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
		$url = preg_replace('/\?cmd=reset(all){0,1}$/i', '', $url); // Remove cmd=reset / cmd=resetall
		$Breadcrumb->Add("list", $this->TableVar, $url, "", $this->TableVar, TRUE);
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

	// ListOptions Load event
	function ListOptions_Load() {

		// Example:
		//$opt = &$this->ListOptions->Add("new");
		//$opt->Header = "xxx";
		//$opt->OnLeft = TRUE; // Link on left
		//$opt->MoveTo(0); // Move to first column

	}

	// ListOptions Rendering event
	function ListOptions_Rendering() {

		//$GLOBALS["xxx_grid"]->DetailAdd = (...condition...); // Set to TRUE or FALSE conditionally
		//$GLOBALS["xxx_grid"]->DetailEdit = (...condition...); // Set to TRUE or FALSE conditionally
		//$GLOBALS["xxx_grid"]->DetailView = (...condition...); // Set to TRUE or FALSE conditionally

	}

	// ListOptions Rendered event
	function ListOptions_Rendered() {

		// Example:
		//$this->ListOptions->Items["new"]->Body = "xxx";

	}

	// Row Custom Action event
	function Row_CustomAction($action, $row) {

		// Return FALSE to abort
		return TRUE;
	}

	// Page Exporting event
	// $this->ExportDoc = export document object
	function Page_Exporting() {

		//$this->ExportDoc->Text = "my header"; // Export header
		//return FALSE; // Return FALSE to skip default export and use Row_Export event

		return TRUE; // Return TRUE to use default export and skip Row_Export event
	}

	// Row Export event
	// $this->ExportDoc = export document object
	function Row_Export($rs) {

		//$this->ExportDoc->Text .= "my content"; // Build HTML with field value: $rs["MyField"] or $this->MyField->ViewValue
	}

	// Page Exported event
	// $this->ExportDoc = export document object
	function Page_Exported() {

		//$this->ExportDoc->Text .= "my footer"; // Export footer
		//echo $this->ExportDoc->Text;

	}
}
?>
<?php ew_Header(FALSE) ?>
<?php

// Create page object
if (!isset($productos_list)) $productos_list = new cproductos_list();

// Page init
$productos_list->Page_Init();

// Page main
$productos_list->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$productos_list->Page_Render();
?>
<?php include_once "header.php" ?>
<script type="text/javascript">

// Form object
var CurrentPageID = EW_PAGE_ID = "list";
var CurrentForm = fproductoslist = new ew_Form("fproductoslist", "list");
fproductoslist.FormKeyCountName = '<?php echo $productos_list->FormKeyCountName ?>';

// Form_CustomValidate event
fproductoslist.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fproductoslist.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
fproductoslist.Lists["x_marca_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_marca","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgmarcas"};
fproductoslist.Lists["x_marca_id"].Data = "<?php echo $productos_list->marca_id->LookupFilterQuery(FALSE, "list") ?>";
fproductoslist.Lists["x_rubro_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_rubro","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgrubros"};
fproductoslist.Lists["x_rubro_id"].Data = "<?php echo $productos_list->rubro_id->LookupFilterQuery(FALSE, "list") ?>";
fproductoslist.Lists["x_moneda_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_moneda","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgmonedas"};
fproductoslist.Lists["x_moneda_id"].Data = "<?php echo $productos_list->moneda_id->LookupFilterQuery(FALSE, "list") ?>";
fproductoslist.Lists["x_destacado"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductoslist.Lists["x_destacado"].Options = <?php echo json_encode($productos_list->destacado->Options()) ?>;
fproductoslist.Lists["x_activo"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductoslist.Lists["x_activo"].Options = <?php echo json_encode($productos_list->activo->Options()) ?>;

// Form object for search
var CurrentSearchForm = fproductoslistsrch = new ew_Form("fproductoslistsrch");
</script>
<script type="text/javascript">

// Write your client script here, no need to add script tags.
</script>
<div class="ewToolbar">
<?php if ($productos_list->TotalRecs > 0 && $productos_list->ExportOptions->Visible()) { ?>
<?php $productos_list->ExportOptions->Render("body") ?>
<?php } ?>
<?php if ($productos_list->SearchOptions->Visible()) { ?>
<?php $productos_list->SearchOptions->Render("body") ?>
<?php } ?>
<?php if ($productos_list->FilterOptions->Visible()) { ?>
<?php $productos_list->FilterOptions->Render("body") ?>
<?php } ?>
<div class="clearfix"></div>
</div>
<?php
	$bSelectLimit = $productos_list->UseSelectLimit;
	if ($bSelectLimit) {
		if ($productos_list->TotalRecs <= 0)
			$productos_list->TotalRecs = $productos->ListRecordCount();
	} else {
		if (!$productos_list->Recordset && ($productos_list->Recordset = $productos_list->LoadRecordset()))
			$productos_list->TotalRecs = $productos_list->Recordset->RecordCount();
	}
	$productos_list->StartRec = 1;
	if ($productos_list->DisplayRecs <= 0 || ($productos->Export <> "" && $productos->ExportAll)) // Display all records
		$productos_list->DisplayRecs = $productos_list->TotalRecs;
	if (!($productos->Export <> "" && $productos->ExportAll))
		$productos_list->SetupStartRec(); // Set up start record position
	if ($bSelectLimit)
		$productos_list->Recordset = $productos_list->LoadRecordset($productos_list->StartRec-1, $productos_list->DisplayRecs);

	// Set no record found message
	if ($productos->CurrentAction == "" && $productos_list->TotalRecs == 0) {
		if ($productos_list->SearchWhere == "0=101")
			$productos_list->setWarningMessage($Language->Phrase("EnterSearchCriteria"));
		else
			$productos_list->setWarningMessage($Language->Phrase("NoRecord"));
	}
$productos_list->RenderOtherOptions();
?>
<?php if ($Security->IsLoggedIn()) { ?>
<?php if ($productos->Export == "" && $productos->CurrentAction == "") { ?>
<form name="fproductoslistsrch" id="fproductoslistsrch" class="form-inline ewForm ewExtSearchForm" action="<?php echo ew_CurrentPage() ?>">
<?php $SearchPanelClass = ($productos_list->SearchWhere <> "") ? " in" : " in"; ?>
<div id="fproductoslistsrch_SearchPanel" class="ewSearchPanel collapse<?php echo $SearchPanelClass ?>">
<input type="hidden" name="cmd" value="search">
<input type="hidden" name="t" value="productos">
	<div class="ewBasicSearch">
<div id="xsr_1" class="ewRow">
	<div class="ewQuickSearch input-group">
	<input type="text" name="<?php echo EW_TABLE_BASIC_SEARCH ?>" id="<?php echo EW_TABLE_BASIC_SEARCH ?>" class="form-control" value="<?php echo ew_HtmlEncode($productos_list->BasicSearch->getKeyword()) ?>" placeholder="<?php echo ew_HtmlEncode($Language->Phrase("Search")) ?>">
	<input type="hidden" name="<?php echo EW_TABLE_BASIC_SEARCH_TYPE ?>" id="<?php echo EW_TABLE_BASIC_SEARCH_TYPE ?>" value="<?php echo ew_HtmlEncode($productos_list->BasicSearch->getType()) ?>">
	<div class="input-group-btn">
		<button type="button" data-toggle="dropdown" class="btn btn-default"><span id="searchtype"><?php echo $productos_list->BasicSearch->getTypeNameShort() ?></span><span class="caret"></span></button>
		<ul class="dropdown-menu pull-right" role="menu">
			<li<?php if ($productos_list->BasicSearch->getType() == "") echo " class=\"active\""; ?>><a href="javascript:void(0);" onclick="ew_SetSearchType(this)"><?php echo $Language->Phrase("QuickSearchAuto") ?></a></li>
			<li<?php if ($productos_list->BasicSearch->getType() == "=") echo " class=\"active\""; ?>><a href="javascript:void(0);" onclick="ew_SetSearchType(this,'=')"><?php echo $Language->Phrase("QuickSearchExact") ?></a></li>
			<li<?php if ($productos_list->BasicSearch->getType() == "AND") echo " class=\"active\""; ?>><a href="javascript:void(0);" onclick="ew_SetSearchType(this,'AND')"><?php echo $Language->Phrase("QuickSearchAll") ?></a></li>
			<li<?php if ($productos_list->BasicSearch->getType() == "OR") echo " class=\"active\""; ?>><a href="javascript:void(0);" onclick="ew_SetSearchType(this,'OR')"><?php echo $Language->Phrase("QuickSearchAny") ?></a></li>
		</ul>
	<button class="btn btn-primary ewButton" name="btnsubmit" id="btnsubmit" type="submit"><?php echo $Language->Phrase("SearchBtn") ?></button>
	</div>
	</div>
</div>
	</div>
</div>
</form>
<?php } ?>
<?php } ?>
<?php $productos_list->ShowPageHeader(); ?>
<?php
$productos_list->ShowMessage();
?>
<?php if ($productos_list->TotalRecs > 0 || $productos->CurrentAction <> "") { ?>
<div class="box ewBox ewGrid<?php if ($productos_list->IsAddOrEdit()) { ?> ewGridAddEdit<?php } ?> productos">
<div class="box-header ewGridUpperPanel">
<?php if ($productos->CurrentAction <> "gridadd" && $productos->CurrentAction <> "gridedit") { ?>
<form name="ewPagerForm" class="form-inline ewForm ewPagerForm" action="<?php echo ew_CurrentPage() ?>">
<?php if (!isset($productos_list->Pager)) $productos_list->Pager = new cPrevNextPager($productos_list->StartRec, $productos_list->DisplayRecs, $productos_list->TotalRecs, $productos_list->AutoHidePager) ?>
<?php if ($productos_list->Pager->RecordCount > 0 && $productos_list->Pager->Visible) { ?>
<div class="ewPager">
<span><?php echo $Language->Phrase("Page") ?>&nbsp;</span>
<div class="ewPrevNext"><div class="input-group">
<div class="input-group-btn">
<!--first page button-->
	<?php if ($productos_list->Pager->FirstButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerFirst") ?>" href="<?php echo $productos_list->PageUrl() ?>start=<?php echo $productos_list->Pager->FirstButton->Start ?>"><span class="icon-first ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerFirst") ?>"><span class="icon-first ewIcon"></span></a>
	<?php } ?>
<!--previous page button-->
	<?php if ($productos_list->Pager->PrevButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerPrevious") ?>" href="<?php echo $productos_list->PageUrl() ?>start=<?php echo $productos_list->Pager->PrevButton->Start ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerPrevious") ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } ?>
</div>
<!--current page number-->
	<input class="form-control input-sm" type="text" name="<?php echo EW_TABLE_PAGE_NO ?>" value="<?php echo $productos_list->Pager->CurrentPage ?>">
<div class="input-group-btn">
<!--next page button-->
	<?php if ($productos_list->Pager->NextButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerNext") ?>" href="<?php echo $productos_list->PageUrl() ?>start=<?php echo $productos_list->Pager->NextButton->Start ?>"><span class="icon-next ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerNext") ?>"><span class="icon-next ewIcon"></span></a>
	<?php } ?>
<!--last page button-->
	<?php if ($productos_list->Pager->LastButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerLast") ?>" href="<?php echo $productos_list->PageUrl() ?>start=<?php echo $productos_list->Pager->LastButton->Start ?>"><span class="icon-last ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerLast") ?>"><span class="icon-last ewIcon"></span></a>
	<?php } ?>
</div>
</div>
</div>
<span>&nbsp;<?php echo $Language->Phrase("of") ?>&nbsp;<?php echo $productos_list->Pager->PageCount ?></span>
</div>
<div class="ewPager ewRec">
	<span><?php echo $Language->Phrase("Record") ?>&nbsp;<?php echo $productos_list->Pager->FromIndex ?>&nbsp;<?php echo $Language->Phrase("To") ?>&nbsp;<?php echo $productos_list->Pager->ToIndex ?>&nbsp;<?php echo $Language->Phrase("Of") ?>&nbsp;<?php echo $productos_list->Pager->RecordCount ?></span>
</div>
<?php } ?>
</form>
<?php } ?>
<div class="ewListOtherOptions">
<?php
	foreach ($productos_list->OtherOptions as &$option)
		$option->Render("body");
?>
</div>
<div class="clearfix"></div>
</div>
<form name="fproductoslist" id="fproductoslist" class="form-inline ewForm ewListForm" action="<?php echo ew_CurrentPage() ?>" method="post">
<?php if ($productos_list->CheckToken) { ?>
<input type="hidden" name="<?php echo EW_TOKEN_NAME ?>" value="<?php echo $productos_list->Token ?>">
<?php } ?>
<input type="hidden" name="t" value="productos">
<div id="gmp_productos" class="<?php if (ew_IsResponsiveLayout()) { ?>table-responsive <?php } ?>ewGridMiddlePanel">
<?php if ($productos_list->TotalRecs > 0 || $productos->CurrentAction == "gridedit") { ?>
<table id="tbl_productoslist" class="table ewTable">
<thead>
	<tr class="ewTableHeader">
<?php

// Header row
$productos_list->RowType = EW_ROWTYPE_HEADER;

// Render list options
$productos_list->RenderListOptions();

// Render list options (header, left)
$productos_list->ListOptions->Render("header", "left");
?>
<?php if ($productos->id->Visible) { // id ?>
	<?php if ($productos->SortUrl($productos->id) == "") { ?>
		<th data-name="id" class="<?php echo $productos->id->HeaderCellClass() ?>"><div id="elh_productos_id" class="productos_id"><div class="ewTableHeaderCaption"><?php echo $productos->id->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="id" class="<?php echo $productos->id->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productos->SortUrl($productos->id) ?>',2);"><div id="elh_productos_id" class="productos_id">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productos->id->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productos->id->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productos->id->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productos->producto->Visible) { // producto ?>
	<?php if ($productos->SortUrl($productos->producto) == "") { ?>
		<th data-name="producto" class="<?php echo $productos->producto->HeaderCellClass() ?>"><div id="elh_productos_producto" class="productos_producto"><div class="ewTableHeaderCaption"><?php echo $productos->producto->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="producto" class="<?php echo $productos->producto->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productos->SortUrl($productos->producto) ?>',2);"><div id="elh_productos_producto" class="productos_producto">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productos->producto->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($productos->producto->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productos->producto->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productos->marca_id->Visible) { // marca_id ?>
	<?php if ($productos->SortUrl($productos->marca_id) == "") { ?>
		<th data-name="marca_id" class="<?php echo $productos->marca_id->HeaderCellClass() ?>"><div id="elh_productos_marca_id" class="productos_marca_id"><div class="ewTableHeaderCaption"><?php echo $productos->marca_id->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="marca_id" class="<?php echo $productos->marca_id->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productos->SortUrl($productos->marca_id) ?>',2);"><div id="elh_productos_marca_id" class="productos_marca_id">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productos->marca_id->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productos->marca_id->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productos->marca_id->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productos->rubro_id->Visible) { // rubro_id ?>
	<?php if ($productos->SortUrl($productos->rubro_id) == "") { ?>
		<th data-name="rubro_id" class="<?php echo $productos->rubro_id->HeaderCellClass() ?>"><div id="elh_productos_rubro_id" class="productos_rubro_id"><div class="ewTableHeaderCaption"><?php echo $productos->rubro_id->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="rubro_id" class="<?php echo $productos->rubro_id->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productos->SortUrl($productos->rubro_id) ?>',2);"><div id="elh_productos_rubro_id" class="productos_rubro_id">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productos->rubro_id->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productos->rubro_id->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productos->rubro_id->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productos->moneda_id->Visible) { // moneda_id ?>
	<?php if ($productos->SortUrl($productos->moneda_id) == "") { ?>
		<th data-name="moneda_id" class="<?php echo $productos->moneda_id->HeaderCellClass() ?>"><div id="elh_productos_moneda_id" class="productos_moneda_id"><div class="ewTableHeaderCaption"><?php echo $productos->moneda_id->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="moneda_id" class="<?php echo $productos->moneda_id->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productos->SortUrl($productos->moneda_id) ?>',2);"><div id="elh_productos_moneda_id" class="productos_moneda_id">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productos->moneda_id->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productos->moneda_id->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productos->moneda_id->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productos->precio->Visible) { // precio ?>
	<?php if ($productos->SortUrl($productos->precio) == "") { ?>
		<th data-name="precio" class="<?php echo $productos->precio->HeaderCellClass() ?>"><div id="elh_productos_precio" class="productos_precio"><div class="ewTableHeaderCaption"><?php echo $productos->precio->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="precio" class="<?php echo $productos->precio->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productos->SortUrl($productos->precio) ?>',2);"><div id="elh_productos_precio" class="productos_precio">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productos->precio->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productos->precio->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productos->precio->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productos->stock->Visible) { // stock ?>
	<?php if ($productos->SortUrl($productos->stock) == "") { ?>
		<th data-name="stock" class="<?php echo $productos->stock->HeaderCellClass() ?>"><div id="elh_productos_stock" class="productos_stock"><div class="ewTableHeaderCaption"><?php echo $productos->stock->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="stock" class="<?php echo $productos->stock->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productos->SortUrl($productos->stock) ?>',2);"><div id="elh_productos_stock" class="productos_stock">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productos->stock->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productos->stock->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productos->stock->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productos->destacado->Visible) { // destacado ?>
	<?php if ($productos->SortUrl($productos->destacado) == "") { ?>
		<th data-name="destacado" class="<?php echo $productos->destacado->HeaderCellClass() ?>"><div id="elh_productos_destacado" class="productos_destacado"><div class="ewTableHeaderCaption"><?php echo $productos->destacado->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="destacado" class="<?php echo $productos->destacado->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productos->SortUrl($productos->destacado) ?>',2);"><div id="elh_productos_destacado" class="productos_destacado">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productos->destacado->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productos->destacado->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productos->destacado->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productos->visitas->Visible) { // visitas ?>
	<?php if ($productos->SortUrl($productos->visitas) == "") { ?>
		<th data-name="visitas" class="<?php echo $productos->visitas->HeaderCellClass() ?>"><div id="elh_productos_visitas" class="productos_visitas"><div class="ewTableHeaderCaption"><?php echo $productos->visitas->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="visitas" class="<?php echo $productos->visitas->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productos->SortUrl($productos->visitas) ?>',2);"><div id="elh_productos_visitas" class="productos_visitas">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productos->visitas->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productos->visitas->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productos->visitas->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productos->activo->Visible) { // activo ?>
	<?php if ($productos->SortUrl($productos->activo) == "") { ?>
		<th data-name="activo" class="<?php echo $productos->activo->HeaderCellClass() ?>"><div id="elh_productos_activo" class="productos_activo"><div class="ewTableHeaderCaption"><?php echo $productos->activo->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="activo" class="<?php echo $productos->activo->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productos->SortUrl($productos->activo) ?>',2);"><div id="elh_productos_activo" class="productos_activo">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productos->activo->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productos->activo->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productos->activo->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php

// Render list options (header, right)
$productos_list->ListOptions->Render("header", "right");
?>
	</tr>
</thead>
<tbody>
<?php
if ($productos->ExportAll && $productos->Export <> "") {
	$productos_list->StopRec = $productos_list->TotalRecs;
} else {

	// Set the last record to display
	if ($productos_list->TotalRecs > $productos_list->StartRec + $productos_list->DisplayRecs - 1)
		$productos_list->StopRec = $productos_list->StartRec + $productos_list->DisplayRecs - 1;
	else
		$productos_list->StopRec = $productos_list->TotalRecs;
}
$productos_list->RecCnt = $productos_list->StartRec - 1;
if ($productos_list->Recordset && !$productos_list->Recordset->EOF) {
	$productos_list->Recordset->MoveFirst();
	$bSelectLimit = $productos_list->UseSelectLimit;
	if (!$bSelectLimit && $productos_list->StartRec > 1)
		$productos_list->Recordset->Move($productos_list->StartRec - 1);
} elseif (!$productos->AllowAddDeleteRow && $productos_list->StopRec == 0) {
	$productos_list->StopRec = $productos->GridAddRowCount;
}

// Initialize aggregate
$productos->RowType = EW_ROWTYPE_AGGREGATEINIT;
$productos->ResetAttrs();
$productos_list->RenderRow();
while ($productos_list->RecCnt < $productos_list->StopRec) {
	$productos_list->RecCnt++;
	if (intval($productos_list->RecCnt) >= intval($productos_list->StartRec)) {
		$productos_list->RowCnt++;

		// Set up key count
		$productos_list->KeyCount = $productos_list->RowIndex;

		// Init row class and style
		$productos->ResetAttrs();
		$productos->CssClass = "";
		if ($productos->CurrentAction == "gridadd") {
		} else {
			$productos_list->LoadRowValues($productos_list->Recordset); // Load row values
		}
		$productos->RowType = EW_ROWTYPE_VIEW; // Render view

		// Set up row id / data-rowindex
		$productos->RowAttrs = array_merge($productos->RowAttrs, array('data-rowindex'=>$productos_list->RowCnt, 'id'=>'r' . $productos_list->RowCnt . '_productos', 'data-rowtype'=>$productos->RowType));

		// Render row
		$productos_list->RenderRow();

		// Render list options
		$productos_list->RenderListOptions();
?>
	<tr<?php echo $productos->RowAttributes() ?>>
<?php

// Render list options (body, left)
$productos_list->ListOptions->Render("body", "left", $productos_list->RowCnt);
?>
	<?php if ($productos->id->Visible) { // id ?>
		<td data-name="id"<?php echo $productos->id->CellAttributes() ?>>
<span id="el<?php echo $productos_list->RowCnt ?>_productos_id" class="productos_id">
<span<?php echo $productos->id->ViewAttributes() ?>>
<?php echo $productos->id->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($productos->producto->Visible) { // producto ?>
		<td data-name="producto"<?php echo $productos->producto->CellAttributes() ?>>
<span id="el<?php echo $productos_list->RowCnt ?>_productos_producto" class="productos_producto">
<span<?php echo $productos->producto->ViewAttributes() ?>>
<?php echo $productos->producto->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($productos->marca_id->Visible) { // marca_id ?>
		<td data-name="marca_id"<?php echo $productos->marca_id->CellAttributes() ?>>
<span id="el<?php echo $productos_list->RowCnt ?>_productos_marca_id" class="productos_marca_id">
<span<?php echo $productos->marca_id->ViewAttributes() ?>>
<?php echo $productos->marca_id->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($productos->rubro_id->Visible) { // rubro_id ?>
		<td data-name="rubro_id"<?php echo $productos->rubro_id->CellAttributes() ?>>
<span id="el<?php echo $productos_list->RowCnt ?>_productos_rubro_id" class="productos_rubro_id">
<span<?php echo $productos->rubro_id->ViewAttributes() ?>>
<?php echo $productos->rubro_id->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($productos->moneda_id->Visible) { // moneda_id ?>
		<td data-name="moneda_id"<?php echo $productos->moneda_id->CellAttributes() ?>>
<span id="el<?php echo $productos_list->RowCnt ?>_productos_moneda_id" class="productos_moneda_id">
<span<?php echo $productos->moneda_id->ViewAttributes() ?>>
<?php echo $productos->moneda_id->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($productos->precio->Visible) { // precio ?>
		<td data-name="precio"<?php echo $productos->precio->CellAttributes() ?>>
<span id="el<?php echo $productos_list->RowCnt ?>_productos_precio" class="productos_precio">
<span<?php echo $productos->precio->ViewAttributes() ?>>
<?php echo $productos->precio->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($productos->stock->Visible) { // stock ?>
		<td data-name="stock"<?php echo $productos->stock->CellAttributes() ?>>
<span id="el<?php echo $productos_list->RowCnt ?>_productos_stock" class="productos_stock">
<span<?php echo $productos->stock->ViewAttributes() ?>>
<?php echo $productos->stock->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($productos->destacado->Visible) { // destacado ?>
		<td data-name="destacado"<?php echo $productos->destacado->CellAttributes() ?>>
<span id="el<?php echo $productos_list->RowCnt ?>_productos_destacado" class="productos_destacado">
<span<?php echo $productos->destacado->ViewAttributes() ?>>
<?php echo $productos->destacado->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($productos->visitas->Visible) { // visitas ?>
		<td data-name="visitas"<?php echo $productos->visitas->CellAttributes() ?>>
<span id="el<?php echo $productos_list->RowCnt ?>_productos_visitas" class="productos_visitas">
<span<?php echo $productos->visitas->ViewAttributes() ?>>
<?php echo $productos->visitas->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($productos->activo->Visible) { // activo ?>
		<td data-name="activo"<?php echo $productos->activo->CellAttributes() ?>>
<span id="el<?php echo $productos_list->RowCnt ?>_productos_activo" class="productos_activo">
<span<?php echo $productos->activo->ViewAttributes() ?>>
<?php echo $productos->activo->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
<?php

// Render list options (body, right)
$productos_list->ListOptions->Render("body", "right", $productos_list->RowCnt);
?>
	</tr>
<?php
	}
	if ($productos->CurrentAction <> "gridadd")
		$productos_list->Recordset->MoveNext();
}
?>
</tbody>
</table>
<?php } ?>
<?php if ($productos->CurrentAction == "") { ?>
<input type="hidden" name="a_list" id="a_list" value="">
<?php } ?>
</div>
</form>
<?php

// Close recordset
if ($productos_list->Recordset)
	$productos_list->Recordset->Close();
?>
<div class="box-footer ewGridLowerPanel">
<?php if ($productos->CurrentAction <> "gridadd" && $productos->CurrentAction <> "gridedit") { ?>
<form name="ewPagerForm" class="ewForm form-inline ewPagerForm" action="<?php echo ew_CurrentPage() ?>">
<?php if (!isset($productos_list->Pager)) $productos_list->Pager = new cPrevNextPager($productos_list->StartRec, $productos_list->DisplayRecs, $productos_list->TotalRecs, $productos_list->AutoHidePager) ?>
<?php if ($productos_list->Pager->RecordCount > 0 && $productos_list->Pager->Visible) { ?>
<div class="ewPager">
<span><?php echo $Language->Phrase("Page") ?>&nbsp;</span>
<div class="ewPrevNext"><div class="input-group">
<div class="input-group-btn">
<!--first page button-->
	<?php if ($productos_list->Pager->FirstButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerFirst") ?>" href="<?php echo $productos_list->PageUrl() ?>start=<?php echo $productos_list->Pager->FirstButton->Start ?>"><span class="icon-first ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerFirst") ?>"><span class="icon-first ewIcon"></span></a>
	<?php } ?>
<!--previous page button-->
	<?php if ($productos_list->Pager->PrevButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerPrevious") ?>" href="<?php echo $productos_list->PageUrl() ?>start=<?php echo $productos_list->Pager->PrevButton->Start ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerPrevious") ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } ?>
</div>
<!--current page number-->
	<input class="form-control input-sm" type="text" name="<?php echo EW_TABLE_PAGE_NO ?>" value="<?php echo $productos_list->Pager->CurrentPage ?>">
<div class="input-group-btn">
<!--next page button-->
	<?php if ($productos_list->Pager->NextButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerNext") ?>" href="<?php echo $productos_list->PageUrl() ?>start=<?php echo $productos_list->Pager->NextButton->Start ?>"><span class="icon-next ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerNext") ?>"><span class="icon-next ewIcon"></span></a>
	<?php } ?>
<!--last page button-->
	<?php if ($productos_list->Pager->LastButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerLast") ?>" href="<?php echo $productos_list->PageUrl() ?>start=<?php echo $productos_list->Pager->LastButton->Start ?>"><span class="icon-last ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerLast") ?>"><span class="icon-last ewIcon"></span></a>
	<?php } ?>
</div>
</div>
</div>
<span>&nbsp;<?php echo $Language->Phrase("of") ?>&nbsp;<?php echo $productos_list->Pager->PageCount ?></span>
</div>
<div class="ewPager ewRec">
	<span><?php echo $Language->Phrase("Record") ?>&nbsp;<?php echo $productos_list->Pager->FromIndex ?>&nbsp;<?php echo $Language->Phrase("To") ?>&nbsp;<?php echo $productos_list->Pager->ToIndex ?>&nbsp;<?php echo $Language->Phrase("Of") ?>&nbsp;<?php echo $productos_list->Pager->RecordCount ?></span>
</div>
<?php } ?>
</form>
<?php } ?>
<div class="ewListOtherOptions">
<?php
	foreach ($productos_list->OtherOptions as &$option)
		$option->Render("body", "bottom");
?>
</div>
<div class="clearfix"></div>
</div>
</div>
<?php } ?>
<?php if ($productos_list->TotalRecs == 0 && $productos->CurrentAction == "") { // Show other options ?>
<div class="ewListOtherOptions">
<?php
	foreach ($productos_list->OtherOptions as &$option) {
		$option->ButtonClass = "";
		$option->Render("body", "");
	}
?>
</div>
<div class="clearfix"></div>
<?php } ?>
<script type="text/javascript">
fproductoslistsrch.FilterList = <?php echo $productos_list->GetFilterList() ?>;
fproductoslistsrch.Init();
fproductoslist.Init();
</script>
<?php
$productos_list->ShowPageFooter();
if (EW_DEBUG_ENABLED)
	echo ew_DebugMsg();
?>
<script type="text/javascript">

// Write your table-specific startup script here
// document.write("page loaded");

</script>
<?php include_once "footer.php" ?>
<?php
$productos_list->Page_Terminate();
?>
