# Usa la imagen oficial de PHP + Apache
FROM php:8.1-apache

# Instala la extensión de MySQL (si tu PHPMaker usa MySQL)
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Habilita mod_rewrite (si lo necesitas)
RUN a2enmod rewrite

# Copia tu código al directorio que Apache sirve por defecto
COPY . /var/www/html/

# Ajusta permisos
RUN chown -R www-data:www-data /var/www/html
