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

$productos_view = NULL; // Initialize page object first

class cproductos_view extends cproductos {

	// Page ID
	var $PageID = 'view';

	// Project ID
	var $ProjectID = '{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}';

	// Table name
	var $TableName = 'productos';

	// Page object name
	var $PageObjName = 'productos_view';

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
		$KeyUrl = "";
		if (@$_GET["id"] <> "") {
			$this->RecKey["id"] = $_GET["id"];
			$KeyUrl .= "&amp;id=" . urlencode($this->RecKey["id"]);
		}
		$this->ExportPrintUrl = $this->PageUrl() . "export=print" . $KeyUrl;
		$this->ExportHtmlUrl = $this->PageUrl() . "export=html" . $KeyUrl;
		$this->ExportExcelUrl = $this->PageUrl() . "export=excel" . $KeyUrl;
		$this->ExportWordUrl = $this->PageUrl() . "export=word" . $KeyUrl;
		$this->ExportXmlUrl = $this->PageUrl() . "export=xml" . $KeyUrl;
		$this->ExportCsvUrl = $this->PageUrl() . "export=csv" . $KeyUrl;
		$this->ExportPdfUrl = $this->PageUrl() . "export=pdf" . $KeyUrl;

		// Page ID
		if (!defined("EW_PAGE_ID"))
			define("EW_PAGE_ID", 'view', TRUE);

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

		// Export options
		$this->ExportOptions = new cListOptions();
		$this->ExportOptions->Tag = "div";
		$this->ExportOptions->TagClassName = "ewExportOption";

