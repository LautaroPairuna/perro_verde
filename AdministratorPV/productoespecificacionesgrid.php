<?php ew_Header(FALSE) ?>
<?php

// Create page object
if (!isset($productoespecificaciones_grid)) $productoespecificaciones_grid = new cproductoespecificaciones_grid();

// Page init
$productoespecificaciones_grid->Page_Init();

// Page main
$productoespecificaciones_grid->Page_Main();

// Global Page Rendering event (in userfn*.php)
Page_Rendering();

// Page Rendering event
$productoespecificaciones_grid->Page_Render();
?>
<?php if ($productoespecificaciones->Export == "") { ?>
<script type="text/javascript">

// Form object
var fproductoespecificacionesgrid = new ew_Form("fproductoespecificacionesgrid", "grid");
fproductoespecificacionesgrid.FormKeyCountName = '<?php echo $productoespecificaciones_grid->FormKeyCountName ?>';

// Validate form
fproductoespecificacionesgrid.Validate = function() {
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
	return true;
}

// Check empty row
fproductoespecificacionesgrid.EmptyRow = function(infix) {
	var fobj = this.Form;
	if (ew_ValueChanged(fobj, infix, "categoria", false)) return false;
	if (ew_ValueChanged(fobj, infix, "especificaciones", false)) return false;
	if (ew_ValueChanged(fobj, infix, "orden", false)) return false;
	if (ew_ValueChanged(fobj, infix, "id_copy", false)) return false;
	if (ew_ValueChanged(fobj, infix, "activo", false)) return false;
	return true;
}

// Form_CustomValidate event
fproductoespecificacionesgrid.Form_CustomValidate = 
 function(fobj) { // DO NOT CHANGE THIS LINE!

 	// Your custom validation code here, return false if invalid.
 	return true;
 }

// Use JavaScript validation or not
fproductoespecificacionesgrid.ValidateRequired = <?php echo json_encode(EW_CLIENT_VALIDATE) ?>;

// Dynamic selection lists
fproductoespecificacionesgrid.Lists["x_activo"] = {"LinkField":"","Ajax":null,"AutoFill":false,"DisplayFields":["","","",""],"ParentFields":[],"ChildFields":[],"FilterFields":[],"Options":[],"Template":""};
fproductoespecificacionesgrid.Lists["x_activo"].Options = <?php echo json_encode($productoespecificaciones_grid->activo->Options()) ?>;

// Form object for search
</script>
<?php } ?>
<?php
if ($productoespecificaciones->CurrentAction == "gridadd") {
	if ($productoespecificaciones->CurrentMode == "copy") {
		$bSelectLimit = $productoespecificaciones_grid->UseSelectLimit;
		if ($bSelectLimit) {
			$productoespecificaciones_grid->TotalRecs = $productoespecificaciones->ListRecordCount();
			$productoespecificaciones_grid->Recordset = $productoespecificaciones_grid->LoadRecordset($productoespecificaciones_grid->StartRec-1, $productoespecificaciones_grid->DisplayRecs);
		} else {
			if ($productoespecificaciones_grid->Recordset = $productoespecificaciones_grid->LoadRecordset())
				$productoespecificaciones_grid->TotalRecs = $productoespecificaciones_grid->Recordset->RecordCount();
		}
		$productoespecificaciones_grid->StartRec = 1;
		$productoespecificaciones_grid->DisplayRecs = $productoespecificaciones_grid->TotalRecs;
	} else {
		$productoespecificaciones->CurrentFilter = "0=1";
		$productoespecificaciones_grid->StartRec = 1;
		$productoespecificaciones_grid->DisplayRecs = $productoespecificaciones->GridAddRowCount;
	}
	$productoespecificaciones_grid->TotalRecs = $productoespecificaciones_grid->DisplayRecs;
	$productoespecificaciones_grid->StopRec = $productoespecificaciones_grid->DisplayRecs;
} else {
	$bSelectLimit = $productoespecificaciones_grid->UseSelectLimit;
	if ($bSelectLimit) {
		if ($productoespecificaciones_grid->TotalRecs <= 0)
			$productoespecificaciones_grid->TotalRecs = $productoespecificaciones->ListRecordCount();
	} else {
		if (!$productoespecificaciones_grid->Recordset && ($productoespecificaciones_grid->Recordset = $productoespecificaciones_grid->LoadRecordset()))
			$productoespecificaciones_grid->TotalRecs = $productoespecificaciones_grid->Recordset->RecordCount();
	}
	$productoespecificaciones_grid->StartRec = 1;
	$productoespecificaciones_grid->DisplayRecs = $productoespecificaciones_grid->TotalRecs; // Display all records
	if ($bSelectLimit)
		$productoespecificaciones_grid->Recordset = $productoespecificaciones_grid->LoadRecordset($productoespecificaciones_grid->StartRec-1, $productoespecificaciones_grid->DisplayRecs);

	// Set no record found message
	if ($productoespecificaciones->CurrentAction == "" && $productoespecificaciones_grid->TotalRecs == 0) {
		if ($productoespecificaciones_grid->SearchWhere == "0=101")
			$productoespecificaciones_grid->setWarningMessage($Language->Phrase("EnterSearchCriteria"));
		else
			$productoespecificaciones_grid->setWarningMessage($Language->Phrase("NoRecord"));
	}
}
$productoespecificaciones_grid->RenderOtherOptions();
?>
<?php $productoespecificaciones_grid->ShowPageHeader(); ?>
<?php
$productoespecificaciones_grid->ShowMessage();
?>
<?php if ($productoespecificaciones_grid->TotalRecs > 0 || $productoespecificaciones->CurrentAction <> "") { ?>
<div class="box ewBox ewGrid<?php if ($productoespecificaciones_grid->IsAddOrEdit()) { ?> ewGridAddEdit<?php } ?> productoespecificaciones">
<div id="fproductoespecificacionesgrid" class="ewForm ewListForm form-inline">
<?php if ($productoespecificaciones_grid->ShowOtherOptions) { ?>
<div class="box-header ewGridUpperPanel">
<?php
	foreach ($productoespecificaciones_grid->OtherOptions as &$option)
		$option->Render("body");
?>
</div>
<div class="clearfix"></div>
<?php } ?>
<div id="gmp_productoespecificaciones" class="<?php if (ew_IsResponsiveLayout()) { ?>table-responsive <?php } ?>ewGridMiddlePanel">
<table id="tbl_productoespecificacionesgrid" class="table ewTable">
<thead>
	<tr class="ewTableHeader">
<?php

// Header row
$productoespecificaciones_grid->RowType = EW_ROWTYPE_HEADER;

// Render list options
$productoespecificaciones_grid->RenderListOptions();

// Render list options (header, left)
$productoespecificaciones_grid->ListOptions->Render("header", "left");
?>
<?php if ($productoespecificaciones->id->Visible) { // id ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->id) == "") { ?>
		<th data-name="id" class="<?php echo $productoespecificaciones->id->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_id" class="productoespecificaciones_id"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->id->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="id" class="<?php echo $productoespecificaciones->id->HeaderCellClass() ?>"><div><div id="elh_productoespecificaciones_id" class="productoespecificaciones_id">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->id->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->id->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->id->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoespecificaciones->categoria->Visible) { // categoria ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->categoria) == "") { ?>
		<th data-name="categoria" class="<?php echo $productoespecificaciones->categoria->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_categoria" class="productoespecificaciones_categoria"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->categoria->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="categoria" class="<?php echo $productoespecificaciones->categoria->HeaderCellClass() ?>"><div><div id="elh_productoespecificaciones_categoria" class="productoespecificaciones_categoria">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->categoria->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->categoria->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->categoria->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoespecificaciones->especificaciones->Visible) { // especificaciones ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->especificaciones) == "") { ?>
		<th data-name="especificaciones" class="<?php echo $productoespecificaciones->especificaciones->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_especificaciones" class="productoespecificaciones_especificaciones"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->especificaciones->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="especificaciones" class="<?php echo $productoespecificaciones->especificaciones->HeaderCellClass() ?>"><div><div id="elh_productoespecificaciones_especificaciones" class="productoespecificaciones_especificaciones">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->especificaciones->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->especificaciones->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->especificaciones->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoespecificaciones->orden->Visible) { // orden ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->orden) == "") { ?>
		<th data-name="orden" class="<?php echo $productoespecificaciones->orden->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_orden" class="productoespecificaciones_orden"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->orden->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="orden" class="<?php echo $productoespecificaciones->orden->HeaderCellClass() ?>"><div><div id="elh_productoespecificaciones_orden" class="productoespecificaciones_orden">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->orden->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->orden->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->orden->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoespecificaciones->id_copy->Visible) { // id copy ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->id_copy) == "") { ?>
		<th data-name="id_copy" class="<?php echo $productoespecificaciones->id_copy->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_id_copy" class="productoespecificaciones_id_copy"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->id_copy->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="id_copy" class="<?php echo $productoespecificaciones->id_copy->HeaderCellClass() ?>"><div><div id="elh_productoespecificaciones_id_copy" class="productoespecificaciones_id_copy">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->id_copy->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->id_copy->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->id_copy->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php if ($productoespecificaciones->activo->Visible) { // activo ?>
	<?php if ($productoespecificaciones->SortUrl($productoespecificaciones->activo) == "") { ?>
		<th data-name="activo" class="<?php echo $productoespecificaciones->activo->HeaderCellClass() ?>"><div id="elh_productoespecificaciones_activo" class="productoespecificaciones_activo"><div class="ewTableHeaderCaption"><?php echo $productoespecificaciones->activo->FldCaption() ?></div></div></th>
	<?php } else { ?>
		<th data-name="activo" class="<?php echo $productoespecificaciones->activo->HeaderCellClass() ?>"><div><div id="elh_productoespecificaciones_activo" class="productoespecificaciones_activo">
			<div class="ewTableHeaderBtn"><span class="ewTableHeaderCaption"><?php echo $productoespecificaciones->activo->FldCaption() ?></span><span class="ewTableHeaderSort"><?php if ($productoespecificaciones->activo->getSort() == "ASC") { ?><span class="caret ewSortUp"></span><?php } elseif ($productoespecificaciones->activo->getSort() == "DESC") { ?><span class="caret"></span><?php } ?></span></div>
		</div></div></th>
	<?php } ?>
<?php } ?>
<?php

// Render list options (header, right)
$productoespecificaciones_grid->ListOptions->Render("header", "right");
?>
	</tr>
</thead>
<tbody>
<?php
$productoespecificaciones_grid->StartRec = 1;
$productoespecificaciones_grid->StopRec = $productoespecificaciones_grid->TotalRecs; // Show all records

// Restore number of post back records
if ($objForm) {
	$objForm->Index = -1;
	if ($objForm->HasValue($productoespecificaciones_grid->FormKeyCountName) && ($productoespecificaciones->CurrentAction == "gridadd" || $productoespecificaciones->CurrentAction == "gridedit" || $productoespecificaciones->CurrentAction == "F")) {
		$productoespecificaciones_grid->KeyCount = $objForm->GetValue($productoespecificaciones_grid->FormKeyCountName);
		$productoespecificaciones_grid->StopRec = $productoespecificaciones_grid->StartRec + $productoespecificaciones_grid->KeyCount - 1;
	}
}
$productoespecificaciones_grid->RecCnt = $productoespecificaciones_grid->StartRec - 1;
if ($productoespecificaciones_grid->Recordset && !$productoespecificaciones_grid->Recordset->EOF) {
	$productoespecificaciones_grid->Recordset->MoveFirst();
	$bSelectLimit = $productoespecificaciones_grid->UseSelectLimit;
	if (!$bSelectLimit && $productoespecificaciones_grid->StartRec > 1)
		$productoespecificaciones_grid->Recordset->Move($productoespecificaciones_grid->StartRec - 1);
} elseif (!$productoespecificaciones->AllowAddDeleteRow && $productoespecificaciones_grid->StopRec == 0) {
	$productoespecificaciones_grid->StopRec = $productoespecificaciones->GridAddRowCount;
}

// Initialize aggregate
$productoespecificaciones->RowType = EW_ROWTYPE_AGGREGATEINIT;
$productoespecificaciones->ResetAttrs();
$productoespecificaciones_grid->RenderRow();
if ($productoespecificaciones->CurrentAction == "gridadd")
	$productoespecificaciones_grid->RowIndex = 0;
if ($productoespecificaciones->CurrentAction == "gridedit")
	$productoespecificaciones_grid->RowIndex = 0;
while ($productoespecificaciones_grid->RecCnt < $productoespecificaciones_grid->StopRec) {
	$productoespecificaciones_grid->RecCnt++;
	if (intval($productoespecificaciones_grid->RecCnt) >= intval($productoespecificaciones_grid->StartRec)) {
		$productoespecificaciones_grid->RowCnt++;
		if ($productoespecificaciones->CurrentAction == "gridadd" || $productoespecificaciones->CurrentAction == "gridedit" || $productoespecificaciones->CurrentAction == "F") {
			$productoespecificaciones_grid->RowIndex++;
			$objForm->Index = $productoespecificaciones_grid->RowIndex;
			if ($objForm->HasValue($productoespecificaciones_grid->FormActionName))
				$productoespecificaciones_grid->RowAction = strval($objForm->GetValue($productoespecificaciones_grid->FormActionName));
			elseif ($productoespecificaciones->CurrentAction == "gridadd")
				$productoespecificaciones_grid->RowAction = "insert";
			else
				$productoespecificaciones_grid->RowAction = "";
		}

		// Set up key count
		$productoespecificaciones_grid->KeyCount = $productoespecificaciones_grid->RowIndex;

		// Init row class and style
		$productoespecificaciones->ResetAttrs();
		$productoespecificaciones->CssClass = "";
		if ($productoespecificaciones->CurrentAction == "gridadd") {
			if ($productoespecificaciones->CurrentMode == "copy") {
				$productoespecificaciones_grid->LoadRowValues($productoespecificaciones_grid->Recordset); // Load row values
				$productoespecificaciones_grid->SetRecordKey($productoespecificaciones_grid->RowOldKey, $productoespecificaciones_grid->Recordset); // Set old record key
			} else {
				$productoespecificaciones_grid->LoadRowValues(); // Load default values
				$productoespecificaciones_grid->RowOldKey = ""; // Clear old key value
			}
		} else {
			$productoespecificaciones_grid->LoadRowValues($productoespecificaciones_grid->Recordset); // Load row values
		}
		$productoespecificaciones->RowType = EW_ROWTYPE_VIEW; // Render view
		if ($productoespecificaciones->CurrentAction == "gridadd") // Grid add
			$productoespecificaciones->RowType = EW_ROWTYPE_ADD; // Render add
		if ($productoespecificaciones->CurrentAction == "gridadd" && $productoespecificaciones->EventCancelled && !$objForm->HasValue("k_blankrow")) // Insert failed
			$productoespecificaciones_grid->RestoreCurrentRowFormValues($productoespecificaciones_grid->RowIndex); // Restore form values
		if ($productoespecificaciones->CurrentAction == "gridedit") { // Grid edit
			if ($productoespecificaciones->EventCancelled) {
				$productoespecificaciones_grid->RestoreCurrentRowFormValues($productoespecificaciones_grid->RowIndex); // Restore form values
			}
			if ($productoespecificaciones_grid->RowAction == "insert")
				$productoespecificaciones->RowType = EW_ROWTYPE_ADD; // Render add
			else
				$productoespecificaciones->RowType = EW_ROWTYPE_EDIT; // Render edit
		}
		if ($productoespecificaciones->CurrentAction == "gridedit" && ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT || $productoespecificaciones->RowType == EW_ROWTYPE_ADD) && $productoespecificaciones->EventCancelled) // Update failed
			$productoespecificaciones_grid->RestoreCurrentRowFormValues($productoespecificaciones_grid->RowIndex); // Restore form values
		if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) // Edit row
			$productoespecificaciones_grid->EditRowCnt++;
		if ($productoespecificaciones->CurrentAction == "F") // Confirm row
			$productoespecificaciones_grid->RestoreCurrentRowFormValues($productoespecificaciones_grid->RowIndex); // Restore form values

		// Set up row id / data-rowindex
		$productoespecificaciones->RowAttrs = array_merge($productoespecificaciones->RowAttrs, array('data-rowindex'=>$productoespecificaciones_grid->RowCnt, 'id'=>'r' . $productoespecificaciones_grid->RowCnt . '_productoespecificaciones', 'data-rowtype'=>$productoespecificaciones->RowType));

		// Render row
		$productoespecificaciones_grid->RenderRow();

		// Render list options
		$productoespecificaciones_grid->RenderListOptions();

		// Skip delete row / empty row for confirm page
		if ($productoespecificaciones_grid->RowAction <> "delete" && $productoespecificaciones_grid->RowAction <> "insertdelete" && !($productoespecificaciones_grid->RowAction == "insert" && $productoespecificaciones->CurrentAction == "F" && $productoespecificaciones_grid->EmptyRow())) {
?>
	<tr<?php echo $productoespecificaciones->RowAttributes() ?>>
<?php

// Render list options (body, left)
$productoespecificaciones_grid->ListOptions->Render("body", "left", $productoespecificaciones_grid->RowCnt);
?>
	<?php if ($productoespecificaciones->id->Visible) { // id ?>
		<td data-name="id"<?php echo $productoespecificaciones->id->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->id->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_id" class="form-group productoespecificaciones_id">
<span<?php echo $productoespecificaciones->id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoespecificaciones->id->EditValue ?></p></span>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->id->CurrentValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_id" class="productoespecificaciones_id">
<span<?php echo $productoespecificaciones->id->ViewAttributes() ?>>
<?php echo $productoespecificaciones->id->ListViewValue() ?></span>
</span>
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->id->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_id" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->id->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id" name="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_id" id="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->id->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_id" name="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_id" id="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->id->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->categoria->Visible) { // categoria ?>
		<td data-name="categoria"<?php echo $productoespecificaciones->categoria->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_categoria" class="form-group productoespecificaciones_categoria">
<input type="text" data-table="productoespecificaciones" data-field="x_categoria" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->categoria->EditValue ?>"<?php echo $productoespecificaciones->categoria->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_categoria" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" value="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_categoria" class="form-group productoespecificaciones_categoria">
<input type="text" data-table="productoespecificaciones" data-field="x_categoria" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->categoria->EditValue ?>"<?php echo $productoespecificaciones->categoria->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_categoria" class="productoespecificaciones_categoria">
<span<?php echo $productoespecificaciones->categoria->ViewAttributes() ?>>
<?php echo $productoespecificaciones->categoria->ListViewValue() ?></span>
</span>
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_categoria" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" value="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_categoria" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" value="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_categoria" name="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" id="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" value="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_categoria" name="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" id="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" value="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->especificaciones->Visible) { // especificaciones ?>
		<td data-name="especificaciones"<?php echo $productoespecificaciones->especificaciones->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_especificaciones" class="form-group productoespecificaciones_especificaciones">
<input type="text" data-table="productoespecificaciones" data-field="x_especificaciones" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->especificaciones->EditValue ?>"<?php echo $productoespecificaciones->especificaciones->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_especificaciones" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" value="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_especificaciones" class="form-group productoespecificaciones_especificaciones">
<input type="text" data-table="productoespecificaciones" data-field="x_especificaciones" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->especificaciones->EditValue ?>"<?php echo $productoespecificaciones->especificaciones->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_especificaciones" class="productoespecificaciones_especificaciones">
<span<?php echo $productoespecificaciones->especificaciones->ViewAttributes() ?>>
<?php echo $productoespecificaciones->especificaciones->ListViewValue() ?></span>
</span>
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_especificaciones" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" value="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_especificaciones" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" value="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_especificaciones" name="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" id="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" value="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_especificaciones" name="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" id="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" value="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->orden->Visible) { // orden ?>
		<td data-name="orden"<?php echo $productoespecificaciones->orden->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_orden" class="form-group productoespecificaciones_orden">
<input type="text" data-table="productoespecificaciones" data-field="x_orden" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->orden->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->orden->EditValue ?>"<?php echo $productoespecificaciones->orden->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_orden" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoespecificaciones->orden->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_orden" class="form-group productoespecificaciones_orden">
<input type="text" data-table="productoespecificaciones" data-field="x_orden" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->orden->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->orden->EditValue ?>"<?php echo $productoespecificaciones->orden->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_orden" class="productoespecificaciones_orden">
<span<?php echo $productoespecificaciones->orden->ViewAttributes() ?>>
<?php echo $productoespecificaciones->orden->ListViewValue() ?></span>
</span>
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_orden" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoespecificaciones->orden->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_orden" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoespecificaciones->orden->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_orden" name="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" id="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoespecificaciones->orden->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_orden" name="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" id="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoespecificaciones->orden->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->id_copy->Visible) { // id copy ?>
		<td data-name="id_copy"<?php echo $productoespecificaciones->id_copy->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_id_copy" class="form-group productoespecificaciones_id_copy">
<input type="text" data-table="productoespecificaciones" data-field="x_id_copy" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->id_copy->EditValue ?>"<?php echo $productoespecificaciones->id_copy->EditAttributes() ?>>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id_copy" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" value="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_id_copy" class="form-group productoespecificaciones_id_copy">
<input type="text" data-table="productoespecificaciones" data-field="x_id_copy" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->id_copy->EditValue ?>"<?php echo $productoespecificaciones->id_copy->EditAttributes() ?>>
</span>
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_id_copy" class="productoespecificaciones_id_copy">
<span<?php echo $productoespecificaciones->id_copy->ViewAttributes() ?>>
<?php echo $productoespecificaciones->id_copy->ListViewValue() ?></span>
</span>
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id_copy" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" value="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_id_copy" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" value="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id_copy" name="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" id="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" value="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_id_copy" name="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" id="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" value="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->activo->Visible) { // activo ?>
		<td data-name="activo"<?php echo $productoespecificaciones->activo->CellAttributes() ?>>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD) { // Add record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_activo" class="form-group productoespecificaciones_activo">
<select data-table="productoespecificaciones" data-field="x_activo" data-value-separator="<?php echo $productoespecificaciones->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo"<?php echo $productoespecificaciones->activo->EditAttributes() ?>>
<?php echo $productoespecificaciones->activo->SelectOptionListHtml("x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo") ?>
</select>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_activo" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoespecificaciones->activo->OldValue) ?>">
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { // Edit record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_activo" class="form-group productoespecificaciones_activo">
<select data-table="productoespecificaciones" data-field="x_activo" data-value-separator="<?php echo $productoespecificaciones->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo"<?php echo $productoespecificaciones->activo->EditAttributes() ?>>
<?php echo $productoespecificaciones->activo->SelectOptionListHtml("x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo") ?>
</select>
</span>
<?php } ?>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_VIEW) { // View record ?>
<span id="el<?php echo $productoespecificaciones_grid->RowCnt ?>_productoespecificaciones_activo" class="productoespecificaciones_activo">
<span<?php echo $productoespecificaciones->activo->ViewAttributes() ?>>
<?php echo $productoespecificaciones->activo->ListViewValue() ?></span>
</span>
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_activo" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoespecificaciones->activo->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_activo" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoespecificaciones->activo->OldValue) ?>">
<?php } else { ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_activo" name="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" id="fproductoespecificacionesgrid$x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoespecificaciones->activo->FormValue) ?>">
<input type="hidden" data-table="productoespecificaciones" data-field="x_activo" name="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" id="fproductoespecificacionesgrid$o<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoespecificaciones->activo->OldValue) ?>">
<?php } ?>
<?php } ?>
</td>
	<?php } ?>
