<?php ew_Header(FALSE) ?>
<?php

// Create page object
if (!isset($productofotos_grid)) $productofotos_grid = new cproductofotos_grid();

// Page init
$productofotos_grid->Page_Init();

// Page main
$productofotos_grid->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$productofotos_grid->Page_Render();
?>
<?php if ($productofotos->Export == "") { ?>
<script type="text/javascript">

// Form object
var fproductofotosgrid = new ew_Form("fproductofotosgrid", "grid");
fproductofotosgrid.FormKeyCountName = '<?php echo $productofotos_grid->FormKeyCountName ?>';

// Validate form
fproductofotosgrid.Validate = function() {
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
			elm = this.GetElements("x" + infix + "_producto_id");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productofotos->producto_id->FldCaption(), $productofotos->producto_id->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_epigrafe");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productofotos->epigrafe->FldCaption(), $productofotos->epigrafe->ReqErrMsg)) ?>");
			felm = this.GetElements("x" + infix + "_foto");
			elm = this.GetElements("fn_x" + infix + "_foto");
			if (felm && elm && !ew_HasValue(elm))
				return this.OnError(felm, "<?php echo ew_JsEncode2(str_replace("%s", $productofotos->foto->FldCaption(), $productofotos->foto->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_orden");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productofotos->orden->FldCaption(), $productofotos->orden->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_orden");
			if (elm && !ew_CheckInteger(elm.value))
				return this.OnError(elm, "<?php echo ew_JsEncode2($productofotos->orden->FldErrMsg()) ?>");
			elm = this.GetElements("x" + infix + "_activo");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productofotos->activo->FldCaption(), $productofotos->activo->ReqErrMsg)) ?>");

			// Fire Form_CustomValidate event
			if (!this.Form_CustomValidate(fobj))
				return false;
		} // End Grid Add checking
	}
	return true;
}

// Check empty row
fproductofotosgrid.EmptyRow = function(infix) {
	var fobj = this.Form;
	if (ew_ValueChanged(fobj, infix, "producto_id", false)) return false;
	if (ew_ValueChanged(fobj, infix, "epigrafe", false)) return false;
	if (ew_ValueChanged(fobj, infix, "foto", false)) return false;
	if (ew_ValueChanged(fobj, infix, "orden", false)) return false;
	if (ew_ValueChanged(fobj, infix, "activo", false)) return false;
	return true;
}

