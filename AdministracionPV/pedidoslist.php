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

$pedidos_list = NULL; // Initialize page object first

class cpedidos_list extends cpedidos {

	// Page ID
	var $PageID = 'list';

	// Project ID
	var $ProjectID = '{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}';

	// Table name
	var $TableName = 'pedidos';

	// Page object name
	var $PageObjName = 'pedidos_list';

	// Grid form hidden field names
	var $FormName = 'fpedidoslist';
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

		// Table object (pedidos)
		if (!isset($GLOBALS["pedidos"]) || get_class($GLOBALS["pedidos"]) == "cpedidos") {
			$GLOBALS["pedidos"] = &$this;
			$GLOBALS["Table"] = &$GLOBALS["pedidos"];
		}

		// Initialize URLs
		$this->ExportPrintUrl = $this->PageUrl() . "export=print";
		$this->ExportExcelUrl = $this->PageUrl() . "export=excel";
		$this->ExportWordUrl = $this->PageUrl() . "export=word";
		$this->ExportHtmlUrl = $this->PageUrl() . "export=html";
		$this->ExportXmlUrl = $this->PageUrl() . "export=xml";
		$this->ExportCsvUrl = $this->PageUrl() . "export=csv";
		$this->ExportPdfUrl = $this->PageUrl() . "export=pdf";
		$this->AddUrl = "pedidosadd.php";
		$this->InlineAddUrl = $this->PageUrl() . "a=add";
		$this->GridAddUrl = $this->PageUrl() . "a=gridadd";
		$this->GridEditUrl = $this->PageUrl() . "a=gridedit";
		$this->MultiDeleteUrl = "pedidosdelete.php";
		$this->MultiUpdateUrl = "pedidosupdate.php";

