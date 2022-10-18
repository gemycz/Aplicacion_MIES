-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-12-2020 a las 14:00:51
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.4

SET
SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET
AUTOCOMMIT = 0;
START TRANSACTION;
SET
time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `miesdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adulto_mayor`
--

CREATE TABLE `adulto_mayor`
(
    `am_id`        int(11) NOT NULL,
    `am_nombres`   varchar(100) NOT NULL,
    `am_apellidos` varchar(100) NOT NULL,
    `am_cedula`    varchar(10)  NOT NULL,
    `am_fechNac`   date         NOT NULL,
    `am_genero`    varchar(50)  NOT NULL,
    `am_etnia`     varchar(50)  NOT NULL,
    `am_domicilio` varchar(100) NOT NULL,
    `am_origen`    varchar(100) NOT NULL,
    `am_fechReg`   date         NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `adulto_mayor`
--

INSERT INTO `adulto_mayor` (`am_id`, `am_nombres`, `am_apellidos`, `am_cedula`, `am_fechNac`, `am_genero`, `am_etnia`,
                            `am_domicilio`, `am_origen`, `am_fechReg`)
VALUES (182, 'Susana', 'Santana', '1313602920', '1948-11-27', 'Mujer', 'Mestizo', 'Luz de AmÃ©rica', 'Ecuador',
        '2020-11-27'),
       (183, 'Luis Armando', 'Macias Vera', '1717236681', '1977-11-27', 'Hombre', 'Montubio', 'Barrio Crucita',
        'Ecuador', '2020-11-27'),
       (185, 'Cristian', 'Coronel', '1359292916', '1977-11-27', 'Hombre', 'Europeo', 'Santo Domingo', 'EspaÃ±a',
        '2020-11-27'),
       (208, 'Pablo', 'Santana', '1309772710', '1933-11-29', 'Hombre', 'Mestizo', 'Luz de AmÃ©rica', 'Ecuador',
        '2020-11-29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encabezado_test`
--

CREATE TABLE `encabezado_test`
(
    `enca_id`        int(11) NOT NULL,
    `enca_nomuser`   varchar(50)  NOT NULL,
    `enca_uniAt`     varchar(150) NOT NULL,
    `enca_zona`      varchar(100) NOT NULL,
    `enca_distrito`  varchar(100) NOT NULL,
    `enca_modalidad` varchar(100) NOT NULL,
    `enca_edad`      varchar(50)  NOT NULL,
    `enca_fechaAp`   date         NOT NULL,
    `enca_aplicapor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `encabezado_test`
--

INSERT INTO `encabezado_test` (`enca_id`, `enca_nomuser`, `enca_uniAt`, `enca_zona`, `enca_distrito`, `enca_modalidad`,
                               `enca_edad`, `enca_fechaAp`, `enca_aplicapor`)
VALUES (33, 'Luis', 'Luz de AmÃ©rica', 'Sur', 'Abc', 'Matutina', '60', '2020-11-27', 'Gema'),
       (42, 'Susana Santana', 'Luz de AmÃ©rica', 'Norte', 'Gad luz de AmÃ©rica', 'Matutina', '80', '2020-11-29',
        'Gema Castillo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escala_yesavage`
--

CREATE TABLE `escala_yesavage`
(
    `id_escala_yesavage`      int(11) NOT NULL,
    `p1_satisfecho`           int(11) NOT NULL,
    `p2_actividades`          int(11) NOT NULL,
    `p3_vacio`                int(11) NOT NULL,
    `p4_aburrido`             int(11) NOT NULL,
    `p5_animo`                int(11) NOT NULL,
    `p6_preocupado`           int(11) NOT NULL,
    `p7_feliz`                int(11) NOT NULL,
    `p8_desamparado`          int(11) NOT NULL,
    `p9_cosas`                int(11) NOT NULL,
    `p10_memoria`             int(11) NOT NULL,
    `p11_estar_vivo`          int(11) NOT NULL,
    `p12_inutil_despreciable` int(11) NOT NULL,
    `p13_energia`             int(11) NOT NULL,
    `p14_esperanza_actual`    int(11) NOT NULL,
    `p15_cree_mejor`          int(11) NOT NULL,
    `tiempo_inicial`          time NOT NULL,
    `tiempo_final`            time NOT NULL,
    `tiempo_total`            time NOT NULL,
    `estado`                  tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `escala_yesavage`
--

INSERT INTO `escala_yesavage` (`id_escala_yesavage`, `p1_satisfecho`, `p2_actividades`, `p3_vacio`, `p4_aburrido`,
                               `p5_animo`, `p6_preocupado`, `p7_feliz`, `p8_desamparado`, `p9_cosas`, `p10_memoria`,
                               `p11_estar_vivo`, `p12_inutil_despreciable`, `p13_energia`, `p14_esperanza_actual`,
                               `p15_cree_mejor`, `tiempo_inicial`, `tiempo_final`, `tiempo_total`, `estado`)
VALUES (4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '13:13:53', '13:15:44', '00:01:11', 1),
       (5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '13:16:32', '13:16:59', '00:00:26', 1),
       (6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '13:18:24', '13:19:04', '00:00:40', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes`
(
    `id`      int(11) NOT NULL,
    `imgruta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `imgruta`)
VALUES (0, 'https://192.168.100.18/pruebas_react/photos/692edc49-7ab0-4519-894c-44f24bc3d2fd.jpg'),
       (0, 'https://192.168.100.18/pruebas_react/photos/a9effb74-0dad-4423-a736-5651069481d6.jpg'),
       (0, 'https://192.168.100.18/pruebas_react/photos/9d386938-125b-41fd-a21b-e42bcfbfcbe1.jpg'),
       (0, 'https://192.168.100.18/pruebas_react/photos/ac3e9417-b8c6-47b0-81d5-e918e8132748.jpg'),
       (0, 'https://192.168.100.18/pruebas_react/photos/41c96525-1dac-4ab1-ae44-fde697aad718.jpg'),
       (0, 'https://192.168.100.18/pruebas_react/photos/5438fa60-c54a-411a-8c11-7ed77fd39b39.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnico`
--

CREATE TABLE `tecnico`
(
    `tecn_id`       int(11) NOT NULL,
    `tecn_nombre`   varchar(100) NOT NULL,
    `tecn_apellido` varchar(100) NOT NULL,
    `tecn_cedula`   varchar(10)  NOT NULL,
    `tecn_telefono` varchar(10)  NOT NULL,
    `tecn_correo`   varchar(75)  NOT NULL,
    `tecn_nomuser`  varchar(50)  NOT NULL,
    `tecn_clave`    varchar(50)  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tecnico`
--

INSERT INTO `tecnico` (`tecn_id`, `tecn_nombre`, `tecn_apellido`, `tecn_cedula`, `tecn_telefono`, `tecn_correo`,
                       `tecn_nomuser`, `tecn_clave`)
VALUES (1, 'Josue David', 'Lozano Buitron', '2300453665', '0939348156', 'jdlozano1@espe.edu.ec', 'josu', '12345'),
       (2, 'Jonathan Alexander', 'Barragán Intriago', '2300453665', '0939348156', 'jabarragan4@espe.edu.ec',
        'jabarragan4', '12345'),
       (4, 'Gema', 'Castillo', '1313602920', '0978698942', 'ggcastillo1@espe.edu.ec', 'gemycz', '12345678');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adulto_mayor`
--
ALTER TABLE `adulto_mayor`
    ADD PRIMARY KEY (`am_id`);

--
-- Indices de la tabla `encabezado_test`
--
ALTER TABLE `encabezado_test`
    ADD PRIMARY KEY (`enca_id`);

--
-- Indices de la tabla `escala_yesavage`
--
ALTER TABLE `escala_yesavage`
    ADD PRIMARY KEY (`id_escala_yesavage`);

--
-- Indices de la tabla `tecnico`
--
ALTER TABLE `tecnico`
    ADD PRIMARY KEY (`tecn_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adulto_mayor`
--
ALTER TABLE `adulto_mayor`
    MODIFY `am_id` int (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT de la tabla `encabezado_test`
--
ALTER TABLE `encabezado_test`
    MODIFY `enca_id` int (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `escala_yesavage`
--
ALTER TABLE `escala_yesavage`
    MODIFY `id_escala_yesavage` int (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tecnico`
--
ALTER TABLE `tecnico`
    MODIFY `tecn_id` int (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


ALTER TABLE adulto_mayor add  column  am_foto varchar(200);

DROP TABLE unidad_Atencion;

CREATE TABLE unidad_Atencion(
    ua_unidadatencion varchar(200),
    ua_servicio     varchar(200),
    ua_distrito varchar(200),
    ua_modalidad varchar(200),
    ua_zona varchar(200)
);