// Form_CustomValidate event
fproductofotosgrid.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fproductofotosgrid.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
fproductofotosgrid.Lists["x_producto_id"] = {"LinkField":"x_id","Ajax":true,"AutoFill":false,"DisplayFields":["x_producto","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":"","LinkTable":"productos"};
fproductofotosgrid.Lists["x_producto_id"].Data = "<?php echo $productofotos_grid->producto_id->LookupFilterQuery(FALSE, "grid") ?>";
fproductofotosgrid.Lists["x_activo"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductofotosgrid.Lists["x_activo"].Options = <?php echo json_encode($productofotos_grid->activo->Options()) ?>;

// Form object for search
</script>
<?php } ?>
<?php
if ($productofotos->CurrentAction == "gridadd") {
	if ($productofotos->CurrentMode == "copy") {
		$bSelectLimit = $productofotos_grid->UseSelectLimit;
		if ($bSelectLimit) {
			$productofotos_grid->TotalRecs = $productofotos->ListRecordCount();
			$productofotos_grid->Recordset = $productofotos_grid->LoadRecordset($productofotos_grid->StartRec-1, $productofotos_grid->DisplayRecs);
		} else {
			if ($productofotos_grid->Recordset = $productofotos_grid->LoadRecordset())
				$productofotos_grid->TotalRecs = $productofotos_grid->Recordset->RecordCount();
		}
		$productofotos_grid->StartRec = 1;
		$productofotos_grid->DisplayRecs = $productofotos_grid->TotalRecs;
	} else {
		$productofotos->CurrentFilter = "0=1";
		$productofotos_grid->StartRec = 1;
		$productofotos_grid->DisplayRecs = $productofotos->GridAddRowCount;
	}
	$productofotos_grid->TotalRecs = $productofotos_grid->DisplayRecs;
	$productofotos_grid->StopRec = $productofotos_grid->DisplayRecs;
} else {
	$bSelectLimit = $productofotos_grid->UseSelectLimit;
	if ($bSelectLimit) {
		if ($productofotos_grid->TotalRecs <= 0)
			$productofotos_grid->TotalRecs = $productofotos->ListRecordCount();
	} else {
		if (!$productofotos_grid->Recordset && ($productofotos_grid->Recordset = $productofotos_grid->LoadRecordset()))
			$productofotos_grid->TotalRecs = $productofotos_grid->Recordset->RecordCount();
	}
	$productofotos_grid->StartRec = 1;
	$productofotos_grid->DisplayRecs = $productofotos_grid->TotalRecs; // Display all records
	if ($bSelectLimit)
		$productofotos_grid->Recordset = $productofotos_grid->LoadRecordset($productofotos_grid->StartRec-1, $productofotos_grid->DisplayRecs);

	// Set no record found message
	if ($productofotos->CurrentAction == "" && $productofotos_grid->TotalRecs == 0) {
		if ($productofotos_grid->SearchWhere == "0=101")
			$productofotos_grid->setWarningMessage($Language->Phrase("EnterSearchCriteria"));
		else
			$productofotos_grid->setWarningMessage($Language->Phrase("NoRecord"));
	}
}
$productofotos_grid->RenderOtherOptions();
?>
<?php $productofotos_grid->ShowPageHeader(); ?>
<?php
$productofotos_grid->ShowMessage();
?>
<?php if ($productofotos_grid->TotalRecs > 0 || $productofotos->CurrentAction <> "") { ?>
<div class="box ewBox ewGrid<?php if ($productofotos_grid->IsAddOrEdit()) { ?> ewGridAddEdit<?php } ?> productofotos">
<div id="fproductofotosgrid" class="ewForm ewListForm form-inline">
<?php if ($productofotos_grid->ShowOtherOptions) { ?>
<div class="box-header ewGridUpperPanel">
<?php
	foreach ($productofotos_grid->OtherOptions as &$option)
		$option->Render("body");
?>
</div>
<div class="clearfix"></div>
<?php } ?>
<div id="gmp_productofotos" class="<?php if (ew_IsResponsiveLayout()) { ?>table-responsive <?php } ?>ewGridMiddlePanel">
<table id="tbl_productofotosgrid" class="table ewTable">
<thead>
	<tr class="ewTableHeader">
<?php

// Header row
$productofotos_grid->RowType = EW_ROWTYPE_HEADER;

// Render list options
$productofotos_grid->RenderListOptions();

// Render list options (header, left)
$productofotos_grid->ListOptions->Render("header", "left");
?>
<?php if ($productofotos->id->Visible) { // id ?>
	<?php if ($productofotos->SortUrl($productofotos->id) == "") { ?>
		<th data-name="id" class="<?php echo $productofotos->id->HeaderCellClass() ?>"><div id="elh_productofotos_id" class="productofotos_id"><div class="ewTableHeaderCaption"><?php echo $productofotos->id->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="id" class="<?php echo $productofotos->id->HeaderCellClass() ?>"><div><div id="elh_productofotos_id" class="productofotos_id">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productofotos->id->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productofotos->id->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productofotos->id->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productofotos->producto_id->Visible) { // producto_id ?>
	<?php if ($productofotos->SortUrl($productofotos->producto_id) == "") { ?>
		<th data-name="producto_id" class="<?php echo $productofotos->producto_id->HeaderCellClass() ?>"><div id="elh_productofotos_producto_id" class="productofotos_producto_id"><div class="ewTableHeaderCaption"><?php echo $productofotos->producto_id->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="producto_id" class="<?php echo $productofotos->producto_id->HeaderCellClass() ?>"><div><div id="elh_productofotos_producto_id" class="productofotos_producto_id">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productofotos->producto_id->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productofotos->producto_id->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productofotos->producto_id->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productofotos->epigrafe->Visible) { // epigrafe ?>
	<?php if ($productofotos->SortUrl($productofotos->epigrafe) == "") { ?>
		<th data-name="epigrafe" class="<?php echo $productofotos->epigrafe->HeaderCellClass() ?>"><div id="elh_productofotos_epigrafe" class="productofotos_epigrafe"><div class="ewTableHeaderCaption"><?php echo $productofotos->epigrafe->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="epigrafe" class="<?php echo $productofotos->epigrafe->HeaderCellClass() ?>"><div><div id="elh_productofotos_epigrafe" class="productofotos_epigrafe">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productofotos->epigrafe->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productofotos->epigrafe->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productofotos->epigrafe->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productofotos->foto->Visible) { // foto ?>
	<?php if ($productofotos->SortUrl($productofotos->foto) == "") { ?>
		<th data-name="foto" class="<?php echo $productofotos->foto->HeaderCellClass() ?>"><div id="elh_productofotos_foto" class="productofotos_foto"><div class="ewTableHeaderCaption"><?php echo $productofotos->foto->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="foto" class="<?php echo $productofotos->foto->HeaderCellClass() ?>"><div><div id="elh_productofotos_foto" class="productofotos_foto">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productofotos->foto->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productofotos->foto->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productofotos->foto->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productofotos->orden->Visible) { // orden ?>
	<?php if ($productofotos->SortUrl($productofotos->orden) == "") { ?>
		<th data-name="orden" class="<?php echo $productofotos->orden->HeaderCellClass() ?>"><div id="elh_productofotos_orden" class="productofotos_orden"><div class="ewTableHeaderCaption"><?php echo $productofotos->orden->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="orden" class="<?php echo $productofotos->orden->HeaderCellClass() ?>"><div><div id="elh_productofotos_orden" class="productofotos_orden">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productofotos->orden->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productofotos->orden->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productofotos->orden->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productofotos->activo->Visible) { // activo ?>
	<?php if ($productofotos->SortUrl($productofotos->activo) == "") { ?>
		<th data-name="activo" class="<?php echo $productofotos->activo->HeaderCellClass() ?>"><div id="elh_productofotos_activo" class="productofotos_activo"><div class="ewTableHeaderCaption"><?php echo $productofotos->activo->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="activo" class="<?php echo $productofotos->activo->HeaderCellClass() ?>"><div><div id="elh_productofotos_activo" class="productofotos_activo">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productofotos->activo->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productofotos->activo->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productofotos->activo->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php

// Render list options (header, right)
$productofotos_grid->ListOptions->Render("header", "right");
?>
	</tr>
</thead>
<tbody>
<?php
$productofotos_grid->StartRec = 1;
$productofotos_grid->StopRec = $productofotos_grid->TotalRecs; // Show all records

// Restore number of post back records
if ($objForm) {
	$objForm->Index = -1;
	if ($objForm->HasValue($productofotos_grid->FormKeyCountName) && ($productofotos->CurrentAction == "gridadd" || $productofotos->CurrentAction == "gridedit" || $productofotos->CurrentAction == "F")) {
		$productofotos_grid->KeyCount = $objForm->GetValue($productofotos_grid->FormKeyCountName);
		$productofotos_grid->StopRec = $productofotos_grid->StartRec + $productofotos_grid->KeyCount - 1;
	}
}
$productofotos_grid->RecCnt = $productofotos_grid->StartRec - 1;
if ($productofotos_grid->Recordset && !$productofotos_grid->Recordset->EOF) {
	$productofotos_grid->Recordset->MoveFirst();
	$bSelectLimit = $productofotos_grid->UseSelectLimit;
	if (!$bSelectLimit && $productofotos_grid->StartRec > 1)
		$productofotos_grid->Recordset->Move($productofotos_grid->StartRec - 1);
} elseif (!$productofotos->AllowAddDeleteRow && $productofotos_grid->StopRec == 0) {
	$productofotos_grid->StopRec = $productofotos->GridAddRowCount;
}

// Initialize aggregate
$productofotos->RowType = EW_ROWTYPE_AGGREGATEINIT;
$productofotos->ResetAttrs();
$productofotos_grid->RenderRow();
if ($productofotos->CurrentAction == "gridadd")
	$productofotos_grid->RowIndex = 0;
if ($productofotos->CurrentAction == "gridedit")
	$productofotos_grid->RowIndex = 0;
while ($productofotos_grid->RecCnt < $productofotos_grid->StopRec) {
	$productofotos_grid->RecCnt++;
	if (intval($productofotos_grid->RecCnt) >= intval($productofotos_grid->StartRec)) {
		$productofotos_grid->RowCnt++;
		if ($productofotos->CurrentAction == "gridadd" || $productofotos->CurrentAction == "gridedit" || $productofotos->CurrentAction == "F") {
			$productofotos_grid->RowIndex++;
			$objForm->Index = $productofotos_grid->RowIndex;
			if ($objForm->HasValue($productofotos_grid->FormActionName))
				$productofotos_grid->RowAction = strval($objForm->GetValue($productofotos_grid->FormActionName));
			elseif ($productofotos->CurrentAction == "gridadd")
				$productofotos_grid->RowAction = "insert";
			else
				$productofotos_grid->RowAction = "";
		}

		// Set up key count
		$productofotos_grid->KeyCount = $productofotos_grid->RowIndex;

		// Init row class and style
		$productofotos->ResetAttrs();
		$productofotos->CssClass = "";
		if ($productofotos->CurrentAction == "gridadd") {
			if ($productofotos->CurrentMode == "copy") {
				$productofotos_grid->LoadRowValues($productofotos_grid->Recordset); // Load row values
				$productofotos_grid->SetRecordKey($productofotos_grid->RowOldKey, $productofotos_grid->Recordset); // Set old record key
			} else {
				$productofotos_grid->LoadRowValues(); // Load default values
				$productofotos_grid->RowOldKey = ""; // Clear old key value
			}
		} else {
			$productofotos_grid->LoadRowValues($productofotos_grid->Recordset); // Load row values
		}
		$productofotos->RowType = EW_ROWTYPE_VIEW; // Render view
		if ($productofotos->CurrentAction == "gridadd") // Grid add
			$productofotos->RowType = EW_ROWTYPE_ADD; // Render add
		if ($productofotos->CurrentAction == "gridadd" && $productofotos->EventCancelled && !$objForm->HasValue("k_blankrow")) // Insert failed
			$productofotos_grid->RestoreCurrentRowFormValues($productofotos_grid->RowIndex); // Restore form values
		if ($productofotos->CurrentAction == "gridedit") { // Grid edit
			if ($productofotos->EventCancelled) {
				$productofotos_grid->RestoreCurrentRowFormValues($productofotos_grid->RowIndex); // Restore form values
			}
			if ($productofotos_grid->RowAction == "insert")
				$productofotos->RowType = EW_ROWTYPE_ADD; // Render add
			else
				$productofotos->RowType = EW_ROWTYPE_EDIT; // Render edit
		}
		if ($productofotos->CurrentAction == "gridedit" && ($productofotos->RowType == EW_ROWTYPE_EDIT || $productofotos->RowType == EW_ROWTYPE_ADD) && $productofotos->EventCancelled) // Update failed
			$productofotos_grid->RestoreCurrentRowFormValues($productofotos_grid->RowIndex); // Restore form values
		if ($productofotos->RowType == EW_ROWTYPE_EDIT) // Edit row
			$productofotos_grid->EditRowCnt++;
		if ($productofotos->CurrentAction == "F") // Confirm row
			$productofotos_grid->RestoreCurrentRowFormValues($productofotos_grid->RowIndex); // Restore form values

		// Set up row id / data-rowindex
		$productofotos->RowAttrs = array_merge($productofotos->RowAttrs, array('data-rowindex'=>$productofotos_grid->RowCnt, 'id'=>'r' . $productofotos_grid->RowCnt . '_productofotos', 'data-rowtype'=>$productofotos->RowType));

		// Render row
		$productofotos_grid->RenderRow();

		// Render list options
		$productofotos_grid->RenderListOptions();

		// Skip delete row / empty row for confirm page
		if ($productofotos_grid->RowAction <> "delete" && $productofotos_grid->RowAction <> "insertdelete" && !($productofotos_grid->RowAction == "insert" && $productofotos->CurrentAction == "F" && $productofotos_grid->EmptyRow())) {
?>
	<tr<?php echo $productofotos->RowAttributes() ?>>
<?php

// Render list options (body, left)
$productofotos_grid->ListOptions->Render("body", "left", $productofotos_grid->RowCnt);
?>
	<?php if ($productofotos->id->Visible) { // id ?>
		<td data-name="id"<?php echo $productofotos->id->CellAttributes() ?>>
<?php if ($productofotos->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<input type="hidden" data-table="productofotos" data-field="x_id" name="o<?php echo $productofotos_grid->RowIndex ?>_id" id="o<?php echo $productofotos_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productofotos->id->OldValue) ?>">
<?php } ?>
<?php if ($productofotos->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_id" class="form-group productofotos_id">
<span<?php echo $productofotos->id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productofotos->id->EditValue ?></p></span>
</span>
<input type="hidden" data-table="productofotos" data-field="x_id" name="x<?php echo $productofotos_grid->RowIndex ?>_id" id="x<?php echo $productofotos_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productofotos->id->CurrentValue) ?>">
<?php } ?>
<?php if ($productofotos->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_id" class="productofotos_id">
<span<?php echo $productofotos->id->ViewAttributes() ?>>
<?php echo $productofotos->id->ListViewValue() ?></span>
</span>
<?php if ($productofotos->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productofotos" data-field="x_id" name="x<?php echo $productofotos_grid->RowIndex ?>_id" id="x<?php echo $productofotos_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productofotos->id->FormValue) ?>">
<input type="hidden" data-table="productofotos" data-field="x_id" name="o<?php echo $productofotos_grid->RowIndex ?>_id" id="o<?php echo $productofotos_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productofotos->id->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productofotos" data-field="x_id" name="fproductofotosgrid$x<?php echo $productofotos_grid->RowIndex ?>_id" id="fproductofotosgrid$x<?php echo $productofotos_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productofotos->id->FormValue) ?>">
<input type="hidden" data-table="productofotos" data-field="x_id" name="fproductofotosgrid$o<?php echo $productofotos_grid->RowIndex ?>_id" id="fproductofotosgrid$o<?php echo $productofotos_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productofotos->id->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productofotos->producto_id->Visible) { // producto_id ?>
		<td data-name="producto_id"<?php echo $productofotos->producto_id->CellAttributes() ?>>
<?php if ($productofotos->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<?php if ($productofotos->producto_id->getSessionValue() <> "") { ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_producto_id" class="form-group productofotos_producto_id">
<span<?php echo $productofotos->producto_id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productofotos->producto_id->ViewValue ?></p></span>
</span>
<input type="hidden" id="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" name="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="<?php echo ew_HtmlEncode($productofotos->producto_id->CurrentValue) ?>">
<?php } else { ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_producto_id" class="form-group productofotos_producto_id">
<div class="ewDropdownList has-feedback">
	<span onclick="" class="form-control dropdown-toggle" aria-expanded="false"<?php if ($productofotos->producto_id->ReadOnly) { ?> readonly<?php } else { ?>data-toggle="dropdown"<?php } ?>>
		<?php echo $productofotos->producto_id->ViewValue ?>
	</span>
	<?php if (!$productofotos->producto_id->ReadOnly) { ?>
	<span class="glyphicon glyphicon-remove form-control-feedback ewDropdownListClear"></span>
	<span class="form-control-feedback"><span class="caret"></span></span>
	<?php } ?>
	<div id="dsl_x<?php echo $productofotos_grid->RowIndex ?>_producto_id" data-repeatcolumn="1" class="dropdown-menu">
		<div class="ewItems" style="position: relative; overflow-x: hidden;">
<?php echo $productofotos->producto_id->RadioButtonListHtml(TRUE, "x{$productofotos_grid->RowIndex}_producto_id") ?>
		</div>
	</div>
	<div id="tp_x<?php echo $productofotos_grid->RowIndex ?>_producto_id" class="ewTemplate"><input type="radio" data-table="productofotos" data-field="x_producto_id" data-value-separator="<?php echo $productofotos->producto_id->DisplayValueSeparatorAttribute() ?>" name="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" id="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="{value}"<?php echo $productofotos->producto_id->EditAttributes() ?>></div>
</div>
</span>
<?php } ?>
<input type="hidden" data-table="productofotos" data-field="x_producto_id" name="o<?php echo $productofotos_grid->RowIndex ?>_producto_id" id="o<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="<?php echo ew_HtmlEncode($productofotos->producto_id->OldValue) ?>">
<?php } ?>
<?php if ($productofotos->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<?php if ($productofotos->producto_id->getSessionValue() <> "") { ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_producto_id" class="form-group productofotos_producto_id">
<span<?php echo $productofotos->producto_id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productofotos->producto_id->ViewValue ?></p></span>
</span>
<input type="hidden" id="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" name="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="<?php echo ew_HtmlEncode($productofotos->producto_id->CurrentValue) ?>">
<?php } else { ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_producto_id" class="form-group productofotos_producto_id">
<div class="ewDropdownList has-feedback">
	<span onclick="" class="form-control dropdown-toggle" aria-expanded="false"<?php if ($productofotos->producto_id->ReadOnly) { ?> readonly<?php } else { ?>data-toggle="dropdown"<?php } ?>>
		<?php echo $productofotos->producto_id->ViewValue ?>
	</span>
	<?php if (!$productofotos->producto_id->ReadOnly) { ?>
	<span class="glyphicon glyphicon-remove form-control-feedback ewDropdownListClear"></span>
	<span class="form-control-feedback"><span class="caret"></span></span>
	<?php } ?>
	<div id="dsl_x<?php echo $productofotos_grid->RowIndex ?>_producto_id" data-repeatcolumn="1" class="dropdown-menu">
		<div class="ewItems" style="position: relative; overflow-x: hidden;">
<?php echo $productofotos->producto_id->RadioButtonListHtml(TRUE, "x{$productofotos_grid->RowIndex}_producto_id") ?>
		</div>
	</div>
	<div id="tp_x<?php echo $productofotos_grid->RowIndex ?>_producto_id" class="ewTemplate"><input type="radio" data-table="productofotos" data-field="x_producto_id" data-value-separator="<?php echo $productofotos->producto_id->DisplayValueSeparatorAttribute() ?>" name="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" id="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="{value}"<?php echo $productofotos->producto_id->EditAttributes() ?>></div>
</div>
</span>
<?php } ?>
<?php } ?>
<?php if ($productofotos->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_producto_id" class="productofotos_producto_id">
<span<?php echo $productofotos->producto_id->ViewAttributes() ?>>
<?php echo $productofotos->producto_id->ListViewValue() ?></span>
</span>
<?php if ($productofotos->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productofotos" data-field="x_producto_id" name="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" id="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="<?php echo ew_HtmlEncode($productofotos->producto_id->FormValue) ?>">
<input type="hidden" data-table="productofotos" data-field="x_producto_id" name="o<?php echo $productofotos_grid->RowIndex ?>_producto_id" id="o<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="<?php echo ew_HtmlEncode($productofotos->producto_id->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productofotos" data-field="x_producto_id" name="fproductofotosgrid$x<?php echo $productofotos_grid->RowIndex ?>_producto_id" id="fproductofotosgrid$x<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="<?php echo ew_HtmlEncode($productofotos->producto_id->FormValue) ?>">
<input type="hidden" data-table="productofotos" data-field="x_producto_id" name="fproductofotosgrid$o<?php echo $productofotos_grid->RowIndex ?>_producto_id" id="fproductofotosgrid$o<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="<?php echo ew_HtmlEncode($productofotos->producto_id->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productofotos->epigrafe->Visible) { // epigrafe ?>
		<td data-name="epigrafe"<?php echo $productofotos->epigrafe->CellAttributes() ?>>
<?php if ($productofotos->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_epigrafe" class="form-group productofotos_epigrafe">
<input type="text" data-table="productofotos" data-field="x_epigrafe" name="x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" id="x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productofotos->epigrafe->getPlaceHolder()) ?>" value="<?php echo $productofotos->epigrafe->EditValue ?>"<?php echo $productofotos->epigrafe->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productofotos" data-field="x_epigrafe" name="o<?php echo $productofotos_grid->RowIndex ?>_epigrafe" id="o<?php echo $productofotos_grid->RowIndex ?>_epigrafe" value="<?php echo ew_HtmlEncode($productofotos->epigrafe->OldValue) ?>">
<?php } ?>
<?php if ($productofotos->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_epigrafe" class="form-group productofotos_epigrafe">
<input type="text" data-table="productofotos" data-field="x_epigrafe" name="x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" id="x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productofotos->epigrafe->getPlaceHolder()) ?>" value="<?php echo $productofotos->epigrafe->EditValue ?>"<?php echo $productofotos->epigrafe->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productofotos->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_epigrafe" class="productofotos_epigrafe">
<span<?php echo $productofotos->epigrafe->ViewAttributes() ?>>
<?php echo $productofotos->epigrafe->ListViewValue() ?></span>
</span>
<?php if ($productofotos->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productofotos" data-field="x_epigrafe" name="x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" id="x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" value="<?php echo ew_HtmlEncode($productofotos->epigrafe->FormValue) ?>">
<input type="hidden" data-table="productofotos" data-field="x_epigrafe" name="o<?php echo $productofotos_grid->RowIndex ?>_epigrafe" id="o<?php echo $productofotos_grid->RowIndex ?>_epigrafe" value="<?php echo ew_HtmlEncode($productofotos->epigrafe->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productofotos" data-field="x_epigrafe" name="fproductofotosgrid$x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" id="fproductofotosgrid$x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" value="<?php echo ew_HtmlEncode($productofotos->epigrafe->FormValue) ?>">
<input type="hidden" data-table="productofotos" data-field="x_epigrafe" name="fproductofotosgrid$o<?php echo $productofotos_grid->RowIndex ?>_epigrafe" id="fproductofotosgrid$o<?php echo $productofotos_grid->RowIndex ?>_epigrafe" value="<?php echo ew_HtmlEncode($productofotos->epigrafe->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productofotos->foto->Visible) { // foto ?>
		<td data-name="foto"<?php echo $productofotos->foto->CellAttributes() ?>>
<?php if ($productofotos_grid->RowAction == "insert") { // Add record ?>
<span id="el$rowindex$_productofotos_foto" class="form-group productofotos_foto">
<div id="fd_x<?php echo $productofotos_grid->RowIndex ?>_foto">
<span title="<?php echo $productofotos->foto->FldTitle() ? $productofotos->foto->FldTitle() : $Language->Phrase("ChooseFile") ?>" class="btn btn-default btn-sm fileinput-button ewTooltip<?php if ($productofotos->foto->ReadOnly || $productofotos->foto->Disabled) echo " hide"; ?>">
	<span><?php echo $Language->Phrase("ChooseFileBtn") ?></span>
	<input type="file" title=" " data-table="productofotos" data-field="x_foto" name="x<?php echo $productofotos_grid->RowIndex ?>_foto" id="x<?php echo $productofotos_grid->RowIndex ?>_foto"<?php echo $productofotos->foto->EditAttributes() ?>>
</span>
<input type="hidden" name="fn_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fn_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="<?php echo $productofotos->foto->Upload->FileName ?>">
<input type="hidden" name="fa_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fa_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="0">
<input type="hidden" name="fs_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fs_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="191">
<input type="hidden" name="fx_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fx_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="<?php echo $productofotos->foto->UploadAllowedFileExt ?>">
<input type="hidden" name="fm_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fm_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="<?php echo $productofotos->foto->UploadMaxFileSize ?>">
</div>
<table id="ft_x<?php echo $productofotos_grid->RowIndex ?>_foto" class="table table-condensed pull-left ewUploadTable"><tbody class="files"></tbody></table>
</span>
<input type="hidden" data-table="productofotos" data-field="x_foto" name="o<?php echo $productofotos_grid->RowIndex ?>_foto" id="o<?php echo $productofotos_grid->RowIndex ?>_foto" value="<?php echo ew_HtmlEncode($productofotos->foto->OldValue) ?>">
<?php } elseif ($productofotos->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_foto" class="productofotos_foto">
<span<?php echo $productofotos->foto->ViewAttributes() ?>>
<?php echo ew_GetFileViewTag($productofotos->foto, $productofotos->foto->ListViewValue()) ?>
</span>
</span>
<?php } else  { // Edit record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_foto" class="form-group productofotos_foto">
<div id="fd_x<?php echo $productofotos_grid->RowIndex ?>_foto">
<span title="<?php echo $productofotos->foto->FldTitle() ? $productofotos->foto->FldTitle() : $Language->Phrase("ChooseFile") ?>" class="btn btn-default btn-sm fileinput-button ewTooltip<?php if ($productofotos->foto->ReadOnly || $productofotos->foto->Disabled) echo " hide"; ?>">
	<span><?php echo $Language->Phrase("ChooseFileBtn") ?></span>
	<input type="file" title=" " data-table="productofotos" data-field="x_foto" name="x<?php echo $productofotos_grid->RowIndex ?>_foto" id="x<?php echo $productofotos_grid->RowIndex ?>_foto"<?php echo $productofotos->foto->EditAttributes() ?>>
</span>
<input type="hidden" name="fn_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fn_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="<?php echo $productofotos->foto->Upload->FileName ?>">
<?php if (@$_POST["fa_x<?php echo $productofotos_grid->RowIndex ?>_foto"] == "0") { ?>
<input type="hidden" name="fa_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fa_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="0">
<?php } else { ?>
<input type="hidden" name="fa_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fa_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="1">
<?php } ?>
<input type="hidden" name="fs_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fs_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="191">
<input type="hidden" name="fx_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fx_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="<?php echo $productofotos->foto->UploadAllowedFileExt ?>">
<input type="hidden" name="fm_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fm_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="<?php echo $productofotos->foto->UploadMaxFileSize ?>">
</div>
<table id="ft_x<?php echo $productofotos_grid->RowIndex ?>_foto" class="table table-condensed pull-left ewUploadTable"><tbody class="files"></tbody></table>
</span>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productofotos->orden->Visible) { // orden ?>
		<td data-name="orden"<?php echo $productofotos->orden->CellAttributes() ?>>
<?php if ($productofotos->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_orden" class="form-group productofotos_orden">
<input type="text" data-table="productofotos" data-field="x_orden" name="x<?php echo $productofotos_grid->RowIndex ?>_orden" id="x<?php echo $productofotos_grid->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productofotos->orden->getPlaceHolder()) ?>" value="<?php echo $productofotos->orden->EditValue ?>"<?php echo $productofotos->orden->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productofotos" data-field="x_orden" name="o<?php echo $productofotos_grid->RowIndex ?>_orden" id="o<?php echo $productofotos_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productofotos->orden->OldValue) ?>">
<?php } ?>
<?php if ($productofotos->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_orden" class="form-group productofotos_orden">
<input type="text" data-table="productofotos" data-field="x_orden" name="x<?php echo $productofotos_grid->RowIndex ?>_orden" id="x<?php echo $productofotos_grid->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productofotos->orden->getPlaceHolder()) ?>" value="<?php echo $productofotos->orden->EditValue ?>"<?php echo $productofotos->orden->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productofotos->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_orden" class="productofotos_orden">
<span<?php echo $productofotos->orden->ViewAttributes() ?>>
<?php echo $productofotos->orden->ListViewValue() ?></span>
</span>
<?php if ($productofotos->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productofotos" data-field="x_orden" name="x<?php echo $productofotos_grid->RowIndex ?>_orden" id="x<?php echo $productofotos_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productofotos->orden->FormValue) ?>">
<input type="hidden" data-table="productofotos" data-field="x_orden" name="o<?php echo $productofotos_grid->RowIndex ?>_orden" id="o<?php echo $productofotos_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productofotos->orden->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productofotos" data-field="x_orden" name="fproductofotosgrid$x<?php echo $productofotos_grid->RowIndex ?>_orden" id="fproductofotosgrid$x<?php echo $productofotos_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productofotos->orden->FormValue) ?>">
<input type="hidden" data-table="productofotos" data-field="x_orden" name="fproductofotosgrid$o<?php echo $productofotos_grid->RowIndex ?>_orden" id="fproductofotosgrid$o<?php echo $productofotos_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productofotos->orden->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productofotos->activo->Visible) { // activo ?>
		<td data-name="activo"<?php echo $productofotos->activo->CellAttributes() ?>>
<?php if ($productofotos->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_activo" class="form-group productofotos_activo">
<select data-table="productofotos" data-field="x_activo" data-value-separator="<?php echo $productofotos->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productofotos_grid->RowIndex ?>_activo" name="x<?php echo $productofotos_grid->RowIndex ?>_activo"<?php echo $productofotos->activo->EditAttributes() ?>>
<?php echo $productofotos->activo->SelectOptionListHtml("x<?php echo $productofotos_grid->RowIndex ?>_activo") ?>
</select>
</span>
<input type="hidden" data-table="productofotos" data-field="x_activo" name="o<?php echo $productofotos_grid->RowIndex ?>_activo" id="o<?php echo $productofotos_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productofotos->activo->OldValue) ?>">
<?php } ?>
<?php if ($productofotos->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_activo" class="form-group productofotos_activo">
<select data-table="productofotos" data-field="x_activo" data-value-separator="<?php echo $productofotos->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productofotos_grid->RowIndex ?>_activo" name="x<?php echo $productofotos_grid->RowIndex ?>_activo"<?php echo $productofotos->activo->EditAttributes() ?>>
<?php echo $productofotos->activo->SelectOptionListHtml("x<?php echo $productofotos_grid->RowIndex ?>_activo") ?>
</select>
</span>
<?php } ?>
<?php if ($productofotos->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productofotos_grid->RowCnt ?>_productofotos_activo" class="productofotos_activo">
<span<?php echo $productofotos->activo->ViewAttributes() ?>>
<?php echo $productofotos->activo->ListViewValue() ?></span>
</span>
<?php if ($productofotos->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productofotos" data-field="x_activo" name="x<?php echo $productofotos_grid->RowIndex ?>_activo" id="x<?php echo $productofotos_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productofotos->activo->FormValue) ?>">
<input type="hidden" data-table="productofotos" data-field="x_activo" name="o<?php echo $productofotos_grid->RowIndex ?>_activo" id="o<?php echo $productofotos_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productofotos->activo->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productofotos" data-field="x_activo" name="fproductofotosgrid$x<?php echo $productofotos_grid->RowIndex ?>_activo" id="fproductofotosgrid$x<?php echo $productofotos_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productofotos->activo->FormValue) ?>">
<input type="hidden" data-table="productofotos" data-field="x_activo" name="fproductofotosgrid$o<?php echo $productofotos_grid->RowIndex ?>_activo" id="fproductofotosgrid$o<?php echo $productofotos_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productofotos->activo->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
<?php

// Render list options (body, right)
$productofotos_grid->ListOptions->Render("body", "right", $productofotos_grid->RowCnt);
?>
	</tr>
<?php if ($productofotos->RowType == EW_ROWTYPE_ADD || $productofotos->RowType == EW_ROWTYPE_EDIT) { ?>
<script type="text/javascript">
fproductofotosgrid.UpdateOpts(<?php echo $productofotos_grid->RowIndex ?>);
</script>
<?php } ?>
<?php
	}
	} // End delete row checking
	if ($productofotos->CurrentAction <> "gridadd" || $productofotos->CurrentMode == "copy")
		if (!$productofotos_grid->Recordset->EOF) $productofotos_grid->Recordset->MoveNext();
}
?>
<?php
	if ($productofotos->CurrentMode == "add" || $productofotos->CurrentMode == "copy" || $productofotos->CurrentMode == "edit") {
		$productofotos_grid->RowIndex = '$rowindex$';
		$productofotos_grid->LoadRowValues();

		// Set row properties
		$productofotos->ResetAttrs();
		$productofotos->RowAttrs = array_merge($productofotos->RowAttrs, array('data-rowindex'=>$productofotos_grid->RowIndex, 'id'=>'r0_productofotos', 'data-rowtype'=>EW_ROWTYPE_ADD));
		ew_AppendClass($productofotos->RowAttrs["class"], "ewTemplate");
		$productofotos->RowType = EW_ROWTYPE_ADD;

		// Render row
		$productofotos_grid->RenderRow();

		// Render list options
		$productofotos_grid->RenderListOptions();
		$productofotos_grid->StartRowCnt = 0;
?>
	<tr<?php echo $productofotos->RowAttributes() ?>>
<?php

// Render list options (body, left)
$productofotos_grid->ListOptions->Render("body", "left", $productofotos_grid->RowIndex);
?>
	<?php if ($productofotos->id->Visible) { // id ?>
		<td data-name="id">
<?php if ($productofotos->CurrentAction <> "F") { ?>
<?php } else { ?>
<span id="el$rowindex$_productofotos_id" class="form-group productofotos_id">
<span<?php echo $productofotos->id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productofotos->id->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productofotos" data-field="x_id" name="x<?php echo $productofotos_grid->RowIndex ?>_id" id="x<?php echo $productofotos_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productofotos->id->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productofotos" data-field="x_id" name="o<?php echo $productofotos_grid->RowIndex ?>_id" id="o<?php echo $productofotos_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productofotos->id->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productofotos->producto_id->Visible) { // producto_id ?>
		<td data-name="producto_id">
<?php if ($productofotos->CurrentAction <> "F") { ?>
<?php if ($productofotos->producto_id->getSessionValue() <> "") { ?>
<span id="el$rowindex$_productofotos_producto_id" class="form-group productofotos_producto_id">
<span<?php echo $productofotos->producto_id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productofotos->producto_id->ViewValue ?></p></span>
</span>
<input type="hidden" id="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" name="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="<?php echo ew_HtmlEncode($productofotos->producto_id->CurrentValue) ?>">
<?php } else { ?>
<span id="el$rowindex$_productofotos_producto_id" class="form-group productofotos_producto_id">
<div class="ewDropdownList has-feedback">
	<span onclick="" class="form-control dropdown-toggle" aria-expanded="false"<?php if ($productofotos->producto_id->ReadOnly) { ?> readonly<?php } else { ?>data-toggle="dropdown"<?php } ?>>
		<?php echo $productofotos->producto_id->ViewValue ?>
	</span>
	<?php if (!$productofotos->producto_id->ReadOnly) { ?>
	<span class="glyphicon glyphicon-remove form-control-feedback ewDropdownListClear"></span>
	<span class="form-control-feedback"><span class="caret"></span></span>
	<?php } ?>
	<div id="dsl_x<?php echo $productofotos_grid->RowIndex ?>_producto_id" data-repeatcolumn="1" class="dropdown-menu">
		<div class="ewItems" style="position: relative; overflow-x: hidden;">
<?php echo $productofotos->producto_id->RadioButtonListHtml(TRUE, "x{$productofotos_grid->RowIndex}_producto_id") ?>
		</div>
	</div>
	<div id="tp_x<?php echo $productofotos_grid->RowIndex ?>_producto_id" class="ewTemplate"><input type="radio" data-table="productofotos" data-field="x_producto_id" data-value-separator="<?php echo $productofotos->producto_id->DisplayValueSeparatorAttribute() ?>" name="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" id="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="{value}"<?php echo $productofotos->producto_id->EditAttributes() ?>></div>
</div>
</span>
<?php } ?>
<?php } else { ?>
<span id="el$rowindex$_productofotos_producto_id" class="form-group productofotos_producto_id">
<span<?php echo $productofotos->producto_id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productofotos->producto_id->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productofotos" data-field="x_producto_id" name="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" id="x<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="<?php echo ew_HtmlEncode($productofotos->producto_id->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productofotos" data-field="x_producto_id" name="o<?php echo $productofotos_grid->RowIndex ?>_producto_id" id="o<?php echo $productofotos_grid->RowIndex ?>_producto_id" value="<?php echo ew_HtmlEncode($productofotos->producto_id->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productofotos->epigrafe->Visible) { // epigrafe ?>
		<td data-name="epigrafe">
<?php if ($productofotos->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productofotos_epigrafe" class="form-group productofotos_epigrafe">
<input type="text" data-table="productofotos" data-field="x_epigrafe" name="x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" id="x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productofotos->epigrafe->getPlaceHolder()) ?>" value="<?php echo $productofotos->epigrafe->EditValue ?>"<?php echo $productofotos->epigrafe->EditAttributes() ?>>
</span>
<?php } else { ?>
<span id="el$rowindex$_productofotos_epigrafe" class="form-group productofotos_epigrafe">
<span<?php echo $productofotos->epigrafe->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productofotos->epigrafe->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productofotos" data-field="x_epigrafe" name="x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" id="x<?php echo $productofotos_grid->RowIndex ?>_epigrafe" value="<?php echo ew_HtmlEncode($productofotos->epigrafe->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productofotos" data-field="x_epigrafe" name="o<?php echo $productofotos_grid->RowIndex ?>_epigrafe" id="o<?php echo $productofotos_grid->RowIndex ?>_epigrafe" value="<?php echo ew_HtmlEncode($productofotos->epigrafe->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productofotos->foto->Visible) { // foto ?>
		<td data-name="foto">
<span id="el$rowindex$_productofotos_foto" class="form-group productofotos_foto">
<div id="fd_x<?php echo $productofotos_grid->RowIndex ?>_foto">
<span title="<?php echo $productofotos->foto->FldTitle() ? $productofotos->foto->FldTitle() : $Language->Phrase("ChooseFile") ?>" class="btn btn-default btn-sm fileinput-button ewTooltip<?php if ($productofotos->foto->ReadOnly || $productofotos->foto->Disabled) echo " hide"; ?>">
	<span><?php echo $Language->Phrase("ChooseFileBtn") ?></span>
	<input type="file" title=" " data-table="productofotos" data-field="x_foto" name="x<?php echo $productofotos_grid->RowIndex ?>_foto" id="x<?php echo $productofotos_grid->RowIndex ?>_foto"<?php echo $productofotos->foto->EditAttributes() ?>>
</span>
<input type="hidden" name="fn_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fn_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="<?php echo $productofotos->foto->Upload->FileName ?>">
<input type="hidden" name="fa_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fa_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="0">
<input type="hidden" name="fs_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fs_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="191">
<input type="hidden" name="fx_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fx_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="<?php echo $productofotos->foto->UploadAllowedFileExt ?>">
<input type="hidden" name="fm_x<?php echo $productofotos_grid->RowIndex ?>_foto" id= "fm_x<?php echo $productofotos_grid->RowIndex ?>_foto" value="<?php echo $productofotos->foto->UploadMaxFileSize ?>">
</div>
<table id="ft_x<?php echo $productofotos_grid->RowIndex ?>_foto" class="table table-condensed pull-left ewUploadTable"><tbody class="files"></tbody></table>
</span>
<input type="hidden" data-table="productofotos" data-field="x_foto" name="o<?php echo $productofotos_grid->RowIndex ?>_foto" id="o<?php echo $productofotos_grid->RowIndex ?>_foto" value="<?php echo ew_HtmlEncode($productofotos->foto->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productofotos->orden->Visible) { // orden ?>
		<td data-name="orden">
<?php if ($productofotos->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productofotos_orden" class="form-group productofotos_orden">
<input type="text" data-table="productofotos" data-field="x_orden" name="x<?php echo $productofotos_grid->RowIndex ?>_orden" id="x<?php echo $productofotos_grid->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productofotos->orden->getPlaceHolder()) ?>" value="<?php echo $productofotos->orden->EditValue ?>"<?php echo $productofotos->orden->EditAttributes() ?>>
</span>
<?php } else { ?>
<span id="el$rowindex$_productofotos_orden" class="form-group productofotos_orden">
<span<?php echo $productofotos->orden->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productofotos->orden->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productofotos" data-field="x_orden" name="x<?php echo $productofotos_grid->RowIndex ?>_orden" id="x<?php echo $productofotos_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productofotos->orden->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productofotos" data-field="x_orden" name="o<?php echo $productofotos_grid->RowIndex ?>_orden" id="o<?php echo $productofotos_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productofotos->orden->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productofotos->activo->Visible) { // activo ?>
		<td data-name="activo">
<?php if ($productofotos->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productofotos_activo" class="form-group productofotos_activo">
<select data-table="productofotos" data-field="x_activo" data-value-separator="<?php echo $productofotos->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productofotos_grid->RowIndex ?>_activo" name="x<?php echo $productofotos_grid->RowIndex ?>_activo"<?php echo $productofotos->activo->EditAttributes() ?>>
<?php echo $productofotos->activo->SelectOptionListHtml("x<?php echo $productofotos_grid->RowIndex ?>_activo") ?>
</select>
</span>
<?php } else { ?>
<span id="el$rowindex$_productofotos_activo" class="form-group productofotos_activo">
<span<?php echo $productofotos->activo->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productofotos->activo->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productofotos" data-field="x_activo" name="x<?php echo $productofotos_grid->RowIndex ?>_activo" id="x<?php echo $productofotos_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productofotos->activo->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productofotos" data-field="x_activo" name="o<?php echo $productofotos_grid->RowIndex ?>_activo" id="o<?php echo $productofotos_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productofotos->activo->OldValue) ?>">
</td>
	<?php } ?>
<?php

// Render list options (body, right)
$productofotos_grid->ListOptions->Render("body", "right", $productofotos_grid->RowCnt);
?>
<script type="text/javascript">
fproductofotosgrid.UpdateOpts(<?php echo $productofotos_grid->RowIndex ?>);
</script>
	</tr>
<?php
}
?>
</tbody>
</table>
<?php if ($productofotos->CurrentMode == "add" || $productofotos->CurrentMode == "copy") { ?>
<input type="hidden" name="a_list" id="a_list" value="gridinsert">
<input type="hidden" name="<?php echo $productofotos_grid->FormKeyCountName ?>" id="<?php echo $productofotos_grid->FormKeyCountName ?>" value="<?php echo $productofotos_grid->KeyCount ?>">
<?php echo $productofotos_grid->MultiSelectKey ?>
<?php } ?>
<?php if ($productofotos->CurrentMode == "edit") { ?>
<input type="hidden" name="a_list" id="a_list" value="gridupdate">
<input type="hidden" name="<?php echo $productofotos_grid->FormKeyCountName ?>" id="<?php echo $productofotos_grid->FormKeyCountName ?>" value="<?php echo $productofotos_grid->KeyCount ?>">
<?php echo $productofotos_grid->MultiSelectKey ?>
<?php } ?>
<?php if ($productofotos->CurrentMode == "") { ?>
<input type="hidden" name="a_list" id="a_list" value="">
<?php } ?>
<input type="hidden" name="detailpage" value="fproductofotosgrid">
</div>
<?php

// Close recordset
if ($productofotos_grid->Recordset)
	$productofotos_grid->Recordset->Close();
?>
<?php if ($productofotos_grid->ShowOtherOptions) { ?>
<div class="box-footer ewGridLowerPanel">
<?php
	foreach ($productofotos_grid->OtherOptions as &$option)
		$option->Render("body", "bottom");
?>
</div>
<div class="clearfix"></div>
<?php } ?>
</div>
</div>
<?php } ?>
<?php if ($productofotos_grid->TotalRecs == 0 && $productofotos->CurrentAction == "") { // Show other options ?>
<div class="ewListOtherOptions">
<?php
	foreach ($productofotos_grid->OtherOptions as &$option) {
		$option->ButtonClass = "";
		$option->Render("body", "");
	}
?>
</div>
<div class="clearfix"></div>
<?php } ?>
<?php if ($productofotos->Export == "") { ?>
<script type="text/javascript">
fproductofotosgrid.Init();
</script>
<?php } ?>
<?php
$productofotos_grid->Page_Terminate();
?>
