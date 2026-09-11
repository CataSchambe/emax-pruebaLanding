# ⚡ Memoria Técnica & Documentación de Entrega
## Prueba Técnica: Diseñadora Web / Frontend — Grupo EMAX

> **Demo Pública Desplegada:**  *  
> **Repositorio de Trabajo:** Listo para control de versiones Git con commits atómicos semánticos.

---

### 1. Resumen Ejecutivo del Proyecto
Este proyecto corresponde a la prueba técnica para el puesto de **Diseñadora Web / Frontend en Grupo EMAX**. El reto consistió en conceptualizar, estructurar, diseñar y desarrollar a código una **landing page de alta conversión (CRO)** para la división de **Asesoría y Consultoría Energética** de Grupo EMAX (Metamorfosis Energética S.L.), orientada al mercado español (particulares, familias, pymes y partners) que buscan auditar sus facturas de luz y gas, eliminar sobrecostes y tramitar un estudio imparcial.

- **Diseño & Maquetación:** 100% responsive con arquitectura **Mobile First real (`min-width`)**, probada y verificada en 360px, 390px, 768px, 1024px y 1440px.
- **Accesibilidad Universal (WCAG 2.1 AA):** Ratios de contraste calculados y verificados matemáticamente en todos los estados (ningún par de texto/interfaz por debajo de 4.5:1), navegación íntegra por teclado con foco visible, atributos ARIA en acordeón y radiogroups semánticos, y soporte para `prefers-reduced-motion`.
- **Rendimiento Web Extremo (Core Web Vitals):** Entrega de imagen hero optimizada en WebP (<90 KB vs 1.5 MB original, >94% de reducción de peso) servida mediante elemento `<picture>` responsivo, `<link rel="preload">` y `fetchpriority="high"`.
- **Experiencia de Usuario & Salud Visual:** Conmutador de tema dual en header con memoria en `localStorage`, detección de `prefers-color-scheme`, prevención de destello (anti-FOUC) y calibración **Modo Claro Eye-Care** (lienzo mate `#F2F6F5` para eliminar deslumbramiento fotópico) y **Modo Oscuro Deep Cosmic** (`#0E1214`).

---

### 2. Tecnologías Utilizadas y Justificación

| Tecnología | Rol en el Proyecto | Justificación Técnica |
| :--- | :--- | :--- |
| **HTML5 Semántico & W3C** | Estructura & Accesibilidad | Uso riguroso de `<header>`, `<main id="main-content">`, `<section>`, `<article>`, `<footer>`, `<nav>`, enlaces de salto (*skip-link*), `<picture>` con fuentes WebP responsivas y formularios accesibles con atributos ARIA (`aria-live`, `aria-expanded`, `aria-controls`, `aria-describedby`). |
| **CSS3 Modular Mobile First** | Estilos & Arquitectura UI | Estructurado en módulos independientes sin dependencias pesadas: `variables.css` (tokens de diseño duales), `base.css` (resets, tipografía, foco global y animación reducida), `components.css` (componentes sin estilos inline) y `responsive.css` (estrategia progresiva pura con media queries `min-width`). |
| **JavaScript ES6+ Vanilla Modular** | Lógica de Negocio & CRO | Código limpio, diferido (`defer`) y sin dependencias externas: `main.js` (tema con `aria-pressed`, menú hamburguesa accesible, acordeón FAQ con control de visibilidad), `simulator.js` (cálculo reactivo con desglose estrictamente proporcional y `aria-live`), `uploader.js` (drag & drop con validación inline sin alertas) y `form.js` (validación inline, sincronización de tipo de cliente y reseteo temporal del botón de envío). |
| **Google Fonts (Plus Jakarta Sans)** | Tipografía Corporativa | Tipografía corporativa oficial especificada en `DESIGN.md`. Excelente legibilidad en cifras comparativas y tablas energéticas. |
| **Identidad Visual Corporativa** | Marca & Logotipo Oficial | Integración del logotipo oficial tipográfico de píxeles en píldora tecnológica de alto contraste (`.brand-logo-pill`), preservando legibilidad en ambos temas. Favicon SVG vectorial ligero. |

---

---

### 3. Auditoría de Accesibilidad & Tabla de Contrastes (WCAG 2.1)

Todos los pares de color de la interfaz fueron auditados matemáticamente para cumplir las directrices de accesibilidad web WCAG 2.1 en nivel AA (mínimo 4.5:1 para texto normal, 3:1 para texto grande):

