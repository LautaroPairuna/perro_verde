<?php

// Global variable for table object
$pedidos = NULL;

//
// Table class for pedidos
//
class cpedidos extends cTable {
	var $id;
	var $datos;
	var $total;
	var $estado;
	var $metodo_pago;
	var $comprador_nombre;
	var $comprador_email;
	var $comprador_telefono;
	var $direccion_envio;
	var $mp_payment_id;
	var $tarjeta_last4;
	var $tarjeta_payment_method;
	var $transferencia_ref;
	var $mp_error_code;
	var $mp_error_message;
	var $mp_response;
	var $createdAt;
	var $updatedAt;

	//
	// Table class constructor
	//
	function __construct() {
		global $Language;

		// Language object
		if (!isset($Language)) $Language = new cLanguage();
		$this->TableVar = 'pedidos';
		$this->TableName = 'pedidos';
		$this->TableType = 'TABLE';

		// Update Table
		$this->UpdateTable = "`pedidos`";
		$this->DBID = 'DB';
		$this->ExportAll = TRUE;
		$this->ExportPageBreakCount = 0; // Page break per every n record (PDF only)
		$this->ExportPageOrientation = "portrait"; // Page orientation (PDF only)
		$this->ExportPageSize = "a4"; // Page size (PDF only)
		$this->ExportExcelPageOrientation = ""; // Page orientation (PHPExcel only)
		$this->ExportExcelPageSize = ""; // Page size (PHPExcel only)
		$this->ExportWordColumnWidth = NULL; // Cell width (PHPWord only)
		$this->DetailAdd = FALSE; // Allow detail add
		$this->DetailEdit = FALSE; // Allow detail edit
		$this->DetailView = FALSE; // Allow detail view
		$this->ShowMultipleDetails = FALSE; // Show multiple details
		$this->GridAddRowCount = 5;
		$this->AllowAddDeleteRow = ew_AllowAddDeleteRow(); // Allow add/delete row
		$this->UserIDAllowSecurity = 0; // User ID Allow
		$this->BasicSearch = new cBasicSearch($this->TableVar);

		// id
		$this->id = new cField('pedidos', 'pedidos', 'x_id', 'id', '`id`', '`id`', 3, -1, FALSE, '`id`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'NO');
		$this->id->Sortable = TRUE; // Allow sort
		$this->id->FldDefaultErrMsg = $Language->Phrase("IncorrectInteger");
		$this->fields['id'] = &$this->id;

		// datos
		$this->datos = new cField('pedidos', 'pedidos', 'x_datos', 'datos', '`datos`', '`datos`', 201, -1, FALSE, '`datos`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXTAREA');
		$this->datos->Sortable = TRUE; // Allow sort
		$this->fields['datos'] = &$this->datos;

		// total
		$this->total = new cField('pedidos', 'pedidos', 'x_total', 'total', '`total`', '`total`', 131, -1, FALSE, '`total`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->total->Sortable = TRUE; // Allow sort
		$this->total->FldDefaultErrMsg = $Language->Phrase("IncorrectFloat");
		$this->fields['total'] = &$this->total;

		// estado
		$this->estado = new cField('pedidos', 'pedidos', 'x_estado', 'estado', '`estado`', '`estado`', 200, -1, FALSE, '`estado`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->estado->Sortable = TRUE; // Allow sort
		$this->fields['estado'] = &$this->estado;

		// metodo_pago
		$this->metodo_pago = new cField('pedidos', 'pedidos', 'x_metodo_pago', 'metodo_pago', '`metodo_pago`', '`metodo_pago`', 200, -1, FALSE, '`metodo_pago`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->metodo_pago->Sortable = TRUE; // Allow sort
		$this->fields['metodo_pago'] = &$this->metodo_pago;

		// comprador_nombre
		$this->comprador_nombre = new cField('pedidos', 'pedidos', 'x_comprador_nombre', 'comprador_nombre', '`comprador_nombre`', '`comprador_nombre`', 200, -1, FALSE, '`comprador_nombre`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->comprador_nombre->Sortable = TRUE; // Allow sort
		$this->fields['comprador_nombre'] = &$this->comprador_nombre;

		// comprador_email
		$this->comprador_email = new cField('pedidos', 'pedidos', 'x_comprador_email', 'comprador_email', '`comprador_email`', '`comprador_email`', 200, -1, FALSE, '`comprador_email`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->comprador_email->Sortable = TRUE; // Allow sort
		$this->fields['comprador_email'] = &$this->comprador_email;

		// comprador_telefono
		$this->comprador_telefono = new cField('pedidos', 'pedidos', 'x_comprador_telefono', 'comprador_telefono', '`comprador_telefono`', '`comprador_telefono`', 200, -1, FALSE, '`comprador_telefono`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->comprador_telefono->Sortable = TRUE; // Allow sort
		$this->fields['comprador_telefono'] = &$this->comprador_telefono;

		// direccion_envio
		$this->direccion_envio = new cField('pedidos', 'pedidos', 'x_direccion_envio', 'direccion_envio', '`direccion_envio`', '`direccion_envio`', 200, -1, FALSE, '`direccion_envio`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->direccion_envio->Sortable = TRUE; // Allow sort
		$this->fields['direccion_envio'] = &$this->direccion_envio;

		// mp_payment_id
		$this->mp_payment_id = new cField('pedidos', 'pedidos', 'x_mp_payment_id', 'mp_payment_id', '`mp_payment_id`', '`mp_payment_id`', 200, -1, FALSE, '`mp_payment_id`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->mp_payment_id->Sortable = TRUE; // Allow sort
		$this->fields['mp_payment_id'] = &$this->mp_payment_id;

		// tarjeta_last4
		$this->tarjeta_last4 = new cField('pedidos', 'pedidos', 'x_tarjeta_last4', 'tarjeta_last4', '`tarjeta_last4`', '`tarjeta_last4`', 200, -1, FALSE, '`tarjeta_last4`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->tarjeta_last4->Sortable = TRUE; // Allow sort
		$this->fields['tarjeta_last4'] = &$this->tarjeta_last4;

		// tarjeta_payment_method
		$this->tarjeta_payment_method = new cField('pedidos', 'pedidos', 'x_tarjeta_payment_method', 'tarjeta_payment_method', '`tarjeta_payment_method`', '`tarjeta_payment_method`', 200, -1, FALSE, '`tarjeta_payment_method`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->tarjeta_payment_method->Sortable = TRUE; // Allow sort
		$this->fields['tarjeta_payment_method'] = &$this->tarjeta_payment_method;

		// transferencia_ref
		$this->transferencia_ref = new cField('pedidos', 'pedidos', 'x_transferencia_ref', 'transferencia_ref', '`transferencia_ref`', '`transferencia_ref`', 200, -1, FALSE, '`transferencia_ref`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->transferencia_ref->Sortable = TRUE; // Allow sort
		$this->fields['transferencia_ref'] = &$this->transferencia_ref;

		// mp_error_code
		$this->mp_error_code = new cField('pedidos', 'pedidos', 'x_mp_error_code', 'mp_error_code', '`mp_error_code`', '`mp_error_code`', 200, -1, FALSE, '`mp_error_code`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->mp_error_code->Sortable = TRUE; // Allow sort
		$this->fields['mp_error_code'] = &$this->mp_error_code;

		// mp_error_message
		$this->mp_error_message = new cField('pedidos', 'pedidos', 'x_mp_error_message', 'mp_error_message', '`mp_error_message`', '`mp_error_message`', 201, -1, FALSE, '`mp_error_message`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXTAREA');
		$this->mp_error_message->Sortable = TRUE; // Allow sort
		$this->fields['mp_error_message'] = &$this->mp_error_message;

		// mp_response
		$this->mp_response = new cField('pedidos', 'pedidos', 'x_mp_response', 'mp_response', '`mp_response`', '`mp_response`', 201, -1, FALSE, '`mp_response`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXTAREA');
		$this->mp_response->Sortable = TRUE; // Allow sort
		$this->fields['mp_response'] = &$this->mp_response;

		// createdAt
		$this->createdAt = new cField('pedidos', 'pedidos', 'x_createdAt', 'createdAt', '`createdAt`', ew_CastDateFieldForLike('`createdAt`', 11, "DB"), 135, 11, FALSE, '`createdAt`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->createdAt->Sortable = TRUE; // Allow sort
		$this->createdAt->FldDefaultErrMsg = str_replace("%s", $GLOBALS["EW_DATE_SEPARATOR"], $Language->Phrase("IncorrectDateDMY"));
		$this->fields['createdAt'] = &$this->createdAt;

		// updatedAt
		$this->updatedAt = new cField('pedidos', 'pedidos', 'x_updatedAt', 'updatedAt', '`updatedAt`', ew_CastDateFieldForLike('`updatedAt`', 11, "DB"), 135, 11, FALSE, '`updatedAt`', FALSE, FALSE, FALSE, 'FORMATTED TEXT', 'TEXT');
		$this->updatedAt->Sortable = TRUE; // Allow sort
		$this->updatedAt->FldDefaultErrMsg = str_replace("%s", $GLOBALS["EW_DATE_SEPARATOR"], $Language->Phrase("IncorrectDateDMY"));
		$this->fields['updatedAt'] = &$this->updatedAt;
	}

	// Set Field Visibility
	function SetFieldVisibility($fldparm) {
		global $Security;
		return $this->$fldparm->Visible; // Returns original value
	}

	// Column CSS classes
	var $LeftColumnClass = "col-sm-2 control-label ewLabel";
	var $RightColumnClass = "col-sm-10";
	var $OffsetColumnClass = "col-sm-10 col-sm-offset-2";

	// Set left column class (must be predefined col-*-* classes of Bootstrap grid system)
	function SetLeftColumnClass($class) {
		if (preg_match('/^col\-(\w+)\-(\d+)$/', $class, $match)) {
			$this->LeftColumnClass = $class . " control-label ewLabel";
			$this->RightColumnClass = "col-" . $match[1] . "-" . strval(12 - intval($match[2]));
			$this->OffsetColumnClass = $this->RightColumnClass . " " . str_replace($match[1], $match[1] + "-offset", $this->LeftColumnClass);
		}
	}

	// Multiple column sort
	function UpdateSort(&$ofld, $ctrl) {
		if ($this->CurrentOrder == $ofld->FldName) {
			$sSortField = $ofld->FldExpression;
			$sLastSort = $ofld->getSort();
			if ($this->CurrentOrderType == "ASC" || $this->CurrentOrderType == "DESC") {
				$sThisSort = $this->CurrentOrderType;
			} else {
				$sThisSort = ($sLastSort == "ASC") ? "DESC" : "ASC";
			}
			$ofld->setSort($sThisSort);
			if ($ctrl) {
				$sOrderBy = $this->getSessionOrderBy();
				if (strpos($sOrderBy, $sSortField . " " . $sLastSort) !== FALSE) {
					$sOrderBy = str_replace($sSortField . " " . $sLastSort, $sSortField . " " . $sThisSort, $sOrderBy);
				} else {
					if ($sOrderBy <> "") $sOrderBy .= ", ";
					$sOrderBy .= $sSortField . " " . $sThisSort;
				}
				$this->setSessionOrderBy($sOrderBy); // Save to Session
			} else {
				$this->setSessionOrderBy($sSortField . " " . $sThisSort); // Save to Session
			}
		} else {
			if (!$ctrl) $ofld->setSort("");
		}
	}

	// Table level SQL
	var $_SqlFrom = "";

	function getSqlFrom() { // From
		return ($this->_SqlFrom <> "") ? $this->_SqlFrom : "`pedidos`";
	}

	function SqlFrom() { // For backward compatibility
		return $this->getSqlFrom();
	}

	function setSqlFrom($v) {
		$this->_SqlFrom = $v;
	}
	var $_SqlSelect = "";

	function getSqlSelect() { // Select
		return ($this->_SqlSelect <> "") ? $this->_SqlSelect : "SELECT * FROM " . $this->getSqlFrom();
	}

	function SqlSelect() { // For backward compatibility
		return $this->getSqlSelect();
	}

	function setSqlSelect($v) {
		$this->_SqlSelect = $v;
	}
	var $_SqlWhere = "";

	function getSqlWhere() { // Where
		$sWhere = ($this->_SqlWhere <> "") ? $this->_SqlWhere : "";
		$this->TableFilter = "";
		ew_AddFilter($sWhere, $this->TableFilter);
		return $sWhere;
	}

	function SqlWhere() { // For backward compatibility
		return $this->getSqlWhere();
	}

	function setSqlWhere($v) {
		$this->_SqlWhere = $v;
	}
	var $_SqlGroupBy = "";

	function getSqlGroupBy() { // Group By
		return ($this->_SqlGroupBy <> "") ? $this->_SqlGroupBy : "";
	}

	function SqlGroupBy() { // For backward compatibility
		return $this->getSqlGroupBy();
	}

	function setSqlGroupBy($v) {
		$this->_SqlGroupBy = $v;
	}
	var $_SqlHaving = "";

	function getSqlHaving() { // Having
		return ($this->_SqlHaving <> "") ? $this->_SqlHaving : "";
	}

	function SqlHaving() { // For backward compatibility
		return $this->getSqlHaving();
	}

	function setSqlHaving($v) {
		$this->_SqlHaving = $v;
	}
	var $_SqlOrderBy = "";

	function getSqlOrderBy() { // Order By
		return ($this->_SqlOrderBy <> "") ? $this->_SqlOrderBy : "`createdAt` DESC,`id` DESC";
	}

	function SqlOrderBy() { // For backward compatibility
		return $this->getSqlOrderBy();
	}

	function setSqlOrderBy($v) {
		$this->_SqlOrderBy = $v;
	}

	// Apply User ID filters
	function ApplyUserIDFilters($sFilter) {
		return $sFilter;
	}

	// Check if User ID security allows view all
	function UserIDAllow($id = "") {
		$allow = EW_USER_ID_ALLOW;
		switch ($id) {
			case "add":
			case "copy":
			case "gridadd":
			case "register":
			case "addopt":
				return (($allow & 1) == 1);
			case "edit":
			case "gridedit":
			case "update":
			case "changepwd":
			case "forgotpwd":
				return (($allow & 4) == 4);
			case "delete":
				return (($allow & 2) == 2);
			case "view":
				return (($allow & 32) == 32);
			case "search":
				return (($allow & 64) == 64);
			default:
				return (($allow & 8) == 8);
		}
	}

	// Get SQL
	function GetSQL($where, $orderby) {
		return ew_BuildSelectSql($this->getSqlSelect(), $this->getSqlWhere(),
			$this->getSqlGroupBy(), $this->getSqlHaving(), $this->getSqlOrderBy(),
			$where, $orderby);
	}

	// Table SQL
	function SQL() {
		$sFilter = $this->CurrentFilter;
		$sFilter = $this->ApplyUserIDFilters($sFilter);
		$sSort = $this->getSessionOrderBy();
		return ew_BuildSelectSql($this->getSqlSelect(), $this->getSqlWhere(),
			$this->getSqlGroupBy(), $this->getSqlHaving(), $this->getSqlOrderBy(),
			$sFilter, $sSort);
	}

	// Table SQL with List page filter
	var $UseSessionForListSQL = TRUE;

	function ListSQL() {
		$sFilter = $this->UseSessionForListSQL ? $this->getSessionWhere() : "";
		ew_AddFilter($sFilter, $this->CurrentFilter);
		$sFilter = $this->ApplyUserIDFilters($sFilter);
		$this->Recordset_Selecting($sFilter);
		$sSelect = $this->getSqlSelect();
		$sSort = $this->UseSessionForListSQL ? $this->getSessionOrderBy() : "";
		return ew_BuildSelectSql($sSelect, $this->getSqlWhere(), $this->getSqlGroupBy(),
			$this->getSqlHaving(), $this->getSqlOrderBy(), $sFilter, $sSort);
	}

	// Get ORDER BY clause
	function GetOrderBy() {
		$sSort = $this->getSessionOrderBy();
		return ew_BuildSelectSql("", "", "", "", $this->getSqlOrderBy(), "", $sSort);
	}

	// Try to get record count
	function TryGetRecordCount($sSql) {
		$cnt = -1;
		if (($this->TableType == 'TABLE' || $this->TableType == 'VIEW' || $this->TableType == 'LINKTABLE') && preg_match("/^SELECT \* FROM/i", $sSql)) {
			$sSql = "SELECT COUNT(*) FROM" . preg_replace('/^SELECT\s([\s\S]+)?\*\sFROM/i', "", $sSql);
			$sOrderBy = $this->GetOrderBy();
			if (substr($sSql, strlen($sOrderBy) * -1) == $sOrderBy)
				$sSql = substr($sSql, 0, strlen($sSql) - strlen($sOrderBy)); // Remove ORDER BY clause
		} else {
			$sSql = "SELECT COUNT(*) FROM (" . $sSql . ") EW_COUNT_TABLE";
		}
		$conn = &$this->Connection();
		if ($rs = $conn->Execute($sSql)) {
			if (!$rs->EOF && $rs->FieldCount() > 0) {
				$cnt = $rs->fields[0];
				$rs->Close();
			}
		}
		return intval($cnt);
	}

	// Get record count based on filter (for detail record count in master table pages)
	function LoadRecordCount($sFilter) {
		$origFilter = $this->CurrentFilter;
		$this->CurrentFilter = $sFilter;
		$this->Recordset_Selecting($this->CurrentFilter);

		//$sSql = $this->SQL();
		$sSql = $this->GetSQL($this->CurrentFilter, "");
		$cnt = $this->TryGetRecordCount($sSql);
		if ($cnt == -1) {
			if ($rs = $this->LoadRs($this->CurrentFilter)) {
				$cnt = $rs->RecordCount();
				$rs->Close();
			}
		}
		$this->CurrentFilter = $origFilter;
		return intval($cnt);
	}

	// Get record count (for current List page)
	function ListRecordCount() {
		$sSql = $this->ListSQL();
		$cnt = $this->TryGetRecordCount($sSql);
		if ($cnt == -1) {
			$conn = &$this->Connection();
			if ($rs = $conn->Execute($sSql)) {
				$cnt = $rs->RecordCount();
				$rs->Close();
			}
		}
		return intval($cnt);
	}

	// INSERT statement
	function InsertSQL(&$rs) {
		$names = "";
		$values = "";
		foreach ($rs as $name => $value) {
			if (!isset($this->fields[$name]) || $this->fields[$name]->FldIsCustom)
				continue;
			$names .= $this->fields[$name]->FldExpression . ",";
			$values .= ew_QuotedValue($value, $this->fields[$name]->FldDataType, $this->DBID) . ",";
		}
		while (substr($names, -1) == ",")
			$names = substr($names, 0, -1);
		while (substr($values, -1) == ",")
			$values = substr($values, 0, -1);
		return "INSERT INTO " . $this->UpdateTable . " ($names) VALUES ($values)";
	}

	// Insert
	function Insert(&$rs) {
		$conn = &$this->Connection();
		$bInsert = $conn->Execute($this->InsertSQL($rs));
		if ($bInsert) {

			// Get insert id if necessary
			$this->id->setDbValue($conn->Insert_ID());
			$rs['id'] = $this->id->DbValue;
		}
		return $bInsert;
	}

	// UPDATE statement
	function UpdateSQL(&$rs, $where = "", $curfilter = TRUE) {
		$sql = "UPDATE " . $this->UpdateTable . " SET ";
		foreach ($rs as $name => $value) {
			if (!isset($this->fields[$name]) || $this->fields[$name]->FldIsCustom)
				continue;
			$sql .= $this->fields[$name]->FldExpression . "=";
			$sql .= ew_QuotedValue($value, $this->fields[$name]->FldDataType, $this->DBID) . ",";
		}
		while (substr($sql, -1) == ",")
			$sql = substr($sql, 0, -1);
		$filter = ($curfilter) ? $this->CurrentFilter : "";
		if (is_array($where))
			$where = $this->ArrayToFilter($where);
		ew_AddFilter($filter, $where);
		if ($filter <> "")	$sql .= " WHERE " . $filter;
		return $sql;
	}

	// Update
	function Update(&$rs, $where = "", $rsold = NULL, $curfilter = TRUE) {
		$conn = &$this->Connection();
		$bUpdate = $conn->Execute($this->UpdateSQL($rs, $where, $curfilter));
		return $bUpdate;
	}

	// DELETE statement
	function DeleteSQL(&$rs, $where = "", $curfilter = TRUE) {
		$sql = "DELETE FROM " . $this->UpdateTable . " WHERE ";
		if (is_array($where))
			$where = $this->ArrayToFilter($where);
		if ($rs) {
			if (array_key_exists('id', $rs))
				ew_AddFilter($where, ew_QuotedName('id', $this->DBID) . '=' . ew_QuotedValue($rs['id'], $this->id->FldDataType, $this->DBID));
		}
		$filter = ($curfilter) ? $this->CurrentFilter : "";
		ew_AddFilter($filter, $where);
		if ($filter <> "")
			$sql .= $filter;
		else
			$sql .= "0=1"; // Avoid delete
		return $sql;
	}

	// Delete
	function Delete(&$rs, $where = "", $curfilter = TRUE) {
		$bDelete = TRUE;
		$conn = &$this->Connection();
		if ($bDelete)
			$bDelete = $conn->Execute($this->DeleteSQL($rs, $where, $curfilter));
		return $bDelete;
	}

	// Key filter WHERE clause
	function SqlKeyFilter() {
		return "`id` = @id@";
	}

	// Key filter
	function KeyFilter() {
		$sKeyFilter = $this->SqlKeyFilter();
		if (!is_numeric($this->id->CurrentValue))
			return "0=1"; // Invalid key
		if (is_null($this->id->CurrentValue))
			return "0=1"; // Invalid key
		else
			$sKeyFilter = str_replace("@id@", ew_AdjustSql($this->id->CurrentValue, $this->DBID), $sKeyFilter); // Replace key value
		return $sKeyFilter;
	}

	// Return page URL
	function getReturnUrl() {
		$name = EW_PROJECT_NAME . "_" . $this->TableVar . "_" . EW_TABLE_RETURN_URL;

		// Get referer URL automatically
		if (ew_ServerVar("HTTP_REFERER") <> "" && ew_ReferPage() <> ew_CurrentPage() && ew_ReferPage() <> "login.php") // Referer not same page or login page
			$_SESSION[$name] = ew_ServerVar("HTTP_REFERER"); // Save to Session
		if (@$_SESSION[$name] <> "") {
			return $_SESSION[$name];
		} else {
			return "pedidoslist.php";
		}
	}

	function setReturnUrl($v) {
		$_SESSION[EW_PROJECT_NAME . "_" . $this->TableVar . "_" . EW_TABLE_RETURN_URL] = $v;
	}

	// Get modal caption
	function GetModalCaption($pageName) {
		global $Language;
		if ($pageName == "pedidosview.php")
			return $Language->Phrase("View");
		elseif ($pageName == "pedidosedit.php")
			return $Language->Phrase("Edit");
		elseif ($pageName == "pedidosadd.php")
			return $Language->Phrase("Add");
		else
			return "";
	}

	// List URL
	function GetListUrl() {
		return "pedidoslist.php";
	}

	// View URL
	function GetViewUrl($parm = "") {
		if ($parm <> "")
			$url = $this->KeyUrl("pedidosview.php", $this->UrlParm($parm));
		else
			$url = $this->KeyUrl("pedidosview.php", $this->UrlParm(EW_TABLE_SHOW_DETAIL . "="));
		return $this->AddMasterUrl($url);
	}

	// Add URL
	function GetAddUrl($parm = "") {
		if ($parm <> "")
			$url = "pedidosadd.php?" . $this->UrlParm($parm);
		else
			$url = "pedidosadd.php";
		return $this->AddMasterUrl($url);
	}

	// Edit URL
	function GetEditUrl($parm = "") {
		$url = $this->KeyUrl("pedidosedit.php", $this->UrlParm($parm));
		return $this->AddMasterUrl($url);
	}

	// Inline edit URL
	function GetInlineEditUrl() {
		$url = $this->KeyUrl(ew_CurrentPage(), $this->UrlParm("a=edit"));
		return $this->AddMasterUrl($url);
	}

	// Copy URL
	function GetCopyUrl($parm = "") {
		$url = $this->KeyUrl("pedidosadd.php", $this->UrlParm($parm));
		return $this->AddMasterUrl($url);
	}

	// Inline copy URL
	function GetInlineCopyUrl() {
		$url = $this->KeyUrl(ew_CurrentPage(), $this->UrlParm("a=copy"));
		return $this->AddMasterUrl($url);
	}

	// Delete URL
	function GetDeleteUrl() {
		return $this->KeyUrl("pedidosdelete.php", $this->UrlParm());
	}

	// Add master url
	function AddMasterUrl($url) {
		return $url;
	}

	function KeyToJson() {
		$json = "";
		$json .= "id:" . ew_VarToJson($this->id->CurrentValue, "number", "'");
		return "{" . $json . "}";
	}

	// Add key value to URL
	function KeyUrl($url, $parm = "") {
		$sUrl = $url . "?";
		if ($parm <> "") $sUrl .= $parm . "&";
		if (!is_null($this->id->CurrentValue)) {
			$sUrl .= "id=" . urlencode($this->id->CurrentValue);
		} else {
			return "javascript:ew_Alert(ewLanguage.Phrase('InvalidRecord'));";
		}
		return $sUrl;
	}

	// Sort URL
	function SortUrl(&$fld) {
		if ($this->CurrentAction <> "" || $this->Export <> "" ||
			in_array($fld->FldType, array(128, 204, 205))) { // Unsortable data type
				return "";
		} elseif ($fld->Sortable) {
			$sUrlParm = $this->UrlParm("order=" . urlencode($fld->FldName) . "&amp;ordertype=" . $fld->ReverseSort());
			return $this->AddMasterUrl(ew_CurrentPage() . "?" . $sUrlParm);
		} else {
			return "";
		}
	}

	// Get record keys from $_POST/$_GET/$_SESSION
	function GetRecordKeys() {
		global $EW_COMPOSITE_KEY_SEPARATOR;
		$arKeys = array();
		$arKey = array();
		if (isset($_POST["key_m"])) {
			$arKeys = $_POST["key_m"];
			$cnt = count($arKeys);
		} elseif (isset($_GET["key_m"])) {
			$arKeys = $_GET["key_m"];
			$cnt = count($arKeys);
		} elseif (!empty($_GET) || !empty($_POST)) {
			$isPost = ew_IsPost();
			if ($isPost && isset($_POST["id"]))
				$arKeys[] = $_POST["id"];
			elseif (isset($_GET["id"]))
				$arKeys[] = $_GET["id"];
			else
				$arKeys = NULL; // Do not setup

			//return $arKeys; // Do not return yet, so the values will also be checked by the following code
		}

		// Check keys
		$ar = array();
		if (is_array($arKeys)) {
			foreach ($arKeys as $key) {
				if (!is_numeric($key))
					continue;
				$ar[] = $key;
			}
		}
		return $ar;
	}

	// Get key filter
	function GetKeyFilter() {
		$arKeys = $this->GetRecordKeys();
		$sKeyFilter = "";
		foreach ($arKeys as $key) {
			if ($sKeyFilter <> "") $sKeyFilter .= " OR ";
			$this->id->CurrentValue = $key;
			$sKeyFilter .= "(" . $this->KeyFilter() . ")";
		}
		return $sKeyFilter;
	}

	// Load rows based on filter
	function &LoadRs($sFilter) {

		// Set up filter (SQL WHERE clause) and get return SQL
		//$this->CurrentFilter = $sFilter;
		//$sSql = $this->SQL();

		$sSql = $this->GetSQL($sFilter, "");
		$conn = &$this->Connection();
		$rs = $conn->Execute($sSql);
		return $rs;
	}

	// Load row values from recordset
	function LoadListRowValues(&$rs) {
		$this->id->setDbValue($rs->fields('id'));
		$this->datos->setDbValue($rs->fields('datos'));
		$this->total->setDbValue($rs->fields('total'));
		$this->estado->setDbValue($rs->fields('estado'));
		$this->metodo_pago->setDbValue($rs->fields('metodo_pago'));
		$this->comprador_nombre->setDbValue($rs->fields('comprador_nombre'));
		$this->comprador_email->setDbValue($rs->fields('comprador_email'));
		$this->comprador_telefono->setDbValue($rs->fields('comprador_telefono'));
		$this->direccion_envio->setDbValue($rs->fields('direccion_envio'));
		$this->mp_payment_id->setDbValue($rs->fields('mp_payment_id'));
		$this->tarjeta_last4->setDbValue($rs->fields('tarjeta_last4'));
		$this->tarjeta_payment_method->setDbValue($rs->fields('tarjeta_payment_method'));
		$this->transferencia_ref->setDbValue($rs->fields('transferencia_ref'));
		$this->mp_error_code->setDbValue($rs->fields('mp_error_code'));
		$this->mp_error_message->setDbValue($rs->fields('mp_error_message'));
		$this->mp_response->setDbValue($rs->fields('mp_response'));
		$this->createdAt->setDbValue($rs->fields('createdAt'));
		$this->updatedAt->setDbValue($rs->fields('updatedAt'));
	}

	// Render list row values
	function RenderListRow() {
		global $Security, $gsLanguage, $Language;

		// Call Row Rendering event
		$this->Row_Rendering();

	// Common render codes
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

		// Call Row Rendered event
		$this->Row_Rendered();

		// Save data for Custom Template
		$this->Rows[] = $this->CustomTemplateFieldValues();
	}

	// Render edit row values
	function RenderEditRow() {
		global $Security, $gsLanguage, $Language;

		// Call Row Rendering event
		$this->Row_Rendering();

		// id
		$this->id->EditAttrs["class"] = "form-control";
		$this->id->EditCustomAttributes = "";
		$this->id->EditValue = $this->id->CurrentValue;
		$this->id->ViewCustomAttributes = "";

		// datos
		$this->datos->EditAttrs["class"] = "form-control";
		$this->datos->EditCustomAttributes = "";
		$this->datos->EditValue = $this->datos->CurrentValue;
		$this->datos->PlaceHolder = ew_RemoveHtml($this->datos->FldCaption());

		// total
		$this->total->EditAttrs["class"] = "form-control";
		$this->total->EditCustomAttributes = "";
		$this->total->EditValue = $this->total->CurrentValue;
		$this->total->PlaceHolder = ew_RemoveHtml($this->total->FldCaption());
		if (strval($this->total->EditValue) <> "" && is_numeric($this->total->EditValue)) $this->total->EditValue = ew_FormatNumber($this->total->EditValue, -2, -1, -2, 0);

		// estado
		$this->estado->EditAttrs["class"] = "form-control";
		$this->estado->EditCustomAttributes = "";
		$this->estado->EditValue = $this->estado->CurrentValue;
		$this->estado->PlaceHolder = ew_RemoveHtml($this->estado->FldCaption());

		// metodo_pago
		$this->metodo_pago->EditAttrs["class"] = "form-control";
		$this->metodo_pago->EditCustomAttributes = "";
		$this->metodo_pago->EditValue = $this->metodo_pago->CurrentValue;
		$this->metodo_pago->PlaceHolder = ew_RemoveHtml($this->metodo_pago->FldCaption());

		// comprador_nombre
		$this->comprador_nombre->EditAttrs["class"] = "form-control";
		$this->comprador_nombre->EditCustomAttributes = "";
		$this->comprador_nombre->EditValue = $this->comprador_nombre->CurrentValue;
		$this->comprador_nombre->PlaceHolder = ew_RemoveHtml($this->comprador_nombre->FldCaption());

		// comprador_email
		$this->comprador_email->EditAttrs["class"] = "form-control";
		$this->comprador_email->EditCustomAttributes = "";
		$this->comprador_email->EditValue = $this->comprador_email->CurrentValue;
		$this->comprador_email->PlaceHolder = ew_RemoveHtml($this->comprador_email->FldCaption());

		// comprador_telefono
		$this->comprador_telefono->EditAttrs["class"] = "form-control";
		$this->comprador_telefono->EditCustomAttributes = "";
		$this->comprador_telefono->EditValue = $this->comprador_telefono->CurrentValue;
		$this->comprador_telefono->PlaceHolder = ew_RemoveHtml($this->comprador_telefono->FldCaption());

		// direccion_envio
		$this->direccion_envio->EditAttrs["class"] = "form-control";
		$this->direccion_envio->EditCustomAttributes = "";
		$this->direccion_envio->EditValue = $this->direccion_envio->CurrentValue;
		$this->direccion_envio->PlaceHolder = ew_RemoveHtml($this->direccion_envio->FldCaption());

		// mp_payment_id
		$this->mp_payment_id->EditAttrs["class"] = "form-control";
		$this->mp_payment_id->EditCustomAttributes = "";
		$this->mp_payment_id->EditValue = $this->mp_payment_id->CurrentValue;
		$this->mp_payment_id->PlaceHolder = ew_RemoveHtml($this->mp_payment_id->FldCaption());

		// tarjeta_last4
		$this->tarjeta_last4->EditAttrs["class"] = "form-control";
		$this->tarjeta_last4->EditCustomAttributes = "";
		$this->tarjeta_last4->EditValue = $this->tarjeta_last4->CurrentValue;
		$this->tarjeta_last4->PlaceHolder = ew_RemoveHtml($this->tarjeta_last4->FldCaption());

		// tarjeta_payment_method
		$this->tarjeta_payment_method->EditAttrs["class"] = "form-control";
		$this->tarjeta_payment_method->EditCustomAttributes = "";
		$this->tarjeta_payment_method->EditValue = $this->tarjeta_payment_method->CurrentValue;
		$this->tarjeta_payment_method->PlaceHolder = ew_RemoveHtml($this->tarjeta_payment_method->FldCaption());

		// transferencia_ref
		$this->transferencia_ref->EditAttrs["class"] = "form-control";
		$this->transferencia_ref->EditCustomAttributes = "";
		$this->transferencia_ref->EditValue = $this->transferencia_ref->CurrentValue;
		$this->transferencia_ref->PlaceHolder = ew_RemoveHtml($this->transferencia_ref->FldCaption());

		// mp_error_code
		$this->mp_error_code->EditAttrs["class"] = "form-control";
		$this->mp_error_code->EditCustomAttributes = "";
		$this->mp_error_code->EditValue = $this->mp_error_code->CurrentValue;
		$this->mp_error_code->PlaceHolder = ew_RemoveHtml($this->mp_error_code->FldCaption());

		// mp_error_message
		$this->mp_error_message->EditAttrs["class"] = "form-control";
		$this->mp_error_message->EditCustomAttributes = "";
		$this->mp_error_message->EditValue = $this->mp_error_message->CurrentValue;
		$this->mp_error_message->PlaceHolder = ew_RemoveHtml($this->mp_error_message->FldCaption());

		// mp_response
		$this->mp_response->EditAttrs["class"] = "form-control";
		$this->mp_response->EditCustomAttributes = "";
		$this->mp_response->EditValue = $this->mp_response->CurrentValue;
		$this->mp_response->PlaceHolder = ew_RemoveHtml($this->mp_response->FldCaption());

		// createdAt
		$this->createdAt->EditAttrs["class"] = "form-control";
		$this->createdAt->EditCustomAttributes = "";
		$this->createdAt->EditValue = ew_FormatDateTime($this->createdAt->CurrentValue, 11);
		$this->createdAt->PlaceHolder = ew_RemoveHtml($this->createdAt->FldCaption());

		// updatedAt
		$this->updatedAt->EditAttrs["class"] = "form-control";
		$this->updatedAt->EditCustomAttributes = "";
		$this->updatedAt->EditValue = ew_FormatDateTime($this->updatedAt->CurrentValue, 11);
		$this->updatedAt->PlaceHolder = ew_RemoveHtml($this->updatedAt->FldCaption());

		// Call Row Rendered event
		$this->Row_Rendered();
	}

	// Aggregate list row values
	function AggregateListRowValues() {
	}

	// Aggregate list row (for rendering)
	function AggregateListRow() {

		// Call Row Rendered event
		$this->Row_Rendered();
	}
	var $ExportDoc;

	// Export data in HTML/CSV/Word/Excel/Email/PDF format
	function ExportDocument(&$Doc, &$Recordset, $StartRec, $StopRec, $ExportPageType = "") {
		if (!$Recordset || !$Doc)
			return;
		if (!$Doc->ExportCustom) {

			// Write header
			$Doc->ExportTableHeader();
			if ($Doc->Horizontal) { // Horizontal format, write header
				$Doc->BeginExportRow();
				if ($ExportPageType == "view") {
					if ($this->id->Exportable) $Doc->ExportCaption($this->id);
					if ($this->datos->Exportable) $Doc->ExportCaption($this->datos);
					if ($this->total->Exportable) $Doc->ExportCaption($this->total);
					if ($this->estado->Exportable) $Doc->ExportCaption($this->estado);
					if ($this->metodo_pago->Exportable) $Doc->ExportCaption($this->metodo_pago);
					if ($this->comprador_nombre->Exportable) $Doc->ExportCaption($this->comprador_nombre);
					if ($this->comprador_email->Exportable) $Doc->ExportCaption($this->comprador_email);
					if ($this->comprador_telefono->Exportable) $Doc->ExportCaption($this->comprador_telefono);
					if ($this->direccion_envio->Exportable) $Doc->ExportCaption($this->direccion_envio);
					if ($this->mp_payment_id->Exportable) $Doc->ExportCaption($this->mp_payment_id);
					if ($this->tarjeta_last4->Exportable) $Doc->ExportCaption($this->tarjeta_last4);
					if ($this->tarjeta_payment_method->Exportable) $Doc->ExportCaption($this->tarjeta_payment_method);
					if ($this->transferencia_ref->Exportable) $Doc->ExportCaption($this->transferencia_ref);
					if ($this->mp_error_code->Exportable) $Doc->ExportCaption($this->mp_error_code);
					if ($this->mp_error_message->Exportable) $Doc->ExportCaption($this->mp_error_message);
					if ($this->mp_response->Exportable) $Doc->ExportCaption($this->mp_response);
					if ($this->createdAt->Exportable) $Doc->ExportCaption($this->createdAt);
					if ($this->updatedAt->Exportable) $Doc->ExportCaption($this->updatedAt);
				} else {
					if ($this->id->Exportable) $Doc->ExportCaption($this->id);
					if ($this->total->Exportable) $Doc->ExportCaption($this->total);
					if ($this->estado->Exportable) $Doc->ExportCaption($this->estado);
					if ($this->metodo_pago->Exportable) $Doc->ExportCaption($this->metodo_pago);
					if ($this->comprador_nombre->Exportable) $Doc->ExportCaption($this->comprador_nombre);
					if ($this->comprador_email->Exportable) $Doc->ExportCaption($this->comprador_email);
					if ($this->comprador_telefono->Exportable) $Doc->ExportCaption($this->comprador_telefono);
					if ($this->direccion_envio->Exportable) $Doc->ExportCaption($this->direccion_envio);
					if ($this->mp_payment_id->Exportable) $Doc->ExportCaption($this->mp_payment_id);
					if ($this->tarjeta_last4->Exportable) $Doc->ExportCaption($this->tarjeta_last4);
					if ($this->tarjeta_payment_method->Exportable) $Doc->ExportCaption($this->tarjeta_payment_method);
					if ($this->transferencia_ref->Exportable) $Doc->ExportCaption($this->transferencia_ref);
					if ($this->mp_error_code->Exportable) $Doc->ExportCaption($this->mp_error_code);
					if ($this->createdAt->Exportable) $Doc->ExportCaption($this->createdAt);
					if ($this->updatedAt->Exportable) $Doc->ExportCaption($this->updatedAt);
				}
				$Doc->EndExportRow();
			}
		}

		// Move to first record
		$RecCnt = $StartRec - 1;
		if (!$Recordset->EOF) {
			$Recordset->MoveFirst();
			if ($StartRec > 1)
				$Recordset->Move($StartRec - 1);
		}
		while (!$Recordset->EOF && $RecCnt < $StopRec) {
			$RecCnt++;
			if (intval($RecCnt) >= intval($StartRec)) {
				$RowCnt = intval($RecCnt) - intval($StartRec) + 1;

				// Page break
				if ($this->ExportPageBreakCount > 0) {
					if ($RowCnt > 1 && ($RowCnt - 1) % $this->ExportPageBreakCount == 0)
						$Doc->ExportPageBreak();
				}
				$this->LoadListRowValues($Recordset);

				// Render row
				$this->RowType = EW_ROWTYPE_VIEW; // Render view
				$this->ResetAttrs();
				$this->RenderListRow();
				if (!$Doc->ExportCustom) {
					$Doc->BeginExportRow($RowCnt); // Allow CSS styles if enabled
					if ($ExportPageType == "view") {
						if ($this->id->Exportable) $Doc->ExportField($this->id);
						if ($this->datos->Exportable) $Doc->ExportField($this->datos);
						if ($this->total->Exportable) $Doc->ExportField($this->total);
						if ($this->estado->Exportable) $Doc->ExportField($this->estado);
						if ($this->metodo_pago->Exportable) $Doc->ExportField($this->metodo_pago);
						if ($this->comprador_nombre->Exportable) $Doc->ExportField($this->comprador_nombre);
						if ($this->comprador_email->Exportable) $Doc->ExportField($this->comprador_email);
						if ($this->comprador_telefono->Exportable) $Doc->ExportField($this->comprador_telefono);
						if ($this->direccion_envio->Exportable) $Doc->ExportField($this->direccion_envio);
						if ($this->mp_payment_id->Exportable) $Doc->ExportField($this->mp_payment_id);
						if ($this->tarjeta_last4->Exportable) $Doc->ExportField($this->tarjeta_last4);
						if ($this->tarjeta_payment_method->Exportable) $Doc->ExportField($this->tarjeta_payment_method);
						if ($this->transferencia_ref->Exportable) $Doc->ExportField($this->transferencia_ref);
						if ($this->mp_error_code->Exportable) $Doc->ExportField($this->mp_error_code);
						if ($this->mp_error_message->Exportable) $Doc->ExportField($this->mp_error_message);
						if ($this->mp_response->Exportable) $Doc->ExportField($this->mp_response);
						if ($this->createdAt->Exportable) $Doc->ExportField($this->createdAt);
						if ($this->updatedAt->Exportable) $Doc->ExportField($this->updatedAt);
					} else {
						if ($this->id->Exportable) $Doc->ExportField($this->id);
						if ($this->total->Exportable) $Doc->ExportField($this->total);
						if ($this->estado->Exportable) $Doc->ExportField($this->estado);
						if ($this->metodo_pago->Exportable) $Doc->ExportField($this->metodo_pago);
						if ($this->comprador_nombre->Exportable) $Doc->ExportField($this->comprador_nombre);
						if ($this->comprador_email->Exportable) $Doc->ExportField($this->comprador_email);
						if ($this->comprador_telefono->Exportable) $Doc->ExportField($this->comprador_telefono);
						if ($this->direccion_envio->Exportable) $Doc->ExportField($this->direccion_envio);
						if ($this->mp_payment_id->Exportable) $Doc->ExportField($this->mp_payment_id);
						if ($this->tarjeta_last4->Exportable) $Doc->ExportField($this->tarjeta_last4);
						if ($this->tarjeta_payment_method->Exportable) $Doc->ExportField($this->tarjeta_payment_method);
						if ($this->transferencia_ref->Exportable) $Doc->ExportField($this->transferencia_ref);
						if ($this->mp_error_code->Exportable) $Doc->ExportField($this->mp_error_code);
						if ($this->createdAt->Exportable) $Doc->ExportField($this->createdAt);
						if ($this->updatedAt->Exportable) $Doc->ExportField($this->updatedAt);
					}
					$Doc->EndExportRow($RowCnt);
				}
			}

			// Call Row Export server event
			if ($Doc->ExportCustom)
				$this->Row_Export($Recordset->fields);
			$Recordset->MoveNext();
		}
		if (!$Doc->ExportCustom) {
			$Doc->ExportTableFooter();
		}
	}

	// Get auto fill value
	function GetAutoFill($id, $val) {
		$rsarr = array();
		$rowcnt = 0;

		// Output
		if (is_array($rsarr) && $rowcnt > 0) {
			$fldcnt = count($rsarr[0]);
			for ($i = 0; $i < $rowcnt; $i++) {
				for ($j = 0; $j < $fldcnt; $j++) {
					$str = strval($rsarr[$i][$j]);
					$str = ew_ConvertToUtf8($str);
					if (isset($post["keepCRLF"])) {
						$str = str_replace(array("\r", "\n"), array("\\r", "\\n"), $str);
					} else {
						$str = str_replace(array("\r", "\n"), array(" ", " "), $str);
					}
					$rsarr[$i][$j] = $str;
				}
			}
			return ew_ArrayToJson($rsarr);
		} else {
			return FALSE;
		}
	}

	// Table level events
	// Recordset Selecting event
	function Recordset_Selecting(&$filter) {

		// Enter your code here
	}

	// Recordset Selected event
	function Recordset_Selected(&$rs) {

		//echo "Recordset Selected";
	}

	// Recordset Search Validated event
	function Recordset_SearchValidated() {

		// Example:
		//$this->MyField1->AdvancedSearch->SearchValue = "your search criteria"; // Search value

	}

	// Recordset Searching event
	function Recordset_Searching(&$filter) {

		// Enter your code here
	}

	// Row_Selecting event
	function Row_Selecting(&$filter) {

		// Enter your code here
	}

	// Row Selected event
	function Row_Selected(&$rs) {

		//echo "Row Selected";
	}

	// Row Inserting event
	function Row_Inserting($rsold, &$rsnew) {

		// Enter your code here
		// To cancel, set return value to FALSE

		return TRUE;
	}

	// Row Inserted event
	function Row_Inserted($rsold, &$rsnew) {

		//echo "Row Inserted"
	}

	// Row Updating event
	function Row_Updating($rsold, &$rsnew) {

		// Enter your code here
		// To cancel, set return value to FALSE

		return TRUE;
	}

	// Row Updated event
	function Row_Updated($rsold, &$rsnew) {

		//echo "Row Updated";
	}

	// Row Update Conflict event
	function Row_UpdateConflict($rsold, &$rsnew) {

		// Enter your code here
		// To ignore conflict, set return value to FALSE

		return TRUE;
	}

	// Grid Inserting event
	function Grid_Inserting() {

		// Enter your code here
		// To reject grid insert, set return value to FALSE

		return TRUE;
	}

	// Grid Inserted event
	function Grid_Inserted($rsnew) {

		//echo "Grid Inserted";
	}

	// Grid Updating event
	function Grid_Updating($rsold) {

		// Enter your code here
		// To reject grid update, set return value to FALSE

		return TRUE;
	}

	// Grid Updated event
	function Grid_Updated($rsold, $rsnew) {

		//echo "Grid Updated";
	}

	// Row Deleting event
	function Row_Deleting(&$rs) {

		// Enter your code here
		// To cancel, set return value to False

		return TRUE;
	}

	// Row Deleted event
	function Row_Deleted(&$rs) {

		//echo "Row Deleted";
	}

	// Email Sending event
	function Email_Sending(&$Email, &$Args) {

		//var_dump($Email); var_dump($Args); exit();
		return TRUE;
	}

	// Lookup Selecting event
	function Lookup_Selecting($fld, &$filter) {

		//var_dump($fld->FldName, $fld->LookupFilters, $filter); // Uncomment to view the filter
		// Enter your code here

	}

	// Row Rendering event
	function Row_Rendering() {

		// Enter your code here
	}

	// Row Rendered event
	function Row_Rendered() {

		// To view properties of field class, use:
		//var_dump($this-><FieldName>);

	}

	// User ID Filtering event
	function UserID_Filtering(&$filter) {

		// Enter your code here
	}
}
?>