<?php

// Render list options (body, right)
$productoespecificaciones_grid->ListOptions->Render("body", "right", $productoespecificaciones_grid->RowCnt);
?>
	</tr>
<?php if ($productoespecificaciones->RowType == EW_ROWTYPE_ADD || $productoespecificaciones->RowType == EW_ROWTYPE_EDIT) { ?>
<script type="text/javascript">
fproductoespecificacionesgrid.UpdateOpts(<?php echo $productoespecificaciones_grid->RowIndex ?>);
</script>
<?php } ?>
<?php
	}
	} // End delete row checking
	if ($productoespecificaciones->CurrentAction <> "gridadd" || $productoespecificaciones->CurrentMode == "copy")
		if (!$productoespecificaciones_grid->Recordset->EOF) $productoespecificaciones_grid->Recordset->MoveNext();
}
?>
<?php
	if ($productoespecificaciones->CurrentMode == "add" || $productoespecificaciones->CurrentMode == "copy" || $productoespecificaciones->CurrentMode == "edit") {
		$productoespecificaciones_grid->RowIndex = '$rowindex$';
		$productoespecificaciones_grid->LoadRowValues();

		// Set row properties
		$productoespecificaciones->ResetAttrs();
		$productoespecificaciones->RowAttrs = array_merge($productoespecificaciones->RowAttrs, array('data-rowindex'=>$productoespecificaciones_grid->RowIndex, 'id'=>'r0_productoespecificaciones', 'data-rowtype'=>EW_ROWTYPE_ADD));
		ew_AppendClass($productoespecificaciones->RowAttrs["class"], "ewTemplate");
		$productoespecificaciones->RowType = EW_ROWTYPE_ADD;

		// Render row
		$productoespecificaciones_grid->RenderRow();

		// Render list options
		$productoespecificaciones_grid->RenderListOptions();
		$productoespecificaciones_grid->StartRowCnt = 0;
?>
	<tr<?php echo $productoespecificaciones->RowAttributes() ?>>
<?php

// Render list options (body, left)
$productoespecificaciones_grid->ListOptions->Render("body", "left", $productoespecificaciones_grid->RowIndex);
?>
	<?php if ($productoespecificaciones->id->Visible) { // id ?>
		<td data-name="id">
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<?php } else { ?>
<span id="el$rowindex$_productoespecificaciones_id" class="form-group productoespecificaciones_id">
<span<?php echo $productoespecificaciones->id->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoespecificaciones->id->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->id->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id" value="<?php echo ew_HtmlEncode($productoespecificaciones->id->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->categoria->Visible) { // categoria ?>
		<td data-name="categoria">
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productoespecificaciones_categoria" class="form-group productoespecificaciones_categoria">
<input type="text" data-table="productoespecificaciones" data-field="x_categoria" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" size="30" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->categoria->EditValue ?>"<?php echo $productoespecificaciones->categoria->EditAttributes() ?>>
</span>
<?php } else { ?>
<span id="el$rowindex$_productoespecificaciones_categoria" class="form-group productoespecificaciones_categoria">
<span<?php echo $productoespecificaciones->categoria->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoespecificaciones->categoria->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_categoria" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" value="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_categoria" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_categoria" value="<?php echo ew_HtmlEncode($productoespecificaciones->categoria->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->especificaciones->Visible) { // especificaciones ?>
		<td data-name="especificaciones">
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productoespecificaciones_especificaciones" class="form-group productoespecificaciones_especificaciones">
<input type="text" data-table="productoespecificaciones" data-field="x_especificaciones" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" size="50" maxlength="191" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->especificaciones->EditValue ?>"<?php echo $productoespecificaciones->especificaciones->EditAttributes() ?>>
</span>
<?php } else { ?>
<span id="el$rowindex$_productoespecificaciones_especificaciones" class="form-group productoespecificaciones_especificaciones">
<span<?php echo $productoespecificaciones->especificaciones->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoespecificaciones->especificaciones->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_especificaciones" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" value="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_especificaciones" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_especificaciones" value="<?php echo ew_HtmlEncode($productoespecificaciones->especificaciones->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->orden->Visible) { // orden ?>
		<td data-name="orden">
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productoespecificaciones_orden" class="form-group productoespecificaciones_orden">
<input type="text" data-table="productoespecificaciones" data-field="x_orden" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->orden->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->orden->EditValue ?>"<?php echo $productoespecificaciones->orden->EditAttributes() ?>>
</span>
<?php } else { ?>
<span id="el$rowindex$_productoespecificaciones_orden" class="form-group productoespecificaciones_orden">
<span<?php echo $productoespecificaciones->orden->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoespecificaciones->orden->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_orden" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoespecificaciones->orden->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_orden" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_orden" value="<?php echo ew_HtmlEncode($productoespecificaciones->orden->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->id_copy->Visible) { // id copy ?>
		<td data-name="id_copy">
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productoespecificaciones_id_copy" class="form-group productoespecificaciones_id_copy">
<input type="text" data-table="productoespecificaciones" data-field="x_id_copy" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" size="30" placeholder="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->getPlaceHolder()) ?>" value="<?php echo $productoespecificaciones->id_copy->EditValue ?>"<?php echo $productoespecificaciones->id_copy->EditAttributes() ?>>
</span>
<?php } else { ?>
<span id="el$rowindex$_productoespecificaciones_id_copy" class="form-group productoespecificaciones_id_copy">
<span<?php echo $productoespecificaciones->id_copy->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoespecificaciones->id_copy->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id_copy" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" value="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_id_copy" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_id_copy" value="<?php echo ew_HtmlEncode($productoespecificaciones->id_copy->OldValue) ?>">
</td>
	<?php } ?>
	<?php if ($productoespecificaciones->activo->Visible) { // activo ?>
		<td data-name="activo">
<?php if ($productoespecificaciones->CurrentAction <> "F") { ?>
<span id="el$rowindex$_productoespecificaciones_activo" class="form-group productoespecificaciones_activo">
<select data-table="productoespecificaciones" data-field="x_activo" data-value-separator="<?php echo $productoespecificaciones->activo->DisplayValueSeparatorAttribute() ?>" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo"<?php echo $productoespecificaciones->activo->EditAttributes() ?>>
<?php echo $productoespecificaciones->activo->SelectOptionListHtml("x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo") ?>
</select>
</span>
<?php } else { ?>
<span id="el$rowindex$_productoespecificaciones_activo" class="form-group productoespecificaciones_activo">
<span<?php echo $productoespecificaciones->activo->ViewAttributes() ?>>
<p class="form-control-static"><?php echo $productoespecificaciones->activo->ViewValue ?></p></span>
</span>
<input type="hidden" data-table="productoespecificaciones" data-field="x_activo" name="x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" id="x<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoespecificaciones->activo->FormValue) ?>">
<?php } ?>
<input type="hidden" data-table="productoespecificaciones" data-field="x_activo" name="o<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" id="o<?php echo $productoespecificaciones_grid->RowIndex ?>_activo" value="<?php echo ew_HtmlEncode($productoespecificaciones->activo->OldValue) ?>">
</td>
	<?php } ?>
<?php

// Render list options (body, right)
$productoespecificaciones_grid->ListOptions->Render("body", "right", $productoespecificaciones_grid->RowCnt);
?>
<script type="text/javascript">
fproductoespecificacionesgrid.UpdateOpts(<?php echo $productoespecificaciones_grid->RowIndex ?>);
</script>
	</tr>
<?php
}
?>
</tbody>
</table>
<?php if ($productoespecificaciones->CurrentMode == "add" || $productoespecificaciones->CurrentMode == "copy") { ?>
<input type="hidden" name="a_list" id="a_list" value="gridinsert">
<input type="hidden" name="<?php echo $productoespecificaciones_grid->FormKeyCountName ?>" id="<?php echo $productoespecificaciones_grid->FormKeyCountName ?>" value="<?php echo $productoespecificaciones_grid->KeyCount ?>">
<?php echo $productoespecificaciones_grid->MultiSelectKey ?>
<?php } ?>
<?php if ($productoespecificaciones->CurrentMode == "edit") { ?>
<input type="hidden" name="a_list" id="a_list" value="gridupdate">
<input type="hidden" name="<?php echo $productoespecificaciones_grid->FormKeyCountName ?>" id="<?php echo $productoespecificaciones_grid->FormKeyCountName ?>" value="<?php echo $productoespecificaciones_grid->KeyCount ?>">
<?php echo $productoespecificaciones_grid->MultiSelectKey ?>
<?php } ?>
<?php if ($productoespecificaciones->CurrentMode == "") { ?>
<input type="hidden" name="a_list" id="a_list" value="">
<?php } ?>
<input type="hidden" name="detailpage" value="fproductoespecificacionesgrid">
</div>
<?php

// Close recordset
if ($productoespecificaciones_grid->Recordset)
	$productoespecificaciones_grid->Recordset->Close();
?>
<?php if ($productoespecificaciones_grid->ShowOtherOptions) { ?>
<div class="box-footer ewGridLowerPanel">
<?php
	foreach ($productoespecificaciones_grid->OtherOptions as &$option)
		$option->Render("body", "bottom");
?>
</div>
<div class="clearfix"></div>
<?php } ?>
</div>
</div>
<?php } ?>
<?php if ($productoespecificaciones_grid->TotalRecs == 0 && $productoespecificaciones->CurrentAction == "") { // Show other options ?>
<div class="ewListOtherOptions">
<?php
	foreach ($productoespecificaciones_grid->OtherOptions as &$option) {
		$option->ButtonClass = "";
		$option->Render("body", "");
	}
?>
</div>
<div class="clearfix"></div>
<?php } ?>
<?php if ($productoespecificaciones->Export == "") { ?>
<script type="text/javascript">
fproductoespecificacionesgrid.Init();
</script>
<?php } ?>
<?php
$productoespecificaciones_grid->Page_Terminate();
?>
