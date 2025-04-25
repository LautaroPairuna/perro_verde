<?php ew_Header(FALSE) ?>
<?php

// Create page object
if (!isset($productoversiones_grid)) $productoversiones_grid = new cproductoversiones_grid();

// Page init
$productoversiones_grid->Page_Init();

// Page main
$productoversiones_grid->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$productoversiones_grid->Page_Render();
?>
<?php if ($productoversiones->Export == "") { ?>
<script type="text/javascript">

// Form object
var fproductoversionesgrid = new ew_Form("fproductoversionesgrid", "grid");
fproductoversionesgrid.FormKeyCountName = '<?php echo $productoversiones_grid->FormKeyCountName ?>';

// Validate form
fproductoversionesgrid.Validate = function() {
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
			elm = this.GetElements("x" + infix + "_version");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productoversiones->version->FldCaption(), $productoversiones->version->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_orden");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productoversiones->orden->FldCaption(), $productoversiones->orden->ReqErrMsg)) ?>");
			elm = this.GetElements("x" + infix + "_orden");
			if (elm && !ew_CheckInteger(elm.value))
				return this.OnError(elm, "<?php echo ew_JsEncode2($productoversiones->orden->FldErrMsg()) ?>");
			elm = this.GetElements("x" + infix + "_activo");
			if (elm && !ew_IsHidden(elm) && !ew_HasValue(elm))
				return this.OnError(elm, "<?php echo ew_JsEncode2(str_replace("%s", $productoversiones->activo->FldCaption(), $productoversiones->activo->ReqErrMsg)) ?>");

			// Fire Form_CustomValidate event
			if (!this.Form_CustomValidate(fobj))
				return false;
		} // End Grid Add checking
	}
	return true;
}

// Check empty row
fproductoversionesgrid.EmptyRow = function(infix) {
	var fobj = this.Form;
	if (ew_ValueChanged(fobj, infix, "version", false)) return false;
	if (ew_ValueChanged(fobj, infix, "detalle", false)) return false;
	if (ew_ValueChanged(fobj, infix, "orden", false)) return false;
	if (ew_ValueChanged(fobj, infix, "activo", false)) return false;
	return true;
}

