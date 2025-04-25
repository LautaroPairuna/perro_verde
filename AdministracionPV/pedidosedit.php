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

$pedidos_edit = NULL; // Initialize page object first

class cpedidos_edit extends cpedidos {

	// Page ID
	var $PageID = 'edit';

	// Project ID
	var $ProjectID = '{BC212F19-BD83-48ED-BA40-11E3CCFC3AA2}';

	// Table name
	var $TableName = 'pedidos';

	// Page object name
	var $PageObjName = 'pedidos_edit';

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
			define("EW_PAGE_ID", 'edit', TRUE);

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
		if (!$Security->CanEdit()) {
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
					$this->Page_Terminate("pedidoslist.php"); // No matching record, return to list
				}
				break;
			Case "U": // Update
				$sReturnUrl = $this->getReturnUrl();
				if (ew_GetPageName($sReturnUrl) == "pedidoslist.php")
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
	}

	// Load form values
	function LoadFormValues() {

		// Load from form
		global $objForm;
		if (!$this->id->FldIsDetailKey)
			$this->id->setFormValue($objForm->GetValue("x_id"));
		if (!$this->datos->FldIsDetailKey) {
			$this->datos->setFormValue($objForm->GetValue("x_datos"));
		}
		if (!$this->total->FldIsDetailKey) {
			$this->total->setFormValue($objForm->GetValue("x_total"));
		}
		if (!$this->estado->FldIsDetailKey) {
			$this->estado->setFormValue($objForm->GetValue("x_estado"));
		}
		if (!$this->metodo_pago->FldIsDetailKey) {
			$this->metodo_pago->setFormValue($objForm->GetValue("x_metodo_pago"));
		}
		if (!$this->comprador_nombre->FldIsDetailKey) {
			$this->comprador_nombre->setFormValue($objForm->GetValue("x_comprador_nombre"));
		}
		if (!$this->comprador_email->FldIsDetailKey) {
			$this->comprador_email->setFormValue($objForm->GetValue("x_comprador_email"));
		}
		if (!$this->comprador_telefono->FldIsDetailKey) {
			$this->comprador_telefono->setFormValue($objForm->GetValue("x_comprador_telefono"));
		}
		if (!$this->direccion_envio->FldIsDetailKey) {
			$this->direccion_envio->setFormValue($objForm->GetValue("x_direccion_envio"));
		}
		if (!$this->mp_payment_id->FldIsDetailKey) {
			$this->mp_payment_id->setFormValue($objForm->GetValue("x_mp_payment_id"));
		}
		if (!$this->tarjeta_last4->FldIsDetailKey) {
			$this->tarjeta_last4->setFormValue($objForm->GetValue("x_tarjeta_last4"));
		}
		if (!$this->tarjeta_payment_method->FldIsDetailKey) {
			$this->tarjeta_payment_method->setFormValue($objForm->GetValue("x_tarjeta_payment_method"));
		}
		if (!$this->transferencia_ref->FldIsDetailKey) {
			$this->transferencia_ref->setFormValue($objForm->GetValue("x_transferencia_ref"));
		}
		if (!$this->mp_error_code->FldIsDetailKey) {
			$this->mp_error_code->setFormValue($objForm->GetValue("x_mp_error_code"));
		}
		if (!$this->mp_error_message->FldIsDetailKey) {
			$this->mp_error_message->setFormValue($objForm->GetValue("x_mp_error_message"));
		}
		if (!$this->mp_response->FldIsDetailKey) {
			$this->mp_response->setFormValue($objForm->GetValue("x_mp_response"));
		}
		if (!$this->createdAt->FldIsDetailKey) {
			$this->createdAt->setFormValue($objForm->GetValue("x_createdAt"));
			$this->createdAt->CurrentValue = ew_UnFormatDateTime($this->createdAt->CurrentValue, 11);
		}
		if (!$this->updatedAt->FldIsDetailKey) {
			$this->updatedAt->setFormValue($objForm->GetValue("x_updatedAt"));
			$this->updatedAt->CurrentValue = ew_UnFormatDateTime($this->updatedAt->CurrentValue, 11);
		}
	}

	// Restore form values
	function RestoreFormValues() {
		global $objForm;
		$this->id->CurrentValue = $this->id->FormValue;
		$this->datos->CurrentValue = $this->datos->FormValue;
		$this->total->CurrentValue = $this->total->FormValue;
		$this->estado->CurrentValue = $this->estado->FormValue;
		$this->metodo_pago->CurrentValue = $this->metodo_pago->FormValue;
		$this->comprador_nombre->CurrentValue = $this->comprador_nombre->FormValue;
		$this->comprador_email->CurrentValue = $this->comprador_email->FormValue;
		$this->comprador_telefono->CurrentValue = $this->comprador_telefono->FormValue;
		$this->direccion_envio->CurrentValue = $this->direccion_envio->FormValue;
		$this->mp_payment_id->CurrentValue = $this->mp_payment_id->FormValue;
		$this->tarjeta_last4->CurrentValue = $this->tarjeta_last4->FormValue;
		$this->tarjeta_payment_method->CurrentValue = $this->tarjeta_payment_method->FormValue;
		$this->transferencia_ref->CurrentValue = $this->transferencia_ref->FormValue;
		$this->mp_error_code->CurrentValue = $this->mp_error_code->FormValue;
		$this->mp_error_message->CurrentValue = $this->mp_error_message->FormValue;
		$this->mp_response->CurrentValue = $this->mp_response->FormValue;
		$this->createdAt->CurrentValue = $this->createdAt->FormValue;
		$this->createdAt->CurrentValue = ew_UnFormatDateTime($this->createdAt->CurrentValue, 11);
		$this->updatedAt->CurrentValue = $this->updatedAt->FormValue;
		$this->updatedAt->CurrentValue = ew_UnFormatDateTime($this->updatedAt->CurrentValue, 11);
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
		} elseif ($this->RowType == EW_ROWTYPE_EDIT) { // Edit row

			// id
			$this->id->EditAttrs["class"] = "form-control";
			$this->id->EditCustomAttributes = "";
			$this->id->EditValue = $this->id->CurrentValue;
			$this->id->ViewCustomAttributes = "";

			// datos
			$this->datos->EditAttrs["class"] = "form-control";
			$this->datos->EditCustomAttributes = "";
			$this->datos->EditValue = ew_HtmlEncode($this->datos->CurrentValue);
			$this->datos->PlaceHolder = ew_RemoveHtml($this->datos->FldCaption());

			// total
			$this->total->EditAttrs["class"] = "form-control";
			$this->total->EditCustomAttributes = "";
			$this->total->EditValue = ew_HtmlEncode($this->total->CurrentValue);
			$this->total->PlaceHolder = ew_RemoveHtml($this->total->FldCaption());
			if (strval($this->total->EditValue) <> "" && is_numeric($this->total->EditValue)) $this->total->EditValue = ew_FormatNumber($this->total->EditValue, -2, -1, -2, 0);

			// estado
			$this->estado->EditAttrs["class"] = "form-control";
			$this->estado->EditCustomAttributes = "";
			$this->estado->EditValue = ew_HtmlEncode($this->estado->CurrentValue);
			$this->estado->PlaceHolder = ew_RemoveHtml($this->estado->FldCaption());

			// metodo_pago
			$this->metodo_pago->EditAttrs["class"] = "form-control";
			$this->metodo_pago->EditCustomAttributes = "";
			$this->metodo_pago->EditValue = ew_HtmlEncode($this->metodo_pago->CurrentValue);
			$this->metodo_pago->PlaceHolder = ew_RemoveHtml($this->metodo_pago->FldCaption());

			// comprador_nombre
			$this->comprador_nombre->EditAttrs["class"] = "form-control";
			$this->comprador_nombre->EditCustomAttributes = "";
			$this->comprador_nombre->EditValue = ew_HtmlEncode($this->comprador_nombre->CurrentValue);
			$this->comprador_nombre->PlaceHolder = ew_RemoveHtml($this->comprador_nombre->FldCaption());

			// comprador_email
			$this->comprador_email->EditAttrs["class"] = "form-control";
			$this->comprador_email->EditCustomAttributes = "";
			$this->comprador_email->EditValue = ew_HtmlEncode($this->comprador_email->CurrentValue);
			$this->comprador_email->PlaceHolder = ew_RemoveHtml($this->comprador_email->FldCaption());

			// comprador_telefono
			$this->comprador_telefono->EditAttrs["class"] = "form-control";
			$this->comprador_telefono->EditCustomAttributes = "";
			$this->comprador_telefono->EditValue = ew_HtmlEncode($this->comprador_telefono->CurrentValue);
			$this->comprador_telefono->PlaceHolder = ew_RemoveHtml($this->comprador_telefono->FldCaption());

			// direccion_envio
			$this->direccion_envio->EditAttrs["class"] = "form-control";
			$this->direccion_envio->EditCustomAttributes = "";
			$this->direccion_envio->EditValue = ew_HtmlEncode($this->direccion_envio->CurrentValue);
			$this->direccion_envio->PlaceHolder = ew_RemoveHtml($this->direccion_envio->FldCaption());

			// mp_payment_id
			$this->mp_payment_id->EditAttrs["class"] = "form-control";
			$this->mp_payment_id->EditCustomAttributes = "";
			$this->mp_payment_id->EditValue = ew_HtmlEncode($this->mp_payment_id->CurrentValue);
			$this->mp_payment_id->PlaceHolder = ew_RemoveHtml($this->mp_payment_id->FldCaption());

			// tarjeta_last4
			$this->tarjeta_last4->EditAttrs["class"] = "form-control";
			$this->tarjeta_last4->EditCustomAttributes = "";
			$this->tarjeta_last4->EditValue = ew_HtmlEncode($this->tarjeta_last4->CurrentValue);
			$this->tarjeta_last4->PlaceHolder = ew_RemoveHtml($this->tarjeta_last4->FldCaption());

			// tarjeta_payment_method
			$this->tarjeta_payment_method->EditAttrs["class"] = "form-control";
			$this->tarjeta_payment_method->EditCustomAttributes = "";
			$this->tarjeta_payment_method->EditValue = ew_HtmlEncode($this->tarjeta_payment_method->CurrentValue);
			$this->tarjeta_payment_method->PlaceHolder = ew_RemoveHtml($this->tarjeta_payment_method->FldCaption());

			// transferencia_ref
			$this->transferencia_ref->EditAttrs["class"] = "form-control";
			$this->transferencia_ref->EditCustomAttributes = "";
			$this->transferencia_ref->EditValue = ew_HtmlEncode($this->transferencia_ref->CurrentValue);
			$this->transferencia_ref->PlaceHolder = ew_RemoveHtml($this->transferencia_ref->FldCaption());

			// mp_error_code
			$this->mp_error_code->EditAttrs["class"] = "form-control";
			$this->mp_error_code->EditCustomAttributes = "";
			$this->mp_error_code->EditValue = ew_HtmlEncode($this->mp_error_code->CurrentValue);
			$this->mp_error_code->PlaceHolder = ew_RemoveHtml($this->mp_error_code->FldCaption());

			// mp_error_message
			$this->mp_error_message->EditAttrs["class"] = "form-control";
			$this->mp_error_message->EditCustomAttributes = "";
			$this->mp_error_message->EditValue = ew_HtmlEncode($this->mp_error_message->CurrentValue);
			$this->mp_error_message->PlaceHolder = ew_RemoveHtml($this->mp_error_message->FldCaption());

			// mp_response
			$this->mp_response->EditAttrs["class"] = "form-control";
			$this->mp_response->EditCustomAttributes = "";
			$this->mp_response->EditValue = ew_HtmlEncode($this->mp_response->CurrentValue);
			$this->mp_response->PlaceHolder = ew_RemoveHtml($this->mp_response->FldCaption());

			// createdAt
			$this->createdAt->EditAttrs["class"] = "form-control";
			$this->createdAt->EditCustomAttributes = "";
			$this->createdAt->EditValue = ew_HtmlEncode(ew_FormatDateTime($this->createdAt->CurrentValue, 11));
			$this->createdAt->PlaceHolder = ew_RemoveHtml($this->createdAt->FldCaption());

			// updatedAt
			$this->updatedAt->EditAttrs["class"] = "form-control";
			$this->updatedAt->EditCustomAttributes = "";
			$this->updatedAt->EditValue = ew_HtmlEncode(ew_FormatDateTime($this->updatedAt->CurrentValue, 11));
			$this->updatedAt->PlaceHolder = ew_RemoveHtml($this->updatedAt->FldCaption());

			// Edit refer script
			// id

			$this->id->LinkCustomAttributes = "";
			$this->id->HrefValue = "";

			// datos
			$this->datos->LinkCustomAttributes = "";
			$this->datos->HrefValue = "";

			// total
			$this->total->LinkCustomAttributes = "";
			$this->total->HrefValue = "";

			// estado
			$this->estado->LinkCustomAttributes = "";
			$this->estado->HrefValue = "";

			// metodo_pago
			$this->metodo_pago->LinkCustomAttributes = "";
			$this->metodo_pago->HrefValue = "";

			// comprador_nombre
			$this->comprador_nombre->LinkCustomAttributes = "";
			$this->comprador_nombre->HrefValue = "";

			// comprador_email
			$this->comprador_email->LinkCustomAttributes = "";
			$this->comprador_email->HrefValue = "";

			// comprador_telefono
			$this->comprador_telefono->LinkCustomAttributes = "";
			$this->comprador_telefono->HrefValue = "";

			// direccion_envio
			$this->direccion_envio->LinkCustomAttributes = "";
			$this->direccion_envio->HrefValue = "";

			// mp_payment_id
			$this->mp_payment_id->LinkCustomAttributes = "";
			$this->mp_payment_id->HrefValue = "";

			// tarjeta_last4
			$this->tarjeta_last4->LinkCustomAttributes = "";
			$this->tarjeta_last4->HrefValue = "";

			// tarjeta_payment_method
			$this->tarjeta_payment_method->LinkCustomAttributes = "";
			$this->tarjeta_payment_method->HrefValue = "";

			// transferencia_ref
			$this->transferencia_ref->LinkCustomAttributes = "";
			$this->transferencia_ref->HrefValue = "";

			// mp_error_code
			$this->mp_error_code->LinkCustomAttributes = "";
			$this->mp_error_code->HrefValue = "";

			// mp_error_message
			$this->mp_error_message->LinkCustomAttributes = "";
			$this->mp_error_message->HrefValue = "";

			// mp_response
			$this->mp_response->LinkCustomAttributes = "";
			$this->mp_response->HrefValue = "";

			// createdAt
			$this->createdAt->LinkCustomAttributes = "";
			$this->createdAt->HrefValue = "";

			// updatedAt
			$this->updatedAt->LinkCustomAttributes = "";
			$this->updatedAt->HrefValue = "";
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
		if (!$this->datos->FldIsDetailKey && !is_null($this->datos->FormValue) && $this->datos->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->datos->FldCaption(), $this->datos->ReqErrMsg));
		}
		if (!$this->total->FldIsDetailKey && !is_null($this->total->FormValue) && $this->total->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->total->FldCaption(), $this->total->ReqErrMsg));
		}
		if (!ew_CheckNumber($this->total->FormValue)) {
			ew_AddMessage($gsFormError, $this->total->FldErrMsg());
		}
		if (!$this->estado->FldIsDetailKey && !is_null($this->estado->FormValue) && $this->estado->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->estado->FldCaption(), $this->estado->ReqErrMsg));
		}
		if (!$this->metodo_pago->FldIsDetailKey && !is_null($this->metodo_pago->FormValue) && $this->metodo_pago->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->metodo_pago->FldCaption(), $this->metodo_pago->ReqErrMsg));
		}
		if (!$this->comprador_nombre->FldIsDetailKey && !is_null($this->comprador_nombre->FormValue) && $this->comprador_nombre->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->comprador_nombre->FldCaption(), $this->comprador_nombre->ReqErrMsg));
		}
		if (!$this->comprador_email->FldIsDetailKey && !is_null($this->comprador_email->FormValue) && $this->comprador_email->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->comprador_email->FldCaption(), $this->comprador_email->ReqErrMsg));
		}
		if (!$this->createdAt->FldIsDetailKey && !is_null($this->createdAt->FormValue) && $this->createdAt->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->createdAt->FldCaption(), $this->createdAt->ReqErrMsg));
		}
		if (!ew_CheckEuroDate($this->createdAt->FormValue)) {
			ew_AddMessage($gsFormError, $this->createdAt->FldErrMsg());
		}
		if (!$this->updatedAt->FldIsDetailKey && !is_null($this->updatedAt->FormValue) && $this->updatedAt->FormValue == "") {
			ew_AddMessage($gsFormError, str_replace("%s", $this->updatedAt->FldCaption(), $this->updatedAt->ReqErrMsg));
		}
		if (!ew_CheckEuroDate($this->updatedAt->FormValue)) {
			ew_AddMessage($gsFormError, $this->updatedAt->FldErrMsg());
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

			// Save old values
			$rsold = &$rs->fields;
			$this->LoadDbValues($rsold);
			$rsnew = array();

			// datos
			$this->datos->SetDbValueDef($rsnew, $this->datos->CurrentValue, "", $this->datos->ReadOnly);

			// total
			$this->total->SetDbValueDef($rsnew, $this->total->CurrentValue, 0, $this->total->ReadOnly);

			// estado
			$this->estado->SetDbValueDef($rsnew, $this->estado->CurrentValue, "", $this->estado->ReadOnly);

			// metodo_pago
			$this->metodo_pago->SetDbValueDef($rsnew, $this->metodo_pago->CurrentValue, "", $this->metodo_pago->ReadOnly);

			// comprador_nombre
			$this->comprador_nombre->SetDbValueDef($rsnew, $this->comprador_nombre->CurrentValue, "", $this->comprador_nombre->ReadOnly);

			// comprador_email
			$this->comprador_email->SetDbValueDef($rsnew, $this->comprador_email->CurrentValue, "", $this->comprador_email->ReadOnly);

			// comprador_telefono
			$this->comprador_telefono->SetDbValueDef($rsnew, $this->comprador_telefono->CurrentValue, NULL, $this->comprador_telefono->ReadOnly);

			// direccion_envio
			$this->direccion_envio->SetDbValueDef($rsnew, $this->direccion_envio->CurrentValue, NULL, $this->direccion_envio->ReadOnly);

			// mp_payment_id
			$this->mp_payment_id->SetDbValueDef($rsnew, $this->mp_payment_id->CurrentValue, NULL, $this->mp_payment_id->ReadOnly);

			// tarjeta_last4
			$this->tarjeta_last4->SetDbValueDef($rsnew, $this->tarjeta_last4->CurrentValue, NULL, $this->tarjeta_last4->ReadOnly);

			// tarjeta_payment_method
			$this->tarjeta_payment_method->SetDbValueDef($rsnew, $this->tarjeta_payment_method->CurrentValue, NULL, $this->tarjeta_payment_method->ReadOnly);

			// transferencia_ref
			$this->transferencia_ref->SetDbValueDef($rsnew, $this->transferencia_ref->CurrentValue, NULL, $this->transferencia_ref->ReadOnly);

			// mp_error_code
			$this->mp_error_code->SetDbValueDef($rsnew, $this->mp_error_code->CurrentValue, NULL, $this->mp_error_code->ReadOnly);

			// mp_error_message
			$this->mp_error_message->SetDbValueDef($rsnew, $this->mp_error_message->CurrentValue, NULL, $this->mp_error_message->ReadOnly);

			// mp_response
			$this->mp_response->SetDbValueDef($rsnew, $this->mp_response->CurrentValue, NULL, $this->mp_response->ReadOnly);

			// createdAt
			$this->createdAt->SetDbValueDef($rsnew, ew_UnFormatDateTime($this->createdAt->CurrentValue, 11), ew_CurrentDate(), $this->createdAt->ReadOnly);

			// updatedAt
			$this->updatedAt->SetDbValueDef($rsnew, ew_UnFormatDateTime($this->updatedAt->CurrentValue, 11), ew_CurrentDate(), $this->updatedAt->ReadOnly);

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

	// Set up Breadcrumb
	function SetupBreadcrumb() {
		global $Breadcrumb, $Language;
		$Breadcrumb = new cBreadcrumb();
		$url = substr(ew_CurrentUrl(), strrpos(ew_CurrentUrl(), "/")+1);
		$Breadcrumb->Add("list", $this->TableVar, $this->AddMasterUrl("pedidoslist.php"), "", $this->TableVar, TRUE);
		$PageId = "edit";
		$Breadcrumb->Add("edit", $PageId, $url);
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
if (!isset($pedidos_edit)) $pedidos_edit = new cpedidos_edit();

// Page init
$pedidos_edit->Page_Init();

// Page main
$pedidos_edit->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$pedidos_edit->Page_Render();
?>
<?php include_once "header.php" ?>
<script type="text/javascript">

// Form object
var CurrentPageID = EW_PAGE_ID = "edit";
var CurrentForm = fpedidosedit = new ew_Form("fpedidosedit", "edit");

// Validate form
fpedidosedit.Validate = function() {
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
			elm = this.GetElements("x" + infix + "_datos");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $pedidos->datos->FldCaption(), $pedidos->datos->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_total");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $pedidos->total->FldCaption(), $pedidos->total->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_total");
			if (elm && !ew_CheckNumber(elm.value))
				return this.OnError(elm, "<?php echo ew_JsEncode2($pedidos->total->FldErrMsg()) ?>");
			elm = this.GetElements("x" + infix + "_estado");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $pedidos->estado->FldCaption(), $pedidos->estado->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_metodo_pago");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $pedidos->metodo_pago->FldCaption(), $pedidos->metodo_pago->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_comprador_nombre");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $pedidos->comprador_nombre->FldCaption(), $pedidos->comprador_nombre->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_comprador_email");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $pedidos->comprador_email->FldCaption(), $pedidos->comprador_email->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_createdAt");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $pedidos->createdAt->FldCaption(), $pedidos->createdAt->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_createdAt");
			if (elm && !ew_CheckEuroDate(elm.value))
				return this.OnError(elm, "<?php echo ew_JsEncode2($pedidos->createdAt->FldErrMsg()) ?>");
			elm = this.GetElements("x" + infix + "_updatedAt");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $pedidos->updatedAt->FldCaption(), $pedidos->updatedAt->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_updatedAt");
			if (elm && !ew_CheckEuroDate(elm.value))
				return this.OnError(elm, "<?php echo ew_JsEncode2($pedidos->updatedAt->FldErrMsg()) ?>");

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
fpedidosedit.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fpedidosedit.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
// Form object for search

