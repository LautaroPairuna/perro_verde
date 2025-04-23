-- DropIndex
DROP INDEX `ProductoEspecificaciones_producto_id_fkey` ON `productoespecificaciones`;

-- DropIndex
DROP INDEX `ProductoFotos_producto_id_fkey` ON `productofotos`;

-- DropIndex
DROP INDEX `Productos_marca_id_fkey` ON `productos`;

-- DropIndex
DROP INDEX `Productos_moneda_id_fkey` ON `productos`;

-- DropIndex
DROP INDEX `Productos_rubro_id_fkey` ON `productos`;

-- DropIndex
DROP INDEX `ProductoVersiones_producto_id_fkey` ON `productoversiones`;

-- AlterTable
ALTER TABLE `pedidos` ADD COLUMN `mp_error_code` VARCHAR(64) NULL,
    ADD COLUMN `mp_error_message` TEXT NULL,
    ADD COLUMN `mp_response` JSON NULL;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `productos_marca_id_fkey` FOREIGN KEY (`marca_id`) REFERENCES `cfgmarcas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `productos_rubro_id_fkey` FOREIGN KEY (`rubro_id`) REFERENCES `cfgrubros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `productos_moneda_id_fkey` FOREIGN KEY (`moneda_id`) REFERENCES `cfgmonedas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productofotos` ADD CONSTRAINT `productofotos_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productoversiones` ADD CONSTRAINT `productoversiones_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productoespecificaciones` ADD CONSTRAINT `productoespecificaciones_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