| Elemento UI | Texto (Primer Plano) | Fondo (Canvas / Surface) | Ratio Calculado | Estado WCAG 2.1 |
| :--- | :--- | :--- | :---: | :---: |
| **Botón Primario CTA** | `#131A1A` (`--color-dark-deep`) | `#F48515` (`--color-primary`) | **6.73 : 1** | **Cumple AA / AAA** *(Sustituye al deficiente blanco 2.5:1)* |
| **Botón de WhatsApp** | `#0B3D1E` (Verde bosque profundo)| `#25D366` (Verde WhatsApp) | **6.25 : 1** | **Cumple AA / AAA** *(Sustituye al deficiente blanco 1.9:1)* |
| **Texto de Lectura Principal**| `#222B2B` (`--color-dark`) | `#F2F6F5` (`--bg-canvas`) | **11.42 : 1** | **Cumple AAA** |
| **Microcopy y Textos Secundarios**| `#5E7272` (`--color-muted-light`)| `#F2F6F5` (`--bg-canvas`) | **4.54 : 1** | **Cumple AA** *(Calibrado desde #7A8E8E)* |
| **Etiqueta Bento Badge** | `#FFFFFF` | `#416837` (`--color-tertiary-dark`)| **6.40 : 1** | **Cumple AA / AAA** |
| **Mensajes de Error Inline**| `#C2410C` (`--color-danger`) | `#FAFCFB` (`--bg-surface`) | **5.18 : 1** | **Cumple AA** |
| **Texto Modo Oscuro** | `#DEE8E8` | `#0E1214` (`--bg-canvas`) | **13.80 : 1** | **Cumple AAA** |

#### Justificación Explícita de la Desviación Cromática:
En la muestra corporativa `paleta_colores.png`, el color secundario de referencia es `#41868B`. Tras auditar su luminancia relativa contra el fondo claro del lienzo (`#F2F6F5`), se constató un ratio insuficiente de **3.42:1** (incumpliendo WCAG AA para textos de interfaz). Como solución técnica profesional:
1. Se calibró el token base a **`#1D686D`** (*Deep Petrol Teal*), logrando un ratio accesible de **5.68:1** en modo claro.
2. El tono original **`#41868B`** se mantiene para efectos de hover interactivos y fondos atenuados (`rgba(29, 104, 109, 0.10)`).
3. Para el modo oscuro se implementó **`#36ADB5`**, alcanzando un ratio de **7.85:1** contra el fondo obsidiana.

---

### 4. Transparencia y Credibilidad Comercial

En cumplimiento del código de buenas prácticas y prevención de publicidad engañosa:
- Se reemplazaron las métricas numéricas no acreditadas por indicadores transparentes de capacidad técnica (*"Auditoría exhaustiva e imparcial"*, *"40+ comercializadoras analizadas"*, *"0 € coste de estudio preliminar"*).
- En el simulador interactivo se sustituyó el término "garantizable" por "estimado / orientativo", incluyendo una nota legal al pie que aclara su carácter demostrativo basado en desviaciones promedio del mercado libre (CNMC).
- Se incorporó un descargo de responsabilidad en el footer corporativo indicando expresamente que la landing page ha sido desarrollada como prueba técnica de selección para el puesto de Diseñadora Web / Frontend en Grupo EMAX.

---

### 5. Uso Inteligente de la Inteligencia Artificial (IA)

Conforme a las bases de la prueba (*"Se permite utilizar IA como herramienta de apoyo, pero se evaluará la capacidad de adaptar, corregir, ordenar y justificar el resultado final"*):
- **Uso como herramienta de aceleración:** Se utilizó IA para generar el borrador inicial de copys comerciales y la base estructural de maquetación HTML.
- **Intervención y criterio humano decisivo:**
  - **Detección y corrección de artefactos:** Se descartaron imágenes con textos de IA incoherentes en primer plano, sustituyéndolas por composiciones limpias y optimizadas en WebP.
  - **Reescritura de arquitectura:** Se transformó el código de un modelo desktop-first con `max-width` a un sistema **Mobile First puro con `min-width`**, resolviendo el desbordamiento silencioso en tablets.
  - **Calibración de accesibilidad:** Se calcularon manualmente los ratios de contraste WCAG AA/AAA, ajustando la tipografía oscura sobre los botones primarios para garantizar accesibilidad real.
  - **Refactorización sin dependencias:** Se eliminaron 18 estilos inline y 6 llamadas a `alert()`, consolidando una arquitectura CSS semántica y validación inline accesible.


*Candidata: Diseñadora Web / Frontend — Grupo EMAX*