</script>
<script type="text/javascript">

// Write your client script here, no need to add script tags.
</script>
<?php $pedidos_edit->ShowPageHeader(); ?>
<?php
$pedidos_edit->ShowMessage();
?>
<form name="fpedidosedit" id="fpedidosedit" class="<?php echo $pedidos_edit->FormClassName ?>" action="<?php echo ew_CurrentPage() ?>" method="post">
<?php if ($pedidos_edit->CheckToken) { ?>
<input type="hidden" name="<?php echo EW_TOKEN_NAME ?>" value="<?php echo $pedidos_edit->Token ?>">
<?php } ?>
<input type="hidden" name="t" value="pedidos">
<input type="hidden" name="a_edit" id="a_edit" value="U">
<input type="hidden" name="modal" value="<?php echo intval($pedidos_edit->IsModal) ?>">
<div class="ewEditDiv"><!-- page* -->
<?php if ($pedidos->id->Visible) { // id ?>
	<div id="r_id" class="form-group">
		<label id="elh_pedidos_id" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->id->FldCaption() ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->id->CellAttributes() ?>>
<span id="el_pedidos_id">
<span<?php echo $pedidos->id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $pedidos->id->EditValue ?></p></span>
</span>
<input type="hidden" data-table="pedidos" data-field="x_id" name="x_id" id="x_id" value="<?php echo ew_HtmlEncode($pedidos->id->CurrentValue) ?>">
<?php echo $pedidos->id->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->datos->Visible) { // datos ?>
	<div id="r_datos" class="form-group">
		<label id="elh_pedidos_datos" for="x_datos" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->datos->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->datos->CellAttributes() ?>>
<span id="el_pedidos_datos">
<textarea data-table="pedidos" data-field="x_datos" name="x_datos" id="x_datos" cols="35" rows="4" placeholder="<?php echo ew_HtmlEncode($pedidos->datos->getPlaceHolder()) ?>"<?php echo $pedidos->datos->EditAttributes() ?>><?php echo $pedidos->datos->EditValue ?></textarea>
</span>
<?php echo $pedidos->datos->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->total->Visible) { // total ?>
	<div id="r_total" class="form-group">
		<label id="elh_pedidos_total" for="x_total" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->total->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->total->CellAttributes() ?>>
<span id="el_pedidos_total">
<input type="text" data-table="pedidos" data-field="x_total" name="x_total" id="x_total" size="30" placeholder="<?php echo ew_HtmlEncode($pedidos->total->getPlaceHolder()) ?>" value="<?php echo $pedidos->total->EditValue ?>"<?php echo $pedidos->total->EditAttributes() ?>>
</span>
<?php echo $pedidos->total->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->estado->Visible) { // estado ?>
	<div id="r_estado" class="form-group">
		<label id="elh_pedidos_estado" for="x_estado" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->estado->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->estado->CellAttributes() ?>>
<span id="el_pedidos_estado">
<input type="text" data-table="pedidos" data-field="x_estado" name="x_estado" id="x_estado" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->estado->getPlaceHolder()) ?>" value="<?php echo $pedidos->estado->EditValue ?>"<?php echo $pedidos->estado->EditAttributes() ?>>
</span>
<?php echo $pedidos->estado->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->metodo_pago->Visible) { // metodo_pago ?>
	<div id="r_metodo_pago" class="form-group">
		<label id="elh_pedidos_metodo_pago" for="x_metodo_pago" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->metodo_pago->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->metodo_pago->CellAttributes() ?>>
<span id="el_pedidos_metodo_pago">
<input type="text" data-table="pedidos" data-field="x_metodo_pago" name="x_metodo_pago" id="x_metodo_pago" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->metodo_pago->getPlaceHolder()) ?>" value="<?php echo $pedidos->metodo_pago->EditValue ?>"<?php echo $pedidos->metodo_pago->EditAttributes() ?>>
</span>
<?php echo $pedidos->metodo_pago->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->comprador_nombre->Visible) { // comprador_nombre ?>
	<div id="r_comprador_nombre" class="form-group">
		<label id="elh_pedidos_comprador_nombre" for="x_comprador_nombre" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->comprador_nombre->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->comprador_nombre->CellAttributes() ?>>
<span id="el_pedidos_comprador_nombre">
<input type="text" data-table="pedidos" data-field="x_comprador_nombre" name="x_comprador_nombre" id="x_comprador_nombre" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->comprador_nombre->getPlaceHolder()) ?>" value="<?php echo $pedidos->comprador_nombre->EditValue ?>"<?php echo $pedidos->comprador_nombre->EditAttributes() ?>>
</span>
<?php echo $pedidos->comprador_nombre->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->comprador_email->Visible) { // comprador_email ?>
	<div id="r_comprador_email" class="form-group">
		<label id="elh_pedidos_comprador_email" for="x_comprador_email" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->comprador_email->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->comprador_email->CellAttributes() ?>>
<span id="el_pedidos_comprador_email">
<input type="text" data-table="pedidos" data-field="x_comprador_email" name="x_comprador_email" id="x_comprador_email" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->comprador_email->getPlaceHolder()) ?>" value="<?php echo $pedidos->comprador_email->EditValue ?>"<?php echo $pedidos->comprador_email->EditAttributes() ?>>
</span>
<?php echo $pedidos->comprador_email->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->comprador_telefono->Visible) { // comprador_telefono ?>
	<div id="r_comprador_telefono" class="form-group">
		<label id="elh_pedidos_comprador_telefono" for="x_comprador_telefono" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->comprador_telefono->FldCaption() ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->comprador_telefono->CellAttributes() ?>>
<span id="el_pedidos_comprador_telefono">
<input type="text" data-table="pedidos" data-field="x_comprador_telefono" name="x_comprador_telefono" id="x_comprador_telefono" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->comprador_telefono->getPlaceHolder()) ?>" value="<?php echo $pedidos->comprador_telefono->EditValue ?>"<?php echo $pedidos->comprador_telefono->EditAttributes() ?>>
</span>
<?php echo $pedidos->comprador_telefono->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->direccion_envio->Visible) { // direccion_envio ?>
	<div id="r_direccion_envio" class="form-group">
		<label id="elh_pedidos_direccion_envio" for="x_direccion_envio" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->direccion_envio->FldCaption() ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->direccion_envio->CellAttributes() ?>>
<span id="el_pedidos_direccion_envio">
<input type="text" data-table="pedidos" data-field="x_direccion_envio" name="x_direccion_envio" id="x_direccion_envio" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->direccion_envio->getPlaceHolder()) ?>" value="<?php echo $pedidos->direccion_envio->EditValue ?>"<?php echo $pedidos->direccion_envio->EditAttributes() ?>>
</span>
<?php echo $pedidos->direccion_envio->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->mp_payment_id->Visible) { // mp_payment_id ?>
	<div id="r_mp_payment_id" class="form-group">
		<label id="elh_pedidos_mp_payment_id" for="x_mp_payment_id" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->mp_payment_id->FldCaption() ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->mp_payment_id->CellAttributes() ?>>
<span id="el_pedidos_mp_payment_id">
<input type="text" data-table="pedidos" data-field="x_mp_payment_id" name="x_mp_payment_id" id="x_mp_payment_id" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->mp_payment_id->getPlaceHolder()) ?>" value="<?php echo $pedidos->mp_payment_id->EditValue ?>"<?php echo $pedidos->mp_payment_id->EditAttributes() ?>>
</span>
<?php echo $pedidos->mp_payment_id->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->tarjeta_last4->Visible) { // tarjeta_last4 ?>
	<div id="r_tarjeta_last4" class="form-group">
		<label id="elh_pedidos_tarjeta_last4" for="x_tarjeta_last4" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->tarjeta_last4->FldCaption() ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->tarjeta_last4->CellAttributes() ?>>
<span id="el_pedidos_tarjeta_last4">
<input type="text" data-table="pedidos" data-field="x_tarjeta_last4" name="x_tarjeta_last4" id="x_tarjeta_last4" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->tarjeta_last4->getPlaceHolder()) ?>" value="<?php echo $pedidos->tarjeta_last4->EditValue ?>"<?php echo $pedidos->tarjeta_last4->EditAttributes() ?>>
</span>
<?php echo $pedidos->tarjeta_last4->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->tarjeta_payment_method->Visible) { // tarjeta_payment_method ?>
	<div id="r_tarjeta_payment_method" class="form-group">
		<label id="elh_pedidos_tarjeta_payment_method" for="x_tarjeta_payment_method" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->tarjeta_payment_method->FldCaption() ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->tarjeta_payment_method->CellAttributes() ?>>
<span id="el_pedidos_tarjeta_payment_method">
<input type="text" data-table="pedidos" data-field="x_tarjeta_payment_method" name="x_tarjeta_payment_method" id="x_tarjeta_payment_method" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->tarjeta_payment_method->getPlaceHolder()) ?>" value="<?php echo $pedidos->tarjeta_payment_method->EditValue ?>"<?php echo $pedidos->tarjeta_payment_method->EditAttributes() ?>>
</span>
<?php echo $pedidos->tarjeta_payment_method->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->transferencia_ref->Visible) { // transferencia_ref ?>
	<div id="r_transferencia_ref" class="form-group">
		<label id="elh_pedidos_transferencia_ref" for="x_transferencia_ref" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->transferencia_ref->FldCaption() ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->transferencia_ref->CellAttributes() ?>>
<span id="el_pedidos_transferencia_ref">
<input type="text" data-table="pedidos" data-field="x_transferencia_ref" name="x_transferencia_ref" id="x_transferencia_ref" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($pedidos->transferencia_ref->getPlaceHolder()) ?>" value="<?php echo $pedidos->transferencia_ref->EditValue ?>"<?php echo $pedidos->transferencia_ref->EditAttributes() ?>>
</span>
<?php echo $pedidos->transferencia_ref->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->mp_error_code->Visible) { // mp_error_code ?>
	<div id="r_mp_error_code" class="form-group">
		<label id="elh_pedidos_mp_error_code" for="x_mp_error_code" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->mp_error_code->FldCaption() ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->mp_error_code->CellAttributes() ?>>
<span id="el_pedidos_mp_error_code">
<input type="text" data-table="pedidos" data-field="x_mp_error_code" name="x_mp_error_code" id="x_mp_error_code" size="30" maxlength="64" placeholder="<?php echo ew_HtmlEncode($pedidos->mp_error_code->getPlaceHolder()) ?>" value="<?php echo $pedidos->mp_error_code->EditValue ?>"<?php echo $pedidos->mp_error_code->EditAttributes() ?>>
</span>
<?php echo $pedidos->mp_error_code->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->mp_error_message->Visible) { // mp_error_message ?>
	<div id="r_mp_error_message" class="form-group">
		<label id="elh_pedidos_mp_error_message" for="x_mp_error_message" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->mp_error_message->FldCaption() ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->mp_error_message->CellAttributes() ?>>
<span id="el_pedidos_mp_error_message">
<textarea data-table="pedidos" data-field="x_mp_error_message" name="x_mp_error_message" id="x_mp_error_message" cols="35" rows="4" placeholder="<?php echo ew_HtmlEncode($pedidos->mp_error_message->getPlaceHolder()) ?>"<?php echo $pedidos->mp_error_message->EditAttributes() ?>><?php echo $pedidos->mp_error_message->EditValue ?></textarea>
</span>
<?php echo $pedidos->mp_error_message->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->mp_response->Visible) { // mp_response ?>
	<div id="r_mp_response" class="form-group">
		<label id="elh_pedidos_mp_response" for="x_mp_response" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->mp_response->FldCaption() ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->mp_response->CellAttributes() ?>>
<span id="el_pedidos_mp_response">
<textarea data-table="pedidos" data-field="x_mp_response" name="x_mp_response" id="x_mp_response" cols="35" rows="4" placeholder="<?php echo ew_HtmlEncode($pedidos->mp_response->getPlaceHolder()) ?>"<?php echo $pedidos->mp_response->EditAttributes() ?>><?php echo $pedidos->mp_response->EditValue ?></textarea>
</span>
<?php echo $pedidos->mp_response->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->createdAt->Visible) { // createdAt ?>
	<div id="r_createdAt" class="form-group">
		<label id="elh_pedidos_createdAt" for="x_createdAt" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->createdAt->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->createdAt->CellAttributes() ?>>
<span id="el_pedidos_createdAt">
<input type="text" data-table="pedidos" data-field="x_createdAt" data-format="11" name="x_createdAt" id="x_createdAt" placeholder="<?php echo ew_HtmlEncode($pedidos->createdAt->getPlaceHolder()) ?>" value="<?php echo $pedidos->createdAt->EditValue ?>"<?php echo $pedidos->createdAt->EditAttributes() ?>>
<?php if (!$pedidos->createdAt->ReadOnly && !$pedidos->createdAt->Disabled && !isset($pedidos->createdAt->EditAttrs["readonly"]) && !isset($pedidos->createdAt->EditAttrs["disabled"])) { ?>
<script type="text/javascript">
ew_CreateDateTimePicker("fpedidosedit", "x_createdAt", {"ignoreReadonly":true,"useCurrent":false,"format":11});
</script>
<?php } ?>
</span>
<?php echo $pedidos->createdAt->CustomMsg ?></div></div>
	</div>
<?php } ?>
<?php if ($pedidos->updatedAt->Visible) { // updatedAt ?>
	<div id="r_updatedAt" class="form-group">
		<label id="elh_pedidos_updatedAt" for="x_updatedAt" class="<?php echo $pedidos_edit->LeftColumnClass ?>"><?php echo $pedidos->updatedAt->FldCaption() ?><?php echo $Language->Phrase("FieldRequiredIndicator") ?></label>
		<div class="<?php echo $pedidos_edit->RightColumnClass ?>"><div<?php echo $pedidos->updatedAt->CellAttributes() ?>>
<span id="el_pedidos_updatedAt">
<input type="text" data-table="pedidos" data-field="x_updatedAt" data-format="11" name="x_updatedAt" id="x_updatedAt" placeholder="<?php echo ew_HtmlEncode($pedidos->updatedAt->getPlaceHolder()) ?>" value="<?php echo $pedidos->updatedAt->EditValue ?>"<?php echo $pedidos->updatedAt->EditAttributes() ?>>
<?php if (!$pedidos->updatedAt->ReadOnly && !$pedidos->updatedAt->Disabled && !isset($pedidos->updatedAt->EditAttrs["readonly"]) && !isset($pedidos->updatedAt->EditAttrs["disabled"])) { ?>
<script type="text/javascript">
ew_CreateDateTimePicker("fpedidosedit", "x_updatedAt", {"ignoreReadonly":true,"useCurrent":false,"format":11});
</script>
<?php } ?>
</span>
<?php echo $pedidos->updatedAt->CustomMsg ?></div></div>
	</div>
<?php } ?>
</div><!-- /page* -->
<?php if (!$pedidos_edit->IsModal) { ?>
<div class="form-group"><!-- buttons .form-group -->
	<div class="<?php echo $pedidos_edit->OffsetColumnClass ?>"><!-- buttons offset -->
<button class="btn btn-primary ewButton" name="btnAction" id="btnAction" type="submit"><?php echo $Language->Phrase("SaveBtn") ?></button>
<button class="btn btn-default ewButton" name="btnCancel" id="btnCancel" type="button" data-href="<?php echo $pedidos_edit->getReturnUrl() ?>"><?php echo $Language->Phrase("CancelBtn") ?></button>
	</div><!-- /buttons offset -->
</div><!-- /buttons .form-group -->
<?php } ?>
</form>
<script type="text/javascript">
fpedidosedit.Init();
</script>
<?php
$pedidos_edit->ShowPageFooter();
if (EW_DEBUG_ENABLED)
	echo ew_DebugMsg();
?>
<script type="text/javascript">

// Write your table-specific startup script here
// document.write("page loaded");

</script>
<?php include_once "footer.php" ?>
<?php
$pedidos_edit->Page_Terminate();
?>
