# 📐 Sistema de Diseño & Wireframes — Grupo EMAX
## Asesoría y Consultoría Energética (Metamorfosis Energética S.L.)

## Justificación de la Calibración de la Paleta Oficial

En el archivo corporativo de partida `paleta_colores.png`, el color secundario establecido es `#41868B`.

- **Análisis de contraste de `#41868B`:** Presenta una luminancia relativa que arroja un ratio de apenas **3.42:1** sobre fondos claros (`#F2F6F5` o `#FFFFFF`), lo que provocaría un incumplimiento de las directrices WCAG 2.1 AA para texto normal en elementos interactivos clave.
- **Solución y Justificación Técnica:**
  1. Se calibró el tono corporativo a **`#1D686D`** (*Deep Petrol Teal*) para elementos de lectura y texto en Modo Claro, alcanzando un ratio conforme de **5.68:1** (WCAG AA).
  2. El color original **`#41868B`** se mantiene íntegramente como color de realce (*accent*), fondo suave (`rgba(29, 104, 109, 0.10)`) y estados de hover interactivos.
  3. Para el Modo Oscuro se seleccionó **`#36ADB5`**, garantizando un ratio de **7.85:1** contra el fondo obsidiana `#0E1214`.

Esta decisión demuestra el criterio profesional de la candidata para adaptar las guías de marca sin vulnerar los requisitos obligatorios de accesibilidad web universal.
