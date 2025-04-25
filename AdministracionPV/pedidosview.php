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

$pedidos_view = NULL; // Initialize page object first

class cpedidos_view extends cpedidos {

	// Page ID
	var $PageID = 'view';

	// Project ID
	var $ProjectID = '{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}';

	// Table name
	var $TableName = 'pedidos';

	// Page object name
	var $PageObjName = 'pedidos_view';

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
			define("EW_TABLE_NAME", 'pedidos', TRUE);

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
				$this->Page_Terminate(ew_GetUrl("pedidoslist.php"));
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
				$sReturnUrl = "pedidoslist.php"; // Return to list
			}

			// Get action
			$this->CurrentAction = "I"; // Display form
			switch ($this->CurrentAction) {
				case "I": // Get a record to display
					if (!$this->LoadRow()) { // Load record based on key
						if ($this->getSuccessMessage() == "" && $this->getFailureMessage() == "")
							$this->setFailureMessage($Language->Phrase("NoRecord")); // Set no record message
						$sReturnUrl = "pedidoslist.php"; // No matching record, return to list
					}
			}
		} else {
			$sReturnUrl = "pedidoslist.php"; // Not page request, return to list
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
	}

	// Set up other options
	function SetupOtherOptions() {
		global $Language, $Security;
		$options = &$this->OtherOptions;
		$option = &$options["action"];

		// Edit
		$item = &$option->Add("edit");
		$editcaption = ew_HtmlTitle($Language->Phrase("ViewPageEditLink"));
		if ($this->IsModal) // Modal
			$item->Body = "<a class=\"ewAction ewEdit\" title=\"" . $editcaption . "\" data-caption=\"" . $editcaption . "\" href=\"javascript:void(0);\" onclick=\"ew_ModalDialogShow({lnk:this,url:'" . ew_HtmlEncode($this->EditUrl) . "'});\">" . $Language->Phrase("ViewPageEditLink") . "</a>";
		else
			$item->Body = "<a class=\"ewAction ewEdit\" title=\"" . $editcaption . "\" data-caption=\"" . $editcaption . "\" href=\"" . ew_HtmlEncode($this->EditUrl) . "\">" . $Language->Phrase("ViewPageEditLink") . "</a>";
		$item->Visible = ($this->EditUrl <> "" && $Security->IsLoggedIn());

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
		}

		// Call Row Rendered event
		if ($this->RowType <> EW_ROWTYPE_AGGREGATEINIT)
			$this->Row_Rendered();
	}

	// Set up Breadcrumb
	function SetupBreadcrumb() {
		global $Breadcrumb, $Language;
		$Breadcrumb = new cBreadcrumb();
		$url = substr(ew_CurrentUrl(), strrpos(ew_CurrentUrl(), "/")+1);
		$Breadcrumb->Add("list", $this->TableVar, $this->AddMasterUrl("pedidoslist.php"), "", $this->TableVar, TRUE);
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
if (!isset($pedidos_view)) $pedidos_view = new cpedidos_view();

// Page init
$pedidos_view->Page_Init();

// Page main
$pedidos_view->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$pedidos_view->Page_Render();
?>
<?php include_once "header.php" ?>
<script type="text/javascript">

// Form object
var CurrentPageID = EW_PAGE_ID = "view";
var CurrentForm = fpedidosview = new ew_Form("fpedidosview", "view");

// Form_CustomValidate event
fpedidosview.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fpedidosview.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
// Form object for search

</script>
<script type="text/javascript">

// Write your client script here, no need to add script tags.
</script>
<div class="ewToolbar">
<?php $pedidos_view->ExportOptions->Render("body") ?>
<?php
	foreach ($pedidos_view->OtherOptions as &$option)
		$option->Render("body");
?>
<div class="clearfix"></div>
</div>
<?php $pedidos_view->ShowPageHeader(); ?>
<?php
$pedidos_view->ShowMessage();
?>
<form name="fpedidosview" id="fpedidosview" class="form-inline ewForm ewViewForm" action="<?php echo ew_CurrentPage() ?>" method="post">
<?php if ($pedidos_view->CheckToken) { ?>
<input type="hidden" name="<?php echo EW_TOKEN_NAME ?>" value="<?php echo $pedidos_view->Token ?>">
<?php } ?>
<input type="hidden" name="t" value="pedidos">
<input type="hidden" name="modal" value="<?php echo intval($pedidos_view->IsModal) ?>">
<table class="table table-striped table-bordered table-hover table-condensed ewViewTable">
<?php if ($pedidos->id->Visible) { // id ?>
	<tr id="r_id">
		<td class="col-sm-2"><span id="elh_pedidos_id"><?php echo $pedidos->id->FldCaption() ?></span></td>
		<td data-name="id"<?php echo $pedidos->id->CellAttributes() ?>>
<span id="el_pedidos_id">
<span<?php echo $pedidos->id->ViewAttributes() ?>>
<?php echo $pedidos->id->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->datos->Visible) { // datos ?>
	<tr id="r_datos">
		<td class="col-sm-2"><span id="elh_pedidos_datos"><?php echo $pedidos->datos->FldCaption() ?></span></td>
		<td data-name="datos"<?php echo $pedidos->datos->CellAttributes() ?>>
<span id="el_pedidos_datos">
<span<?php echo $pedidos->datos->ViewAttributes() ?>>
<?php echo $pedidos->datos->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->total->Visible) { // total ?>
	<tr id="r_total">
		<td class="col-sm-2"><span id="elh_pedidos_total"><?php echo $pedidos->total->FldCaption() ?></span></td>
		<td data-name="total"<?php echo $pedidos->total->CellAttributes() ?>>
<span id="el_pedidos_total">
<span<?php echo $pedidos->total->ViewAttributes() ?>>
<?php echo $pedidos->total->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->estado->Visible) { // estado ?>
	<tr id="r_estado">
		<td class="col-sm-2"><span id="elh_pedidos_estado"><?php echo $pedidos->estado->FldCaption() ?></span></td>
		<td data-name="estado"<?php echo $pedidos->estado->CellAttributes() ?>>
<span id="el_pedidos_estado">
<span<?php echo $pedidos->estado->ViewAttributes() ?>>
<?php echo $pedidos->estado->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->metodo_pago->Visible) { // metodo_pago ?>
	<tr id="r_metodo_pago">
		<td class="col-sm-2"><span id="elh_pedidos_metodo_pago"><?php echo $pedidos->metodo_pago->FldCaption() ?></span></td>
		<td data-name="metodo_pago"<?php echo $pedidos->metodo_pago->CellAttributes() ?>>
<span id="el_pedidos_metodo_pago">
<span<?php echo $pedidos->metodo_pago->ViewAttributes() ?>>
<?php echo $pedidos->metodo_pago->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->comprador_nombre->Visible) { // comprador_nombre ?>
	<tr id="r_comprador_nombre">
		<td class="col-sm-2"><span id="elh_pedidos_comprador_nombre"><?php echo $pedidos->comprador_nombre->FldCaption() ?></span></td>
		<td data-name="comprador_nombre"<?php echo $pedidos->comprador_nombre->CellAttributes() ?>>
<span id="el_pedidos_comprador_nombre">
<span<?php echo $pedidos->comprador_nombre->ViewAttributes() ?>>
<?php echo $pedidos->comprador_nombre->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->comprador_email->Visible) { // comprador_email ?>
	<tr id="r_comprador_email">
		<td class="col-sm-2"><span id="elh_pedidos_comprador_email"><?php echo $pedidos->comprador_email->FldCaption() ?></span></td>
		<td data-name="comprador_email"<?php echo $pedidos->comprador_email->CellAttributes() ?>>
<span id="el_pedidos_comprador_email">
<span<?php echo $pedidos->comprador_email->ViewAttributes() ?>>
<?php echo $pedidos->comprador_email->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->comprador_telefono->Visible) { // comprador_telefono ?>
	<tr id="r_comprador_telefono">
		<td class="col-sm-2"><span id="elh_pedidos_comprador_telefono"><?php echo $pedidos->comprador_telefono->FldCaption() ?></span></td>
		<td data-name="comprador_telefono"<?php echo $pedidos->comprador_telefono->CellAttributes() ?>>
<span id="el_pedidos_comprador_telefono">
<span<?php echo $pedidos->comprador_telefono->ViewAttributes() ?>>
<?php echo $pedidos->comprador_telefono->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->direccion_envio->Visible) { // direccion_envio ?>
	<tr id="r_direccion_envio">
		<td class="col-sm-2"><span id="elh_pedidos_direccion_envio"><?php echo $pedidos->direccion_envio->FldCaption() ?></span></td>
		<td data-name="direccion_envio"<?php echo $pedidos->direccion_envio->CellAttributes() ?>>
<span id="el_pedidos_direccion_envio">
<span<?php echo $pedidos->direccion_envio->ViewAttributes() ?>>
<?php echo $pedidos->direccion_envio->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->mp_payment_id->Visible) { // mp_payment_id ?>
	<tr id="r_mp_payment_id">
		<td class="col-sm-2"><span id="elh_pedidos_mp_payment_id"><?php echo $pedidos->mp_payment_id->FldCaption() ?></span></td>
		<td data-name="mp_payment_id"<?php echo $pedidos->mp_payment_id->CellAttributes() ?>>
<span id="el_pedidos_mp_payment_id">
<span<?php echo $pedidos->mp_payment_id->ViewAttributes() ?>>
<?php echo $pedidos->mp_payment_id->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->tarjeta_last4->Visible) { // tarjeta_last4 ?>
	<tr id="r_tarjeta_last4">
		<td class="col-sm-2"><span id="elh_pedidos_tarjeta_last4"><?php echo $pedidos->tarjeta_last4->FldCaption() ?></span></td>
		<td data-name="tarjeta_last4"<?php echo $pedidos->tarjeta_last4->CellAttributes() ?>>
<span id="el_pedidos_tarjeta_last4">
<span<?php echo $pedidos->tarjeta_last4->ViewAttributes() ?>>
<?php echo $pedidos->tarjeta_last4->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->tarjeta_payment_method->Visible) { // tarjeta_payment_method ?>
	<tr id="r_tarjeta_payment_method">
		<td class="col-sm-2"><span id="elh_pedidos_tarjeta_payment_method"><?php echo $pedidos->tarjeta_payment_method->FldCaption() ?></span></td>
		<td data-name="tarjeta_payment_method"<?php echo $pedidos->tarjeta_payment_method->CellAttributes() ?>>
<span id="el_pedidos_tarjeta_payment_method">
<span<?php echo $pedidos->tarjeta_payment_method->ViewAttributes() ?>>
<?php echo $pedidos->tarjeta_payment_method->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->transferencia_ref->Visible) { // transferencia_ref ?>
	<tr id="r_transferencia_ref">
		<td class="col-sm-2"><span id="elh_pedidos_transferencia_ref"><?php echo $pedidos->transferencia_ref->FldCaption() ?></span></td>
		<td data-name="transferencia_ref"<?php echo $pedidos->transferencia_ref->CellAttributes() ?>>
<span id="el_pedidos_transferencia_ref">
<span<?php echo $pedidos->transferencia_ref->ViewAttributes() ?>>
<?php echo $pedidos->transferencia_ref->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->mp_error_code->Visible) { // mp_error_code ?>
	<tr id="r_mp_error_code">
		<td class="col-sm-2"><span id="elh_pedidos_mp_error_code"><?php echo $pedidos->mp_error_code->FldCaption() ?></span></td>
		<td data-name="mp_error_code"<?php echo $pedidos->mp_error_code->CellAttributes() ?>>
<span id="el_pedidos_mp_error_code">
<span<?php echo $pedidos->mp_error_code->ViewAttributes() ?>>
<?php echo $pedidos->mp_error_code->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->mp_error_message->Visible) { // mp_error_message ?>
	<tr id="r_mp_error_message">
		<td class="col-sm-2"><span id="elh_pedidos_mp_error_message"><?php echo $pedidos->mp_error_message->FldCaption() ?></span></td>
		<td data-name="mp_error_message"<?php echo $pedidos->mp_error_message->CellAttributes() ?>>
<span id="el_pedidos_mp_error_message">
<span<?php echo $pedidos->mp_error_message->ViewAttributes() ?>>
<?php echo $pedidos->mp_error_message->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->mp_response->Visible) { // mp_response ?>
	<tr id="r_mp_response">
		<td class="col-sm-2"><span id="elh_pedidos_mp_response"><?php echo $pedidos->mp_response->FldCaption() ?></span></td>
		<td data-name="mp_response"<?php echo $pedidos->mp_response->CellAttributes() ?>>
<span id="el_pedidos_mp_response">
<span<?php echo $pedidos->mp_response->ViewAttributes() ?>>
<?php echo $pedidos->mp_response->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->createdAt->Visible) { // createdAt ?>
	<tr id="r_createdAt">
		<td class="col-sm-2"><span id="elh_pedidos_createdAt"><?php echo $pedidos->createdAt->FldCaption() ?></span></td>
		<td data-name="createdAt"<?php echo $pedidos->createdAt->CellAttributes() ?>>
<span id="el_pedidos_createdAt">
<span<?php echo $pedidos->createdAt->ViewAttributes() ?>>
<?php echo $pedidos->createdAt->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
<?php if ($pedidos->updatedAt->Visible) { // updatedAt ?>
	<tr id="r_updatedAt">
		<td class="col-sm-2"><span id="elh_pedidos_updatedAt"><?php echo $pedidos->updatedAt->FldCaption() ?></span></td>
		<td data-name="updatedAt"<?php echo $pedidos->updatedAt->CellAttributes() ?>>
<span id="el_pedidos_updatedAt">
<span<?php echo $pedidos->updatedAt->ViewAttributes() ?>>
<?php echo $pedidos->updatedAt->ViewValue ?></span>
</span>
</td>
	</tr>
<?php } ?>
</table>
</form>
<script type="text/javascript">
fpedidosview.Init();
</script>
<?php
$pedidos_view->ShowPageFooter();
if (EW_DEBUG_ENABLED)
	echo ew_DebugMsg();
?>
<script type="text/javascript">

// Write your table-specific startup script here
// document.write("page loaded");

</script>
<?php include_once "footer.php" ?>
<?php
$pedidos_view->Page_Terminate();
?>
