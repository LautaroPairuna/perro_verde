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

$productoespecificaciones_list = NULL; // Initialize page object first

class cproductoespecificaciones_list extends cproductoespecificaciones {

	// Page ID
	var $PageID = 'list';

	// Project ID
	var $ProjectID = '{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}';

	// Table name
	var $TableName = 'productoespecificaciones';

	// Page object name
	var $PageObjName = 'productoespecificaciones_list';

	// Grid form hidden field names
	var $FormName = 'fproductoespecificacioneslist';
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

		// Table object (productoespecificaciones)
		if (!isset($GLOBALS["productoespecificaciones"]) || get_class($GLOBALS["productoespecificaciones"]) == "cproductoespecificaciones") {
			$GLOBALS["productoespecificaciones"] = &$this;
			$GLOBALS["Table"] = &$GLOBALS["productoespecificaciones"];
		}

		// Initialize URLs
		$this->ExportPrintUrl = $this->PageUrl() . "export=print";
		$this->ExportExcelUrl = $this->PageUrl() . "export=excel";
		$this->ExportWordUrl = $this->PageUrl() . "export=word";
		$this->ExportHtmlUrl = $this->PageUrl() . "export=html";
		$this->ExportXmlUrl = $this->PageUrl() . "export=xml";
		$this->ExportCsvUrl = $this->PageUrl() . "export=csv";
		$this->ExportPdfUrl = $this->PageUrl() . "export=pdf";
		$this->AddUrl = "productoespecificacionesadd.php";
		$this->InlineAddUrl = $this->PageUrl() . "a=add";
		$this->GridAddUrl = $this->PageUrl() . "a=gridadd";
		$this->GridEditUrl = $this->PageUrl() . "a=gridedit";
		$this->MultiDeleteUrl = "productoespecificacionesdelete.php";
		$this->MultiUpdateUrl = "productoespecificacionesupdate.php";

		// Table object (productos)
		if (!isset($GLOBALS['productos'])) $GLOBALS['productos'] = new cproductos();

		// Page ID
		if (!defined("EW_PAGE_ID"))
			define("EW_PAGE_ID", 'list', TRUE);

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
		$this->FilterOptions->TagClassName = "ewFilterOption fproductoespecificacioneslistsrch";

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
		// Create form object

		$objForm = new cFormObj();
		$this->CurrentAction = (@$_GET["a"] <> "") ? $_GET["a"] : @$_POST["a_list"]; // Set up current action

		// Get grid add count
		$gridaddcnt = @$_GET[EW_TABLE_GRID_ADD_ROW_COUNT];
		if (is_numeric($gridaddcnt) && $gridaddcnt > 0)
			$this->GridAddRowCount = $gridaddcnt;

		// Set up list options
		$this->SetupListOptions();
		$this->id->SetVisibility();
		$this->id->Visible = !$this->IsAdd() && !$this->IsCopy() && !$this->IsGridAdd();
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

		// Set up master detail parameters
		$this->SetupMasterParms();

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

			// Check QueryString parameters
			if (@$_GET["a"] <> "") {
				$this->CurrentAction = $_GET["a"];

				// Clear inline mode
				if ($this->CurrentAction == "cancel")
					$this->ClearInlineMode();

				// Switch to grid edit mode
				if ($this->CurrentAction == "gridedit")
					$this->GridEditMode();

				// Switch to grid add mode
				if ($this->CurrentAction == "gridadd")
					$this->GridAddMode();
			} else {
				if (@$_POST["a_list"] <> "") {
					$this->CurrentAction = $_POST["a_list"]; // Get action

					// Grid Update
					if (($this->CurrentAction == "gridupdate" || $this->CurrentAction == "gridoverwrite") && @$_SESSION[EW_SESSION_INLINE_MODE] == "gridedit") {
						if ($this->ValidateGridForm()) {
							$bGridUpdate = $this->GridUpdate();
						} else {
							$bGridUpdate = FALSE;
							$this->setFailureMessage($gsFormError);
						}
						if (!$bGridUpdate) {
							$this->EventCancelled = TRUE;
							$this->CurrentAction = "gridedit"; // Stay in Grid Edit mode
						}
					}

					// Grid Insert
					if ($this->CurrentAction == "gridinsert" && @$_SESSION[EW_SESSION_INLINE_MODE] == "gridadd") {
						if ($this->ValidateGridForm()) {
							$bGridInsert = $this->GridInsert();
						} else {
							$bGridInsert = FALSE;
							$this->setFailureMessage($gsFormError);
						}
						if (!$bGridInsert) {
							$this->EventCancelled = TRUE;
							$this->CurrentAction = "gridadd"; // Stay in Grid Add mode
						}
					}
				}
			}

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

			// Show grid delete link for grid add / grid edit
			if ($this->AllowAddDeleteRow) {
				if ($this->CurrentAction == "gridadd" || $this->CurrentAction == "gridedit") {
					$item = $this->ListOptions->GetItem("griddelete");
					if ($item) $item->Visible = TRUE;
				}
			}

			// Set up sorting order
			$this->SetupSortOrder();
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

		// Build filter
		$sFilter = "";

		// Restore master/detail filter
		$this->DbMasterFilter = $this->GetMasterFilter(); // Restore master filter
		$this->DbDetailFilter = $this->GetDetailFilter(); // Restore detail filter
		ew_AddFilter($sFilter, $this->DbDetailFilter);
		ew_AddFilter($sFilter, $this->SearchWhere);

		// Load master record
		if ($this->CurrentMode <> "add" && $this->GetMasterFilter() <> "" && $this->getCurrentMasterTable() == "productos") {
			global $productos;
			$rsmaster = $productos->LoadRs($this->DbMasterFilter);
			$this->MasterRecordExists = ($rsmaster && !$rsmaster->EOF);
			if (!$this->MasterRecordExists) {
				$this->setFailureMessage($Language->Phrase("NoRecord")); // Set no record found
				$this->Page_Terminate("productoslist.php"); // Return to master page
			} else {
				$productos->LoadListRowValues($rsmaster);
				$productos->RowType = EW_ROWTYPE_MASTER; // Master row
				$productos->RenderListRow();
				$rsmaster->Close();
			}
		}

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

	// Exit inline mode
	function ClearInlineMode() {
		$this->id_copy->FormValue = ""; // Clear form value
		$this->LastAction = $this->CurrentAction; // Save last action
		$this->CurrentAction = ""; // Clear action
		$_SESSION[EW_SESSION_INLINE_MODE] = ""; // Clear inline mode
	}

	// Switch to Grid Add mode
	function GridAddMode() {
		$_SESSION[EW_SESSION_INLINE_MODE] = "gridadd"; // Enabled grid add
	}

	// Switch to Grid Edit mode
	function GridEditMode() {
		$_SESSION[EW_SESSION_INLINE_MODE] = "gridedit"; // Enable grid edit
	}