		// Page ID
		if (!defined("EW_PAGE_ID"))
			define("EW_PAGE_ID", 'list', TRUE);

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
		$this->FilterOptions->TagClassName = "ewFilterOption fpedidoslistsrch";

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
			$sSavedFilterList = isset($UserProfile) ? $UserProfile->GetSearchFilters(CurrentUserName(), "fpedidoslistsrch") : "";
		} else {
			$sSavedFilterList = "";
		}

		// Initialize
		$sFilterList = "";
		$sFilterList = ew_Concat($sFilterList, $this->id->AdvancedSearch->ToJson(), ","); // Field id
		$sFilterList = ew_Concat($sFilterList, $this->datos->AdvancedSearch->ToJson(), ","); // Field datos
		$sFilterList = ew_Concat($sFilterList, $this->total->AdvancedSearch->ToJson(), ","); // Field total
		$sFilterList = ew_Concat($sFilterList, $this->estado->AdvancedSearch->ToJson(), ","); // Field estado
		$sFilterList = ew_Concat($sFilterList, $this->metodo_pago->AdvancedSearch->ToJson(), ","); // Field metodo_pago
		$sFilterList = ew_Concat($sFilterList, $this->comprador_nombre->AdvancedSearch->ToJson(), ","); // Field comprador_nombre
		$sFilterList = ew_Concat($sFilterList, $this->comprador_email->AdvancedSearch->ToJson(), ","); // Field comprador_email
		$sFilterList = ew_Concat($sFilterList, $this->comprador_telefono->AdvancedSearch->ToJson(), ","); // Field comprador_telefono
		$sFilterList = ew_Concat($sFilterList, $this->direccion_envio->AdvancedSearch->ToJson(), ","); // Field direccion_envio
		$sFilterList = ew_Concat($sFilterList, $this->mp_payment_id->AdvancedSearch->ToJson(), ","); // Field mp_payment_id
		$sFilterList = ew_Concat($sFilterList, $this->tarjeta_last4->AdvancedSearch->ToJson(), ","); // Field tarjeta_last4
		$sFilterList = ew_Concat($sFilterList, $this->tarjeta_payment_method->AdvancedSearch->ToJson(), ","); // Field tarjeta_payment_method
		$sFilterList = ew_Concat($sFilterList, $this->transferencia_ref->AdvancedSearch->ToJson(), ","); // Field transferencia_ref
		$sFilterList = ew_Concat($sFilterList, $this->mp_error_code->AdvancedSearch->ToJson(), ","); // Field mp_error_code
		$sFilterList = ew_Concat($sFilterList, $this->mp_error_message->AdvancedSearch->ToJson(), ","); // Field mp_error_message
		$sFilterList = ew_Concat($sFilterList, $this->mp_response->AdvancedSearch->ToJson(), ","); // Field mp_response
		$sFilterList = ew_Concat($sFilterList, $this->createdAt->AdvancedSearch->ToJson(), ","); // Field createdAt
		$sFilterList = ew_Concat($sFilterList, $this->updatedAt->AdvancedSearch->ToJson(), ","); // Field updatedAt
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
			$UserProfile->SetSearchFilters(CurrentUserName(), "fpedidoslistsrch", $filters);

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

		// Field datos
		$this->datos->AdvancedSearch->SearchValue = @$filter["x_datos"];
		$this->datos->AdvancedSearch->SearchOperator = @$filter["z_datos"];
		$this->datos->AdvancedSearch->SearchCondition = @$filter["v_datos"];
		$this->datos->AdvancedSearch->SearchValue2 = @$filter["y_datos"];
		$this->datos->AdvancedSearch->SearchOperator2 = @$filter["w_datos"];
		$this->datos->AdvancedSearch->Save();

		// Field total
		$this->total->AdvancedSearch->SearchValue = @$filter["x_total"];
		$this->total->AdvancedSearch->SearchOperator = @$filter["z_total"];
		$this->total->AdvancedSearch->SearchCondition = @$filter["v_total"];
		$this->total->AdvancedSearch->SearchValue2 = @$filter["y_total"];
		$this->total->AdvancedSearch->SearchOperator2 = @$filter["w_total"];
		$this->total->AdvancedSearch->Save();

		// Field estado
		$this->estado->AdvancedSearch->SearchValue = @$filter["x_estado"];
		$this->estado->AdvancedSearch->SearchOperator = @$filter["z_estado"];
		$this->estado->AdvancedSearch->SearchCondition = @$filter["v_estado"];
		$this->estado->AdvancedSearch->SearchValue2 = @$filter["y_estado"];
		$this->estado->AdvancedSearch->SearchOperator2 = @$filter["w_estado"];
		$this->estado->AdvancedSearch->Save();

		// Field metodo_pago
		$this->metodo_pago->AdvancedSearch->SearchValue = @$filter["x_metodo_pago"];
		$this->metodo_pago->AdvancedSearch->SearchOperator = @$filter["z_metodo_pago"];
		$this->metodo_pago->AdvancedSearch->SearchCondition = @$filter["v_metodo_pago"];
		$this->metodo_pago->AdvancedSearch->SearchValue2 = @$filter["y_metodo_pago"];
		$this->metodo_pago->AdvancedSearch->SearchOperator2 = @$filter["w_metodo_pago"];
		$this->metodo_pago->AdvancedSearch->Save();

		// Field comprador_nombre
		$this->comprador_nombre->AdvancedSearch->SearchValue = @$filter["x_comprador_nombre"];
		$this->comprador_nombre->AdvancedSearch->SearchOperator = @$filter["z_comprador_nombre"];
		$this->comprador_nombre->AdvancedSearch->SearchCondition = @$filter["v_comprador_nombre"];
		$this->comprador_nombre->AdvancedSearch->SearchValue2 = @$filter["y_comprador_nombre"];
		$this->comprador_nombre->AdvancedSearch->SearchOperator2 = @$filter["w_comprador_nombre"];
		$this->comprador_nombre->AdvancedSearch->Save();

		// Field comprador_email
		$this->comprador_email->AdvancedSearch->SearchValue = @$filter["x_comprador_email"];
		$this->comprador_email->AdvancedSearch->SearchOperator = @$filter["z_comprador_email"];
		$this->comprador_email->AdvancedSearch->SearchCondition = @$filter["v_comprador_email"];
		$this->comprador_email->AdvancedSearch->SearchValue2 = @$filter["y_comprador_email"];
		$this->comprador_email->AdvancedSearch->SearchOperator2 = @$filter["w_comprador_email"];
		$this->comprador_email->AdvancedSearch->Save();

		// Field comprador_telefono
		$this->comprador_telefono->AdvancedSearch->SearchValue = @$filter["x_comprador_telefono"];
		$this->comprador_telefono->AdvancedSearch->SearchOperator = @$filter["z_comprador_telefono"];
		$this->comprador_telefono->AdvancedSearch->SearchCondition = @$filter["v_comprador_telefono"];
		$this->comprador_telefono->AdvancedSearch->SearchValue2 = @$filter["y_comprador_telefono"];
		$this->comprador_telefono->AdvancedSearch->SearchOperator2 = @$filter["w_comprador_telefono"];
		$this->comprador_telefono->AdvancedSearch->Save();

		// Field direccion_envio
		$this->direccion_envio->AdvancedSearch->SearchValue = @$filter["x_direccion_envio"];
		$this->direccion_envio->AdvancedSearch->SearchOperator = @$filter["z_direccion_envio"];
		$this->direccion_envio->AdvancedSearch->SearchCondition = @$filter["v_direccion_envio"];
		$this->direccion_envio->AdvancedSearch->SearchValue2 = @$filter["y_direccion_envio"];
		$this->direccion_envio->AdvancedSearch->SearchOperator2 = @$filter["w_direccion_envio"];
		$this->direccion_envio->AdvancedSearch->Save();

		// Field mp_payment_id
		$this->mp_payment_id->AdvancedSearch->SearchValue = @$filter["x_mp_payment_id"];
		$this->mp_payment_id->AdvancedSearch->SearchOperator = @$filter["z_mp_payment_id"];
		$this->mp_payment_id->AdvancedSearch->SearchCondition = @$filter["v_mp_payment_id"];
		$this->mp_payment_id->AdvancedSearch->SearchValue2 = @$filter["y_mp_payment_id"];
		$this->mp_payment_id->AdvancedSearch->SearchOperator2 = @$filter["w_mp_payment_id"];
		$this->mp_payment_id->AdvancedSearch->Save();

		// Field tarjeta_last4
		$this->tarjeta_last4->AdvancedSearch->SearchValue = @$filter["x_tarjeta_last4"];
		$this->tarjeta_last4->AdvancedSearch->SearchOperator = @$filter["z_tarjeta_last4"];
		$this->tarjeta_last4->AdvancedSearch->SearchCondition = @$filter["v_tarjeta_last4"];
		$this->tarjeta_last4->AdvancedSearch->SearchValue2 = @$filter["y_tarjeta_last4"];
		$this->tarjeta_last4->AdvancedSearch->SearchOperator2 = @$filter["w_tarjeta_last4"];
		$this->tarjeta_last4->AdvancedSearch->Save();

		// Field tarjeta_payment_method
		$this->tarjeta_payment_method->AdvancedSearch->SearchValue = @$filter["x_tarjeta_payment_method"];
		$this->tarjeta_payment_method->AdvancedSearch->SearchOperator = @$filter["z_tarjeta_payment_method"];
		$this->tarjeta_payment_method->AdvancedSearch->SearchCondition = @$filter["v_tarjeta_payment_method"];
		$this->tarjeta_payment_method->AdvancedSearch->SearchValue2 = @$filter["y_tarjeta_payment_method"];
		$this->tarjeta_payment_method->AdvancedSearch->SearchOperator2 = @$filter["w_tarjeta_payment_method"];
		$this->tarjeta_payment_method->AdvancedSearch->Save();

		// Field transferencia_ref
		$this->transferencia_ref->AdvancedSearch->SearchValue = @$filter["x_transferencia_ref"];
		$this->transferencia_ref->AdvancedSearch->SearchOperator = @$filter["z_transferencia_ref"];
		$this->transferencia_ref->AdvancedSearch->SearchCondition = @$filter["v_transferencia_ref"];
		$this->transferencia_ref->AdvancedSearch->SearchValue2 = @$filter["y_transferencia_ref"];
		$this->transferencia_ref->AdvancedSearch->SearchOperator2 = @$filter["w_transferencia_ref"];
		$this->transferencia_ref->AdvancedSearch->Save();

		// Field mp_error_code
		$this->mp_error_code->AdvancedSearch->SearchValue = @$filter["x_mp_error_code"];
		$this->mp_error_code->AdvancedSearch->SearchOperator = @$filter["z_mp_error_code"];
		$this->mp_error_code->AdvancedSearch->SearchCondition = @$filter["v_mp_error_code"];
		$this->mp_error_code->AdvancedSearch->SearchValue2 = @$filter["y_mp_error_code"];
		$this->mp_error_code->AdvancedSearch->SearchOperator2 = @$filter["w_mp_error_code"];
		$this->mp_error_code->AdvancedSearch->Save();

		// Field mp_error_message
		$this->mp_error_message->AdvancedSearch->SearchValue = @$filter["x_mp_error_message"];
		$this->mp_error_message->AdvancedSearch->SearchOperator = @$filter["z_mp_error_message"];
		$this->mp_error_message->AdvancedSearch->SearchCondition = @$filter["v_mp_error_message"];
		$this->mp_error_message->AdvancedSearch->SearchValue2 = @$filter["y_mp_error_message"];
		$this->mp_error_message->AdvancedSearch->SearchOperator2 = @$filter["w_mp_error_message"];
		$this->mp_error_message->AdvancedSearch->Save();

		// Field mp_response
		$this->mp_response->AdvancedSearch->SearchValue = @$filter["x_mp_response"];
		$this->mp_response->AdvancedSearch->SearchOperator = @$filter["z_mp_response"];
		$this->mp_response->AdvancedSearch->SearchCondition = @$filter["v_mp_response"];
		$this->mp_response->AdvancedSearch->SearchValue2 = @$filter["y_mp_response"];
		$this->mp_response->AdvancedSearch->SearchOperator2 = @$filter["w_mp_response"];
		$this->mp_response->AdvancedSearch->Save();

		// Field createdAt
		$this->createdAt->AdvancedSearch->SearchValue = @$filter["x_createdAt"];
		$this->createdAt->AdvancedSearch->SearchOperator = @$filter["z_createdAt"];
		$this->createdAt->AdvancedSearch->SearchCondition = @$filter["v_createdAt"];
		$this->createdAt->AdvancedSearch->SearchValue2 = @$filter["y_createdAt"];
		$this->createdAt->AdvancedSearch->SearchOperator2 = @$filter["w_createdAt"];
		$this->createdAt->AdvancedSearch->Save();

		// Field updatedAt
		$this->updatedAt->AdvancedSearch->SearchValue = @$filter["x_updatedAt"];
		$this->updatedAt->AdvancedSearch->SearchOperator = @$filter["z_updatedAt"];
		$this->updatedAt->AdvancedSearch->SearchCondition = @$filter["v_updatedAt"];
		$this->updatedAt->AdvancedSearch->SearchValue2 = @$filter["y_updatedAt"];
		$this->updatedAt->AdvancedSearch->SearchOperator2 = @$filter["w_updatedAt"];
		$this->updatedAt->AdvancedSearch->Save();
		$this->BasicSearch->setKeyword(@$filter[EW_TABLE_BASIC_SEARCH]);
		$this->BasicSearch->setType(@$filter[EW_TABLE_BASIC_SEARCH_TYPE]);
	}

	// Advanced search WHERE clause based on QueryString
	function AdvancedSearchWhere($Default = FALSE) {
		global $Security;
		$sWhere = "";
		$this->BuildSearchSql($sWhere, $this->id, $Default, FALSE); // id
		$this->BuildSearchSql($sWhere, $this->datos, $Default, FALSE); // datos
		$this->BuildSearchSql($sWhere, $this->total, $Default, FALSE); // total
		$this->BuildSearchSql($sWhere, $this->estado, $Default, FALSE); // estado
		$this->BuildSearchSql($sWhere, $this->metodo_pago, $Default, FALSE); // metodo_pago
		$this->BuildSearchSql($sWhere, $this->comprador_nombre, $Default, FALSE); // comprador_nombre
		$this->BuildSearchSql($sWhere, $this->comprador_email, $Default, FALSE); // comprador_email
		$this->BuildSearchSql($sWhere, $this->comprador_telefono, $Default, FALSE); // comprador_telefono
		$this->BuildSearchSql($sWhere, $this->direccion_envio, $Default, FALSE); // direccion_envio
		$this->BuildSearchSql($sWhere, $this->mp_payment_id, $Default, FALSE); // mp_payment_id
		$this->BuildSearchSql($sWhere, $this->tarjeta_last4, $Default, FALSE); // tarjeta_last4
		$this->BuildSearchSql($sWhere, $this->tarjeta_payment_method, $Default, FALSE); // tarjeta_payment_method
		$this->BuildSearchSql($sWhere, $this->transferencia_ref, $Default, FALSE); // transferencia_ref
		$this->BuildSearchSql($sWhere, $this->mp_error_code, $Default, FALSE); // mp_error_code
		$this->BuildSearchSql($sWhere, $this->mp_error_message, $Default, FALSE); // mp_error_message
		$this->BuildSearchSql($sWhere, $this->mp_response, $Default, FALSE); // mp_response
		$this->BuildSearchSql($sWhere, $this->createdAt, $Default, FALSE); // createdAt
		$this->BuildSearchSql($sWhere, $this->updatedAt, $Default, FALSE); // updatedAt

		// Set up search parm
		if (!$Default && $sWhere <> "" && in_array($this->Command, array("", "reset", "resetall"))) {
			$this->Command = "search";
		}
		if (!$Default && $this->Command == "search") {
			$this->id->AdvancedSearch->Save(); // id
			$this->datos->AdvancedSearch->Save(); // datos
			$this->total->AdvancedSearch->Save(); // total
			$this->estado->AdvancedSearch->Save(); // estado
			$this->metodo_pago->AdvancedSearch->Save(); // metodo_pago
			$this->comprador_nombre->AdvancedSearch->Save(); // comprador_nombre
			$this->comprador_email->AdvancedSearch->Save(); // comprador_email
			$this->comprador_telefono->AdvancedSearch->Save(); // comprador_telefono
			$this->direccion_envio->AdvancedSearch->Save(); // direccion_envio
			$this->mp_payment_id->AdvancedSearch->Save(); // mp_payment_id
			$this->tarjeta_last4->AdvancedSearch->Save(); // tarjeta_last4
			$this->tarjeta_payment_method->AdvancedSearch->Save(); // tarjeta_payment_method
			$this->transferencia_ref->AdvancedSearch->Save(); // transferencia_ref
			$this->mp_error_code->AdvancedSearch->Save(); // mp_error_code
			$this->mp_error_message->AdvancedSearch->Save(); // mp_error_message
			$this->mp_response->AdvancedSearch->Save(); // mp_response
			$this->createdAt->AdvancedSearch->Save(); // createdAt
			$this->updatedAt->AdvancedSearch->Save(); // updatedAt
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
		$this->BuildBasicSearchSQL($sWhere, $this->datos, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->estado, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->metodo_pago, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->comprador_nombre, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->comprador_email, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->comprador_telefono, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->direccion_envio, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->mp_payment_id, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->tarjeta_last4, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->tarjeta_payment_method, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->transferencia_ref, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->mp_error_code, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->mp_error_message, $arKeywords, $type);
		$this->BuildBasicSearchSQL($sWhere, $this->mp_response, $arKeywords, $type);
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
		if ($this->datos->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->total->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->estado->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->metodo_pago->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->comprador_nombre->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->comprador_email->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->comprador_telefono->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->direccion_envio->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->mp_payment_id->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->tarjeta_last4->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->tarjeta_payment_method->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->transferencia_ref->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->mp_error_code->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->mp_error_message->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->mp_response->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->createdAt->AdvancedSearch->IssetSession())
			return TRUE;
		if ($this->updatedAt->AdvancedSearch->IssetSession())
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
		$this->datos->AdvancedSearch->UnsetSession();
		$this->total->AdvancedSearch->UnsetSession();
		$this->estado->AdvancedSearch->UnsetSession();
		$this->metodo_pago->AdvancedSearch->UnsetSession();
		$this->comprador_nombre->AdvancedSearch->UnsetSession();
		$this->comprador_email->AdvancedSearch->UnsetSession();
		$this->comprador_telefono->AdvancedSearch->UnsetSession();
		$this->direccion_envio->AdvancedSearch->UnsetSession();
		$this->mp_payment_id->AdvancedSearch->UnsetSession();
		$this->tarjeta_last4->AdvancedSearch->UnsetSession();
		$this->tarjeta_payment_method->AdvancedSearch->UnsetSession();
		$this->transferencia_ref->AdvancedSearch->UnsetSession();
		$this->mp_error_code->AdvancedSearch->UnsetSession();
		$this->mp_error_message->AdvancedSearch->UnsetSession();
		$this->mp_response->AdvancedSearch->UnsetSession();
		$this->createdAt->AdvancedSearch->UnsetSession();
		$this->updatedAt->AdvancedSearch->UnsetSession();
	}

	// Restore all search parameters
	function RestoreSearchParms() {
		$this->RestoreSearch = TRUE;

		// Restore basic search values
		$this->BasicSearch->Load();

		// Restore advanced search values
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

	// Set up sort parameters
	function SetupSortOrder() {

		// Check for Ctrl pressed
		$bCtrl = (@$_GET["ctrl"] <> "");

		// Check for "order" parameter
		if (@$_GET["order"] <> "") {
			$this->CurrentOrder = @$_GET["order"];
			$this->CurrentOrderType = @$_GET["ordertype"];
			$this->UpdateSort($this->id, $bCtrl); // id
			$this->UpdateSort($this->total, $bCtrl); // total
			$this->UpdateSort($this->estado, $bCtrl); // estado
			$this->UpdateSort($this->metodo_pago, $bCtrl); // metodo_pago
			$this->UpdateSort($this->comprador_nombre, $bCtrl); // comprador_nombre
			$this->UpdateSort($this->comprador_email, $bCtrl); // comprador_email
			$this->UpdateSort($this->comprador_telefono, $bCtrl); // comprador_telefono
			$this->UpdateSort($this->direccion_envio, $bCtrl); // direccion_envio
			$this->UpdateSort($this->mp_payment_id, $bCtrl); // mp_payment_id
			$this->UpdateSort($this->tarjeta_last4, $bCtrl); // tarjeta_last4
			$this->UpdateSort($this->tarjeta_payment_method, $bCtrl); // tarjeta_payment_method
			$this->UpdateSort($this->transferencia_ref, $bCtrl); // transferencia_ref
			$this->UpdateSort($this->mp_error_code, $bCtrl); // mp_error_code
			$this->UpdateSort($this->createdAt, $bCtrl); // createdAt
			$this->UpdateSort($this->updatedAt, $bCtrl); // updatedAt
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
				$this->createdAt->setSort("DESC");
				$this->id->setSort("DESC");
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
				$this->total->setSort("");
				$this->estado->setSort("");
				$this->metodo_pago->setSort("");
				$this->comprador_nombre->setSort("");
				$this->comprador_email->setSort("");
				$this->comprador_telefono->setSort("");
				$this->direccion_envio->setSort("");
				$this->mp_payment_id->setSort("");
				$this->tarjeta_last4->setSort("");
				$this->tarjeta_payment_method->setSort("");
				$this->transferencia_ref->setSort("");
				$this->mp_error_code->setSort("");
				$this->createdAt->setSort("");
				$this->updatedAt->setSort("");
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

		// List actions
		$item = &$this->ListOptions->Add("listactions");
		$item->CssClass = "text-nowrap";
		$item->OnLeft = TRUE;
		$item->Visible = FALSE;
		$item->ShowInButtonGroup = FALSE;
		$item->ShowInDropDown = FALSE;

		// "checkbox"
		$item = &$this->ListOptions->Add("checkbox");
		$item->Visible = FALSE;
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
		$option = $options["action"];

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
		$item->Body = "<a class=\"ewSaveFilter\" data-form=\"fpedidoslistsrch\" href=\"#\">" . $Language->Phrase("SaveCurrentFilter") . "</a>";
		$item->Visible = TRUE;
		$item = &$this->FilterOptions->Add("deletefilter");
		$item->Body = "<a class=\"ewDeleteFilter\" data-form=\"fpedidoslistsrch\" href=\"#\">" . $Language->Phrase("DeleteFilter") . "</a>";
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
					$item->Body = "<a class=\"ewAction ewListAction\" title=\"" . ew_HtmlEncode($caption) . "\" data-caption=\"" . ew_HtmlEncode($caption) . "\" href=\"\" onclick=\"ew_SubmitAction(event,jQuery.extend({f:document.fpedidoslist}," . $listaction->ToJson(TRUE) . "));return false;\">" . $icon . "</a>";
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
		$item->Body = "<button type=\"button\" class=\"btn btn-default ewSearchToggle" . $SearchToggleClass . "\" title=\"" . $Language->Phrase("SearchPanel") . "\" data-caption=\"" . $Language->Phrase("SearchPanel") . "\" data-toggle=\"button\" data-form=\"fpedidoslistsrch\">" . $Language->Phrase("SearchLink") . "</button>";
		$item->Visible = TRUE;

		// Show all button
		$item = &$this->SearchOptions->Add("showall");
		$item->Body = "<a class=\"btn btn-default ewShowAll\" title=\"" . $Language->Phrase("ShowAll") . "\" data-caption=\"" . $Language->Phrase("ShowAll") . "\" href=\"" . $this->PageUrl() . "cmd=reset\">" . $Language->Phrase("ShowAllBtn") . "</a>";
		$item->Visible = ($this->SearchWhere <> $this->DefaultSearchWhere && $this->SearchWhere <> "0=101");

		// Advanced search button
		$item = &$this->SearchOptions->Add("advancedsearch");
		$item->Body = "<a class=\"btn btn-default ewAdvancedSearch\" title=\"" . $Language->Phrase("AdvancedSearch") . "\" data-caption=\"" . $Language->Phrase("AdvancedSearch") . "\" href=\"pedidossrch.php\">" . $Language->Phrase("AdvancedSearchBtn") . "</a>";
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

		// datos
		$this->datos->AdvancedSearch->SearchValue = @$_GET["x_datos"];
		if ($this->datos->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->datos->AdvancedSearch->SearchOperator = @$_GET["z_datos"];

		// total
		$this->total->AdvancedSearch->SearchValue = @$_GET["x_total"];
		if ($this->total->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->total->AdvancedSearch->SearchOperator = @$_GET["z_total"];

		// estado
		$this->estado->AdvancedSearch->SearchValue = @$_GET["x_estado"];
		if ($this->estado->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->estado->AdvancedSearch->SearchOperator = @$_GET["z_estado"];

		// metodo_pago
		$this->metodo_pago->AdvancedSearch->SearchValue = @$_GET["x_metodo_pago"];
		if ($this->metodo_pago->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->metodo_pago->AdvancedSearch->SearchOperator = @$_GET["z_metodo_pago"];

		// comprador_nombre
		$this->comprador_nombre->AdvancedSearch->SearchValue = @$_GET["x_comprador_nombre"];
		if ($this->comprador_nombre->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->comprador_nombre->AdvancedSearch->SearchOperator = @$_GET["z_comprador_nombre"];

		// comprador_email
		$this->comprador_email->AdvancedSearch->SearchValue = @$_GET["x_comprador_email"];
		if ($this->comprador_email->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->comprador_email->AdvancedSearch->SearchOperator = @$_GET["z_comprador_email"];

		// comprador_telefono
		$this->comprador_telefono->AdvancedSearch->SearchValue = @$_GET["x_comprador_telefono"];
		if ($this->comprador_telefono->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->comprador_telefono->AdvancedSearch->SearchOperator = @$_GET["z_comprador_telefono"];

		// direccion_envio
		$this->direccion_envio->AdvancedSearch->SearchValue = @$_GET["x_direccion_envio"];
		if ($this->direccion_envio->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->direccion_envio->AdvancedSearch->SearchOperator = @$_GET["z_direccion_envio"];

		// mp_payment_id
		$this->mp_payment_id->AdvancedSearch->SearchValue = @$_GET["x_mp_payment_id"];
		if ($this->mp_payment_id->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->mp_payment_id->AdvancedSearch->SearchOperator = @$_GET["z_mp_payment_id"];

		// tarjeta_last4
		$this->tarjeta_last4->AdvancedSearch->SearchValue = @$_GET["x_tarjeta_last4"];
		if ($this->tarjeta_last4->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->tarjeta_last4->AdvancedSearch->SearchOperator = @$_GET["z_tarjeta_last4"];

		// tarjeta_payment_method
		$this->tarjeta_payment_method->AdvancedSearch->SearchValue = @$_GET["x_tarjeta_payment_method"];
		if ($this->tarjeta_payment_method->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->tarjeta_payment_method->AdvancedSearch->SearchOperator = @$_GET["z_tarjeta_payment_method"];

		// transferencia_ref
		$this->transferencia_ref->AdvancedSearch->SearchValue = @$_GET["x_transferencia_ref"];
		if ($this->transferencia_ref->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->transferencia_ref->AdvancedSearch->SearchOperator = @$_GET["z_transferencia_ref"];

		// mp_error_code
		$this->mp_error_code->AdvancedSearch->SearchValue = @$_GET["x_mp_error_code"];
		if ($this->mp_error_code->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->mp_error_code->AdvancedSearch->SearchOperator = @$_GET["z_mp_error_code"];

		// mp_error_message
		$this->mp_error_message->AdvancedSearch->SearchValue = @$_GET["x_mp_error_message"];
		if ($this->mp_error_message->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->mp_error_message->AdvancedSearch->SearchOperator = @$_GET["z_mp_error_message"];

		// mp_response
		$this->mp_response->AdvancedSearch->SearchValue = @$_GET["x_mp_response"];
		if ($this->mp_response->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->mp_response->AdvancedSearch->SearchOperator = @$_GET["z_mp_response"];

		// createdAt
		$this->createdAt->AdvancedSearch->SearchValue = @$_GET["x_createdAt"];
		if ($this->createdAt->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->createdAt->AdvancedSearch->SearchOperator = @$_GET["z_createdAt"];

		// updatedAt
		$this->updatedAt->AdvancedSearch->SearchValue = @$_GET["x_updatedAt"];
		if ($this->updatedAt->AdvancedSearch->SearchValue <> "" && $this->Command == "") $this->Command = "search";
		$this->updatedAt->AdvancedSearch->SearchOperator = @$_GET["z_updatedAt"];
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
		$this->datos->setDbValue($row['datos']);
		$this->total->setDbValue($row['total']);
		$this->estado->setDbValue($row['estado']);
		$this->metodo_pago->setDbValue($row['metodo_pago']);
		$this->comprador_nombre->setDbValue($row['comprador_nombre']);
		$this->comprador_email->setDbValue($row['comprador_email']);
		$this->comprador_telefono->setDbValue($row['comprador_telefono']);
		$this->direccion_envio->setDbValue($row['direccion_envio']);
		$this->mp_payment_id->setDbValue($row['mp_payment_id']);
		$this->tarjeta_last4->setDbValue($row['tarjeta_last4']);
		$this->tarjeta_payment_method->setDbValue($row['tarjeta_payment_method']);
		$this->transferencia_ref->setDbValue($row['transferencia_ref']);
		$this->mp_error_code->setDbValue($row['mp_error_code']);
		$this->mp_error_message->setDbValue($row['mp_error_message']);
		$this->mp_response->setDbValue($row['mp_response']);
		$this->createdAt->setDbValue($row['createdAt']);
		$this->updatedAt->setDbValue($row['updatedAt']);
	}

	// Return a row with default values
	function NewRow() {
		$row = array();
		$row['id'] = NULL;
		$row['datos'] = NULL;
		$row['total'] = NULL;
		$row['estado'] = NULL;
		$row['metodo_pago'] = NULL;
		$row['comprador_nombre'] = NULL;
		$row['comprador_email'] = NULL;
		$row['comprador_telefono'] = NULL;
		$row['direccion_envio'] = NULL;
		$row['mp_payment_id'] = NULL;
		$row['tarjeta_last4'] = NULL;
		$row['tarjeta_payment_method'] = NULL;
		$row['transferencia_ref'] = NULL;
		$row['mp_error_code'] = NULL;
		$row['mp_error_message'] = NULL;
		$row['mp_response'] = NULL;
		$row['createdAt'] = NULL;
		$row['updatedAt'] = NULL;
		return $row;
	}

	// Load DbValue from recordset
	function LoadDbValues(&$rs) {
		if (!$rs || !is_array($rs) && $rs->EOF)
			return;
		$row = is_array($rs) ? $rs : $rs->fields;
		$this->id->DbValue = $row['id'];
		$this->datos->DbValue = $row['datos'];
		$this->total->DbValue = $row['total'];
		$this->estado->DbValue = $row['estado'];
		$this->metodo_pago->DbValue = $row['metodo_pago'];
		$this->comprador_nombre->DbValue = $row['comprador_nombre'];
		$this->comprador_email->DbValue = $row['comprador_email'];
		$this->comprador_telefono->DbValue = $row['comprador_telefono'];
		$this->direccion_envio->DbValue = $row['direccion_envio'];
		$this->mp_payment_id->DbValue = $row['mp_payment_id'];
		$this->tarjeta_last4->DbValue = $row['tarjeta_last4'];
		$this->tarjeta_payment_method->DbValue = $row['tarjeta_payment_method'];
		$this->transferencia_ref->DbValue = $row['transferencia_ref'];
		$this->mp_error_code->DbValue = $row['mp_error_code'];
		$this->mp_error_message->DbValue = $row['mp_error_message'];
		$this->mp_response->DbValue = $row['mp_response'];
		$this->createdAt->DbValue = $row['createdAt'];
		$this->updatedAt->DbValue = $row['updatedAt'];
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

			// createdAt
			$this->createdAt->LinkCustomAttributes = "";
			$this->createdAt->HrefValue = "";
			$this->createdAt->TooltipValue = "";

			// updatedAt
			$this->updatedAt->LinkCustomAttributes = "";
			$this->updatedAt->HrefValue = "";
			$this->updatedAt->TooltipValue = "";
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
if (!isset($pedidos_list)) $pedidos_list = new cpedidos_list();

// Page init
$pedidos_list->Page_Init();

// Page main
$pedidos_list->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$pedidos_list->Page_Render();
?>
<?php include_once "header.php" ?>
<script type="text/javascript">

// Form object
var CurrentPageID = EW_PAGE_ID = "list";
var CurrentForm = fpedidoslist = new ew_Form("fpedidoslist", "list");
fpedidoslist.FormKeyCountName = '<?php echo $pedidos_list->FormKeyCountName ?>';

// Form_CustomValidate event
fpedidoslist.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fpedidoslist.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
// Form object for search

var CurrentSearchForm = fpedidoslistsrch = new ew_Form("fpedidoslistsrch");
</script>
<script type="text/javascript">

// Write your client script here, no need to add script tags.
</script>
<div class="ewToolbar">
<?php if ($pedidos_list->TotalRecs > 0 && $pedidos_list->ExportOptions->Visible()) { ?>
<?php $pedidos_list->ExportOptions->Render("body") ?>
<?php } ?>
<?php if ($pedidos_list->SearchOptions->Visible()) { ?>
<?php $pedidos_list->SearchOptions->Render("body") ?>
<?php } ?>
<?php if ($pedidos_list->FilterOptions->Visible()) { ?>
<?php $pedidos_list->FilterOptions->Render("body") ?>
<?php } ?>
<div class="clearfix"></div>
</div>
<?php
	$bSelectLimit = $pedidos_list->UseSelectLimit;
	if ($bSelectLimit) {
		if ($pedidos_list->TotalRecs <= 0)
			$pedidos_list->TotalRecs = $pedidos->ListRecordCount();
	} else {
		if (!$pedidos_list->Recordset && ($pedidos_list->Recordset = $pedidos_list->LoadRecordset()))
			$pedidos_list->TotalRecs = $pedidos_list->Recordset->RecordCount();
	}
	$pedidos_list->StartRec = 1;
	if ($pedidos_list->DisplayRecs <= 0 || ($pedidos->Export <> "" && $pedidos->ExportAll)) // Display all records
		$pedidos_list->DisplayRecs = $pedidos_list->TotalRecs;
	if (!($pedidos->Export <> "" && $pedidos->ExportAll))
		$pedidos_list->SetupStartRec(); // Set up start record position
	if ($bSelectLimit)
		$pedidos_list->Recordset = $pedidos_list->LoadRecordset($pedidos_list->StartRec-1, $pedidos_list->DisplayRecs);

	// Set no record found message
	if ($pedidos->CurrentAction == "" && $pedidos_list->TotalRecs == 0) {
		if ($pedidos_list->SearchWhere == "0=101")
			$pedidos_list->setWarningMessage($Language->Phrase("EnterSearchCriteria"));
		else
			$pedidos_list->setWarningMessage($Language->Phrase("NoRecord"));
	}
$pedidos_list->RenderOtherOptions();
?>
<?php if ($Security->IsLoggedIn()) { ?>
<?php if ($pedidos->Export == "" && $pedidos->CurrentAction == "") { ?>
<form name="fpedidoslistsrch" id="fpedidoslistsrch" class="form-inline ewForm ewExtSearchForm" action="<?php echo ew_CurrentPage() ?>">
<?php $SearchPanelClass = ($pedidos_list->SearchWhere <> "") ? " in" : " in"; ?>
<div id="fpedidoslistsrch_SearchPanel" class="ewSearchPanel collapse<?php echo $SearchPanelClass ?>">
<input type="hidden" name="cmd" value="search">
<input type="hidden" name="t" value="pedidos">
	<div class="ewBasicSearch">
<div id="xsr_1" class="ewRow">
	<div class="ewQuickSearch input-group">
	<input type="text" name="<?php echo EW_TABLE_BASIC_SEARCH ?>" id="<?php echo EW_TABLE_BASIC_SEARCH ?>" class="form-control" value="<?php echo ew_HtmlEncode($pedidos_list->BasicSearch->getKeyword()) ?>" placeholder="<?php echo ew_HtmlEncode($Language->Phrase("Search")) ?>">
	<input type="hidden" name="<?php echo EW_TABLE_BASIC_SEARCH_TYPE ?>" id="<?php echo EW_TABLE_BASIC_SEARCH_TYPE ?>" value="<?php echo ew_HtmlEncode($pedidos_list->BasicSearch->getType()) ?>">
	<div class="input-group-btn">
		<button type="button" data-toggle="dropdown" class="btn btn-default"><span id="searchtype"><?php echo $pedidos_list->BasicSearch->getTypeNameShort() ?></span><span class="caret"></span></button>
		<ul class="dropdown-menu pull-right" role="menu">
			<li<?php if ($pedidos_list->BasicSearch->getType() == "") echo " class=\"active\""; ?>><a href="javascript:void(0);" onclick="ew_SetSearchType(this)"><?php echo $Language->Phrase("QuickSearchAuto") ?></a></li>
			<li<?php if ($pedidos_list->BasicSearch->getType() == "=") echo " class=\"active\""; ?>><a href="javascript:void(0);" onclick="ew_SetSearchType(this,'=')"><?php echo $Language->Phrase("QuickSearchExact") ?></a></li>
			<li<?php if ($pedidos_list->BasicSearch->getType() == "AND") echo " class=\"active\""; ?>><a href="javascript:void(0);" onclick="ew_SetSearchType(this,'AND')"><?php echo $Language->Phrase("QuickSearchAll") ?></a></li>
			<li<?php if ($pedidos_list->BasicSearch->getType() == "OR") echo " class=\"active\""; ?>><a href="javascript:void(0);" onclick="ew_SetSearchType(this,'OR')"><?php echo $Language->Phrase("QuickSearchAny") ?></a></li>
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
<?php $pedidos_list->ShowPageHeader(); ?>
<?php
$pedidos_list->ShowMessage();
?>
<?php if ($pedidos_list->TotalRecs > 0 || $pedidos->CurrentAction <> "") { ?>
<div class="box ewBox ewGrid<?php if ($pedidos_list->IsAddOrEdit()) { ?> ewGridAddEdit<?php } ?> pedidos">
<div class="box-header ewGridUpperPanel">
<?php if ($pedidos->CurrentAction <> "gridadd" && $pedidos->CurrentAction <> "gridedit") { ?>
<form name="ewPagerForm" class="form-inline ewForm ewPagerForm" action="<?php echo ew_CurrentPage() ?>">
<?php if (!isset($pedidos_list->Pager)) $pedidos_list->Pager = new cPrevNextPager($pedidos_list->StartRec, $pedidos_list->DisplayRecs, $pedidos_list->TotalRecs, $pedidos_list->AutoHidePager) ?>
<?php if ($pedidos_list->Pager->RecordCount > 0 && $pedidos_list->Pager->Visible) { ?>
<div class="ewPager">
<span><?php echo $Language->Phrase("Page") ?>&nbsp;</span>
<div class="ewPrevNext"><div class="input-group">
<div class="input-group-btn">
<!--first page button-->
	<?php if ($pedidos_list->Pager->FirstButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerFirst") ?>" href="<?php echo $pedidos_list->PageUrl() ?>start=<?php echo $pedidos_list->Pager->FirstButton->Start ?>"><span class="icon-first ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerFirst") ?>"><span class="icon-first ewIcon"></span></a>
	<?php } ?>
<!--previous page button-->
	<?php if ($pedidos_list->Pager->PrevButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerPrevious") ?>" href="<?php echo $pedidos_list->PageUrl() ?>start=<?php echo $pedidos_list->Pager->PrevButton->Start ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerPrevious") ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } ?>
</div>
<!--current page number-->
	<input class="form-control input-sm" type="text" name="<?php echo EW_TABLE_PAGE_NO ?>" value="<?php echo $pedidos_list->Pager->CurrentPage ?>">
<div class="input-group-btn">
<!--next page button-->
	<?php if ($pedidos_list->Pager->NextButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerNext") ?>" href="<?php echo $pedidos_list->PageUrl() ?>start=<?php echo $pedidos_list->Pager->NextButton->Start ?>"><span class="icon-next ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerNext") ?>"><span class="icon-next ewIcon"></span></a>
	<?php } ?>
<!--last page button-->
	<?php if ($pedidos_list->Pager->LastButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerLast") ?>" href="<?php echo $pedidos_list->PageUrl() ?>start=<?php echo $pedidos_list->Pager->LastButton->Start ?>"><span class="icon-last ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerLast") ?>"><span class="icon-last ewIcon"></span></a>
	<?php } ?>
</div>
</div>
</div>
<span>&nbsp;<?php echo $Language->Phrase("of") ?>&nbsp;<?php echo $pedidos_list->Pager->PageCount ?></span>
</div>
<div class="ewPager ewRec">
	<span><?php echo $Language->Phrase("Record") ?>&nbsp;<?php echo $pedidos_list->Pager->FromIndex ?>&nbsp;<?php echo $Language->Phrase("To") ?>&nbsp;<?php echo $pedidos_list->Pager->ToIndex ?>&nbsp;<?php echo $Language->Phrase("Of") ?>&nbsp;<?php echo $pedidos_list->Pager->RecordCount ?></span>
</div>
<?php } ?>
</form>
<?php } ?>
<div class="ewListOtherOptions">
<?php
	foreach ($pedidos_list->OtherOptions as &$option)
		$option->Render("body");
?>
</div>
<div class="clearfix"></div>
</div>
<form name="fpedidoslist" id="fpedidoslist" class="form-inline ewForm ewListForm" action="<?php echo ew_CurrentPage() ?>" method="post">
<?php if ($pedidos_list->CheckToken) { ?>
<input type="hidden" name="<?php echo EW_TOKEN_NAME ?>" value="<?php echo $pedidos_list->Token ?>">
<?php } ?>
<input type="hidden" name="t" value="pedidos">
<div id="gmp_pedidos" class="<?php if (ew_IsResponsiveLayout()) { ?>table-responsive <?php } ?>ewGridMiddlePanel">
<?php if ($pedidos_list->TotalRecs > 0 || $pedidos->CurrentAction == "gridedit") { ?>
<table id="tbl_pedidoslist" class="table ewTable">
<thead>
	<tr class="ewTableHeader">
<?php

// Header row
$pedidos_list->RowType = EW_ROWTYPE_HEADER;

// Render list options
$pedidos_list->RenderListOptions();

// Render list options (header, left)
$pedidos_list->ListOptions->Render("header", "left");
?>
<?php if ($pedidos->id->Visible) { // id ?>
	<?php if ($pedidos->SortUrl($pedidos->id) == "") { ?>
		<th data-name="id" class="<?php echo $pedidos->id->HeaderCellClass() ?>"><div id="elh_pedidos_id" class="pedidos_id"><div class="ewTableHeaderCaption"><?php echo $pedidos->id->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="id" class="<?php echo $pedidos->id->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->id) ?>',2);"><div id="elh_pedidos_id" class="pedidos_id">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->id->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->id->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->id->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->total->Visible) { // total ?>
	<?php if ($pedidos->SortUrl($pedidos->total) == "") { ?>
		<th data-name="total" class="<?php echo $pedidos->total->HeaderCellClass() ?>"><div id="elh_pedidos_total" class="pedidos_total"><div class="ewTableHeaderCaption"><?php echo $pedidos->total->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="total" class="<?php echo $pedidos->total->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->total) ?>',2);"><div id="elh_pedidos_total" class="pedidos_total">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->total->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->total->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->total->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->estado->Visible) { // estado ?>
	<?php if ($pedidos->SortUrl($pedidos->estado) == "") { ?>
		<th data-name="estado" class="<?php echo $pedidos->estado->HeaderCellClass() ?>"><div id="elh_pedidos_estado" class="pedidos_estado"><div class="ewTableHeaderCaption"><?php echo $pedidos->estado->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="estado" class="<?php echo $pedidos->estado->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->estado) ?>',2);"><div id="elh_pedidos_estado" class="pedidos_estado">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->estado->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->estado->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->estado->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->metodo_pago->Visible) { // metodo_pago ?>
	<?php if ($pedidos->SortUrl($pedidos->metodo_pago) == "") { ?>
		<th data-name="metodo_pago" class="<?php echo $pedidos->metodo_pago->HeaderCellClass() ?>"><div id="elh_pedidos_metodo_pago" class="pedidos_metodo_pago"><div class="ewTableHeaderCaption"><?php echo $pedidos->metodo_pago->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="metodo_pago" class="<?php echo $pedidos->metodo_pago->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->metodo_pago) ?>',2);"><div id="elh_pedidos_metodo_pago" class="pedidos_metodo_pago">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->metodo_pago->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->metodo_pago->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->metodo_pago->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->comprador_nombre->Visible) { // comprador_nombre ?>
	<?php if ($pedidos->SortUrl($pedidos->comprador_nombre) == "") { ?>
		<th data-name="comprador_nombre" class="<?php echo $pedidos->comprador_nombre->HeaderCellClass() ?>"><div id="elh_pedidos_comprador_nombre" class="pedidos_comprador_nombre"><div class="ewTableHeaderCaption"><?php echo $pedidos->comprador_nombre->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="comprador_nombre" class="<?php echo $pedidos->comprador_nombre->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->comprador_nombre) ?>',2);"><div id="elh_pedidos_comprador_nombre" class="pedidos_comprador_nombre">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->comprador_nombre->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->comprador_nombre->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->comprador_nombre->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->comprador_email->Visible) { // comprador_email ?>
	<?php if ($pedidos->SortUrl($pedidos->comprador_email) == "") { ?>
		<th data-name="comprador_email" class="<?php echo $pedidos->comprador_email->HeaderCellClass() ?>"><div id="elh_pedidos_comprador_email" class="pedidos_comprador_email"><div class="ewTableHeaderCaption"><?php echo $pedidos->comprador_email->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="comprador_email" class="<?php echo $pedidos->comprador_email->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->comprador_email) ?>',2);"><div id="elh_pedidos_comprador_email" class="pedidos_comprador_email">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->comprador_email->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->comprador_email->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->comprador_email->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->comprador_telefono->Visible) { // comprador_telefono ?>
	<?php if ($pedidos->SortUrl($pedidos->comprador_telefono) == "") { ?>
		<th data-name="comprador_telefono" class="<?php echo $pedidos->comprador_telefono->HeaderCellClass() ?>"><div id="elh_pedidos_comprador_telefono" class="pedidos_comprador_telefono"><div class="ewTableHeaderCaption"><?php echo $pedidos->comprador_telefono->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="comprador_telefono" class="<?php echo $pedidos->comprador_telefono->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->comprador_telefono) ?>',2);"><div id="elh_pedidos_comprador_telefono" class="pedidos_comprador_telefono">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->comprador_telefono->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->comprador_telefono->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->comprador_telefono->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->direccion_envio->Visible) { // direccion_envio ?>
	<?php if ($pedidos->SortUrl($pedidos->direccion_envio) == "") { ?>
		<th data-name="direccion_envio" class="<?php echo $pedidos->direccion_envio->HeaderCellClass() ?>"><div id="elh_pedidos_direccion_envio" class="pedidos_direccion_envio"><div class="ewTableHeaderCaption"><?php echo $pedidos->direccion_envio->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="direccion_envio" class="<?php echo $pedidos->direccion_envio->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->direccion_envio) ?>',2);"><div id="elh_pedidos_direccion_envio" class="pedidos_direccion_envio">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->direccion_envio->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->direccion_envio->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->direccion_envio->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->mp_payment_id->Visible) { // mp_payment_id ?>
	<?php if ($pedidos->SortUrl($pedidos->mp_payment_id) == "") { ?>
		<th data-name="mp_payment_id" class="<?php echo $pedidos->mp_payment_id->HeaderCellClass() ?>"><div id="elh_pedidos_mp_payment_id" class="pedidos_mp_payment_id"><div class="ewTableHeaderCaption"><?php echo $pedidos->mp_payment_id->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="mp_payment_id" class="<?php echo $pedidos->mp_payment_id->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->mp_payment_id) ?>',2);"><div id="elh_pedidos_mp_payment_id" class="pedidos_mp_payment_id">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->mp_payment_id->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->mp_payment_id->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->mp_payment_id->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->tarjeta_last4->Visible) { // tarjeta_last4 ?>
	<?php if ($pedidos->SortUrl($pedidos->tarjeta_last4) == "") { ?>
		<th data-name="tarjeta_last4" class="<?php echo $pedidos->tarjeta_last4->HeaderCellClass() ?>"><div id="elh_pedidos_tarjeta_last4" class="pedidos_tarjeta_last4"><div class="ewTableHeaderCaption"><?php echo $pedidos->tarjeta_last4->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="tarjeta_last4" class="<?php echo $pedidos->tarjeta_last4->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->tarjeta_last4) ?>',2);"><div id="elh_pedidos_tarjeta_last4" class="pedidos_tarjeta_last4">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->tarjeta_last4->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->tarjeta_last4->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->tarjeta_last4->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->tarjeta_payment_method->Visible) { // tarjeta_payment_method ?>
	<?php if ($pedidos->SortUrl($pedidos->tarjeta_payment_method) == "") { ?>
		<th data-name="tarjeta_payment_method" class="<?php echo $pedidos->tarjeta_payment_method->HeaderCellClass() ?>"><div id="elh_pedidos_tarjeta_payment_method" class="pedidos_tarjeta_payment_method"><div class="ewTableHeaderCaption"><?php echo $pedidos->tarjeta_payment_method->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="tarjeta_payment_method" class="<?php echo $pedidos->tarjeta_payment_method->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->tarjeta_payment_method) ?>',2);"><div id="elh_pedidos_tarjeta_payment_method" class="pedidos_tarjeta_payment_method">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->tarjeta_payment_method->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->tarjeta_payment_method->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->tarjeta_payment_method->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->transferencia_ref->Visible) { // transferencia_ref ?>
	<?php if ($pedidos->SortUrl($pedidos->transferencia_ref) == "") { ?>
		<th data-name="transferencia_ref" class="<?php echo $pedidos->transferencia_ref->HeaderCellClass() ?>"><div id="elh_pedidos_transferencia_ref" class="pedidos_transferencia_ref"><div class="ewTableHeaderCaption"><?php echo $pedidos->transferencia_ref->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="transferencia_ref" class="<?php echo $pedidos->transferencia_ref->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->transferencia_ref) ?>',2);"><div id="elh_pedidos_transferencia_ref" class="pedidos_transferencia_ref">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->transferencia_ref->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->transferencia_ref->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->transferencia_ref->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->mp_error_code->Visible) { // mp_error_code ?>
	<?php if ($pedidos->SortUrl($pedidos->mp_error_code) == "") { ?>
		<th data-name="mp_error_code" class="<?php echo $pedidos->mp_error_code->HeaderCellClass() ?>"><div id="elh_pedidos_mp_error_code" class="pedidos_mp_error_code"><div class="ewTableHeaderCaption"><?php echo $pedidos->mp_error_code->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="mp_error_code" class="<?php echo $pedidos->mp_error_code->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->mp_error_code) ?>',2);"><div id="elh_pedidos_mp_error_code" class="pedidos_mp_error_code">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->mp_error_code->FldCaption() ?><?php echo $Language->Phrase("SrchLegend") ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->mp_error_code->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->mp_error_code->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->createdAt->Visible) { // createdAt ?>
	<?php if ($pedidos->SortUrl($pedidos->createdAt) == "") { ?>
		<th data-name="createdAt" class="<?php echo $pedidos->createdAt->HeaderCellClass() ?>"><div id="elh_pedidos_createdAt" class="pedidos_createdAt"><div class="ewTableHeaderCaption"><?php echo $pedidos->createdAt->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="createdAt" class="<?php echo $pedidos->createdAt->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->createdAt) ?>',2);"><div id="elh_pedidos_createdAt" class="pedidos_createdAt">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->createdAt->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->createdAt->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->createdAt->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($pedidos->updatedAt->Visible) { // updatedAt ?>
	<?php if ($pedidos->SortUrl($pedidos->updatedAt) == "") { ?>
		<th data-name="updatedAt" class="<?php echo $pedidos->updatedAt->HeaderCellClass() ?>"><div id="elh_pedidos_updatedAt" class="pedidos_updatedAt"><div class="ewTableHeaderCaption"><?php echo $pedidos->updatedAt->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="updatedAt" class="<?php echo $pedidos->updatedAt->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $pedidos->SortUrl($pedidos->updatedAt) ?>',2);"><div id="elh_pedidos_updatedAt" class="pedidos_updatedAt">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $pedidos->updatedAt->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($pedidos->updatedAt->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($pedidos->updatedAt->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php

// Render list options (header, right)
$pedidos_list->ListOptions->Render("header", "right");
?>
	</tr>
</thead>
<tbody>
<?php
if ($pedidos->ExportAll && $pedidos->Export <> "") {
	$pedidos_list->StopRec = $pedidos_list->TotalRecs;
} else {

	// Set the last record to display
	if ($pedidos_list->TotalRecs > $pedidos_list->StartRec + $pedidos_list->DisplayRecs - 1)
		$pedidos_list->StopRec = $pedidos_list->StartRec + $pedidos_list->DisplayRecs - 1;
	else
		$pedidos_list->StopRec = $pedidos_list->TotalRecs;
}
$pedidos_list->RecCnt = $pedidos_list->StartRec - 1;
if ($pedidos_list->Recordset && !$pedidos_list->Recordset->EOF) {
	$pedidos_list->Recordset->MoveFirst();
	$bSelectLimit = $pedidos_list->UseSelectLimit;
	if (!$bSelectLimit && $pedidos_list->StartRec > 1)
		$pedidos_list->Recordset->Move($pedidos_list->StartRec - 1);
} elseif (!$pedidos->AllowAddDeleteRow && $pedidos_list->StopRec == 0) {
	$pedidos_list->StopRec = $pedidos->GridAddRowCount;
}

// Initialize aggregate
$pedidos->RowType = EW_ROWTYPE_AGGREGATEINIT;
$pedidos->ResetAttrs();
$pedidos_list->RenderRow();
while ($pedidos_list->RecCnt < $pedidos_list->StopRec) {
	$pedidos_list->RecCnt++;
	if (intval($pedidos_list->RecCnt) >= intval($pedidos_list->StartRec)) {
		$pedidos_list->RowCnt++;

		// Set up key count
		$pedidos_list->KeyCount = $pedidos_list->RowIndex;

		// Init row class and style
		$pedidos->ResetAttrs();
		$pedidos->CssClass = "";
		if ($pedidos->CurrentAction == "gridadd") {
		} else {
			$pedidos_list->LoadRowValues($pedidos_list->Recordset); // Load row values
		}
		$pedidos->RowType = EW_ROWTYPE_VIEW; // Render view

		// Set up row id / data-rowindex
		$pedidos->RowAttrs = array_merge($pedidos->RowAttrs, array('data-rowindex'=>$pedidos_list->RowCnt, 'id'=>'r' . $pedidos_list->RowCnt . '_pedidos', 'data-rowtype'=>$pedidos->RowType));

		// Render row
		$pedidos_list->RenderRow();

		// Render list options
		$pedidos_list->RenderListOptions();
?>
	<tr<?php echo $pedidos->RowAttributes() ?>>
<?php

// Render list options (body, left)
$pedidos_list->ListOptions->Render("body", "left", $pedidos_list->RowCnt);
?>
	<?php if ($pedidos->id->Visible) { // id ?>
		<td data-name="id"<?php echo $pedidos->id->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_id" class="pedidos_id">
<span<?php echo $pedidos->id->ViewAttributes() ?>>
<?php echo $pedidos->id->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->total->Visible) { // total ?>
		<td data-name="total"<?php echo $pedidos->total->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_total" class="pedidos_total">
<span<?php echo $pedidos->total->ViewAttributes() ?>>
<?php echo $pedidos->total->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->estado->Visible) { // estado ?>
		<td data-name="estado"<?php echo $pedidos->estado->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_estado" class="pedidos_estado">
<span<?php echo $pedidos->estado->ViewAttributes() ?>>
<?php echo $pedidos->estado->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->metodo_pago->Visible) { // metodo_pago ?>
		<td data-name="metodo_pago"<?php echo $pedidos->metodo_pago->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_metodo_pago" class="pedidos_metodo_pago">
<span<?php echo $pedidos->metodo_pago->ViewAttributes() ?>>
<?php echo $pedidos->metodo_pago->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->comprador_nombre->Visible) { // comprador_nombre ?>
		<td data-name="comprador_nombre"<?php echo $pedidos->comprador_nombre->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_comprador_nombre" class="pedidos_comprador_nombre">
<span<?php echo $pedidos->comprador_nombre->ViewAttributes() ?>>
<?php echo $pedidos->comprador_nombre->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->comprador_email->Visible) { // comprador_email ?>
		<td data-name="comprador_email"<?php echo $pedidos->comprador_email->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_comprador_email" class="pedidos_comprador_email">
<span<?php echo $pedidos->comprador_email->ViewAttributes() ?>>
<?php echo $pedidos->comprador_email->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->comprador_telefono->Visible) { // comprador_telefono ?>
		<td data-name="comprador_telefono"<?php echo $pedidos->comprador_telefono->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_comprador_telefono" class="pedidos_comprador_telefono">
<span<?php echo $pedidos->comprador_telefono->ViewAttributes() ?>>
<?php echo $pedidos->comprador_telefono->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->direccion_envio->Visible) { // direccion_envio ?>
		<td data-name="direccion_envio"<?php echo $pedidos->direccion_envio->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_direccion_envio" class="pedidos_direccion_envio">
<span<?php echo $pedidos->direccion_envio->ViewAttributes() ?>>
<?php echo $pedidos->direccion_envio->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->mp_payment_id->Visible) { // mp_payment_id ?>
		<td data-name="mp_payment_id"<?php echo $pedidos->mp_payment_id->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_mp_payment_id" class="pedidos_mp_payment_id">
<span<?php echo $pedidos->mp_payment_id->ViewAttributes() ?>>
<?php echo $pedidos->mp_payment_id->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->tarjeta_last4->Visible) { // tarjeta_last4 ?>
		<td data-name="tarjeta_last4"<?php echo $pedidos->tarjeta_last4->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_tarjeta_last4" class="pedidos_tarjeta_last4">
<span<?php echo $pedidos->tarjeta_last4->ViewAttributes() ?>>
<?php echo $pedidos->tarjeta_last4->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->tarjeta_payment_method->Visible) { // tarjeta_payment_method ?>
		<td data-name="tarjeta_payment_method"<?php echo $pedidos->tarjeta_payment_method->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_tarjeta_payment_method" class="pedidos_tarjeta_payment_method">
<span<?php echo $pedidos->tarjeta_payment_method->ViewAttributes() ?>>
<?php echo $pedidos->tarjeta_payment_method->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->transferencia_ref->Visible) { // transferencia_ref ?>
		<td data-name="transferencia_ref"<?php echo $pedidos->transferencia_ref->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_transferencia_ref" class="pedidos_transferencia_ref">
<span<?php echo $pedidos->transferencia_ref->ViewAttributes() ?>>
<?php echo $pedidos->transferencia_ref->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->mp_error_code->Visible) { // mp_error_code ?>
		<td data-name="mp_error_code"<?php echo $pedidos->mp_error_code->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_mp_error_code" class="pedidos_mp_error_code">
<span<?php echo $pedidos->mp_error_code->ViewAttributes() ?>>
<?php echo $pedidos->mp_error_code->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->createdAt->Visible) { // createdAt ?>
		<td data-name="createdAt"<?php echo $pedidos->createdAt->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_createdAt" class="pedidos_createdAt">
<span<?php echo $pedidos->createdAt->ViewAttributes() ?>>
<?php echo $pedidos->createdAt->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
	<?php if ($pedidos->updatedAt->Visible) { // updatedAt ?>
		<td data-name="updatedAt"<?php echo $pedidos->updatedAt->CellAttributes() ?>>
<span id="el<?php echo $pedidos_list->RowCnt ?>_pedidos_updatedAt" class="pedidos_updatedAt">
<span<?php echo $pedidos->updatedAt->ViewAttributes() ?>>
<?php echo $pedidos->updatedAt->ListViewValue() ?></span>
</span>
</td>
	<?php } ?>
<?php

// Render list options (body, right)
$pedidos_list->ListOptions->Render("body", "right", $pedidos_list->RowCnt);
?>
	</tr>
<?php
	}
	if ($pedidos->CurrentAction <> "gridadd")
		$pedidos_list->Recordset->MoveNext();
}
?>
</tbody>
</table>
<?php } ?>
<?php if ($pedidos->CurrentAction == "") { ?>
<input type="hidden" name="a_list" id="a_list" value="">
<?php } ?>
</div>
</form>
<?php

// Close recordset
if ($pedidos_list->Recordset)
	$pedidos_list->Recordset->Close();
?>
<div class="box-footer ewGridLowerPanel">
<?php if ($pedidos->CurrentAction <> "gridadd" && $pedidos->CurrentAction <> "gridedit") { ?>
<form name="ewPagerForm" class="ewForm form-inline ewPagerForm" action="<?php echo ew_CurrentPage() ?>">
<?php if (!isset($pedidos_list->Pager)) $pedidos_list->Pager = new cPrevNextPager($pedidos_list->StartRec, $pedidos_list->DisplayRecs, $pedidos_list->TotalRecs, $pedidos_list->AutoHidePager) ?>
<?php if ($pedidos_list->Pager->RecordCount > 0 && $pedidos_list->Pager->Visible) { ?>
<div class="ewPager">
<span><?php echo $Language->Phrase("Page") ?>&nbsp;</span>
<div class="ewPrevNext"><div class="input-group">
<div class="input-group-btn">
<!--first page button-->
	<?php if ($pedidos_list->Pager->FirstButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerFirst") ?>" href="<?php echo $pedidos_list->PageUrl() ?>start=<?php echo $pedidos_list->Pager->FirstButton->Start ?>"><span class="icon-first ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerFirst") ?>"><span class="icon-first ewIcon"></span></a>
	<?php } ?>
<!--previous page button-->
	<?php if ($pedidos_list->Pager->PrevButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerPrevious") ?>" href="<?php echo $pedidos_list->PageUrl() ?>start=<?php echo $pedidos_list->Pager->PrevButton->Start ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerPrevious") ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } ?>
</div>
<!--current page number-->
	<input class="form-control input-sm" type="text" name="<?php echo EW_TABLE_PAGE_NO ?>" value="<?php echo $pedidos_list->Pager->CurrentPage ?>">
<div class="input-group-btn">
<!--next page button-->
	<?php if ($pedidos_list->Pager->NextButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerNext") ?>" href="<?php echo $pedidos_list->PageUrl() ?>start=<?php echo $pedidos_list->Pager->NextButton->Start ?>"><span class="icon-next ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerNext") ?>"><span class="icon-next ewIcon"></span></a>
	<?php } ?>
<!--last page button-->
	<?php if ($pedidos_list->Pager->LastButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerLast") ?>" href="<?php echo $pedidos_list->PageUrl() ?>start=<?php echo $pedidos_list->Pager->LastButton->Start ?>"><span class="icon-last ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerLast") ?>"><span class="icon-last ewIcon"></span></a>
	<?php } ?>
</div>
</div>
</div>
<span>&nbsp;<?php echo $Language->Phrase("of") ?>&nbsp;<?php echo $pedidos_list->Pager->PageCount ?></span>
</div>
<div class="ewPager ewRec">
	<span><?php echo $Language->Phrase("Record") ?>&nbsp;<?php echo $pedidos_list->Pager->FromIndex ?>&nbsp;<?php echo $Language->Phrase("To") ?>&nbsp;<?php echo $pedidos_list->Pager->ToIndex ?>&nbsp;<?php echo $Language->Phrase("Of") ?>&nbsp;<?php echo $pedidos_list->Pager->RecordCount ?></span>
</div>
<?php } ?>
</form>
<?php } ?>
<div class="ewListOtherOptions">
<?php
	foreach ($pedidos_list->OtherOptions as &$option)
		$option->Render("body", "bottom");
?>
</div>
<div class="clearfix"></div>
</div>
</div>
<?php } ?>
<?php if ($pedidos_list->TotalRecs == 0 && $pedidos->CurrentAction == "") { // Show other options ?>
<div class="ewListOtherOptions">
<?php
	foreach ($pedidos_list->OtherOptions as &$option) {
		$option->ButtonClass = "";
		$option->Render("body", "");
	}
?>
</div>
<div class="clearfix"></div>
<?php } ?>
<script type="text/javascript">
fpedidoslistsrch.FilterList = <?php echo $pedidos_list->GetFilterList() ?>;
fpedidoslistsrch.Init();
fpedidoslist.Init();
</script>
<?php
$pedidos_list->ShowPageFooter();
if (EW_DEBUG_ENABLED)
	echo ew_DebugMsg();
?>
<script type="text/javascript">

// Write your table-specific startup script here
// document.write("page loaded");

</script>
<?php include_once "footer.php" ?>
<?php
$pedidos_list->Page_Terminate();
?>
