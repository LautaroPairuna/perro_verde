<?php

// id
// producto
// marca_id
// rubro_id
// moneda_id
// precio
// stock
// destacado
// visitas
// activo

?>
<?php if ($productos->Visible) { ?>
<div class="ewMasterDiv">
<table id="tbl_productosmaster" class="table ewViewTable ewMasterTable ewVertical">
	<tbody>
<?php if ($productos->id->Visible) { // id ?>
		<tr id="r_id">
			<td class="col-sm-2"><?php echo $productos->id->FldCaption() ?></td>
			<td<?php echo $productos->id->CellAttributes() ?>>
<span id="el_productos_id">
<span<?php echo $productos->id->ViewAttributes() ?>>
<?php echo $productos->id->ListViewValue() ?></span>
</span>
</td>
		</tr>
<?php } ?>
<?php if ($productos->producto->Visible) { // producto ?>
		<tr id="r_producto">
			<td class="col-sm-2"><?php echo $productos->producto->FldCaption() ?></td>
			<td<?php echo $productos->producto->CellAttributes() ?>>
<span id="el_productos_producto">
<span<?php echo $productos->producto->ViewAttributes() ?>>
<?php echo $productos->producto->ListViewValue() ?></span>
</span>
</td>
		</tr>
<?php } ?>
<?php if ($productos->marca_id->Visible) { // marca_id ?>
		<tr id="r_marca_id">
			<td class="col-sm-2"><?php echo $productos->marca_id->FldCaption() ?></td>
			<td<?php echo $productos->marca_id->CellAttributes() ?>>
<span id="el_productos_marca_id">
<span<?php echo $productos->marca_id->ViewAttributes() ?>>
<?php echo $productos->marca_id->ListViewValue() ?></span>
</span>
</td>
		</tr>
<?php } ?>
<?php if ($productos->rubro_id->Visible) { // rubro_id ?>
		<tr id="r_rubro_id">
			<td class="col-sm-2"><?php echo $productos->rubro_id->FldCaption() ?></td>
			<td<?php echo $productos->rubro_id->CellAttributes() ?>>
<span id="el_productos_rubro_id">
<span<?php echo $productos->rubro_id->ViewAttributes() ?>>
<?php echo $productos->rubro_id->ListViewValue() ?></span>
</span>
</td>
		</tr>
<?php } ?>
<?php if ($productos->moneda_id->Visible) { // moneda_id ?>
		<tr id="r_moneda_id">
			<td class="col-sm-2"><?php echo $productos->moneda_id->FldCaption() ?></td>
			<td<?php echo $productos->moneda_id->CellAttributes() ?>>
<span id="el_productos_moneda_id">
<span<?php echo $productos->moneda_id->ViewAttributes() ?>>
<?php echo $productos->moneda_id->ListViewValue() ?></span>
</span>
</td>
		</tr>
<?php } ?>
<?php if ($productos->precio->Visible) { // precio ?>
		<tr id="r_precio">
			<td class="col-sm-2"><?php echo $productos->precio->FldCaption() ?></td>
			<td<?php echo $productos->precio->CellAttributes() ?>>
<span id="el_productos_precio">
<span<?php echo $productos->precio->ViewAttributes() ?>>
<?php echo $productos->precio->ListViewValue() ?></span>
</span>
</td>
		</tr>
<?php } ?>
<?php if ($productos->stock->Visible) { // stock ?>
		<tr id="r_stock">
			<td class="col-sm-2"><?php echo $productos->stock->FldCaption() ?></td>
			<td<?php echo $productos->stock->CellAttributes() ?>>
<span id="el_productos_stock">
<span<?php echo $productos->stock->ViewAttributes() ?>>
<?php echo $productos->stock->ListViewValue() ?></span>
</span>
</td>
		</tr>
<?php } ?>
<?php if ($productos->destacado->Visible) { // destacado ?>
		<tr id="r_destacado">
			<td class="col-sm-2"><?php echo $productos->destacado->FldCaption() ?></td>
			<td<?php echo $productos->destacado->CellAttributes() ?>>
<span id="el_productos_destacado">
<span<?php echo $productos->destacado->ViewAttributes() ?>>
<?php echo $productos->destacado->ListViewValue() ?></span>
</span>
</td>
		</tr>
<?php } ?>
<?php if ($productos->visitas->Visible) { // visitas ?>
		<tr id="r_visitas">
			<td class="col-sm-2"><?php echo $productos->visitas->FldCaption() ?></td>
			<td<?php echo $productos->visitas->CellAttributes() ?>>
<span id="el_productos_visitas">
<span<?php echo $productos->visitas->ViewAttributes() ?>>
<?php echo $productos->visitas->ListViewValue() ?></span>
</span>
</td>
		</tr>
<?php } ?>
<?php if ($productos->activo->Visible) { // activo ?>
		<tr id="r_activo">
			<td class="col-sm-2"><?php echo $productos->activo->FldCaption() ?></td>
			<td<?php echo $productos->activo->CellAttributes() ?>>
<span id="el_productos_activo">
<span<?php echo $productos->activo->ViewAttributes() ?>>
<?php echo $productos->activo->ListViewValue() ?></span>
</span>
</td>
		</tr>
<?php } ?>
	</tbody>
</table>
</div>
<?php } ?>