	// Perform update to grid
	function GridUpdate() {
		global $Language, $objForm, $gsFormError;
		$bGridUpdate = TRUE;

		// Get old recordset
		$this->CurrentFilter = $this->BuildKeyFilter();
		if ($this->CurrentFilter == "")
			$this->CurrentFilter = "0=1";
		$sSql = $this->SQL();
		$conn = &$this->Connection();
		if ($rs = $conn->Execute($sSql)) {
			$rsold = $rs->GetRows();
			$rs->Close();
		}

		// Call Grid Updating event
		if (!$this->Grid_Updating($rsold)) {
			if ($this->getFailureMessage() == "")
				$this->setFailureMessage($Language->Phrase("GridEditCancelled")); // Set grid edit cancelled message
			return FALSE;
		}

		// Begin transaction
		$conn->BeginTrans();
		$sKey = "";

		// Update row index and get row key
		$objForm->Index = -1;
		$rowcnt = strval($objForm->GetValue($this->FormKeyCountName));
		if ($rowcnt == "" || !is_numeric($rowcnt))
			$rowcnt = 0;

		// Update all rows based on key
		for ($rowindex = 1; $rowindex <= $rowcnt; $rowindex++) {
			$objForm->Index = $rowindex;
			$rowkey = strval($objForm->GetValue($this->FormKeyName));
			$rowaction = strval($objForm->GetValue($this->FormActionName));

			// Load all values and keys
			if ($rowaction <> "insertdelete") { // Skip insert then deleted rows
				$this->LoadFormValues(); // Get form values
				if ($rowaction == "" || $rowaction == "edit" || $rowaction == "delete") {
					$bGridUpdate = $this->SetupKeyValues($rowkey); // Set up key values
				} else {
					$bGridUpdate = TRUE;
				}

				// Skip empty row
				if ($rowaction == "insert" && $this->EmptyRow()) {

					// No action required
				// Validate form and insert/update/delete record

				} elseif ($bGridUpdate) {
					if ($rowaction == "delete") {
						$this->CurrentFilter = $this->KeyFilter();
						$bGridUpdate = $this->DeleteRows(); // Delete this row
					} else if (!$this->ValidateForm()) {
						$bGridUpdate = FALSE; // Form error, reset action
						$this->setFailureMessage($gsFormError);
					} else {
						if ($rowaction == "insert") {
							$bGridUpdate = $this->AddRow(); // Insert this row
						} else {
							if ($rowkey <> "") {
								$this->SendEmail = FALSE; // Do not send email on update success
								$bGridUpdate = $this->EditRow(); // Update this row
							}
						} // End update
					}
				}
				if ($bGridUpdate) {
					if ($sKey <> "") $sKey .= ", ";
					$sKey .= $rowkey;
				} else {
					break;
				}
			}
		}
		if ($bGridUpdate) {
			$conn->CommitTrans(); // Commit transaction

			// Get new recordset
			if ($rs = $conn->Execute($sSql)) {
				$rsnew = $rs->GetRows();
				$rs->Close();
			}

			// Call Grid_Updated event
			$this->Grid_Updated($rsold, $rsnew);
			if ($this->getSuccessMessage() == "")
				$this->setSuccessMessage($Language->Phrase("UpdateSuccess")); // Set up update success message
			$this->ClearInlineMode(); // Clear inline edit mode
		} else {
			$conn->RollbackTrans(); // Rollback transaction
			if ($this->getFailureMessage() == "")
				$this->setFailureMessage($Language->Phrase("UpdateFailed")); // Set update failed message
		}
		return $bGridUpdate;
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

	// Perform Grid Add
	function GridInsert() {
		global $Language, $objForm, $gsFormError;
		$rowindex = 1;
		$bGridInsert = FALSE;
		$conn = &$this->Connection();

		// Call Grid Inserting event
		if (!$this->Grid_Inserting()) {
			if ($this->getFailureMessage() == "") {
				$this->setFailureMessage($Language->Phrase("GridAddCancelled")); // Set grid add cancelled message
			}
			return FALSE;
		}

		// Begin transaction
		$conn->BeginTrans();

		// Init key filter
		$sWrkFilter = "";
		$addcnt = 0;
		$sKey = "";

		// Get row count
		$objForm->Index = -1;
		$rowcnt = strval($objForm->GetValue($this->FormKeyCountName));
		if ($rowcnt == "" || !is_numeric($rowcnt))
			$rowcnt = 0;

		// Insert all rows
		for ($rowindex = 1; $rowindex <= $rowcnt; $rowindex++) {

			// Load current row values
			$objForm->Index = $rowindex;
			$rowaction = strval($objForm->GetValue($this->FormActionName));
			if ($rowaction <> "" && $rowaction <> "insert")
				continue; // Skip
			$this->LoadFormValues(); // Get form values
			if (!$this->EmptyRow()) {
				$addcnt++;
				$this->SendEmail = FALSE; // Do not send email on insert success

				// Validate form
				if (!$this->ValidateForm()) {
					$bGridInsert = FALSE; // Form error, reset action
					$this->setFailureMessage($gsFormError);
				} else {
					$bGridInsert = $this->AddRow($this->OldRecordset); // Insert this row
				}
				if ($bGridInsert) {
					if ($sKey <> "") $sKey .= $GLOBALS["EW_COMPOSITE_KEY_SEPARATOR"];
					$sKey .= $this->id->CurrentValue;

					// Add filter for this record
					$sFilter = $this->KeyFilter();
					if ($sWrkFilter <> "") $sWrkFilter .= " OR ";
					$sWrkFilter .= $sFilter;
				} else {
					break;
				}
			}
		}
		if ($addcnt == 0) { // No record inserted
			$this->setFailureMessage($Language->Phrase("NoAddRecord"));
			$bGridInsert = FALSE;
		}
		if ($bGridInsert) {
			$conn->CommitTrans(); // Commit transaction

			// Get new recordset
			$this->CurrentFilter = $sWrkFilter;
			$sSql = $this->SQL();
			if ($rs = $conn->Execute($sSql)) {
				$rsnew = $rs->GetRows();
				$rs->Close();
			}

			// Call Grid_Inserted event
			$this->Grid_Inserted($rsnew);
			if ($this->getSuccessMessage() == "")
				$this->setSuccessMessage($Language->Phrase("InsertSuccess")); // Set up insert success message
			$this->ClearInlineMode(); // Clear grid add mode
		} else {
			$conn->RollbackTrans(); // Rollback transaction
			if ($this->getFailureMessage() == "") {
				$this->setFailureMessage($Language->Phrase("InsertFailed")); // Set insert failed message
			}
		}
		return $bGridInsert;
	}

	// Check if empty row
	function EmptyRow() {
		global $objForm;
		if ($objForm->HasValue("x_categoria") && $objForm->HasValue("o_categoria") && $this->categoria->CurrentValue <> $this->categoria->OldValue)
			return FALSE;
		if ($objForm->HasValue("x_especificaciones") && $objForm->HasValue("o_especificaciones") && $this->especificaciones->CurrentValue <> $this->especificaciones->OldValue)
			return FALSE;
		if ($objForm->HasValue("x_orden") && $objForm->HasValue("o_orden") && $this->orden->CurrentValue <> $this->orden->OldValue)
			return FALSE;
		if ($objForm->HasValue("x_id_copy") && $objForm->HasValue("o_id_copy") && $this->id_copy->CurrentValue <> $this->id_copy->OldValue)
			return FALSE;
		if ($objForm->HasValue("x_activo") && $objForm->HasValue("o_activo") && $this->activo->CurrentValue <> $this->activo->OldValue)
			return FALSE;
		return TRUE;
	}

	// Validate grid form
	function ValidateGridForm() {
		global $objForm;

		// Get row count
		$objForm->Index = -1;
		$rowcnt = strval($objForm->GetValue($this->FormKeyCountName));
		if ($rowcnt == "" || !is_numeric($rowcnt))
			$rowcnt = 0;

		// Validate all records
		for ($rowindex = 1; $rowindex <= $rowcnt; $rowindex++) {

			// Load current row values
			$objForm->Index = $rowindex;
			$rowaction = strval($objForm->GetValue($this->FormActionName));
			if ($rowaction <> "delete" && $rowaction <> "insertdelete") {
				$this->LoadFormValues(); // Get form values
				if ($rowaction == "insert" && $this->EmptyRow()) {

					// Ignore
				} else if (!$this->ValidateForm()) {
					return FALSE;
				}
			}
		}
		return TRUE;
	}

	// Get all form values of the grid
	function GetGridFormValues() {
		global $objForm;

		// Get row count
		$objForm->Index = -1;
		$rowcnt = strval($objForm->GetValue($this->FormKeyCountName));
		if ($rowcnt == "" || !is_numeric($rowcnt))
			$rowcnt = 0;
		$rows = array();

		// Loop through all records
		for ($rowindex = 1; $rowindex <= $rowcnt; $rowindex++) {

			// Load current row values
			$objForm->Index = $rowindex;
			$rowaction = strval($objForm->GetValue($this->FormActionName));
			if ($rowaction <> "delete" && $rowaction <> "insertdelete") {
				$this->LoadFormValues(); // Get form values
				if ($rowaction == "insert" && $this->EmptyRow()) {

					// Ignore
				} else {
					$rows[] = $this->GetFieldValues("FormValue"); // Return row as array
				}
			}
		}
		return $rows; // Return as array of array
	}

	// Restore form values for current row
	function RestoreCurrentRowFormValues($idx) {
		global $objForm;

		// Get row based on current index
		$objForm->Index = $idx;
		$this->LoadFormValues(); // Load form values
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
			$this->UpdateSort($this->categoria, $bCtrl); // categoria
			$this->UpdateSort($this->especificaciones, $bCtrl); // especificaciones
			$this->UpdateSort($this->orden, $bCtrl); // orden
			$this->UpdateSort($this->id_copy, $bCtrl); // id copy
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
				$this->orden->setSort("ASC");
				$this->id->setSort("ASC");
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

			// Reset master/detail keys
			if ($this->Command == "resetall") {
				$this->setCurrentMasterTable(""); // Clear master table
				$this->DbMasterFilter = "";
				$this->DbDetailFilter = "";
				$this->producto_id->setSessionValue("");
			}

			// Reset sorting order
			if ($this->Command == "resetsort") {
				$sOrderBy = "";
				$this->setSessionOrderBy($sOrderBy);
				$this->id->setSort("");
				$this->categoria->setSort("");
				$this->especificaciones->setSort("");
				$this->orden->setSort("");
				$this->id_copy->setSort("");
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

		// "griddelete"
		if ($this->AllowAddDeleteRow) {
			$item = &$this->ListOptions->Add("griddelete");
			$item->CssClass = "text-nowrap";
			$item->OnLeft = TRUE;
			$item->Visible = FALSE; // Default hidden
		}

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

		// Set up row action and key
		if (is_numeric($this->RowIndex) && $this->CurrentMode <> "view") {
			$objForm->Index = $this->RowIndex;
			$ActionName = str_replace("k_", "k" . $this->RowIndex . "_", $this->FormActionName);
			$OldKeyName = str_replace("k_", "k" . $this->RowIndex . "_", $this->FormOldKeyName);
			$KeyName = str_replace("k_", "k" . $this->RowIndex . "_", $this->FormKeyName);
			$BlankRowName = str_replace("k_", "k" . $this->RowIndex . "_", $this->FormBlankRowName);
			if ($this->RowAction <> "")
				$this->MultiSelectKey .= "<input type=\"hidden\" name=\"" . $ActionName . "\" id=\"" . $ActionName . "\" value=\"" . $this->RowAction . "\">";
			if ($this->RowAction == "delete") {
				$rowkey = $objForm->GetValue($this->FormKeyName);
				$this->SetupKeyValues($rowkey);
			}
			if ($this->RowAction == "insert" && $this->CurrentAction == "F" && $this->EmptyRow())
				$this->MultiSelectKey .= "<input type=\"hidden\" name=\"" . $BlankRowName . "\" id=\"" . $BlankRowName . "\" value=\"1\">";
		}

		// "delete"
		if ($this->AllowAddDeleteRow) {
			if ($this->CurrentAction == "gridadd" || $this->CurrentAction == "gridedit") {
				$option = &$this->ListOptions;
				$option->UseButtonGroup = TRUE; // Use button group for grid delete button
				$option->UseImageAndText = TRUE; // Use image and text for grid delete button
				$oListOpt = &$option->Items["griddelete"];
				$oListOpt->Body = "<a class=\"ewGridLink ewGridDelete\" title=\"" . ew_HtmlTitle($Language->Phrase("DeleteLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("DeleteLink")) . "\" onclick=\"return ew_DeleteGridRow(this, " . $this->RowIndex . ");\">" . $Language->Phrase("DeleteLink") . "</a>";
			}
		}

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
		if ($this->CurrentAction == "gridedit" && is_numeric($this->RowIndex)) {
			$this->MultiSelectKey .= "<input type=\"hidden\" name=\"" . $KeyName . "\" id=\"" . $KeyName . "\" value=\"" . $this->id->CurrentValue . "\">";
		}
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
		$item = &$option->Add("gridadd");
		$item->Body = "<a class=\"ewAddEdit ewGridAdd\" title=\"" . ew_HtmlTitle($Language->Phrase("GridAddLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("GridAddLink")) . "\" href=\"" . ew_HtmlEncode($this->GridAddUrl) . "\">" . $Language->Phrase("GridAddLink") . "</a>";
		$item->Visible = ($this->GridAddUrl <> "" && $Security->IsLoggedIn());

		// Add grid edit
		$option = $options["addedit"];
		$item = &$option->Add("gridedit");
		$item->Body = "<a class=\"ewAddEdit ewGridEdit\" title=\"" . ew_HtmlTitle($Language->Phrase("GridEditLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("GridEditLink")) . "\" href=\"" . ew_HtmlEncode($this->GridEditUrl) . "\">" . $Language->Phrase("GridEditLink") . "</a>";
		$item->Visible = ($this->GridEditUrl <> "" && $Security->IsLoggedIn());
		$option = $options["action"];

		// Add multi delete
		$item = &$option->Add("multidelete");
		$item->Body = "<a class=\"ewAction ewMultiDelete\" title=\"" . ew_HtmlTitle($Language->Phrase("DeleteSelectedLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("DeleteSelectedLink")) . "\" href=\"\" onclick=\"ew_SubmitAction(event,{f:document.fproductoespecificacioneslist,url:'" . $this->MultiDeleteUrl . "'});return false;\">" . $Language->Phrase("DeleteSelectedLink") . "</a>";
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
		$item->Body = "<a class=\"ewSaveFilter\" data-form=\"fproductoespecificacioneslistsrch\" href=\"#\">" . $Language->Phrase("SaveCurrentFilter") . "</a>";
		$item->Visible = FALSE;
		$item = &$this->FilterOptions->Add("deletefilter");
		$item->Body = "<a class=\"ewDeleteFilter\" data-form=\"fproductoespecificacioneslistsrch\" href=\"#\">" . $Language->Phrase("DeleteFilter") . "</a>";
		$item->Visible = FALSE;
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
		if ($this->CurrentAction <> "gridadd" && $this->CurrentAction <> "gridedit") { // Not grid add/edit mode
			$option = &$options["action"];

			// Set up list action buttons
			foreach ($this->ListActions->Items as $listaction) {
				if ($listaction->Select == EW_ACTION_MULTIPLE) {
					$item = &$option->Add("custom_" . $listaction->Action);
					$caption = $listaction->Caption;
					$icon = ($listaction->Icon <> "") ? "<span class=\"" . ew_HtmlEncode($listaction->Icon) . "\" data-caption=\"" . ew_HtmlEncode($caption) . "\"></span> " : $caption;
					$item->Body = "<a class=\"ewAction ewListAction\" title=\"" . ew_HtmlEncode($caption) . "\" data-caption=\"" . ew_HtmlEncode($caption) . "\" href=\"\" onclick=\"ew_SubmitAction(event,jQuery.extend({f:document.fproductoespecificacioneslist}," . $listaction->ToJson(TRUE) . "));return false;\">" . $icon . "</a>";
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
		} else { // Grid add/edit mode

			// Hide all options first
			foreach ($options as &$option)
				$option->HideAllOptions();
			if ($this->CurrentAction == "gridadd") {
				if ($this->AllowAddDeleteRow) {

					// Add add blank row
					$option = &$options["addedit"];
					$option->UseDropDownButton = FALSE;
					$option->UseImageAndText = TRUE;
					$item = &$option->Add("addblankrow");
					$item->Body = "<a class=\"ewAddEdit ewAddBlankRow\" title=\"" . ew_HtmlTitle($Language->Phrase("AddBlankRow")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("AddBlankRow")) . "\" href=\"javascript:void(0);\" onclick=\"ew_AddGridRow(this);\">" . $Language->Phrase("AddBlankRow") . "</a>";
					$item->Visible = $Security->IsLoggedIn();
				}
				$option = &$options["action"];
				$option->UseDropDownButton = FALSE;
				$option->UseImageAndText = TRUE;

				// Add grid insert
				$item = &$option->Add("gridinsert");
				$item->Body = "<a class=\"ewAction ewGridInsert\" title=\"" . ew_HtmlTitle($Language->Phrase("GridInsertLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("GridInsertLink")) . "\" href=\"\" onclick=\"return ewForms(this).Submit('" . $this->PageName() . "');\">" . $Language->Phrase("GridInsertLink") . "</a>";

				// Add grid cancel
				$item = &$option->Add("gridcancel");
				$cancelurl = $this->AddMasterUrl($this->PageUrl() . "a=cancel");
				$item->Body = "<a class=\"ewAction ewGridCancel\" title=\"" . ew_HtmlTitle($Language->Phrase("GridCancelLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("GridCancelLink")) . "\" href=\"" . $cancelurl . "\">" . $Language->Phrase("GridCancelLink") . "</a>";
			}
			if ($this->CurrentAction == "gridedit") {
				if ($this->AllowAddDeleteRow) {

					// Add add blank row
					$option = &$options["addedit"];
					$option->UseDropDownButton = FALSE;
					$option->UseImageAndText = TRUE;
					$item = &$option->Add("addblankrow");
					$item->Body = "<a class=\"ewAddEdit ewAddBlankRow\" title=\"" . ew_HtmlTitle($Language->Phrase("AddBlankRow")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("AddBlankRow")) . "\" href=\"javascript:void(0);\" onclick=\"ew_AddGridRow(this);\">" . $Language->Phrase("AddBlankRow") . "</a>";
					$item->Visible = $Security->IsLoggedIn();
				}
				$option = &$options["action"];
				$option->UseDropDownButton = FALSE;
				$option->UseImageAndText = TRUE;
					$item = &$option->Add("gridsave");
					$item->Body = "<a class=\"ewAction ewGridSave\" title=\"" . ew_HtmlTitle($Language->Phrase("GridSaveLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("GridSaveLink")) . "\" href=\"\" onclick=\"return ewForms(this).Submit('" . $this->PageName() . "');\">" . $Language->Phrase("GridSaveLink") . "</a>";
					$item = &$option->Add("gridcancel");
					$cancelurl = $this->AddMasterUrl($this->PageUrl() . "a=cancel");
					$item->Body = "<a class=\"ewAction ewGridCancel\" title=\"" . ew_HtmlTitle($Language->Phrase("GridCancelLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("GridCancelLink")) . "\" href=\"" . $cancelurl . "\">" . $Language->Phrase("GridCancelLink") . "</a>";
			}
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
		$this->orden->OldValue = $this->orden->CurrentValue;
		$this->id_copy->CurrentValue = NULL;
		$this->id_copy->OldValue = $this->id_copy->CurrentValue;
		$this->activo->CurrentValue = 1;
		$this->activo->OldValue = $this->activo->CurrentValue;
	}

	// Load form values
	function LoadFormValues() {

		// Load from form
		global $objForm;
		if (!$this->id->FldIsDetailKey && $this->CurrentAction <> "gridadd" && $this->CurrentAction <> "add")
			$this->id->setFormValue($objForm->GetValue("x_id"));
		if (!$this->categoria->FldIsDetailKey) {
			$this->categoria->setFormValue($objForm->GetValue("x_categoria"));
		}
		$this->categoria->setOldValue($objForm->GetValue("o_categoria"));
		if (!$this->especificaciones->FldIsDetailKey) {
			$this->especificaciones->setFormValue($objForm->GetValue("x_especificaciones"));
		}
		$this->especificaciones->setOldValue($objForm->GetValue("o_especificaciones"));
		if (!$this->orden->FldIsDetailKey) {
			$this->orden->setFormValue($objForm->GetValue("x_orden"));
		}
		$this->orden->setOldValue($objForm->GetValue("o_orden"));
		if (!$this->id_copy->FldIsDetailKey) {
			$this->id_copy->setFormValue($objForm->GetValue("x_id_copy"));
		}
		$this->id_copy->setOldValue($objForm->GetValue("o_id_copy"));
		if (!$this->activo->FldIsDetailKey) {
			$this->activo->setFormValue($objForm->GetValue("x_activo"));
		}
		$this->activo->setOldValue($objForm->GetValue("o_activo"));
	}

	// Restore form values
	function RestoreFormValues() {
		global $objForm;
		if ($this->CurrentAction <> "gridadd" && $this->CurrentAction <> "add")
			$this->id->CurrentValue = $this->id->FormValue;
		$this->categoria->CurrentValue = $this->categoria->FormValue;
		$this->especificaciones->CurrentValue = $this->especificaciones->FormValue;
		$this->orden->CurrentValue = $this->orden->FormValue;
		$this->id_copy->CurrentValue = $this->id_copy->FormValue;
		$this->activo->CurrentValue = $this->activo->FormValue;
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
		$this->ViewUrl = $this->GetViewUrl();
		$this->EditUrl = $this->GetEditUrl();
		$this->InlineEditUrl = $this->GetInlineEditUrl();
		$this->CopyUrl = $this->GetCopyUrl();
		$this->InlineCopyUrl = $this->GetInlineCopyUrl();
		$this->DeleteUrl = $this->GetDeleteUrl();

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

		// id
		$this->id->ViewValue = $this->id->CurrentValue;
		$this->id->ViewCustomAttributes = "";

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

			// id
			$this->id->LinkCustomAttributes = "";
			$this->id->HrefValue = "";
			$this->id->TooltipValue = "";

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

			// id
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
			if (strval($this->id_copy->EditValue) <> "" && is_numeric($this->id_copy->EditValue)) {
			$this->id_copy->EditValue = ew_FormatNumber($this->id_copy->EditValue, -2, -1, -2, 0);
			$this->id_copy->OldValue = $this->id_copy->EditValue;
			}

			// activo
			$this->activo->EditAttrs["class"] = "form-control";
			$this->activo->EditCustomAttributes = "";
			$this->activo->EditValue = $this->activo->Options(TRUE);

			// Add refer script
			// id

			$this->id->LinkCustomAttributes = "";
			$this->id->HrefValue = "";

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
		} elseif ($this->RowType == EW_ROWTYPE_EDIT) { // Edit row

			// id
			$this->id->EditAttrs["class"] = "form-control";
			$this->id->EditCustomAttributes = "";
			$this->id->EditValue = $this->id->CurrentValue;
			$this->id->ViewCustomAttributes = "";

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
			if (strval($this->id_copy->EditValue) <> "" && is_numeric($this->id_copy->EditValue)) {
			$this->id_copy->EditValue = ew_FormatNumber($this->id_copy->EditValue, -2, -1, -2, 0);
			$this->id_copy->OldValue = $this->id_copy->EditValue;
			}

			// activo
			$this->activo->EditAttrs["class"] = "form-control";
			$this->activo->EditCustomAttributes = "";
			$this->activo->EditValue = $this->activo->Options(TRUE);

			// Edit refer script
			// id

			$this->id->LinkCustomAttributes = "";
			$this->id->HrefValue = "";

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
		} else {
		}

		// Call Row Deleted event
		if ($DeleteRows) {
			foreach ($rsold as $row) {
				$this->Row_Deleted($row);
			}
		}
		return $DeleteRows;
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

			// Save old values
			$rsold = &$rs->fields;
			$this->LoadDbValues($rsold);
			$rsnew = array();

			// categoria
			$this->categoria->SetDbValueDef($rsnew, $this->categoria->CurrentValue, "", $this->categoria->ReadOnly);

			// especificaciones
			$this->especificaciones->SetDbValueDef($rsnew, $this->especificaciones->CurrentValue, "", $this->especificaciones->ReadOnly);

			// orden
			$this->orden->SetDbValueDef($rsnew, $this->orden->CurrentValue, 0, $this->orden->ReadOnly);

			// id copy
			$this->id_copy->SetDbValueDef($rsnew, $this->id_copy->CurrentValue, NULL, $this->id_copy->ReadOnly);

			// activo
			$this->activo->SetDbValueDef($rsnew, $this->activo->CurrentValue, 0, $this->activo->ReadOnly);

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
		return $EditRow;
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

		// producto_id
		if ($this->producto_id->getSessionValue() <> "") {
			$rsnew['producto_id'] = $this->producto_id->getSessionValue();
		}

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

			// Update URL
			$this->AddUrl = $this->AddMasterUrl($this->AddUrl);
			$this->InlineAddUrl = $this->AddMasterUrl($this->InlineAddUrl);
			$this->GridAddUrl = $this->AddMasterUrl($this->GridAddUrl);
			$this->GridEditUrl = $this->AddMasterUrl($this->GridEditUrl);

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
if (!isset($productoespecificaciones_list)) $productoespecificaciones_list = new cproductoespecificaciones_list();

// Page init
$productoespecificaciones_list->Page_Init();

// Page main
$productoespecificaciones_list->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$productoespecificaciones_list->Page_Render();
?>
<?php include_once "header.php" ?>
<script type="text/javascript">

// Form object
var CurrentPageID = EW_PAGE_ID = "list";
var CurrentForm = fproductoespecificacioneslist = new ew_Form("fproductoespecificacioneslist", "list");
fproductoespecificacioneslist.FormKeyCountName = '<?php echo $productoespecificaciones_list->FormKeyCountName ?>';

// Validate form
fproductoespecificacioneslist.Validate = function() {
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
		var checkrow = (gridinsert) ? !this.EmptyRow(infix) : true;
		if (checkrow) {
			addcnt++;
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
		} // End Grid Add checking
	}
	if (gridinsert && addcnt == 0) { // No row added
		ew_Alert(ewLanguage.Phrase("NoAddRecord"));
		return false;
	}
	return true;
}

// Check empty row
fproductoespecificacioneslist.EmptyRow = function(infix) {
	var fobj = this.Form;
	if (ew_ValueChanged(fobj, infix, "categoria", false)) return false;
	if (ew_ValueChanged(fobj, infix, "especificaciones", false)) return false;
	if (ew_ValueChanged(fobj, infix, "orden", false)) return false;
	if (ew_ValueChanged(fobj, infix, "id_copy", false)) return false;
	if (ew_ValueChanged(fobj, infix, "activo", false)) return false;
	return true;
}

// Form_CustomValidate event
fproductoespecificacioneslist.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fproductoespecificacioneslist.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
fproductoespecificacioneslist.Lists["x_activo"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductoespecificacioneslist.Lists["x_activo"].Options = <?php echo json_encode($productoespecificaciones_list->activo->Options()) ?>;

// Form object for search
</script>
<script type="text/javascript">

// Write your client script here, no need to add script tags.
</script>
<div class="ewToolbar">
<?php if ($productoespecificaciones_list->TotalRecs > 0 && $productoespecificaciones_list->ExportOptions->Visible()) { ?>
<?php $productoespecificaciones_list->ExportOptions->Render("body") ?>
<?php } ?>
<div class="clearfix"></div>
</div>
<?php if (($productoespecificaciones->Export == "") || (EW_EXPORT_MASTER_RECORD && $productoespecificaciones->Export == "print")) { ?>
<?php
if ($productoespecificaciones_list->DbMasterFilter <> "" && $productoespecificaciones->getCurrentMasterTable() == "productos") {
	if ($productoespecificaciones_list->MasterRecordExists) {
?>
<?php include_once "productosmaster.php" ?>
<?php
	}
}
?>
<?php } ?>
<?php
if ($productoespecificaciones->CurrentAction == "gridadd") {
	$productoespecificaciones->CurrentFilter = "0=1";
	$productoespecificaciones_list->StartRec = 1;
	$productoespecificaciones_list->DisplayRecs = $productoespecificaciones->GridAddRowCount;
	$productoespecificaciones_list->TotalRecs = $productoespecificaciones_list->DisplayRecs;
	$productoespecificaciones_list->StopRec = $productoespecificaciones_list->DisplayRecs;
} else {
	$bSelectLimit = $productoespecificaciones_list->UseSelectLimit;
	if ($bSelectLimit) {
		if ($productoespecificaciones_list->TotalRecs <= 0)
			$productoespecificaciones_list->TotalRecs = $productoespecificaciones->ListRecordCount();
	} else {
		if (!$productoespecificaciones_list->Recordset && ($productoespecificaciones_list->Recordset = $productoespecificaciones_list->LoadRecordset()))
			$productoespecificaciones_list->TotalRecs = $productoespecificaciones_list->Recordset->RecordCount();
	}
	$productoespecificaciones_list->StartRec = 1;
	if ($productoespecificaciones_list->DisplayRecs <= 0 || ($productoespecificaciones->Export <> "" && $productoespecificaciones->ExportAll)) // Display all records
		$productoespecificaciones_list->DisplayRecs = $productoespecificaciones_list->TotalRecs;
	if (!($productoespecificaciones->Export <> "" && $productoespecificaciones->ExportAll))
		$productoespecificaciones_list->SetupStartRec(); // Set up start record position
	if ($bSelectLimit)
		$productoespecificaciones_list->Recordset = $productoespecificaciones_list->LoadRecordset($productoespecificaciones_list->StartRec-1, $productoespecificaciones_list->DisplayRecs);

	// Set no record found message
	if ($productoespecificaciones->CurrentAction == "" && $productoespecificaciones_list->TotalRecs == 0) {
		if ($productoespecificaciones_list->SearchWhere == "0=101")
			$productoespecificaciones_list->setWarningMessage($Language->Phrase("EnterSearchCriteria"));
		else
			$productoespecificaciones_list->setWarningMessage($Language->Phrase("NoRecord"));
	}
}
$productoespecificaciones_list->RenderOtherOptions();
?>
<?php $productoespecificaciones_list->ShowPageHeader(); ?>
<?php
$productoespecificaciones_list->ShowMessage();
?>
<?php if ($productoespecificaciones_list->TotalRecs > 0 || $productoespecificaciones->CurrentAction <> "") { ?>
<div class="box ewBox ewGrid<?php if ($productoespecificaciones_list->IsAddOrEdit()) { ?> ewGridAddEdit<?php } ?> productoespecificaciones">
<div class="box-header ewGridUpperPanel">
<?php if ($productoespecificaciones->CurrentAction <> "gridadd" && $productoespecificaciones->CurrentAction <> "gridedit") { ?>
<form name="ewPagerForm" class="form-inline ewForm ewPagerForm" action="<?php echo ew_CurrentPage() ?>">
<?php if (!isset($productoespecificaciones_list->Pager)) $productoespecificaciones_list->Pager = new cPrevNextPager($productoespecificaciones_list->StartRec, $productoespecificaciones_list->DisplayRecs, $productoespecificaciones_list->TotalRecs, $productoespecificaciones_list->AutoHidePager) ?>
<?php if ($productoespecificaciones_list->Pager->RecordCount > 0 && $productoespecificaciones_list->Pager->Visible) { ?>
<div class="ewPager">
<span><?php echo $Language->Phrase("Page") ?>&nbsp;</span>
<div class="ewPrevNext"><div class="input-group">
<div class="input-group-btn">
<!--first page button-->
	<?php if ($productoespecificaciones_list->Pager->FirstButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerFirst") ?>" href="<?php echo $productoespecificaciones_list->PageUrl() ?>start=<?php echo $productoespecificaciones_list->Pager->FirstButton->Start ?>"><span class="icon-first ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerFirst") ?>"><span class="icon-first ewIcon"></span></a>
	<?php } ?>
<!--previous page button-->
	<?php if ($productoespecificaciones_list->Pager->PrevButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerPrevious") ?>" href="<?php echo $productoespecificaciones_list->PageUrl() ?>start=<?php echo $productoespecificaciones_list->Pager->PrevButton->Start ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerPrevious") ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } ?>
</div>
<!--current page number-->
	<input class="form-control input-sm" type="text" name="<?php echo EW_TABLE_PAGE_NO ?>" value="<?php echo $productoespecificaciones_list->Pager->CurrentPage ?>">
<div class="input-group-btn">
<!--next page button-->
	<?php if ($productoespecificaciones_list->Pager->NextButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerNext") ?>" href="<?php echo $productoespecificaciones_list->PageUrl() ?>start=<?php echo $productoespecificaciones_list->Pager->NextButton->Start ?>"><span class="icon-next ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerNext") ?>"><span class="icon-next ewIcon"></span></a>
	<?php } ?>
<!--last page button-->
	<?php if ($productoespecificaciones_list->Pager->LastButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerLast") ?>" href="<?php echo $productoespecificaciones_list->PageUrl() ?>start=<?php echo $productoespecificaciones_list->Pager->LastButton->Start ?>"><span class="icon-last ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerLast") ?>"><span class="icon-last ewIcon"></span></a>
	<?php } ?>
</div>
</div>
</div>
<span>&nbsp;<?php echo $Language->Phrase("of") ?>&nbsp;<?php echo $productoespecificaciones_list->Pager->PageCount ?></span>
</div>
<div class="ewPager ewRec">
	<span><?php echo $Language->Phrase("Record") ?>&nbsp;<?php echo $productoespecificaciones_list->Pager->FromIndex ?>&nbsp;<?php echo $Language->Phrase("To") ?>&nbsp;<?php echo $productoespecificaciones_list->Pager->ToIndex ?>&nbsp;<?php echo $Language->Phrase("Of") ?>&nbsp;<?php echo $productoespecificaciones_list->Pager->RecordCount ?></span>
</div>
<?php } ?>
</form>
<?php } ?>
<div class="ewListOtherOptions">
<?php
	foreach ($productoespecificaciones_list->OtherOptions as &$option)
		$option->Render("body");
?>
</div>
<div class="clearfix"></div>
</div>
<form name="fproductoespecificacioneslist" id="fproductoespecificacioneslist" class="form-inline ewForm ewListForm" action="<?php echo ew_CurrentPage() ?>" method="post">
<?php if ($productoespecificaciones_list->CheckToken) { ?>
<input type="hidden" name="<?php echo EW_TOKEN_NAME ?>" value="<?php echo $productoespecificaciones_list->Token ?>">
<?php } ?>
<input type="hidden" name="t" value="productoespecificaciones">
<?php if ($productoespecificaciones->getCurrentMasterTable() == "productos" && $productoespecificaciones->CurrentAction <> "") { ?>
<input type="hidden" name="<?php echo EW_TABLE_SHOW_MASTER ?>" value="productos">
<input type="hidden" name="fk_id" value="<?php echo $productoespecificaciones->producto_id->getSessionValue() ?>">
<?php } ?>
<div id="gmp_productoespecificaciones" class="<?php if (ew_IsResponsiveLayout()) { ?>table-responsive <?php } ?>ewGridMiddlePanel">
<?php if ($productoespecificaciones_list->TotalRecs > 0 || $productoespecificaciones->CurrentAction == "gridedit") { ?>
<table id="tbl_productoespecificacioneslist" class="table ewTable">
<thead>
	<tr class="ewTableHeader">
<?php

// Header row
$productoespecificaciones_list->RowType = EW_ROWTYPE_HEADER;

// Render list options
$productoespecificaciones_list->RenderListOptions();

// Render list options (header, left)
$productoespecificaciones_list->ListOptions->Render("header", "left");
?>
<?php if ($productoespecificaciones->id->Visible) { // id ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->id) == "") { ?>
		<th data-name="id" class="<?php echo $productoespecificaciones->id->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_id" class="productoespecificaciones_id"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->id->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="id" class="<?php echo $productoespecificaciones->id->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productoespecificaciones->SortUrl($productoespecificaciones->id) ?>',2);"><div id="elh_productoespecificaciones_id" class="productoespecificaciones_id">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->id->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->id->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->id->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoespecificaciones->categoria->Visible) { // categoria ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->categoria) == "") { ?>
		<th data-name="categoria" class="<?php echo $productoespecificaciones->categoria->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_categoria" class="productoespecificaciones_categoria"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->categoria->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="categoria" class="<?php echo $productoespecificaciones->categoria->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productoespecificaciones->SortUrl($productoespecificaciones->categoria) ?>',2);"><div id="elh_productoespecificaciones_categoria" class="productoespecificaciones_categoria">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->categoria->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->categoria->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->categoria->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoespecificaciones->especificaciones->Visible) { // especificaciones ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->especificaciones) == "") { ?>
		<th data-name="especificaciones" class="<?php echo $productoespecificaciones->especificaciones->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_especificaciones" class="productoespecificaciones_especificaciones"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->especificaciones->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="especificaciones" class="<?php echo $productoespecificaciones->especificaciones->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productoespecificaciones->SortUrl($productoespecificaciones->especificaciones) ?>',2);"><div id="elh_productoespecificaciones_especificaciones" class="productoespecificaciones_especificaciones">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->especificaciones->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->especificaciones->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->especificaciones->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoespecificaciones->orden->Visible) { // orden ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->orden) == "") { ?>
		<th data-name="orden" class="<?php echo $productoespecificaciones->orden->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_orden" class="productoespecificaciones_orden"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->orden->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="orden" class="<?php echo $productoespecificaciones->orden->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productoespecificaciones->SortUrl($productoespecificaciones->orden) ?>',2);"><div id="elh_productoespecificaciones_orden" class="productoespecificaciones_orden">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->orden->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->orden->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->orden->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoespecificaciones->id_copy->Visible) { // id copy ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->id_copy) == "") { ?>
		<th data-name="id_copy" class="<?php echo $productoespecificaciones->id_copy->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_id_copy" class="productoespecificaciones_id_copy"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->id_copy->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="id_copy" class="<?php echo $productoespecificaciones->id_copy->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productoespecificaciones->SortUrl($productoespecificaciones->id_copy) ?>',2);"><div id="elh_productoespecificaciones_id_copy" class="productoespecificaciones_id_copy">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->id_copy->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->id_copy->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->id_copy->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoespecificaciones->activo->Visible) { // activo ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->activo) == "") { ?>
		<th data-name="activo" class="<?php echo $productoespecificaciones->activo->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_activo" class="productoespecificaciones_activo"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->activo->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="activo" class="<?php echo $productoespecificaciones->activo->HeaderCellClass() ?>"><div class="ewPointer" onclick="ew_Sort(event,'<?php echo $productoespecificaciones->SortUrl($productoespecificaciones->activo) ?>',2);"><div id="elh_productoespecificaciones_activo" class="productoespecificaciones_activo">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->activo->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->activo->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->activo->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php

// Render list options (header, right)
$productoespecificaciones_list->ListOptions->Render("header", "right");
?>
	</tr>
</thead>
<tbody>
<?php
if ($productoespecificaciones->ExportAll && $productoespecificaciones->Export <> "") {
	$productoespecificaciones_list->StopRec = $productoespecificaciones_list->TotalRecs;
} else {

	// Set the last record to display
	if ($productoespecificaciones_list->TotalRecs > $productoespecificaciones_list->StartRec + $productoespecificaciones_list->DisplayRecs - 1)
		$productoespecificaciones_list->StopRec = $productoespecificaciones_list->StartRec + $productoespecificaciones_list->DisplayRecs - 1;
	else
		$productoespecificaciones_list->StopRec = $productoespecificaciones_list->TotalRecs;
}

// Restore number of post back records
if ($objForm) {
	$objForm->Index = -1;
	if ($objForm->HasValue($productoespecificaciones_list->FormKeyCountName) && ($productoespecificaciones->CurrentAction == "gridadd" || $productoespecificaciones->CurrentAction == "gridedit" || $productoespecificaciones->CurrentAction == "F")) {
		$productoespecificaciones_list->KeyCount = $objForm->GetValue($productoespecificaciones_list->FormKeyCountName);
		$productoespecificaciones_list->StopRec = $productoespecificaciones_list->StartRec + $productoespecificaciones_list->KeyCount - 1;
	}
}
$productoespecificaciones_list->RecCnt = $productoespecificaciones_list->StartRec - 1;
if ($productoespecificaciones_list->Recordset && !$productoespecificaciones_list->Recordset->EOF) {
	$productoespecificaciones_list->Recordset->MoveFirst();
	$bSelectLimit = $productoespecificaciones_list->UseSelectLimit;
	if (!$bSelectLimit && $productoespecificaciones_list->StartRec > 1)
		$productoespecificaciones_list->Recordset->Move($productoespecificaciones_list->StartRec - 1);
} elseif (!$productoespecificaciones->AllowAddDeleteRow && $productoespecificaciones_list->StopRec == 0) {
	$productoespecificaciones_list->StopRec = $productoespecificaciones->GridAddRowCount;
}

// Initialize aggregate
$productoespecificaciones->RowType = EW_ROWTYPE_AGGREGATEINIT;
$productoespecificaciones->ResetAttrs();
$productoespecificaciones_list->RenderRow();
if ($productoespecificaciones->CurrentAction == "gridadd")
	$productoespecificaciones_list->RowIndex = 0;
if ($productoespecificaciones->CurrentAction == "gridedit")
	$productoespecificaciones_list->RowIndex = 0;
while ($productoespecificaciones_list->RecCnt < $productoespecificaciones_list->StopRec) {
	$productoespecificaciones_list->RecCnt++;
	if (intval($productoespecificaciones_list->RecCnt) >= intval($productoespecificaciones_list->StartRec)) {
		$productoespecificaciones_list->RowCnt++;
		if ($productoespecificaciones->CurrentAction == "gridadd" || $productoespecificaciones->CurrentAction == "gridedit" || $productoespecificaciones->CurrentAction == "F") {
			$productoespecificaciones_list->RowIndex++;
			$objForm->Index = $productoespecificaciones_list->RowIndex;
			if ($objForm->HasValue($productoespecificaciones_list->FormActionName))
				$productoespecificaciones_list->RowAction = strval($objForm->GetValue($productoespecificaciones_list->FormActionName));
			elseif ($productoespecificaciones->CurrentAction == "gridadd")
				$productoespecificaciones_list->RowAction = "insert";
			else
				$productoespecificaciones_list->RowAction = "";
		}

		// Set up key count
		$productoespecificaciones_list->KeyCount = $productoespecificaciones_list->RowIndex;

		// Init row class and style
		$productoespecificaciones->ResetAttrs();
		$productoespecificaciones->CssClass = "";
		if ($productoespecificaciones->CurrentAction == "gridadd") {
			$productoespecificaciones_list->LoadRowValues(); // Load default values
		} else {
			$productoespecificaciones_list->LoadRowValues($productoespecificaciones_list->Recordset); // Load row values
		}
		$productoespecificaciones->RowType = EW_ROWTYPE_VIEW; // Render view
		if ($productoespecificaciones->CurrentAction == "gridadd") // Grid add
			$productoespecificaciones->RowType = EW_ROWTYPE_ADD; // Render add
		if ($productoespecificaciones->CurrentAction == "gridadd" && $productoespecificaciones->EventCancelled && !$objForm->HasValue("k_blankrow")) // Insert failed
			$productoespecificaciones_list->RestoreCurrentRowFormValues($productoespecificaciones_list->RowIndex); // Restore form values
		if ($productoespecificaciones->CurrentAction == "gridedit") { // Grid edit
			if ($productoespecificaciones->EventCancelled) {
				$productoespecificaciones_list->RestoreCurrentRowFormValues($productoespecificaciones_list->RowIndex); // Restore form values
			}
			if ($productoespecificaciones_list->RowAction == "insert")
				$productoespecificaciones->RowType = EW_ROWTYPE_ADD; // Render add
			else
				$productoespecificaciones->RowType = EW_ROWTYPE_EDIT; // Render edit
		}
		if ($productoespecificaciones->CurrentAction == "gridedit" && ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT || $productoespecificaciones->RowType == EW_ROWTYPE_ADD) && $productoespecificaciones->EventCancelled) // Update failed
			$productoespecificaciones_list->RestoreCurrentRowFormValues($productoespecificaciones_list->RowIndex); // Restore form values
		if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) // Edit row
			$productoespecificaciones_list->EditRowCnt++;

		// Set up row id / data-rowindex
		$productoespecificaciones->RowAttrs = array_merge($productoespecificaciones->RowAttrs, array('data-rowindex'=>$productoespecificaciones_list->RowCnt, 'id'=>'r' . $productoespecificaciones_list->RowCnt . '_productoespecificaciones', 'data-rowtype'=>$productoespecificaciones->RowType));

		// Render row
		$productoespecificaciones_list->RenderRow();

		// Render list options
		$productoespecificaciones_list->RenderListOptions();

		// Skip delete row / empty row for confirm page
		if ($productoespecificaciones_list->RowAction <> "delete" && $productoespecificaciones_list->RowAction <> "insertdelete" && !($productoespecificaciones_list->RowAction == "insert" && $productoespecificaciones->CurrentAction == "F" && $productoespecificaciones_list->EmptyRow())) {
?>
	<tr<?php echo $productoespecificaciones->RowAttributes() ?>>
<?php

// Render list options (body, left)
$productoespecificaciones_list->ListOptions->Render("body", "left", $productoespecificaciones_list->RowCnt);
?>
	<?php if ($productoespecificaciones->id->Visible) { // id ?>
		<td data-name="id"<?php echo $productoespecificaciones->id->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_id" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->id->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_id" class="form-group productoespecificaciones_id">
<span<?php echo $productoespecificaciones->id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoespecificaciones->id->EditValue ?></p></span>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_id" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->id->CurrentValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_id" class="productoespecificaciones_id">
<span<?php echo $productoespecificaciones->id->ViewAttributes() ?>>
<?php echo $productoespecificaciones->id->ListViewValue() ?></span>
</span>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->categoria->Visible) { // categoria ?>
		<td data-name="categoria"<?php echo $productoespecificaciones->categoria->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_categoria" class="form-group productoespecificaciones_categoria">
<input type="text" data-table="productoespecificaciones" data-field="x_categoria" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_categoria" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_categoria" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->categoria->EditValue ?>"<?php echo $productoespecificaciones->categoria->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_categoria" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_categoria" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_categoria" value="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_categoria" class="form-group productoespecificaciones_categoria">
<input type="text" data-table="productoespecificaciones" data-field="x_categoria" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_categoria" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_categoria" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->categoria->EditValue ?>"<?php echo $productoespecificaciones->categoria->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_categoria" class="productoespecificaciones_categoria">
<span<?php echo $productoespecificaciones->categoria->ViewAttributes() ?>>
<?php echo $productoespecificaciones->categoria->ListViewValue() ?></span>
</span>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->especificaciones->Visible) { // especificaciones ?>
		<td data-name="especificaciones"<?php echo $productoespecificaciones->especificaciones->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_especificaciones" class="form-group productoespecificaciones_especificaciones">
<input type="text" data-table="productoespecificaciones" data-field="x_especificaciones" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_especificaciones" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_especificaciones" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->especificaciones->EditValue ?>"<?php echo $productoespecificaciones->especificaciones->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_especificaciones" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_especificaciones" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_especificaciones" value="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_especificaciones" class="form-group productoespecificaciones_especificaciones">
<input type="text" data-table="productoespecificaciones" data-field="x_especificaciones" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_especificaciones" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_especificaciones" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->especificaciones->EditValue ?>"<?php echo $productoespecificaciones->especificaciones->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_especificaciones" class="productoespecificaciones_especificaciones">
<span<?php echo $productoespecificaciones->especificaciones->ViewAttributes() ?>>
<?php echo $productoespecificaciones->especificaciones->ListViewValue() ?></span>
</span>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->orden->Visible) { // orden ?>
		<td data-name="orden"<?php echo $productoespecificaciones->orden->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_orden" class="form-group productoespecificaciones_orden">
<input type="text" data-table="productoespecificaciones" data-field="x_orden" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_orden" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->orden->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->orden->EditValue ?>"<?php echo $productoespecificaciones->orden->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_orden" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_orden" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoespecificaciones->orden->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_orden" class="form-group productoespecificaciones_orden">
<input type="text" data-table="productoespecificaciones" data-field="x_orden" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_orden" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->orden->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->orden->EditValue ?>"<?php echo $productoespecificaciones->orden->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_orden" class="productoespecificaciones_orden">
<span<?php echo $productoespecificaciones->orden->ViewAttributes() ?>>
<?php echo $productoespecificaciones->orden->ListViewValue() ?></span>
</span>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->id_copy->Visible) { // id copy ?>
		<td data-name="id_copy"<?php echo $productoespecificaciones->id_copy->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_id_copy" class="form-group productoespecificaciones_id_copy">
<input type="text" data-table="productoespecificaciones" data-field="x_id_copy" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_id_copy" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_id_copy" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->id_copy->EditValue ?>"<?php echo $productoespecificaciones->id_copy->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id_copy" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_id_copy" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_id_copy" value="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_id_copy" class="form-group productoespecificaciones_id_copy">
<input type="text" data-table="productoespecificaciones" data-field="x_id_copy" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_id_copy" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_id_copy" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->id_copy->EditValue ?>"<?php echo $productoespecificaciones->id_copy->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_id_copy" class="productoespecificaciones_id_copy">
<span<?php echo $productoespecificaciones->id_copy->ViewAttributes() ?>>
<?php echo $productoespecificaciones->id_copy->ListViewValue() ?></span>
</span>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->activo->Visible) { // activo ?>
		<td data-name="activo"<?php echo $productoespecificaciones->activo->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_activo" class="form-group productoespecificaciones_activo">
<select data-table="productoespecificaciones" data-field="x_activo" data-value-separator="<?php echo $productoespecificaciones->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_activo" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_activo"<?php echo $productoespecificaciones->activo->EditAttributes() ?>>
<?php echo $productoespecificaciones->activo->SelectOptionListHtml("x<?php echo $productoespecificaciones_list->RowIndex ?>_activo") ?>
</select>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_activo" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_activo" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoespecificaciones->activo->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_activo" class="form-group productoespecificaciones_activo">
<select data-table="productoespecificaciones" data-field="x_activo" data-value-separator="<?php echo $productoespecificaciones->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_activo" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_activo"<?php echo $productoespecificaciones->activo->EditAttributes() ?>>
<?php echo $productoespecificaciones->activo->SelectOptionListHtml("x<?php echo $productoespecificaciones_list->RowIndex ?>_activo") ?>
</select>
</span>
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_list->RowCnt ?>_productoespecificaciones_activo" class="productoespecificaciones_activo">
<span<?php echo $productoespecificaciones->activo->ViewAttributes() ?>>
<?php echo $productoespecificaciones->activo->ListViewValue() ?></span>
</span>
<?php } ?>
</td>
	<?php } ?>
<?php

// Render list options (body, right)
$productoespecificaciones_list->ListOptions->Render("body", "right", $productoespecificaciones_list->RowCnt);
?>
	</tr>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD || $productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { ?>
<script type="text/javascript">
fproductoespecificacioneslist.UpdateOpts(<?php echo $productoespecificaciones_list->RowIndex ?>);
</script>
<?php } ?>
<?php
	}
	} // End delete row checking
	if ($productoespecificaciones->CurrentAction <> "gridadd")
		if (!$productoespecificaciones_list->Recordset->EOF) $productoespecificaciones_list->Recordset->MoveNext();
}
?>
<?php
	if ($productoespecificaciones->CurrentAction == "gridadd" || $productoespecificaciones->CurrentAction == "gridedit") {
		$productoespecificaciones_list->RowIndex = '$rowindex$';
		$productoespecificaciones_list->LoadRowValues();

		// Set row properties
		$productoespecificaciones->ResetAttrs();
		$productoespecificaciones->RowAttrs = array_merge($productoespecificaciones->RowAttrs, array('data-rowindex'=>$productoespecificaciones_list->RowIndex, 'id'=>'r0_productoespecificaciones', 'data-rowtype'=>EW_ROWTYPE_ADD));
		ew_AppendClass($productoespecificaciones->RowAttrs["class"], "ewTemplate");
		$productoespecificaciones->RowType = EW_ROWTYPE_ADD;

		// Render row
		$productoespecificaciones_list->RenderRow();

		// Render list options
		$productoespecificaciones_list->RenderListOptions();
		$productoespecificaciones_list->StartRowCnt = 0;
?>
	<tr<?php echo $productoespecificaciones->RowAttributes() ?>>
<?php

// Render list options (body, left)
$productoespecificaciones_list->ListOptions->Render("body", "left", $productoespecificaciones_list->RowIndex);
?>
	<?php if ($productoespecificaciones->id->Visible) { // id ?>
		<td data-name="id">
<input type="hidden" data-table="productoespecificaciones" data-field="x_id" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_id" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->id->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->categoria->Visible) { // categoria ?>
		<td data-name="categoria">
<span id="el$rowindex$_productoespecificaciones_categoria" class="form-group productoespecificaciones_categoria">
<input type="text" data-table="productoespecificaciones" data-field="x_categoria" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_categoria" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_categoria" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->categoria->EditValue ?>"<?php echo $productoespecificaciones->categoria->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_categoria" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_categoria" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_categoria" value="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->especificaciones->Visible) { // especificaciones ?>
		<td data-name="especificaciones">
<span id="el$rowindex$_productoespecificaciones_especificaciones" class="form-group productoespecificaciones_especificaciones">
<input type="text" data-table="productoespecificaciones" data-field="x_especificaciones" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_especificaciones" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_especificaciones" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->especificaciones->EditValue ?>"<?php echo $productoespecificaciones->especificaciones->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_especificaciones" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_especificaciones" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_especificaciones" value="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->orden->Visible) { // orden ?>
		<td data-name="orden">
<span id="el$rowindex$_productoespecificaciones_orden" class="form-group productoespecificaciones_orden">
<input type="text" data-table="productoespecificaciones" data-field="x_orden" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_orden" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->orden->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->orden->EditValue ?>"<?php echo $productoespecificaciones->orden->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_orden" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_orden" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoespecificaciones->orden->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->id_copy->Visible) { // id copy ?>
		<td data-name="id_copy">
<span id="el$rowindex$_productoespecificaciones_id_copy" class="form-group productoespecificaciones_id_copy">
<input type="text" data-table="productoespecificaciones" data-field="x_id_copy" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_id_copy" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_id_copy" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->id_copy->EditValue ?>"<?php echo $productoespecificaciones->id_copy->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id_copy" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_id_copy" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_id_copy" value="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->activo->Visible) { // activo ?>
		<td data-name="activo">
<span id="el$rowindex$_productoespecificaciones_activo" class="form-group productoespecificaciones_activo">
<select data-table="productoespecificaciones" data-field="x_activo" data-value-separator="<?php echo $productoespecificaciones->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productoespecificaciones_list->RowIndex ?>_activo" name="x<?php echo $productoespecificaciones_list->RowIndex ?>_activo"<?php echo $productoespecificaciones->activo->EditAttributes() ?>>
<?php echo $productoespecificaciones->activo->SelectOptionListHtml("x<?php echo $productoespecificaciones_list->RowIndex ?>_activo") ?>
</select>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_activo" name="o<?php echo $productoespecificaciones_list->RowIndex ?>_activo" id="o<?php echo $productoespecificaciones_list->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoespecificaciones->activo->OldValue) ?>">
</td>
	<?php } ?>
<?php

// Render list options (body, right)
$productoespecificaciones_list->ListOptions->Render("body", "right", $productoespecificaciones_list->RowCnt);
?>
<script type="text/javascript">
fproductoespecificacioneslist.UpdateOpts(<?php echo $productoespecificaciones_list->RowIndex ?>);
</script>
	</tr>
<?php
}
?>
</tbody>
</table>
<?php } ?>
<?php if ($productoespecificaciones->CurrentAction == "gridadd") { ?>
<input type="hidden" name="a_list" id="a_list" value="gridinsert">
<input type="hidden" name="<?php echo $productoespecificaciones_list->FormKeyCountName ?>" id="<?php echo $productoespecificaciones_list->FormKeyCountName ?>" value="<?php echo $productoespecificaciones_list->KeyCount ?>">
<?php echo $productoespecificaciones_list->MultiSelectKey ?>
<?php } ?>
<?php if ($productoespecificaciones->CurrentAction == "gridedit") { ?>
<input type="hidden" name="a_list" id="a_list" value="gridupdate">
<input type="hidden" name="<?php echo $productoespecificaciones_list->FormKeyCountName ?>" id="<?php echo $productoespecificaciones_list->FormKeyCountName ?>" value="<?php echo $productoespecificaciones_list->KeyCount ?>">
<?php echo $productoespecificaciones_list->MultiSelectKey ?>
<?php } ?>
<?php if ($productoespecificaciones->CurrentAction == "") { ?>
<input type="hidden" name="a_list" id="a_list" value="">
<?php } ?>
</div>
</form>
<?php

// Close recordset
if ($productoespecificaciones_list->Recordset)
	$productoespecificaciones_list->Recordset->Close();
?>
<div class="box-footer ewGridLowerPanel">
<?php if ($productoespecificaciones->CurrentAction <> "gridadd" && $productoespecificaciones->CurrentAction <> "gridedit") { ?>
<form name="ewPagerForm" class="ewForm form-inline ewPagerForm" action="<?php echo ew_CurrentPage() ?>">
<?php if (!isset($productoespecificaciones_list->Pager)) $productoespecificaciones_list->Pager = new cPrevNextPager($productoespecificaciones_list->StartRec, $productoespecificaciones_list->DisplayRecs, $productoespecificaciones_list->TotalRecs, $productoespecificaciones_list->AutoHidePager) ?>
<?php if ($productoespecificaciones_list->Pager->RecordCount > 0 && $productoespecificaciones_list->Pager->Visible) { ?>
<div class="ewPager">
<span><?php echo $Language->Phrase("Page") ?>&nbsp;</span>
<div class="ewPrevNext"><div class="input-group">
<div class="input-group-btn">
<!--first page button-->
	<?php if ($productoespecificaciones_list->Pager->FirstButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerFirst") ?>" href="<?php echo $productoespecificaciones_list->PageUrl() ?>start=<?php echo $productoespecificaciones_list->Pager->FirstButton->Start ?>"><span class="icon-first ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerFirst") ?>"><span class="icon-first ewIcon"></span></a>
	<?php } ?>
<!--previous page button-->
	<?php if ($productoespecificaciones_list->Pager->PrevButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerPrevious") ?>" href="<?php echo $productoespecificaciones_list->PageUrl() ?>start=<?php echo $productoespecificaciones_list->Pager->PrevButton->Start ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerPrevious") ?>"><span class="icon-prev ewIcon"></span></a>
	<?php } ?>
</div>
<!--current page number-->
	<input class="form-control input-sm" type="text" name="<?php echo EW_TABLE_PAGE_NO ?>" value="<?php echo $productoespecificaciones_list->Pager->CurrentPage ?>">
<div class="input-group-btn">
<!--next page button-->
	<?php if ($productoespecificaciones_list->Pager->NextButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerNext") ?>" href="<?php echo $productoespecificaciones_list->PageUrl() ?>start=<?php echo $productoespecificaciones_list->Pager->NextButton->Start ?>"><span class="icon-next ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerNext") ?>"><span class="icon-next ewIcon"></span></a>
	<?php } ?>
<!--last page button-->
	<?php if ($productoespecificaciones_list->Pager->LastButton->Enabled) { ?>
	<a class="btn btn-default btn-sm" title="<?php echo $Language->Phrase("PagerLast") ?>" href="<?php echo $productoespecificaciones_list->PageUrl() ?>start=<?php echo $productoespecificaciones_list->Pager->LastButton->Start ?>"><span class="icon-last ewIcon"></span></a>
	<?php } else { ?>
	<a class="btn btn-default btn-sm disabled" title="<?php echo $Language->Phrase("PagerLast") ?>"><span class="icon-last ewIcon"></span></a>
	<?php } ?>
</div>
</div>
</div>
<span>&nbsp;<?php echo $Language->Phrase("of") ?>&nbsp;<?php echo $productoespecificaciones_list->Pager->PageCount ?></span>
</div>
<div class="ewPager ewRec">
	<span><?php echo $Language->Phrase("Record") ?>&nbsp;<?php echo $productoespecificaciones_list->Pager->FromIndex ?>&nbsp;<?php echo $Language->Phrase("To") ?>&nbsp;<?php echo $productoespecificaciones_list->Pager->ToIndex ?>&nbsp;<?php echo $Language->Phrase("Of") ?>&nbsp;<?php echo $productoespecificaciones_list->Pager->RecordCount ?></span>
</div>
<?php } ?>
</form>
<?php } ?>
<div class="ewListOtherOptions">
<?php
	foreach ($productoespecificaciones_list->OtherOptions as &$option)
		$option->Render("body", "bottom");
?>
</div>
<div class="clearfix"></div>
</div>
</div>
<?php } ?>
<?php if ($productoespecificaciones_list->TotalRecs == 0 && $productoespecificaciones->CurrentAction == "") { // Show other options ?>
<div class="ewListOtherOptions">
<?php
	foreach ($productoespecificaciones_list->OtherOptions as &$option) {
		$option->ButtonClass = "";
		$option->Render("body", "");
	}
?>
</div>
<div class="clearfix"></div>
<?php } ?>
<script type="text/javascript">
fproductoespecificacioneslist.Init();
</script>
<?php
$productoespecificaciones_list->ShowPageFooter();
if (EW_DEBUG_ENABLED)
	echo ew_DebugMsg();
?>
<script type="text/javascript">

// Write your table-specific startup script here
// document.write("page loaded");

</script>
<?php include_once "footer.php" ?>
<?php
$productoespecificaciones_list->Page_Terminate();
?>