// Form_CustomValidate event
fproductoversionesgrid.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fproductoversionesgrid.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
fproductoversionesgrid.Lists["x_activo"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductoversionesgrid.Lists["x_activo"].Options = <?php echo json_encode($productoversiones_grid->activo->Options()) ?>;

// Form object for search
</script>
<?php } ?>
<?php
if ($productoversiones->CurrentAction == "gridadd") {
	if ($productoversiones->CurrentMode == "copy") {
		$bSelectLimit = $productoversiones_grid->UseSelectLimit;
		if ($bSelectLimit) {
			$productoversiones_grid->TotalRecs = $productoversiones->ListRecordCount();
			$productoversiones_grid->Recordset = $productoversiones_grid->LoadRecordset($productoversiones_grid->StartRec-1, $productoversiones_grid->DisplayRecs);
		} else {
			if ($productoversiones_grid->Recordset = $productoversiones_grid->LoadRecordset())
				$productoversiones_grid->TotalRecs = $productoversiones_grid->Recordset->RecordCount();
		}
		$productoversiones_grid->StartRec = 1;
		$productoversiones_grid->DisplayRecs = $productoversiones_grid->TotalRecs;
	} else {
		$productoversiones->CurrentFilter = "0=1";
		$productoversiones_grid->StartRec = 1;
		$productoversiones_grid->DisplayRecs = $productoversiones->GridAddRowCount;
	}
	$productoversiones_grid->TotalRecs = $productoversiones_grid->DisplayRecs;
	$productoversiones_grid->StopRec = $productoversiones_grid->DisplayRecs;
} else {
	$bSelectLimit = $productoversiones_grid->UseSelectLimit;
	if ($bSelectLimit) {
		if ($productoversiones_grid->TotalRecs <= 0)
			$productoversiones_grid->TotalRecs = $productoversiones->ListRecordCount();
	} else {
		if (!$productoversiones_grid->Recordset && ($productoversiones_grid->Recordset = $productoversiones_grid->LoadRecordset()))
			$productoversiones_grid->TotalRecs = $productoversiones_grid->Recordset->RecordCount();
	}
	$productoversiones_grid->StartRec = 1;
	$productoversiones_grid->DisplayRecs = $productoversiones_grid->TotalRecs; // Display all records
	if ($bSelectLimit)
		$productoversiones_grid->Recordset = $productoversiones_grid->LoadRecordset($productoversiones_grid->StartRec-1, $productoversiones_grid->DisplayRecs);

	// Set no record found message
	if ($productoversiones->CurrentAction == "" && $productoversiones_grid->TotalRecs == 0) {
		if ($productoversiones_grid->SearchWhere == "0=101")
			$productoversiones_grid->setWarningMessage($Language->Phrase("EnterSearchCriteria"));
		else
			$productoversiones_grid->setWarningMessage($Language->Phrase("NoRecord"));
	}
}
$productoversiones_grid->RenderOtherOptions();
?>
<?php $productoversiones_grid->ShowPageHeader(); ?>
<?php
$productoversiones_grid->ShowMessage();
?>
<?php if ($productoversiones_grid->TotalRecs > 0 || $productoversiones->CurrentAction <> "") { ?>
<div class="box ewBox ewGrid<?php if ($productoversiones_grid->IsAddOrEdit()) { ?> ewGridAddEdit<?php } ?> productoversiones">
<div id="fproductoversionesgrid" class="ewForm ewListForm form-inline">
<?php if ($productoversiones_grid->ShowOtherOptions) { ?>
<div class="box-header ewGridUpperPanel">
<?php
	foreach ($productoversiones_grid->OtherOptions as &$option)
		$option->Render("body");
?>
</div>
<div class="clearfix"></div>
<?php } ?>
<div id="gmp_productoversiones" class="<?php if (ew_IsResponsiveLayout()) { ?>table-responsive <?php } ?>ewGridMiddlePanel">
<table id="tbl_productoversionesgrid" class="table ewTable">
<thead>
	<tr class="ewTableHeader">
<?php

// Header row
$productoversiones_grid->RowType = EW_ROWTYPE_HEADER;

// Render list options
$productoversiones_grid->RenderListOptions();

// Render list options (header, left)
$productoversiones_grid->ListOptions->Render("header", "left");
?>
<?php if ($productoversiones->id->Visible) { // id ?>
	<?php if ($productoversiones->SortUrl($productoversiones->id) == "") { ?>
		<th data-name="id" class="<?php echo $productoversiones->id->HeaderCellClass() ?>"><div id="elh_productoversiones_id" class="productoversiones_id"><div class="ewTableHeaderCaption"><?php echo $productoversiones->id->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="id" class="<?php echo $productoversiones->id->HeaderCellClass() ?>"><div><div id="elh_productoversiones_id" class="productoversiones_id">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoversiones->id->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoversiones->id->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoversiones->id->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoversiones->version->Visible) { // version ?>
	<?php if ($productoversiones->SortUrl($productoversiones->version) == "") { ?>
		<th data-name="version" class="<?php echo $productoversiones->version->HeaderCellClass() ?>"><div id="elh_productoversiones_version" class="productoversiones_version"><div class="ewTableHeaderCaption"><?php echo $productoversiones->version->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="version" class="<?php echo $productoversiones->version->HeaderCellClass() ?>"><div><div id="elh_productoversiones_version" class="productoversiones_version">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoversiones->version->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoversiones->version->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoversiones->version->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoversiones->detalle->Visible) { // detalle ?>
	<?php if ($productoversiones->SortUrl($productoversiones->detalle) == "") { ?>
		<th data-name="detalle" class="<?php echo $productoversiones->detalle->HeaderCellClass() ?>"><div id="elh_productoversiones_detalle" class="productoversiones_detalle"><div class="ewTableHeaderCaption"><?php echo $productoversiones->detalle->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="detalle" class="<?php echo $productoversiones->detalle->HeaderCellClass() ?>"><div><div id="elh_productoversiones_detalle" class="productoversiones_detalle">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoversiones->detalle->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoversiones->detalle->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoversiones->detalle->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoversiones->orden->Visible) { // orden ?>
	<?php if ($productoversiones->SortUrl($productoversiones->orden) == "") { ?>
		<th data-name="orden" class="<?php echo $productoversiones->orden->HeaderCellClass() ?>"><div id="elh_productoversiones_orden" class="productoversiones_orden"><div class="ewTableHeaderCaption"><?php echo $productoversiones->orden->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="orden" class="<?php echo $productoversiones->orden->HeaderCellClass() ?>"><div><div id="elh_productoversiones_orden" class="productoversiones_orden">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoversiones->orden->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoversiones->orden->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoversiones->orden->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoversiones->activo->Visible) { // activo ?>
	<?php if ($productoversiones->SortUrl($productoversiones->activo) == "") { ?>
		<th data-name="activo" class="<?php echo $productoversiones->activo->HeaderCellClass() ?>"><div id="elh_productoversiones_activo" class="productoversiones_activo"><div class="ewTableHeaderCaption"><?php echo $productoversiones->activo->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="activo" class="<?php echo $productoversiones->activo->HeaderCellClass() ?>"><div><div id="elh_productoversiones_activo" class="productoversiones_activo">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoversiones->activo->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoversiones->activo->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoversiones->activo->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php

// Render list options (header, right)
$productoversiones_grid->ListOptions->Render("header", "right");
?>
	</tr>
</thead>
<tbody>
<?php
$productoversiones_grid->StartRec = 1;
$productoversiones_grid->StopRec = $productoversiones_grid->TotalRecs; // Show all records

// Restore number of post back records
if ($objForm) {
	$objForm->Index = -1;
	if ($objForm->HasValue($productoversiones_grid->FormKeyCountName) && ($productoversiones->CurrentAction == "gridadd" || $productoversiones->CurrentAction == "gridedit" || $productoversiones->CurrentAction == "F")) {
		$productoversiones_grid->KeyCount = $objForm->GetValue($productoversiones_grid->FormKeyCountName);
		$productoversiones_grid->StopRec = $productoversiones_grid->StartRec + $productoversiones_grid->KeyCount - 1;
	}
}
$productoversiones_grid->RecCnt = $productoversiones_grid->StartRec - 1;
if ($productoversiones_grid->Recordset && !$productoversiones_grid->Recordset->EOF) {
	$productoversiones_grid->Recordset->MoveFirst();
	$bSelectLimit = $productoversiones_grid->UseSelectLimit;
	if (!$bSelectLimit && $productoversiones_grid->StartRec > 1)
		$productoversiones_grid->Recordset->Move($productoversiones_grid->StartRec - 1);
} elseif (!$productoversiones->AllowAddDeleteRow && $productoversiones_grid->StopRec == 0) {
	$productoversiones_grid->StopRec = $productoversiones->GridAddRowCount;
}

// Initialize aggregate
$productoversiones->RowType = EW_ROWTYPE_AGGREGATEINIT;
$productoversiones->ResetAttrs();
$productoversiones_grid->RenderRow();
if ($productoversiones->CurrentAction == "gridadd")
	$productoversiones_grid->RowIndex = 0;
if ($productoversiones->CurrentAction == "gridedit")
	$productoversiones_grid->RowIndex = 0;
while ($productoversiones_grid->RecCnt < $productoversiones_grid->StopRec) {
	$productoversiones_grid->RecCnt++;
	if (intval($productoversiones_grid->RecCnt) >= intval($productoversiones_grid->StartRec)) {
		$productoversiones_grid->RowCnt++;
		if ($productoversiones->CurrentAction == "gridadd" || $productoversiones->CurrentAction == "gridedit" || $productoversiones->CurrentAction == "F") {
			$productoversiones_grid->RowIndex++;
			$objForm->Index = $productoversiones_grid->RowIndex;
			if ($objForm->HasValue($productoversiones_grid->FormActionName))
				$productoversiones_grid->RowAction = strval($objForm->GetValue($productoversiones_grid->FormActionName));
			elseif ($productoversiones->CurrentAction == "gridadd")
				$productoversiones_grid->RowAction = "insert";
			else
				$productoversiones_grid->RowAction = "";
		}

		// Set up key count
		$productoversiones_grid->KeyCount = $productoversiones_grid->RowIndex;

		// Init row class and style
		$productoversiones->ResetAttrs();
		$productoversiones->CssClass = "";
		if ($productoversiones->CurrentAction == "gridadd") {
			if ($productoversiones->CurrentMode == "copy") {
				$productoversiones_grid->LoadRowValues($productoversiones_grid->Recordset); // Load row values
				$productoversiones_grid->SetRecordKey($productoversiones_grid->RowOldKey, $productoversiones_grid->Recordset); // Set old record key
			} else {
				$productoversiones_grid->LoadRowValues(); // Load default values
				$productoversiones_grid->RowOldKey = ""; // Clear old key value
			}
		} else {
			$productoversiones_grid->LoadRowValues($productoversiones_grid->Recordset); // Load row values
		}
		$productoversiones->RowType = EW_ROWTYPE_VIEW; // Render view
		if ($productoversiones->CurrentAction == "gridadd") // Grid add
			$productoversiones->RowType = EW_ROWTYPE_ADD; // Render add
		if ($productoversiones->CurrentAction == "gridadd" && $productoversiones->EventCancelled && !$objForm->HasValue("k_blankrow")) // Insert failed
			$productoversiones_grid->RestoreCurrentRowFormValues($productoversiones_grid->RowIndex); // Restore form values
		if ($productoversiones->CurrentAction == "gridedit") { // Grid edit
			if ($productoversiones->EventCancelled) {
				$productoversiones_grid->RestoreCurrentRowFormValues($productoversiones_grid->RowIndex); // Restore form values
			}
			if ($productoversiones_grid->RowAction == "insert")
				$productoversiones->RowType = EW_ROWTYPE_ADD; // Render add
			else
				$productoversiones->RowType = EW_ROWTYPE_EDIT; // Render edit
		}
		if ($productoversiones->CurrentAction == "gridedit" && ($productoversiones->RowType == EW_ROWTYPE_EDIT || $productoversiones->RowType == EW_ROWTYPE_ADD) && $productoversiones->EventCancelled) // Update failed
			$productoversiones_grid->RestoreCurrentRowFormValues($productoversiones_grid->RowIndex); // Restore form values
		if ($productoversiones->RowType == EW_ROWTYPE_EDIT) // Edit row
			$productoversiones_grid->EditRowCnt++;
		if ($productoversiones->CurrentAction == "F") // Confirm row
			$productoversiones_grid->RestoreCurrentRowFormValues($productoversiones_grid->RowIndex); // Restore form values

		// Set up row id / data-rowindex
		$productoversiones->RowAttrs = array_merge($productoversiones->RowAttrs, array('data-rowindex'=>$productoversiones_grid->RowCnt, 'id'=>'r' . $productoversiones_grid->RowCnt . '_productoversiones', 'data-rowtype'=>$productoversiones->RowType));

		// Render row
		$productoversiones_grid->RenderRow();

		// Render list options
		$productoversiones_grid->RenderListOptions();

		// Skip delete row / empty row for confirm page
		if ($productoversiones_grid->RowAction <> "delete" && $productoversiones_grid->RowAction <> "insertdelete" && !($productoversiones_grid->RowAction == "insert" && $productoversiones->CurrentAction == "F" && $productoversiones_grid->EmptyRow())) {
?>
	<tr<?php echo $productoversiones->RowAttributes() ?>>
<?php

// Render list options (body, left)
$productoversiones_grid->ListOptions->Render("body", "left", $productoversiones_grid->RowCnt);
?>
	<?php if ($productoversiones->id->Visible) { // id ?>
		<td data-name="id"<?php echo $productoversiones->id->CellAttributes() ?>>
<?php if ($productoversiones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<input type="hidden" data-table="productoversiones" data-field="x_id" name="o<?php echo $productoversiones_grid->RowIndex ?>_id" id="o<?php echo $productoversiones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoversiones->id->OldValue) ?>">
<?php } ?>
<?php if ($productoversiones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_id" class="form-group productoversiones_id">
<span<?php echo $productoversiones->id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoversiones->id->EditValue ?></p></span>
</span>
<input type="hidden" data-table="productoversiones" data-field="x_id" name="x<?php echo $productoversiones_grid->RowIndex ?>_id" id="x<?php echo $productoversiones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoversiones->id->CurrentValue) ?>">
<?php } ?>
<?php if ($productoversiones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_id" class="productoversiones_id">
<span<?php echo $productoversiones->id->ViewAttributes() ?>>
<?php echo $productoversiones->id->ListViewValue() ?></span>
</span>
<?php if ($productoversiones->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productoversiones" data-field="x_id" name="x<?php echo $productoversiones_grid->RowIndex ?>_id" id="x<?php echo $productoversiones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoversiones->id->FormValue) ?>">
<input type="hidden" data-table="productoversiones" data-field="x_id" name="o<?php echo $productoversiones_grid->RowIndex ?>_id" id="o<?php echo $productoversiones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoversiones->id->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productoversiones" data-field="x_id" name="fproductoversionesgrid$x<?php echo $productoversiones_grid->RowIndex ?>_id" id="fproductoversionesgrid$x<?php echo $productoversiones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoversiones->id->FormValue) ?>">
<input type="hidden" data-table="productoversiones" data-field="x_id" name="fproductoversionesgrid$o<?php echo $productoversiones_grid->RowIndex ?>_id" id="fproductoversionesgrid$o<?php echo $productoversiones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoversiones->id->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoversiones->version->Visible) { // version ?>
		<td data-name="version"<?php echo $productoversiones->version->CellAttributes() ?>>
<?php if ($productoversiones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_version" class="form-group productoversiones_version">
<input type="text" data-table="productoversiones" data-field="x_version" name="x<?php echo $productoversiones_grid->RowIndex ?>_version" id="x<?php echo $productoversiones_grid->RowIndex ?>_version" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoversiones->version->getPlaceHolder()) ?>" value="<?php echo $productoversiones->version->EditValue ?>"<?php echo $productoversiones->version->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoversiones" data-field="x_version" name="o<?php echo $productoversiones_grid->RowIndex ?>_version" id="o<?php echo $productoversiones_grid->RowIndex ?>_version" value="<?php echo ew_HtmlEncode($productoversiones->version->OldValue) ?>">
<?php } ?>
<?php if ($productoversiones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_version" class="form-group productoversiones_version">
<input type="text" data-table="productoversiones" data-field="x_version" name="x<?php echo $productoversiones_grid->RowIndex ?>_version" id="x<?php echo $productoversiones_grid->RowIndex ?>_version" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoversiones->version->getPlaceHolder()) ?>" value="<?php echo $productoversiones->version->EditValue ?>"<?php echo $productoversiones->version->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productoversiones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_version" class="productoversiones_version">
<span<?php echo $productoversiones->version->ViewAttributes() ?>>
<?php echo $productoversiones->version->ListViewValue() ?></span>
</span>
<?php if ($productoversiones->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productoversiones" data-field="x_version" name="x<?php echo $productoversiones_grid->RowIndex ?>_version" id="x<?php echo $productoversiones_grid->RowIndex ?>_version" value="<?php echo ew_HtmlEncode($productoversiones->version->FormValue) ?>">
<input type="hidden" data-table="productoversiones" data-field="x_version" name="o<?php echo $productoversiones_grid->RowIndex ?>_version" id="o<?php echo $productoversiones_grid->RowIndex ?>_version" value="<?php echo ew_HtmlEncode($productoversiones->version->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productoversiones" data-field="x_version" name="fproductoversionesgrid$x<?php echo $productoversiones_grid->RowIndex ?>_version" id="fproductoversionesgrid$x<?php echo $productoversiones_grid->RowIndex ?>_version" value="<?php echo ew_HtmlEncode($productoversiones->version->FormValue) ?>">
<input type="hidden" data-table="productoversiones" data-field="x_version" name="fproductoversionesgrid$o<?php echo $productoversiones_grid->RowIndex ?>_version" id="fproductoversionesgrid$o<?php echo $productoversiones_grid->RowIndex ?>_version" value="<?php echo ew_HtmlEncode($productoversiones->version->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoversiones->detalle->Visible) { // detalle ?>
		<td data-name="detalle"<?php echo $productoversiones->detalle->CellAttributes() ?>>
<?php if ($productoversiones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_detalle" class="form-group productoversiones_detalle">
<input type="text" data-table="productoversiones" data-field="x_detalle" name="x<?php echo $productoversiones_grid->RowIndex ?>_detalle" id="x<?php echo $productoversiones_grid->RowIndex ?>_detalle" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoversiones->detalle->getPlaceHolder()) ?>" value="<?php echo $productoversiones->detalle->EditValue ?>"<?php echo $productoversiones->detalle->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoversiones" data-field="x_detalle" name="o<?php echo $productoversiones_grid->RowIndex ?>_detalle" id="o<?php echo $productoversiones_grid->RowIndex ?>_detalle" value="<?php echo ew_HtmlEncode($productoversiones->detalle->OldValue) ?>">
<?php } ?>
<?php if ($productoversiones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_detalle" class="form-group productoversiones_detalle">
<input type="text" data-table="productoversiones" data-field="x_detalle" name="x<?php echo $productoversiones_grid->RowIndex ?>_detalle" id="x<?php echo $productoversiones_grid->RowIndex ?>_detalle" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoversiones->detalle->getPlaceHolder()) ?>" value="<?php echo $productoversiones->detalle->EditValue ?>"<?php echo $productoversiones->detalle->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productoversiones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_detalle" class="productoversiones_detalle">
<span<?php echo $productoversiones->detalle->ViewAttributes() ?>>
<?php echo $productoversiones->detalle->ListViewValue() ?></span>
</span>
<?php if ($productoversiones->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productoversiones" data-field="x_detalle" name="x<?php echo $productoversiones_grid->RowIndex ?>_detalle" id="x<?php echo $productoversiones_grid->RowIndex ?>_detalle" value="<?php echo ew_HtmlEncode($productoversiones->detalle->FormValue) ?>">
<input type="hidden" data-table="productoversiones" data-field="x_detalle" name="o<?php echo $productoversiones_grid->RowIndex ?>_detalle" id="o<?php echo $productoversiones_grid->RowIndex ?>_detalle" value="<?php echo ew_HtmlEncode($productoversiones->detalle->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productoversiones" data-field="x_detalle" name="fproductoversionesgrid$x<?php echo $productoversiones_grid->RowIndex ?>_detalle" id="fproductoversionesgrid$x<?php echo $productoversiones_grid->RowIndex ?>_detalle" value="<?php echo ew_HtmlEncode($productoversiones->detalle->FormValue) ?>">
<input type="hidden" data-table="productoversiones" data-field="x_detalle" name="fproductoversionesgrid$o<?php echo $productoversiones_grid->RowIndex ?>_detalle" id="fproductoversionesgrid$o<?php echo $productoversiones_grid->RowIndex ?>_detalle" value="<?php echo ew_HtmlEncode($productoversiones->detalle->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoversiones->orden->Visible) { // orden ?>
		<td data-name="orden"<?php echo $productoversiones->orden->CellAttributes() ?>>
<?php if ($productoversiones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_orden" class="form-group productoversiones_orden">
<input type="text" data-table="productoversiones" data-field="x_orden" name="x<?php echo $productoversiones_grid->RowIndex ?>_orden" id="x<?php echo $productoversiones_grid->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productoversiones->orden->getPlaceHolder()) ?>" value="<?php echo $productoversiones->orden->EditValue ?>"<?php echo $productoversiones->orden->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoversiones" data-field="x_orden" name="o<?php echo $productoversiones_grid->RowIndex ?>_orden" id="o<?php echo $productoversiones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoversiones->orden->OldValue) ?>">
<?php } ?>
<?php if ($productoversiones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_orden" class="form-group productoversiones_orden">
<input type="text" data-table="productoversiones" data-field="x_orden" name="x<?php echo $productoversiones_grid->RowIndex ?>_orden" id="x<?php echo $productoversiones_grid->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productoversiones->orden->getPlaceHolder()) ?>" value="<?php echo $productoversiones->orden->EditValue ?>"<?php echo $productoversiones->orden->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productoversiones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_orden" class="productoversiones_orden">
<span<?php echo $productoversiones->orden->ViewAttributes() ?>>
<?php echo $productoversiones->orden->ListViewValue() ?></span>
</span>
<?php if ($productoversiones->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productoversiones" data-field="x_orden" name="x<?php echo $productoversiones_grid->RowIndex ?>_orden" id="x<?php echo $productoversiones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoversiones->orden->FormValue) ?>">
<input type="hidden" data-table="productoversiones" data-field="x_orden" name="o<?php echo $productoversiones_grid->RowIndex ?>_orden" id="o<?php echo $productoversiones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoversiones->orden->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productoversiones" data-field="x_orden" name="fproductoversionesgrid$x<?php echo $productoversiones_grid->RowIndex ?>_orden" id="fproductoversionesgrid$x<?php echo $productoversiones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoversiones->orden->FormValue) ?>">
<input type="hidden" data-table="productoversiones" data-field="x_orden" name="fproductoversionesgrid$o<?php echo $productoversiones_grid->RowIndex ?>_orden" id="fproductoversionesgrid$o<?php echo $productoversiones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoversiones->orden->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoversiones->activo->Visible) { // activo ?>
		<td data-name="activo"<?php echo $productoversiones->activo->CellAttributes() ?>>
<?php if ($productoversiones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_activo" class="form-group productoversiones_activo">
<select data-table="productoversiones" data-field="x_activo" data-value-separator="<?php echo $productoversiones->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productoversiones_grid->RowIndex ?>_activo" name="x<?php echo $productoversiones_grid->RowIndex ?>_activo"<?php echo $productoversiones->activo->EditAttributes() ?>>
<?php echo $productoversiones->activo->SelectOptionListHtml("x<?php echo $productoversiones_grid->RowIndex ?>_activo") ?>
</select>
</span>
<input type="hidden" data-table="productoversiones" data-field="x_activo" name="o<?php echo $productoversiones_grid->RowIndex ?>_activo" id="o<?php echo $productoversiones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoversiones->activo->OldValue) ?>">
<?php } ?>
<?php if ($productoversiones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_activo" class="form-group productoversiones_activo">
<select data-table="productoversiones" data-field="x_activo" data-value-separator="<?php echo $productoversiones->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productoversiones_grid->RowIndex ?>_activo" name="x<?php echo $productoversiones_grid->RowIndex ?>_activo"<?php echo $productoversiones->activo->EditAttributes() ?>>
<?php echo $productoversiones->activo->SelectOptionListHtml("x<?php echo $productoversiones_grid->RowIndex ?>_activo") ?>
</select>
</span>
<?php } ?>
<?php if ($productoversiones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoversiones_grid->RowCnt ?>_productoversiones_activo" class="productoversiones_activo">
<span<?php echo $productoversiones->activo->ViewAttributes() ?>>
<?php echo $productoversiones->activo->ListViewValue() ?></span>
</span>
<?php if ($productoversiones->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productoversiones" data-field="x_activo" name="x<?php echo $productoversiones_grid->RowIndex ?>_activo" id="x<?php echo $productoversiones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoversiones->activo->FormValue) ?>">
<input type="hidden" data-table="productoversiones" data-field="x_activo" name="o<?php echo $productoversiones_grid->RowIndex ?>_activo" id="o<?php echo $productoversiones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoversiones->activo->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productoversiones" data-field="x_activo" name="fproductoversionesgrid$x<?php echo $productoversiones_grid->RowIndex ?>_activo" id="fproductoversionesgrid$x<?php echo $productoversiones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoversiones->activo->FormValue) ?>">
<input type="hidden" data-table="productoversiones" data-field="x_activo" name="fproductoversionesgrid$o<?php echo $productoversiones_grid->RowIndex ?>_activo" id="fproductoversionesgrid$o<?php echo $productoversiones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoversiones->activo->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
<?php

// Render list options (body, right)
$productoversiones_grid->ListOptions->Render("body", "right", $productoversiones_grid->RowCnt);
?>
	</tr>
<?php if ($productoversiones->RowType == EW_ROWTYPE_ADD || $productoversiones->RowType == EW_ROWTYPE_EDIT) { ?>
<script type="text/javascript">
fproductoversionesgrid.UpdateOpts(<?php echo $productoversiones_grid->RowIndex ?>);
</script>
<?php } ?>
<?php
	}
	} // End delete row checking
	if ($productoversiones->CurrentAction <> "gridadd" || $productoversiones->CurrentMode == "copy")
		if (!$productoversiones_grid->Recordset->EOF) $productoversiones_grid->Recordset->MoveNext();
}
?>
<?php
	if ($productoversiones->CurrentMode == "add" || $productoversiones->CurrentMode == "copy" || $productoversiones->CurrentMode == "edit") {
		$productoversiones_grid->RowIndex = '$rowindex$';
		$productoversiones_grid->LoadRowValues();

		// Set row properties
		$productoversiones->ResetAttrs();
		$productoversiones->RowAttrs = array_merge($productoversiones->RowAttrs, array('data-rowindex'=>$productoversiones_grid->RowIndex, 'id'=>'r0_productoversiones', 'data-rowtype'=>EW_ROWTYPE_ADD));
		ew_AppendClass($productoversiones->RowAttrs["class"], "ewTemplate");
		$productoversiones->RowType = EW_ROWTYPE_ADD;

		// Render row
		$productoversiones_grid->RenderRow();

		// Render list options
		$productoversiones_grid->RenderListOptions();
		$productoversiones_grid->StartRowCnt = 0;
?>
	<tr<?php echo $productoversiones->RowAttributes() ?>>
<?php

// Render list options (body, left)
$productoversiones_grid->ListOptions->Render("body", "left", $productoversiones_grid->RowIndex);
?>
	<?php if ($productoversiones->id->Visible) { // id ?>
		<td data-name="id">
<?php if ($productoversiones->CurrentAction <> "F") { ?>
<?php } else { ?>
<span id="el$rowindex$_productoversiones_id" class="form-group productoversiones_id">
<span<?php echo $productoversiones->id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoversiones->id->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productoversiones" data-field="x_id" name="x<?php echo $productoversiones_grid->RowIndex ?>_id" id="x<?php echo $productoversiones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoversiones->id->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productoversiones" data-field="x_id" name="o<?php echo $productoversiones_grid->RowIndex ?>_id" id="o<?php echo $productoversiones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoversiones->id->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoversiones->version->Visible) { // version ?>
		<td data-name="version">
<?php if ($productoversiones->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productoversiones_version" class="form-group productoversiones_version">
<input type="text" data-table="productoversiones" data-field="x_version" name="x<?php echo $productoversiones_grid->RowIndex ?>_version" id="x<?php echo $productoversiones_grid->RowIndex ?>_version" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoversiones->version->getPlaceHolder()) ?>" value="<?php echo $productoversiones->version->EditValue ?>"<?php echo $productoversiones->version->EditAttributes() ?>>
</span>
<?php } else { ?>
<span id="el$rowindex$_productoversiones_version" class="form-group productoversiones_version">
<span<?php echo $productoversiones->version->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoversiones->version->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productoversiones" data-field="x_version" name="x<?php echo $productoversiones_grid->RowIndex ?>_version" id="x<?php echo $productoversiones_grid->RowIndex ?>_version" value="<?php echo ew_HtmlEncode($productoversiones->version->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productoversiones" data-field="x_version" name="o<?php echo $productoversiones_grid->RowIndex ?>_version" id="o<?php echo $productoversiones_grid->RowIndex ?>_version" value="<?php echo ew_HtmlEncode($productoversiones->version->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoversiones->detalle->Visible) { // detalle ?>
		<td data-name="detalle">
<?php if ($productoversiones->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productoversiones_detalle" class="form-group productoversiones_detalle">
<input type="text" data-table="productoversiones" data-field="x_detalle" name="x<?php echo $productoversiones_grid->RowIndex ?>_detalle" id="x<?php echo $productoversiones_grid->RowIndex ?>_detalle" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoversiones->detalle->getPlaceHolder()) ?>" value="<?php echo $productoversiones->detalle->EditValue ?>"<?php echo $productoversiones->detalle->EditAttributes() ?>>
</span>
<?php } else { ?>
<span id="el$rowindex$_productoversiones_detalle" class="form-group productoversiones_detalle">
<span<?php echo $productoversiones->detalle->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoversiones->detalle->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productoversiones" data-field="x_detalle" name="x<?php echo $productoversiones_grid->RowIndex ?>_detalle" id="x<?php echo $productoversiones_grid->RowIndex ?>_detalle" value="<?php echo ew_HtmlEncode($productoversiones->detalle->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productoversiones" data-field="x_detalle" name="o<?php echo $productoversiones_grid->RowIndex ?>_detalle" id="o<?php echo $productoversiones_grid->RowIndex ?>_detalle" value="<?php echo ew_HtmlEncode($productoversiones->detalle->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoversiones->orden->Visible) { // orden ?>
		<td data-name="orden">
<?php if ($productoversiones->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productoversiones_orden" class="form-group productoversiones_orden">
<input type="text" data-table="productoversiones" data-field="x_orden" name="x<?php echo $productoversiones_grid->RowIndex ?>_orden" id="x<?php echo $productoversiones_grid->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productoversiones->orden->getPlaceHolder()) ?>" value="<?php echo $productoversiones->orden->EditValue ?>"<?php echo $productoversiones->orden->EditAttributes() ?>>
</span>
<?php } else { ?>
<span id="el$rowindex$_productoversiones_orden" class="form-group productoversiones_orden">
<span<?php echo $productoversiones->orden->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoversiones->orden->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productoversiones" data-field="x_orden" name="x<?php echo $productoversiones_grid->RowIndex ?>_orden" id="x<?php echo $productoversiones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoversiones->orden->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productoversiones" data-field="x_orden" name="o<?php echo $productoversiones_grid->RowIndex ?>_orden" id="o<?php echo $productoversiones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoversiones->orden->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoversiones->activo->Visible) { // activo ?>
		<td data-name="activo">
<?php if ($productoversiones->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productoversiones_activo" class="form-group productoversiones_activo">
<select data-table="productoversiones" data-field="x_activo" data-value-separator="<?php echo $productoversiones->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productoversiones_grid->RowIndex ?>_activo" name="x<?php echo $productoversiones_grid->RowIndex ?>_activo"<?php echo $productoversiones->activo->EditAttributes() ?>>
<?php echo $productoversiones->activo->SelectOptionListHtml("x<?php echo $productoversiones_grid->RowIndex ?>_activo") ?>
</select>
</span>
<?php } else { ?>
<span id="el$rowindex$_productoversiones_activo" class="form-group productoversiones_activo">
<span<?php echo $productoversiones->activo->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoversiones->activo->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productoversiones" data-field="x_activo" name="x<?php echo $productoversiones_grid->RowIndex ?>_activo" id="x<?php echo $productoversiones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoversiones->activo->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productoversiones" data-field="x_activo" name="o<?php echo $productoversiones_grid->RowIndex ?>_activo" id="o<?php echo $productoversiones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoversiones->activo->OldValue) ?>">
</td>
	<?php } ?>
<?php

// Render list options (body, right)
$productoversiones_grid->ListOptions->Render("body", "right", $productoversiones_grid->RowCnt);
?>
<script type="text/javascript">
fproductoversionesgrid.UpdateOpts(<?php echo $productoversiones_grid->RowIndex ?>);
</script>
	</tr>
<?php
}
?>
</tbody>
</table>
<?php if ($productoversiones->CurrentMode == "add" || $productoversiones->CurrentMode == "copy") { ?>
<input type="hidden" name="a_list" id="a_list" value="gridinsert">
<input type="hidden" name="<?php echo $productoversiones_grid->FormKeyCountName ?>" id="<?php echo $productoversiones_grid->FormKeyCountName ?>" value="<?php echo $productoversiones_grid->KeyCount ?>">
<?php echo $productoversiones_grid->MultiSelectKey ?>
<?php } ?>
<?php if ($productoversiones->CurrentMode == "edit") { ?>
<input type="hidden" name="a_list" id="a_list" value="gridupdate">
<input type="hidden" name="<?php echo $productoversiones_grid->FormKeyCountName ?>" id="<?php echo $productoversiones_grid->FormKeyCountName ?>" value="<?php echo $productoversiones_grid->KeyCount ?>">
<?php echo $productoversiones_grid->MultiSelectKey ?>
<?php } ?>
<?php if ($productoversiones->CurrentMode == "") { ?>
<input type="hidden" name="a_list" id="a_list" value="">
<?php } ?>
<input type="hidden" name="detailpage" value="fproductoversionesgrid">
</div>
<?php

// Close recordset
if ($productoversiones_grid->Recordset)
	$productoversiones_grid->Recordset->Close();
?>
<?php if ($productoversiones_grid->ShowOtherOptions) { ?>
<div class="box-footer ewGridLowerPanel">
<?php
	foreach ($productoversiones_grid->OtherOptions as &$option)
		$option->Render("body", "bottom");
?>
</div>
<div class="clearfix"></div>
<?php } ?>
</div>
</div>
<?php } ?>
<?php if ($productoversiones_grid->TotalRecs == 0 && $productoversiones->CurrentAction == "") { // Show other options ?>
<div class="ewListOtherOptions">
<?php
	foreach ($productoversiones_grid->OtherOptions as &$option) {
		$option->ButtonClass = "";
		$option->Render("body", "");
	}
?>
</div>
<div class="clearfix"></div>
<?php } ?>
<?php if ($productoversiones->Export == "") { ?>
<script type="text/javascript">
fproductoversionesgrid.Init();
</script>
<?php } ?>
<?php
$productoversiones_grid->Page_Terminate();
?>
