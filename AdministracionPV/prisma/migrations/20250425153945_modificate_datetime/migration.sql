-- DropIndex
DROP INDEX `productoespecificaciones_producto_id_fkey` ON `productoespecificaciones`;

-- DropIndex
DROP INDEX `productofotos_producto_id_fkey` ON `productofotos`;

-- DropIndex
DROP INDEX `productos_marca_id_fkey` ON `productos`;

-- DropIndex
DROP INDEX `productos_moneda_id_fkey` ON `productos`;

-- DropIndex
DROP INDEX `productos_rubro_id_fkey` ON `productos`;

-- DropIndex
DROP INDEX `productoversiones_producto_id_fkey` ON `productoversiones`;

-- AlterTable
ALTER TABLE `pedidos` ALTER COLUMN `updatedAt` DROP DEFAULT;

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
