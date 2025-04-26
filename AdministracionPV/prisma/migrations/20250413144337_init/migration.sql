-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marca_id` INTEGER NOT NULL,
    `rubro_id` INTEGER NOT NULL,
    `moneda_id` INTEGER NOT NULL,
    `estado_id` INTEGER NOT NULL,
    `financiacion_id` INTEGER NOT NULL DEFAULT 0,
    `producto` VARCHAR(100) NOT NULL,
    `cod_pro` VARCHAR(10) NULL,
    `codigo` VARCHAR(10) NULL,
    `extracto` VARCHAR(255) NULL,
    `descripcion` VARCHAR(191) NULL,
    `garantia` VARCHAR(255) NULL,
    `keywords` VARCHAR(255) NULL,
    `foto` VARCHAR(255) NULL,
    `pre_costo_usd` DECIMAL(10, 2) NOT NULL,
    `pre_costo` DECIMAL(10, 2) NOT NULL,
    `ganancia` INTEGER NOT NULL,
    `pre_neto` INTEGER NULL,
    `cuotas_max_fp` INTEGER NOT NULL,
    `incremento_iva` DECIMAL(6, 2) NOT NULL,
    `visitas` BIGINT NOT NULL DEFAULT 0,
    `destacado` BOOLEAN NOT NULL DEFAULT false,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos_especificaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `categoria` VARCHAR(255) NULL,
    `especificaciones` VARCHAR(255) NULL,
    `orden` INTEGER NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductosFotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `epigrafe` VARCHAR(100) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `orden` INTEGER NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductosVersiones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `version` VARCHAR(30) NOT NULL,
    `orden` INTEGER NULL DEFAULT 5,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CfgMarcas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marca` VARCHAR(30) NOT NULL,
    `keywords` VARCHAR(191) NULL,
    `foto` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CfgFormasPagos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `forma_pago` VARCHAR(20) NOT NULL,
    `descripcion` VARCHAR(50) NOT NULL,
    `permite_cuotas` BOOLEAN NOT NULL DEFAULT false,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CfgMonedas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `moneda` VARCHAR(20) NOT NULL,
    `moneda_des` VARCHAR(20) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CfgRubros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rubro` VARCHAR(30) NOT NULL,
    `condiciones` VARCHAR(191) NULL,
    `keywords` VARCHAR(191) NULL,
    `foto` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_marca_id_fkey` FOREIGN KEY (`marca_id`) REFERENCES `CfgMarcas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_rubro_id_fkey` FOREIGN KEY (`rubro_id`) REFERENCES `CfgRubros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_moneda_id_fkey` FOREIGN KEY (`moneda_id`) REFERENCES `CfgMonedas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productos_especificaciones` ADD CONSTRAINT `productos_especificaciones_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductosFotos` ADD CONSTRAINT `ProductosFotos_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductosVersiones` ADD CONSTRAINT `ProductosVersiones_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