		// Other options
		$this->OtherOptions['action'] = new cListOptions();
		$this->OtherOptions['action']->Tag = "div";
		$this->OtherOptions['action']->TagClassName = "ewActionOption";
		$this->OtherOptions['detail'] = new cListOptions();
		$this->OtherOptions['detail']->Tag = "div";
		$this->OtherOptions['detail']->TagClassName = "ewDetailOption";
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
		if (!$Security->CanView()) {
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
	var $ExportOptions; // Export options
	var $OtherOptions = array(); // Other options
	var $DisplayRecs = 1;
	var $DbMasterFilter;
	var $DbDetailFilter;
	var $StartRec;
	var $StopRec;
	var $TotalRecs = 0;
	var $RecRange = 10;
	var $RecCnt;
	var $RecKey = array();
	var $IsModal = FALSE;
	var $productoespecificaciones_Count;
	var $productofotos_Count;
	var $productoversiones_Count;
	var $Recordset;

	//
	// Page main
	//
	function Page_Main() {
		global $Language, $gbSkipHeaderFooter, $EW_EXPORT;

		// Check modal
		if ($this->IsModal)
			$gbSkipHeaderFooter = TRUE;
		$sReturnUrl = "";
		$bMatchRecord = FALSE;
		if ($this->IsPageRequest()) { // Validate request
			if (@$_GET["id"] <> "") {
				$this->id->setQueryStringValue($_GET["id"]);
				$this->RecKey["id"] = $this->id->QueryStringValue;
			} elseif (@$_POST["id"] <> "") {
				$this->id->setFormValue($_POST["id"]);
				$this->RecKey["id"] = $this->id->FormValue;
			} else {
				$sReturnUrl = "productoslist.php"; // Return to list
			}

			// Get action
			$this->CurrentAction = "I"; // Display form
			switch ($this->CurrentAction) {
				case "I": // Get a record to display
					if (!$this->LoadRow()) { // Load record based on key
						if ($this->getSuccessMessage() == "" && $this->getFailureMessage() == "")
							$this->setFailureMessage($Language->Phrase("NoRecord")); // Set no record message
						$sReturnUrl = "productoslist.php"; // No matching record, return to list
					}
			}
		} else {
			$sReturnUrl = "productoslist.php"; // Not page request, return to list
		}
		if ($sReturnUrl <> "")
			$this->Page_Terminate($sReturnUrl);

		// Set up Breadcrumb
		if ($this->Export == "")
			$this->SetupBreadcrumb();

		// Render row
		$this->RowType = EW_ROWTYPE_VIEW;
		$this->ResetAttrs();
		$this->RenderRow();

		// Set up detail parameters
		$this->SetupDetailParms();
	}

	// Set up other options
	function SetupOtherOptions() {
		global $Language, $Security;
		$options = &$this->OtherOptions;
		$option = &$options["action"];

		// Add
		$item = &$option->Add("add");
		$addcaption = ew_HtmlTitle($Language->Phrase("ViewPageAddLink"));
		if ($this->IsModal) // Modal
			$item->Body = "<a class=\"ewAction ewAdd\" title=\"" . $addcaption . "\" data-caption=\"" . $addcaption . "\" href=\"javascript:void(0);\" onclick=\"ew_ModalDialogShow({lnk:this,url:'" . ew_HtmlEncode($this->AddUrl) . "'});\">" . $Language->Phrase("ViewPageAddLink") . "</a>";
		else
			$item->Body = "<a class=\"ewAction ewAdd\" title=\"" . $addcaption . "\" data-caption=\"" . $addcaption . "\" href=\"" . ew_HtmlEncode($this->AddUrl) . "\">" . $Language->Phrase("ViewPageAddLink") . "</a>";
		$item->Visible = ($this->AddUrl <> "" && $Security->IsLoggedIn());

		// Edit
		$item = &$option->Add("edit");
		$editcaption = ew_HtmlTitle($Language->Phrase("ViewPageEditLink"));
		if ($this->IsModal) // Modal
			$item->Body = "<a class=\"ewAction ewEdit\" title=\"" . $editcaption . "\" data-caption=\"" . $editcaption . "\" href=\"javascript:void(0);\" onclick=\"ew_ModalDialogShow({lnk:this,url:'" . ew_HtmlEncode($this->EditUrl) . "'});\">" . $Language->Phrase("ViewPageEditLink") . "</a>";
		else
			$item->Body = "<a class=\"ewAction ewEdit\" title=\"" . $editcaption . "\" data-caption=\"" . $editcaption . "\" href=\"" . ew_HtmlEncode($this->EditUrl) . "\">" . $Language->Phrase("ViewPageEditLink") . "</a>";
		$item->Visible = ($this->EditUrl <> "" && $Security->IsLoggedIn());

		// Delete
		$item = &$option->Add("delete");
		if ($this->IsModal) // Handle as inline delete
			$item->Body = "<a onclick=\"return ew_ConfirmDelete(this);\" class=\"ewAction ewDelete\" title=\"" . ew_HtmlTitle($Language->Phrase("ViewPageDeleteLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("ViewPageDeleteLink")) . "\" href=\"" . ew_HtmlEncode(ew_UrlAddQuery($this->DeleteUrl, "a_delete=1")) . "\">" . $Language->Phrase("ViewPageDeleteLink") . "</a>";
		else
			$item->Body = "<a class=\"ewAction ewDelete\" title=\"" . ew_HtmlTitle($Language->Phrase("ViewPageDeleteLink")) . "\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("ViewPageDeleteLink")) . "\" href=\"" . ew_HtmlEncode($this->DeleteUrl) . "\">" . $Language->Phrase("ViewPageDeleteLink") . "</a>";
		$item->Visible = ($this->DeleteUrl <> "" && $Security->IsLoggedIn());
		$option = &$options["detail"];
		$DetailTableLink = "";
		$DetailViewTblVar = "";
		$DetailCopyTblVar = "";
		$DetailEditTblVar = "";

		// "detail_productoespecificaciones"
		$item = &$option->Add("detail_productoespecificaciones");
		$body = $Language->Phrase("ViewPageDetailLink") . $Language->TablePhrase("productoespecificaciones", "TblCaption");
		$body .= str_replace("%c", $this->productoespecificaciones_Count, $Language->Phrase("DetailCount"));
		$body = "<a class=\"btn btn-default btn-sm ewRowLink ewDetail\" data-action=\"list\" href=\"" . ew_HtmlEncode("productoespecificacioneslist.php?" . EW_TABLE_SHOW_MASTER . "=productos&fk_id=" . urlencode(strval($this->id->CurrentValue)) . "") . "\">" . $body . "</a>";
		$links = "";
		if ($GLOBALS["productoespecificaciones_grid"] && $GLOBALS["productoespecificaciones_grid"]->DetailView && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
			$links .= "<li><a class=\"ewRowLink ewDetailView\" data-action=\"view\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("MasterDetailViewLink")) . "\" href=\"" . ew_HtmlEncode($this->GetViewUrl(EW_TABLE_SHOW_DETAIL . "=productoespecificaciones")) . "\">" . ew_HtmlImageAndText($Language->Phrase("MasterDetailViewLink")) . "</a></li>";
			if ($DetailViewTblVar <> "") $DetailViewTblVar .= ",";
			$DetailViewTblVar .= "productoespecificaciones";
		}
		if ($GLOBALS["productoespecificaciones_grid"] && $GLOBALS["productoespecificaciones_grid"]->DetailEdit && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
			$links .= "<li><a class=\"ewRowLink ewDetailEdit\" data-action=\"edit\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("MasterDetailEditLink")) . "\" href=\"" . ew_HtmlEncode($this->GetEditUrl(EW_TABLE_SHOW_DETAIL . "=productoespecificaciones")) . "\">" . ew_HtmlImageAndText($Language->Phrase("MasterDetailEditLink")) . "</a></li>";
			if ($DetailEditTblVar <> "") $DetailEditTblVar .= ",";
			$DetailEditTblVar .= "productoespecificaciones";
		}
		if ($links <> "") {
			$body .= "<button class=\"dropdown-toggle btn btn-default btn-sm ewDetail\" data-toggle=\"dropdown\"><b class=\"caret\"></b></button>";
			$body .= "<ul class=\"dropdown-menu\">". $links . "</ul>";
		}
		$body = "<div class=\"btn-group\">" . $body . "</div>";
		$item->Body = $body;
		$item->Visible = $Security->IsLoggedIn();
		if ($item->Visible) {
			if ($DetailTableLink <> "") $DetailTableLink .= ",";
			$DetailTableLink .= "productoespecificaciones";
		}
		if ($this->ShowMultipleDetails) $item->Visible = FALSE;

		// "detail_productofotos"
		$item = &$option->Add("detail_productofotos");
		$body = $Language->Phrase("ViewPageDetailLink") . $Language->TablePhrase("productofotos", "TblCaption");
		$body .= str_replace("%c", $this->productofotos_Count, $Language->Phrase("DetailCount"));
		$body = "<a class=\"btn btn-default btn-sm ewRowLink ewDetail\" data-action=\"list\" href=\"" . ew_HtmlEncode("productofotoslist.php?" . EW_TABLE_SHOW_MASTER . "=productos&fk_id=" . urlencode(strval($this->id->CurrentValue)) . "") . "\">" . $body . "</a>";
		$links = "";
		if ($GLOBALS["productofotos_grid"] && $GLOBALS["productofotos_grid"]->DetailView && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
			$links .= "<li><a class=\"ewRowLink ewDetailView\" data-action=\"view\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("MasterDetailViewLink")) . "\" href=\"" . ew_HtmlEncode($this->GetViewUrl(EW_TABLE_SHOW_DETAIL . "=productofotos")) . "\">" . ew_HtmlImageAndText($Language->Phrase("MasterDetailViewLink")) . "</a></li>";
			if ($DetailViewTblVar <> "") $DetailViewTblVar .= ",";
			$DetailViewTblVar .= "productofotos";
		}
		if ($GLOBALS["productofotos_grid"] && $GLOBALS["productofotos_grid"]->DetailEdit && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
			$links .= "<li><a class=\"ewRowLink ewDetailEdit\" data-action=\"edit\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("MasterDetailEditLink")) . "\" href=\"" . ew_HtmlEncode($this->GetEditUrl(EW_TABLE_SHOW_DETAIL . "=productofotos")) . "\">" . ew_HtmlImageAndText($Language->Phrase("MasterDetailEditLink")) . "</a></li>";
			if ($DetailEditTblVar <> "") $DetailEditTblVar .= ",";
			$DetailEditTblVar .= "productofotos";
		}
		if ($links <> "") {
			$body .= "<button class=\"dropdown-toggle btn btn-default btn-sm ewDetail\" data-toggle=\"dropdown\"><b class=\"caret\"></b></button>";
			$body .= "<ul class=\"dropdown-menu\">". $links . "</ul>";
		}
		$body = "<div class=\"btn-group\">" . $body . "</div>";
		$item->Body = $body;
		$item->Visible = $Security->IsLoggedIn();
		if ($item->Visible) {
			if ($DetailTableLink <> "") $DetailTableLink .= ",";
			$DetailTableLink .= "productofotos";
		}
		if ($this->ShowMultipleDetails) $item->Visible = FALSE;

		// "detail_productoversiones"
		$item = &$option->Add("detail_productoversiones");
		$body = $Language->Phrase("ViewPageDetailLink") . $Language->TablePhrase("productoversiones", "TblCaption");
		$body .= str_replace("%c", $this->productoversiones_Count, $Language->Phrase("DetailCount"));
		$body = "<a class=\"btn btn-default btn-sm ewRowLink ewDetail\" data-action=\"list\" href=\"" . ew_HtmlEncode("productoversioneslist.php?" . EW_TABLE_SHOW_MASTER . "=productos&fk_id=" . urlencode(strval($this->id->CurrentValue)) . "") . "\">" . $body . "</a>";
		$links = "";
		if ($GLOBALS["productoversiones_grid"] && $GLOBALS["productoversiones_grid"]->DetailView && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
			$links .= "<li><a class=\"ewRowLink ewDetailView\" data-action=\"view\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("MasterDetailViewLink")) . "\" href=\"" . ew_HtmlEncode($this->GetViewUrl(EW_TABLE_SHOW_DETAIL . "=productoversiones")) . "\">" . ew_HtmlImageAndText($Language->Phrase("MasterDetailViewLink")) . "</a></li>";
			if ($DetailViewTblVar <> "") $DetailViewTblVar .= ",";
			$DetailViewTblVar .= "productoversiones";
		}
		if ($GLOBALS["productoversiones_grid"] && $GLOBALS["productoversiones_grid"]->DetailEdit && $Security->IsLoggedIn() && $Security->IsLoggedIn()) {
			$links .= "<li><a class=\"ewRowLink ewDetailEdit\" data-action=\"edit\" data-caption=\"" . ew_HtmlTitle($Language->Phrase("MasterDetailEditLink")) . "\" href=\"" . ew_HtmlEncode($this->GetEditUrl(EW_TABLE_SHOW_DETAIL . "=productoversiones")) . "\">" . ew_HtmlImageAndText($Language->Phrase("MasterDetailEditLink")) . "</a></li>";
			if ($DetailEditTblVar <> "") $DetailEditTblVar .= ",";
			$DetailEditTblVar .= "productoversiones";
		}
		if ($links <> "") {
			$body .= "<button class=\"dropdown-toggle btn btn-default btn-sm ewDetail\" data-toggle=\"dropdown\"><b class=\"caret\"></b></button>";
			$body .= "<ul class=\"dropdown-menu\">". $links . "</ul>";
		}
		$body = "<div class=\"btn-group\">" . $body . "</div>";
		$item->Body = $body;
		$item->Visible = $Security->IsLoggedIn();
		if ($item->Visible) {
			if ($DetailTableLink <> "") $DetailTableLink .= ",";
			$DetailTableLink .= "productoversiones";
		}
		if ($this->ShowMultipleDetails) $item->Visible = FALSE;

		// Multiple details
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
			$oListOpt = &$option->Add("details");
			$oListOpt->Body = $body;
		}

		// Set up detail default
		$option = &$options["detail"];
		$options["detail"]->DropDownButtonPhrase = $Language->Phrase("ButtonDetails");
		$option->UseImageAndText = TRUE;
		$ar = explode(",", $DetailTableLink);
		$cnt = count($ar);
		$option->UseDropDownButton = ($cnt > 1);
		$option->UseButtonGroup = TRUE;
		$item = &$option->Add($option->GroupOptionName);
		$item->Body = "";
		$item->Visible = FALSE;

		// Set up action default
		$option = &$options["action"];
		$option->DropDownButtonPhrase = $Language->Phrase("ButtonActions");
		$option->UseImageAndText = TRUE;
		$option->UseDropDownButton = FALSE;
		$option->UseButtonGroup = TRUE;
		$item = &$option->Add($option->GroupOptionName);
		$item->Body = "";
		$item->Visible = FALSE;
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

	// Render row values based on field settings
	function RenderRow() {
		global $Security, $Language, $gsLanguage;

		// Initialize URLs
		$this->AddUrl = $this->GetAddUrl();
		$this->EditUrl = $this->GetEditUrl();
		$this->CopyUrl = $this->GetCopyUrl();
		$this->DeleteUrl = $this->GetDeleteUrl();
		$this->ListUrl = $this->GetListUrl();
		$this->SetupOtherOptions();

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
		}

		// Call Row Rendered event
		if ($this->RowType <> EW_ROWTYPE_AGGREGATEINIT)
			$this->Row_Rendered();
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
				if ($GLOBALS["productoespecificaciones_grid"]->DetailView) {
					$GLOBALS["productoespecificaciones_grid"]->CurrentMode = "view";

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
				if ($GLOBALS["productofotos_grid"]->DetailView) {
					$GLOBALS["productofotos_grid"]->CurrentMode = "view";

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
				if ($GLOBALS["productoversiones_grid"]->DetailView) {
					$GLOBALS["productoversiones_grid"]->CurrentMode = "view";

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
		$PageId = "view";
		$Breadcrumb->Add("view", $PageId, $url);
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
if (!isset($productos_view)) $productos_view = new cproductos_view();

// Page init
$productos_view->Page_Init();

// Page main
$productos_view->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$productos_view->Page_Render();
?>
<?php include_once "header.php" ?>
<script type="text/javascript">

// Form object
var CurrentPageID = EW_PAGE_ID = "view";
var CurrentForm = fproductosview = new ew_Form("fproductosview", "view");

// Form_CustomValidate event
fproductosview.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fproductosview.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
fproductosview.Lists["x_marca_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_marca","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgmarcas"};
fproductosview.Lists["x_marca_id"].Data = "<?php echo $productos_view->marca_id->LookupFilterQuery(FALSE, "view") ?>";
fproductosview.Lists["x_rubro_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_rubro","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgrubros"};
fproductosview.Lists["x_rubro_id"].Data = "<?php echo $productos_view->rubro_id->LookupFilterQuery(FALSE, "view") ?>";
fproductosview.Lists["x_moneda_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_moneda","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"cfgmonedas"};
fproductosview.Lists["x_moneda_id"].Data = "<?php echo $productos_view->moneda_id->LookupFilterQuery(FALSE, "view") ?>";
fproductosview.Lists["x_destacado"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductosview.Lists["x_destacado"].Options = <?php echo json_encode($productos_view->destacado->Options()) ?>;
fproductosview.Lists["x_activo"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductosview.Lists["x_activo"].Options = <?php echo json_encode($productos_view->activo->Options()) ?>;

// Form object for search
</script>
<script type="text/javascript">

// Write your client script here, no need to add script tags.
</script>
<div class="ewToolbar">
<?php $productos_view->ExportOptions->Render("body") ?>
<?php
	foreach ($productos_view->OtherOptions as &$option)
		$option->Render("body");
?>
<div class="clearfix"></div>
</div>
<?php $productos_view->ShowPageHeader(); ?>
<?php
$productos_view->ShowMessage();
?>
<form name="fproductosview" id="fproductosview" class="form-inline ewForm ewViewForm" action="<?php echo ew_CurrentPage() ?>" method="post">
<?php if ($productos_view->CheckToken) { ?>
<input type="hidden" name="<?php echo EW_TOKEN_NAME ?>" value="<?php echo $productos_view->Token ?>">
<?php } ?>
<input type="hidden" name="t" value="productos">
<input type="hidden" name="modal" value="<?php echo intval($productos_view->IsModal) ?>">
<table class="table table-striped table-bordered table-hover table-condensed ewViewTable">
<?php if ($productos->id->Visible) { // id ?>
	<tr id="r_id">
		<td class="col-sm-2"><span id="elh_productos_id"><?php echo $productos->id->FldCaption() ?></span></td>
		<td data-name="id"<?php echo $productos->id->CellAttributes() ?>>
<span id="el_productos_id">
<span<?php echo $productos->id->ViewAttributes() ?>>
<?php echo $productos->id->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($productos->producto->Visible) { // producto ?>
	<tr id="r_producto">
		<td class="col-sm-2"><span id="elh_productos_producto"><?php echo $productos->producto->FldCaption() ?></span></td>
		<td data-name="producto"<?php echo $productos->producto->CellAttributes() ?>>
<span id="el_productos_producto">
<span<?php echo $productos->producto->ViewAttributes() ?>>
<?php echo $productos->producto->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($productos->marca_id->Visible) { // marca_id ?>
	<tr id="r_marca_id">
		<td class="col-sm-2"><span id="elh_productos_marca_id"><?php echo $productos->marca_id->FldCaption() ?></span></td>
		<td data-name="marca_id"<?php echo $productos->marca_id->CellAttributes() ?>>
<span id="el_productos_marca_id">
<span<?php echo $productos->marca_id->ViewAttributes() ?>>
<?php echo $productos->marca_id->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($productos->rubro_id->Visible) { // rubro_id ?>
	<tr id="r_rubro_id">
		<td class="col-sm-2"><span id="elh_productos_rubro_id"><?php echo $productos->rubro_id->FldCaption() ?></span></td>
		<td data-name="rubro_id"<?php echo $productos->rubro_id->CellAttributes() ?>>
<span id="el_productos_rubro_id">
<span<?php echo $productos->rubro_id->ViewAttributes() ?>>
<?php echo $productos->rubro_id->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($productos->moneda_id->Visible) { // moneda_id ?>
	<tr id="r_moneda_id">
		<td class="col-sm-2"><span id="elh_productos_moneda_id"><?php echo $productos->moneda_id->FldCaption() ?></span></td>
		<td data-name="moneda_id"<?php echo $productos->moneda_id->CellAttributes() ?>>
<span id="el_productos_moneda_id">
<span<?php echo $productos->moneda_id->ViewAttributes() ?>>
<?php echo $productos->moneda_id->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($productos->descripcion->Visible) { // descripcion ?>
	<tr id="r_descripcion">
		<td class="col-sm-2"><span id="elh_productos_descripcion"><?php echo $productos->descripcion->FldCaption() ?></span></td>
		<td data-name="descripcion"<?php echo $productos->descripcion->CellAttributes() ?>>
<span id="el_productos_descripcion">
<span<?php echo $productos->descripcion->ViewAttributes() ?>>
<?php echo $productos->descripcion->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($productos->foto->Visible) { // foto ?>
	<tr id="r_foto">
		<td class="col-sm-2"><span id="elh_productos_foto"><?php echo $productos->foto->FldCaption() ?></span></td>
		<td data-name="foto"<?php echo $productos->foto->CellAttributes() ?>>
<span id="el_productos_foto">
<span<?php echo $productos->foto->ViewAttributes() ?>>
<?php echo ew_GetFileViewTag($productos->foto, $productos->foto->ViewValue) ?>
</span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($productos->precio->Visible) { // precio ?>
	<tr id="r_precio">
		<td class="col-sm-2"><span id="elh_productos_precio"><?php echo $productos->precio->FldCaption() ?></span></td>
		<td data-name="precio"<?php echo $productos->precio->CellAttributes() ?>>
<span id="el_productos_precio">
<span<?php echo $productos->precio->ViewAttributes() ?>>
<?php echo $productos->precio->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($productos->stock->Visible) { // stock ?>
	<tr id="r_stock">
		<td class="col-sm-2"><span id="elh_productos_stock"><?php echo $productos->stock->FldCaption() ?></span></td>
		<td data-name="stock"<?php echo $productos->stock->CellAttributes() ?>>
<span id="el_productos_stock">
<span<?php echo $productos->stock->ViewAttributes() ?>>
<?php echo $productos->stock->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($productos->destacado->Visible) { // destacado ?>
	<tr id="r_destacado">
		<td class="col-sm-2"><span id="elh_productos_destacado"><?php echo $productos->destacado->FldCaption() ?></span></td>
		<td data-name="destacado"<?php echo $productos->destacado->CellAttributes() ?>>
<span id="el_productos_destacado">
<span<?php echo $productos->destacado->ViewAttributes() ?>>
<?php echo $productos->destacado->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($productos->visitas->Visible) { // visitas ?>
	<tr id="r_visitas">
		<td class="col-sm-2"><span id="elh_productos_visitas"><?php echo $productos->visitas->FldCaption() ?></span></td>
		<td data-name="visitas"<?php echo $productos->visitas->CellAttributes() ?>>
<span id="el_productos_visitas">
<span<?php echo $productos->visitas->ViewAttributes() ?>>
<?php echo $productos->visitas->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($productos->activo->Visible) { // activo ?>
	<tr id="r_activo">
		<td class="col-sm-2"><span id="elh_productos_activo"><?php echo $productos->activo->FldCaption() ?></span></td>
		<td data-name="activo"<?php echo $productos->activo->CellAttributes() ?>>
<span id="el_productos_activo">
<span<?php echo $productos->activo->ViewAttributes() ?>>
<?php echo $productos->activo->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
</table>
<?php
	if (in_array("productoespecificaciones", explode(",", $productos->getCurrentDetailTable())) && $productoespecificaciones->DetailView) {
?>
<?php if ($productos->getCurrentDetailTable() <> "") { ?>
<h4 class="ewDetailCaption"><?php echo $Language->TablePhrase("productoespecificaciones", "TblCaption") ?></h4>
<?php } ?>
<?php include_once "productoespecificacionesgrid.php" ?>
<?php } ?>
<?php
	if (in_array("productofotos", explode(",", $productos->getCurrentDetailTable())) && $productofotos->DetailView) {
?>
<?php if ($productos->getCurrentDetailTable() <> "") { ?>
<h4 class="ewDetailCaption"><?php echo $Language->TablePhrase("productofotos", "TblCaption") ?></h4>
<?php } ?>
<?php include_once "productofotosgrid.php" ?>
<?php } ?>
<?php
	if (in_array("productoversiones", explode(",", $productos->getCurrentDetailTable())) && $productoversiones->DetailView) {
?>
<?php if ($productos->getCurrentDetailTable() <> "") { ?>
<h4 class="ewDetailCaption"><?php echo $Language->TablePhrase("productoversiones", "TblCaption") ?></h4>
<?php } ?>
<?php include_once "productoversionesgrid.php" ?>
<?php } ?>
</form>
<script type="text/javascript">
fproductosview.Init();
</script>
<?php
$productos_view->ShowPageFooter();
if (EW_DEBUG_ENABLED)
	echo ew_DebugMsg();
?>
<script type="text/javascript">

// Write your table-specific startup script here
// document.write("page loaded");

</script>
<?php include_once "footer.php" ?>
<?php
$productos_view->Page_Terminate();
?>
